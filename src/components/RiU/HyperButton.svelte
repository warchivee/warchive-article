<script lang="ts">
  export let imgSrc: string;
  export let href: string;
  export let cling: boolean;
</script>

<a href={`/Radicals-in-University/${href}`} class={cling ? "cling" : "away"}>
  <img
    src={`/RiU/${imgSrc}`}
    alt="이미지"
    class={imgSrc === "button_intro.png" ? "bigger" : ""}
  />
</a>

<style>
  a {
    display: inline-block;
    text-decoration: none;
    transition: 0.3s ease-in-out; /* 마우스 오버 시 애니메이션 */
    z-index: 10;
  }

  a.cling {
    position: absolute;
    right: -1rem;
    bottom: -1rem;
  }
  a.cling:hover {
    transform: scale(1.1);
  }

  a.away {
    position: fixed;
    right: -1rem;
    bottom: 3rem;
  }
  a.away:hover {
    transform: translateX(-2rem);
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
    a.cling {
      right: -2rem;
    }
    a.away {
      position: fixed;
      right: -4rem;
      bottom: 3rem;
    }
    a.away:hover {
      transform: translateX(0rem);
      transform: scale(1.1);
    }
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
      position: absolute;
      right: -8%;
      bottom: -8%;
    }
    a.away:hover {
      transform: translateX(0);
      transform: scale(1.1);
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
