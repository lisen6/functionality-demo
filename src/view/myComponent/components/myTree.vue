<template>
  <div>
    <myTree
      :data.sync="data"
      :file-drop="fileDrop"
      :dictionary-drop="dictionaryDrop"
      :delete-fn="deleteFn"
      :rename="rename"
    />
  </div>
</template>

<script>
import myTree from '@/components/MyTree/myTree'
export default {
  components: {
    myTree
  },
  data() {
    return {
      data: [],
      fileDrop: [
        { type: 'rm', value: '删除文件' }
      ],
      dictionaryDrop: [
        { type: 'rm', value: '删除文件' },
        { type: 'rn', value: '修改名称' }
      ]
    }
  },
  mounted() {
    this.data = [
      {
        name: '文件夹1', pid: 0, id: 1
      }, {
        name: '文件夹2', pid: 0, id: 2
      }, {
        name: '文件夹3', pid: 0, id: 3
      }, {
        name: '文件夹1-1', pid: 1, id: 4
      }, {
        name: '文件夹2-1', pid: 2, id: 5
      }, {
        name: '文件1', pid: 1, id: 10001
      }, {
        name: '文件2', pid: 1, id: 10002
      }, {
        name: '文件2-1', pid: 2, id: 10003
      }, {
        name: '文件2-2', pid: 2, id: 10004
      }, {
        name: '文件1-1-1', pid: 4, id: 10005
      }, {
        name: '文件2-1-1', pid: 5, id: 10006
      }
    ]
  },
  methods: {
    deleteFn(data) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 3000)
      })
    },
    rename(data) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        })
      })
    }
  }
}
</script>

<style>

</style>
