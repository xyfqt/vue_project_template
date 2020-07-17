<template>
  <div class="home app-container">
    <app-bar>
      <template #centerBar>我是子标题</template>
    </app-bar>
    <nav-tabs>
      <template #1>
        <div class="one">
          <van-button @click="playVideo">看视频</van-button>
        </div>
      </template>
      <template #2>
        <svg-icon icon-class="loading" />
        <i class="iconfont icon-message"></i>
      </template>
    </nav-tabs>
  </div>
</template>

<script>
import NavTabs from "@/components/NavTabs.vue";
import axios from "axios";
import { Toast } from "vant";

export default {
  name: "Home",
  components: {
    NavTabs
  },
  data() {
    return {};
  },
  created() {

  },
  methods: {
    playVideo() {
        this.$router.push("/sdfsdf")
    },

  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/style.scss";
.home {
  overflow-y: hidden;
  img {
    width: px2rem(120);
    height: px2rem(120);
  }
  .test-bg {
    width: px2rem(120);
    height: px2rem(120);
    background-image: image-set(
      "./../assets/image/dark.png" 1x,
      "./../assets/image/sun.png" 2x,
      "./../assets/logo.png" 3x
    );
    background-size: cover;
  }
}
</style>
