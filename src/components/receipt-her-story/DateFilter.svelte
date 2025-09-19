<script>
  export let selectedYear = "";
  export let selectedMonth = "";

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, i) =>
    String(currentYear - i)
  );

  const monthOptions = Array.from({ length: 12 }, (_, i) => String(i + 1));

  let isOpenSelect = false;

  function openSelect() {
    isOpenSelect = true;
  }

  function closeSelect(e) {
    if (
      !(
        e.relatedTarget?.id == "receipt-year" ||
        e.relatedTarget?.id == "receipt-month"
      )
    ) {
      isOpenSelect = false;
    }
  }
</script>

{#if !isOpenSelect}
  <div on:click={openSelect} aria-hidden="true" class="date-text">
    {selectedYear
      ? selectedMonth
        ? `${selectedYear} 년 ${selectedMonth} 월`
        : `${selectedYear} 년`
      : "전체 보기"}
  </div>
{:else}
  <div on:focusout={closeSelect}>
    <!-- svelte-ignore a11y-autofocus -->
    <select id="receipt-year" bind:value={selectedYear} autofocus>
      <option value="">전체</option>
      {#each yearOptions as year}
        <option value={year}>{year}</option>
      {/each}
    </select>
    년
    <select id="receipt-month" bind:value={selectedMonth}>
      <option value="">전체</option>
      {#each monthOptions as month}
        <option value={month}>{month.padStart(2, "0")}</option>
      {/each}
    </select>
    월
  </div>
{/if}

<style>
  .date-text {
    cursor: pointer;
  }

  select {
    font-family: var(--receipt-font-family);
    border: 1px dashed var(--receipt-theme-color);
  }
</style>
