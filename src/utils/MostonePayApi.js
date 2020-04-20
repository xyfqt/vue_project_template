// (function (global, factory) {
//     typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
//         typeof define === 'function' && define.amd ? define(factory) :
//             (global.MostonePayApi = factory());
// }(this, (function () {
//     'use strict';

; (function () {
    var resultFlag = false;
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
        this.orderId = null;
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
            this.createModel();
            this.bindEvent();
            this.appCallBack();
        },
        createModel: function () {
            var dpr = 1;
            if (document.getElementsByName("viewport")) {
                var items = document.getElementsByName("viewport")[0].content.split(',')
                for (var item of items) {
                    if (item.indexOf("initial-scale") != -1) {
                        dpr = parseFloat(item.split("=")[1]);
                    }
                }
            }
            var style = document.createElement("style");
            style.innerText = `
            .mostone-model {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.35);
                display:none;
            }
        
            .mostone-model .model {
                width: 80%;
                background: #fff;
                border-radius: 10px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -80%);
                font-size:  ${16 / dpr}px;
            }
        
            .mostone-model .model .top {
                width: 100%;
                color: #333;
                height: ${65 / dpr}px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid #e7e7e7;
            }
        
            .mostone-model .model .center {
                width: 100%;
                color: #999;
                height: ${45 / dpr}px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid #e7e7e7;
            }
        
            .mostone-model .model .center:active {
                background:#f4f4f4;
            }
    
            .mostone-model .model .bottom:active {
                background:#f4f4f4;
            }
            .mostone-model .model .bottom {
                width: 100%;
                color: #999;
                height: ${45 / dpr}px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .mostone-loading {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0,0);
                display:none;
            }
            .mostone-loading-text{
                position:absolute;
                padding:  ${5 / dpr}px  ${15 / dpr}px;
                background: rgba(0,0,0,0.65);
                border-radius:  ${5 / dpr}px;
                font-size: ${16 / dpr}px;
                color:#fff;
                left: 50%;
                transform: translateX(-50%);
                bottom:10%;
              }
            `;
            document.body.appendChild(style);
            var model = document.createElement("div")
            model.setAttribute('class', 'mostone-model');
            model.innerHTML = `
            <div class="model">
                <div class="top">
                    请确认微信支付是否已经完成
                </div>
                <div class="center" id="finish">
                    已完成支付
                </div>
                <div class="bottom" id="repay">
                    支付遇到问题，重新支付
                </div>
            </div>
            `
            document.body.appendChild(model);
            var modelLoading = document.createElement("div")
            modelLoading.setAttribute('class', 'mostone-loading');
            modelLoading.innerHTML = `
            <div class="mostone-loading-text">支付中...</div>
            `;
            document.body.appendChild(modelLoading);
            this.queryOrder();
        },
        bindEvent: function () {
            document.body.addEventListener('touchstart', function () { });
            var that = this;
            document.getElementById("finish").addEventListener('click', function () {
                document.getElementsByClassName("mostone-model")[0].style.display = "none";
                // that.queryOrder();
                localStorage.setItem('mostoneresult', "");
                localStorage.setItem('mostone', "");
            })
            document.getElementById("repay").addEventListener('click', function () {
                document.getElementsByClassName("mostone-model")[0].style.display = "none";
                // that.queryOrder();
                var orderId = localStorage.getItem("mostoneresult") || getQueryVariable('orderid');
                that.orderId = orderId;
                that.mostOneWxPay(that.orderId)
            })
            // 给app调用
            window.refreshMWebPage = function () {
                // alert("准备刷新页面")
                window.location.reload();
            }
        },
        appCallBack: function () {
            var that = this;
            window.callBackUnionCreateOrder = function (result) {
                result = JSON.parse(result)
                if (that.callback) {
                    if (result.code == 200) {
                        that.orderId = result.data.orderId;
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
                    localStorage.setItem("mostone", JSON.stringify(that.params));
                    localStorage.setItem("mostoneresult", that.orderId);
                    that.callback(result)
                } else {
                    that.callback(result)
                    that.result = result;
                }
            }
        },
        mostOneWxPay: function (orderId, callback) {
            if (callback) {
                this.callback = callback;
            }
            MostOneJSApis.onUnionPayOrder(JSON.stringify({ order_id: orderId }))
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
        queryOrder: function () {
            var orderId = localStorage.getItem('mostoneresult') || getQueryVariable('orderid');
            if (!orderId) return
            var dom = document.getElementsByClassName("mostone-loading-text")[0];
            var wrap = document.getElementsByClassName("mostone-loading")[0];
            dom.innerText = "支付中...";
            wrap.style.display = "block";
            var that = this;
            alert(orderId)
            var options = {
                method: 'POST',//post请求 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({//post请求参数 
                    trade_no: orderId
                })
            }
            setTimeout(function () {
                that.requestResult(orderId, options, dom, wrap);
            }, 2000);
        },
        requestResult: function (orderId, options, dom, wrap) {
            var that = this;
            fetch('http://47.94.135.134:9614/unite/order_status', options)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if (data.code == 200) {
                        if (data.data.trade_state == "SUCCESS") {
                            localStorage.setItem('mostoneresult', '');
                            that.orderId = null;
                            that.callback = null;
                            dom.innerText = "支付成功"
                            setInterval(() => {
                                wrap.style.display = "none";
                            }, 3000);
                        } else {
                            // if (count < 5) {
                            //     setTimeout(function () {
                            //         that.requestResult(orderId, options, dom,wrap);
                            //     }, 2000);
                            // } else {
                            //     count = 0;
                            wrap.style.display = "none";
                            document.getElementsByClassName("mostone-model")[0].style.display = "block";
                            // }
                        }
                        switch (data.data.trade_state) {
                            case "SUCCESS":
                                that.result = {
                                    code: 2000,
                                    message: "支付成功",
                                    data: { orderId },
                                }
                                break;
                            case "REFUND":
                                that.result = {
                                    code: 2100,
                                    message: "转入退款",
                                    data: { orderId },
                                }
                                break;
                            case "NOTPAY":
                                that.result = {
                                    code: 2200,
                                    message: "未支付",
                                    data: { orderId },
                                }
                                break;
                            case "CLOSED":
                                that.result = {
                                    code: 2300,
                                    message: "已关闭",
                                    data: { orderId },
                                }
                                break;

                            case "REVOKED":
                                that.result = {
                                    code: 2400,
                                    message: "已撤销（付款码支付）",
                                    data: { orderId },
                                }
                                break;
                            case "USERPAYING":
                                that.result = {
                                    code: 2500,
                                    message: "用户支付中（付款码支付）",
                                    data: { orderId },
                                }
                                break;
                            case "PAYERROR":
                                that.result = {
                                    code: 2600,
                                    message: "支付失败(其他原因，如银行返回失败)",
                                    data: { orderId },
                                }
                                break;
                            default:
                                that.result = {
                                    code: 2700,
                                    message: "找不到状态",
                                    data: { orderId },
                                }
                                break;
                        }
                    } else {
                        that.result = {
                            code: 4000,
                            message: data.msg || "查询失败",
                            data: { orderId },
                        }
                    }
                    resultFlag = true;
                }).catch(function (error) {
                    that.result = {
                        code: 5000,
                        message: error || "查询失败",
                        data: null,
                    }
                    resultFlag = true;
                });
        },
        payResult: function (callback) {
            var that = this;
            if (resultFlag) {
                callback(this.result)
            } else {
                var orderId = localStorage.getItem('mostoneresult');
                if (orderId) {
                    setTimeout(function () {
                        that.payResult(callback);
                    }, 1000);
                }

            }
        }
    }
    window.MostonePayApi = new MostonePayApi()
})()
    // return MostonePayApi;
// })));
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}