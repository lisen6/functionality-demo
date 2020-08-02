<template>
  <div class="content">
    <input :value="value" @input="changeValue($event.target.value)">
    <p>{{ user.name }}</p>
  </div>
</template>

<script>
export default {
  name: 'SlotChild',
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  inject: ['app'],
  data() {
    return {
      user: {
        title: '测试title',
        name: '测试name'
      }
    }
  },
  mounted() {
    console.log('provide传递的name是：', this.app)

    this.$on('test', (data) => {
      console.log(data)
    })
  },
  methods: {
    changeValue(value) {
      this.$emit('input', value)
    }
  }
}
</script>
