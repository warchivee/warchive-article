<script lang="ts">
  export let datas;
  export let handleBookmark;
  export let changeData;
  export let selectedDataId;
</script>

<ul class="content">
  {#each datas as d, i}
    <li class={selectedDataId === d.id ? "selected" : ""}>
      <div
        class="left"
        on:click={() => {
          changeData(d);
        }}
        aria-hidden="true"
      >
        <div class="number">{i + 1}</div>
        <div class="info">
          <h3 class="title">{d.content}</h3>
        </div>
      </div>

      <div class="buttons">
        {#if d.isCompleted}
          <i class="fa-regular fa-circle-check"></i>
        {/if}
        <i
          class="bookmark fa-{d.isBookmark ? 'solid' : 'regular'} fa-bookmark"
          on:click={() => {
            handleBookmark(d.id);
          }}
          aria-hidden="true"
        ></i>
      </div>
    </li>
  {/each}
</ul>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .buttons {
    display: flex;
    gap: 10px;
    font-size: 1.5rem;
    color: black;
    margin-left: 10px;
    width: 50px;
    flex-shrink: 0;
    justify-content: flex-end;
  }

  .left {
    display: grid;
    grid-template-columns: 50px 1fr;
    column-gap: 10px;
    cursor: pointer;
  }

  li:only-child {
    padding-bottom: 20px;
  }

  li {
    margin: 20px 0;
  }

  li:not(:last-child) {
    border-bottom: 1px solid black;
    padding-bottom: 20px;
  }

  .number {
    font-family: "Montserrat", serif;
    font-optical-sizing: auto;
    font-weight: 600;
    font-style: normal;
    font-size: 1.5rem;
    color: black;
    text-align: left;
  }

  li.selected .title {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .title {
    color: black;
    font-size: 1.063rem;
    word-break: break-all;
    margin-top: -2px;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .creator {
    color: black;
    font-size: 0.75rem;
  }

  .bookmark {
    cursor: pointer;
  }
</style>
