<script>
  import { onMount } from "svelte";
  import BookReport from "./BookReport.svelte";

  export let reports;
  export let bookId;
  export let bookThumbnail;
  export let pubDate;

  let myReactions = [];
  let reactionCount = [];

  let loading = true;

  onMount(async () => {
    let uid = localStorage.getItem("user-uid");
    if (!uid) {
      uid = crypto.randomUUID();
      localStorage.setItem("user-uid", uid);
    }

    reactionCount = JSON.parse(sessionStorage.getItem("reaction-count"));
    myReactions = JSON.parse(sessionStorage.getItem("my-reaction"));

    if (!reactionCount) {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbzc2eEZT8yghP_x1OKzT7T40Tj4QvXlz-WmU0LiXP-pQjrWxTJt9xrn2VGGCYYHC5qo/exec?req=get&uid=${uid}`
      );
      const responseJson = await response.json();

      reactionCount = responseJson?.data?.reactionCount;
      myReactions = responseJson?.data?.reaction;

      sessionStorage.setItem("reaction-count", JSON.stringify(reactionCount));
      sessionStorage.setItem("my-reaction", JSON.stringify(myReactions));
    }

    loading = false;
  });
</script>

<div class="report-list">
  {#if loading}
    <p>감상문을 불러오고 있어요!</p>
  {:else}
    <ul>
      {#if reports && reports.length > 0}
        {#each reports as report (report.slug)}
          <BookReport
            id={report.slug}
            {bookId}
            {bookThumbnail}
            reportTitle={report.data.reportTitle}
            reportContent={report.body?.substr(0, 200)}
            reader={report.data.reader}
            reactionCount={reactionCount?.find(
              (e) => e.book_id === bookId && e.report_id === +report.slug
            )}
            myReaction={myReactions?.find(
              (e) => e.book_id === bookId && e.report_id === +report.slug
            )}
          />
        {/each}
      {:else}
        <p>감상문은 {pubDate}에 공개됩니다.</p>
      {/if}
    </ul>
  {/if}
</div>

<style>
  .report-list {
    margin-top: 3rem;
    width: 90%;
  }
</style>
