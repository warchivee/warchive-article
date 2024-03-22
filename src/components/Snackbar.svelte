<script>
  export let message = "";
</script>

<div class="snackbar">
  {message}
</div>

<style>
  .snackbar {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-black);
    color: var(--color-white);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
    border-radius: 5px;
    z-index: 999;
  }
</style>
