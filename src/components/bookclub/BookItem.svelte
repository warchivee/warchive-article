<script>
  import Snackbar from "../Snackbar.svelte";

  export let url;
  export let title;
  export let creator;
  export let image;
  export let startDate;
  export let endDate;
  export let pubDate;
  export let isPublish;

  let showSnackbar;

  const startDateFormatted = formatDate(startDate);
  const endDateFormatted = formatDate(endDate).slice(5);
  const pubDateFormatted = formatDate(pubDate);

  function formatDate(date) {
    return (
      date.getFullYear() +
      "." +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "." +
      ("0" + date.getDate()).slice(-2)
    );
  }

  function openSnackbar() {
    showSnackbar = true;

    setTimeout(() => {
      showSnackbar = false;
    }, 3000);
  }

  function handleClick() {
    if (!isPublish) {
      openSnackbar();
    }
  }
</script>

<div class="book-item" on:click={handleClick} aria-hidden="true">
  <div class="li-item">
    <img src={image} alt={`${title} 표지`} />
    <div class="details">
      <p>{title}</p>
      <p>{creator}</p>
      <h5>북클럽 기간<br />{startDateFormatted} ~ {endDateFormatted}</h5>
    </div>
  </div>
</div>

{#if showSnackbar}
  <Snackbar message="감상문은 {pubDateFormatted} 에 공개됩니다." />
{/if}

<style>
  .book-item {
    width: 100%;
    box-sizing: border-box;
  }

  .li-item {
    position: relative;
    cursor: pointer;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  }

  .details {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    transition: opacity 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px;
    opacity: 0;
  }

  .details * {
    text-align: left;
  }

  .li-item:hover .details {
    opacity: 1;
  }
</style>
