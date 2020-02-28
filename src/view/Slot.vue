<template>
  <div class="container">
    <SlotView v-model="demo" /><br>
    <el-button @click="handleClick">触发事件</el-button><br>
    <checkBoxGroup v-model="arr">
      <checkBox label="option1">选项 1</checkBox>
      <checkBox label="option2">选项 2</checkBox>
      <checkBox label="option3">选项 3</checkBox>
      <checkBox label="option4">选项 4</checkBox>
    </checkBoxGroup>
  </div>
</template>

<script>
import SlotView from '@/components/Slot.vue'
import checkBoxGroup from '@/components/checkBox/checkBox-group.vue'
import checkBox from '@/components/checkBox/checkBox.vue'
import Emitter from '@mixins/emitter.js'
import { findComponentDownward } from '@/utils/assist.js'
export default {
  name: 'Slot',
  components: {
    SlotView,
    checkBox,
    checkBoxGroup
  },
  mixins: [Emitter],
  data() {
    return {
      demo: 1235,
      checked: true,
      trueValue: 1,
      falseValue: 0,
      arr: ['option1', 'option3']
    }
  },
  mounted() {
    // 向下找到最近的指定组件——findComponentDownward
    const comA = findComponentDownward(this, 'SlotChild')
    if (comA) {
      console.log(comA, 555)
    }
  },
  methods: {
    handleClick() {
      // 向下派发事件
      this.broadcast('SlotChild', 'test', 'hello Vue.js')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
