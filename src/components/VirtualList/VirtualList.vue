<template>
  <div ref="list" class="infinite-list-container" @scroll="scrollEvent($event)">
    <div class="infinite-list-phantom" :style="{ height: listHeight + 'px' }" />
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div
        v-for="item in visibleData"
        ref="items"
        :key="item.id"
        class="infinite-list-item"
        :style="{ height: itemSize + 'px',lineHeight: itemSize + 'px' }"
      >{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VirtualList',
  props: {
    // 所有列表数据
    listData: {
      type: Array,
      default: () => []
    },
    // 每项高度
    itemSize: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      // 可视区域高度
      screenHeight: 0,
      // 偏移量
      startOffset: 0,
      // 起始索引
      start: 0,
      // 结束索引
      end: null
    }
  },
  computed: {
    // 列表总高度
    listHeight() {
      return this.listData.length * this.itemSize
    },
    // 可显示的列表项数
    visibleCount() {
      return Math.ceil(this.screenHeight / this.itemSize)
    },
    // 偏移量对应的style
    getTransform() {
      return `translate3d(0,${this.startOffset}px,0)`
    },
    // 获取真实显示列表数据
    visibleData() {
      return this.listData.slice(this.start, Math.min(this.end, this.listData.length)) // this.listData.length---滚动到列表最后几个的时候。
    }
  },
  mounted() {
    this.screenHeight = this.$refs.list.clientHeight
    this.start = 0
    this.end = this.start + this.visibleCount
  },
  methods: {
    scrollEvent() {
      // 当前滚动位置
      const scrollTop = this.$refs.list.scrollTop
      // 此时的开始索引
      this.start = Math.floor(scrollTop / this.itemSize)
      // 此时的结束索引
      this.end = this.start + this.visibleCount
      // 此时的偏移量(滚动的时候最上面的dom元素一直保持显示全部内容)

      // 比如假设每个list-Item高度50px  列表总长度10000px
      // 假设滚动条滚动了110px。那么应该渲染的是从第三个元素开始
      // 有两个元素划过去了
      // 但是为了保证从第三个元素刚好在可视区域顶部, 得把10px的偏移量补上
      this.startOffset = scrollTop - (scrollTop % this.itemSize)
    }
  }
}

</script>

<style scoped>
.infinite-list-container {
  height: calc(100vh - 110px);
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  /* position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1; */
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>
