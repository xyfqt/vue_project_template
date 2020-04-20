; (function () {
    function MostonePayApi() {
        this.params = {
            title: "",
            amount: 0.00,
            appId: "",
            openId: "",
            timestamp: new Date().getTime(),
            nonce: "",
            signature: "",
        }
        this.callback = null;
        this.resultCallback = null;
        this.result = {
            code: 1000,//默认
            message: "",
            data: null,
        }
        this.init();
    }

    MostonePayApi.prototype = {
        constructor: MostonePayApi,
        // 初始化方法
        init: function () {
            this.appCallBack();
        },
        appCallBack: function () {
            var that = this;
            window.callBackUnionCreateOrder = function (result) {
                result = JSON.parse(result)
                if (that.callback) {
                    if (result.code == 200) {
                        that.callback(result.data.orderId)
                    } else {
                        that.callback("", result)
                    }
                } else {
                    that.mostOneWxPay(result.data.orderId);
                }
            };

            window.callBackUnionPayOrder = function (result) {
                result = JSON.parse(result);
                if (result.code == 200) {
                    that.callback(result)
                } else {
                    that.callback(result)
                    that.result = result;
                }
            }
            window.callBackUnionPayResult = function (result) {
                that.queryOrder(JSON.parse(result).data.orderId)
            }
        },
        mostOneWxPay: function (orderId, callback) {
            if (callback) {
                this.callback = callback;
            }
            MostOneJSApis.onUnionPayOrder(JSON.stringify({ order_id: orderId ,re_pay:false}))
        },
        getMostOneWxOrderId: function (params, callback) {
            this.params = params;
            if (callback) {
                this.callback = callback;
            }
            MostOneJSApis.onUnionCreateOrder(JSON.stringify({
                title: this.params.title,
                total_fee: this.params.amount,
                app_id: this.params.appId,
                open_id: this.params.openId,
                timestamp: this.params.timestamp,
                nonce: this.params.nonce,
                signature: this.params.signature,
            }));
        },
        queryOrder:function(orderId) {
            var that = this;
            var resultObj = null;
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
            fetch("http://47.94.135.134:9614/unite/order_status", options)
              .then(function(response) {
                return response.json();
              })
              .then(function(data){
                if (data.code == 200) {
                  switch (data.data.trade_state) {
                    case "SUCCESS":
                      resultObj = {
                        code: 2000,
                        message: "支付成功",
                        data: { orderId }
                      };
                      break;
                    case "REFUND":
                      resultObj = {
                        code: 2100,
                        message: "转入退款",
                        data: { orderId }
                      };
                      break;
                    case "NOTPAY":
                      resultObj = {
                        code: 2200,
                        message: "未支付",
                        data: { orderId }
                      };
                      break;
                    case "CLOSED":
                      resultObj = {
                        code: 2300,
                        message: "已关闭",
                        data: { orderId }
                      };
                      break;
      
                    case "REVOKED":
                      resultObj = {
                        code: 2400,
                        message: "已撤销（付款码支付）",
                        data: { orderId }
                      };
                      break;
                    case "USERPAYING":
                      resultObj = {
                        code: 2500,
                        message: "用户支付中（付款码支付）",
                        data: { orderId }
                      };
                      break;
                    case "PAYERROR":
                      resultObj = {
                        code: 2600,
                        message: "支付失败(其他原因，如银行返回失败)",
                        data: { orderId }
                      };
                      break;
                    default:
                      resultObj = {
                        code: 2700,
                        message: "找不到状态",
                        data: { orderId }
                      };
                      break;
                  }
                } else {
                  resultObj = {
                    code: 4000,
                    message: data.msg || "查询失败",
                    data: { orderId }
                  };
                }
                that.resultCallback(resultObj)
              })
              .catch(function(error){
                resultObj = {
                  code: 5000,
                  message: error || "查询失败",
                  data: null
                };
                that.resultCallback(resultObj)
              });
          },
        payResult: function (callback) {
            this.resultCallback = callback;
        },
        shareGameOnMostone:function(params){
          if(params && params.appKey){
            MostOneJSApis.onStartShareGame(
              JSON.stringify(params)
            );
            return true
          }
          return false;
        }
    }
    window.MostonePayApi = new MostonePayApi()
})()