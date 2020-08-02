<template>
  <el-tree
    :data="AllData"
    default-expand-all
    :expand-on-click-node="false"
    :render-content="render"
  />
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    fileDrop: {
      type: Array,
      default: () => []
    },
    dictionaryDrop: {
      type: Array,
      default: () => []
    },
    deleteFn: {
      type: Function,
      default: () => []
    }
  },
  data() {
    return {
      AllData: [],
      currentId: '',
      currentContent: ''
    }
  },
  watch: {
    data() {
      this.trasnformData()
    }
  },
  mounted() {
    this.trasnformData()
  },
  methods: {
    isParent(data) {
      return data.type === 'parent'
    },
    remove(id) {
      const list = JSON.parse(JSON.stringify(this.data))
      const result = list.filter(item => item.id !== id)
      this.$emit('update:data', result)
      this.$message({
        type: 'success',
        message: '删除成功'
      })
    },
    handleRemove(data) {
      this.$confirm(`此操作将永久删除该文件,${data.name} 是否继续?`, '确定', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteFn ? this.deleteFn(data.id).then(res => {
          this.remove(data.id)
        }) : this.remove(data.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleRename(data) {
      this.currentId = data.id
      this.currentContent = data.name
    },
    handleCommand(data, type) {
      if (type === 'rm') {
        this.handleRemove(data)
      } else if (type === 'rn') {
        this.handleRename(data)
      }
    },
    handleInput(value) {
      this.currentContent = value
    },
    save(data) {
      const list = JSON.parse(JSON.stringify(this.data))
      const result = list.find(item => item.id === data.id)
      result.name = this.currentContent
      this.currentId = ''
      this.$emit('update:data', list)
      this.$message({
        type: 'success',
        message: '修改成功'
      })
    },
    cancel() {
      this.currentId = ''
    },
    render(h, { node, data, store }) {
      const list = this.isParent(data) ? this.dictionaryDrop : this.fileDrop
      return (<div style={{ width: '100%' }}>
        {
          this.isParent(data)
            ? node.expanded
              ? <i class='el-icon-folder-opened'/> : <i class='el-icon-folder'/> : <i class='el-icon-document'/>
        }
        {
          data.id === this.currentId ? <el-input value={this.currentContent} on-input={this.handleInput}/> : data.name
        }

        {
          data.id !== this.currentId ? <el-dropdown placement='bottom-start' trigger='click' on-command={this.handleCommand.bind(this, data)}>
            <span class='el-dropdown-link'>
              <i class='el-icon-arrow-down el-icon--right'></i>
            </span>
            <el-dropdown-menu slot='dropdown'>
              {
                list.map(item => {
                  return <el-dropdown-item command={item.type}>{item.value}</el-dropdown-item>
                })
              }
            </el-dropdown-menu>
          </el-dropdown> : <span>
            <el-button type='text' on-click={this.save.bind(this, data)}>确定</el-button>
            <el-button type='text' on-click={this.cancel}>取消</el-button>
          </span>
        }
      </div>)
    },
    trasnformData() {
      const data = JSON.parse(JSON.stringify(this.data))
      const treeList = data.reduce((prev, next) => {
        prev[next['id']] = next
        return prev
      }, {})
      const result = data.reduce((prev, next) => {
        const pid = next.pid
        const parent = treeList[pid]
        if (parent) {
          parent.type = 'parent'
          parent.children ? parent.children.push(next) : parent.children = [next]
        } else if (pid === 0) {
          prev.push(next)
        }
        return prev
      }, [])
      this.AllData = result
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tree /deep/{
  width: 30%;
  margin-top: 25px;
  .el-tree-node__content {
    margin: 2px 0
  }
  .el-input__inner{
    height: 30px;
    line-height: 30px;
  }
  .el-dropdown {
    float: right;
  }
}

</style>
