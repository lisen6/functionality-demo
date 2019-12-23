<template>
  <div v-if="item.children" class="nav_container">
    <template v-if="item.children.length == 0">
      <el-menu-item :index="item.path">
        <svg-icon :icon-class="item.icon || ''" />
        {{ item.title }}
      </el-menu-item>

    </template>

    <el-submenu v-else :index="item.path">
      <template slot="title">
        <svg-icon :icon-class="item.icon || ''" />
        {{ item.title }}
      </template>

      <template v-for="child in item.children">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :key="child.path"
          :item="child"
        />
        <el-menu-item v-else :key="child.path" :index="child.path">
          <svg-icon :icon-class="child.icon || ''" />
          {{ child.title }}
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
