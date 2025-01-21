<script lang="ts">
  import {
    saveToLocalStorage,
    loadFromLocalStorage,
  } from "../../utils/localStorageManager.ts";
  import {
    updateStyles,
    settings,
  } from "../../utils/type-her-story/setting.ts";

  let fontSize = loadFromLocalStorage<number>("fontSize", 30); // 폰트 사이즈
  let fontWeight = loadFromLocalStorage<number>("fontWeight", 1); // 폰트 굵기
  let fontStyle = loadFromLocalStorage<string>("fontStyle", "Sanserif"); // 폰트 모양
  let lineHeight = loadFromLocalStorage<number>("lineHeight", 140); // 행간 너비
  let bgColor = loadFromLocalStorage<string>("bgColor", "#FDFCF9"); // 배경 컬러
  let keyboardSound = loadFromLocalStorage<number>("keyboardSound", 0);
  let contentType = loadFromLocalStorage<string>("contentType", "all");

  export let changeKeyboardSound;

  $: {
    saveToLocalStorage("fontSize", fontSize);
    saveToLocalStorage("fontWeight", fontWeight);
    saveToLocalStorage("fontStyle", fontStyle);
    saveToLocalStorage("lineHeight", lineHeight);
    saveToLocalStorage("bgColor", bgColor);
    saveToLocalStorage("keyboardSound", keyboardSound);
    saveToLocalStorage("contentType", contentType);
    changeKeyboardSound(keyboardSound);
    updateStyles();
  }
</script>

<div class="control-panel">
  <!-- 폰트 사이즈 -->
  <div class="control">
    <label>폰트 사이즈</label>
    <div class="control-box">
      <button on:click={() => (fontSize = Math.max(10, fontSize - 2))}
        >－</button
      >
      <div>{fontSize}px</div>
      <button on:click={() => (fontSize = Math.min(100, fontSize + 2))}
        >＋</button
      >
    </div>
  </div>

  <!-- 폰트 굵기 -->
  <div class="control">
    <label>폰트 굵기</label>
    <div class="control-box">
      <button on:click={() => (fontWeight = Math.max(0, fontWeight - 1))}
        >－</button
      >

      <div>{settings.fontWeights[fontWeight]}</div>
      <button
        on:click={() =>
          (fontWeight = Math.min(
            settings.fontWeights.length - 1,
            fontWeight + 1
          ))}>＋</button
      >
    </div>
  </div>

  <!-- 폰트 모양 -->
  <div class="control">
    <label>폰트 모양</label>
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
      <button on:click={() => (lineHeight = Math.max(50, lineHeight - 10))}
        >－</button
      >
      <div>{lineHeight}%</div>
      <button on:click={() => (lineHeight = Math.min(200, lineHeight + 10))}
        >＋</button
      >
    </div>
  </div>

  <!-- 유형형 -->
  <div class="control">
    <label>문장 설정</label>
    <div class="toggle-group">
      <input
        type="radio"
        name="contentType"
        id="kor"
        value="kor"
        bind:group={contentType}
      />
      <label for="kor" class:active={contentType === "kor"}>KOR</label>

      <input
        type="radio"
        name="contentType"
        id="eng"
        value="eng"
        bind:group={contentType}
      />
      <label for="eng" class:active={contentType === "eng"}>ENG</label>

      <input
        type="radio"
        name="contentType"
        id="all"
        value="all"
        bind:group={contentType}
      />
      <label for="all" class:active={contentType === "all"}>ALL</label>
    </div>
  </div>

  <!-- 타이핑 소리 -->
  <div class="control">
    <label>타이핑 소리</label>
    <div class="control-box">
      <button on:click={() => (keyboardSound = Math.max(0, keyboardSound - 1))}
        >＜
      </button>

      <div>{settings.keyboardSounds[keyboardSound]}</div>
      <button
        on:click={() =>
          (keyboardSound = Math.min(
            settings.keyboardSounds.length - 1,
            keyboardSound + 1
          ))}
      >
        ＞</button
      >
    </div>
  </div>

  <!-- 배경컬러 -->
  <div class="control">
    <label>배경컬러</label>
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
    flex: 2;
    height: 100%;
    font-size: 25px;
    font-weight: 300;
    border: none;
    background: transparent;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
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
