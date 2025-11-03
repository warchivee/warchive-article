<script>
  import html2canvas from "html2canvas";

  function downloadImage() {
    const element = document.getElementById("receiptHerStory");
    if (!element) return;

    element.classList.add("image-saved");

    html2canvas(element, { useCORS: true, allowTaint: true })
      .then((canvas) => {
        const link = document.createElement("a");
        link.download = "receipt-her-story.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      })
      .finally(() => {
        element.classList.remove("image-saved");
      });
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
