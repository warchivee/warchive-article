<script>
  import emailjs from "@emailjs/browser";

  export let postTitle;
  export let creator;
  export let image;
  export let startDate;
  export let endDate;
  export let pubDate;

  import LeftArrow from "../../../public/bookclub/left-arrow.png";
  import PostBox from "../../../public/bookclub/post-box.png";
  import Snackbar from "../Snackbar.svelte";
  import Confirm from "../Confirm.svelte";

  const start = new Date(startDate);
  const end = new Date(endDate);
  const post = new Date(pubDate);

  const startDateFormatted = formatDate(start);
  const endDateFormatted = formatDate(end).slice(5);

  let nickname = "";
  let title = "";
  let contents = "";

  let loading = false;
  let showModal = false;
  let showSnackbar = false;
  let message = "";

  function getMonthInfo(date) {
    return date.getMonth() + 1;
  }

  function getDateInfo(date) {
    return date.getDate();
  }

  function formatDate(date) {
    return (
      date.getFullYear() +
      "." +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "." +
      ("0" + date.getDate()).slice(-2)
    );
  }

  function openSnackbar(msg) {
    message = msg;
    showSnackbar = true;

    setTimeout(() => {
      showSnackbar = false;
    }, 3000);
  }

  function handleCancel() {
    showModal = false;

    openSnackbar("취소하였습니다.");
  }

  async function handleSendReport() {
    if (loading) {
      return;
    }

    if (nickname === "" || title === "" || contents === "") {
      showModal = false;
      openSnackbar("내용을 빠짐없이 입력해주세요.");
      return;
    }

    if (contents.length > 4000) {
      showModal = false;
      openSnackbar("글자수는 4000자를 넘을 수 없습니다.");
      return;
    }

    try {
      loading = true;

      await emailjs.send(
        "warchive",
        "warchive_bookclub",
        {
          nickname: nickname,
          title: title,
          contents: contents,
          bookname: data.title,
        },
        {
          publicKey: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY,
        }
      );

      loading = false;
      showModal = false;

      nickname = "";
      title = "";
      contents = "";

      openSnackbar("감상문을 와카이브로 전송했습니다! 참여 감사합니다.");
    } catch (error) {
      loading = false;

      openSnackbar(
        "메일을 전송하지 못했습니다. 오류가 계속되면 와카이브에 문의 바랍니다."
      );
    }
  }
</script>

<div class="submit-page">
  <a class="back-btn" href="/bookclub/">
    <img src={LeftArrow.src} alt="북클럽으로 돌아가기" />
  </a>
  <div class="submit-header">
    <div class="book-info">
      <img class="book-img" src={image} alt={`${postTitle} 표지`} />
      <div class="book-text">
        <h4>{startDateFormatted} ~ {endDateFormatted}</h4>
        <h1>{postTitle}</h1>
        <h3>{creator}</h3>
      </div>
    </div>
    <div class="unerbar"></div>
  </div>
  <div class="submit-alert">
    <div class="alert-img">
      <img src={PostBox.src} alt="우편함" />
    </div>
    <div class="alert-txt">
      {getMonthInfo(start)}월의 와카이브 북클럽에서 읽을 책은
      <b>‘{postTitle}’</b>입니다.<br />
      책을 읽은 뒤 감상을 자유롭게 적어 우편함에 넣어주세요.<br />
      우편함은
      <b>{getMonthInfo(end)}월 {getDateInfo(end)}일에 마감</b>합니다.<br />
      참여하신 분들의 감상은
      <b>{getMonthInfo(post)}월 {getDateInfo(post)}일</b>에 일괄 공개됩니다.
      다양한 이모지로 반응을 남겨주세요.

      <br />
      <h5>
        (*여성혐오적인 표현, 작품과 무관한 내용 등 부적절한 감상은 게시되지 않을
        수 있습니다)
      </h5>
    </div>
  </div>
  <div class="submit-form-warp">
    <div class="submit-form">
      <div class="form-item nickname">
        <label for="nickname">닉네임</label>
        <input
          class="nickname"
          type="text"
          id="nickname"
          name="nickname"
          bind:value={nickname}
        />
      </div>
      <div class="form-item">
        <label for="title">제목</label><input
          type="text"
          id="title"
          name="title"
          bind:value={title}
        />
      </div>
      <div class="form-item">
        <label for="content">내용</label>
        <textarea
          placeholder="여기에 내용을 작성해주세요. 최대 4000자까지 작성할 수 있습니다."
          id="content"
          name="content"
          rows="15"
          bind:value={contents}
        ></textarea>
      </div>
      <div class="contents-limit">{contents.length}글자</div>
      <h5>해당 글은 와카이브 게시판에 영구적으로 공개됩니다</h5>
    </div>
  </div>
  <div class="submit-footer">
    <button on:click={() => (showModal = true)}>감상문 보내기</button>
  </div>
</div>

{#if showModal}
  <Confirm
    {loading}
    message="감상문을 와카이브에 보내시겠습니까?<br/>제출한 후에는 수정 및 재열람할 수 없습니다."
    onConfirm={handleSendReport}
    onCancel={handleCancel}
  />
{/if}

{#if showSnackbar}
  <Snackbar {message} />
{/if}

<style>
  @import "../../styles/bookclub.scss";

  .contents-limit {
    width: 100%;
    text-align: right;
    color: rgba(0, 0, 0, 0.56);
  }

  .alert-txt {
    line-height: 200%;
    & b {
      font-weight: bold;
      color: #9339ff;
    }
  }

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

  @keyframes fade-in-left {
    0% {
      -webkit-transform: translateX(-50px);
      transform: translateX(-50px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }

  .book-img {
    -webkit-animation: fade-in-left 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)
      both;
    animation: fade-in-left 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    width: 240px;
    box-shadow: rgba(0, 0, 0, 0.18) 5px 4px 6px;
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
    background-color: #d9d9d9;
  }

  .submit-alert {
    margin: 3rem 0rem;
    padding: 3rem;
    border-radius: 14px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 10px;

    display: flex;
    flex-direction: row;
    gap: 1.25rem;
    align-items: center;
  }

  .submit-form-warp {
    width: 100%;
    padding: 1.25rem;

    background-image: repeating-linear-gradient(
      -45deg,
      #9339ff 0%,
      #9339ff 20px,
      #faf7ed 20px,
      #faf7ed 40px,
      #e7d3ff 40px,
      #e7d3ff 60px,
      #faf7ed 60px,
      #faf7ed 80px
    );
    background-size: cover;

    & .submit-form {
      padding: 3rem 2rem;
      width: 100%;
      background-color: #fffcf3;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;

      & .form-item {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        & label {
          font-size: 14px;
          font-weight: bold;
        }

        & input,
        & textarea {
          appearance: none;
          border-radius: 0;
          outline: none;
          background: transparent;
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid #9339ff;
          resize: none;
        }
      }
    }
  }

  label {
    font-size: 1rem;
    color: rgba(0, 0, 0, 0.56);
    display: flex;
  }

  h1,
  h3 {
    color: #9339ff;
  }

  h5 {
    font-size: 14px;
    color: #939393;
    font-weight: 400;
  }

  button {
    margin-top: 3rem;
    padding: 8px 40px;
    border-radius: 60px;
    text-align: center;
    cursor: pointer;
    display: inline-block;
    text-decoration: none;
    color: #9339ff;
    border: 1px solid #9339ff;
    background-color: transparent;
    font-weight: bold;
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

    .submit-alert {
      flex-direction: column;
    }
  }
</style>
