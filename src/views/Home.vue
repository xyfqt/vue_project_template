<template>
  <div class="home">
    <app-bar>
      <template #centerBar>
        我是子标题
      </template>
    </app-bar>
    <nav-tabs>
      <template #1>
        <svg-icon icon-class="loading" />
        <i class="iconfont icon-message"></i>
      </template>
      <template #2>
        <img alt="Vue logo" src="../assets/logo.png">
      </template>
    </nav-tabs>
  </div>
</template>

<script>
import NavTabs from "@/components/NavTabs.vue"

export default {
  name: 'Home',
  components: {
    NavTabs
  }
}
</script>

<style lang="scss" scoped>
  .home{
    width: 100%;
    height: 100vh;
    overflow-y: hidden;
  }
</style>
