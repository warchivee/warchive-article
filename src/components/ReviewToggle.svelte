<script>
    export let selected = 'review';
</script>
  
<div class="review-toggle">
    <a href="/review" class:selected={selected === 'review'}>review</a>
    <a href="/interview" class:selected={selected === 'interview'}>interview</a>
</div>
  
<style>
    .review-toggle {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
        height: fit-content;
    }

    .review-toggle > a {
        background-color: var(--color-background);
        padding: 0.8rem;
        text-decoration: none;
        color: var(--color-text);
        border-radius: 8px;
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    .review-toggle > a:hover {
        background-color: rgba(235, 219, 243, 0.5);
    }

    .review-toggle > .selected {
        background-color: var(--color-title);
        color: var(--color-white);
        transition: none;
    }
    
    .review-toggle > .selected:hover {
        background-color: var(--color-title);
    }
</style>
