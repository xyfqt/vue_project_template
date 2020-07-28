<template>
  <div class="gift-goods">
    <div class="goods-top">
      <img src="../../assets/image/logo136.jpg" alt />
      <div class="top-center">
        <div>粉贝</div>
        <div>
          邀请码 {{$route.query.code}}
          <i @click="copy">复制</i>
        </div>
      </div>
      <div class="top-download" @click="download()">立即下载</div>
    </div>
    <div class="goods-content">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item,index) in goodsInfo.picList" :key="index">
          <div class="img-wrap">
            <van-image :src="item" width="100%" height="100%">
              <template v-slot:error>暂无图片</template>
            </van-image>
          </div>
        </van-swipe-item>
      </van-swipe>

      <div class="goods-info">
        <div>
          <em class="price">￥{{goodsInfo.price}}</em>
          <em class="line-price">￥{{goodsInfo.markingPrice}}</em>
        </div>
        <span>销量:{{goodsInfo.volume}}</span>
      </div>
      <div class="goods-title">{{goodsInfo.name}}</div>
      <div class="how-buy">
        <h1>如何购买</h1>
        <span>
          下载【粉贝APP】->打开首页->VIP礼包专区，
          <br />即可找到此商品->进入详情可查看购买。
        </span>
      </div>
    </div>
    <div class="regist" @click="regist">注册粉贝，立即省钱</div>
  </div>
</template>

<script>
import clipboard from "@/utils/clipboard";
import goodsApi from "@/api/goods";
import { Toast } from "vant";

export default {
  name: "GiftGoods",
  data() {
    return {
      goodsInfo: ""
    };
  },
  created() {
    goodsApi.giftDetail({ id: this.$route.query.goodsId }).then(res => {
      if (res.code == 1) {
        this.goodsInfo = res.data;
      } else {
        Toast(res.info);
      }
    });
  },
  methods: {
    copy(event) {
      clipboard(this.$route.query.code, event);
    },
    download(){
      window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.zyq.goodsharing";
    },
    regist() {
      window.location.href =
        "https://m.fenbeilife.com/wb/#/register/" +
        this.$route.query.code;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/style.scss";

.gift-goods {
  width: 100%;
  height: 100vh;
  background: #fff;
  overflow-y: auto;

  .goods-top {
    width: 100%;
    height: px2rem(130);
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: px2rem(20);
    box-sizing: border-box;
    background: #fff;

    img {
      width: px2rem(90);
      height: px2rem(90);
      border-radius: px2rem(15);
    }

    .top-center {
      display: flex;
      flex-direction: column;
      font-size: px2rem(32);
      flex: 1;
      margin-left: px2rem(20);

      div:nth-child(2) {
        color: #606266;
        font-size: px2rem(28);
        display: flex;

        i {
          width: px2rem(90);
          height: px2rem(40);
          border-radius: px2rem(25);
          border: 1px solid #ff5086;
          color: #ff5086;
          font-style: normal;
          font-size: px2rem(28);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: px2rem(10);
        }
      }
    }

    .top-download {
      width: px2rem(200);
      height: px2rem(78);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background-image: linear-gradient(
        90deg,
        #ff549a 0%,
        #ff4d76 100%,
        #ff4d76 100%
      );
      border-radius: px2rem(46);
      font-size: px2rem(32);
    }
  }

  .goods-content {
    width: 100%;
    padding-top: px2rem(130);
    font-size: 0;

    .my-swipe .van-swipe-item {
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      background-color: #39a9ed;
    }

    .img-wrap {
      min-width: 100%;
      height: px2rem(620);
      background: #f6f6f6;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .goods-info {
      width: 100%;
      height: px2rem(114);
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #909399;
      padding: px2rem(20);
      box-sizing: border-box;
      font-size: px2rem(24);

      em {
        font-style: normal;
      }

      em:first-child {
        font-size: px2rem(44);
        color: #e04335;
        font-weight: bold;
      }

      em:nth-child(2) {
        margin-left: px2rem(30);
        text-decoration: line-through;
      }

      span {
        position: relative;
        top: px2rem(6);
      }
    }

    .goods-title {
      font-size: px2rem(28);
      color: #16171c;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      padding: 0 px2rem(20);
      box-sizing: border-box;
      font-weight: bold;
    }

    .how-buy {
      background: #f6f6f6;
      border-radius: px2rem(16);
      margin: px2rem(60) px2rem(20) px2rem(124) px2rem(20);
      width: calc(100% - 0.533333rem);
      height: px2rem(280);
      text-align: center;
      padding-top: px2rem(50);
      box-sizing: border-box;

      h1 {
        font-size: px2rem(36);
        color: #16171c;
        margin-top: 0;
      }

      span {
        font-size: px2rem(28);
        color: #606266;
        line-height: 1.5;
      }
    }
  }

  .regist {
    width: 100%;
    height: px2rem(92);
    position: fixed;
    bottom: 0;
    background-image: linear-gradient(180deg, #ff549a 0%, #ff4d76 97%);
    color: #fff;
    font-size: px2rem(34);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
