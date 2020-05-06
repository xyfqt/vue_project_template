<template>
  <div class="app-container">
    <img src="./../assets/image/500.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'Error',
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/css/style.scss';
  .app-container{
    display: flex;
    background: #fff;
    img {
      margin: auto;
      margin-top: 20vh;
      width: 100%;
      max-width: 500px;
    }
  }
</style>
