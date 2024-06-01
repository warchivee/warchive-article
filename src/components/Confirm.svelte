<script>
  export let message = "Are you sure?";
  export let onConfirm;
  export let onCancel;
  export let loading = false;

  function handleConfirm() {
    if (onConfirm) onConfirm();
  }

  function handleCancel() {
    if (onCancel) onCancel();
  }
</script>

<div class="popup-backdrop">
  <div class="popup">
    <h3>확인</h3>

    <p>{@html message}</p>
    <div class="buttons">
      <button class="confirm" on:click={handleConfirm}>
        {#if loading}
          요청중...
        {:else}
          네
        {/if}</button
      >
      <button class="cancel" on:click={handleCancel}>아니오</button>
    </div>
  </div>
</div>

<style>
  .popup-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .popup {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 20px;
  }

  .confirm {
    background-color: #9339ff;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }

  .cancel {
    background-color: #ffffff;
    color: #9339ff;
    border: 2px solid #9339ff;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
