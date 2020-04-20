<template>
  <div class="ad-sm">
    <img src="http://okimg.mostonetech.com/admin/pic/1ae2ae30805b11ea819800163e0871da.jpg" alt srcset />
    <img src="http://okimg.mostonetech.com/admin/pic/2e677b6b805b11ea819800163e0871da.jpg" alt srcset />
    <img src="http://okimg.mostonetech.com/admin/pic/4e91b1d6805b11ea819800163e0871da.jpg" alt srcset />
    <img src="http://okimg.mostonetech.com/admin/pic/5656a59d805b11ea819800163e0871da.jpg" alt srcset />
    <img src="http://okimg.mostonetech.com/admin/pic/5cd34ee5805b11ea819800163e0871da.jpg" alt srcset />
  </div>
</template>

<script>
export default {
  name: "SuiMing",
  data(){
    return {

    }
  },
  created(){
      document.title = "玄启道人起名测八字";
  },
  destroyed(){
      document.title = "";
  }
};
</script>

<style lang='scss' scoped>
.ad-sm{
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    font-size: 0;
    img{
        width: 100%;
        margin-top: -1px;
    }
}
</style>