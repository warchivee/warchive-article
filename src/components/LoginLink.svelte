<script>
  import { onMount } from "svelte";
  import { reissueToken } from "../utils/api.util.ts";
  import userUtil from "../utils/user.util";

  function logout() {
    userUtil.remove();
    window.location.href = "/";
  }

  onMount(async () => {
    if (userUtil.exist()) return;

    try {
      await reissueToken();
    } catch (error) {
      console.error("토큰 재발급 실패:", error);
    }
  });
</script>

{#if userUtil.exist()}
  <div on:click={logout}>Logout</div>
{:else}
  <a
    href={`${import.meta.env.PUBLIC_LOGIN_URL}?rd=${import.meta.env.PUBLIC_LOGIN_RECIRECT_URL}`}
  >
    Login
  </a>
{/if}

<style>
  a {
    text-decoration: none;
  }
</style>
