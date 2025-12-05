<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import html2canvas from "html2canvas";

  let isLoading = false;

  async function downloadImage() {
    const imageDataUrl = await capturePreview();

    const link = document.createElement("a");
    link.download = "receipt-her-story.png";
    link.href = imageDataUrl;
    link.click();
  }

  async function shareTwitter() {
    isLoading = true;
    try {
      let image = await capturePreview();
      const imgUrl = await uploadImage(image);

      window.open(
        `https://twitter.com/intent/tweet?text=나의 여성서사 영수증&hashtags=와카이브,여성서사,ReceiptHerStory&url=${imgUrl}`
      );
    } catch (e) {
      console.error(e);
    } finally {
      isLoading = false;
    }
  }

  async function shareKakao() {
    isLoading = true;
    try {
      let image = await capturePreview();
      const url = await uploadImage(image);

      await Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "Receipt Her Story - Warchive",
          description: `나의 여성서사 영수증`,
          imageUrl: `${url}`,
          link: {
            mobileWebUrl: `${window.location.href}`,
            webUrl: `${window.location.href}`,
          },
        },
        buttons: [
          {
            title: "자세히 보기",
            link: {
              mobileWebUrl: `${window.location.href}`,
              webUrl: `${window.location.href}`,
            },
          },
        ],
      });
    } catch (e) {
      console.error(e);
    } finally {
      isLoading = false;
    }
  }

  async function capturePreview() {
    const element = document.getElementById("receiptHerStory");
    if (!element) return;

    element.classList.add("image-saved");

    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
    });
    const imageDataUrl = canvas.toDataURL("image/jpeg");

    element.classList.remove("image-saved");

    return imageDataUrl;
  }

  async function uploadImage(image) {
    const formData = new FormData();

    formData.append("image", image?.replace("data:image/jpeg;base64,", ""));

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.PUBLIC_IMGBB_API_KEY}`,
      formData,
      {
        headers: {
          "Content-Type": "form-data",
        },
      }
    );

    //delete_url, url
    return response?.data?.data?.url;
  }

  onMount(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(import.meta.env.PUBLIC_KAKAO_KEY);
    }

    return () => {};
  });
</script>

{#if isLoading}
  <div class="loading"></div>
{/if}

<section>
  <button on:click={downloadImage}><i class="fa-solid fa-download"></i></button>
  <button on:click={shareTwitter}><i class="fa-brands fa-x-twitter"></i></button
  >
  <button on:click={shareKakao}><i class="fa-solid fa-comment"></i></button>
</section>

<style>
  .loading {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
    opacity: 0.5;
    top: 0;
    left: 0;
  }
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
