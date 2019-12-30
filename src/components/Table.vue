<template>
  <el-table
    v-bind="$attrs"
    :header-cell-style="rowChange"
    :data="tableData"
    border
    v-on="$listeners"
  >
    <template v-for="(item, index) in columns">
      <el-table-column
        v-if="!item.slot"
        :key="index"
        align="center"
        v-bind="item.attrs || {}"
      />
      <el-table-column
        v-else
        :key="index"
        align="center"
        v-bind="item.attrs || {}"
      >
        <template v-slot="scope">
          <slot :name="item.slot" :scope="scope" />
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
export default {
  name: 'Table',
  inheritAttrs: true,
  props: {
    columns: {
      required: true,
      type: Array
    },
    tableData: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      //
    }
  },
  methods: {
    rowChange({ rowIndex }) {
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
