<script>
  function downloadImage() {
    console.log("download");
  }

  function shareTwitter() {
    console.log("twitter");
  }

  function shareKakaotalk() {
    console.log("kakao");
  }
</script>

<section>
  <button on:click={downloadImage}><i class="fa-solid fa-download"></i></button>
  <button on:click={shareTwitter}><i class="fa-brands fa-x-twitter"></i></button
  >
  <button on:click={shareKakaotalk}><i class="fa-solid fa-comment"></i></button>
</section>

<style>
  section {
    width: 100%;
    text-align: center;
  }

  button {
    margin: 5px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 1px dashed;
    background: transparent;
    cursor: pointer;
    text-align: center;
    padding-right: 5px;
    padding-bottom: 4px;
  }
</style>
