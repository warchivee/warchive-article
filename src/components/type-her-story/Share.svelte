<script>
  import axios from "axios";
  import Snackbar from "../Snackbar.svelte";
  import { onMount } from "svelte";
  import ColorPicker, { ChromeVariant } from "svelte-awesome-color-picker";

  import Loader from "./Loader.svelte";

  import { toPng, toJpeg } from "html-to-image";

  export let data;

  let fontSize = 16;
  let fontStyle = "Sanserif";
  let bgColor = "#fdfcf9"; // 기본 배경색
  let textColor = "#000000";
  let titlePosition = "left";
  let ratio = "1/1";
  let lineHeight = "160";

  let bgImg = 1;

  let showSnackbar = false;
  let isLoading = false;

  function openSnackbar() {
    showSnackbar = true;

    setTimeout(() => {
      showSnackbar = false;
    }, 3000);
  }

  async function capturePreview() {
    const element = document.querySelector(".preview");
    if (!element) return alert("Preview element not found!");

    isLoading = true; // 로딩 시작

    try {
      // 이미지 데이터를 캡처
      let imageDataUrl = await toPng(element);

      // 이미지 생성
      const img = new Image();
      img.src = imageDataUrl;

      return new Promise((resolve, reject) => {
        img.onload = function () {
          // 캡처된 이미지의 원본 크기
          const originalWidth = img.width;
          const originalHeight = img.height;

          // 비율에 맞춰서 크기 변경
          let newWidth, newHeight;

          if (ratio === "1/1") {
            // 1:1 비율 (정사각형)
            newWidth = 800;
            newHeight = 800;
          } else if (ratio === "3/4") {
            // 3:4 비율
            newWidth = 800;
            newHeight = (800 * 4) / 3;
          } else {
            // 비율이 잘못된 경우, 원본 크기 그대로 사용
            newWidth = originalWidth;
            newHeight = originalHeight;
          }

          // 크기 변경된 이미지 생성
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = newWidth;
          canvas.height = newHeight;

          // 캔버스에 이미지를 그리기
          ctx.drawImage(
            img,
            0,
            0,
            originalWidth,
            originalHeight,
            0,
            0,
            newWidth,
            newHeight
          );

          // 변경된 이미지의 DataURL 반환
          resolve(canvas.toDataURL());
        };

        img.onerror = function (error) {
          reject("Error loading the image.");
        };
      });
    } catch (error) {
      console.error("Error capturing the preview:", error);
    } finally {
      isLoading = false;
    }
  }

  async function uploadImage(image) {
    const formData = new FormData();

    formData.append("image", image?.replace("data:image/png;base64,", ""));

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.PUBLIC_IMGBB_API_KEY}`,
      formData,
      {
        headers: {
          "Content-Type": "form-data",
        },
      }
    );

    //delete_url, url
    return response?.data?.data?.url;
  }

  async function saveImage() {
    isLoading = true;
    try {
      let image = await capturePreview();

      // 다운로드 링크 생성 및 자동 클릭
      const link = document.createElement("a");
      link.href = image;
      link.download = `${data.title} - ${data.creator}.png`;
      link.click();
    } catch (e) {
      console.error(e);
    } finally {
      isLoading = false;
    }
  }

  function shareLink() {
    navigator.clipboard.writeText(`${window.location.href}`);

    openSnackbar();
  }

  async function shareFacebook() {
    isLoading = true;
    try {
      let image = await capturePreview();
      const url = await uploadImage(image);

      window.open(`http://www.facebook.com/sharer/sharer.php?u=${url}`);
    } catch (e) {
      console.error(e);
    } finally {
      isLoading = false;
    }
  }

  async function shareTwitter() {
    isLoading = true;
    try {
      let image = await capturePreview();
      const url = await uploadImage(image);

      window.open(
        `https://twitter.com/intent/tweet?text=${data?.title && data?.creator ? data?.title + ", " : ""}${data?.creator || ""}&hashtags=와카이브,여성서사,TypeHerStory&url=${url}`
      );
    } catch (e) {
      console.error(e);
    } finally {
      isLoading = false;
    }
  }

  async function shareKakao() {
    let image = await capturePreview();
    const url = await uploadImage(image);

    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "Type Her Story - Warchive",
        description: `${data?.title}, ${data?.creator || ""}`,
        imageUrl: `${url}`,
        link: {
          mobileWebUrl: `${window.location.href}`,
          webUrl: `${window.location.href}`,
        },
      },
      buttons: [
        {
          title: "자세히 보기",
          link: {
            mobileWebUrl: `${window.location.href}`,
            webUrl: `${window.location.href}`,
          },
        },
      ],
    });
  }

  onMount(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(import.meta.env.PUBLIC_KAKAO_KEY);
    }

    return () => {};
  });
</script>

<div class="container">
  {#if isLoading}
    <div class="loading"><Loader /></div>
  {/if}

  <div class="ratio">
    <div>
      <input
        type="radio"
        id="ratio1"
        name="ratio"
        value="1/1"
        bind:group={ratio}
      />
      <label for="ratio1">
        <div>1 : 1</div>
        <div>기본형</div>
      </label>
    </div>
    <div>
      <input
        type="radio"
        id="ratio2"
        name="ratio"
        value="3/4"
        bind:group={ratio}
      />
      <label for="ratio2">
        <div>3 : 4</div>
        <div>세로형</div>
      </label>
    </div>
  </div>

  <div class="content">
    <div
      class="preview"
      style="
    --bgColor: {bgColor}; 
    --fontSize: {fontSize}px; 
    --font: {fontStyle === 'Sanserif'
        ? 'Noto Sans KR, sans-serif'
        : 'Noto Serif KR, serif'}; --textColor: {textColor}; 
      --titlePosition: {titlePosition};
      --ratio: {ratio};
      --lineHeight: {lineHeight}%;
      --bgImg: url(/typing/bg/gradients/{bgImg}.png);"
    >
      <p>
        {data?.content}
      </p>
      <p class="info">
        <strong class="title">
          「{data?.title && data?.creator
            ? data?.title
            : !data?.title && data?.creator
              ? data?.creator
              : ""}」</strong
        ><br /><span class="publish">
          {data?.creator ? `${data?.creator}` : ""}
          {data?.translator ? `, ${data?.translator} 옮김` : ""}
          {data?.publisher ? `, ${data?.publisher}` : ""}</span
        >
        <img
          src="/logo.png"
          width="60"
          style="display: block; margin: 0 auto; margin-top: 10px;"
        />
      </p>
    </div>

    <div class="control-panel">
      <!-- 배경 -->
      <div class="control">
        <label>배경</label>
        <div class="color-group">
          {#each [1, 2, 3, 4, 5, 6] as index}
            <label>
              <input
                type="radio"
                name="background-color"
                value={index}
                bind:group={bgImg}
              />
              <span
                class="color-option"
                style="background-image: url(/typing/bg/gradients/{index}.png); background-size: cover;"
              ></span>
            </label>
          {/each}
        </div>
      </div>

      <div class="control">
        <label>글자색</label>
        <ColorPicker
          bind:hex={textColor}
          components={ChromeVariant}
          sliderDirection="horizontal"
          position="responsive"
          textInputModes={["hex"]}
          label=""
        />
      </div>

      <!-- 폰트 모양 -->
      <div class="control">
        <label>글꼴</label>
        <div class="toggle-group">
          <input
            type="radio"
            name="fontStyle"
            id="sanserif"
            value="Sanserif"
            bind:group={fontStyle}
          />
          <label for="sanserif" class:active={fontStyle === "Sanserif"}
            >Sanserif</label
          >

          <input
            type="radio"
            name="fontStyle"
            id="serif"
            value="Serif"
            bind:group={fontStyle}
          />
          <label for="serif" class:active={fontStyle === "Serif"}>Serif</label>
        </div>
      </div>

      <!-- 제목 위치 -->
      <div class="control">
        <label>제목 위치</label>
        <div class="toggle-group">
          <input
            type="radio"
            name="fontStyle"
            id="left"
            value="left"
            bind:group={titlePosition}
          />
          <label for="left" class:active={titlePosition === "left"}>LEFT</label>

          <input
            type="radio"
            name="fontStyle"
            id="center"
            value="center"
            bind:group={titlePosition}
          />
          <label for="center" class:active={titlePosition === "center"}>
            CENTER
          </label>

          <input
            type="radio"
            name="fontStyle"
            id="right"
            value="right"
            bind:group={titlePosition}
          />
          <label for="right" class:active={titlePosition === "right"}
            >RIGHT</label
          >
        </div>
      </div>

      <div class="control">
        <label>글꼴 크기</label>
        <div class="control-box">
          <button
            on:click={() => {
              if (fontSize - 2 < 14) {
                fontSize = 40;
              } else if (fontSize - 2 > 40) {
                fontSize = 14;
              } else {
                fontSize -= 2;
              }
            }}>－</button
          >
          <div>{fontSize}px</div>
          <button
            on:click={() => {
              if (fontSize + 2 < 14) {
                fontSize = 40;
              } else if (fontSize + 2 > 40) {
                fontSize = 14;
              } else {
                fontSize += 2;
              }
            }}>＋</button
          >
        </div>
      </div>
      <!-- 행간 너비 -->
      <div class="control">
        <label>행간 너비</label>
        <div class="control-box">
          <button
            on:click={() => {
              if (lineHeight - 10 < 100) {
                lineHeight = 200;
              } else if (lineHeight - 10 > 200) {
                lineHeight = 100;
              } else {
                lineHeight -= 10;
              }
            }}>－</button
          >
          <div>{lineHeight}%</div>
          <button
            on:click={() => {
              if (lineHeight + 10 < 100) {
                lineHeight = 200;
              } else if (lineHeight + 10 > 200) {
                lineHeight = 100;
              } else {
                lineHeight += 10;
              }
            }}>＋</button
          >
        </div>
      </div>
    </div>
  </div>

  <div class="buttons">
    <i class="fa-solid fa-download" on:click={saveImage} aria-hidden="true"></i>

    <i class="fa-brands fa-x-twitter" on:click={shareTwitter} aria-hidden="true"
    ></i>
    <i class="fa-solid fa-comment" on:click={shareKakao} aria-hidden="true"></i>
    <i class="fa-brands fa-facebook" on:click={shareFacebook} aria-hidden="true"
    ></i>
  </div>
</div>

<style>
  .loading {
    position: absolute;
    background: white;
    opacity: 0.6;
    z-index: 3;
    width: 100%;
    height: 100%;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .container .content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 50px;
    flex-wrap: wrap;
  }

  .ratio {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 100px;
  }

  .ratio div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .ratio input[type="radio"] {
    appearance: none; /* 기본 라디오 버튼 숨김 */
  }

  .ratio label {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 10px;
    text-align: center;
    gap: 5px;
  }

  .ratio input[type="radio"] + label div:first-child {
    font-weight: light;
    font-size: 1rem;
    font-family: var(--font-highlight);
    width: 50px;
    height: 50px;
    border: 2px solid black;
    border-radius: 8px;

    display: flex;
    align-content: center;
    justify-content: center;
  }

  .ratio input[type="radio"] + label div:last-child {
    font-size: 1.063rem;
    font-weight: bold;
  }

  .ratio input[type="radio"]:checked + label div:last-child {
    text-decoration: underline;
  }

  .preview {
    background-color: var(--bgColor);
    background-image: var(--bgImg);
    background-size: cover;

    padding: 20px;
    border-radius: 15px;
    text-align: left;
    width: 100%;
    max-width: 350px;
    min-width: 350px;
    border: 2px solid black;

    display: flex;
    flex-direction: column;

    aspect-ratio: var(--ratio);

    overflow: hidden;
  }

  .preview p {
    color: var(--textColor);
    font-family: var(--font);
    text-align: left;
  }

  .preview p:first-child {
    font-size: var(--fontSize);
    flex: 1;
    line-height: var(--lineHeight);

    overflow: hidden;
  }

  .preview p:last-child {
    text-align: var(--titlePosition);
    line-height: 100%;
  }

  .preview .title {
    font-size: 0.9rem;
    font-weight: bold;
  }

  .preview .publish {
    font-size: 0.8rem;
    margin: 0 10px;
  }

  /* 전체 패널 */
  .control-panel {
    flex: 1;
    width: 100%;
    font-family: var(--font-highlight);
    color: #000;
    height: 100%;
    padding: 20px 0;
  }

  /* 각 컨트롤 */
  .control {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
  }

  .control > label {
    width: 100px;

    font-weight: bold;

    font-family: var(--font-content);
  }

  .control > div:not(.color-group) {
    width: 100%;
    max-width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .control-box {
    border: 1.5px solid black;
    border-radius: 4px;
  }

  .control-box button {
    width: 60px;
    font-size: 25px;
    font-weight: 300;
    border: none;
    background: transparent;
    cursor: pointer;
    height: 36px;

    display: flex;
    align-items: center;
    justify-content: center;

    touch-action: manipulation;
  }

  .control-box > div {
    flex: 3;
    text-align: center;
  }

  .control-box button:first-child {
    border-right: 1.5px solid black;
  }

  .control-box button:last-child {
    border-left: 1.5px solid black;
  }

  /* 토글 그룹 */
  .toggle-group {
    display: flex;
    border: 1.5px solid black;
    border-radius: 4px;
  }

  .toggle-group label:not(:last-child) {
    border-right: 1.5px solid black;
  }

  .toggle-group input {
    display: none;
  }

  .toggle-group label {
    flex: 1;

    height: 36px;
    text-align: center;
    font-weight: 400;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .toggle-group label.active {
    background: #000;
    color: #fff;
  }

  i:not(.no-border) {
    width: 34px;
    height: 40px;
    border: 2px solid black;
    border-radius: 60% 50% 60% 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    cursor: pointer;
  }

  /* 색상 선택 */
  .color-group {
    display: flex;
    gap: 10px;
    width: 100%;
    max-width: 300px;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .color-group label {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .color-group input[type="radio"] {
    appearance: none;
    -webkit-appearance: none; /* Safari 호환 */
  }

  .color-option {
    width: 50px;
    height: 50px;
    border-radius: 11px;
    cursor: pointer;
    display: inline-block;
    border: 1.5px solid gray;
  }

  .color-group input[type="radio"]:checked + .color-option {
    border: 1.5px solid #000;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    width: 100%;
  }
</style>
