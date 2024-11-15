<script>
  import { onMount } from "svelte";
  import Loading from "../Loading.svelte";
  
  import posts from '../../../public/RiU/result.json';
  
  function sortPostsByName(data) {
    const sortedUniversities = Object.entries(data)
      .sort(([, aValue], [, bValue]) => aValue.name.localeCompare(bValue.name, 'ko'))
      .map(([schoolCode, schoolValue]) => {
        const sortedGroups = Object.entries(schoolValue.groups)
          .sort(([, aValue], [, bValue]) => aValue.name.localeCompare(bValue.name, 'ko'));
        return [schoolCode, { ...schoolValue, groups: Object.fromEntries(sortedGroups) }];
      });

    return Object.fromEntries(sortedUniversities);
  }
  const sortedPosts = sortPostsByName(posts);
</script>
  
<div class="list-content">
  {#each Object.entries(sortedPosts) as [schoolCode, schoolValue]}
    <div class="univ-group">
      <div class="style-university text-style-university">{schoolValue.name}</div>
      
      {#each Object.entries(schoolValue.groups) as [groupCode, groupValue] }
      <div>          
        <a class="club-list text-style-title" href="/Radicals-in-University/{schoolCode}/{groupCode}">{groupValue.name}</a>          
      </div>
      {/each}
    </div>
  {/each}
</div>

<style>
    .list-content {
      width: fit-content;
      height: fit-content;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px 30px;
      margin-top: 10px;
    }
    .univ-group {
      max-width: 150px;
      height: fit-content;
    }

    .club-list {
      display: block;
      text-decoration: none;
      color: var(--color-riu-black);
      font-size: 18px;
      width: fit-content;
    }

    .club-list {
      cursor: pointer;
      text-decoration: none;
      display: inline;
      padding-bottom: 2px;
      transition: all 0.35s linear;

      background: linear-gradient(
        to bottom,
        var(--color-riu-black) 0%,
        var(--color-riu-black) 98%
      );
      background-size: 0 2px;
      background-repeat: no-repeat;
      background-position: left 100%;
    }

    .club-list:hover {
        background-size: 100% 2px;
    }
   
    @media (max-width: 950px) {
      .list-content {
        gap: 6px 12px;
        margin-top: 0;
      }
      .univ-group {
        max-width: 130px;
      }
      .club-list {
        font-size: 14px;
      }
    }

    /* mobile */
    @media (max-width: 950px) {
      .list-content {
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
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
