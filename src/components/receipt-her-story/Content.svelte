<script lang="ts">
  import { onMount } from "svelte";
  import { getData, patchData } from "../../utils/api.util";
  import {
    loadFromLocalStorage,
    saveToLocalStorage,
  } from "../../utils/localStorageManager";
  import userUtil from "../../utils/user.util";

  import ThemePicker from "./ThemePicker.svelte";
  import SocialShare from "./SocialShare.svelte";
  import DateFilter from "./DateFilter.svelte";
  import RecordTable from "./RecordTable.svelte";

  let selectedYear;
  let selectedMonth;

  let theme = "black";

  let loading = true;

  let works = [];

  let publishWatasSummary = [];

  onMount(async () => {
    try {
      loading = true;

      const result = await getData<any[]>("publish-wata/summary");
      publishWatasSummary = result;

      works = loadFromLocalStorage("receipt-works") || [];

      if (works?.length !== 0 || !userUtil.exist()) {
        loading = false;
        return;
      }

      const datas = await getData<
        {
          id: number;
          date: string;
          category: string;
          title: string;
          rating: string;
        }[]
      >("receipt");

      works = datas;
      saveToLocalStorage("receipt-works", datas);

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

        const updated = await patchData("receipt", params);

        works = updated;
        saveToLocalStorage("receipt-works", updated);

        loading = false;
      } catch (error) {
        console.error(error);
      }
    }}>서버에 저장하기</button
  >
  <ThemePicker bind:theme />
</aside>

<section class="receipt black" id="receiptHerStory">
  {#if loading}
    <div class="loading"></div>
  {/if}

  <div class="title">*WARCHIVE*</div>

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
      <DateFilter bind:selectedYear bind:selectedMonth />
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
