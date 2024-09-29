<script>
  export let title;
  export let creator;
  export let image;
  export let startDate;
  export let endDate;
  export let isPublish;

  const startDateFormatted = formatDate(new Date(startDate));
  const endDateFormatted = formatDate(new Date(endDate)).slice(5);

  function formatDate(date) {
    return (
      date.getFullYear() +
      "." +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "." +
      ("0" + date.getDate()).slice(-2)
    );
  }

  function getKoreanDate(date) {
    return new Date(new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul' }).format(date));
  }
</script>

<div class="banner">
  <div class="banner-gradient"></div>
  <div class="banner-info">
    <h2>
      와카이브 북클럽은 재정비 중입니다!
    </h2>
    <h5>
      좀더 나은 모습으로 찾아뵙겠습니다.
      <br />
      기존 북클럽 감상문은 언제든지 열람 가능합니다.
    </h5>
  </div>
</div>

<style>
  @import "../../styles/bookclub.scss";

  .banner {
    width: 100%;
    max-width: 800px;
    height: fit-content;
    position: relative;

    padding: 3rem 4rem;
    margin-bottom: 2rem;
    border-radius: 10px;
    display: flex;

    background-size: cover;
    background-position: center;
  }

  .banner-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(
      to right,
      rgba(147, 57, 255, 0.8),
      rgba(147, 57, 255, 0)
    );
  }

  .banner-info {
    z-index: 1;

    & * {
      color: white;
    }

    & h3,
    h5 {
      font-weight: 400;
      line-height: 20px;
    }
  }

  .banner-info > :first-child * {
    line-height: 150%;
  }

  .banner-info > :nth-child(2) * {
    line-height: 130%;
  }

  .info-block {
    margin-bottom: 1rem;
  }

  .a-btn {
    margin-top: 1rem;
    padding: 8px 20px;
    border-radius: 60px;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    text-decoration: none;
    border: 1px solid white;
    background-color: transparent;
  }

  .a-btn:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 700px) {
    .banner {
      padding: 2rem 2rem;
    }

    .info-block {
      margin-bottom: 0.4rem;
    }

    .a-btn {
      margin-top: 0.6rem;
    }
  }
</style>
