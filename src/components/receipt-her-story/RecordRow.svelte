<script>
  import { onMount, onDestroy } from "svelte";
  import { saveToLocalStorage } from "../../utils/localStorageManager";
  import svlatepickr from "svelte-flatpickr-plus";
  import blockedWords from "/public/assets/blockedWords.txt?raw";

  function removeBlockedWords(str) {
    const testStr = str ?? "";
    try {
      const profanityList = blockedWords
        .split("\n")
        .map((word) => word.replace(/\s/g, ""))
        .filter((word) => word !== "");

      if (profanityList.length === 0) return testStr;

      // 비속어를 찾고 제거
      const regexPattern = new RegExp(`${profanityList.join("|")}`, "gi");
      const cleanedStr = testStr.replace(regexPattern, "");

      return cleanedStr;
    } catch (err) {
      return str;
    }
  }

  export let theme;

  export let works;
  export let publishWatasSummary;
  export let work;

  let dropdownRef;
  let showDropdown = false;
  let filteredSuggestions = [];

  let options = {
    locale: "ko",
    dateFormat: "y/m/d",
    defaultDate: work.date,
    onChange: (date) => {
      work.date = date[0];
      works = [...works].sort((a, b) => {
        const isAIncomplete = !a.date || !a.category || !a.title || !a.rating;
        const isBIncomplete = !b.date || !b.category || !b.title || !b.rating;

        // 1) 불완전한 항목이 더 위
        if (isAIncomplete && !isBIncomplete) return -1;
        if (!isAIncomplete && isBIncomplete) return 1;

        // 2) 둘 다 불완전하면: 날짜 없는 게 위
        if (isAIncomplete && isBIncomplete) {
          if (!a.date && b.date) return -1;
          if (a.date && !b.date) return 1;

          // 둘 다 날짜 없거나 둘 다 있으면 최신순
          if (!a.date && !b.date) return 0;
          return new Date(b.date) - new Date(a.date);
        }

        // 3) 둘 다 완전한 항목이면 날짜 최신순
        return new Date(b.date) - new Date(a.date);
      });
      updated();
    },
  };

  function updated() {
    saveToLocalStorage("receipt-works", works);
  }

  function handleTitleInput(e) {
    let value = e.target.textContent;

    value = removeBlockedWords(value);

    // 길이 제한
    if (value.length > 150) {
      value = value.slice(0, 150);
      e.target.textContent = value;

      // 커서가 맨 앞으로 튀는 문제 방지
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(e.target);
      range.collapse(false); // 끝으로 이동
      sel.removeAllRanges();
      sel.addRange(range);

      return;
    }

    work.title = value;
    updated();

    // 필터링 & 드롭다운
    if (value.length > 0) {
      filteredSuggestions = publishWatasSummary.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      showDropdown = true;
    } else {
      showDropdown = false;
    }
  }

  function selectSuggestion(suggestion) {
    work.title = suggestion.title + " - " + suggestion.creators;
    work.category = suggestion.category;
    updated();

    showDropdown = false;
  }

  function removeWork() {
    works = works.filter((w) => w !== work);
    updated();
  }

  function handleClickOutside(event) {
    // dropdownRef 안쪽이 아니면 닫기
    if (dropdownRef && !dropdownRef.contains(event.target)) {
      showDropdown = false;
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onDestroy(() => {
    document.removeEventListener("click", handleClickOutside);
  });
</script>

<div class="row data-row">
  <input
    class="date"
    name="date"
    use:svlatepickr={options}
    placeholder="날짜선택.."
  />
  <div class="input-saved">
    {work?.date
      ? new Date(work.date)
          ?.toLocaleDateString("ko-KR", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          })
          .replace(/\.$/, "")
          .replace(/\./g, "/")
          .replaceAll(" ", "")
      : ""}
  </div>

  <div
    contenteditable="true"
    class="category"
    on:input={(e) => {
      let value = e.target.textContent;

      value = removeBlockedWords(value);

      // 길이 제한
      if (value.length > 10) {
        value = value.slice(0, 10);
        e.target.textContent = value;

        // 커서가 맨 앞으로 튀는 문제 방지
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(e.target);
        range.collapse(false); // 끝으로 이동
        sel.removeAllRanges();
        sel.addRange(range);

        return;
      }

      work.category = value;
      updated();
    }}
    bind:innerHTML={work.category}
  ></div>

  <div class="title-wrap">
    <div
      contenteditable="true"
      class="title"
      bind:innerHTML={work.title}
      on:input={handleTitleInput}
    ></div>
    {#if showDropdown}
      <div class="dropdown" bind:this={dropdownRef}>
        <div class="dropdown-item">
          <a href="https://www.womynarchive.com/" target="_blank"
            >검색 결과에 없다면? ☞ 와카이브에 제보하기
          </a>
        </div>
        {#each filteredSuggestions as suggestion}
          <div
            class="dropdown-item"
            on:click={() => selectSuggestion(suggestion)}
            aria-hidden="true"
          >
            {suggestion.title} - {suggestion.creators}
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <div class="rating">
    {#each ["bad", "middle", "good"] as rating}
      <img
        src="receipt/{rating}-{theme}.png"
        class={work.rating === rating ? `${rating} selected` : rating}
        aria-hidden="true"
        on:click={() => {
          if (work.rating !== "" && work.rating === rating) {
            work.rating = "";
            updated();
            return;
          }

          work.rating = rating;
          updated();
        }}
        alt={rating}
      />
    {/each}
  </div>

  <button class="delete-btn" on:click={removeWork}> [×] </button>
</div>

<style>
  .row {
    position: relative;
    display: grid;
    gap: 4px;
    grid-template-columns: 60px 55px 1fr 60px 16px;
    align-items: center;
  }

  .data-row {
    font-size: 0.65em;
    margin: 5px 0;
    background: rgb(248, 248, 248);
  }

  .title {
    position: relative;
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
  }

  .title-wrap {
    position: relative;
  }

  .date {
    font-family: var(--receipt-font-family);
    width: 100%;
    border: none;
    background: transparent;
    font-size: 0.5em;
  }

  .rating {
    display: flex;
    justify-self: center;
    align-items: center;
    cursor: pointer;
    font-size: 0.9rem;
    user-select: none;
    gap: 4px;
  }

  .rating img {
    width: 16px;
    height: 16px;
    opacity: 0.2;
  }

  .rating img.selected {
    opacity: 1;
  }

  .delete-btn {
    all: unset;
    cursor: pointer;
  }

  :global(.receipt.image-saved .delete-btn) {
    display: none;
  }
  :global(.receipt.image-saved input) {
    display: none;
  }

  :global(.receipt.image-saved .row) {
    grid-template-columns: 60px 55px 1fr 60px;
  }

  :global(.input-saved) {
    display: none;
  }
  :global(.receipt.image-saved .input-saved) {
    display: block;
  }

  .dropdown {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    max-height: 200px;
    overflow-y: scroll;
    z-index: 10;
  }
  .dropdown-item {
    padding: 6px 10px;
    cursor: pointer;
  }
  .dropdown-item:hover {
    background: #f0f0f0;
  }
</style>
