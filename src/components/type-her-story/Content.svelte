<script lang="ts">
  //utils
  import { onMount } from "svelte";

  import {
    updateStyles,
    settings,
  } from "../../utils/type-her-story/setting.ts";
  import {
    getFilteredData,
    getItemStatusById,
    toggleBookmark,
    completed,
  } from "../../utils/type-her-story/data.ts";

  import Snackbar from "../Snackbar.svelte";
  import List from "./List.svelte";
  import Typing from "./Typing.svelte";
  import Setting from "./Setting.svelte";
  import { loadFromLocalStorage } from "../../utils/localStorageManager.ts";

  let filterBookmarks = false;

  let showSnackbar = false;
  let snackbarMessage = "";

  let loading = true;

  let openList = false;
  let openSetting = false;

  let datas = [
    {
      id: 1,
      title: "여수의 사랑",
      creator: "한강",
      publisher: "출판사",
      content:
        "중얼거리거나 한숨을 쉬며 정적을 깨면 그 소리로 인해 더욱 내가 혼자임이 실감된다는 것을 알고 있었다. 나는 용케 침묵을 지켰다. 숨소리를 죽이며, 아무것도 생각하지 않으려 애쓰며 일했다.",
    },
    {
      id: 2,
      title: "여수의 여수의 여수의 사랑",
      creator: "한강",
      publisher: "출판사",
      content:
        "중얼거리거나 한숨을 쉬며 정적을 깨면 그 소리로 인해 더욱 내가 혼자임이 실감된다는 것을 알고 있었다. 나는 용케 침묵을 지켰다. 숨소리를 죽이며, 아무것도 생각하지 않으려 애쓰며 일했다.",
    },
  ];

  let data;
  let history: number[] = [];

  let userInput = "";

  let keyboardSound = 0;

  function changeKeyboardSound(updated) {
    keyboardSound = updated;
  }

  function getRandomData(datas: any[]) {
    if (datas.length === history.length) {
      history = [data.id];
    }

    let filteredDatas = datas.filter((d) => !history.includes(d.id));

    const randomData =
      filteredDatas[Math.floor(Math.random() * filteredDatas.length)];
    history.push(randomData.id);

    return randomData;
  }

  function reloadData() {
    userInput = "";
    data = getRandomData(datas);
  }

  function handleComplete(id: number) {
    completed(id);

    openSnackbar(`《${data.title}》 타이핑 완료`);

    datas = datas.map((d) => {
      if (id === d.id) {
        const updated = {
          ...d,
          isCompleted: true,
        };

        if (data.id === id) {
          data = updated;
        }
        return updated;
      } else {
        return d;
      }
    });

    reloadData();
  }

  function handleBookmark(id: number) {
    toggleBookmark(id);

    datas = datas.map((d) => {
      if (id === d.id) {
        const updated = {
          ...d,
          isBookmark: !d.isBookmark,
        };

        if (data.id === id) {
          data = updated;
        }
        return updated;
      } else {
        return d;
      }
    });
  }

  function openSnackbar(message) {
    showSnackbar = true;
    snackbarMessage = message;

    setTimeout(() => {
      showSnackbar = false;
    }, 3000);
  }

  onMount(() => {
    datas = datas?.map((d) => ({
      ...d,
      isBookmark: getItemStatusById(d.id)?.isBookmark || false,
      isCompleted: getItemStatusById(d.id)?.isCompleted || false,
    }));
    data = getRandomData(datas);
    updateStyles();
    loading = false;
  });
</script>

<div class="type-her-story container">
  <section class="content {loading ? 'hidden' : ''}">
    <div class="header">
      <div class="content-header">
        <div class="info">
          <div class="title">
            <a
              href="https://www.womynarchive.com?s={data?.title}"
              target="_blank"
            >
              <i class="fa-solid fa-arrow-up-right-from-square no-border"></i>
            </a>

            <h3 class="title-text">
              「{data?.title}」
            </h3>
          </div>

          <div class="creator">{data?.creator} | {data?.publisher}</div>
        </div>

        <div class="control">
          <!-- <Toggle /> -->
          <i class="fa-solid fa-rotate" on:click={reloadData} aria-hidden="true"
          ></i>
          <i
            class="fa-solid fa-gear"
            on:click={() => {
              openSetting = !openSetting;
              openList = false;
            }}
            aria-hidden="true"
          ></i>
          <i
            class="fa-solid fa-bars"
            on:click={() => {
              openList = !openList;
              openSetting = false;
            }}
            aria-hidden="true"
          ></i>
        </div>
      </div>

      {#if openList}
        <div class="side-content-header">
          <div class="title">
            <i
              class="fa-solid fa-chevron-left no-border"
              on:click={() => (openList = false)}
              aria-hidden="true"
            ></i>
            <h3>필사문장 목록</h3>
          </div>
          <i
            class="fa-{filterBookmarks
              ? 'solid'
              : 'regular'} fa-bookmark no-border"
            on:click={() => (filterBookmarks = !filterBookmarks)}
            aria-hidden="true"
          ></i>
        </div>
      {:else if openSetting}
        <div class="side-content-header">
          <div class="title">
            <i
              class="fa-solid fa-chevron-left no-border"
              on:click={() => (openSetting = false)}
              aria-hidden="true"
            ></i>
            <h3>환경설정</h3>
          </div>
        </div>
      {/if}
    </div>

    <div class="content-body">
      <div>
        <Typing
          keyboardSound={settings.keyboardSounds[keyboardSound]}
          text={data?.content}
          bind:userInput
          handleComplete={() => {
            handleComplete(data?.id);
          }}
        />
      </div>

      {#if openList}
        <div>
          <List
            datas={filterBookmarks ? getFilteredData(datas) : datas}
            {handleBookmark}
            changeData={(d) => (data = d)}
            selectedDataId={data?.id}
          />
        </div>
      {:else if openSetting}
        <div>
          <Setting {changeKeyboardSound} />
        </div>
      {/if}
    </div>
  </section>

  <div class="footer">
    <div>
      <img src="/typing/logo.svg" alt="필사 로고" />
      <div>
        <i class="fa-solid fa-link shadow"></i>
        <i
          class="fa-{data?.isBookmark ? 'solid' : 'regular'} fa-bookmark shadow"
          on:click={() => handleBookmark(data.id)}
          aria-hidden="true"
        ></i>
        <i class="fa-solid fa-share-nodes pad shadow"></i>
      </div>
    </div>

    {#if openList || openSetting}
      <div class="caption">
        인터넷 캐시, 쿠키 초기화 시 환경설정과 필사한 이력, 북마크 내역이
        초기화됩니다.
      </div>
    {/if}
  </div>
</div>

{#if showSnackbar}
  <Snackbar message={snackbarMessage} position="center" />
{/if}

<style>
  .caption {
    color: gray;
    font-size: 14px;
  }

  .container {
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
  }

  .content {
    visibility: visible;
  }

  .content.hidden {
    visibility: hidden;
  }

  .header {
    width: 100%;
    display: flex;
    gap: 20px;
  }

  .content-header {
    width: 100%;
    min-width: 350px;
    flex: 1;
    padding: 10px;

    border-top: 2px solid black;
    border-bottom: 2px solid black;

    flex-wrap: wrap;
  }

  .side-content-header {
    min-width: 350px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    border-top: 2px solid black;
    border-bottom: 2px solid black;
  }

  .title {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    min-width: 0;
  }

  .side-content-header i,
  .title h3 {
    color: black;
    font-size: 1.25rem;
  }

  .side-content-header i {
    padding: 12px;
  }

  .title h3 {
    word-break: break-all;
  }

  .info {
    float: left;
    width: calc(100% - 116px);
  }

  .title-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .side-content-header .title {
    gap: 10px;
  }

  .side-content-header .title i,
  .side-content-header .title h3 {
    font-size: 1.063rem;
  }

  .creator {
    color: black;
    font-size: 0.938rem;
    padding-left: 1.8rem;
  }

  .content {
    width: 100%;
  }

  .content-body {
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  .content-body div:first-child {
    min-width: 350px;
    flex: 1;
    padding: 20px 10px;
    min-height: calc(100vh - 400px);

    border-bottom: 2px solid black;
  }

  .content-body div:last-child:not(:only-child) {
    min-width: 350px;
    padding: 0 10px;

    border-bottom: 2px solid black;
  }

  i {
    cursor: pointer;
  }

  i:not(.no-border) {
    width: 34px;
    height: 40px;
    border: 2px solid black;
    border-radius: 60% 50% 60% 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
  }

  i.pad {
    padding-right: 2px;
  }

  i.shadow {
    box-shadow: 3px 2px 0px #000000;
  }

  .control {
    display: flex;
    gap: 7px;
    overflow: hidden;
    height: 100%;
    align-items: center;
  }

  .footer {
    display: flex;
    gap: 20px;
  }

  .footer > div {
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
  }

  .footer > div:first-child {
    flex: 1;
  }

  .footer > div:last-child:not(:only-child) {
    width: 350px;
  }

  .footer img {
    width: 200px;
    height: auto;
  }

  .footer div {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }

  @media (max-width: 784px) {
    .header,
    .footer {
      position: relative;
    }

    .side-content-header,
    .content-body div:last-child:not(:only-child),
    .caption {
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: 3;
      background-color: inherit;
    }
  }
</style>
