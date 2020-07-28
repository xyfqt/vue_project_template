<template>
  <div class="register app-container">
    <div class="register-head">
      <div class="register-icon">
        <img src="@/assets/image/logo-icon.png" alt=""/>
        <span>倍优惠·倍赚钱</span>
      </div>
    </div>
    <div class="register-body">
      <span class="Invitation-code">{{ inviteCode }}</span>
      <div class="phone-body">
        <input type="text" placeholder="请输入您的手机" maxlength="11" v-model="phoneNumber" @blur="testPhone"/>
      </div>
      <div class="verification-code">
        <input type="text" placeholder="请输入您的验证码" maxlength="6" v-model="codeNumber"/>
        <button @click="getCode" :disabled="isdisabled">{{ buttonText }}</button>
      </div>
      <button
        class="register-btn"
        :class="{ 'isregister-btn': isRegister }"
        @click="register"
        :disabled="!isRegister"
      >
        立即注册
      </button>
      <div class="app-name">粉贝-购物省钱的返利APP</div>
      <div class="app-introduce">汇集淘宝天猫超多内部优惠券，领券购物更省钱分享粉贝给好友，好友购物您赚佣</div>
    </div>
    <div class="register-footer">
      <img
        :src="ischeck ? require('@/assets/image/checked.png') : require('@/assets/image/unchecked.png')"
        @click="ischeck = !ischeck"
      />
      同意
      <router-link tag="a" to="/agreement">《粉贝用户协议》</router-link>
      及
      <router-link tag="a" to="/private">《隐私政策》</router-link>
    </div>
  </div>
</template>

<script>
  import userApi from "@/api/user";
  import {Toast} from "vant";

  export default {
    name: 'Register',
    data() {
      return {
        phoneNumber: '', //手机号码
        codeNumber: '', //验证码
        inviteCode: '', //邀请码
        buttonText: '获取验证码',
        isdisabled: false,
        timer: 0,
        ischeck: true,
        isClick: true, //是否可以点击
        platform:"",
        sysVersion:"",
      }
    },
    mounted() {
      var str = navigator.userAgent.toLowerCase();
      var ios = str.match(/cpu iphone os (.*?) like mac os/);
      var android = str.match(/android (.*?);/);
      if (!ios) {
        this.platform = "Android"
        this.sysVersion = android[1];
      } else {
        this.platform = "iOS"
        this.sysVersion = ios[1].replace(/_/g, ".")
      }
      if (this.$route.params.inviteCode != '') {
        this.inviteCode = this.$route.params.inviteCode
      }
    },
    methods: {
      touchStop(){

      },
      //获取验证码
      getCode() {
        if (this.phoneNumber == '') {
          Toast('请输入手机号！')
          return
        }
        if (!this.testPhone()) {
          return
        }
        let options = {
          areaNumber: '86',
          phone: this.phoneNumber,
          verify: '2',
          type: 1,
        }
        this.getVerificationCode(options)
      },
      getVerificationCode(options) {
        this.buttonText = '等待 59 秒'
        this.isdisabled = true
        let waitCount = 59
        this.timer = setInterval(() => {
          waitCount--
          this.buttonText = '等待 ' + waitCount + ' 秒'
          if (waitCount == 0) {
            this.buttonText = '获取验证码'
            this.isdisabled = false
            clearInterval(this.timer)
          }
        }, 1000)
        userApi.getVerificationCode(options).then(res => {
          if (res.success) {
            if (res.data == 2) {
              Toast('发送成功')
            } else if (res.data == 5) {
              clearInterval(this.timer)
              this.buttonText = '获取验证码'
              this.isdisabled = false
              Toast('该手机号已注册')
            }
          } else {
            clearInterval(this.timer)
            this.buttonText = '获取验证码'
            this.isdisabled = false
            Toast(res.info)
          }
        })
      },

      //注册
      register() {
        if (this.phoneNumber == '') {
          Toast('请输入手机号！')
          return
        }
        if (this.codeNumber == '') {
          Toast('请输验证码！')
          return
        }
        let options = {
          code: this.codeNumber,
          inviteCode: this.inviteCode,
          phone: this.phoneNumber,
          platform:this.platform,
          sysVersion:this.sysVersion
        }
        userApi.register(options).then(res => {
          if (res.success) {
            this.$router.push('/registerSuccess')
          } else {
            Toast(res.info)
          }
        })
      },
      //手机号码校验
      testPhone() {
        let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
        if (!reg.test(this.phoneNumber)) {
          this.$toast('请输入正确的手机号码！')
          return false
        }
        return true;
      },
    },
    filters: {},
    computed: {
      isRegister() {
        return this.phoneNumber != '' && this.codeNumber != '' && this.inviteCode != '' && this.ischeck
      },
    },
    watch: {},
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/style.scss";

  .register {
    width: 100%;
    overflow-y: auto;
    height: 100%;
    background: #fff;
    .register-head {
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -webkit-justify-content: center;
      position: relative;
      width: px2rem(750);
      height: px2rem(422);
      margin-bottom: px2rem(109);
      background: url('../../assets/image/register-bg.png');
      background-size: 100%;

      .register-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: px2rem(182);
        position: absolute;
        top: px2rem(188);
        img {
          width: px2rem(160);
          height: px2rem(160);
        }

        span {
          margin-top: px2rem(22);
          font-family: PingFangSC-Regular;
          font-size: px2rem(28);
          color: #606266;
          letter-spacing: 0px;
        }
      }
    }

    .register-body {
      // display: flex;
      // justify-content: center;
      // flex-wrap: wrap;
      width: px2rem(626);
      margin: 0 auto;
      font-family: PingFangSC-Regular;
      font-size: px2rem(32);
      color: #16171c;
      letter-spacing: 0;

      .Invitation-code {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        width: px2rem(628);
        height: px2rem(100);
        font-family: PingFangSC-Regular;
        font-size: px2rem(32);
        color: #16171c;
        letter-spacing: 0;
        border-bottom: px2rem(1) solid #e7e7e7;
      }

      .phone-body {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        width: px2rem(628);
        height: px2rem(100);
        border-bottom: px2rem(1) solid #e7e7e7;

        input {
          display: flex;
          display: -webkit-flex;
          align-items: center;
          -webkit-align-items: center;
          width: px2rem(628);
          margin: 0;
          padding: 0;
          font-size: px2rem(32);
          border: none;
          outline: none;
        }

        input::-webkit-input-placeholder {
          font-size: px2rem(32);
          color: #afb2b9;
          letter-spacing: 0;
        }
      }

      .verification-code {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        width: px2rem(628);
        height: px2rem(100);
        border-bottom: px2rem(1) solid #e7e7e7;

        input {
          display: flex;
          display: -webkit-flex;
          align-items: center;
          -webkit-align-items: center;
          width: px2rem(300);
          margin: 0;
          padding: 0;
          font-size: px2rem(32);
          border: none;
          outline: none;
        }

        input::-webkit-input-placeholder {
          font-size: px2rem(32);
          color: #afb2b9;
          letter-spacing: 0;
        }

        button {
          width: px2rem(200);
          height: px2rem(68);
          margin: 0;
          padding: 0;
          font-family: PingFangSC-Regular;
          font-size: px2rem(28);
          color: #ff5086;
          background: #f6f6f6;
          border-radius: px2rem(34);
          border: none;
          outline: none;
        }
      }

      .register-btn {
        width: px2rem(628);
        height: px2rem(92);
        margin: px2rem(60) 0 px2rem(40) 0;
        padding: 0;
        font-family: PingFangSC-Regular;
        font-size: px2rem(34);
        color: #909399;
        background: #e7e7e7;
        border-radius: px2rem(54);
        border: none;
        outline: none;
      }

      .isregister-btn {
        background-image: linear-gradient(90deg, #ff549a 0%, #ff4d76 100%, #ff4d76 100%);
        color: #ffffff;
      }

      .app-name {
        margin-bottom: px2rem(10);
        font-family: PingFangSC-Regular;
        font-size: px2rem(28);
        color: #16171c;
        letter-spacing: 0;
        text-align: center;
      }

      .app-introduce {
        margin-bottom: px2rem(33);
        font-family: PingFangSC-Regular;
        font-size: px2rem(28);
        color: #606266;
        letter-spacing: 0;
        text-align: center;
      }
    }

    .register-footer {
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      -webkit-justify-content: center;
      position: relative;
      width: px2rem(750);
      height: px2rem(30);
      margin-bottom: px2rem(30);
      font-family: PingFangSC-Regular;
      font-size: px2rem(24);
      color: #606266;
      letter-spacing: 0;

      img {
        width: px2rem(30);
        height: px2rem(30);
        margin-right: px2rem(20);
      }

      a {
        color: #2e8ee6;
      }
    }
  }
</style>
