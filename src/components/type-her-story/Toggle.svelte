<script>
  let isToggled = false;

  function toggleButton(event) {
    const isToggled = event.target.checked;
    console.log(`Toggle 상태: ${isToggled}`);
  }
</script>

<div class="toggle-container">
  <span class="label {isToggled ? '' : 'bold'}">가</span>
  <label class="toggle-switch">
    <input type="checkbox" bind:checked={isToggled} />
    <span class="slider"></span>
  </label>
  <span class="label {isToggled ? 'bold' : ''}">Aa</span>
</div>

<style>
  .toggle-container {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 14px;
    color: #c7c7c7;
    margin-right: 20px;
  }

  .label {
    transition: font-weight 0.3s;
  }

  .label:last-child {
    font-family: var(--font-highlight);
  }

  .label.bold {
    color: black;
  }

  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 45px;
    height: 18px;
    margin: 0 8px;
  }

  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #c7c7c7;
    border-radius: 10px;
    transition: background-color 0.3s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: #000;
    border-radius: 20px;
    transition: transform 0.3s;
  }

  input:checked + .slider {
    background-color: #ccc;
  }

  input:checked + .slider:before {
    transform: translateX(20px);
  }
</style>
