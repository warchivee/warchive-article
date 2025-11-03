<script>
  import userUtil from "../utils/user.util";

  const isLoggedIn = userUtil.exist();
</script>

<a
  href={isLoggedIn
    ? "https://www.womynarchive.com"
    : "https://www.womynarchive.com/login"}
>
  {isLoggedIn ? "Logout" : "Login"}
</a>

<style>
  a {
    text-decoration: none;
  }
</style>
