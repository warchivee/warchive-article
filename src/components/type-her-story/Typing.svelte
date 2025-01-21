<script lang="ts">
  import { onMount } from "svelte";
  export let text = "This is a typing practice component.";
  export let handleComplete;
  export let userInput;

  export let keyboardSound = "NONE";

  let hasFocus = false;

  let audio: HTMLAudioElement | null = null;

  let lastPlayedTime = 0; // 마지막 재생 시간
  const playInterval = 50; // 최소 간격 (밀리초)

  function handleFocus() {
    hasFocus = true;
  }

  function handleBlur() {
    hasFocus = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    const now = Date.now();
    if (audio && now - lastPlayedTime >= playInterval) {
      audio.currentTime = 0; // 오디오를 처음부터 재생
      audio.volume = 0.3;
      audio.play();
      lastPlayedTime = now; // 재생 시간 갱신
    }

    if (event.key === "Enter") {
      if (text.length === userInput.length) {
        handleComplete();
      }
    }
  }

  $: if (keyboardSound) {
    if (keyboardSound === "NONE") {
      audio = null;
    } else {
      audio = new Audio(`/typing/sound/${keyboardSound}.mp3`);
    }
  }

  onMount(() => {
    if (keyboardSound) {
      if (keyboardSound === "NONE") {
        audio = null;
      } else {
        audio = new Audio(`/typing/sound/${keyboardSound}.mp3`);
      }
    }
  });
</script>

<div class="container">
  <!-- 텍스트가 표시되는 영역 -->
  <div
    class="highlighted-text"
    aria-hidden="true"
    on:click={() => document.getElementById("hidden-input").focus()}
  >
    {#each text.split("") as letter, index (letter + index)}
      <div class="letter">
        <div
          class="cursor {index === userInput.length && hasFocus
            ? 'now'
            : 'hidden'}"
        ></div>
        <div
          class="char {userInput.length <= index
            ? 'placeholder'
            : userInput[index] === text[index]
              ? 'correct'
              : 'incorrect'}"
        >
          {userInput[index] || letter}
        </div>
      </div>
    {/each}
  </div>

  <!-- 실제 입력을 받는 숨겨진 input -->
  <input
    id="hidden-input"
    type="text"
    bind:value={userInput}
    on:keydown={handleKeydown}
    on:focus={handleFocus}
    on:blur={handleBlur}
    style="position: absolute; opacity: 0; pointer-events: none;"
    autofocus
    maxlength={text.length}
    autocomplete="off"
  />
</div>

<style>
  .container {
    position: relative;
    cursor: text;
  }

  /* 텍스트가 표시되는 영역 */
  .highlighted-text {
    position: relative;
    width: 100%;
    font-size: 1.875rem;
    line-height: 1.5;
    white-space: pre-wrap; /* 줄바꿈 지원 */
    word-wrap: break-word; /* 긴 단어도 줄바꿈 */
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
  }

  .letter,
  .char {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .char {
    margin: -2px;
  }

  .cursor {
    display: block;
    height: 1em;
    overflow: hidden;
    width: 4px;
    background-color: black;
    margin-top: 4px;
  }

  .char {
    min-width: 0.5rem;
  }

  .cursor.hidden {
    visibility: hidden;
  }

  .cursor.now {
    visibility: visible;
    animation: blink 1s step-end infinite;
  }

  .placeholder {
    color: #ccc;
  }

  .correct {
    color: black;
  }

  .incorrect {
    color: red;
  }

  /* 커서 깜빡임 애니메이션 */
  @keyframes blink {
    50% {
      background-color: transparent;
    }
  }
</style>
