<template>
  <VirtualList :list-data="data" :item-size="100" />
</template>

<script>
import VirtualList from '@/components/VirtualList.vue'
const d = []
for (let i = 0; i < 1000; i++) {
  d.push({ id: i, value: i })
}
export default {
  name: 'NodeList',
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
