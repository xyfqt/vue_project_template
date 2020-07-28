<template>
  <div class="success">
    <img class="success-img" src="@/assets/image/register-success.png" />
    <div class="success-text">恭喜你，注册成功</div>
    <div class="success-tip">打开粉贝APP，开启自己的省钱赚钱之旅</div>
    <button class="download-app" @click="downLoad">下载粉贝</button>
  </div>
</template>

<script>
  export default {
    name: 'Success',
    components: {},
    props: {},
    data() {
      return {
        downloadUrl: '', //app下载地址
      }
    },
    methods: {
      //下载app
      downLoad() {
        window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.zyq.goodsharing";
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/style.scss";
  .success {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: px2rem(750);
    margin-top: px2rem(383);

    .success-img {
      width: px2rem(200);
      height: px2rem(200);
    }

    .success-text {
      margin: px2rem(40) 0 px2rem(20) 0;
      font-family: PingFangSC-Regular;
      font-size: px2rem(36);
      color: #16171c;
      letter-spacing: 0;
    }

    .success-tip {
      font-family: PingFangSC-Regular;
      font-size: px2rem(28);
      color: #16171c;
      letter-spacing: 0;
    }

    .download-app {
      display: flex;
      justify-content: center;
      align-items: center;
      width: px2rem(360);
      height: px2rem(92);
      margin-top: px2rem(93);
      padding: 0;
      border: none;
      outline: none;
      background-image: linear-gradient(90deg, #ff549a 0%, #ff4d76 100%, #ff4d76 100%);
      border-radius: px2rem(46);
      font-family: PingFangSC-Regular;
      font-size: px2rem(34);
      color: #ffffff;
      letter-spacing: 0;
    }
  }

</style>
