<script>
  import { onMount } from "svelte";
  import { getData } from "../../utils/api.util";
  import {
    loadFromLocalStorage,
    saveToLocalStorage,
  } from "../../utils/localStorageManager";

  import { v4 as uuidv4 } from "uuid";

  import userUtil from "../../utils/user.util";

  import SyncButton from "./SyncButton.svelte";
  import ThemePicker from "./ThemePicker.svelte";
  import SocialShare from "./SocialShare.svelte";
  import RecordTable from "./RecordTable.svelte";

  import svlatepickr from "svelte-flatpickr-plus";
  import blockedWords from "/public/assets/blockedWords.txt?raw";

  function removeBlockedWords(str) {
    const testStr = str ?? "";
    try {
      const profanityList = blockedWords
        .split("\n")
        .map((word) => word.replace(/\s/g, ""))
        .filter((word) => word !== "");

      if (profanityList.length === 0) return testStr;

      // 비속어를 찾고 제거
      const regexPattern = new RegExp(`${profanityList.join("|")}`, "gi");
      const cleanedStr = testStr.replace(regexPattern, "");

      return cleanedStr;
    } catch (err) {
      return str;
    }
  }

  let datePickerElement;

  let selectedDates;

  const options = {
    isMonthPicker: true,
    mode: "range",
    locale: "ko",
    dateFormat: "Y년 m월",
    onChange: (dates, dateStr) => {
      selectedDates = dates;
    },
  };

  let theme = "black";

  let loading = false;

  let works = [];

  let nickname = "";

  let publishWatasSummary = [];

  function clearDatePicker() {
    datePickerElement._flatpickr.clear();
  }

  async function loadSummaryForAutoCompleting() {
    const result = await getData("publish-wata/summary");
    publishWatasSummary = result;
  }

  async function getWorks() {
    const datas = await getData("receipt");
    works = datas;
    saveToLocalStorage("receipt-works", datas);
  }

  async function loadWorks() {
    const localWorks = loadFromLocalStorage("receipt-works") || [];

    // if (!userUtil.exist()) {
    //   works = localWorks;
    //   return;
    // }

    // // 데이터가 아예 없으면 서버 내용을 불러오기
    // if (localWorks.length <= 0) {
    //   await getWorks();
    //   return;
    // }

    // // 로컬 동기화 시간과 서버 동기화 시간이 다르면 최신 내용으로 불러오기
    // const serverSync = await getData("receipt/sync");
    // const localSyncedAt = loadFromLocalStorage("receipt-last-synced-at");
    // const serverTime = new Date(serverSync?.last_synced_at).getTime();
    // const localTime = new Date(localSyncedAt).getTime();

    // if (isNaN(localTime) || serverTime > localTime) {
    //   await getWorks();
    //   return;
    // }

    works = localWorks;
  }

  function showGuide() {
    if (works.length > 0) return;

    works = [
      {
        id: uuidv4(),
        title: "+ Add work 로 작품을 추가하세요",
        category: "게임",
        rating: "good",
      },
      {
        id: uuidv4(),
        title: "날짜 별로 영수증을 필터링 해보세요",
        category: "공연/전시",
        rating: "middle",
      },
      {
        id: uuidv4(),
        category: "만화",
        title: "제목을 입력하면 카테고리와 전체 제목이 자동으로 채워집니다",
        rating: "bad",
      },
      {
        id: uuidv4(),
        category: "서적",
        title: "이미지를 저장해 친구들에게 공유해보세요",
        rating: "middle",
      },
      // {
      //   title: "로그인하면 데이터를 동기화 할 수 있어요",
      //   category: "영상",
      //   rating: "good",
      // },
    ];
  }

  function getDateStr() {
    if (!selectedDates || selectedDates.length === 0) {
      return "모든 일자";
    }

    let start;
    let end;

    if (selectedDates[0]) {
      start =
        new Date(selectedDates[0])
          .toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
          })
          .replace(/\./, "년 ")
          .replaceAll(".", "") + "월";
    }

    if (selectedDates[1]) {
      end =
        new Date(selectedDates[1])
          .toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
          })
          .replace(/\./, "년 ")
          .replaceAll(".", "") + "월";
    }

    if (!end || start === end) {
      return start;
    }

    return start + " ~ " + end;
  }

  onMount(async () => {
    try {
      loading = true;

      await loadSummaryForAutoCompleting();

      await loadWorks();

      showGuide();
    } catch (error) {
      console.error(error);
    } finally {
      loading = false;
    }
  });
</script>

<aside>
  <SyncButton bind:loading bind:works />
  <ThemePicker bind:theme />
</aside>

<section class="receipt black" id="receiptHerStory">
  {#if loading}
    <div class="loading"></div>
  {/if}

  <div class="header">
    <div class="title">*WARCHIVE*</div>
  </div>

  <div class="subtitle">RECEIPT FOR WOMEN'S STORIES</div>

  <RecordTable bind:works {theme} {selectedDates} {publishWatasSummary} />

  <div class="forms">
    <div>
      <div>Name:</div>
      <div
        class="name-input"
        contenteditable="true"
        data-placeholder="이름을 입력하세요"
        bind:innerHTML={nickname}
        on:input={(e) => {
          let value = e.target.textContent;

          value = removeBlockedWords(value);

          // 길이 제한
          if (value.length > 10) {
            value = value.slice(0, 10);
            e.target.textContent = value;

            // 커서가 맨 앞으로 튀는 문제 방지
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(e.target);
            range.collapse(false); // 끝으로 이동
            sel.removeAllRanges();
            sel.addRange(range);
          }

          nickname = value;
        }}
      ></div>
    </div>
    <div>
      <div>Record Date:</div>
      <div>
        <input
          class="date-range-picker"
          name="datepicker"
          placeholder="날짜를 선택해 필터링하세요"
          bind:this={datePickerElement}
          use:svlatepickr={options}
        />
        {#if selectedDates}
          <span class="reset delete-btn" on:click={clearDatePicker}>×</span>
        {/if}
        <div class="input-saved">{getDateStr()}</div>
      </div>
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

<div class="noti">인터넷 캐시, 쿠키 초기화 시 영수증 내역이 초기화됩니다.</div>

<style>
  .noti {
    margin-top: 20px;
    color: gray;
    font-size: 12px;
    text-align: center;
  }

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

  .date-range-picker {
    width: 200px;
    text-align: right;
    border: none;
  }

  .reset {
    font-size: 12px;
    cursor: pointer;
    color: var(--receipt-theme-color);
    padding: 2px 4px;
  }
</style>
