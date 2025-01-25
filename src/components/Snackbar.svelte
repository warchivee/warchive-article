<script>
  export let message = "";
  export let position = "bottom";
</script>

<div class="snackbar {position}">
  {message}
</div>

<style>
  .snackbar {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-black);
    color: var(--color-white);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 999;
    min-width: 250px;
    text-align: center;
  }

  .snackbar.bottom {
    bottom: 20px;
  }

  .snackbar.top {
    top: 20px;
  }

  .snackbar.center {
    top: 50%;
  }
</style>
