<template>
  <div class="home">
    <div class="content" @click="open(game)" v-for="(game,index) in gamesList" :key="index">
      <img :src="game.banner" alt />
      <img class="jiao-biao" src="./../assets/nodownload.png" alt="">
      <!-- <div class="opreate-area">
        <div class="left">
          <div class="des">
            <span>{{game.app_name}}</span>
          </div>
          <div class="title">
            <img :src="game.icon" alt />
            {{game.subheading}}
          </div>
        </div>
        <div class="right">
          <button>进入</button>
        </div>
      </div> -->
      <div class="game-des">
        <strong>{{game.app_name}}</strong><br>
        “ {{game.subheading}} ” 
        <div class="hot-num">
          <img src="./../assets/hot.gif" alt="" srcset="">
          <span>{{game.basics | onlineNum}}在线</span>
        </div>
        <div class="start-game">
          <img src="./../assets/startgame.gif" alt="" srcset="">
        </div>
      </div>
    </div>

    <div class="no-data" v-show="!gamesList.length">
      <img src="http://okimg.mostonetech.com/admin/pic/69445092805b11ea819800163e0871da.png" alt srcset />
      加载中...
    </div>
  </div>
</template>

<script>
import api from "@/api/api";
export default {
  name: "home",
  data() {
    return {
      gamesList: [],
      orderId: ""
    };
  },
  filters:{
    onlineNum(num){
        if(!num) num = 0;
        // let second = new Date().getSeconds().toString();
        // let sarr = second.split("");
        // let base = Number(sarr[sarr.length-1] + second);
        let base = parseInt(Math.random() * 899)+100;
        return base + num;

    }

  },
  created() {
    window.mostoneShareGame = function() {
      MostOneJSApis.onStartShareGame(
        JSON.stringify({
          icon:
            "http://okimg.mostonetech.com/admin/pic/b6d6f41e7e3811eab4b0d45d64206dee.png",
          title: "游戏中心",
          content: "一起来玩超棒的游戏，我在游戏里等你",
          url: "http://center.mostonegame.com"
        })
      );
    };
    api.gamesList().then(res => {
      if (res.data) {
        this.gamesList = res.data;
      }
    });
  },
  methods: {
    open(item) {
      MostOneJSApis.onUnionUrl(
        JSON.stringify({
          url: item.url,
          banner: item.banner,
          icon: item.icon,
          name: item.app_name,
          subheading: item.subheading
        })
      );
      this.staticClick(item.id);
      window.location.href = item.url;
    },
    share(){
        MostonePayApi.shareGameOnMostone(
          {
          appKey:"11552532",
          icon:
            "http://okimg.mostonetech.com/admin/pic/b6d6f41e7e3811eab4b0d45d64206dee.png",
          title: "游戏中心",
          content: "一起来玩超棒的游戏，我在游戏里等你",
          url: "http://center.mostonegame.com"
        }
        );
    },

    staticClick(id) {
      let time = new Date().getDate();
      let obj = {
        id: id,
        time: time
      };
      let staticClk = localStorage.getItem("staticClick");
      if (staticClk && staticClk != "null") {
        staticClk = JSON.parse(staticClk);
        let filterItem = staticClk.filter(item => item.id == obj.id);
        if (!filterItem.length) {
          this.requestStatic(id);
          staticClk.push(obj);
          localStorage.setItem("staticClick", JSON.stringify(staticClk));
        } else if (filterItem.length && filterItem[0].time != time) {
          this.requestStatic(id);
          filterItem[0].time = time;
          localStorage.setItem("staticClick", JSON.stringify(staticClk));
        }
      } else {
        this.requestStatic(id);
        localStorage.setItem("staticClick", JSON.stringify([obj]));
      }
    },
    requestStatic(id) {
      api.staticClick({ id: id }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
  .no-data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -80%);
    text-align: center;
    font-size: 0.48rem;
    color: #999;
    width: 100%;
    img {
      width: 100%;
      height: 5rem;
    }
  }
  .content {
    padding: 0.426667rem;
    box-sizing: content-box;
    border-bottom: 1px solid #dedede;
    position: relative;
    img {
      width: 9.146667rem;
      height: 5.146667rem;
      border-radius: 0.266667rem;
    }
    .jiao-biao{
      width: 1.44rem;
      height: 1.44rem;
      position: absolute;
      top: .346667rem;
      right: .346667rem;
    }
  
  .game-des{
    text-align: center;
    font-size: .32rem;
    line-height: 2;
    margin-top: 18px;
    color: #4C4C4C;
    strong{
      color: #040404;
      font-size: .4rem;
    }
    .hot-num{
      color: #F16859 ;
      font-size: .32rem;
      img{
        width: .32rem;
        height: .32rem;
        position: relative;
        top: .04rem;
      }
    }
    .start-game{
      text-align: center;
      padding-top: .24rem;
      font-size: 0;
      img{
        width: 3.6rem;
        height: 1.306667rem;
      }
    }

  }



  }
}
</style>
