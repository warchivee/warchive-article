<script>
  export let works = [];
  export let selectedYear = null;
  export let selectedMonth = null;

  $: filteredWorks = works.filter((work) => {
    if (!selectedYear && !selectedMonth) return true; // 전체보기

    const date = new Date(work.date);
    const yearMatch = +date.getFullYear() === +selectedYear;
    const monthMatch =
      +selectedMonth === 0 ? true : +(date.getMonth() + 1) === +selectedMonth;

    return yearMatch && monthMatch;
  });

  let editingIndex = null; // 현재 날짜 편집 중인 row index

  function enableEditing() {
    editingIndex = null;
  }

  function addWork() {
    const today = new Date();
    const viewAll = +selectedYear === 0;

    const sameYearAsToday = +selectedYear === today.getFullYear();
    const sameMonthAsToday =
      +selectedMonth === 0 || +selectedMonth === today.getMonth() + 1;

    const month = String(
      +selectedMonth === 0 ? today.getMonth() + 1 : selectedMonth
    ).padStart(2, "0");

    const date = String(
      sameYearAsToday && sameMonthAsToday ? today.getDate() : 1
    ).padStart(2, "0");

    const d = viewAll
      ? today.toISOString().slice(0, 10)
      : `${selectedYear}-${month}-${date}`;

    works = [
      ...works,
      { date: d, category: "---", title: "--------", rating: 0 },
    ];
  }

  function removeWork(index) {
    works = works.filter((_, i) => i !== index);
    if (editingIndex === index) enableEditing();
  }
</script>

<div class="table">
  <div class="row header-row">
    <div>Date</div>
    <div>Category</div>
    <div>Title</div>
    <div>Rating</div>
  </div>

  {#each filteredWorks as work, index}
    <div class="row data-row">
      {#if editingIndex === index}
        <div></div>
        <!-- input 자리 채워주는 빈 div -->
        <input
          type="date"
          bind:value={work.date}
          on:change={enableEditing}
          on:blur={enableEditing}
          autofocus
        />
      {:else}
        <div on:click={() => (editingIndex = index)} aria-hidden="true">
          {work.date}
        </div>
      {/if}
      <div
        contenteditable="true"
        class="category"
        on:input={(e) => (work.category = e.target.textContent)}
      >
        {work.category}
      </div>
      <div
        contenteditable="true"
        class="title"
        on:input={(e) => (work.title = e.target.textContent)}
      >
        {work.title}
      </div>
      <div class="star-rating">
        {#each [0, 1, 2] as i}
          <span
            class="star {work.rating >= i + 1
              ? 'full'
              : work.rating >= i + 0.5
                ? 'half'
                : ''}"
            on:click={(e) => {
              const rect = e.target.getBoundingClientRect();
              const half = e.clientX - rect.left < rect.width / 2 ? 0.5 : 1;
              work.rating = i + half;
            }}
            aria-hidden="true">★</span
          >
        {/each}
      </div>
      <button class="delete-btn" on:click={() => removeWork(index)}>[×]</button>
    </div>
  {/each}

  <button class="add-btn" on:click={addWork}>+ Add work here</button>
</div>

<div class="total">
  <span>Total</span>
  <span>{works.length} works</span>
</div>

<style>
  .table {
    flex: 1;
  }
  .header-row {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .header-row > div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.6rem;
  }

  .row {
    position: relative;
    display: grid;
    gap: 2px;
    grid-template-columns: 76px 40px 1fr 45px 16px;
    align-items: center;
  }

  .data-row {
    font-size: 0.68rem;
    margin: 5px 0;
    background: rgb(248, 248, 248);
  }

  .title {
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

  .star-rating {
    display: flex;
    cursor: pointer;
    font-size: 0.9rem;
    user-select: none;
  }

  .star {
    color: #ccc;
    position: relative;
    width: 0.9rem;
    text-align: center;
  }

  .star.full {
    color: var(--receipt-theme-color);
  }

  .star.half::before {
    content: "★";
    color: var(--receipt-theme-color);
    position: absolute;
    left: 0;
    width: 50%;
    overflow: hidden;
  }

  .add-btn {
    all: unset;
    cursor: pointer;
    font-size: 0.7rem;
    color: black;
    padding: 5px 0px;
    margin-bottom: 5px;
    color: var(--receipt-theme-color);
  }

  .delete-btn {
    all: unset;
    cursor: pointer;
  }

  .total {
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
    font-weight: bold;
    padding: 10px 0;
    border-top: 1px dashed var(--receipt-theme-color);
  }
</style>
