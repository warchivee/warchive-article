<footer>
    <div class="footer-sns">
        <a href="https://x.com/Womynarchive" target="_blank">
            <i class="fa-brands fa-x-twitter"></i>
        </a>
        <a href="https://www.instagram.com/womynarchive" target="_blank">
            <i class="fa-brands fa-instagram"></i>
        </a>    
    </div>
    <div>
         <div class="footer-copyright">
            여성서사 아카이브 프로젝트 Warchive
        </div>
        <div class="footer-copyright">
            Copyright © 2024 Warchive. All rights reserved.
        </div>
    </div>
</footer>
  
<style>
    footer {
        height: fit-content;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: center;
        margin-top: 2rem;
        transform: translateZ(0);

        padding-bottom: calc(env(safe-area-inset-bottom) + 4vh + 2vw);
        padding-left: env(safe-area-inset-left);
        padding-right: env(safe-area-inset-right);
    }
    footer * {
        color: var(--color-riu-black);
    }
    .footer-sns {
        display: flex;
        gap: 10px;
    }
    .footer-sns a {
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        height: 25px;
        width: 25px;  
        border-radius: 5px;
        padding: 1px 1px 0 0;
        background-color: var(--color-riu-black); 
    }
    .footer-sns a i {
        font-size: 14px;
        color: var(--color-riu-white);   
    }
    .footer-copyright {
        text-align: center;
        font-family: var(--font-riu);
        font-weight: 500;
        font-size: 14px;
        letter-spacing: -5%;
    }

    @media (max-width: 1200px) {
        footer {
            padding-bottom: calc(env(safe-area-inset-bottom) + 6vh + 4vw);
            padding-left: env(safe-area-inset-left);
            padding-right: env(safe-area-inset-right);
        }
        
        @supports (-webkit-touch-callout: none) {
            footer {
                padding-bottom: calc(env(safe-area-inset-bottom) + 8vh + 4vw);
            }
        }
    }

    @media (max-width: 900px) {
        footer {
            padding-bottom: calc(env(safe-area-inset-bottom) + 12vh + 6vw);
            padding-left: env(safe-area-inset-left);
            padding-right: env(safe-area-inset-right);
        }
    }
</style>  