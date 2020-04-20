; (function () {
    function mostOnePayApi() {
        this.params = {
            title: "",
            amount: 0.00,
            appId: "",
            openId: "",
            timestamp: new Date().getTime(),
            nonce: "",
            signature: "",
        }
        this.result = {}
        this.createModel();
        this.bindEvent();
        this.appCallBack();
    }

    mostOnePayApi.prototype.appCallBack = function () {
        var that = this;
        window.callBackBuy = function (result) {
            var result = JSON.parse(result);
            if (result.code == 200) {
                localStorage.setItem("mostone", JSON.stringify(that.params));
                localStorage.setItem("mosoneresult", JSON.stringify(result));
            }
            this.result = result;
        };
    }

    mostOnePayApi.prototype.bindEvent = function () {
        document.body.addEventListener('touchstart', function () { });
        var that = this;
        document.getElementById("finish").addEventListener('click', function () {
            document.getElementsByClassName("mostone-model")[0].style.display = "none";
            localStorage.setItem('mosoneresult', "");
        })
        document.getElementById("repay").addEventListener('click', function () {
            document.getElementsByClassName("mostone-model")[0].style.display = "none";
            localStorage.setItem('mosoneresult', "");
            that.mostOneWxPay(JSON.parse(localStorage.getItem("mostone")))
        })
    }


    mostOnePayApi.prototype.createModel = function () {
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
            color: #f00;
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
        if (localStorage.getItem("mosoneresult")) {
            document.getElementsByClassName("mostone-model")[0].style.display = "block";
        }
    }

    mostOnePayApi.prototype.mostOneWxPay = function (params) {
        this.params = params;
        if (typeof MostOneJSApis == "undefined") {
            this.result = {
                code: 4000,
                message: "支付失败"
            }
            return this.result;
        }
        MostOneJSApis.onUnionBuy(JSON.stringify({
            title: this.params.title,
            total_fee: this.params.amount,
            app_id: this.params.appId,
            open_id: this.params.openId,
            timestamp: this.params.timestamp,
            nonce: this.params.nonce,
            signature: this.params.signature,
        }));
    }

    mostOnePayApi.prototype.payResult = function () {
        return this.result;
    }
    window.mostOnePayApi = new mostOnePayApi();
})()