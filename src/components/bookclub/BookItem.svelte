<script>
    export let url;
    export let title;
    export let creator;
    export let image;
    export let startDate;
    export let endDate;

    const startDateFormatted = formatDate(startDate);
    const endDateFormatted = formatDate(endDate).slice(5);
    
    function formatDate(date) {
        return date.getFullYear() + '.' + 
            ('0' + (date.getMonth() + 1)).slice(-2) + '.' + 
            ('0' + date.getDate()).slice(-2);
    }
</script>

<li>
    <a class="li-item" href={url}>
        <img src={image} alt={`${title} 표지`} />
        <div class="details">
            <p>{title}</p>
            <p>{creator}</p>
            <h5>북클럽 기간<br />{startDateFormatted} ~ {endDateFormatted}</h5>
        </div>
    </a>
    <div class="li-bar"></div>
</li>

<style>
    li {
        width: calc(22% - 20px);
        box-sizing: border-box;
        margin: 30px 20px;
    }

    .li-item {
        position: relative;
        cursor: pointer;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
    }
  
    .details {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        transition: opacity 0.3s ease;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 10px;
        opacity: 0;
    }

    .details * {
        text-align: left;
    }

    .li-item:hover .details {
        opacity: 1;
    }

    .li-bar {
        width: 160%;
        height: 18px;
        background-color: #D9D9D9;
        transform: translateX(-15%);
    }

    @media (max-width: 700px) {
        li {
            width: calc(35% - 20px);
        }
    }

    @media (max-width: 450px) {
        li {
            width: calc(50% - 20px);
        }
    }
</style>
  