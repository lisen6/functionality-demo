<template>
  <VirtualList :listData="data" :itemSize="100"/>
</template>

<script>
import VirtualList from '@/components/VirtualList.vue'
let d = [];
for (let i = 0; i < 1000; i++) {
  d.push({ id: i, value: i });
}
export default {
  name: "nodeList",
  components: { 
    VirtualList
  },
  data() {
    return {
      data: d
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
