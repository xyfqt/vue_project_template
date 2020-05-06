<template>
  <div class="home app-container">
    <app-bar>
      <template #centerBar>
        我是子标题
      </template>
    </app-bar>
    <nav-tabs>
      <template #1>
        <div class="one">
          <picture>
            <source srcset="./../assets/image/dark.png" media="(prefers-color-scheme:dark)">
            <img src="./../assets/image/sun.png">
          </picture>
          <picture>
            <!--[if IE 9]><video style="display: none;"><![endif]-->
            <source srcset="./../assets/image/dark.png" media="(max-width: 375px)">
            <!--[if IE 9]></video><![endif]-->
            <img srcset="./../assets/image/sun.png" alt="My default image">
          </picture>

          <img src="./../assets/image/dark.png" srcset="./../assets/image/dark.png 1x,./../assets/image/sun.png 2x,./../assets/logo.png 3x" alt="photo" />

          <div class="test-bg"></div>

        </div>

      </template>
      <template #2>
        <svg-icon icon-class="loading"/>
        <i class="iconfont icon-message"></i>
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
  @import '@/assets/css/style.scss';
  .home {
    overflow-y: hidden;
     img {
      width: px2rem(120);
      height: px2rem(120);
    }
    .test-bg{
      width: px2rem(120);
      height: px2rem(120);
      background-image: image-set("./../assets/image/dark.png" 1x,
        "./../assets/image/sun.png" 2x,
        "./../assets/logo.png" 3x);
      background-size: cover;
    }
  }
</style>
