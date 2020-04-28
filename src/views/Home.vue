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
            <source srcset="http://b-ssl.duitang.com/uploads/item/201901/09/20190109072726_aNNZd.thumb.700_0.jpeg" media="(max-width: 375px)">
            <!--[if IE 9]></video><![endif]-->
            <img srcset="http://b-ssl.duitang.com/uploads/item/201501/30/20150130155445_tTJFE.thumb.224_0.jpeg" alt="My default image">
          </picture>
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
  }
</style>
