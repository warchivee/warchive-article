<div class="container">
  <span class="loader"></span>
</div>

<style>
  /* DEMO-SPECIFIC STYLES */
  .container {
    min-height: calc(100vh - 200px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid transparent;
    border-bottom-color: black;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
