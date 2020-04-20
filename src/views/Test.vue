<template>
  <div class="success">
    AppKey
    <input style="border:1px solid #000" type="text" placeholder="AppKey" v-model="appid" />
    <br />
    <br />AppSecret
    <textarea
      rows="2"
      style="border:1px solid #000"
      type="text"
      placeholder="AppSecret"
      v-model="apps"
    />
    <br />
    <br />
    <button @click="login()">授权登录</button>
    <br />
    <br />
    <button @click="getOrder()">获取订单</button>
    <br />
    <br />
    <button @click="pay()">支付</button>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Test",
  data() {
    return {
      appid: "cIJW9ulJwb",
      apps: "fc545de30c4ecc1e79d6516282d6f2fe",
      open_id: "",
      results: ""
    };
  },
  created() {
//     const ordered = {};
// Object.keys(unordered).sort().forEach(function(key) {
//   ordered[key] = unordered[key];
// });
    var that =this;
    MostonePayApi.payResult(function(result) {
      if(result){
        alert(JSON.stringify(result))
      }
    });
    window.callBackCode = function(result) {
      axios
        .get(
          `http://47.94.135.134:8556/oauth2/access_token?appKey=${
            that.appid
          }&appSecret=${that.apps}&code=${JSON.parse(result).authCode}`
        )
        .then(function(response) {
          that.open_id = response.data.data.open_id;
          alert(JSON.stringify(response.data.data.open_id));
        });
    };
    window.callBackError = function(result) {
      alert(result);
    };
  },
  methods: {
    login() {
      var loginInfo = JSON.stringify({
        appkey: this.appid,
        state: "KK88AABB"
      });
      //调用原生的getMostOneAuthData方法
      MostOneJSApis.getMostOneAuthData(loginInfo);
    },
    pay() {
      MostonePayApi.mostOneWxPay(this.orderId, function(result) {
        alert(JSON.stringify(result));
      });
    },
    getOrder() {
      var that = this;
      MostonePayApi.getMostOneWxOrderId(
        {
          title: "你大爷的支付",
          amount: 1,
          // appId: "KK88AABB",
          appId: this.appid,
          openId: that.open_id,
          nonce: "2334",
          timestamp: new Date().getTime(),
          signature: "233443"
        },
        function(id, error) {
          that.orderId = id;
          if (id) {
            alert(that.orderId);
          } else {
            alert(JSON.stringify(error));
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
// .success {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   font-size: 24px;
//   color: #999;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -100%);
//   span {
//     margin: 20px 0;
//   }
//   .btn {
//     padding: 8px 10px;
//     font-size: 16px;
//     background: #3d85ff;
//     color: #fff;
//     border-radius: 5px;
//   }
// }
</style>