<template>
  <div class="message">
    Couln't find this track on {{service}}.
  </div>
</template>

<script>
  export default {
    props: ['service']
  }
</script>

<style lang="scss" scoped>
  .message {
    background-color: #eee;
    color: black;
    padding: 1rem;
    font-size: .8rem;
  }
</style>
