<script>
  export let colors = ["#000000", "#e91e63", "#2196f3", "#09a11c", "#9023d5"];

  function changeTheme(color) {
    const receipt = document.querySelector(".receipt");
    if (!receipt) return;

    receipt.style.setProperty("--receipt-theme-color", color);
  }
</script>

<section>
  {#each colors as color}
    <button
      style="background: {color}7a; border-color:{color}"
      on:click={() => changeTheme(color)}
    ></button>
  {/each}
</section>

<style>
  section {
    width: 100%;
    text-align: right;
  }

  button {
    display: inline-block;
    margin: 5px;
    padding: 0;
    width: 15px;
    height: 15px;
    border: 1px dashed;
    cursor: pointer;
  }
</style>
