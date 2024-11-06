<script>
    import { onMount } from "svelte";
    import Loading from "../Loading.svelte";
  
    let RiU = "";
    export let loading = true;
  
    onMount(async () => {
      RiU = JSON.parse(localStorage.getItem("RiU")) || null;
  
      if (!RiU) {
        const response = await fetch(
          `https://script.googleusercontent.com/macros/echo?user_content_key=yeIm6d_vYSQkB-LBixcQCtcs3qoYrhEsvffzQxe7vfJ5wpasn567ucWOImMThhNbdXAWLqHR-CKyU5FYpLj40lFfkqCZyTJCm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnFszXHwdNPh7A8LRZ04rFSTekjaryld1a_gHmyWNFAjD8uC1ZaDsL3zW1I7AY0B_icvlC4iCj0pyqY1jVCmDyQE-ruQP9FUOctz9Jw9Md8uu&lib=MYeHjeNCxJDCX6Uh50YN2LPmD-q0OsFkm`
        );
        const responseJson = await response.json();
        localStorage.setItem("RiU", JSON.stringify(responseJson.data));
      }
      
      loading = false;
    });
</script>
  
{#if loading}
    <Loading />
{:else}
    <div class="list-content">
        <div class="univ-group">
        <div class="style-university text-style-university">광주여자대학교</div>
        <a class="club-list text-style-title" href="/Radicals-in-University/d_ground">D_GROUND</a>
        </div>
        <div class="univ-group">
        <div class="style-university text-style-university">덕성여자대학교</div>
        <div class="club-list text-style-title">래디어스</div>
        <div class="club-list text-style-title">TNT</div>
        </div>
        <div class="univ-group">
        <div class="style-university text-style-university">동덕여자대학교</div>
        <div class="club-list text-style-title">싹둑</div>
        <div class="club-list text-style-title">SIREN</div>
        </div>
        <div class="univ-group">
        <div class="style-university text-style-university">서울대학교</div>
        <div class="club-list text-style-title">SHAF</div>
        </div>
        <div class="univ-group">
        <div class="style-university text-style-university">서울여자대학교</div>
        <div class="club-list text-style-title">무소의 뿔</div>
        <hr />
        <div class="style-university text-style-university">한양여자대학교</div>
        <div class="club-list text-style-title">한여름</div>
        </div>
        <div class="univ-group">
        <div class="style-university text-style-university">성신여자대학교</div>
        <div class="club-list text-style-title">디어시스터즈</div>
        <div class="club-list text-style-title">시너지</div>
        <div class="club-list text-style-title">해방</div>
        <div class="club-list text-style-title">GPS</div>
        <div class="club-list text-style-title">Radsbos</div>
        <div class="club-list text-style-title">SLATE</div>
        </div>
        <div class="univ-group">
        <div class="style-university text-style-university">숙명여자대학교</div>
        <div class="club-list text-style-title">FEMI-POWER PROJECT</div>
        </div>
        <div class="univ-group">
        <div class="style-university text-style-university">이화여자대학교</div>
        <div class="club-list text-style-title">RAD-E</div>
        </div>
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
    .univ-group hr {
      color: transparent;
      border: transparent;
      height: 26px;
    }
    .club-list {
      text-decoration: none;
      color: var(--color-riu-black);
      font-size: 20px;
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
