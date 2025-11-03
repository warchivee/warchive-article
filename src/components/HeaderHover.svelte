<script lang="ts">
  import { onMount } from "svelte";

  export let title: string = "";

  let hoverTitle: HTMLDivElement;

  // Astro에서 쓰던 마우스 이벤트 로직
  onMount(() => {
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target && target.classList.contains("hover-title")) {
        event.stopPropagation();
        const clickEvent = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        target.dispatchEvent(clickEvent);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
    };
  });
</script>

<div class="hover-container">
  <div bind:this={hoverTitle} class="hover-title">
    {title}
  </div>
  <div class="hover-bridge"></div>
  <div class="hover-content">
    <slot />
  </div>
</div>

<style>
  .hover-container {
    position: relative;
    display: inline-block;
    margin: 0;
    padding: 0;
  }

  .hover-title {
    height: 100%;
    cursor: pointer;
    color: white;
    padding: 1em 0.5em;
    margin-bottom: 6px;
  }

  .hover-bridge {
    position: absolute;
    top: 90%;
    left: -10px;
    width: calc(100% + 20px);
    height: 20px;
    background: transparent;
    z-index: 1;
  }

  .hover-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 200px;
    top: 56px;
    left: -67px;
    background-color: #080808aa;
    z-index: 100;
    text-align: center;

    /* 초기 상태 */
    height: 0;
    overflow: hidden;
    opacity: 0;
    transform: translateY(-10px);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .touch-force-click {
    cursor: pointer;
  }

  .hover-container:hover .hover-content,
  .hover-title:hover .hover-content {
    /* 호버 상태 */
    height: fit-content;
    overflow: visible;
    opacity: 1;
    transform: translateY(0);
  }

  .title {
    font-weight: bold;
  }
</style>
