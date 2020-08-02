<template>
  <div class="table_contain">
    <tablePot
      ref="tablePot"
      :columns="columns"
      :table-data="tableData"
      @upRocket="reciveRocket"
    >
      <template slot="complexItem" slot-scope="{scope}">
        {{ scope.row.complexItem }}
      </template>
      <template slot="hobby" slot-scope="{scope}">
        {{ scope.row.hobby }}
      </template>
      <template slot="operate" slot-scope="{scope}">
        <el-button @click="startUpRocket(scope)">详情</el-button>
      </template>
    </tablePot>
  </div>
</template>

<script>
import tablePot from '@/components/Table/tablePot'
// import axios from 'axios'
export default {
  name: 'Table',
  components: {
    tablePot
  },
  data() {
    return {
      tableData: [
        {
          name: '王小虎',
          age: '18',
          sex: '男',
          phone: 110,
          complexItem: '复杂',
          hobby: '打游戏'
        },
        {
          name: '虎妞',
          age: '18',
          sex: '女',
          phone: 119,
          complexItem: '简单',
          hobby: '打篮球'
        }
      ],
      columns: [
        {
          attrs: { label: '姓名', prop: 'name', width: 80 }
        },
        {
          attrs: { label: '年龄', prop: 'age' }
        },
        {
          attrs: { label: '性别', prop: 'sex' }
        },
        {
          slot: 'complexItem',
          attrs: { label: '复杂数据表头', prop: 'complexItem' }
        },
        {
          attrs: { label: '手机号', prop: 'phone' }
        },
        {
          slot: 'hobby',
          attrs: { label: '兴趣', prop: 'hobby' }
        },
        {
          slot: 'operate',
          attrs: { label: '操作', prop: 'operate' }
        }
      ],
      obj: {
        age: 123
      }
    }
  },
  methods: {
    reciveRocket() {
      console.log('我是父组件, 传给子组件的函数触发了')
    },
    startUpRocket(data) {

      // axios.get('http://localhost:80/api/search/data?userId=123').then(data => {
      //   console.log(data)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.table_contain{
  width: 800px;
}
</style>
