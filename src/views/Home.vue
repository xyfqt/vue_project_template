<template>
  <div class="home">
    <app-bar>
      <template #centerBar>
        我是子标题
      </template>
    </app-bar>
    <nav-bar>
      <template #1>
        <svg-icon icon-class="loading" />
        <i class="iconfont icon-message"></i>
      </template>
      <template #2>
        <img alt="Vue logo" src="../assets/logo.png">
      </template>
    </nav-bar>
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
