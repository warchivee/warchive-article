<script>
  import axios from "axios";
  import Snackbar from "../Snackbar.svelte";
  import { onMount } from "svelte";

  import Loader from "./Loader.svelte";

  import html2canvas from "html2canvas";

  export let data;

  let fontSize = 20;
  let fontStyle = "Sanserif";
  let textColor = "black";
  let titlePosition = "left";
  let contentPosition = "top";
  let ratio = "1/1";
  let lineHeight = 160;
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
    const element = document.querySelector(".preview.print");
    if (!element) return alert("Preview element not found!");

    isLoading = true; // 로딩 시작

    try {
      const canvas = await html2canvas(element, { useCORS: true });
      const imageDataUrl = canvas.toDataURL("image/png");

      return imageDataUrl;
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
        description: `${data?.title && data?.creator ? data?.title + ", " : ""}${data?.creator || ""}`,
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

<div
  class="preview print"
  style="
    --fontSize: {fontSize}px; 
    --font: {fontStyle === 'Sanserif'
    ? 'Noto Sans KR, sans-serif'
    : 'Noto Serif KR, serif'}; --textColor: {textColor}; 
      --titlePosition: {titlePosition};
      --contentPosition: {contentPosition === 'top'
    ? 'flex-start'
    : contentPosition === 'bottom'
      ? 'flex-end'
      : contentPosition};
      --ratio: {ratio};
      --lineHeight: {lineHeight}%;
      --bgImg: url(/typing/bg/gradients/{bgImg}.png);"
>
  <p>
    {data?.content}
  </p>
  <p class="info">
    <strong class="title">
      <span style="margin-left: -20px;">「</span>{data?.title && data?.creator
        ? data?.title
        : !data?.title && data?.creator
          ? data?.creator
          : ""}<span style="margin-right: -20px;">」</span></strong
    ><br /><span class="publish">
      {data?.creator ? `${data?.creator}` : ""}
      {data?.translator ? `, ${data?.translator} 옮김` : ""}
      <span style="margin: 0 3px;">|</span>
      {data?.publisher ? `${data?.publisher}` : ""}</span
    >
    <img
      src={textColor === "white" ? "/logo.png" : "/logo-black.png"}
      width="90"
      style="display: block; margin: 0 auto; margin-top: 13px;"
    />
  </p>
</div>

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
        <div class="ratio1">1 : 1</div>
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
        <div class="ratio3">3 : 4</div>
        <div>세로형</div>
      </label>
    </div>
  </div>

  <div class="content">
    <div
      class="preview-wrap"
      style="
    --fontSize: {fontSize}px; 
    --font: {fontStyle === 'Sanserif'
        ? 'Noto Sans KR, sans-serif'
        : 'Noto Serif KR, serif'}; --textColor: {textColor}; 
      --titlePosition: {titlePosition};
      --contentPosition: {contentPosition === 'top'
        ? 'flex-start'
        : contentPosition === 'bottom'
          ? 'flex-end'
          : contentPosition};
      --ratio: {ratio};
      --lineHeight: {lineHeight}%;
      --bgImg: url(/typing/bg/gradients/{bgImg}.png);
      --noPrintHeight: {ratio === '1/1' ? '350px' : '466.67px'};"
    >
      <div class="preview">
        <p>
          {data?.content}
        </p>
        <p class="info">
          <strong class="title">
            <span style="margin-left: -20px;">「</span>{data?.title &&
            data?.creator
              ? data?.title
              : !data?.title && data?.creator
                ? data?.creator
                : ""}<span style="margin-right: -20px;">」</span></strong
          ><br /><span class="publish">
            {data?.creator ? `${data?.creator}` : ""}
            {data?.translator ? `, ${data?.translator} 옮김` : ""}
            <span style="margin: 0 3px;">|</span>
            {data?.publisher ? `${data?.publisher}` : ""}</span
          >
          <img
            src={textColor === "white" ? "/logo.png" : "/logo-black.png"}
            width="90"
            style="display: block; margin: 0 auto; margin-top: 13px;"
          />
        </p>
      </div>
    </div>

    <div class="control-panel">
      <!-- 배경 -->
      <div class="control">
        <label>배경</label>
        <div class="bg-group">
          {#each [1, 2, 3, 4, 5, 6] as index}
            <label>
              <input
                type="radio"
                name="background-color"
                value={index}
                bind:group={bgImg}
              />
              <span
                class="bg-option"
                style="background-image: url(/typing/bg/gradients/{index}.png); background-size: cover; background-position: center;"
              ></span>
            </label>
          {/each}
        </div>
      </div>

      <div class="control">
        <label>글자색</label>
        <div class="toggle-group">
          <input
            type="radio"
            name="textColor"
            id="black"
            value="black"
            bind:group={textColor}
          />
          <label for="black" class:active={textColor === "black"}> BLACK</label>

          <input
            type="radio"
            name="textColor"
            id="white"
            value="white"
            bind:group={textColor}
          />
          <label for="white" class:active={textColor === "white"}> WHITE</label>
        </div>
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
            name="titlePosition"
            id="t-left"
            value="left"
            bind:group={titlePosition}
          />
          <label for="t-left" class:active={titlePosition === "left"}
            >LEFT</label
          >

          <input
            type="radio"
            name="titlePosition"
            id="t-center"
            value="center"
            bind:group={titlePosition}
          />
          <label for="t-center" class:active={titlePosition === "center"}>
            CENTER
          </label>

          <input
            type="radio"
            name="titlePosition"
            id="t-right"
            value="right"
            bind:group={titlePosition}
          />
          <label for="t-right" class:active={titlePosition === "right"}
            >RIGHT</label
          >
        </div>
      </div>

      <div class="control">
        <label>본문 위치</label>
        <div class="toggle-group">
          <input
            type="radio"
            name="contentPosition"
            id="left"
            value="left"
            bind:group={contentPosition}
          />
          <label for="left" class:active={contentPosition === "top"}>TOP</label>

          <input
            type="radio"
            name="contentPosition"
            id="center"
            value="center"
            bind:group={contentPosition}
          />
          <label for="center" class:active={contentPosition === "center"}>
            CENTER
          </label>

          <input
            type="radio"
            name="contentPosition"
            id="bottom"
            value="bottom"
            bind:group={contentPosition}
          />
          <label for="bottom" class:active={contentPosition === "bottom"}
            >BOTTOM</label
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
    font-size: 1rem;
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
    align-items: center;
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

    border: 2px solid black;
    border-radius: 8px;

    display: flex;
    align-content: center;
    justify-content: center;
  }

  .ratio1 {
    width: 45px;
    aspect-ratio: 1/1;
  }

  .ratio3 {
    width: 45px;
    aspect-ratio: 3/4;
  }

  .ratio input[type="radio"] + label div:last-child {
    font-size: 0.9rem;
    font-weight: bold;
  }

  .ratio input[type="radio"]:checked + label div:last-child {
    text-decoration: underline;
  }

  .preview {
    width: 600px;
    position: absolute;
    top: 0;

    background-color: transparent;
    background-image: var(--bgImg);
    background-size: cover;

    padding: 30px;
    padding-bottom: 15px;
    text-align: left;

    /* border: 2px solid black; */

    display: flex;
    flex-direction: column;

    aspect-ratio: var(--ratio);

    overflow: hidden;
  }

  .preview-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: var(--ratio);
    min-width: 350px;
    max-width: 350px;
    height: var(--noPrintHeight);
    content: "''";
  }

  .preview.print {
    top: 0;
    left: -99999px;
  }

  .preview:not(.print) {
    transform: scale(calc(350 / 600));
    transform-origin: top left;
  }

  .preview p {
    color: var(--textColor);
    font-family: var(--font);
    text-align: left;
  }

  .preview p:first-child {
    display: flex;
    align-items: var(--contentPosition);
    font-size: var(--fontSize);
    flex: 1;
    line-height: var(--lineHeight);

    overflow: hidden;
  }

  .preview p:last-child {
    text-align: var(--titlePosition);
    line-height: 140%;
    padding: 15px 0;
  }

  .preview .title {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0 10px;
  }

  .preview .publish {
    font-size: 1rem;
  }

  /* 전체 패널 */
  .control-panel {
    flex: 1;
    width: 100%;
    min-width: 350px;
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

  .control > div:not(.bg-group) {
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
  .bg-group {
    display: flex;
    gap: 10px;
    width: 100%;
    max-width: 300px;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .bg-group label {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .bg-group input[type="radio"] {
    appearance: none;
    -webkit-appearance: none; /* Safari 호환 */
  }

  .bg-option {
    width: 45px;
    height: 45px;
    border-radius: 8px;
    cursor: pointer;
    display: inline-block;
    border: 2px solid gray;
  }

  .bg-group input[type="radio"]:checked + .bg-option {
    border: 2px solid #000;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
    width: 100%;
  }
</style>
