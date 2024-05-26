<script>
    export let url;
    export let title;
    export let creator;
    export let image;
    export let desc;
    export let startDate;
    export let endDate;

    let showModal = false;

    function handleOpenModal() {
        showModal = true;
        console.log(title, " 보이기");
    }

    function handleCloseModal() {
        showModal = false;
        console.log(title, " 숨기기");
    }
    
    // console.log("url: ", url);
    // console.log("title: ", title);
    // console.log("creator: ", creator);
    // console.log("image: ", image);
    // console.log("desc: ", desc);
    // console.log("startDate: ", startDate);
    // console.log("endDate: ", endDate);
    // console.log("showModal: ", showModal);
</script>

<li>
    <div on:click={handleOpenModal} aria-hidden="true">
        <img src={image} alt={`${title} 표지`} />
        <a href={url}>감상문 보기</a>
    </div>
</li>

{#if showModal}
    <div class="modal">
        작품 모달 창
        <button on:click={handleCloseModal}>닫힘 버튼</button>
    </div>
{/if}
  
<style>
    li {
        flex: 0 1 calc(25% - 10px);
        box-sizing: border-box;
        margin: 5px;
    }

    img {
        width: 128px;
        height: 188px;
        object-fit: cover;
        display: block;
    }

    .modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 1rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }

    @media (max-width: 850px) {
        li {
            flex: 0 1 calc(50% - 10px);
        }
    }
</style>
  