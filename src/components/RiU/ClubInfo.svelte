<script>
  import { onMount } from "svelte";
  import Loading from "../Loading.svelte";
  
  // Load Data by SpreadSheet
  // let RiU = "";
  export let loading = false;
  // onMount(async () => {
  //   RiU = JSON.parse(localStorage.getItem("RiU")) || null;
  //   if (!RiU) {
  //     const response = await fetch(
  //       `https://script.googleusercontent.com/macros/echo?user_content_key=yeIm6d_vYSQkB-LBixcQCtcs3qoYrhEsvffzQxe7vfJ5wpasn567ucWOImMThhNbdXAWLqHR-CKyU5FYpLj40lFfkqCZyTJCm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnFszXHwdNPh7A8LRZ04rFSTekjaryld1a_gHmyWNFAjD8uC1ZaDsL3zW1I7AY0B_icvlC4iCj0pyqY1jVCmDyQE-ruQP9FUOctz9Jw9Md8uu&lib=MYeHjeNCxJDCX6Uh50YN2LPmD-q0OsFkm`
  //     );
  //     const responseJson = await response.json();
  //     localStorage.setItem("RiU", JSON.stringify(responseJson.data));
  //   }
  //   loading = false;
  // });

  export let universityName;
  export let clubData;
  const imgPath = "../../../public/RiU/";

  const name = clubData.name;
  const snsLink = clubData.snsLink;
  const logo = imgPath + clubData.logo;
  const activities = clubData.activities;
  
  const establishedAt = clubData.establishedAt.replace(/-/g, ".");
  const lastActivity = activities[activities.length - 1];
  let dissolvedAt = "활동중";
  if (lastActivity.title.includes("해체")) {
    const dateMatch = lastActivity.title.match(/(\d{1,2})월 (\d{1,2})일/);
    if (dateMatch) {
      let [, month, day] = dateMatch;
      month = month.padStart(2, '0');
      day = day.padStart(2, '0');
      dissolvedAt = `${lastActivity.year}.${month}.${day}`;
    }
  }

  const years = [...new Set(activities.map(activity => Number(activity.year)))].sort((a, b) => a - b);
  let selectedYear = Number(activities[0].year);
  let selectedActivities = activities.filter(activity => Number(activity.year) === selectedYear);

  let tableElement;
  function selectYear(year) {
    selectedYear = year;
    selectedActivities = activities.filter(activity => Number(activity.year) === selectedYear);
    if (tableElement) {
      tableElement.scrollTop = 0;
    }
  }
  function getYearValue(y) {
    return y.slice(-2);
  }
  
  // Functions for Mobile UI
  onMount(() => {
    activities.forEach((activity) => {
      if (!activityRefs[activity.year]) {
        activityRefs[activity.year] = document.getElementById(`activity-${activity.year}`);
      }
    });
  });

  let openMenu = false;
  function handleTimeMenu() {
    openMenu = !openMenu;
  }
  let activityRefs = {};
  function selectYearMobile(year) {
    selectedYear = year;
    handleTimeMenu();
    activityRefs[year]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
</script>

{#if loading}
  <Loading />
{:else}
  <div class="club-logo">
    <img src={logo} alt="{name} 로고"/>
  </div>
  <div class="paper-content pc">
      <div class="paper-header">
        <div class="club-info">
          <div class="text-style-university style-university">{universityName}</div>
          <div class="club-name text-style-club">
            {name}
            <a class="sns-link" href={snsLink} target="_blank"><i class="fa-solid fa-link"></i></a>
          </div>
        </div>
        <img src="/RiU/title.png" alt="Radicals in University" class="title-img pc">
      </div>
      <div class="paper-nav">
        <div class="nav-block text-style-act-cont">{establishedAt}</div>
        {#each years as year}
        <button
          class="nav-year text-style-act-name {selectedYear === year ? 'selected' : ''}"
          on:click={() => selectYear(year)}
          >
            {year}
          </button>
        {/each}
        <div class="nav-block text-style-act-cont">{dissolvedAt}</div>
      </div>
      <div class="paper-table" bind:this={tableElement}>
        {#each selectedActivities as activity, index}
          <div class="act">
            <div class="act-time">
              <div class="text-style-club">
                {#if activity.period}
                  {getYearValue(activity.year)}.{activity.period}
                {:else}
                  {activity.season}
                {/if}
              </div>
              {#if activity.period}
                <div class="text-style-act-name">
                  {activity.season}
                </div>
              {/if}
            </div>
            <div class="act-title">
              <div class="text-style-act-name">
                {activity.title}
                {#if activity.extraLink}
                  <!-- <a class="act-link-text" href={activity.extraLink} target="_blank">
                    Link
                  </a> -->
                  <a class="act-link" href={activity.extraLink} target="_blank"><i class="fa-solid fa-link"></i></a>
                {/if}
              </div>
            </div>
            <div class="act-detail">
              <img 
                class="act-image {activity.image? '' : 'none'}"
                src="{activity.image ? imgPath+activity.image: logo}"
                alt="{activity.title} 이미지" />
              <div class="act-intro text-style-act-cont">
                {activity.details}
              </div>
            </div>
          </div>
        {/each}
      </div>
  </div>
  <div class="paper-content mobile">
    <div class="paper-header">
      <div class="club-info-container">
        <img class="club-logo-moibile" src={logo} alt="{name} 로고"/>
        <div class="club-info">
          <div class="text-style-university style-university">{universityName}</div>
          <div class="club-name text-style-title">
            {name}
            <a class="sns-link" href={snsLink} target="_blank"><i class="fa-solid fa-link"></i></a>
          </div>
        </div>
      </div>
      <button class="time-container" on:click={handleTimeMenu}>
        <div class="time-year">{establishedAt} - {dissolvedAt}</div>
      </button>
    </div>
    <div class="act-container">
      {#each activities as activity}
      <div class="act" id={`activity-${activity.year}`} >
        <div class="act-time">
          <div class="text-style-act-name">
            {#if activity.period}{getYearValue(activity.year)}.{activity.period}{/if} {activity.season}
          </div>
        </div>
        <div class="act-image-container">
          <img 
            class="act-image {activity.image? '' : 'none'}"
            src="{activity.image ? imgPath + activity.image: logo}"
            alt="{activity.title} 이미지" />
          {#if activity.extraLink}
            <a class="act-link" href={activity.extraLink} target="_blank"><i class="fa-solid fa-link"></i></a>
          {/if}
        </div>
        <div class="act-detail">
        <div class="text-style-act-name">{activity.title}</div>
        <div class="text-style-act-cont">{activity.details}</div>
        </div>
      </div>
      {/each}
    </div>
  </div>
{/if}

{#if openMenu}
  <div class="time-menu">
    <button class="menu-close-btn" on:click={handleTimeMenu} aria-hidden="true">
      <i class="fa-solid fa-xmark"></i>
    </button>
    <div class="text-style-title">연도 선택</div>
      <div class="nav-block text-style-act-cont">{establishedAt}</div>
      {#each years as year}
        <button
          class="nav-year text-style-act-name {selectedYear === year ? 'selected' : ''}"
          on:click={() => {selectYearMobile(year); console.log(selectedYear, year)}}
        >
          {year}
        </button>
      {/each}
      <div class="nav-block text-style-act-cont">{dissolvedAt}</div>
  </div>
{/if}

<style>
.club-logo {
  position: absolute;
  left: 1.4rem;
  top: 26%;
  width: auto;
  height: 16%;
  aspect-ratio: 1 / 1;
  border-radius: 100%;
  display: flex;
  overflow: hidden;
}
.club-logo img {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: var(--color-riu-black);
  object-fit: cover;
}

.paper-content {
  position: absolute;
  right: 18%;
  width: 62%;
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
  display: flex;
  align-items: center;
  gap: 12px;
  white-space: nowrap;
}
.sns-link {
  color: var(--color-riu-black);
  font-size: 24px;
  margin-top: 10px;
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
    margin: 20px 0;
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
  height: calc(100% - 240px);
  overflow-x: hidden;
  overflow-y: auto;
  margin: 2rem 0;
  padding-right: 0.2rem;
  color: var(--color-riu-black);
  scroll-behavior: smooth;
}

.act {
  display: flex;
}
.act-time,
.act-title {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem 0 0;
}
.act-time {
  width: 16%;
}
.act-title {
  width: 24%;
  word-break: keep-all;
}
.act-link {
  color: var(--color-riu-black);
  font-size: 20px;
}
.act-link-text {
  width: fit-content;
  font-size: 14px;
  padding: 2px 4px;
  background-color: var(--color-riu-gray);
  border-radius: 6px;
  display: inline-block;
  text-decoration: none;
}
.act-detail {
  width: 60%;
  display: flex;
  flex-direction: row;
}
.act-detail * {
  text-align: justify;
  word-break: keep-all;
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
  padding: 20px;
  overflow-x: hidden;
  overflow-y: scroll;
  white-space: pre-line;
}

/* mobile */
@media (max-width: 750px) {
  .paper-header {
    align-items: flex-start;
  }
  .club-logo {
    display: none;
  }
  .paper-content {
    position: relative;
    right: 0;
    width: 100%;
    height: 100%;
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
  .club-logo-moibile {
    width: 44px;
    height: 44px;
    border-radius: 5px;
    object-fit: cover;
    background-color: var(--color-riu-black);
  }
  .club-info > :first-child {
    margin-top: 0;
    border-radius: 5px;
  }
  .club-info > :nth-child(2) {
    line-height: 22px;
    gap: 6px;
  }
  .sns-link {
    font-size: 10px;
    margin-top: 0;
  }
  .time-container {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    border: none;
    background: none;
    cursor: pointer;
  }
  .time-container * {
    width: fit-content;
    color: var(--color-riu-black);
  }
  .time-year {
    font-family: var(--font-riu);
    color: var(--color-riu-black);
    font-size: 10px;
    font-weight: 500;
    line-height: 15px;
    text-align: right;
    letter-spacing: 0px;
  }

  .act-container {
    width: 100%;
    height: 50vh;
    margin: 0.8rem 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  .act {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .act-time {
    width: 100%;
    height: fit-content;
    margin: 0.6rem;
    padding-left: 0.4rem;
    color: var(--color-riu-black);
  }
  .act-image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 0.8rem 0 1.6rem 0;
  }
  .act-image {
    width: 68%;
  }
  .act-link {
    position: absolute;
    bottom: 0;
    right: 6%;
    font-size: 16px;
    background-color: var(--color-riu-gray);
    padding: 0px 3px;
    border-radius: 5px;
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
    color: var(--color-riu-black);
  }
  .act:nth-child(even) .act-detail {
    flex-direction: column;
  }
  .act-detail > :first-child {
    width: 86%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  .act-detail > :nth-child(2) {
    text-align: left;
    height: fit-content;
    margin: 1rem 0;
    white-space: pre-line;
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