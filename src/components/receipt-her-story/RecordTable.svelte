<script>
  import RecordRow from "./RecordRow.svelte";
  import { saveToLocalStorage } from "../../utils/localStorageManager";

  import { v4 as uuidv4 } from "uuid";

  export let theme;
  export let publishWatasSummary;
  export let works = [];
  export let selectedDates = [];

  $: filteredWorks = [...works]
    .sort((a, b) => {
      const aEmpty = !a.category && !a.title && !a.rating;
      const bEmpty = !b.category && !b.title && !b.rating;

      const aNoDate = !a.date;
      const bNoDate = !b.date;

      // 1) 날짜 없는 게 위
      if (aNoDate && !bNoDate) return -1;
      if (!aNoDate && bNoDate) return 1;

      // 2) 둘 다 날짜 없으면, 비어있는 게 위
      if (aNoDate && bNoDate) {
        if (aEmpty && !bEmpty) return -1;
        if (!aEmpty && bEmpty) return 1;
        return 0; // 둘 다 같으면 순서 유지
      }

      // 3) 날짜 있는 항목은 최신순
      return new Date(b.date) - new Date(a.date);
    })
    .filter((work) => {
      const workDate = new Date(work.date);

      if (!selectedDates || selectedDates.length === 0) {
        return true;
      }

      if (!work.date) {
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

  function handleRemove(event) {
    const idToRemove = event.detail.id;

    // 1. Array.prototype.filter()를 사용하여 해당 ID를 제외한 새 배열 생성
    //    (id를 기반으로 하므로 인덱스 오류가 발생하지 않습니다.)
    const updatedWorks = works.filter((w) => w.id !== idToRemove);

    // 2. 새로운 배열로 works를 재할당하여 Svelte의 반응성을 트리거하고 UI를 업데이트합니다.
    works = updatedWorks;
    saveToLocalStorage("receipt-works", works);
  }

  function handleUpdate(event) {
    const { id, work: updatedWork } = event.detail;

    // 1. works 배열을 업데이트
    works = works.map((w) => (w.id === id ? updatedWork : w));

    saveToLocalStorage("receipt-works", works);
    // 2. works = ... (재할당)을 했으므로 Svelte가 변경을 감지합니다.
  }
</script>

<div class="table">
  <div class="row header-row">
    <div>Date</div>
    <div>Category</div>
    <div>Title</div>
    <div>Rating</div>
  </div>

  {#each filteredWorks as work (work.id)}
    <RecordRow
      {work}
      on:update={handleUpdate}
      on:remove={handleRemove}
      {publishWatasSummary}
      {theme}
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
</style>
