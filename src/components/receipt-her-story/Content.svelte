<script>
  import { onMount } from "svelte";
  import { getData, patchData } from "../../utils/api.util";
  import {
    loadFromLocalStorage,
    saveToLocalStorage,
  } from "../../utils/localStorageManager";
  import userUtil from "../../utils/user.util";

  import Snackbar from "../Snackbar.svelte";

  import ThemePicker from "./ThemePicker.svelte";
  import SocialShare from "./SocialShare.svelte";
  import DateFilter from "./DateFilter.svelte";
  import RecordTable from "./RecordTable.svelte";

  let showSnackbar = false;

  let selectedYear;
  let selectedMonth;

  let theme = "black";

  let loading = true;

  let works = [];

  let publishWatasSummary = [];

  function openSnackbar() {
    showSnackbar = true;

    setTimeout(() => {
      showSnackbar = false;
    }, 3000);
  }

  async function loadSummaryForAutoCompleting() {
    const result = await getData("publish-wata/summary");
    publishWatasSummary = result;
  }

  async function loadWorks() {
    if (userUtil.exist()) {
      const datas = await getData("receipt");
      works = datas;
      saveToLocalStorage("receipt-works", datas);
      return;
    }

    works = loadFromLocalStorage("receipt-works") || [];
  }

  function showGuide() {
    if (works.length > 0) return;
    const today = new Date();
    works = [
      {
        date: today.toISOString().slice(0, 10),
        title: "+ Add work 로 작품을 추가하세요",
        category: "게임",
        rating: "good",
      },
      {
        date: today.toISOString().slice(0, 10),
        title: "로그인하면 데이터를 동기화 할 수 있어요",
        category: "공연/전시",
        rating: "middle",
      },
      {
        date: today.toISOString().slice(0, 10),
        title: "상단의 달력 버튼을 눌러 날짜 별로 영수증을 필터링 해보세요",
        category: "만화",
        rating: "bad",
      },
      {
        date: today.toISOString().slice(0, 10),
        category: "서적",
        title: "이미지를 저장해 친구들에게 공유해보세요",
        rating: "middle",
      },
      {
        date: today.toISOString().slice(0, 10),
        category: "영상",
        title: "제목을 입력하면 와카이브에 등록된 작품이 자동완성 됩니다",
        rating: "good",
      },
    ];
  }

  onMount(async () => {
    try {
      loading = true;

      await loadSummaryForAutoCompleting();

      await loadWorks();

      showGuide();

      loading = false;
    } catch (error) {
      console.error(error);
    }
  });
</script>

<aside>
  <button
    on:click={async () => {
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
    }}>데이터 동기화</button
  >
  <ThemePicker bind:theme />
</aside>

<section class="receipt black" id="receiptHerStory">
  {#if loading}
    <div class="loading"></div>
  {/if}

  <div class="header">
    <div class="title">*WARCHIVE*</div>

    <DateFilter bind:selectedYear bind:selectedMonth />
  </div>

  <div class="subtitle">RECEIPT FOR WOMEN'S STORIES</div>

  <RecordTable
    bind:works
    {theme}
    {selectedYear}
    {selectedMonth}
    {publishWatasSummary}
  />

  <div class="forms">
    <div>
      <div>Name:</div>
      <div
        class="name-input"
        contenteditable="true"
        data-placeholder="Write your name"
        on:blur={(e) => {
          if (/^\s*$/.test(e.target.innerText)) e.target.innerText = "";
        }}
      >
        {userUtil.get()?.nickname ?? ""}
      </div>
    </div>
    <div>
      <div>Record Date:</div>
      {#if selectedYear}
        {selectedYear} 년
      {/if}
      {#if selectedYear && selectedMonth}
        {selectedMonth} 월
      {/if}
      {#if !selectedYear && !selectedMonth}
        All Date
      {/if}
    </div>
  </div>

  <div class="footer">
    <div class="thanks">THANK YOU FOR ARCHIVING HER WORLD.</div>
    <div class="barcode">
      <div class="code">womynarchive</div>
      <div class="url">www.womynarchive.com</div>
    </div>
  </div>
</section>

<SocialShare />

{#if showSnackbar}
  <Snackbar message="로그인이 필요합니다." />
{/if}

<style>
  :global(main *) {
    letter-spacing: 0.5px;
    font-family: var(--receipt-font-family);
  }

  .loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: 0.4;
  }

  aside {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;
  }

  button {
    background-color: transparent;
    border: 1px dashed black;
    font-size: 0.8em;
    cursor: pointer;
  }

  .receipt {
    --receipt-theme-color: #000000;
    flex: 1;
    width: 100%;
    padding: 10px;
    background: white;
    transition:
      background-color 0.3s,
      color 0.3s;

    color: var(--receipt-theme-color);

    margin-top: 10px;
    margin-bottom: 20px;

    display: flex;
    flex-direction: column;
  }

  .header {
    position: relative;
  }

  .title {
    margin: 0 auto;
    font-size: 1.25rem;
    background: var(--receipt-theme-color);
    width: fit-content;
    color: white;
    padding: 5px;
    transition:
      background-color 0.3s,
      color 0.3s;
  }

  .subtitle {
    font-size: 0.8rem;
    text-align: center;
    padding: 8px 0;
    margin: 15px 0;
    border-block: 1px dashed var(--receipt-theme-color);
  }

  .forms {
    font-size: 0.75rem;
    border-block: 1px dashed var(--receipt-theme-color);
    padding: 10px 0;
  }

  .forms > div {
    display: flex;
    justify-content: space-between;
  }

  .name-input {
    display: inline-block;
    min-width: 100px;
    text-align: right;
  }

  .name-input:empty:before {
    content: attr(data-placeholder);
    color: #aaa;
    pointer-events: none;
  }

  .footer {
    width: 100%;
    margin-top: 30px;
  }

  .thanks {
    text-align: center;
    font-size: 0.75rem;
  }

  .barcode .code {
    font-family: "KODE39", system-ui;
    font-size: 2.75rem;
    margin-bottom: -20px;
    text-align: center;
  }

  .barcode .url {
    font-size: 0.7rem;
    text-align: center;
  }
</style>
