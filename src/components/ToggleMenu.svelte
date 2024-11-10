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
            <div class="menu-info">
                <h2><a href="/">article</a></h2>
                <p>와카이브 : 아티클</p>    
            </div>
        </div>
        <div class="menu-content">
            <a href="/review" class="menu-item">review</a>
            <a href="/play" class="menu-item">play</a>
            <a href="/bookclub" class="menu-item">bookclub</a>
            <hr class="menu-hr" />
            <p>project</p>
            <a class="sub" href="https://nomore-corset.womynarchive.com/" target="_blank">no more corset</a>
            <a class="sub menu-item" href="/Radicals-in-University" target="_self">Radicals in University</a>            
            <hr class="menu-hr" />
            <a href="https://www.womynarchive.com/" target="_blank">
                <img src="../../public/android-icon-36x36.png" alt="와카이브 로고">
                여성서사 아카이빙 프로젝트 와카이브
            </a>
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
        background-image: linear-gradient(90deg, rgba(108, 63, 255, 1) 0%, rgba(233, 201, 255, 1) 100%);
        position: relative;
    }
    .menu-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .menu-info h2 {
        margin: 0;
        font-size: 3em;
        font-weight: 1000;
        line-height: 1em;
    }
    .menu-info a,
    .menu-info p {
        color: var(--color-white);
        text-decoration: none;
    }
    .menu-info p {
        letter-spacing: 0.34rem;
        font-size: 14px;
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
        background-color: var(--color-black);
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
        font-weight: 800;
    }
    .menu-content a {
        font-weight: 300;
        cursor: pointer;
        display: flex;
        gap: 4px;
        align-items: center;
    }
    .menu-content a.sub {
        margin-left: 1rem;
    }
    .menu-item.bold {
        font-weight: 1000;
    }
    .menu-hr {
        width: 100%;
        height: 2px;
    }
    .menu-content img {
        width: 24px;
        height: 24px;
    }

    @media (max-width: 720px) {
        .hamburger-menu-button {
            display: block;
        }
    }
</style>