<script lang="ts">
  import {
    saveToLocalStorage,
    loadFromLocalStorage,
  } from "../../utils/localStorageManager.ts";
  import {
    updateStyles,
    settings,
  } from "../../utils/type-her-story/setting.ts";

  let fontSize = loadFromLocalStorage<number>("fontSize", 16); // 폰트 사이즈
  let fontWeight = loadFromLocalStorage<number>("fontWeight", 1); // 폰트 굵기
  let fontStyle = loadFromLocalStorage<string>("fontStyle", "Sanserif"); // 폰트 모양
  let lineHeight = loadFromLocalStorage<number>("lineHeight", 160); // 행간 너비
  let bgColor = loadFromLocalStorage<string>("bgColor", "#FDFCF9"); // 배경 컬러
  let keyboardSound = loadFromLocalStorage<number>("keyboardSound", 1);
  let contentType = loadFromLocalStorage<string>("contentType", "ALL");

  export let changeContentType;
  export let changeKeyboardSound;

  $: {
    saveToLocalStorage("fontSize", fontSize);
    saveToLocalStorage("fontWeight", fontWeight);
    saveToLocalStorage("fontStyle", fontStyle);
    saveToLocalStorage("lineHeight", lineHeight);
    saveToLocalStorage("bgColor", bgColor);
    saveToLocalStorage("keyboardSound", keyboardSound);
    saveToLocalStorage("contentType", contentType);

    changeContentType(contentType);
    changeKeyboardSound(keyboardSound);
    updateStyles();
  }
</script>

<div class="control-panel">
  <!-- 폰트 사이즈 -->
  <div class="control">
    <label>글자 크기</label>
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

  <!-- 폰트 굵기 -->
  <div class="control">
    <label>글자 굵기</label>
    <div class="control-box">
      <button
        on:click={() => {
          if (fontWeight - 1 < 0) {
            fontWeight = settings.fontWeights.length - 1;
          } else if (fontWeight - 1 > settings.fontWeights.length - 1) {
            fontWeight = 0;
          } else {
            fontWeight -= 1;
          }
        }}>－</button
      >

      <div>{settings.fontWeights[fontWeight]}</div>
      <button
        on:click={() => {
          if (fontWeight + 1 < 0) {
            fontWeight = settings.fontWeights.length - 1;
          } else if (fontWeight + 1 > settings.fontWeights.length - 1) {
            fontWeight = 0;
          } else {
            fontWeight += 1;
          }
        }}>＋</button
      >
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

  <!-- 문장설정 -->
  <div class="control">
    <label>문장 설정</label>
    <div class="toggle-group">
      <input
        type="radio"
        name="contentType"
        id="KOR"
        value="KOR"
        bind:group={contentType}
      />
      <label for="KOR" class:active={contentType === "KOR"}>KOR</label>

      <input
        type="radio"
        name="contentType"
        id="ENG"
        value="ENG"
        bind:group={contentType}
      />
      <label for="ENG" class:active={contentType === "ENG"}>ENG</label>

      <input
        type="radio"
        name="contentType"
        id="ALL"
        value="ALL"
        bind:group={contentType}
      />
      <label for="ALL" class:active={contentType === "ALL"}>ALL</label>
    </div>
  </div>

  <!-- 타이핑 소리 -->
  <div class="control">
    <label>타이핑 소리</label>
    <div class="control-box">
      <button
        on:click={() => {
          if (keyboardSound - 1 < 0) {
            keyboardSound = settings.keyboardSounds.length - 1;
          } else if (keyboardSound - 1 > settings.keyboardSounds.length - 1) {
            keyboardSound = 0;
          } else {
            keyboardSound -= 1;
          }
        }}
        >＜
      </button>

      <div>{settings.keyboardSounds[keyboardSound]}</div>
      <button
        on:click={() => {
          if (keyboardSound + 1 < 0) {
            keyboardSound = settings.keyboardSounds.length - 1;
          } else if (keyboardSound + 1 > settings.keyboardSounds.length - 1) {
            keyboardSound = 0;
          } else {
            keyboardSound += 1;
          }
        }}
      >
        ＞</button
      >
    </div>
  </div>

  <!-- 배경색 -->
  <div class="control">
    <label>배경색</label>
    <div class="color-group">
      {#each settings.bgColors as color}
        <label>
          <input
            type="radio"
            name="background-color"
            value={color}
            bind:group={bgColor}
          />
          <span class="color-option" style="background-color: {color}"></span>
        </label>
      {/each}
    </div>
  </div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");

  /* 전체 패널 */
  .control-panel {
    font-family: var(--font-highlight);
    color: #000;
    height: 100%;
    overflow-y: scroll;
    padding: 20px 0;
    font-size: 1rem;
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
    width: 90px;

    font-weight: bold;

    font-family: var(--font-content);
  }

  .control > div {
    flex: 1;
    max-width: 300px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .control-box {
    border: 1.5px solid black;
    border-radius: 4px;
  }

  .control-box button {
    width: 60px;
    height: 100%;
    font-size: 1.3rem;
    font-weight: 300;
    border: none;
    background: transparent;
    cursor: pointer;

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
    height: 100%;
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

  /* 색상 선택 */
  .color-group {
    display: flex;
    gap: 10px;
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
    width: 18px;
    height: 18px;
    border: 1.5px solid gray;
    border-radius: 50%;
    cursor: pointer;
    display: inline-block;
  }

  .color-group input[type="radio"]:checked + .color-option {
    border: 1.5px solid #000;
  }
</style>
