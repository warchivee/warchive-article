<script>
  
  // TEST DATA
  const data = {
      "info": {
        "학교명": "00대학교",
        "동아리 정식 명칭": "동아리이름",
        "창설일": "2022-03-29T15:00:00.000Z",
        "대표 SNS 링크\n(계정 url)": "https://www.instagram.com/",
        "동아리 로고\r\n(정사각형 로고 우선)": {
          "valueType": "IMAGE"
        }
      },
      "contents": [
        {
          "* 연도": 2022,
          "* 시기": "하반기",
          "활동기간": 9,
          "* 활동명": "활동 1",
          "활동 상세 내용": "활동 1 상세 내용",
          "외부 링크": "",
          "활동 대표 이미지": {
            "valueType": "IMAGE"
          }
        },
        {
          "* 연도": 2023,
          "* 시기": "하반기",
          "활동기간": 9,
          "* 활동명": "활동 2",
          "활동 상세 내용": "활동 2 상세 내용",
          "외부 링크": "",
          "활동 대표 이미지": {
            "valueType": "IMAGE"
          }
        },
        {
          "* 연도": 2024,
          "* 시기": "하반기",
          "활동기간": 9,
          "* 활동명": "활동 3",
          "활동 상세 내용": "활동 3 상세 내용",
          "외부 링크": "",
          "활동 대표 이미지": {
            "valueType": "IMAGE"
          }
        },
      ]
    };
  
  const years = [...new Set(data.contents.map(content => content["* 연도"]))];
  let selectedYear = new Date(data.info.창설일).getFullYear();
  function selectYear(year) {
    selectedYear = year;
  }

  // Mobile Time Menu Funciton
  let openMenu = false;
  function handleTimeMenu() {
    openMenu = !openMenu;
  }

  // Pagination Functions
  function pagePrev() {
    // console.log("prev");
  }
  function pageNext() {
    // console.log("next");
  }
</script>


<div class="paper-content pc">
    <div class="paper-header">
      <div class="club-info">
        <div class="text-style-university style-university">{data.info.학교명}</div>
        <div class="club-name text-style-club">{data.info["동아리 정식 명칭"]}</div>
      </div>
      <img src="/RiU/title.png" alt="Radicals in University" class="title-img pc">
    </div>
    <div class="paper-nav">
      <div class="nav-block text-style-act-cont">시작일</div>
      {#each years as year}
      <button
        class="nav-year text-style-act-name {selectedYear === year ? 'selected' : ''}"
        on:click={() => selectYear(year)}
        >
            {year}
        </button>
      {/each}
      <div class="nav-block text-style-act-cont">종료일</div>
    </div>
    <div class="paper-table">
      <div class="act">
        <div class="act-time">
          <div class="text-style-club">{data.contents["* 시기"]}</div>
          <div class="text-style-act-name">17.01 - 17.01 (혹은 01월 - 01월)</div>
        </div>
        <div class="act-title">
          <div class="text-style-act-name">{data.contents["* 활동명"]}</div>
          <a class="act-link" href="https://www.womynarchive.com/" target="_blank"><i class="fa-solid fa-link"></i></a>
        </div>
        <div class="act-detail">
          <img 
            class="act-image {false? '' : 'none'}"
            src="{false ? data.contents["활동 애표 이미지"]: '동아리 로고.jpg'}"
            alt="{data.contents["* 활동명"]} 로고" />
          <div class="act-intro text-style-act-cont">
            {data.contents["활동 상세 내용"]}
          </div>
        </div>
      </div>
    </div>
</div>
<div class="paper-content mobile">
  <div class="paper-header">
    <div class="club-info-container">
      <img class="club-logo" src="{false ? data.info["동아리 로고"] : '동아리 로고.jpg'}" alt="{data.info["동아리 정식 명칭"]} 로고"/>
      <div class="club-info">
        <div class="text-style-university style-university">{data.info["학교명"]}</div>
        <div class="club-name text-style-club">{data.info["동아리 정식 명칭"]}</div>
      </div>
    </div>
    <button class="time-container" on:click={handleTimeMenu}>
      <div class="time-year">{years[0]} - 0</div>
      <div class="text-style-act-name">y.m-m 상</div>
    </button>
  </div>
  <div class="act">
    <img 
      class="act-image {false? '' : 'none'}"
      src="{false ? data.contents["활동 애표 이미지"]: '동아리 로고.jpg'}"
      alt="{data.contents["* 활동명"]} 로고" />
    <a class="act-link" href="https://www.womynarchive.com/" target="_blank"><i class="fa-solid fa-link"></i></a>
  </div>
  <div class="act-detail">
    <div class="text-style-act-name">{data.contents["* 활동명"]}</div>
    <div class="text-style-act-cont">
      {data.contents["활동 상세 내용"]}
    </div>
  </div>
</div>
<div class="pagination mobile">
  <button on:click={pagePrev}>
    <i class="fa-solid fa-angle-left"></i>
  </button>
  <div class="text-style-act-cont">
    13 of 16
  </div>
  <button on:click={pageNext}>
    <i class="fa-solid fa-angle-right"></i>
  </button>
</div>

{#if openMenu}
  <div class="time-menu">
    <button class="menu-close-btn" on:click={handleTimeMenu} aria-hidden="true">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="text-style-title">연도 선택</div>
      <div class="nav-block text-style-act-cont">시작일</div>
      {#each years as year}
        <button
          class="nav-year text-style-act-name {selectedYear === year ? 'selected' : ''}"
          on:click={() => selectYear(year)}
        >
          {year}
        </button>
      {/each}
      <div class="nav-block text-style-act-cont">종료일</div>
  </div>
{/if}

<style>
.paper-content {
    position: absolute;
    right: 20%;
    width: 60%;
    height: 100%;

    display: flex;
    flex-direction: column;
    margin-top: 2%;
}
.pc {
  display: block;
}
.mobile {
  display: none;
}

.paper-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.club-info {
    display: flex;
    flex-direction: column;
}
.club-name {
    color: var(--color-riu-black);
}
.title-img {
    width: auto;
    height: 50px;
    max-width: 50%;
}

.paper-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.nav-block {
    width: fit-content;
    height: fit-content;
    color: var(--color-riu-white);
    background-color: var(--color-riu-black);
    border-radius: 10px;
    padding: 2px 12px;
}
.nav-year {
    color: var(--color-riu-black);
    background: none;
    border: none;
    cursor: pointer;
    font-weight: 300;
    text-decoration: none;
}
.nav-year.selected {
    font-weight: 700;
    text-decoration: underline;
}

.paper-table {
  width: 100%;
  height: fit-content;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 2rem 0;
  color: var(--color-riu-black);
}
.act {
  display: flex;
  align-items: center;
}
.act-time {
  width: 16%;
  margin-right: 1rem;
  padding-top: 20px;
}
.act-title {
  width: 24%;
  margin-right: 1rem;
  padding: 20px 30px;
  word-break: break-all;
  overflow-wrap: break-word;
  white-space: normal;
}
.act-link {
  background-color: var(--color-riu-black);
  color: var(--color-riu-white);
  width: 30px;
  height: 30px;
  border-radius: 5px;
  padding: 2.5px 5.5px 3px 5.5px;
  text-align: center;
}
.act-detail {
  width: 60%;
  display: flex;
  flex-direction: row;
}
.act-detail * {
  width: 50%;
}
.act:nth-child(even) .act-detail {
  flex-direction: row-reverse;
}
.act-image{
  height: fit-content;
  object-fit: contain;
  aspect-ratio: 1 / 1;
  background-color: var(--color-riu-black);
  opacity: 1;
}
.act-image.none {
  opacity: 0.1;
}
.act-intro {
  padding: 20px 30px;
  word-break: break-all;
  overflow-wrap: break-word;
  white-space: normal;
}

/* mobile */
@media (max-width: 750px) {
  .paper-content {
    position: relative;
    right: 0;
    width: 100%;
    height: fit-content;
    margin-top: 0;
  }
  .pc {
    display: none;
  }
  .mobile {
    display: block;
  }

  .club-info-container {
    display: flex;
    height: fit-content;
    gap: 6px;
  }
  .club-logo {
    width: 44px;
    height: 44px;
    border-radius: 5px;
    object-fit: cover;
  }
  .club-info > :first-child {
    margin-top: 0;
    border-radius: 5px;
  }
  .club-info > :nth-child(2) {
    line-height: 22px;
  }
  .time-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    border: none;
    background: none;
    cursor: pointer;
  }
  .time-container * {
    width: fit-content;
  }
  .time-year {
    font-family: var(--font-riu);
    color: var(--color-riu-black);
    font-size: 10px;
    font-weight: 500;
    line-height: 15px;
    letter-spacing: 0px;
  }

  .act {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem auto;
    position: relative;
  }
  .act-image {
    width: 68%;
  }
  .act-link {
    position: absolute;
    bottom: 0;
    right: 4%;
  }
  .act-detail {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
  .act-detail > * {
    width: 90%;
    word-break: break-all;
    overflow-wrap: break-word;
    white-space: normal;
  }
  .act-detail > :first-child {
    width: 86%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .act-detail > :nth-child(2) {
    text-align: left;
    height: fit-content;
    max-height: 150px;
    overflow: scroll;
  }

  .pagination {
    position: absolute;
    bottom: 1.6rem;
    left: 0;
    width: 100%;
    height: fit-content;
    color: var(--color-riu-black);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  .pagination button {
    background: none;
    width: 30px;
    height: 30px;
    border: 1px #3F375180 solid;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .time-menu {
    position: fixed;
    top: 14%;
    right: 0;
    height: 74%;
    aspect-ratio: 132 / 511;
    background-image: url('/RiU/paper_menu_mobile.png');
    background-size: cover;
    z-index: 10;
    padding: 3rem 1rem 4rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .time-menu > :first-child {
    font-family: var(--font-riu);
    color: var(--color-riu-black);
    margin-bottom: 1rem;
  }
  .menu-close-btn {
    border: none;
    background: none;
    position: absolute;
    top: 16px;
    left: 20px;
    cursor: pointer;
  }
}
</style>