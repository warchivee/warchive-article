<script>
  import userUtil from "../../utils/user.util";
  import Snackbar from "../Snackbar.svelte";

  export let loading = false;

  let showSnackbar = false;

  let open = false;

  function openSnackbar() {
    showSnackbar = true;

    setTimeout(() => {
      showSnackbar = false;
    }, 3000);
  }

  async function onConfirm() {
    try {
      const isLoggedIn = userUtil.exist();

      if (!isLoggedIn) {
        openSnackbar();
        return;
      }

      loading = true;

      const params = loadFromLocalStorage("receipt-works")?.filter((item) => {
        if (!item.id && item.action === "DELETE") {
          return false;
        }

        if (!item?.action) {
          return false;
        }

        return true;
      });

      if (!params || params?.length === 0) {
        loading = false;
        return;
      }

      const updated = await patchData("receipt/bulk", params);

      works = updated;
      saveToLocalStorage("receipt-works", updated);

      loading = false;
    } catch (error) {
      console.error(error);
    }
  }

  function onCancel() {
    open = false;
  }
</script>

<button on:click={() => (open = true)}>데이터 동기화</button>
{#if open}
  <div class="overlay" on:click={onCancel}>
    <div class="popup" on:click|stopPropagation>
      <div>
        <div><i class="fa-solid fa-triangle-exclamation"></i> 주의</div>
        <p>현재 내용을 서버에 동기화합니다. 계속할까요?</p>
      </div>

      <div class="buttons">
        <button on:click={onCancel}>취소</button>
        <button class="confirm" on:click={onConfirm}>계속</button>
      </div>
    </div>
  </div>
{/if}

{#if showSnackbar}
  <Snackbar message="로그인이 필요합니다." />
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }

  .popup {
    background: white;
    border-radius: 6px;
    padding: 20px;
    width: 300px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    text-align: center;
    font-size: 0.9em;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
    gap: 12px;
  }

  button {
    background-color: transparent;
    border: 1px dashed black;
    font-size: 0.8em;
    cursor: pointer;
  }

  p {
    font-size: 0.9em;
    letter-spacing: -1px;
  }

  .confirm {
    background: black;
    color: white;
  }
</style>
