<script>
  import RecordRow from "./RecordRow.svelte";
  import { saveToLocalStorage } from "../../utils/localStorageManager";

  export let theme;
  export let publishWatasSummary;
  export let works = [];
  export let selectedYear = null;
  export let selectedMonth = null;

  $: filteredWorks = works.filter((work) => {
    if (work.action === "DELETE") return false;

    if (!selectedYear && !selectedMonth) return true;

    const date = new Date(work.date);
    const yearMatch = +date.getFullYear() === +selectedYear;
    const monthMatch =
      +selectedMonth === 0 ? true : +(date.getMonth() + 1) === +selectedMonth;

    return yearMatch && monthMatch;
  });

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
      {
        date: d,
        category: "---",
        title: "--------",
        rating: "",
        action: "CREATE",
      },
    ];

    saveToLocalStorage("receipt-works", works);
  }
</script>

<div class="table">
  <div class="row header-row">
    <div>Date</div>
    <div>Category</div>
    <div>Title</div>
    <div>Rating</div>
  </div>

  {#each filteredWorks as work}
    <RecordRow bind:work {publishWatasSummary} {theme} {works} />
  {/each}

  <button class="add-btn" on:click={addWork}>+ Add work here</button>
</div>

<div class="total">
  <span>Total</span>
  <span>{works.filter((work) => work.action !== "DELETE").length} works</span>
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
    grid-template-columns: 76px 60px 1fr 45px 16px;
    align-items: center;
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

  .total {
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
    font-weight: bold;
    padding: 10px 0;
    border-top: 1px dashed var(--receipt-theme-color);
  }
</style>
