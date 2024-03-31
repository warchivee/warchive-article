<script>
  import ShareSnsButtons from "./ShareSnsButtons.svelte";

  export let target;

  export let image;
  export let url;
  export let description;
  export let hashtags;
</script>

<footer>
  <div class="team-infos">
    {#if target}
      <div class="team-info">
        <div>
          <h5>{target.name}</h5>
          <div class="sns-btns">
            {#if target.contacts.email}
              <a href={`mailto:${target.contacts.email}`} target="_blank">
                <i class="fa-solid fa-envelope"></i>
              </a>
            {/if}

            {#if target.contacts.instagram}
              <a href={target.contacts.instagram} target="_blank">
                <i class="fa-brands fa-instagram"></i>
              </a>
            {/if}

            {#if target.contacts.twitter}
              <a href={target.contacts.twitter} target="_blank">
                <i class="fa-brands fa-x-twitter"></i>
              </a>
            {/if}

            {#if target.contacts.youtube}
              <a href={target.contacts.youtube} target="_blank">
                <i class="fa-brands fa-youtube"></i>
              </a>
            {/if}

            {#if target.contacts.site}
              <a href={target.contacts.site} target="_blank">
                <i class="fa-solid fa-globe"></i>
              </a>
            {/if}
          </div>
          <p>
            {#each target.about as a}
              <a href={a.url} target="_blank">{a.text}</a>
              <br />
            {/each}
          </p>
        </div>
      </div>
    {/if}

    <div class="team-info warchive">
      <div>
        <h5>프로젝트 와카이브</h5>
        <div class="sns-btns">
          <a href="mailto:team.warchive@gmail.com" target="_blank">
            <i class="fa-solid fa-envelope"></i>
          </a>
          <a href="https://www.instagram.com/womynarchive" target="_blank">
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a href="https://twitter.com/Womynarchive" target="_blank">
            <i class="fa-brands fa-x-twitter"></i>
          </a>
          <a href="https://www.womynarchive.com" target="_blank">
            <i class="fa-solid fa-globe"></i>
          </a>
        </div>
        <p>
          2021년 여성서사 아카이빙 사이트 오픈
          <br />
          '여성에게는 여성의 이야기가 필요합니다' 를 캐치프레이즈로 다양한 여성서사를
          발굴, 기록하고 있다.
        </p>
      </div>
    </div>
  </div>

  <ShareSnsButtons
    shareTitle="인터뷰 공유하기"
    {url}
    {description}
    hashtags={`와카이브,${hashtags?.join(",")}`}
    shareImage={image}
  />
</footer>

<style>
  footer {
    margin-top: 5rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5rem;
  }

  a {
    text-decoration-line: none;
  }

  a:hover {
    color: var(--color-title);
  }

  .team-infos {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: 1000px;
  }

  .team-infos .sns-btns {
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    margin-top: 0.3rem;
    margin-bottom: 0.8rem;
  }

  .team-infos * {
    color: var(--color-text);
  }

  .team-infos > div.warchive * {
    color: var(--color-title);
  }

  .team-infos h5 {
    font-size: 1.15rem;
    font-weight: 900;
  }

  .team-infos {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 1rem;
  }

  .team-info * {
    text-align: right;
  }

  .team-info .sns-btns i {
    color: var(--color-white);
    background-color: var(--color-text);
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    text-align: center;
    vertical-align: middle;
    line-height: 1.5rem;
    border-radius: 50%;
  }

  .team-info.warchive .sns-btns i {
    background-color: var(--color-title);
  }

  .team-info {
    display: flex;
    align-items: stretch;
  }

  .team-info::after {
    content: "";
    margin: 0.5rem 0 0 1rem;
    width: 7px;
    flex-basis: auto;
    background: url("/assets/zigzag_line_vertical.png") 0 0 repeat-y;
    background-size: cover;
  }

  .team-info.warchive::after {
    content: "";
    margin: 0.5rem 0 0 1rem;
    width: 7px;
    flex-basis: auto;
    background: url("/assets/zigzag_line_blue_vertical.png") 0 0 repeat-y;
    background-size: cover;
  }
</style>
