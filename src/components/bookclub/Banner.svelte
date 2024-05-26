<script>
  const period = "2024.05.25 ~ 05.30";
  const title = "방금 떠나온 세계";
  const creator = "저자 김초엽";
  const image = "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791160406504.jpg";
</script>

<div class="banner" style="background-image: url('{image}')">
  <div class="banner-gradient" ></div>
  <div class="banner-info">
    <div class="info-block">
      <h5>{period}</h5>
      <h4>이번주 독서 클럽</h4>
    </div>
    <div class="info-block">
      <h1>{title}</h1>
      <h3>{creator}</h3>
    </div>
    <a class="a-btn" href="/bookclub/submit/">감상문 공유하기</a>
  </div>
</div>

<style>
  .banner {
    width: 100%;
    max-width: 1000px;
    height: fit-content;
    position: relative;

    padding: 3rem 5rem;
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
    background: linear-gradient(to right, rgba(147, 57, 255, 0.8), rgba(147, 57, 255, 0));
  }

  .banner-info {
    z-index: 1;

    & * {
      color: white;
    }

    & h3, h5 {
      font-weight: 400;
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

  @media (max-width: 720px) {

  }
</style>
