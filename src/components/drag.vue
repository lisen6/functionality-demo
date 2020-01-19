<template>
  <div
    :id="`drag`+index"
    :ref="`drag`+index"
    class="contain"
    draggable="true"
    @dragstart="handle_dragstart"
    @drag="handle_drag"
    @drop="handle_ondrop"
    @dragover="allowDrop"
  >
    <slot />
  </div>
</template>
<script>
export default {
  components: {},
  // 唯一标识，必传
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.dragInit()
  },
  methods: {
    swapElements(a, b) {
      // 交换两个dom元素
      if (a === b) return
      // 记录父元素
      var bp = b.parentNode
      var ap = a.parentNode
      // 记录下一个同级元素
      var an = a.nextElementSibling
      var bn = b.nextElementSibling
      // 如果参照物是邻近元素则直接调整位置
      if (an === b) return bp.insertBefore(b, a)
      if (bn === a) return ap.insertBefore(a, b)
      // 如果a包含了b
      if (a.contains(b)) {
        ap.insertBefore(b, a)
        bp.insertBefore(a, bn)
      } else {
        bp.insertBefore(a, b)
        ap.insertBefore(b, an)
      }
    },
    handle_dragstart(ev) {
      ev.dataTransfer.setData('dragDom', ev.target.id)
    },
    handle_drag() {
      console.log('drag-在元素开始时反复触发')
    },
    handle_dragend() {
      this.$el.style.opacity = '1'
      console.log('dragend-在拖动操作完成时触发')
    },
    allowDrop(ev) {
      ev.preventDefault()
    },
    handle_ondrop(event) {
      const data = event.dataTransfer.getData('dragDom')
      // console.log(document.getElementById(data), event.target, '这两个dom')
      this.swapElements(document.getElementById(data), event.currentTarget)
      console.log(event.target, 'dragend-放下时时触发')
    },
    dragInit() {}
  }
}
</script>
<style>
  .contain{
    cursor: pointer;
  }
  .contain {
    width: 200px;
    height: 200px;
    background: purple;
    margin: 20px;
    font-size: 40px;
  }
</style>

