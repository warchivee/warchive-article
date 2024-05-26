<script>
  import { bannerData } from "../../content/submit/banner";

  const start = new Date(bannerData.startDate);
  const end = new Date(bannerData.endDate);
  
  const startDateFormatted = formatDate(start);
  const endDateFormatted = formatDate(end).slice(5);
  
  function formatDate(date) {
      return date.getFullYear() + '.' + 
          ('0' + (date.getMonth() + 1)).slice(-2) + '.' + 
          ('0' + date.getDate()).slice(-2);
  }
</script>

<div class="banner" style="background-image: url('{bannerData.image}')">
  <div class="banner-gradient" ></div>
  <div class="banner-info">
    <div class="info-block">
      <h5>{startDateFormatted} ~ {endDateFormatted}</h5>
      <h4>이번주 독서 클럽</h4>
    </div>
    <div class="info-block">
      <h1>{bannerData.title}</h1>
      <h3>{bannerData.creator}</h3>
    </div>
    <a class="a-btn" href="/bookclub/submit/">
      <h5>감상문 공유하기</h5>
    </a>
  </div>
</div>

<style>
  @import '../../styles/bookclub.scss';

  .banner {
    width: 100%;
    max-width: 1000px;
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
