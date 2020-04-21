<template>
  <div class="home">
    <app-bar>
      <template #centerBar>
        我是子标题
      </template>
    </app-bar>
    <img alt="Vue logo" src="../assets/logo.png">
    <i class="iconfont icon-message"></i>
    <svg-icon icon-class="loading" />
    <nav-bar></nav-bar>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  }
}
</script>
