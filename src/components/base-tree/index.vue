<template>
  <div class="tree-box">
    <el-input
      v-if="config.isFilter"
      v-model="filterText"
      :placeholder="$t('form.placeholder.keywordsPlaceholder')" />
    <el-tree
      id="tree"
      ref="tree"
      :data="optionDatas"
      :props="{ children: 'children', label: 'name' }"
      highlight-current
      :default-expand-all="config.defaultExpandAll"
      :show-checkbox="config.showCheckbox"
      :node-key="config.nodeKey"
      :accordion="config.accordion"
      :indent="config.indent"
      :filter-node-method="filterNode"
      :current-node-key="config.currentNodeKey"
      :icon-class="config.iconClass"
      :default-expanded-keys="config.defaultExpandedKeys"
      :default-checked-keys="config.defaultCheckedKeys"
      @node-click="nodeClick"
      @check="check"
      @check-change="checkChange" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit, Watch } from 'vue-property-decorator'
import { TreeObject, Dictionary, TreeConfig } from '@/typings'
import { Tools } from '@/utils/tools'

const DEFAULT_CONFIG: TreeConfig = {
  nodeKey: 'id',
  defaultExpandAll: false,
  showCheckbox: false,
  accordion: false,
  isFilter: false,
  indent: 16,
  iconClass: '',
  currentNodeKey: '',
  defaultExpandedKeys: [],
  defaultCheckedKeys: []
}
@Component({
  name: 'base-tree'
})

/**
 * @param optionDatas = 数据源
 * @param showCheckbox = 是否可以勾选
 * @param defaultExpandedKeys = 默认展开
 * @param defaultCheckedKeys = 默认选中
 * @method nodeClick = 点击节点
 * @method check = 点击复选框
 * */
export default class App extends Vue {
  @Prop({ required: true }) optionDatas: TreeObject[]
  @Prop() treeConfig: TreeConfig

  @Watch('treeConfig', { immediate: true, deep: true })
  onSelectPropsChanged(val: Dictionary<any>, oldVal: Dictionary<any>) {
    this.config = Object.assign({}, DEFAULT_CONFIG, val)
  }
   @Watch('filterText')
  filterTextChange(val: string) {
    (this.$refs.tree as any).filter(val)
  }
  @Watch('optionDatas', { immediate: true })
   onTreeDataChange(val) {
     // 只获取子级数据
     this.treeList = Tools.withChildrenFlattenNoParent(val)
   }
  config: TreeConfig = DEFAULT_CONFIG
  filterText: string = ''
  treeList: any[] = [] // 树结构铺平后的数据

  @Emit('nodeClick')
  nodeClick(value) {
    return value
  }

  check(data, nodes) {
    const checkNodes = nodes.checkedKeys
    // 从 cehckNodes 中取出子级
    const filterNodes = checkNodes.filter((item) => this.treeList.findIndex((k) => k.id === item) > -1)

    this.$emit('check', { data, nodes, filterNodes })
  }

  checkChange(data, flag, child) {
    // console.log('data',data,'flag',flag,'child',child)
  }
  // 过滤
  filterNode(value, data) {
    if (!value) return true
    return data.name.indexOf(value) !== -1
  }
  // 获取选中的节点
  getCheckedKeys() {
    return (this.$refs.tree as any).getCheckedKeys()
  }
  // 设置选中的节点 或者清空选中节点
  setCheckedKeys(nodes: number | string[]) {
    ;(this.$refs.tree as any).setCheckedKeys(nodes)
  }
  setCurrentKey(nodeid) {
    ;(this.$refs.tree as any).setCurrentKey(nodeid)
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-tree-node__label {
  font-size: 12px;
}
/deep/.expanded + .el-tree-node__label {
  font-size: 14px;
}

</style>
