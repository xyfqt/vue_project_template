<template>
  <div class="message-detail info-rich-content" v-html="result">
  </div>
</template>

<script>
  export default {
    name: "MessageDetail",
    data() {
      return {
        result:""
      };
    },
    created() {
      window.messageDetailToFenBei = this.messageDetailToFenBei;
    },
    methods:{
      messageDetailToFenBei(data) {
        this.result = data.content;
        return 'success';
      }
    },
    destroyed() {
      window.messageDetailToFenBei = null;
    }
  };
</script>
<style lang="scss" scoped>
  @import "@/assets/css/style.scss";

  .message-detail{
    width: 100%;
    height: 100vh;
    background: #fff;
    overflow-y: auto;
    padding: px2rem(12);
    box-sizing: border-box;
    font-size: px2rem(32);
  }
</style>

<style>
.info-rich-content img {
  width: 100%;
  height: auto;
}

.info-rich-content video {
  width: 100%;
  height: auto;
}
</style>

