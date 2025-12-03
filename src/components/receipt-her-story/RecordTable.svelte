<script>
  import { saveToLocalStorage } from "../../utils/localStorageManager";

  import { v4 as uuidv4 } from "uuid";
  import RecordRow from "./RecordRow.svelte";

  export let works = [];
  export let selectedDates;
  export let theme;
  export let publishWatasSummary = [];

  $: filteredWorks = [
    ...works.filter((work) => handleFilter(work, selectedDates)),
  ].sort((a, b) => {
    const aNoDate = !a.date;
    const bNoDate = !b.date;
    if (aNoDate && !bNoDate) return -1;
    if (!aNoDate && bNoDate) return 1;
    return new Date(b.date) - new Date(a.date);
  });

  function handleFilter(work, dates) {
    if (!work) return;

    const workDate = new Date(work.date);

    if (!dates || dates.length === 0) return true;
    if (!work.date) return true;

    const startYear = dates[0].getFullYear();
    const startMonth = dates[0].getMonth();

    const workYear = workDate.getFullYear();
    const workMonth = workDate.getMonth();

    if (dates.length === 1 || dates[0] == dates[1]) {
      return workYear === startYear && workMonth === startMonth;
    } else if (dates.length > 1 && dates[1]) {
      const endDate = dates[1];
      const endYear = endDate.getFullYear();
      const endMonth = endDate.getMonth();

      const workYM = workYear * 100 + workMonth;
      const startYM = startYear * 100 + startMonth;
      const endYM = endYear * 100 + endMonth;

      return workYM >= startYM && workYM <= endYM;
    }
  }

  function addWork() {
    works = [
      {
        id: uuidv4(),
        date: null,
        category: "",
        title: "",
        rating: "",
      },
      ...works,
    ];

    saveToLocalStorage("receipt-works", works);
  }

  function handleRemove(updatedWork) {
    const updatedWorks = works.filter((w) => w.id !== updatedWork.id);
    works = updatedWorks;
    saveToLocalStorage("receipt-works", works);
  }

  function handleUpdate(updatedWork) {
    const index = works.findIndex((w) => w.id === updatedWork.id);
    works[index] = updatedWork;

    const updatedWorks = works.map((w) => {
      if (w.id === updatedWork.id) {
        return updatedWork;
      } else {
        return w;
      }
    });
    works = updatedWorks;

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

  {#each filteredWorks as work, i (work.id + "-" + i)}
    <RecordRow
      {work}
      {handleUpdate}
      {handleRemove}
      {theme}
      {publishWatasSummary}
    />
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

  .row {
    position: relative;
    display: grid;
    gap: 4px;
    grid-template-columns: 60px 55px 1fr 60px 16px;
    align-items: center;
  }
</style>
