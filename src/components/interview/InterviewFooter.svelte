<script>
  const today = new Date();
</script>

<footer>
  <hgroup>
    <h5>여성서사 아카이브 프로젝트 Warchive</h5>
    <h5>
      Copyright &copy; {today.getFullYear()} Warchive. All rights reserved.
    </h5>
  </hgroup>
</footer>

<style>
  footer {
    margin: 3rem 0 0 0;
    padding: 1em 1em 1em 1em;
    border-top: 5px solid var(--color-header);
  }

  hgroup {
    margin: 0 auto;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h5 {
    color: var(--color-header);
  }

  @media (max-width: 750px) {
    hgroup {
      justify-content: center;
    }
    hgroup > h5:first-child {
      display: none;
    }
  }
</style>
