<template>
  <div>
    <el-button type="info" @click="info">info 消息按钮</el-button>
    <el-button type="success" @click="success">success 消息按钮</el-button>
    <el-button type="error" @click="error">error 消息按钮(2s后隐藏)</el-button>
    <el-button type="danger" @click="warning">warning 消息按钮</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    info() {
      this.$message.info({
        text: 'info 消息按钮(4s后隐藏)',
        duration: 4000 // 可以自定义实现弹窗消失延迟时间
      }, () => {
        console.log('info 消息发送成功')
      })
    },
    success() {
      this.$message.success({
        text: 'info 消息按钮(默认3s后隐藏)',
        duration: 3000 // 可以自定义实现弹窗消失延迟时间
      }, () => {
        console.log('success 消息发送成功')
      })
    },
    error() {
      this.$message.error({
        text: 'error 消息按钮(2s后隐藏)',
        duration: 2000 // 可以自定义实现弹窗消失延迟时间
      }, () => {
        console.log('error 消息发送成功')
      })
    },
    warning() {
      this.$message.warning({
        text: 'warning 消息按钮((1s后隐藏))',
        duration: 1000 // 可以自定义实现弹窗消失延迟时间
      }, () => {
        console.log('warning 消息发送成功')
      })
    }
  }
}
</script>
