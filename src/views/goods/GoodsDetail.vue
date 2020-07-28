<template>
  <div class="goods-detail">
    <div class="float-head">
      <div class="float-head-left">
        <img src="@/assets/image/logo-icon.png" />
        <div class="app-bd">
          <div class="app-name">粉贝</div>
          <div class="invitation-code">
            邀请码 {{ inviteCode }} <button class="copy-btn" @click="copy($event,inviteCode)">复制</button>
          </div>
        </div>
      </div>
      <button class="float-head-right" @click="downLoad">立即下载</button>
    </div>
    <van-swipe class="product-img" :autoplay="3000" indicator-color="white">
      <van-swipe-item
        v-for="(productPicItem, productPicIndex) in productInfo.smallImages"
        :key="'productPicItem' + productPicIndex"
      >
        <img class="product-img" :src="productPicItem" />
      </van-swipe-item>
    </van-swipe>
    <div class="product-price-bd">
      <div class="product-price-bd-left">
        <div class="product-price">¥{{ productInfo.price }}</div>
        <div class="post-bond-price">券后价</div>
        <del class="product-discount">¥{{ productInfo.zkFinalPrice }}</del>
      </div>
      <div class="product-price-bd-right">销量:{{ productInfo.volume }}</div>
    </div>
    <div class="coupon">
      <div class="coupon-item">{{ productInfo.couponAmount }}元券</div>
    </div>
    <div class="product-title"><span>淘宝</span>{{ productInfo.title }}</div>
    <div class="copy-bd">
      <button class="one-click-copy" @click="copy($event,word)">一键复制</button>
      <div class="product-code">({{ word }})</div>
      <div class="copy-tips">復至此条信息，({{ word }})，</div>
      <div class="copy-tips">去【tao寶】下单</div>
    </div>
    <button class="register-btn" @click="goRegister">注册粉贝，立即省钱</button>
  </div>
</template>

<script>
  import clipboard from "@/utils/clipboard";
  import goodsApi from "@/api/goods";
  import { Toast } from "vant";

  export default {
    name: 'GoodsDetail',
    data() {
      return {
        inviteCode: '', //邀请码
        word: '', //淘宝口令
        productInfo: {},
        downloadUrl: '', //app下载地址
      }
    },
    mounted() {
      if (this.$route.params.inviteCode != '') {
        this.inviteCode = this.$route.params.inviteCode
      }
      if (this.$route.params.id != '') {
        let options = {
          itemId: this.$route.params.id,
        }
        goodsApi.goodsDetail(options).then(res => {
          if (res.code == 1) {
            this.productInfo = res.data;
          } else {
            Toast(res.info);
          }
        })
        if (this.$route.params.word != '') {
          this.word = this.$route.params.word
        }
      }
    },
    methods: {
      //复制
      copy(event,value) {
        clipboard(value, event);
      },
      //跳转注册页
      goRegister() {
        this.$router.push('/register/' + this.inviteCode)
      },
      //下载app
      downLoad() {
        window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.zyq.goodsharing";
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/style.scss";
  .goods-detail {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    .float-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: fixed;
      top: 0;
      width: px2rem(750);
      height: px2rem(130);
      padding: 0 px2rem(20);
      box-sizing: border-box;
      background: #ffffff;
      z-index: 100;

      .float-head-left {
        display: flex;
        align-items: center;

        img {
          width: px2rem(90);
          height: px2rem(90);
        }

        .app-bd {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          margin-left: px2rem(20);

          .app-name {
            font-family: PingFangSC-Regular;
            font-size: px2rem(32);
            color: #16171c;
            letter-spacing: 0;
          }

          .invitation-code {
            font-family: PingFangSC-Regular;
            font-size: px2rem(28);
            color: #606266;

            .copy-btn {
              width: px2rem(90);
              height: px2rem(40);
              margin-left: px2rem(10);
              line-height: px2rem(20);
              padding: 0;
              border: none;
              outline: none;
              border: px2rem(1) solid #ff5086;
              border-radius: px2rem(25);
              background: #fff;
              font-family: PingFangSC-Regular;
              color: #ff5086;
            }
          }
        }
      }

      .float-head-right {
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        width: px2rem(200);
        height: px2rem(78);
        margin: 0;
        padding: 0;
        font-family: PingFangSC-Regular;
        font-size: px2rem(32);
        color: #ffffff;
        background-image: linear-gradient(90deg, #ff549a 0%, #ff4d76 100%, #ff4d76 100%);
        border: none;
        outline: none;
        border-radius: px2rem(46);
      }
    }

    .product-img {
      display: block;
      width: px2rem(750);
      height: px2rem(750);
    }

    .product-price-bd {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: px2rem(710);
      height: px2rem(62);
      margin: px2rem(20) px2rem(20) px2rem(12) px2rem(20);

      .product-price-bd-left {
        display: flex;
        align-items: baseline;

        .product-price {
          height: px2rem(62);
          padding: 0 px2rem(10);
          font-family: PingFangSC-Medium;
          font-size: px2rem(44);
          color: #e04335;
          text-align: center;
        }

        .post-bond-price {
          margin-right: px2rem(20);
          font-family: PingFangSC-Regular;
          font-size: px2rem(24);
          color: #ff5086;
        }

        .product-discount {
          font-family: PingFangSC-Regular;
          font-size: px2rem(24);
          color: #909399;
        }
      }
      .product-price-bd-right {
        font-family: PingFangSC-Regular;
        font-size: px2rem(24);
        color: #909399;
      }
    }

    .coupon {
      display: flex;
      margin: 0 px2rem(20) px2rem(32) px2rem(20);

      .coupon-item {
        display: flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        // width: 1rem;
        height: px2rem(32);
        padding: 0 px2rem(11);
        font-family: PingFangSC-Medium;
        font-size: px2rem(20);
        color: #ffffff;
        background: url('../../assets/image/price-bg.png');
        background-size: 100%;
      }
    }

    .product-title {
      width: px2rem(710);
      height: px2rem(80);
      margin: 0 px2rem(20) px2rem(20) px2rem(20);
      font-family: PingFangSC-Medium;
      font-size: px2rem(28);
      color: #16171c;
      text-align: left;

      span {
        padding: 0 px2rem(5);
        margin-right: px2rem(20);
        background: #ffe9e9;
        font-family: PingFangSC-Regular;
        font-size: px2rem(20);
        color: #e04335;
      }
    }

    .copy-bd {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: px2rem(710);
      height: px2rem(280);
      margin: px2rem(20) px2rem(20) px2rem(32) px2rem(20);
      background: #f6f6f6;
      border-radius: px2rem(16);

      .one-click-copy {
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        width: px2rem(200);
        height: px2rem(60);
        margin: px2rem(34) 0 px2rem(26) 0;
        padding: 0;
        background-image: linear-gradient(180deg, #ff549a 0%, #ff4d76 97%);
        border-radius: px2rem(46);
        border: none;
        outline: none;
        font-family: PingFangSC-Regular;
        font-size: px2rem(32);
        color: #ffffff;
      }

      .product-code {
        margin-bottom: px2rem(9);
        font-family: PingFangSC-Medium;
        font-size: px2rem(36);
        color: #16171c;
      }

      .copy-tips {
        // width: 4.3rem;
        // height: 80px;
        font-family: PingFangSC-Regular;
        font-size: px2rem(28);
        color: #606266;
      }
    }

    .register-btn {
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -webkit-justify-content: center;
      align-items: center;
      -webkit-align-items: center;
      width: px2rem(750);
      height: px2rem(92);
      margin: 0;
      padding: 0;
      background-image: linear-gradient(180deg, #ff549a 0%, #ff4d76 97%);
      font-family: PingFangSC-Regular;
      font-size: px2rem(34);
      color: #ffffff;
      border: none;
      outline: none;
    }
  }
</style>
