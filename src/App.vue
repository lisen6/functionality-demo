<template>
  <div id="app">
    <el-container>
      <el-aside>
        <sideBar :menuList="menuList"/>
      </el-aside>
      <el-container class="conetent">
        <el-header><span>大众服务</span></el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sideBar from '@/components/sideBar/sideBar.vue'
export default {
  name: 'app',
  components: {
    sideBar
  },
  provide() {
    return {
      app: this
    }
  },
  data() {
    return {
      menuList: [
        {
          title: '表格封装',
          path: '/table',
          children: [
            {
              title: 'element表格封装',
              path: '/table',
              children: []
            },
            {
              title: '自定义表格封装',
              path: '/my-table',
              children: []
            }
          ]
        },
        {
          title: '组件Form表单',
          path: '/form',
          children: []
        },
        {
          title: '虚拟列表',
          path: '/VirtualList',
          children: []
        },
        {
          title: '插槽',
          path: '/Slot',
          children: []
        },{
          title: '输入框',
          path: '/myInput',
          children: []
        },{
          title: '自定义封装消息',
          path: '/alert',
          children: []
        }
      ]
    };
  }
}
</script>

<style lang="scss" scoped>
.el-header /deep/{
  line-height: 70px;
  height: 70px !important;
  color: #333;
  font-size: 20px;
  font-weight: 700;
  box-shadow: 0px 2px 40px 0px rgba(0,0,0,0.1);
  span {
    margin-left: 74px;
  }
}
</style>
