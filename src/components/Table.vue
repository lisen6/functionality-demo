<template>
  <el-table
    v-bind="$attrs"
    v-on="$listeners"
    :header-cell-style="rowChange"
    :data="tableData"
    border>
    <template v-for="(item, index) in columns">
      <el-table-column
        v-if="!item.slot"
        :key="index"
        align="center"
        v-bind="item.attrs || {}">
      </el-table-column>
      <el-table-column
        v-else
        :key="index"
        align="center"
        v-bind="item.attrs || {}">
        <template v-slot="scope">
          <slot :name="item.slot" :scope="scope"/>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
    name: "table",
    props: {
      columns: {
        required: true,
        type: Array
      },
      tableData: {
        required: true
      }
    },
    inheritAttrs: true,
    data() {
        return {
            //
        }
    },
    methods: {
      rowChange({rowIndex}) {
        if (rowIndex === 0) {
          return 'background:rgba(242,242,242,1);'
        }
      },
      getSlots() {
        console.log(this.$slots.default)
      }
    }
}
</script>

<style lang="scss" scoped>

</style>
