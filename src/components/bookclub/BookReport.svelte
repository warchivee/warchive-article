<script>
  export let id;
  export let bookId;
  export let bookThumbnail;
  export let reportTitle;
  export let reportContent;
  export let pubDate;
  export let reader;
  export let reactionCount;
  export let myReaction;

  function getFormattedDate(date) {
    return date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
</script>

<li>
  <a href="/bookclub/{bookId}/{id}">
    <div class="book-img">
      <img src="/bookclub/envelope-line.png" alt="편지지 느낌의 꾸밈 요소" />
      <div
        class="book-img-filter"
        style="background-color: {'#' +
          parseInt(Math.random() * 0xffffff).toString(16)}"
      />
      <img src={bookThumbnail} alt="book-img" />
    </div>
    <div class="report-info">
      <div>
        <h4>{reportTitle}</h4>
        <p>
          {`${reader}  | `}
          {getFormattedDate(new Date(pubDate))}
        </p>
      </div>

      <div class="emoji">
        <button class={myReaction?.is_best ? "selected" : ""}>
          <img src="/bookclub/emoji_best.png" alt="최고예요" />
          <p>{reactionCount?.is_best ?? 0}</p>
        </button>
        <button class={myReaction?.is_funny ? "selected" : ""}>
          <img src="/bookclub/emoji_funny.png" alt="재밌어요" />
          <p>{reactionCount?.is_funny ?? 0}</p>
        </button>
        <button class={myReaction?.is_interested ? "selected" : ""}>
          <img src="/bookclub/emoji_interesting.png" alt="최고예요" />
          <p>{reactionCount?.is_interested ?? 0}</p>
        </button>
        <button class={myReaction?.is_empathized ? "selected" : ""}>
          <img src="/bookclub/emoji_empathized.png" alt="공감해요" />
          <p>{reactionCount?.is_empathized ?? 0}</p>
        </button>
        <button class={myReaction?.is_amazed ? "selected" : ""}>
          <img src="/bookclub/emoji_amazed.png" alt="놀라워요" />
          <p>{reactionCount?.is_amazed ?? 0}</p>
        </button>
      </div>

      <p class="report">{reportContent}</p>
    </div>
  </a>
</li>

<style>
  li {
    width: 100%;
    margin-bottom: 3rem;
  }

  li > a {
    display: flex;
    flex-direction: row;
    text-decoration: none;
  }

  .book-img {
    position: relative;
    width: 430px;
    height: 220px;
    border-radius: 10px;
    flex-shrink: 0;
    margin-right: 2rem;
    overflow: hidden;
  }

  .book-img img:first-child {
    position: absolute;
    z-index: 2;
    top: 40px;
    width: 100%;
    opacity: 0.7;
  }

  .book-img img:last-child {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .book-img-filter {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0.7;
  }

  .report-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  p {
    font-size: 15px;
  }

  .emoji {
    display: flex;
  }

  button {
    display: flex;
    width: 40px;
    height: 20px;
    border-width: 1px;
    border-radius: 20px;
    align-items: center;
    justify-content: space-around;
    margin-right: 5px;
    border-color: #9339ff;
    background-color: transparent;
  }

  button p {
    color: #9339ff;
    font-size: small;
  }
  button img {
    width: 12px;
    height: 12px;
  }

  button.selected {
    background-color: #9339ff;
    & p {
      color: white;
    }
  }

  .report {
    margin-top: 1rem;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    word-wrap: break-word;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .book-img {
    transition: 0.3s;
  }

  li:hover .book-img {
    box-shadow: var(--box-shadow);
  }

  @media (max-width: 700px) {
    li > a {
      flex-direction: column;
    }
    .book-img {
      width: 100%;
    }
    .report-info {
      margin-top: 1rem;
    }
  }
</style>
