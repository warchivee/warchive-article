<script>
  import RecordRow from "./RecordRow.svelte";
  import { saveToLocalStorage } from "../../utils/localStorageManager";

  export let theme;
  export let publishWatasSummary;
  export let works = [];
  export let selectedDates = [];

  $: filteredWorks = works.filter((work) => {
    const workDate = new Date(work.date);

    if (!selectedDates || selectedDates.length === 0) {
      return true;
    }

    const startYear = selectedDates[0].getFullYear();
    const startMonth = selectedDates[0].getMonth();

    const workYear = workDate.getFullYear();
    const workMonth = workDate.getMonth();

    if (selectedDates.length === 1 || selectedDates[0] == selectedDates[1]) {
      return workYear === startYear && workMonth === startMonth;
    } else if (selectedDates.length > 1 && selectedDates[1]) {
      const endDate = selectedDates[1];
      const endYear = endDate.getFullYear();
      const endMonth = endDate.getMonth();

      const workYM = workYear * 100 + workMonth;
      const startYM = startYear * 100 + startMonth;
      const endYM = endYear * 100 + endMonth;

      return workYM >= startYM && workYM <= endYM;
    }
  });

  function addWork() {
    works = [
      ...works,
      {
        date: null,
        category: "",
        title: "",
        rating: "",
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

  {#each filteredWorks as work, i (work)}
    <RecordRow bind:work {publishWatasSummary} {theme} bind:works />
  {/each}

  <button class="add-btn" on:click={addWork}>+ Add work here</button>
</div>

<div class="total">
  <span>Total</span>
  <span>{filteredWorks.length} works</span>
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

  :global(.receipt.image-saved .add-btn) {
    display: none;
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
