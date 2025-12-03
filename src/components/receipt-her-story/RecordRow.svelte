<script>
  import { onMount, onDestroy } from "svelte";
  import svlatepickr from "svelte-flatpickr-plus";
  import blockedWords from "/public/assets/blockedWords.txt?raw";

  export let theme;
  export let publishWatasSummary;
  export let work;

  export let handleUpdate;
  export let handleRemove;

  let dropdownRef;
  let showDropdown = false;
  let filteredSuggestions = [];

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

  function selectSuggestion(suggestion) {
    const updatedWork = {
      ...work,
      title: suggestion.title + " - " + suggestion.creators,
      category: suggestion.category,
    };
    handleUpdate(updatedWork);

    showDropdown = false;
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
    use:svlatepickr={{
      locale: "ko",
      dateFormat: "y/m/d",
      defaultDate: work.date,
      onChange: (date) => {
        const updatedWork = { ...work, date: date[0] };
        handleUpdate(updatedWork);
      },
    }}
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

  <input
    type="text"
    maxlength="4"
    value={work.category}
    on:change={(e) => {
      let value = e.target.value;

      value = removeBlockedWords(value);

      const updatedWork = { ...work, category: value };
      handleUpdate(updatedWork);
    }}
  />
  <div class="category input-saved">{work.category}</div>

  <div class="title-wrap">
    <textarea
      class="title"
      maxlength="120"
      on:input={(e) => {
        // 필터링 & 드롭다운
        let value = e.target.value;
        if (value.length > 0) {
          filteredSuggestions = publishWatasSummary.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
          );
          showDropdown = true;
        } else {
          showDropdown = false;
        }
      }}
      on:change={(e) => {
        let value = e.target.value;

        value = removeBlockedWords(value);

        const updatedWork = { ...work, title: value };
        handleUpdate(updatedWork);
      }}>{work.title}</textarea
    >
    <div class="title input-saved">{work.title}</div>

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
            const updatedWork = { ...work, rating: "" };
            handleUpdate(updatedWork);
            return;
          }

          const updatedWork = { ...work, rating: rating };
          handleUpdate(updatedWork);
        }}
        alt={rating}
      />
    {/each}
  </div>

  <button
    class="delete-btn"
    on:click={() => {
      handleRemove(work);
    }}
  >
    [×]
  </button>
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

  input,
  textarea {
    border: none;
    background-color: transparent;
  }

  textarea {
    width: 100%;
    resize: none; /* 크기 조절 막기 */
    field-sizing: content;
  }

  :global(.receipt.image-saved .delete-btn) {
    display: none;
  }
  :global(.receipt.image-saved input) {
    display: none;
  }
  :global(.receipt.image-saved textarea) {
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
