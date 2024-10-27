<script>
    let isMenuOpen = false;
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    import { onMount } from 'svelte';
    onMount(() => {
        const currentPath = window.location.pathname;
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            if (item.getAttribute('href') === currentPath) {
                item.classList.add('bold');
            }
        });
    });
</script>

<div class="hamburger-menu-button">
    <button class="menu-button" on:click={toggleMenu} aria-label="menu button">
      <i class="fa fa-bars"></i>
    </button>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class={`menu${isMenuOpen ? ' open' : ''}`} on:click={toggleMenu}>
    <div class="menu-container" on:click={e => e.stopPropagation()} aria-hidden="true">
        <div class="menu-header">
            <button class="menu-close-btn" on:click={toggleMenu} aria-hidden="true">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <a href="https://www.womynarchive.com/" target="_blank">
                <img src="https://i.ibb.co/WtWVG8r/logo.png" width="100" alt="와카이브 로고"/>
            </a>
            <p>여성서사 아카이브 프로젝트 와카이브</p>
        </div>
        <div class="menu-content">
            <a href="/" class="menu-item">home</a>
            <a href="/review" class="menu-item">review</a>
            <a href="/play" class="menu-item">play</a>
            <a href="/bookclub" class="menu-item">bookclub</a>
            <hr class="menu-hr" />
            <p>project</p>
            <a class="sub" href="https://nomore-corset.womynarchive.com/" target="_blank">no more corset</a>
            <a class="sub" href="/Radicals-in-University" target="_blank">Radicals in University</a>            
        </div>
    </div>
</div>

<style>
    .hamburger-menu-button {
        display: none;
    }
    .menu-button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
    }

    .menu {
        display: none;
        position: absolute;
        z-index: 101;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: fixed;

        backdrop-filter: blur(8px);
        /* transition: opacity 0.3s ease-in-out; */
    }
    .menu.open {
        display: block;
    }

    .menu-container {
        width: 300px;
        max-width: 100%;
        height: 100%;
    }

    .menu-header,
    .menu-close-btn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .menu-header {
        width: 100%;
        height: 150px;
        /* background-color: var(--color-header); */
        /* background-color: var(--accent); */
        background-color: rgb(144, 35, 213);
        position: relative;
    }
    .menu-header p {
        color: var(--color-white);
        font-size: var(--text-caption);
        font-weight: bold;
    }
    .menu-close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        cursor: pointer;
    }
    .menu-close-btn i {
        font-size: 20px;
        color: var(--color-white);
    }

    .menu-content {
        width: 100%;
        height: calc(100% - 150px);
        /* background-color: var(--accent-dark); */
        /* background-color: var(--color-black); */
        background-color: rgb(23, 12, 30);
        color: var(--color-white);
        padding: 1rem;
        display: flex;
        flex-direction: column;
    }
    .menu-content a,
    .menu-content p {
        all: unset;
        padding: 6px;
    }
    .menu-content p {
        color: var(--color-background);
    }
    .menu-content a {
        cursor: pointer;
    }
    .menu-content a.sub {
        margin-left: 1rem;
    }
    .menu-item.bold {
        font-weight: bold;
    }
    .menu-hr {
        width: 100%;
        height: 2px;
    }

    @media (max-width: 720px) {
        .hamburger-menu-button {
            display: block;
        }
    }
</style>