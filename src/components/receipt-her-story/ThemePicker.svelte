<script>
  export let theme;

  const colors = [
    {
      hex: "#000000",
      name: "black",
    },
    {
      hex: "#e91e63",
      name: "red",
    },
    {
      hex: "#2196f3",
      name: "blue",
    },
    {
      hex: "#09a11c",
      name: "green",
    },
    {
      hex: "#9023d5",
      name: "purple",
    },
  ];

  function changeTheme(color) {
    const receipt = document.querySelector(".receipt");
    if (!receipt) return;
    receipt.style.setProperty("--receipt-theme-color", color.hex);

    theme = color.name;
  }
</script>

<div>
  {#each colors as color}
    <button
      style="background: {color.hex}7a; border-color:{color.hex}"
      on:click={() => changeTheme(color)}
    ></button>
  {/each}
</div>

<style>
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
