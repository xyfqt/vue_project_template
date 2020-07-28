<template>
  <div class="info-detail" @touchmove.stop="touchMove">
    <h1>{{info.title}}</h1>
    <div class="desc">
      <span>粉贝官方素材库</span><span>{{formatTime(info.starttime)}}</span>
    </div>
    <div class="info-rich-content" v-html="info.content">
    </div>
  </div>
</template>

<script>
  import sxyApi from '@/api/sxy'
  import StringUtils from '@/utils/StringUtils'

  export default {
    name: 'InfoDetail',
    data(){
      return {
        info:""
      }
    },
    created () {
      sxyApi.infoDetail({
        id: parseInt(this.$route.params.id)
      }).then(res => {
        if(res.code && res.data){
          this.info = res.data;
          document.title = this.info.title;
          this.$nextTick(() => {
            let videos = document.querySelectorAll('video')
            for (let i = 0; i < videos.length; i++) {
              let video = videos[i]
              video.setAttribute("controlsList","nodownload");
              video.setAttribute('poster', video.children[0].getAttribute('src')+'?x-oss-process=video/snapshot,t_1,f_jpg,m_fast,ar_auto')
              // video.addEventListener('loadeddata', function (e) {
              //   // 拿到图片
              //   let canvas = document.createElement('canvas')
              //   canvas.width = video.videoWidth * 0.8
              //   canvas.height = video.videoHeight * 0.8
              //
              //   canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
              //   let src = canvas.toDataURL('image/png');
              //   // 显示在dom，测试用
              //   (function (flag = true) {
              //     if (!flag) {
              //       return
              //     }
              //     let img = document.createElement('img')
              //     img.src = src
              //     document.body.appendChild(img)
              //   })(0)
              //   video.setAttribute('poster', 'http://okimg.mostonetech.com/admin/pic/00263842852b11eaab3c00163e0871da.jpg')
              // })
            }
          })
        }
      })
    },
    methods:{
      formatTime(time){
        return StringUtils.formaterTime(time,"YYYY-MM-dd hh:mm")
      },
      touchMove(){}
    }
  }
</script>
<style lang="scss" scoped>
@import "@/assets/css/style.scss";

  .info-detail {
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    line-height: 1.5;
    padding: 0 px2rem(22);
    box-sizing: border-box;
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
    .info-rich-content{
      margin-top: px2rem(32);
      font-size: px2rem(32);
    }
  }
</style>
<style>
  .info-rich-content img{
    width: 100%;
    height: auto;
  }
  .info-rich-content video {
    width: 100%;
    height: auto;
  }
</style>
