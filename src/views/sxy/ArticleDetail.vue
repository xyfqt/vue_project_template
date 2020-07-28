<template>
  <div
    class="article-detail"
    ref="articleWrap"
    @touchstart.stop="touchMove"
    @touchmove.stop="touchMove"
  >
    <div ref="contentWrap">
      <h1>{{info.title}}</h1>
      <div v-show="showStatus">
        <div class="desc">
          {{info.clickNum}}人阅读
          <span>
            {{info.shareNum}}人
            <img src="../../assets/image/sxy/icon/icon_share_02@2x.png" />
          </span>
          {{info.starttime}}
          <div :class="info.isReaded ? 'read' : ''">{{info.isReaded ? '已学' : '未学'}}</div>
        </div>
      </div>
      <div class="info-rich-content" v-html="info.content"></div>
      <div class="end">
        <img src="../../assets/image/sxy/icon/icon_end@2x.png" alt />
        <div class="end-tip">
          <h2>【温馨提示】</h2>本文内容为“粉贝”官方资源，未经许可，
          <br />严禁转载！一经发现，必将追究法律责任。
        </div>
        <div class="num" v-show="showStatus">{{info.studyNum}}人已学</div>
      </div>
    </div>
  </div>
</template>

<script>
import sxyApi from "@/api/sxy";
import StringUtils from "@/utils/StringUtils";

export default {
  name: "ArticleDetail",
  data() {
    return {
      info: {
        isReaded: false
      },
      showStatus: false,
      src: ""
    };
  },
  created() {
    if (!this.$route.query.id) {
      setTimeout(() => {
        this.listernScroll();
      }, 1000);
      window.initDataToFenBei = this.initDataToFenBei;
      window.refreshStudyToFenBei = this.refreshStudyToFenBei;

      window.refreshStudyToFenBei = this.refreshShareToFenBei;
    } else {
      this.requestDetail();
    }
  },
  methods: {
    formatTime(time) {
      return StringUtils.formaterTime(time, "YYYY-MM-dd hh:mm");
    },
    requestDetail() {
      sxyApi
        .articleDetail({
          ...this.$route.query,
          type: 30
        })
        .then(res => {
          if (res.code && res.data) {
            this.info = res.data;
            document.title = this.info.title;
          }
        });
    },
    initDataToFenBei(res) {
      let that = this;
      this.showStatus = true;
      try {
        if (res.code && res.data) {
          that.info = res.data;
          document.title = that.info.title;
          that.$nextTick(() => {
            let videos = document.querySelectorAll("video");
            for (let i = 0; i < videos.length; i++) {
              let video = videos[i];
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
          });
        }
        return "success";
      } catch (e) {
        return "fail";
      }
    },

    refreshStudyToFenBei() {
      try {
        this.info.isReaded = true;
        return "success";
      } catch (e) {
        return "fail";
      }
    },
    refreshShareToFenBei(num) {
      try {
        this.info.shareNum = num;
        return "success";
      } catch (e) {
        return "fail";
      }
    },
    listernScroll() {
      this.$nextTick(() => {
        if (
          this.$refs.contentWrap.clientHeight <
          this.$refs.articleWrap.clientHeight
        ) {
          this.handlerStudy();
        }
        this.$refs.articleWrap.addEventListener("scroll", e => {
          if (
            this.$refs.articleWrap.scrollTop >
            this.$refs.contentWrap.clientHeight -
              this.$refs.articleWrap.clientHeight
          ) {
            this.handlerStudy();
          }
        });
      });
    },
    handlerStudy() {
      if (!this.info["isReaded"]) {
        this.info["isReaded"] = true;
        this.info.studyNum += 1;
        if (window.webkit) {
          window.webkit.messageHandlers.loadLearnState.postMessage();
        } else {
          pinkShell.scrollToBottom();
        }
      }
    },
    touchMove(ev) {}
  },
  destroyed() {
    window.initDataToFenBei = null;
    window.refreshStudyToFenBei = null;
    window.refreshStudyToFenBei = null;
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/style.scss";

.article-detail {
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  line-height: 1.5;
  padding: 0 px2rem(22);
  box-sizing: border-box;

  h1 {
    font-size: px2rem(40);
    word-break: break-all;
    /*width: 100%;*/
  }

  .desc {
    font-size: px2rem(22);
    color: #909399;
    position: relative;
    line-height: 2;

    span {
      margin: 0 px2rem(16);

      img {
        width: px2rem(20);
        height: px2rem(20);
        position: relative;
        top: px2rem(4);
      }
    }

    div {
      position: absolute;
      right: 0;
      width: px2rem(70);
      height: px2rem(40);
      border-radius: px2rem(8);
      top: 0;
      @include center();
      background: #f6f6f6;
      color: #666;

      &.read {
        background: #ff5086;
        color: #fff;
      }
    }
  }

  .info-rich-content {
    margin-top: px2rem(32);
    font-size: px2rem(32);
  }

  .end {
    text-align: center;
    margin-top: px2rem(64);
    margin-bottom: px2rem(170);

    img {
      width: px2rem(90);
      height: px2rem(90);
    }

    .end-tip {
      width: 100%;
      background-image: url("../../assets/image/sxy/warm_prompt@2x.png");
      background-size: 100% 100%;
      color: #fff;
      font-size: px2rem(28);
      text-align: center;
      line-height: 1.5;
      box-sizing: border-box;
      padding: px2rem(48) px2rem(77);

      h2 {
        font-size: px2rem(32);
      }
    }

    .num {
      font-size: px2rem(22);
      color: #909399;
      line-height: 2;
      text-align: right;
    }
  }
}
</style>
<style>
.info-rich-content img {
  width: 100%;
  height: auto;
}

.info-rich-content video {
  width: 100%;
  height: auto;
}
</style>
