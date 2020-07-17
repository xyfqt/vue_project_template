<template>
  <div class="app-container">
    <img src="./../assets/image/500.png" alt />
    <span>服务器出错了</span>
    <div class="btn-area">
      <van-button plain type="primary" @click="goBack()" style="width:120px;margin-top: 30px">返回上一页</van-button>
      <van-button plain to="/" style="width:120px;margin-top: 30px">返回首页</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  data(){
    return {
      perviousPath:'',
      perviousQuery:'',
      
    }
  },
  methods: {
    goBack() {
      this.$router.replace({ path: this.perviousPath, query:this.perviousQuery });
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm => {
      vm.perviousPath = from.fullPath
      vm.perviousQuery = from.query 
    });
  }
};
</script>

<style lang="scss" scoped>
/*@import '@/assets/css/style.scss';*/
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  text-align: center;
  img {
    margin-top: 20vh;
    width: 100%;
    max-width: 500px;
  }
  .btn-area button {
    margin: 0 10px;
  }
}
</style>
