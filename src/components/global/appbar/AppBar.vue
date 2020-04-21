<template>
  <div class="app-bar">
    <div class="app-bar_wrap">
      <slot name="leftBar">
        <div class="app-bar_left app-bar_btn">左</div>
      </slot>
      <slot name="centerBar">
        <div class="app-bar_center" :params="'test'">标题</div>
      </slot>
      <slot name="rightBar">
        <div class="app-bar_right app-bar_btn">右边</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppBar"
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/style.scss";

.app-bar {
  width: 100%;
  min-height: px2rem(160);
  background: #e7e7e7;
  .app-bar_wrap {
    position: fixed;
    width: 100%;
    min-height: px2rem(160);
    background: #e7e7e7;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .app-bar_btn{
        width: px2rem(240);
        height: 100%; 
        display: flex;
        justify-content: center;
        align-items: center;
    }
  }
}
</style>