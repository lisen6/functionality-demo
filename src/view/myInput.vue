<template>
  <div class="content_contain">
    <div ref="contentBox" class="contentBox" contenteditable="true" placeholder="请输入内容..." /><br>
    <el-button @click="send">点击查看内容</el-button>
    <p class="text_flow">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'MyInput',
  data() {
    return {
      text: ''
    }
  },
  methods: {
    send() {
      this.text = this.$refs.contentBox.textContent
    }
  }
}
</script>

<style lang="scss" scoped>
.content_contain{
  .contentBox{
    width: 300px;
    height: 300px;
    border: 1px solid black;
    min-height:150px;
    max-height:300px;
    overflow: auto;
    font-size: 14px;
    outline: none;
  }
  .contentBox:empty:before {
    content: attr(placeholder);
    color: #bbb;
  }
  .text_flow {
    // width: 200px;
    // @include ellipsis(1)
  }
}

</style>
