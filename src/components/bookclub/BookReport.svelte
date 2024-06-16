<script>
  export let id;
  export let thumbnailImage;
  export let reportTitle;
  export let reportContent;
  export let pubDate;
  export let reader;
  export let reaction;

  function getFormattedDate(date) {
    return date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
</script>

<li>
  <img class="book-img" src={thumbnailImage} alt="book-img" />
  <div class="report-info">
    <h4>{reportTitle}</h4>
    <div class="reader-info">
      <p>
        {`${reader}  | `}

        {getFormattedDate(new Date(pubDate))}
      </p>
      <div class="emoji">
        <button>
          <img src="/bookclub/best.png" />
          <p>{reaction?.is_best ?? 0}</p>
        </button>
        <button>
          <img src="/bookclub/funny.png" />
          <p>{reaction?.is_funny ?? 0}</p>
        </button>
        <button>
          <img src="/bookclub/interesting.png" />
          <p>{reaction?.is_interested ?? 0}</p>
        </button>
        <button>
          <img src="/bookclub/empathized.png" />
          <p>{reaction?.is_empathized ?? 0}</p>
        </button>
        <button>
          <img src="/bookclub/amazed.png" />
          <p>{reaction?.is_amazed ?? 0}</p>
        </button>
      </div>
    </div>
    <p class="report">{reportContent}</p>
  </div>
</li>

<style>
  li {
    width: 100%;
    margin-bottom: 3rem;
    display: flex;
    flex-direction: row;
  }
  .book-img {
    width: 300px;
    height: 150px;
    border-radius: 10px;
    flex-shrink: 0;
    margin-right: 2rem;
    object-fit: cover;
  }
  .reader-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
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

  @media (max-width: 810px) {
    li {
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
