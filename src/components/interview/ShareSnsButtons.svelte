<script>
  import Snackbar from "../Snackbar.svelte";
  import { onMount } from "svelte";
  import { SITE_TITLE } from "../../consts";

  export let shareTitle;
  let title = `〈${SITE_TITLE}〉`;

  export let url;
  export let description;
  export let hashtags;

  export let shareImage;

  let showSnackbar = false;

  // Set the store to true when the button is clicked
  function openSnackbar() {
    showSnackbar = true;

    setTimeout(() => {
      showSnackbar = false;
    }, 3000);
  }

  function shareLink() {
    navigator.clipboard.writeText(`${url}`);

    openSnackbar();
  }

  function shareFacebook() {
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${url}`);
  }

  function shareTwitter() {
    window.open(
      `https://twitter.com/intent/tweet?text=${title + " " + description}&hashtags=${hashtags}&url=${url}`
    );
  }

  function shareKakao() {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: description,
        imageUrl: `${shareImage}`,
        link: {
          mobileWebUrl: `${url}`,
          webUrl: `${url}`,
        },
      },
      buttons: [
        {
          title: "자세히 보기",
          link: {
            mobileWebUrl: `${url}`,
            webUrl: `${url}`,
          },
        },
      ],
    });
  }

  onMount(() => {
    Kakao.init(import.meta.env.PUBLIC_KAKAO_KEY);

    return () => {};
  });
</script>

<div class="share">
  <h6>{shareTitle}</h6>
  <div class="sns-btns">
    <div on:click={shareLink} aria-hidden="true">
      <i class="fa-solid fa-link"></i>
    </div>
    <div on:click={shareTwitter} aria-hidden="true">
      <i class="fa-brands fa-x-twitter"></i>
    </div>
    <div on:click={shareKakao} aria-hidden="true">
      <i class="fa-solid fa-comment"></i>
    </div>
    <div on:click={shareFacebook} aria-hidden="true">
      <i class="fa-brands fa-facebook"></i>
    </div>
  </div>
</div>

{#if showSnackbar}
  <Snackbar message="링크를 복사했습니다." />
{/if}

<style>
  .share {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 5rem;
  }

  h6 {
    color: var(--color-header);
    font-weight: 400;
  }

  .sns-btns {
    display: flex;
    gap: 0.5rem;
  }

  .sns-btns div i {
    background-color: var(--color-header);
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    text-align: center;
    vertical-align: middle;
    line-height: 2.5rem;
    font-size: 1.7rem;
    color: var(--color-white);
    cursor: pointer;
  }
</style>
