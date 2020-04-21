<template>
  <div>
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
      <li class="border-bottom" :style="{ left: left,marginLeft: -baseWidth / 2 + 'px'}" v-if="!lineStyle" ref="line"></li>
    </ul>
    <slot name="tabBody">
      <div class="navbar-wrap">
        <div class="wrap-tab" :style="{ left: fllowScroll ? currentDis : '0'}" @touchstart="touchStart"
             @touchmove="touchMove"
             @touchend="touchEnd">
          <div class="tab-body" v-for="(item,index) in tabData" :key="item.key" :style="{ left: 100 * index + '%' }">
            {{item.value}}
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
  export default {
    name: "NavBar",
    props: {
      tabData: {
        type: Array,
        default: () => {
          return [
            {key: 1, value: "tab1"},
            {key: 2, value: "tab2"},
            {key: 3, value: "tab3"}
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
      }
    },
    data() {
      return {
        current: 0,
        left: 0,
        touchX: 0,
        currentDis: 0,
        baseWidth:10
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
      },
      touchMove(e) {
        let x = e.changedTouches[0].clientX;
        let total = document.body.clientWidth;
        let baseSize =  ((x - this.touchX) + ((x - this.touchX) * 0.6)) / total;
        this.currentDis = (-100 * this.current) + (baseSize * 100) + '%';
        this.left = this.$refs.item[this.current].offsetLeft + (this.$refs.item[2].offsetLeft - (this.$refs.item[1].offsetLeft + this.$refs.item[1].clientWidth))*(-baseSize) + 'px';
      },
      touchEnd(e) {
        let x = e.changedTouches[0].clientX;
        let total = document.body.clientWidth;
        let baseSize = (x - this.touchX) / total
        // if((0 < baseSize && baseSize < 0.3) || (-0.3 < baseSize && baseSize < 0)){
        //   this.currentDis = -100 *  this.current +'%';
        // }else
        //
        if (baseSize > 0.3) {
          if (this.current != 0) {
            this.current = this.current - 1;
          }
        } else if (baseSize < -0.3) {
          if (this.current != this.tabData.length - 1) {
            this.current = this.current + 1;
          }
        }
        this.left = this.$refs.item[this.current].offsetLeft + 'px';
        this.currentDis = -100 * this.current + '%';
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/css/style.scss";

  .select-tab {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    width: 100%;
    margin-bottom: 10px;

    .tab-item {
      font-size: 16px;
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
      bottom: -5px;
      left: 0;
      height: 2px;
      background: #338cff;
      transition: all 0.3s;
    }
  }

  .navbar-wrap {
    width: 100%;
    overflow-x: hidden;
  }

  .wrap-tab {
    min-height: px2rem(840);
    position: relative;
    transition: all 0.3s;
    .tab-body {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background: red;

      &:first-child {
        background: aqua;
      }

      &:nth-child(2) {
        background: yellow;
      }
    }
  }
</style>
