<script lang="ts">
  export let imgSrc: string;
  export let href: string;
  export let cling: boolean;
</script>

<a href={`/Radicals-in-University/${href}`} class={cling ? "cling" : "away"}>
  <img
    src={`../../../../public/RiU/${imgSrc}`}
    alt="이미지"
    class={imgSrc === "button_intro.png" ? "bigger" : ""}
  />
</a>

<style>
  a {
    position: absolute;
    right: -1rem;
    bottom: -1rem;
    display: inline-block;
    text-decoration: none;
    transition: 0.3s ease-in-out; /* 마우스 오버 시 애니메이션 */
    z-index: 999;
  }

  a:hover {
    transform: scale(1.1);
  }

  img {
    width: 200px;
    height: 200px;
    display: block;
    object-fit: cover;
  }

  img.bigger {
    width: 230px;
    height: 230px;
  }

  @media (max-width: 1100px) {
    img {
      width: 150px;
      height: 150px;
    }
    img.bigger {
      width: 180px;
      height: 180px;
    }
  }

  /* mobile */
  @media (max-width: 750px) {
    a {
      position: absolute;
      right: -8%;
      bottom: -8%;
    }
    a.away {
      right: -6%;
      bottom: -2%;
    }
    img {
      width: 100px;
      height: 100px;
    }
    img.bigger {
      width: 130px;
      height: 130px;
    }
  }
</style>
