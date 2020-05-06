<template>
  <div class="app-container">
    <img src="./../assets/image/404.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'NotFound',
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
