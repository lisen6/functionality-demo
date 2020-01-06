<template>
  <div>
    <magnifier :src="src" :big-src="bigSrc" />
  </div>
</template>

<script>
export default {
  name: 'Magnifier',
  components: {
    magnifier: () => import('@/components/magnifier/magnifier')
  },
  props: {
    //
  },
  data() {
    return {
      src: require('@/assets/logo1.gif'),
      bigSrc: require('@/assets/logo1.gif'),
      price: 1,
      number: 1,
      allPrice: ''
    }
  },
  mounted() {
    this.allPrice = this.price * this.number
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
