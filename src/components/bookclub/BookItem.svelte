<script>
    // import { onMount } from "svelte";

    export let url;
    export let title;
    export let creator;
    export let image;
    export let desc;
    export let startDate;
    export let endDate;

    const startDateFormatted = formatDate(startDate);
    const endDateFormatted = formatDate(endDate).slice(5);
    
    function formatDate(date) {
        return date.getFullYear() + '.' + 
            ('0' + (date.getMonth() + 1)).slice(-2) + '.' + 
            ('0' + date.getDate()).slice(-2);
    }

    let showModal = false;
    
</script>

<li>
    <div class="li-item" on:click={() => { showModal = true; }} aria-hidden="true">
        <img src={image} alt={`${title} 표지`} />
    </div>
</li>

{#if showModal}
    <div class="modal">
        <div class="modal-button">
            <button on:click={() => { showModal = false; }}>X</button>
        </div>
        <div class="modal-container">
            <div class="image">
                <img src={image} alt={`${title} 표지`} />
            </div>
            <div class="vertical-line"></div>
            <div class="info">
                <div class="info-header">
                    <h5>{startDateFormatted}~{endDateFormatted}</h5>
                    <h2>{title}</h2>
                    <h4>{creator}</h4>
                </div>
                <div class="info-body">
                    <p>{desc}</p>
                </div>
                <div class="info-footer">
                    <a href={url}>감상문 보러가기</a>
                </div>
            </div>    
        </div>        
    </div>
{/if}

<style>
    li {
        flex: 0 1 calc(25% - 10px);
        box-sizing: border-box;
        margin: 5px;
        
    }

    .li-item {
        cursor: pointer;
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
  