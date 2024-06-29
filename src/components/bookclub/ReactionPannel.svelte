<script>
  import { onMount } from "svelte";
  import Loading from "../Loading.svelte";

  export let bookId;
  export let reportId;

  let uid = "";
  let reactionCount = [];
  let myReactions = [];

  let reactionCountIndex;
  let myReactionIndex;

  let loading = true;

  onMount(async () => {
    uid = localStorage.getItem("user-uid");

    if (!uid) {
      uid = crypto.randomUUID();
      localStorage.setItem("user-uid", uid);
    }

    reactionCount = JSON.parse(sessionStorage.getItem("reaction-count"));
    myReactions = JSON.parse(sessionStorage.getItem("my-reaction"));

    if (!reactionCount) {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbzc2eEZT8yghP_x1OKzT7T40Tj4QvXlz-WmU0LiXP-pQjrWxTJt9xrn2VGGCYYHC5qo/exec?req=get&uid=${uid}`
      );
      const responseJson = await response.json();

      reactionCount = responseJson?.data?.reactionCount;
      myReactions = responseJson?.data?.reaction;

      sessionStorage.setItem("reaction-count", JSON.stringify(reactionCount));
      sessionStorage.setItem("my-reaction", JSON.stringify(myReactions));
    }
    reactionCountIndex = reactionCount?.findIndex(
      (e) => e.book_id === +bookId && e.report_id === +reportId
    );
    if (reactionCountIndex == -1) {
      reactionCount.push(
        {
          book_id: +bookId,
          report_id: +reportId,
          is_best: 0,
          is_funny: 0,
          is_interested: 0,
          is_empathized: 0,
          is_amazed: 0,
        },
      );

      reactionCountIndex = reactionCount.length - 1;
    }

    myReactionIndex = myReactions?.findIndex(
      (e) => e.book_id === +bookId && e.report_id === +reportId
    );

    if (myReactionIndex == -1) {
      myReactions.push({
          book_id: +bookId,
          report_id: +reportId,
          uuid: uid,
          is_best: false,
          is_funny: false,
          is_interested: false,
          is_empathized: false,
          is_amazed: false,
        });

        
      myReactionIndex = myReactions?.length - 1;
    }

    loading = false;
  });

  function onClick(action) {
    let newMyReactions = myReactions;
    let newReactionCount = reactionCount;

    newMyReactions[myReactionIndex] = {
      ...newMyReactions[myReactionIndex],
      [action]: !(newMyReactions[myReactionIndex]?.[action]),
    };

    if (newMyReactions[myReactionIndex][action]) {
      newReactionCount[reactionCountIndex] = {
        ...newReactionCount[reactionCountIndex],
        [action]: (newReactionCount[reactionCountIndex]?.[action] ?? 0) + 1,
      };
    } else {
      newReactionCount[reactionCountIndex] = {
        ...newReactionCount[reactionCountIndex],
        [action]: newReactionCount[reactionCountIndex]?.[action] - 1,
      };
    }

    myReactions = newMyReactions;
    reactionCount = reactionCount;

    sessionStorage.setItem("reaction-count", JSON.stringify(reactionCount));
    sessionStorage.setItem("my-reaction", JSON.stringify(myReactions));

    const emjValue =
      myReactions[myReactionIndex]?.is_best +
      "," +
      myReactions[myReactionIndex]?.is_funny +
      "," +
      myReactions[myReactionIndex]?.is_interested +
      "," +
      myReactions[myReactionIndex]?.is_empathized +
      "," +
      myReactions[myReactionIndex]?.is_amazed;

    fetch(
      `https://script.google.com/macros/s/AKfycbzc2eEZT8yghP_x1OKzT7T40Tj4QvXlz-WmU0LiXP-pQjrWxTJt9xrn2VGGCYYHC5qo/exec?req=put&bid=${bookId}&rid=${reportId}&uid=${uid}&emj=${emjValue}`
    );
  }
</script>

{#if loading}
  <Loading />
{:else}
  <button
    class={myReactions[myReactionIndex]?.is_best ? "selected" : ""}
    on:click={() => onClick("is_best")}
  >
    <div>
      <img src="/bookclub/emoji_best.png" alt="최고예요" />
      <p>최고예요</p>
      <p>{reactionCount[reactionCountIndex]?.is_best ?? 0}</p>
    </div>
  </button>
  <button
    class={myReactions[myReactionIndex]?.is_funny ? "selected" : ""}
    on:click={() => onClick("is_funny")}
  >
    <div>
      <img src="/bookclub/emoji_funny.png" alt="재밌어요" />
      <p>재밌어요</p>
      <p>{reactionCount[reactionCountIndex]?.is_funny ?? 0}</p>
    </div>
  </button>
  <button
    class={myReactions[myReactionIndex]?.is_interested ? "selected" : ""}
    on:click={() => onClick("is_interested")}
  >
    <div>
      <img src="/bookclub/emoji_interesting.png" alt="흥미로워요" />
      <p>흥미로워요</p>
      <p>{reactionCount[reactionCountIndex]?.is_interested ?? 0}</p>
    </div>
  </button>
  <button
    class={myReactions[myReactionIndex]?.is_empathized ? "selected" : ""}
    on:click={() => onClick("is_empathized")}
  >
    <div>
      <img src="/bookclub/emoji_empathized.png" alt="공감해요" />
      <p>공감해요</p>
      <p>{reactionCount[reactionCountIndex]?.is_empathized ?? 0}</p>
    </div>
  </button>
  <button
    class={myReactions[myReactionIndex]?.is_amazed ? "selected" : ""}
    on:click={() => onClick("is_amazed")}
  >
    <div>
      <img src="/bookclub/emoji_amazed.png" alt="놀라워요" />
      <p>놀라워요</p>
      <p>{reactionCount[reactionCountIndex]?.is_amazed ?? 0}</p>
    </div>
  </button>
{/if}

<style>
  button {
    background: transparent;
    border: none;
    cursor: pointer;
    width: 70px;
    height: 95px;
    z-index: 1;
    border-radius: 15px;
  }

  button.selected {
    background: #9239ff;
    & p {
      color: white;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  p {
    font-size: 12px;
    width: 70px;
    text-align: center;
  }

  img {
    width: 30px;
    transition: 0.3s;
  }

  button:hover img {
    width: 50px;
  }

  @media (max-width: 450px) {
    button:hover img {
      width: 30px;
    }
  }
</style>
