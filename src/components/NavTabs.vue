<template>
  <div>
    <div class="tab-wrap" @touchmove.stop="tabTouchMove" ref="tabWrap">
      <ul class="select-tab" ref="ulparent">
        <li
          v-for="(item,index) in tabData"
          :key="item.key"
          class="tab-item"
          :class="[{active: tabData[current].key === item.key},lineStyle]"
          ref="item"
          @click="selectTab(index)"
        >{{ item.value }}
        </li>
        <li class="border-bottom" :style="{ left: left,marginLeft: -baseWidth / 2 + 'px'}" v-if="!lineStyle"
            ref="line"></li>
      </ul>
    </div>
    <slot name="tabBody" v-if="showBody">
      <div class="navbar-wrap">
        <div class="wrap-tab" :style="{ left: fllowScroll ? currentDis : '0'}"
             @touchstart.stop="touchStart"
             @touchmove.stop="touchMove"
             @touchend.stop="touchEnd"
             @touchcancel.stop="touchCancel"
        >
          <slot name="unFllowScroll">
            <div class="tab-body" v-for="(item,index) in tabData" :key="item.key" :style="{ left: 100 * index + '%' }">
              <slot :name="item.key">
                {{item.value}}
              </slot>
            </div>
          </slot>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
  import move from "@/utils/move"

  export default {
    name: "NavTabs",
    props: {
      tabData: {
        type: Array,
        default: () => {
          return [
            {key: 1, value: "tab1"},
            {key: 2, value: "tab2"},
            {key: 3, value: "tab3"},
          ];
        }
      },
      lineStyle: {
        type: String,
        default: ""
      },
      fllowScroll: {
        type: Boolean,
        default: true
      },
      showBody: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        current: 0,
        left: 0,
        touchX: 0,
        touchY: 0,
        currentDis: 0,
        baseWidth: 10,
        startTime: 0
      };
    },
    mounted() {
      this.$nextTick(() => {
        if (this.$refs.line) {
          this.$refs.line.style.width =
            this.$refs.item[this.current].clientWidth + this.baseWidth + "px";
          this.left = this.$refs.item[this.current].offsetLeft + "px";
        }
      });
      window.onresize =  () => {
        this.$nextTick(() => {
          if (this.$refs.line) {
            this.$refs.line.style.width =
              this.$refs.item[this.current].clientWidth + this.baseWidth + "px";
            this.left = this.$refs.item[this.current].offsetLeft + "px";
          }
        });
      }
    },
    destroyed() {
      window.onresize =  () => {}
    },
    watch: {
      current() {
        if (this.$refs.line) {
          this.$refs.line.style.width =
            this.$refs.item[this.current].clientWidth + this.baseWidth + "px";
          this.left = this.$refs.item[this.current].offsetLeft + "px";
        }
        this.currentDis = -100 * this.current + '%';
        this.$emit("tabClick", this.tabData[this.current], this.current);
      }
    },
    methods: {
      selectTab(index) {
        this.current = index;
      },
      touchStart(e) {
        this.touchX = e.touches[0].clientX;
        this.touchY = e.touches[0].clientY;
        this.startTime = new Date().getTime();
      },
      touchMove(e) {
        let x = e.changedTouches[0].clientX;
        let y = e.changedTouches[0].clientY;
        let total = document.body.clientWidth;
        let baseSize = ((x - this.touchX) + ((x - this.touchX) * 0.6)) / total;
        if (Math.abs(y - this.touchY) > 200) return;
        if (Math.abs(x - this.touchX) < 50) return;
        if ((this.current != 0 || baseSize < 0) && (this.current != this.tabData.length - 1 || baseSize > 0)) {
          this.currentDis = (-100 * this.current) + (baseSize * 100) + '%';
          let computedDis = this.$refs.item[this.current].offsetLeft + (this.$refs.item[2].offsetLeft - (this.$refs.item[1].offsetLeft + this.$refs.item[1].clientWidth)) * (-baseSize);
          this.left = computedDis + 'px';
          if (this.$refs.ulparent.clientWidth > document.body.clientWidth) {
            // move.startMove(this.$refs.tabWrap,{left:computedDis})
            this.$refs.tabWrap.scrollLeft = computedDis;
          }
        }
      },
      touchEnd(e) {
        let x = e.changedTouches[0].clientX;
        let y = e.changedTouches[0].clientY;
        if (Math.abs(y - this.touchY) > 200) {
          this.left = this.$refs.item[this.current].offsetLeft + 'px';
          this.currentDis = -100 * this.current + '%';
          if (this.$refs.ulparent.clientWidth > document.body.clientWidth) {
            // move.startMove(this.$refs.tabWrap,{left:this.current ? this.$refs.item[this.current].offsetLeft : 0})
            this.$refs.tabWrap.scrollLeft = this.current ? this.$refs.item[this.current].offsetLeft : 0;
          }
          return
        }
        let total = document.body.clientWidth;
        let baseSize = (x - this.touchX) / total
        let now = new Date().getTime();
        if (now - this.startTime > 1500 && Math.abs(baseSize) < 0.5) {

        }
          // if((0 < baseSize && baseSize < 0.3) || (-0.3 < baseSize && baseSize < 0)){
          //   this.currentDis = -100 *  this.current +'%';
          // }else
        //
        else if (baseSize > 0.3 || x - this.touchX > 50) {
          if (this.current != 0) {
            this.current = this.current - 1;
          }
        } else if (baseSize < -0.3 || x - this.touchX < -50) {
          if (this.current != this.tabData.length - 1) {
            this.current = this.current + 1;
          }
        }
        this.left = this.$refs.item[this.current].offsetLeft + 'px';
        this.currentDis = -100 * this.current + '%';
        if (this.$refs.ulparent.clientWidth > document.body.clientWidth) {
          // move.startMove(this.$refs.tabWrap,{left:this.current ? this.$refs.item[this.current].offsetLeft : 0})
          this.$refs.tabWrap.scrollLeft = this.current ? this.$refs.item[this.current].offsetLeft : 0;
        }
      },
      touchCancel() {
        this.left = this.$refs.item[this.current].offsetLeft + 'px';
        this.currentDis = -100 * this.current + '%';
        if (this.$refs.ulparent.clientWidth > document.body.clientWidth) {
          // move.startMove(this.$refs.tabWrap,{left:this.current ? this.$refs.item[this.current].offsetLeft : 0})
          this.$refs.tabWrap.scrollLeft = this.current ? this.$refs.item[this.current].offsetLeft : 0;
        }
      },
      tabTouchMove() {
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/style.scss";

  .tab-wrap {
    width: 100%;
    overflow-x: auto;
  }

  .select-tab {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    min-width: 100%;
    margin-bottom: px2rem(20);

    .tab-item {
      font-size: px2rem(32);
      padding-top: px2rem(20);
      cursor: pointer;
      // &+.tab-item{
      //   margin-left: 36px;
      // }
      // padding-bottom: 10px;
      &.active {
        color: #338cff;
      }
    }

    .border-line {
      padding-bottom: 2px;

      &.active {
        border-bottom: 2px solid #338cff;
      }
    }

    .border-bottom {
      position: absolute;
      bottom: px2rem(-10);
      left: 0;
      height: px2rem(4);;
      background: #338cff;
      transition: all 0.5s;
    }
  }

  .navbar-wrap {
    width: 100%;
    overflow-x: hidden;
  }

  .wrap-tab {
    min-height: calc(100vh - 2.346657rem);
    position: relative;
    transition: all 0.5s;

    .tab-body {
      position: absolute;
      top: 0;
      width: 100%;
      min-height: 100%;
      background: red;

      &:first-child {
        background: aqua;
      }

      @media only screen and (min-width: 375px)  and (max-width: 500px) {
        &:first-child {
          background: #338cff;
        }
      }

      &:nth-child(2) {
        background: yellow;
      }
    }
  }
</style>
