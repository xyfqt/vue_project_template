<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: Microsoft YaHei;
}
</style>
