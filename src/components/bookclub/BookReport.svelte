<script>
  export let id;
  export let bookId;
  export let bookThumbnail;
  export let reportTitle;
  export let reportContent;
  export let reader;
  export let reactionCount;
  export let myReaction;

  const colors = [
    "6420AA",
    "FF3EA5",
    "FF7ED4",
    "FFB5DA",
    "176B87",
    "86B6F6",
    "B4D4FF",
  ];
  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
</script>

<a href="/bookclub/{bookId}/{id}">
  <div class="book-img">
    <img src="/bookclub/envelope-line.png" alt="편지지 느낌의 꾸밈 요소" />
    <div class="thumbnail" style="background-image: url({bookThumbnail});" />
    <div class="filter" style="background-color: {'#' + getRandomColor()}" />
  </div>

  <div class="report-info">
    <div>
      <h4>{reportTitle}</h4>
      <p>
        {`${reader}`}
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

    <p class="report">{@html reportContent}</p>
  </div>
</a>

<style>

 a {
    display: flex;
    width: auto;
    margin-bottom: 3rem;
    text-decoration: none;
  }

  .book-img {
    flex-shrink: 0;
    position: relative;
    width: 430px;
    height: 220px;
    border-radius: 10px;
    margin-right: 2rem;
    overflow: hidden;
  }

  .book-img img {
    position: absolute;
    z-index: 2;
    top: 40px;
    width: 100%;
    opacity: 0.7;
  }

  .book-img .thumbnail {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    content: "";
    filter: saturate(50%);
    opacity: 0.6;
    z-index: 1;
  }

  .book-img .filter {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
  }

  p {
    font-size: 15px;
  }

  .emoji {
    display: flex;
    gap: 10px;
    margin: 5px 0;
  }

  button {
    display: flex;
    gap: 3px;
    width: 40px;
    height: 20px;
    border-width: 1px;
    border-radius: 20px;
    align-items: center;
    justify-content: space-around;
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
    height: 81px;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    word-break: break-word;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    text-rendering: optimizeLegibility;
    line-height: 1.8;
    white-space: normal;
  }

  .book-img {
    transition: 0.3s;
  }

  a:hover .book-img {
    box-shadow: var(--box-shadow);
  }

  @media (max-width: 700px) {
    a {
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
