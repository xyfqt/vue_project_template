<template>
  <div class="zero-goods-container app-container" >
    <div class="zero-goods-wrap">
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished-text="finishText"
        @load="onLoad"
      >
        <ul>
          <li class="active-rule" @click="showRule()">活动规则</li>
          <li v-for="item in list" :key="item.productId">
            <div class="img-wrap">
              <img class="new-pepole" style="z-index: 100" src="@/assets/image/newpepole.png" alt="">
              <van-image class="goods-img" :src="item.pictUrl">
                <template v-slot:loading>
                  <!--                  <van-loading type="spinner" size="20" />-->
                  <img class="goods-img" src="@/assets/image/default.png" alt="">
                </template>
                <template v-slot:error>加载失败</template>
              </van-image>
            </div>
            <div class="goods-des">
              <div class="title">
                <h2>{{item.name}}</h2>
                <div><i v-show="item.couponAmount"><span>{{item.couponAmount | filterPrice}}元券</span></i><i><span>补贴{{item.subsidiesUser | filterPrice}}元</span></i>
                </div>
              </div>
              <div class="price">
                <div class="new">新人价￥<i>0</i></div>
                <div class="btn">
                  <i>￥{{item.zkFinalPrice | filterPrice}}</i>
                  <span @click="panicBuying(item.productId)">去抢购</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="empty-img" v-show="emptyImg">
          <img src="@/assets/image/empty@2x.png" alt="">
          <span>活动太火爆，被抢光了</span>
        </div>
        <div class="share-btn" v-show="finished" @click="sharePoster()">
          分享给朋友0元福利
        </div>
      </van-list>
    </div>
    <van-dialog v-model="showDialog" :title="dialogTitle" :message="dialogMessage"
                :class="!confirmButton ? 'rule-dialog' : '' "
                :show-confirm-button="confirmButton"
                :confirm-button-text="confirmText"
                @confirm="confirmDialog()">
    </van-dialog>
    <van-icon class="close-icon" :class="!confirmButton ? 'rule-close' : '' " v-show="showClose" name="close"
              @click="closeDialog()"/>
  </div>
</template>

<script>
  import goodsApi from "@/api/goods";
  import StringUtils from "@/utils/StringUtils";
  import {Dialog,Toast} from 'vant'
  import rule from './zero-rule'

  export default {
    name: "ZeroGoods",
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        currentPage: 1,
        finishText: '暂无商品',
        showDialog: false,
        showClose: false,
        dialogMessage: "",
        dialogTitle: "",
        confirmText: "",
        condition: null,
        confirmButton: true,
        emptyImg:false,
        error:false,
      }
    },
    methods: {
      onLoad() {
        setTimeout(() => {
          // console.log(this.currentPage)
          goodsApi.zeroGoods({pageNo: this.currentPage, pageSize: 20}).then(res => {
            if (res && res.code == 1) {
              this.loading = false;
              this.currentPage++;
              this.list = this.list.concat(res.data.list);
            }else {
              this.loading = false;
              this.error = true;
            }
            if (res.data.list.length == 0) {
              this.finished = true;
              this.finishText = '已经到底了'
            }
            if(!this.list.length){
              this.emptyImg = true;
              this.finishText = ''
            }
          }).catch(e => {
            this.loading = false;
            this.error = true;
          })
        }, 300)
      },
      touchStop(){},
      async panicBuying(id) {
        //站外
        if(typeof pinkShell == 'undefined' && !(window.webkit && window.webkit.messageHandlers.loadLearnState)){
            this.$router.push(`/register/fenbei`)
            return
        }
        //旧版本
        if(window.webkit){
          if(!window.webkit.messageHandlers.callUserLogin){
            Toast("请升级最新版本")
            return
          }
        }else {
          if(pinkShell && !pinkShell.callUserLogin){
            Toast("请升级最新版本")
            return
          }
        }
        //未登录
        if (this.isNotLogin()) {
          this.loginTip();
          return
        }

        let condition = await goodsApi.queryZeroCondition({productId: id});
        if (condition.code != 1 && condition.code != 20003) {
          if (condition.code == 60002) {
            this.showClose = true;
          }
          this.showDialog = true;
          this.confirmButton = true;
          this.dialogTitle = "";
          this.dialogMessage = condition.info;
          this.confirmText = condition.code == 60002 ? "立即分享" : "确认";
          this.condition = condition;
          return;
        }
        if (window.webkit) {
          window.webkit.messageHandlers.goGoodsDetai.postMessage(id.toString());
        } else {
          pinkShell.goGoodsDetai(id.toString());
        }
      },
      confirmDialog() {
        if (this.condition.code == 60002) {
          this.sharePoster();
        } else if (this.condition.code == 20002) {
          if (window.webkit) {
            window.webkit.messageHandlers.callUserLogin.postMessage("");
          } else {
            pinkShell.callUserLogin();
          }
        }
        this.condition = null;
        this.showClose = false;
      },
      showRule() {
        this.confirmButton = false;
        this.showDialog = true;
        this.dialogTitle = "活动规则";
        this.dialogMessage = rule.data;
        this.showClose = true;
      },
      closeDialog() {
        this.condition = null;
        this.showDialog = false;
        this.showClose = false;
      },
      sharePoster() {
        //站外
        if(typeof pinkShell == 'undefined' && !(window.webkit && window.webkit.messageHandlers.loadLearnState)){
          this.$router.push(`/register/fenbei`)
          return
        }
        //旧版本
        if(window.webkit){
          if(!window.webkit.messageHandlers.callUserLogin){
            Toast("请升级最新版本")
            return
          }
        }else {
          if(pinkShell && !pinkShell.callUserLogin){
            Toast("请升级最新版本")
            return
          }
        }
        //未登录
        if (this.isNotLogin()) {
          this.loginTip();
          return
        }
        let data = JSON.stringify({data: this.list.slice(0, 4)})
        if (window.webkit) {
          window.webkit.messageHandlers.showPoster.postMessage(data);
        } else {
          pinkShell.showPoster(data);
        }
      },
      loginTip() {
        Dialog.confirm({
          message: '您还未登录，请先登录',
          confirmButtonText: "去登录"
        })
          .then(() => {
            if (window.webkit) {
              window.webkit.messageHandlers.callUserLogin.postMessage("");
            } else {
              pinkShell.callUserLogin();
            }
          })
          .catch(() => {
          });
      },
      isNotLogin() {
        let userInfo = localStorage.getItem("userInfo");
        if (StringUtils.isEmpty(userInfo)) {
          return true;
        } else {
          try {
            userInfo = JSON.parse(userInfo)
            return StringUtils.isEmpty(userInfo.token);
          } catch (e) {
            return true;
          }
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/style.scss";

  .zero-goods-container {
    background-color: #6f0410;
    overflow: hidden;
    .zero-goods-wrap {
      width: 100%;
      /*height: calc(100vh - env(safe-area-inset-bottom));*/
      height: 100%;
      overflow-y: scroll;
      position: relative;

      .active-rule {
        width: px2rem(140);
        height: px2rem(60);
        border-radius: px2rem(30);
        font-size: px2rem(24);
        color: #fff;
        position: absolute;
        top: px2rem(12);
        right: px2rem(30);
        background: rgba(84, 0, 10, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      ul {
        width: 100%;
        padding: 0 px2rem(20);
        padding-top: px2rem(935);
        background: url("../../assets/image/zerobg.png") no-repeat;
        background-size: contain;
        box-sizing: border-box;

        li {
          width: 100%;
          height: px2rem(260);
          border-radius: px2rem(16);
          background: #fff;
          padding: px2rem(20);
          margin-bottom: px2rem(20);
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;

          .img-wrap {
            width: px2rem(220);
            height: px2rem(220);
            background: #e7e7e7;
            border-radius: px2rem(16);
            position: relative;

            .goods-img, ::v-deep .goods-img img {
              width: 100%;
              height: 100%;
              border-radius: px2rem(16);
            }

            .new-pepole {
              position: absolute;
              top: 0;
              left: 0;
              width: px2rem(50);
              height: px2rem(50);
            }
          }

          .goods-des {
            flex: 1;
            margin-left: px2rem(20);
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .title {
              font-size: px2rem(28);

              h2 {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                font-size: px2rem(28);
                width: 100%;
              }

              div {
                display: flex;
                i {
                  min-width: px2rem(100);
                  height: px2rem(32);
                  font-size: px2rem(22);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-style: normal;
                  margin-top: px2rem(12);
                  color: #fff;
                  padding: 0 px2rem(5);

                  /*span {*/
                  /*  transform: scale(0.93);*/
                  /*}*/

                  &:first-child {
                    background: url("../../assets/image/quanred@2x.png");
                    background-size: 100% 100%;
                    margin-right: px2rem(10);
                  }

                  &:nth-child(2) {
                    min-width: px2rem(116);
                    background: url("../../assets/image/icon-quanye@2x.png");
                    background-size: 100% 100%;
                    color: #8C5F3C;
                  }
                }
              }
            }

            .price {
              display: flex;
              flex-direction: column;
              justify-content: flex-end;

              .new {
                font-size: px2rem(24);
                color: #E04335;
                vertical-align: bottom;
                line-height: 0.7;

                i {
                  font-style: normal;
                  font-size: px2rem(36);
                }
              }

              .btn {
                display: flex;
                justify-content: space-between;
                align-items: center;

                i {
                  font-size: px2rem(24);
                  font-style: normal;
                  color: #909399;
                  text-decoration: line-through;
                }

                span {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-image: linear-gradient(90deg, #FF549A 0%, #FF4D76 100%, #FF4D76 100%);
                  border-radius: px2rem(40);
                  width: px2rem(120);
                  height: px2rem(52);
                  font-size: px2rem(28);
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .empty-img{
        font-size: px2rem(24);
        color: #fff;
        display: flex;
        flex-direction: column;
        height: px2rem(360);
        justify-content: space-around;
        align-items: center;
        img{
          width: px2rem(246);
          height: px2rem(164);
        }
      }

      .share-btn {
        margin: 0 px2rem(20);
        height: px2rem(88);
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: linear-gradient(180deg, #FFEFC1 0%, #FFD59E 100%);
        border-radius: px2rem(44);
        font-size: px2rem(32);
        color: #6A000C;
        font-weight: bold;

        &:active {
          background: #ffecd3;
        }
      }
    }

    .close-icon {
      position: fixed;
      top: 63%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      z-index: 1000000;
      font-size: px2rem(50);
      &.rule-close {
        top: 92%;
      }
    }

    .rule-dialog {
      ::v-deep .van-dialog__header {
        padding: 12px 0;
      }

      ::v-deep .van-dialog__content {
        padding-bottom: 16px;
      }

      ::v-deep .van-dialog__message {
        max-height: 63vh;
        text-align: left;
        display: flex;
        flex-direction: column;

        p {
          margin: 8px 0;
        }
      }
    }
  }

</style>
