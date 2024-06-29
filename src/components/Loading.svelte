<script>
    export let height = '100%';
</script>

<div class="loading" style="height:{height}">
    <span></span>
    <span></span>
    <span></span>
</div>

<style>
    .loading {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .loading span {
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: gray;
        border-radius: 50%;
        animation: loading 1s linear infinite;
        background-color: black;
    }

    .loading span:nth-child(1) {
        animation-delay: 0s;
    }

    .loading span:nth-child(2) {
        animation-delay: 0.4s;
        margin: 0px 10px
    }

    .loading span:nth-child(3) {
        animation-delay: 0.6s;
    }

    @keyframes loading {
        0%, 100% {
            opacity: 0;
            transform: scale(0.5);
        }
        50% {
            opacity: 1;
            transform: scale(1.2);
        }
    }
</style>