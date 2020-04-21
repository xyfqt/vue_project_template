<template>
  <ul class="select-tab" ref="ulparent">
    <li
      v-for="(item,index) in tabData"
      :key="item.key"
      class="tab-item"
      :class="[{active: tabData[current].key === item.key},lineStyle]"
      ref="item"
      @click="selectTab(index)"
    >{{ item.value }}</li>
    <li class="border-bottom" :style="{ left: left }" v-if="!lineStyle" ref="line"></li>
  </ul>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    tabData: {
      type: Array,
      default: () => {
        return [
          { key: 1, value: "tab1" },
          { key: 2, value: "tab2" },
          { key: 3, value: "tab3" }
        ];
      }
    },
    lineStyle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      current: 0,
      left: 0
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.line) {
        this.$refs.line.style.width =
          this.$refs.item[this.current].clientWidth + "px";
          this.left = this.$refs.item[this.current].offsetLeft + "px";
      }
    });
  },
  methods: {
    selectTab(index) {
      this.current = index;
      this.left = this.$refs.item[this.current].offsetLeft + "px";
      if (this.$refs.line) {
        this.$refs.line.style.width =
          this.$refs.item[this.current].clientWidth + "px";
      }
      this.$emit('tabClick',this.tabData[index],index)
    }
  }
};
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
.select-tab {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  width: 100%;
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
    transition: all 0.5s;
  }
}
</style>
