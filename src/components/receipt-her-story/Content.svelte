<script>
  import ThemePicker from "./ThemePicker.svelte";
  import SocialShare from "./SocialShare.svelte";
  import DateFilter from "./DateFilter.svelte";
  import RecordTable from "./RecordTable.svelte";

  let selectedYear;
  let selectedMonth;

  /** example
   {
      date: "2025-08-10",
      category: "뮤지컬",
      title: "정년이",
      rating: 0,
    },
   */
  let works = [];
</script>

<ThemePicker />

<section class="receipt black">
  <div class="title">*WARCHIVE*</div>

  <div class="subtitle">RECEIPT FOR WOMEN'S STORIES</div>

  <RecordTable bind:works {selectedYear} {selectedMonth} />

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
      ></div>
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
