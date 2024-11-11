<script>
  import { onMount } from "svelte";
  import Loading from "../Loading.svelte";
import HyperButton from "./HyperButton.svelte";

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
  function getPeriodValue(period) {
    if (period.includes(" - ")) {
      const [startMonth, endMonth] = period.split(" - ");
      return `${startMonth}월 - ${endMonth}월`;
    }
    else {
      return `${period}월`;
    }
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
  let yearRefs = {};
  function selectYearMobile(year) {
    selectedYear = year;
    handleTimeMenu();
    yearRefs[year]?.scrollIntoView({
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
   <HyperButton imgSrc="button_back.png" href="" cling={false} />

      <div class="paper-header">
        <div class="club-info-container">
          <img class="club-logo-second" src={logo} alt="{name} 로고"/>
          <div class="club-info">
            <div class="text-style-university style-university club-uni-name">{universityName}</div>
            <div class="club-name text-style-club {name.length > 15 ? 'smaller' : ''}">
              {name}
              <a class="sns-link {name.length > 15 ? 'smaller' : ''}" href={snsLink} target="_blank"><i class="fa-solid fa-paperclip"></i></a>
            </div>
          </div>
        </div>
        <img src="/RiU/title.png" alt="Radicals in University" class="title-img pc">
      </div>
      <div class="paper-nav">
        <div class="nav-block text-style-act-cont">{establishedAt}</div>
        <div class="paper-nav__list">
          {#each years as year}
          <button
            class="nav-year text-style-act-name {selectedYear === year ? 'selected' : ''}"
            on:click={() => selectYear(year)}
            >
              {year}
            </button>
          {/each}
        </div>
    
        <div class="nav-block text-style-act-cont">{dissolvedAt}</div>
      </div>
      <div class="paper-table" bind:this={tableElement}>
        {#each selectedActivities as activity}
          <div class="act">
            <div class="act-time">
              {#if activity.period}
                {getPeriodValue(activity.period)}
              {:else}
                {activity.season}
              {/if}
            </div>
            <div class="act-title">
              <span>{activity.title}</span>
              {#if activity.extraLink}
                <a class="act-link" href={activity.extraLink} target="_blank">
                  <i class="fa-solid fa-paperclip"></i>
                </a>
              {/if}
            </div>
            <div class="act-detail">
              <img 
                class="act-image {activity.image? '' : 'none'}"
                src="{activity.image ? imgPath+activity.image: logo}"
                alt="{activity.title} 이미지" />
              <ul class="act-intro text-style-act-cont">
                {#each activity.details?.split('\n') as item}
                  {#if item?.startsWith('- ')}
                     <li class="mark">{item?.substring(2)}</li>
                  {:else}
                     <li>{item}</li>
                  {/if}
                {/each}
              </ul>
            </div>
          </div>
        {/each}
      </div>
  </div>
  <div class="paper-content mobile">
   <HyperButton imgSrc="button_back.png" href="" cling={false} />

    <div class="paper-header">
      <div class="club-info-container">
        <img class="club-logo-mobile" src={logo} alt="{name} 로고"/>
        <div class="club-info">
          <div class="text-style-university style-university">{universityName}</div>
          <div class="club-name text-style-title {name.length > 15 ? 'smaller' : ''}">
            {name}
            <a class="sns-link {name.length > 15 ? 'smaller' : ''}" href={snsLink} target="_blank"><i class="fa-solid fa-paperclip"></i></a>
          </div>
        </div>
      </div>
      <button class="time-container" on:click={handleTimeMenu}>연도 선택</button>
    </div>
    <div class="act-container">
      {#each activities as activity, index}
      {#if index === 0 || activities[index - 1].year !== activity.year}
        <div class="year-divider" bind:this={yearRefs[activity.year]}>{activity.year}년</div>
      {/if}

      <div class="act">
        <div class="act-image-container">
          <img 
            class="act-image {activity.image? '' : 'none'}"
            src="{activity.image ? imgPath + activity.image: logo}"
            alt="{activity.title} 이미지" />
        </div>
         
        <div class="act-detail"> 
          <div class="text-style-act-name highlight">
            <span>
              {#if activity.period}
                {getPeriodValue(activity.period)}
              {:else}
                {activity.season}
              {/if}, {activity.title}
            </span>
          
              {#if activity.extraLink}
                <a class="act-link" href={activity.extraLink} target="_blank">
                  <i class="fa-solid fa-paperclip"></i>
                </a>
              {/if}
          </div>

          <ul class="text-style-act-cont">
            {#each activity.details?.split('\n') as item}
              {#if item?.startsWith('- ')}
                  <li class="mark">{item?.substring(2)}</li>
              {:else}
                  <li>{item}</li>
              {/if}
            {/each}
          </ul>
        </div>
      </div>
      {/each}
    </div>
  </div>
{/if}

{#if openMenu}
  <div class="time-menu mobile">
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
  align-items: flex-end;
  margin: 30px 0;
}
.club-info-container {
  display: flex;
  height: fit-content;
  align-items: center;
  gap: 6px;
}
.club-logo-second {
  display: none;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin: 4px 4px 0 0;
  object-fit: contain;
}
.club-info {
    display: flex;
    flex-direction: column;
}
.club-name {
  line-height: 1;
  color: var(--color-riu-black);
  display: flex;
  align-items: center;
  gap: 14px;
  white-space: nowrap;
  margin-top: 10px;
}
.sns-link {
  color: var(--color-riu-black);
  font-size: 30px;
  margin-top: 10px;
  opacity: 0.6;
  transition: 0.2s;
}
.sns-link:hover {
  opacity: 1;
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
    background: #3f375113;
    padding: 20px 20px;
    border-radius: 10px;
    margin: 10px 0;
    gap: 50px;
}
.paper-nav__list {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 50px;
    margin-top: 6px;
    overflow-x: scroll;
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
    font-weight: 700;
    text-decoration: none;
    position: relative;
    display: inline-block;
    padding: 0;
}
.nav-year::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-riu-black);
  transition: width 0.3s ease;
}

.nav-year:hover::after {
  width: 100%;
}
.nav-year.selected::after  {
  width: 100%;
}

.paper-table {
  width: 100%;
  height: calc(100% - 282px);
  overflow-x: hidden;
  overflow-y: auto;
  margin: 2rem 0;
  padding-right: 0.2rem;
  color: var(--color-riu-black);
  scroll-behavior: smooth;
  padding-bottom: 20px;
}

.act {
  display: flex;
}
.act-time,
.act-title {
  height: fit-content;
  font-weight: 800;
  font-family: var(--font-riu);
  color: var(--color-riu-black);
}
.act-time {
  font-size: 35px;
  width: 13%;
  line-height: 1.4;
  padding: 5px;
}
.act-title {
  font-size: 16px;
  word-break: keep-all;
  width: 24%;
  padding: 10px 20px;  
}
.act-title span, .highlight span {
  background:linear-gradient(180deg, transparent 60%, #835ed12c 60%);
}
.act-link {
  color: var(--color-riu-black);
  font-size: 14px;
  opacity: 0.6;
  transition: 0.2s;
  margin-left: 2px;
}
.act-link:hover {
  opacity: 1;
}
.act-detail {
  width: 60%;
  display: flex;
  flex-direction: row;
}
.act-detail * {
  font-family: var(--font-riu);
  color: var(--color-riu-black);
}
.act-detail > * {
  width: 50%;
}
.act:nth-child(even) .act-detail {
  flex-direction: row-reverse;
}
.act-image {
  height: fit-content;
  object-fit: contain;
  aspect-ratio: 1 / 1;
  background-color: var(--color-riu-black);
  opacity: 1;
}
.act-image:not(.none) {
  border: 10px solid #E5E4E6;
}
.act-image.none {
  opacity: 0.1;
}
.act-intro {
  aspect-ratio: 1 / 1;
  text-align: justify;
  word-break: keep-all;
  padding: 10px 15px;
  overflow-x: hidden;
  overflow-y: scroll;
  white-space: pre-line;
}
ul li {
  margin-bottom: 10px;
}
ul li.mark {
  list-style-type: '- ';
  padding-inline-start: 1ch;
  text-indent: 0;
}

@media (max-width: 1000px) {
  .paper-nav__list {
    padding-bottom: 4px;
  }
  .paper-content.pc {
    position: fixed;
    width: 100vw;
    height: calc(100% - 66px);
    top: 66px;
    left: 0;
    padding: 0 5em 0 4em;
  }
  .club-logo-second {
    display: block;
  }
  .pc .club-name {
    font-size: 30px;
  }
  .pc .sns-link {
    font-size: 24px;
  }
  .club-name.smaller {
    font-size: 20px;
    gap: 10px;
  }
  .sns-link.smaller {
    font-size: 18px;
    margin-top: 2px;
  }
}

/* mobile */
@media (max-width: 750px) {
  .paper-header {
    margin: 10px 0;
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
    padding: 0;
  }
  .pc {
    display: none;
  }
  .mobile {
    display: block;
  }

  .club-logo-mobile {
    width: 60px;
    height: 60px;
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
    margin-top: 8px;
  }
  .club-info > :nth-child(2).smaller,
  .club-info > :nth-child(2) .smaller {
    font-size: 16px;
  }
  .sns-link {
    font-size: 16px;
    margin-top: 0;
  }
  .time-container {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background: none;
    cursor: pointer;
    width: fit-content;
    white-space: nowrap;
    font-family: var(--font-riu);
    color: var(--color-riu-black);
    font-size: 14px;
    border: 1px var(--color-riu-gray) solid;
    border-radius: 5px;
    padding: 0 8px 0 6px;
    transition: 0.1s ease-in-out;
  }
  .time-container:hover {
    background-color: var(--color-riu-black);
    color: var(--color-riu-white);
  }

  .act-container {
    width: 100%;
    height: 40vh;
    margin: 2rem 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
  .year-divider {
    width: 100%;
    text-align: center;
    font-family: var(--font-riu);
    color: var(--color-riu-black);
    font-size: 24px;
    font-weight: 600;
  }
  .act {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .act::after {
    content: "";
    bottom: -1rem;
    left: 50%;
    width: 1px;
    height: 6rem;
    margin: 0.2rem;
    transform: translateX(-50%);
    background: linear-gradient(to bottom, transparent, var(--color-riu-gray), transparent);
  }

  .act-time {
    width: 100%;
    height: fit-content;
    color: var(--color-riu-black);
  }
  .act-image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 0.2rem 0 0.6rem 0;
  }
  .act-image {
    width: 68%;
  }
  .act-link,
  .act-link i {
    width: fit-content;
    font-size: 16px;
  }
  .act-detail {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
  .act-detail > * {
    width: 90%;
    word-break: keep-all;
    overflow-wrap: break-word;
    white-space: normal;
    color: var(--color-riu-black);
  }
  .act:nth-child(even) .act-detail {
    flex-direction: column;
  }
  .act-detail > :first-child {
    width: 86%;
    text-align: center;
    margin-bottom: 10px;
  }
  .act-detail a i {
    font-family: "Font Awesome 6 Free";
  }
  .act-detail > :nth-child(2) {
    text-align: left;
    height: fit-content;
    text-align: justify;
    white-space: pre-line;
  }

  .time-menu {
    position: fixed;
    top: 16%;
    right: 0;
    height: 68%;
    aspect-ratio: 132 / 511;
    background-image: url('/RiU/paper_menu_mobile.png');
    background-size: cover;
    z-index: 20;
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