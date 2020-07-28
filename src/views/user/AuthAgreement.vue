<template>
  <div class="agree">
    <h1>授权说明</h1>
    <div class="desc">
      <span>粉贝官方素材库</span><span>2019-12-19 18:29</span>
    </div>
    <div class="content">
      淘宝官方为规范市场推广行为，促进行业健康发展，提升平台对用户的精细化运营管理，用户必须完成淘客账户授权才可获得推广佣金。
    </div>
    <div class="content">一、如何完成认证？</div>
    <div class="content">
      1、商品领券页面<br />
      在商品分享页面，点击【立即领券】、【分享】、【领券购买】这三处，都会收到系统提示，需要完成授权才可以进行以上操作哦。
    </div>
    <div class="content">
      2、个人页面<br />
      在淘客APP--》我的--》提现处，点击提现，系统会提示需要完成授权。<br />
      也就是说，不完成授权将无法正常使用提现功能哦~
    </div>
    <div class="content">二、解疑答惑</div>
    <div class="content">
      1、什么是授权为什么要授权<br />
      答：小伙伴在淘宝都有一个专属的PID，但是淘宝并不知道此 id 是谁，平时拉取各自的订单就是用的这个
      id拉取的，作为订单跟踪使用的。
    </div>
    <div class="content">
      现在授权的过程，其实就是你的专属 pid
      在淘宝实名的一个过程，实名认证的方式是通过绑定已经实名的淘宝账号，授权成功后，分享推广的佣金都不受影响。
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "@/assets/css/style.scss";

  .agree {
    width: 100%;
    height: 100vh;
    background: #fff;
    overflow-y: auto;
    padding: 12px;
    box-sizing: border-box;
    line-height: 1.6;
    font-size: 15px;
    h1{
      font-size: px2rem(40);
      word-break: break-all;
      /*width: 100%;*/
    }
    .desc{
      font-size: px2rem(22);
      color: #909399 ;
      span:first-child{
        color: #338cff;
        margin-right: px2rem(16);
      }
    }
    p {
      line-height: 1.6 !important;
    }
  }
</style>
