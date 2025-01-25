<script lang="ts">
  //utils
  import { onMount } from "svelte";
  import axios from "axios";
  import { writable } from "svelte/store";

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

  import Loader from "./Loader.svelte";
  import Snackbar from "../Snackbar.svelte";
  import List from "./List.svelte";
  import Typing from "./Typing.svelte";
  import Setting from "./Setting.svelte";
  import Share from "./Share.svelte";

  import { loadFromLocalStorage } from "../../utils/localStorageManager.ts";

  let isMobile = false;

  let filterBookmarks = false;
  let openShare = false;

  let showSnackbar = false;
  let snackbarMessage = "";

  let loading = true;

  let openList = false;
  let openSetting = false;

  let originalDatas = [];
  let datas = [];

  let data;
  let history: number[] = [];

  let userInput = "";

  let contentType = "ALL";
  let keyboardSound = 0;

  function changeContentType(updated) {
    contentType = updated;
  }

  function changeKeyboardSound(updated) {
    keyboardSound = updated;
  }

  function getRandomData(datas: any[]) {
    if (datas.length === history.length) {
      history = [data?.id];
    }

    let filteredDatas = datas.filter((d) => !history.includes(d.id));

    const randomData =
      filteredDatas[Math.floor(Math.random() * filteredDatas.length)];
    history.push(randomData?.id);

    return randomData;
  }

  function reloadData() {
    userInput = "";
    data = getRandomData(datas);
  }

  async function getDatas() {
    loading = true;

    try {
      const res = await axios.get(
        "https://script.google.com/macros/s/AKfycbw9mIW9t4NcQFKaNqd2W4GdaXlayuKslqKXbgS4t4TZ7Wd9uMBvlqYTtjL2oqnhqBca/exec"
      );

      return res.data;
    } catch (e) {
      console.error(e);
    } finally {
      loading = false;
    }
  }

  function handleComplete(id: number) {
    completed(id);

    openSnackbar(
      `《${
        data?.title && data?.creator
          ? data?.title
          : !data?.title && data?.creator
            ? data?.creator
            : ""
      }》 필사 완료`
    );

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

  onMount(async () => {
    const mediaQuery = window.matchMedia("(max-width: 784px)");

    // 상태 업데이트 함수
    const updateMobile = () => {
      isMobile = mediaQuery.matches; // matches가 true이면 close = true
    };

    // 초기 상태 설정
    updateMobile();

    // 리스너 등록
    mediaQuery.addEventListener("change", updateMobile);

    contentType = loadFromLocalStorage<string>("contentType", "ALL");
    keyboardSound = loadFromLocalStorage<number>("keyboardSound", 0);

    originalDatas = await getDatas();

    originalDatas = originalDatas?.map((d) => ({
      ...d,
      isBookmark: getItemStatusById(d.id)?.isBookmark || false,
      isCompleted: getItemStatusById(d.id)?.isCompleted || false,
    }));

    datas = originalDatas?.filter(
      (d) => contentType === "ALL" || d.type === contentType
    );

    data = getRandomData(datas);
    updateStyles();

    loading = false;

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      mediaQuery.removeEventListener("change", updateMobile);
    };
  });

  $: {
    datas = originalDatas?.filter(
      (d) => contentType === "ALL" || d.type === contentType
    );
  }
</script>

<div class="type-her-story container">
  <section class="content {loading ? 'hidden' : ''}">
    <div class="header">
      {#if openShare}
        <div class="share-content-header">
          <div class="title">
            <i class="fa-solid fa-share-nodes no-border"></i>
            <h3 class="title-text">공유하기</h3>
          </div>

          <div class="control">
            <i
              class="fa-solid fa-x"
              on:click={() => (openShare = false)}
              aria-hidden="true"
            ></i>
          </div>
        </div>{:else}
        <div class="content-header">
          <div class="info">
            <div class="title">
              {#if data?.type === "KOR"}
                <a
                  href="https://www.womynarchive.com?s={data?.title}"
                  target="_blank"
                >
                  <i class="fa-solid fa-arrow-up-right-from-square no-border"
                  ></i>
                </a>
              {/if}

              <h3 class="title-text">
                「{data?.title && data?.creator
                  ? data?.title
                  : !data?.title && data?.creator
                    ? data?.creator
                    : ""}」
              </h3>
            </div>

            <div class="creator {data?.type === 'ENG' ? 'no-pad' : ''}">
              {data?.creator}
              {data?.translator ? `, ${data?.translator} 옮김` : ""}
              <span style="margin: 0 3px;">|</span>
              {data?.publisher ? `${data?.publisher}` : ""}
            </div>
          </div>

          <div class="control">
            <!-- <Toggle /> -->
            <i
              class="fa-solid fa-rotate"
              on:click={reloadData}
              aria-hidden="true"
            ></i>
            <i
              class="fa-solid fa-gear"
              on:click={() => {
                openSetting = !openSetting;
                openList = false;
                openShare = false;
              }}
              aria-hidden="true"
            ></i>
            <i
              class="fa-solid fa-bars"
              on:click={() => {
                openList = !openList;
                openSetting = false;
                openShare = false;
              }}
              aria-hidden="true"
            ></i>
          </div>
        </div>
      {/if}

      {#if openList}
        <div class="side-content-header">
          <div class="title">
            <i
              class="fa-solid fa-chevron-left no-border"
              on:click={() => (openList = false)}
              aria-hidden="true"
            ></i>
            <h3>필사 문장 목록</h3>
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

    <div class="content-body {openShare ? 'share' : ''}">
      <div>
        {#if openShare}
          <Share client:load {data} />
        {:else}
          <Typing
            keyboardSound={settings.keyboardSounds[keyboardSound]}
            text={data?.content}
            bind:userInput
            handleComplete={() => {
              handleComplete(data?.id);
            }}
          />
        {/if}
      </div>

      {#if openList}
        <div>
          <List
            datas={filterBookmarks ? getFilteredData(datas) : datas}
            {handleBookmark}
            changeData={(d) => {
              data = d;
              userInput = "";

              if (isMobile) {
                openList = false;
              }
            }}
            selectedDataId={data?.id}
          />
        </div>
      {:else if openSetting}
        <div>
          <Setting {changeKeyboardSound} {changeContentType} />
        </div>
      {/if}
    </div>
  </section>

  {#if loading}
    <Loader />
  {/if}

  <div class="footer">
    <div>
      <img src="/typing/logo.svg" alt="필사 로고" />
      <div>
        <i
          class="fa-{data?.isBookmark ? 'solid' : 'regular'} fa-bookmark shadow"
          on:click={() => handleBookmark(data.id)}
          aria-hidden="true"
        ></i>
        <i
          class="fa-solid fa-share-nodes pad shadow"
          aria-hidden="true"
          on:click={() => {
            openList = false;
            openSetting = false;
            openShare = !openShare;
          }}
        ></i>
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
    position: static;
    visibility: visible;
  }

  .content.hidden {
    visibility: hidden;
    position: absolute;
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

  .share-content-header {
    width: 100%;
    min-width: 350px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
  }

  .share-content-header .title {
    gap: 10px;
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

  .side-content-header i {
    color: black;
    font-size: 1.1rem;
  }

  .title h3 {
    color: black;
    font-size: 1.063rem;
  }

  .side-content-header i {
    padding: 12px;
  }

  .title h3 {
    word-break: break-all;
  }

  .info {
    float: left;
    width: calc(100% - 126px);
    margin-right: 10px;
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
    font-size: 0.8rem;
    padding-left: 1.8rem;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .creator.no-pad {
    padding-left: 1rem;
  }

  .content {
    width: 100%;
  }

  .content-body:not(.share) {
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;

    min-height: calc(100vh - 350px);
    max-height: calc(100vh - 350px);
  }

  .content-body.share {
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;

    min-height: calc(100vh - 350px);
  }

  .content-body div:first-child {
    min-width: 350px;
    flex: 1;
    padding: 20px 10px;

    overflow-y: scroll;

    border-bottom: 2px solid black;
  }

  .content-body div:first-child::-webkit-scrollbar {
    width: 4px; /* 스크롤바 너비 조정 */
  }
  .content-body div:first-child::-webkit-scrollbar-thumb {
    background-color: black; /* 스크롤바 색상 */
    border-radius: 4px;
  }

  .content-body div:last-child:not(:only-child)::-webkit-scrollbar {
    width: 4px; /* 스크롤바 너비 조정 */
  }
  .content-body div:last-child:not(:only-child)::-webkit-scrollbar-thumb {
    background-color: black; /* 스크롤바 색상 */
    border-radius: 4px;
  }

  .content-body div:last-child:not(:only-child) {
    width: 350px;
    padding: 0 10px;

    border-bottom: 2px solid black;

    overflow-y: scroll;
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

    .side-content-header {
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: 3;
      background-color: inherit;
    }

    .content-body div:last-child:not(:only-child),
    .footer > div:last-child:not(:only-child) {
      position: absolute;
      width: 100%;
      min-height: calc(100vh - 350px);
      max-height: calc(100vh - 350px);
      z-index: 3;
      background-color: inherit;
    }
  }
</style>
