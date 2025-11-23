<script>
  import { getData, putData } from "../../utils/api.util";
  import userUtil from "../../utils/user.util";
  import Snackbar from "../Snackbar.svelte";
  import {
    loadFromLocalStorage,
    saveToLocalStorage,
  } from "../../utils/localStorageManager";

  export let works;
  export let loading = false;

  let showSnackbar = false;

  let open = false;
  let lastSyncedAt;

  function openSnackbar() {
    showSnackbar = true;

    setTimeout(() => {
      showSnackbar = false;
    }, 3000);
  }

  async function openPopup() {
    const isLoggedIn = userUtil.exist();

    if (!isLoggedIn) {
      openSnackbar();
      return;
    }

    const syncInfo = await getData("receipt/sync");
    lastSyncedAt = syncInfo?.last_synced_at
      ? new Date(syncInfo.last_synced_at)
      : null;

    open = true;
  }

  async function onConfirm() {
    try {
      loading = true;

      const params = loadFromLocalStorage("receipt-works");

      if (!params || params?.length === 0) {
        loading = false;
        return;
      }

      const updated = await putData("receipt/sync", params);

      works = updated.datas;
      saveToLocalStorage("receipt-works", works);
      saveToLocalStorage("receipt-last-synced-at", updated.last_synced_at);

      open = false;

      loading = false;
    } catch (error) {
      console.error(error);
      loading = false;
    }
  }

  function onCancel() {
    open = false;
  }
</script>

<!-- <button on:click={openPopup}>데이터 동기화</button> -->
{#if open}
  <div class="overlay" on:click={onCancel} aria-hidden="true">
    <div class="popup" on:click|stopPropagation aria-hidden="true">
      <div>
        <div><i class="fa-solid fa-triangle-exclamation"></i> 주의</div>
        <p>
          로컬 데이터를 서버로 동기화합니다. 서버 데이터는 현재 로컬 데이터로
          덮어쓰여집니다. 계속 진행하시겠습니까?
        </p>
        <p class="sync">
          마지막 동기화 시간: {lastSyncedAt
            ? lastSyncedAt.toLocaleString("ko-KR")
            : "동기화된 기록이 없음"}
        </p>
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

  .sync {
    font-size: 0.7em;
    font-weight: bold;
  }
</style>
