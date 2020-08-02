<template>
  <div id="app">
    <el-container>
      <el-aside>
        <sideBar :menu-list="menuList" />
      </el-aside>
      <el-container class="conetent">
        <el-header><span>大众服务</span></el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sideBar from '@/components/SideBar/sideBar.vue'
export default {
  name: 'App',
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
          title: '自定义表格',
          path: '/table',
          children: [
            {
              title: 'render自定义表格封装',
              path: '/my-table',
              children: []
            }
          ]
        },
        {
          title: '组件封装',
          path: '/component',
          children: [
            {
              title: 'element表格封装',
              path: '/component/table',
              children: []
            },
            {
              title: '虚拟列表',
              path: '/component/virtualList',
              children: []
            },
            {
              title: '插槽',
              path: '/component/slot',
              children: []
            }, {
              title: '拖拽卡片',
              path: '/component/drag',
              children: []
            }, {
              title: '自定义封装消息',
              path: '/component/alert',
              children: []
            }, {
              title: '放大镜',
              path: '/component/magnifier',
              children: []
            }, {
              title: '日历组件',
              path: '/component/DatePicker',
              children: []
            }, {
              title: '二次封装tree组件',
              path: '/component/myTree',
              children: []
            }
          ]
        }
      ]
    }
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
