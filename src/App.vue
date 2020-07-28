<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name:"App",
    created() {
      // document.body.addEventListener("touchmove",function (e) {
      //   e.preventDefault();
      // },{passive: false})
      // document.documentElement.addEventListener("touchmove",function (e) {
      //   e.preventDefault();
      // },{passive: false})
    }
  }
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
