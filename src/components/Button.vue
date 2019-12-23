<template>
    <el-button  @click="startUpRocket">点击详情</el-button>
</template>

<script>
export default {
    name: "Button",
    components: { },
    props: {
        //
    },
    data() {
        return {
            //
        }
    },
    mounted() {
      console.log(this.$listeners, 'Button')
    },
    methods: {
      startUpRocket() {
        this.$emit('upRocket')
        console.log("startUpRocket")
      }
    }
}
</script>

<style lang="scss" scoped>
</style>
