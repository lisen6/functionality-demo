<template>
  <div class="container">
    <SlotView v-model="demo"/><br/>
    <el-button @click="handleClick">触发事件</el-button>
  </div>
</template>

<script>
import SlotView from '@/components/Slot.vue'
import Emitter  from '@mixins/emitter.js'
import { findComponentDownward } from '@/utils/assist.js'
export default {
  name: "Slot",
  components: {
    SlotView
  },
  mixins: [Emitter],
  data() {
    return {
      demo: 123
    }
  },
  mounted() {
    const comA = findComponentDownward(this, 'SlotChild')
    if(comA) {
      console.log(comA, 555)
    }
    console.log(this.$el, 777)
  },
  methods: {
    handleClick() {
      this.broadcast('SlotChild', 'test', 'hello Vue.js')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
