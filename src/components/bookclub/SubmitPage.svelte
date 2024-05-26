<script>
  import { bannerData as data } from "../../content/submit/banner";

  import LeftArrow from '../../../public/bookclub/left-arrow.png';
  import PostBox from '../../../public/bookclub/post-box.png';
  import Banner from "./Banner.svelte";

  const start = new Date(data.startDate);
  const end = new Date(data.endDate);
  const post = new Date(data.postDate);

  const startDateFormatted = formatDate(start);
  const endDateFormatted = formatDate(end).slice(5);
  
  function getMonthInfo(date) {
    return (date.getMonth() + 1);
  }
  
  function getDateInfo(date) {
    return date.getDate();
  }

  function formatDate(date) {
      return date.getFullYear() + '.' + 
          ('0' + (date.getMonth() + 1)).slice(-2) + '.' + 
          ('0' + date.getDate()).slice(-2);
  }
  
  function handleSendReport() {
    console.log("감상문 제출");
  }
</script>
  
<div class="submit-page">
  <a class="back-btn" href="/bookclub/">
    <img src={LeftArrow.src} alt="북클럽으로 돌아가기" />
  </a>
  <div class="submit-header">
    <div class="book-info">
      <img class="book-img" src={data.image} alt={`${data.title} 표지`}/>
      <div class="book-text">
        <h4>{startDateFormatted} ~ {endDateFormatted}</h4>
        <h2>{data.title}</h2>
        <p>{data.creator}</p>
      </div>
    </div>
    <div class="unerbar"></div>
  </div>
  <div class="submit-alert">
    <div class="alert-img">
      <img src={PostBox.src} alt="우편함" />
      <div class="alert-txt">
        {getMonthInfo(start)}월의 와카이브 북클럽에서 읽을 책은 ‘{data.title}’입니다.<br />
        책을 읽은 뒤 감상을 자유롭게 적어 우편함에 넣어주세요.<br />
        우편함은 {getMonthInfo(end)}월 {getDateInfo(end)}일에 마감합니다.<br />
        (*여성혐오적인 표현, 작품과 무관한 내용 등 부적절한 감상은 게시되지 않을 수 있습니다)<br />
        참여하신 분들의 감상은 {getMonthInfo(post)}월 {getDateInfo(post)}일에 일괄 공개됩니다. 다양한 이모지로 반응을 남겨주세요.    
      </div>
    </div>
  </div>
  <div class="submit-form">
    <label for="title">제목:</label>
    <input type="text" id="title" name="title">

    <label for="author">쓴사람:</label>
    <input type="text" id="author" name="author">

    <label for="content">내용:</label>
    <textarea id="content" name="content" rows="4"></textarea>

    <p>해당 글은 와카이브 게시판에 영구적으로 공개됩니다</p>
  </div>
  <div class="submit-footer">
    <button on:click={handleSendReport}>감상문 보내기</button>
  </div>
</div>
  
<style>
  @import '../../styles/bookclub.scss';

  .submit-page {
    position: relative;
    width: 100%;
    max-width: 1000px;
    height: fit-content;
    
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }

  .back-btn {
    position: absolute;
    top: 3rem;
    left: 1rem;
    width: fit-content;
    height: fit-content;
  }

  .submit-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
  }

  .book-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .book-img {
    width: 240px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  }

  .book-text {
    width: 200%;
    margin-left: 3rem;
  }

  .unerbar {
    width: 90%;
    max-width: 1000px;
    height: 24px;
    border-radius: 20px;
    background-color: #D9D9D9;
  }

  .submit-alert {
    margin: 3rem 0rem;
    padding: 3rem;
    border-radius: 14px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 700px) {
    .book-info {
      display: flex;
      flex-direction: column;
    }
  
    .book-text {
      width: 100%;
      margin: 1rem 0rem;
    }
  }
</style>
  