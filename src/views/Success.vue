<template>
  <div class="wrap">
    <div class="icon-wrap">
      <svg
        t="1584344138928"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2903"
        v-if="wait"
      >
        <path
          d="M511.44 22.95c-270.4 0-489.6 218.88-489.6 488.89 0 174.66 93.32 336.05 244.8 423.39 151.49 87.33 338.12 87.33 489.6 0 151.49-87.33 244.8-248.72 244.8-423.39 0.01-270-219.2-488.89-489.6-488.89z m0 760.5c-30.04 0-54.4-24.32-54.4-54.32 0-19.4 10.37-37.34 27.2-47.04 16.83-9.7 37.57-9.7 54.4 0s27.2 27.64 27.2 47.04c0 29.99-24.35 54.32-54.4 54.32z m54.4-217.29c0 32.59-21.76 54.32-54.4 54.32s-54.4-21.73-54.4-54.32v-271.6c0-32.59 21.76-54.32 54.4-54.32s54.4 21.73 54.4 54.32v271.6z"
          p-id="2904"
          fill="#8a8a8a"
        />
      </svg>

      <svg
        t="1584338159304"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3672"
        v-if="success && !wait"
      >
        <path
          d="M512 1024a512 512 0 1 1 0-1024 512 512 0 0 1 0 1024z m-71.318588-361.411765a29.334588 29.334588 0 0 0 20.48-8.252235L774.625882 349.364706a27.708235 27.708235 0 0 0 0-39.936 29.575529 29.575529 0 0 0-41.08047 0l-292.74353 284.912941L290.454588 448.150588a29.575529 29.575529 0 0 0-41.08047 0 27.708235 27.708235 0 0 0 0 39.996236l170.706823 166.128941a29.274353 29.274353 0 0 0 20.540235 8.252235z"
          fill="#33A954"
          p-id="3673"
        />
      </svg>

      <svg
        t="1584338097678"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2814"
        v-else-if="!success && !wait"
      >
        <path
          d="M511.44 22.95c-270.4 0-489.6 218.88-489.6 488.89 0 174.66 93.32 336.05 244.8 423.39 151.49 87.33 338.12 87.33 489.6 0 151.49-87.33 244.8-248.72 244.8-423.39 0.01-270-219.2-488.89-489.6-488.89z m0 760.5c-30.04 0-54.4-24.32-54.4-54.32 0-19.4 10.37-37.34 27.2-47.04 16.83-9.7 37.57-9.7 54.4 0s27.2 27.64 27.2 47.04c0 29.99-24.35 54.32-54.4 54.32z m54.4-217.29c0 32.59-21.76 54.32-54.4 54.32s-54.4-21.73-54.4-54.32v-271.6c0-32.59 21.76-54.32 54.4-54.32s54.4 21.73 54.4 54.32v271.6z"
          p-id="2815"
          fill="#FF4E4A"
        />
      </svg>
    </div>
    <span v-if="wait">支付中...</span>
    <span v-else>{{success ? '支付成功' : '请确认微信是否已完成支付'}}</span>
    <div class="btn-area" v-if="!wait">
      <div class="btn success" @click="getResult()">已完成支付</div>
      <div class="btn fail" v-if="!success" @click="repay()">支付遇到问题？重新支付</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Success",
  data() {
    return {
      wait: true,
      success: false,
      result: ""
    };
  },
  created() {
    this.queryOrder();
    var that = this;
    window.refreshMWebPage = function() {
      that.queryOrder();
    };
    // 安卓主动关闭调用的方法
    window.onUnionPayClose = function() {
      MostOneJSApis.onUnionPayResult(JSON.stringify(that.result));
    };
  },
  methods: {
    getResult() {
      MostOneJSApis.onUnionPayResult(JSON.stringify(this.result));
    },
    repay() {
      MostOneJSApis.onUnionPayOrder(
        JSON.stringify({ order_id: this.$route.query.orderid,re_pay:true})
      );
    },
    queryOrder() {
      this.result = null;
      let orderId = this.$route.query.orderid;
      var options = {
        method: "POST", //post请求
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          //post请求参数
          trade_no: orderId
        })
      };
      fetch("https://cp.mostonetech.com/unite/order_status", options)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setTimeout(() => {
            this.wait = false;
          }, 1000);
          if (data.code == 200) {
            switch (data.data.trade_state) {
              case "SUCCESS":
                this.result = {
                  code: 2000,
                  message: "支付成功",
                  data: { orderId }
                };
                this.success = true;
                break;
              case "REFUND":
                this.result = {
                  code: 2100,
                  message: "转入退款",
                  data: { orderId }
                };
                break;
              case "NOTPAY":
                this.result = {
                  code: 2200,
                  message: "未支付",
                  data: { orderId }
                };
                break;
              case "CLOSED":
                this.result = {
                  code: 2300,
                  message: "已关闭",
                  data: { orderId }
                };
                break;

              case "REVOKED":
                this.result = {
                  code: 2400,
                  message: "已撤销（付款码支付）",
                  data: { orderId }
                };
                break;
              case "USERPAYING":
                this.result = {
                  code: 2500,
                  message: "用户支付中（付款码支付）",
                  data: { orderId }
                };
                break;
              case "PAYERROR":
                this.result = {
                  code: 2600,
                  message: "支付失败(其他原因，如银行返回失败)",
                  data: { orderId }
                };
                break;
              default:
                this.result = {
                  code: 2700,
                  message: "找不到状态",
                  data: { orderId }
                };
                break;
            }
          } else {
            this.result = {
              code: 4000,
              message: data.msg || "查询失败",
              data: { orderId }
            };
          }
        })
        .catch(error => {
          this.result = {
            code: 5000,
            message: error || "查询失败",
            data: null
          };
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 0.48rem;
  color: #666;
  .icon-wrap {
    width: 2.8rem;
    height: 2.8rem;
    margin-bottom: 0.8rem;
  }
  .btn-area {
    width: 100%;
    margin-top: 1.066667rem;
    .btn {
      width: 80%;
      color: #fff;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 1.066667rem;
      margin: 0 auto;
      font-size: .426667rem;
      margin-bottom: 0.4rem;
      //   box-shadow: 0 0 .133333rem 0 #999;
      &.success {
        background: #33a954;
        &:active {
          background: rgba($color: #33a954, $alpha: 0.7);
        }
      }
      &.fail {
        background: #ff4e4a;
        &:active {
          background: rgba($color: #ff4e4a, $alpha: 0.7);
        }
      }
    }
  }
}
</style>