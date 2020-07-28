<template>
  <div class="app-container" :class="containerClass">
    <div class="test"></div>
    <div class="test">
      <div
        class="af"
      >dfassdfdffdfassdfdfafdfassdfd11232121dfassdfdfassdfdfaassdfdfassdf</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      containerClass: "",
    };
  },
  created() {
    var u = navigator.userAgent;
    if (u.indexOf("Safari") != -1) {
      this.containerClass = "safari-class";
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/style.scss";
.app-container {
    overflow: scroll;
    background: green;
    position: absolute;
    bottom: 0;
  .test {
    width: 200px;
    height: 200vh;
    background: red;
    position: relative;
    &:nth-child(2) {
      background: yellow;
    }
    .af {
      width: 200px;
    //   height: 30px;
      position: absolute;
      bottom: 0;
      word-break: break-all;
    }
  }
}
</style>