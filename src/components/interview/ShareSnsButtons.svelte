<script>
  import { onMount } from "svelte";

  export let shareTitle;

  export let url;
  export let title;
  export let description;
  export let hashtags;

  export let shareImage;

  function shareLink() {
    navigator.clipboard.writeText(`${url}`);
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
        imageUrl: shareImage,
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
    console.log(import.meta.env.PUBLIC_KAKAO_KEY);
    Kakao.init(import.meta.env.PUBLIC_KAKAO_KEY);

    return () => {};
  });
</script>

<div class="share">
  <h5>{shareTitle}</h5>
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
