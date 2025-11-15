<script>
  export let selectedYear;
  export let selectedMonth;
  let isOpen = false;
  let dropdownRef;

  const years = [2025, 2024, 2023];
  const months = [
    { value: 1, label: "01" },
    { value: 2, label: "02" },
    { value: 3, label: "03" },
    { value: 4, label: "04" },
    { value: 5, label: "05" },
    { value: 6, label: "06" },
    { value: 7, label: "07" },
    { value: 8, label: "08" },
    { value: 9, label: "09" },
    { value: 10, label: "10" },
    { value: 11, label: "11" },
    { value: 12, label: "12" },
  ];

  function resetYear() {
    selectedYear = "";
  }
  function resetMonth() {
    selectedMonth = "";
  }
  function resetAll() {
    selectedYear = "";
    selectedMonth = "";
    isOpen = false;
  }
</script>

{#if isOpen}
  <div class="background" on:click={() => (isOpen = false)}></div>
{/if}
<div class="top-bar">
  <i class="fa-regular fa-calendar" on:click={() => (isOpen = !isOpen)}></i>

  {#if isOpen}
    <div class="dropdown" bind:this={dropdownRef}>
      <!-- YEAR -->
      <div class="row">
        <select bind:value={selectedYear}>
          <option value="">Year</option>
          {#each years as y}
            <option value={y}>{y}</option>
          {/each}
        </select>
        <span class="mini-reset" on:click={resetYear}>×</span>
      </div>

      <!-- MONTH -->
      <div class="row">
        <select bind:value={selectedMonth}>
          <option value="">Month</option>
          {#each months as m}
            <option value={m.value}>{m.label}</option>
          {/each}
        </select>
        <span class="mini-reset" on:click={resetMonth}>×</span>
      </div>

      <!-- FULL RESET -->
      <div class="reset-btn" on:click={resetAll}>Reset All</div>
    </div>
  {/if}
</div>

<style>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    background-color: transparent;
    width: 100%;
    height: 100%;
    z-index: 999;
  }

  :global(.receipt.image-saved .top-bar) {
    display: none;
  }

  .top-bar {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .top-bar i {
    cursor: pointer;
    font-size: 0.9em;
  }

  .dropdown {
    position: absolute;
    top: 40px;
    right: 0;
    background: white;
    border: 1px solid var(--receipt-theme-color);
    padding: 12px;
    width: 160px;
    z-index: 1000;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 10px;
  }

  .row select {
    flex: 1;
    padding: 4px;
    border: 1px dashed var(--receipt-theme-color);
  }

  .mini-reset {
    font-size: 12px;
    cursor: pointer;
    color: var(--receipt-theme-color);
    padding: 2px 4px;
  }

  .mini-reset:hover {
    text-decoration: underline;
  }

  .reset-btn {
    width: 100%;
    padding: 0px 0;
    margin-top: 4px;
    text-align: center;
    border: 1px dashed var(--receipt-theme-color);
    cursor: pointer;
    font-size: 0.6em;
  }

  select,
  option,
  label {
    font-size: 0.7em;
  }
</style>
