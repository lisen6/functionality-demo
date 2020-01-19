<template>
  <div class="box">
    <dragAndDrop
      v-for="(item, index) in arr"
      :key="index"
      class="contain"
      :index="index"
    >
      {{ index }}
    </dragAndDrop>
  </div>
</template>
<script>
import dragAndDrop from '@/components/drag'
export default {
  components: {
    dragAndDrop
  },
  data() {
    return {
      arr: []
    }
  },
  mounted() {
    this.arr = new Array(9).fill(null)
    // this.dragInit();
  },
  methods: {
  }
}
</script>
<style>
.box {
  display: flex;
  flex-wrap: wrap;
}
.contain {
  width: 200px;
  height: 200px;
  background: purple;
  margin: 20px;
  font-size: 40px;
}
</style>
