<template>
  <div class="nav_left">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :unique-opened="false"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#1890ff"
      :router="true"
    >
      <sideBar-item v-for="menu in menuList" :key="menu.path" :item="menu" />
    </el-menu>
  </div>
</template>

<script>
import sideBarItem from './sideBarItem'
export default {
  name: 'Sidebar',
  components: {
    sideBarItem
  },
  props: {
    menuList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      //
    }
  }
}
</script>

<style lang="scss" scoped>
.nav_left /deep/{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;

  min-width: 300px !important;
  height: 100%;
  .el-menu{
    height: 100%;
    .el-menu-item{
      padding-left: 40px !important;
    }
    .el-submenu__title{
      padding-left: 40px !important;
    }
    .el-menu--inline{
      .el-menu-item{
        padding-left: 60px !important;
      }
    }
    .el-menu-item, .el-submenu__title{
      &:hover{
        background: #263445;
      }
    }
    .el-submenu{
      .is-active{
        background: #263445 !important;
      }
    }
  }
}
</style>
