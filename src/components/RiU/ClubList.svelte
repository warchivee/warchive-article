<script>
  import { onMount } from "svelte";
  import Loading from "../Loading.svelte";
  
import posts from '../../../public/RiU/result.json';

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
</script>
  
{#if loading}
    <Loading />
{:else}
  <div class="list-content">
    {#each Object.entries(posts) as [schoolCode, schoolValue]}
      <div class="univ-group">
        <div class="style-university text-style-university">{schoolValue.name}</div>
        {#each Object.entries(schoolValue.groups) as [groupCode, groupValue] }
          <a class="club-list text-style-title" href="/Radicals-in-University/{schoolCode}/{groupCode}">{groupValue.name}</a>
        {/each}
      </div>
    {/each}
  </div>
{/if}

<style>
    .list-content {
      width: fit-content;
      height: fit-content;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0 30px;
    }
    .univ-group {
      max-width: 150px;
      height: fit-content;
    }
    .club-list {
      display: block;
      text-decoration: none;
      color: var(--color-riu-black);
      font-size: 20px;
      width: fit-content;
    }
    .club-list:hover {
      background-color: var(--color-riu-gray);
    }

    @media (max-width: 870px) {
      .list-content {
        gap: 10px;
      }
    }

    /* mobile */
    @media (max-width: 750px) {
      .list-content {
        grid-template-columns: repeat(2, 1fr);
        margin-left: 1rem;
      }
      .univ-group {
        max-width: 110px;
      }
      .club-list {
        font-size: 16px;
      }
    }

    @media (max-width: 460px) {
      .univ-group {
        max-width: 95px;
      }
      .club-list {
        font-size: 14px;
      }
    }
</style>
