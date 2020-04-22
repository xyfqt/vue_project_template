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
    <nav-bar>
      <template #1>
        1
      </template>
      <template #2>
        2
      </template>
      <template #3>
        3
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
