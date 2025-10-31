<script>
  import { onMount, onDestroy } from "svelte";
  import { saveToLocalStorage } from "../../utils/localStorageManager";

  export let theme;

  export let works;
  export let publishWatasSummary;
  export let work;

  let dropdownRef;
  let showDropdown = false;
  let showDatePicker = false;
  let filteredSuggestions = [];

  function formatDate(dateStr) {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${year.slice(2)}-${month}-${day}`;
  }

  function updated() {
    if (work.action !== "ADD") {
      work.action = "UPDATE";
    }

    saveToLocalStorage("receipt-works", works);
  }

  function handleTitleInput(input) {
    work.title = input;
    updated();

    if (input.length > 0) {
      filteredSuggestions = publishWatasSummary.filter((item) =>
        item.title.toLowerCase().includes(input.toLowerCase())
      );
      showDropdown = filteredSuggestions.length > 0;
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
    work.action = "DELETE";

    saveToLocalStorage("receipt-works", works);
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
  {#if showDatePicker}
    <div></div>
    <input
      type="date"
      bind:value={work.date}
      on:change={() => (showDatePicker = false)}
      on:blur={() => (showDatePicker = false)}
      autofocus
    />
  {:else}
    <div on:click={() => (showDatePicker = true)} aria-hidden="true">
      {formatDate(work.date)}
    </div>
  {/if}

  <div
    contenteditable="true"
    class="category"
    on:input={(e) => {
      work.category = e.target.textContent;
      updated();
    }}
    bind:innerHTML={work.category}
  ></div>

  <div
    contenteditable="true"
    class="title"
    bind:innerHTML={work.title}
    on:input={(e) => handleTitleInput(e.target.textContent.trim())}
  ></div>

  {#if showDropdown}
    <div class="dropdown" bind:this={dropdownRef}>
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

  <div class="rating">
    {#each ["bad", "middle", "good"] as rating}
      <img
        src="receipt/{rating}-{theme}.png"
        class={work.rating === rating ? `${rating} selected` : rating}
        aria-hidden="true"
        on:click={() => {
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
    gap: 2px;
    grid-template-columns: 60px 60px 1fr 75px 16px;
    align-items: center;
  }

  .data-row {
    font-size: 0.68rem;
    margin: 5px 0;
    background: rgb(248, 248, 248);
  }

  .title {
    position: relative;
    word-break: break-word;
    overflow-wrap: break-word;
    white-space: pre-wrap;
  }

  input[type="date"] {
    font-family: var(--receipt-font-family);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 105px;
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
    width: 18px;
    height: 18px;
    opacity: 0.2;
  }

  .rating img.selected {
    opacity: 1;
  }

  .delete-btn {
    all: unset;
    cursor: pointer;
  }

  .dropdown {
    position: absolute;
    top: 20px;
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
