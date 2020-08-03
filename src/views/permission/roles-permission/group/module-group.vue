<template>
  <div class="module-group">
    <slot name="title" />
    <div class="operation">
      <span class="f14 mgr-20">{{ $t(operateAllText) }}</span>
      <base-checkbox
        :checkGroupList="overOperationBtn"
        :checkList.sync="allOperationChoose"
        :selectProps="{ isLine: true }"
        :disabled="disabled"
        @handleCheckAllChange="handleCheckAllChange"
        @checkedCurrentChange="checkedCurrentChange" />
    </div>
    <div class="box">
      <div class="box__left">
        <el-input
          v-model="filterText"
          :placeholder="$t('form.placeholder.input', { msg: '' })"
          :disabled="disabled"
          size="small" />
        <el-checkbox
          v-model="checkedAllList"
          class="mgt-18"
          :disabled="disabled"
          @change="checkAllTree">
          {{ $t('commonWord.allSelect') }}
        </el-checkbox>
        <el-tree
          ref="tree"
          v-loading="treeLoading"
          :data="treeData"
          :props="defaultProps"
          show-checkbox
          highlight-current
          default-expand-all
          :disabled="disabled"
          :default-checked-keys="checkedKeys"
          node-key="id"
          class="mgt-8"
          @node-click="nodeClick"
          @check="checkedMoudle" />
      </div>
      <div class="box__right pdall-16">
        <!-- <div
          v-for="item in moduleId"
          :key="item"
          class="permission-group-warrper">
          <permission-group
            v-if="item === currentModule.id"
            :currentMoudleData="currentModule"
            :disabled="disabled"
            :page="currentTabsData.page"
            :operation="currentTabsData.operation"
            :fields="currentTabsData.fields" />
        </div> -->
        <permission-group
          :currentMoudleData="currentModule"
          :disabled="disabled"
          :page="currentTabsData.page"
          :operation="currentTabsData.operation"
          :fields="currentTabsData.fields" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import Vue from 'vue'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import { Watch, Prop } from 'vue-property-decorator'
import apiUrl from '@/api/permission/roles'
import { Dictionary } from '@/typings'
import { Tools } from '@/utils/tools'
import { nest, isInCountByPow } from '@/utils/index'
import VipDialog from '../../../../layout-components/vip-dialog/index.vue'
interface currentModuleConfig {
  label: string
  id: string
}
@Component({
  name: 'module-group',
  components: {
    baseCheckbox: () => import('@/components/base-checkbox/index.vue'),
    permissionGroup: () => import('./permission-group.vue')
  }
})
export default class moduleGroup extends mixins(vuexMixins) {
  operateAllText: string = 'rolesPermission.detailTabs.moduleTab.operateAll'
  overOperationBtn:Dictionary = []
  permissionSetConfig:Dictionary = {}
  currentModule: currentModuleConfig = {
    label: '',
    id: ''
  }
  allOperationChoose: string[] = []
  filterText: string = ''
  checkedKeys: any[] = []
  treeId: string[] = [] // 树的最后一级（即可操作项）
  moduleId: any[] = [] // treeId每项对应的moduleId，树id不是模块id
  chooseTreeNode: string[] = []
  checkedAllList: boolean = false
  treeLoading: boolean = false
  defaultProps = {
    children: 'children',
    label: 'name'
  }
  treeData: any[] = []

  @Prop({ default: false }) disabled: boolean
  @Prop({ default: [] }) moduleData: any[]
  @Prop({ default: [] }) treeCheckData: any[]

  get currentTabsData() {
    return this.permissionSetConfig[this.currentModule.id] || {}
  }
  @Watch('v_id', { immediate: true })
  async onRolesDetailIdChanged(val) {
    this.getRoleAuthority(val.split('_')[0])
  }

  @Watch('chooseTreeNode', { deep: true })
  onChooseTreeNode(val) {
    this.checkedAllList = val.length === this.treeId.length // 树的全选按钮状态
  }

  @Watch('filterText')
  onFilterTextChange(val) {
    ;(this.$refs.tree as any).filter(val)
  }

  @Watch('treeData')
  onTreeDataChange(val) {
    const treeList = Tools.withChildrenFlattenNoParent(val)
    this.treeId = treeList.map((k) => k.id) // 最后一级（即可操作项）
    this.moduleId = treeList.map((k) => k.moduleId).filter((item) => item) // 每项对应的moduleId，树id不是模块id
  }
  @Watch('disabled')
  OnDisabledChange(val) {
    this.addTreeDataAttr(this.treeData, val)
  }
  async getRoleAuthority(val) {
    const isEdit = this.v_status !== 'detail' && this.v_id === ''
    const url = isEdit ? apiUrl.getModuleOptions : apiUrl.getEditAuthority + val
    const res = await this._get({
      url: url
    })

    if (res.code === 0) {
      const treeCheckData = isEdit ? [] : res.data.moduleAuthResp
      const moduleData = isEdit ? res.data : res.data.moduleAuthority
      this.checkedKeys = treeCheckData.map((item) => item.id)
      this.chooseTreeNode = treeCheckData.map((item) => item.moduleId)
      this.formatRoleAuthority(moduleData)
    }
  }
  /**
   * 格式化角色模块数据
   * @val 原始数据
   */
  // @Watch('moduleData', { deep: true })
  formatRoleAuthority(val) {
    const unFormatData = val // 未格式化的数据
    const formatResult = {} // 格式化后的数据
    // console.log('unFormatData:', unFormatData)

    unFormatData.forEach(e => {
      const authority = e.authority || []

      // 使用单例设计模式，确保每个moduleId对象只被初始化一次
      if (formatResult[e.moduleId] === undefined) {
        formatResult[e.moduleId] = {}
      }

      if (e.type === 'Page') {
        // 页面权限
        const List: Dictionary[] = []

        authority.forEach(item => {
          // const name = item.key
          // const key = item.key
          const authValue = item.authValue || []
          const operateList: object[] = []
          let choose: number[] = []
          const value = item.value

          authValue.forEach(val => {
            operateList.push({
              label: val.name,
              value: val.value
            })
          })

          if (value === null) {
            // 全部没选
            choose = []
          } else {
            operateList.forEach((o: Dictionary) => {
              if (value === -1) {
                // 全选
                choose.push(o.value)
              } else {
                // 部分选择
                if (isInCountByPow(value, o.value)) {
                  choose.push(o.value)
                }
              }
            })
          }
          List.push({
            name: item.key,
            key: item.key,
            authValue: operateList,
            choose: choose
          })
        })
        formatResult[e.moduleId]['page'] = List
      } else if (e.type === 'Action') {
        // 操作权限
        const list: Dictionary = []
        const choose: Dictionary = []
        const findAll = authority.find(v => v.key === 'all')
        const findAllIndex = authority.findIndex(v => v.key === 'all')

        if (findAll && findAll.value === -1) {
          // 全选
          // 并且值为-1，才表示全选了
          authority.forEach(v => {
            if (v.key !== 'all') {
              choose.push(v.key)
            }
          })
        } else {
          // 非全选
          authority.forEach(v => {
            if (v.key !== 'all') {
              if (v.value === 1) {
                // 除开‘全部’，值为1表示勾选 = =
                choose.push(v.key)
              }
            }
          })
        }
        authority.forEach(v => {
          if (v.key !== 'all') {
            list.push({
              label: v.name,
              value: v.key
            })
          }
        })

        formatResult[e.moduleId]['operation'] = {
          list: list,
          choose: choose
        }
      } else if (e.type === 'Field') {
        // 字段权限
        const list: Dictionary[] = []
        const data: Dictionary[] = []

        // 暂时取第一条的操作列作为全局的列
        const operateList = (authority && authority[0] && authority[0].authValue) || []
        operateList.forEach((o: Dictionary) => {
          list.push({
            label: o.name,
            value: o.key,
            authValue: o.value
          })
        })

        authority.forEach((val, index) => {
          const authValue = val.authValue || []
          const value = val.value
          const dataItem: Dictionary = {
            index: index + 1,
            id: val.key,
            name: val.key
          }

          authValue.forEach(o => {
            dataItem[o.key] = !!isInCountByPow(value, o.value)
            dataItem[o.key + '_value'] = o.value
          })
          data.push(dataItem)
        })

        formatResult[e.moduleId]['fields'] = {
          list: list,
          data: data
        }
      }
    })

    this.permissionSetConfig = formatResult
  }

  /**
   * 格式化成保存的数据
   */
  async created() {
    // await this.getModuleInfo()
    await this.getModuleTree()
  }
  async getModuleTree() {
    this.treeLoading = true
    const res = await this._get({ url: apiUrl.getModuleTree })
    if (res.code === 0) {
      const { moduleTreeStructure, globalAuthority } = res.data

      this.treeData = nest(moduleTreeStructure, 0, 'parentId', false)

      this.overOperationBtn = globalAuthority.filter(e => e.key !== 'all').map((e) => {
        return {
          label: e.name,
          value: e.key
        }
      })

      this.addTreeDataAttr(this.treeData, this.disabled)
    }
    this.treeLoading = false
  }
  addTreeDataAttr(arr, attr) {
    arr.forEach((k) => {
      this.$set(k, 'disabled', attr)
      if (k.children && k.children.length) {
        this.addTreeDataAttr(k.children, attr)
      }
    })
  }
  // 获取模块下面的所有信息
  async getModuleInfo() {
    const res = await this._get({ url: `${apiUrl.getModuleOptions}` })
    const permissionSetConfig: any = {}
    if (res.code === 0) {
      const data = res.data
      data.forEach((item) => {
        permissionSetConfig[item.moduleId] = permissionSetConfig[item.moduleId] || {}
        if (item.type === 'Action') {
          Object.assign(permissionSetConfig[item.moduleId],
            {
              'operation': {
                choose: [],
                list: item.authority.map((operation) => {
                  return {
                    label: operation.name,
                    value: operation.key
                  }
                })
              }
            })
        }
        if (item.type === 'Page') {
          this.setValue(item.authority)
          Object.assign(permissionSetConfig[item.moduleId],
            {
              'page': item.authority
            })
        }
        if (item.type === 'Field') {
          Object.assign(permissionSetConfig[item.moduleId],
            {
              'fields': this.setFields(item.authority)
            })
        }
      })
      this.permissionSetConfig = permissionSetConfig
    }
  }

  async setPermissionValue(arr) {
    await this.$nextTick()
    arr.forEach((item) => {
      if (this.permissionSetConfig[item.moduleId]) {
        if (item.type === 'Action') {
          this.$set(this.permissionSetConfig[item.moduleId].operation, 'choose', item.authority.map((item) => item.key))
          console.log(this.permissionSetConfig[item.moduleId])
        }
        if (item.type === 'Page') {
          item.authority.forEach((children) => {
            const pageIndex = this.permissionSetConfig[item.moduleId].page.findIndex((page) => page.key === children.key)
            children.authValue.forEach((auth) => {
              if (children.value === -1) {
                this.permissionSetConfig[item.moduleId].page[pageIndex].choose.push(auth.value)
              } else {
                if (isInCountByPow(children.value, auth.value)) {
                  this.permissionSetConfig[item.moduleId].page[pageIndex].choose.push(auth.value)
                }
              }
            })
          })
        }
        if (item.type === 'Field') {
          item.authority.forEach((val, index) => {
            const authValue = val.authValue
            const dataItem: Dictionary = {
              index: index + 1,
              id: val.key,
              name: val.key
            }
            authValue.forEach(o => {
              dataItem[o.key] = !!isInCountByPow(val.value, o.value)
            })
            this.permissionSetConfig[item.moduleId].fields.data.push(dataItem)
          })
        }
      }
    })
  }
  setValue(arr) {
    arr.forEach(e => {
      e.value = e.key
      e.name = e.name || e.key
      e.choose = []
      if (e.hasOwnProperty('authValue')) {
        e.authValue.forEach((item) => {
          item.label = item.name
          item.value = item.key
        })
      }
    })
  }
  setFields(fields) {
    const fieldsColumn: any[] = []
    const fieldsData: any[] = []
    fields.forEach((item, index) => {
      if (item.authValue) {
        // fieldsData.push({ name: item.key, id: item.key, index: index + 1 })
        item.authValue.forEach((fields) => {
          const columnIndex = fieldsColumn.findIndex((column) => column.value === fields.key)

          // Object.assign(fieldsData[index], { [fields.key]: false })

          if (columnIndex === -1) fieldsColumn.push({ label: fields.name, value: fields.key, authValue: fields.value })
        })
      }
    })
    return {
      list: fieldsColumn,
      data: fieldsData
    }
  }
  // 保存的时候格式化数据
  getModuleAction() {
    const filterPermission: any = {}
    for (const k of this.chooseTreeNode) {
      if (this.permissionSetConfig[k]) filterPermission[k] = this.permissionSetConfig[k]
    }
    const chooseModuleData: any[] = []
    Object.keys(filterPermission).forEach((item) => {
      for (const keys in filterPermission[item]) {
        if (keys === 'page') {
          chooseModuleData.push({
            type: 'Page',
            moduleId: item,
            authority: this.formatPageData(filterPermission[item][keys])
          })
        }
        if (keys === 'operation') {
          chooseModuleData.push({
            type: 'Action',
            moduleId: item,
            authority: this.formatMoudleAction(filterPermission[item][keys])
          })
        }
        if (keys === 'fields') {
          chooseModuleData.push({
            type: 'Field',
            moduleId: item,
            authority: this.formatMoudleFields(filterPermission[item][keys])
          })
        }
      }
    })
    return chooseModuleData
  }
  // 格式化页面权限的数据
  formatPageData(currModuleItem) {
    return currModuleItem.map(o => {
      const choose = o.choose
      const operateList = o.authValue
      const value: number = operateList.length > 0 && operateList.length === choose.length ? -1 : choose.reduce((next, prev) => {
        return next + prev
      }, 0)
      return {
        key: o.key,
        value: value
      }
    })
  }
  // 格式化权限操作的数据
  formatMoudleAction(currModuleItem) {
    // let authority: any[] = []
    const currList = currModuleItem.list
    const currChoose = currModuleItem.choose
    // if (currList.length > 0 && currList.length === currChoose.length) {
    //   // 全选
    //   authority = [{
    //     key: 'all',
    //     value: -1
    //   }]
    // } else {
    //   // 非全选
    //   authority = currChoose.map(o => {
    //     return {
    //       key: o,
    //       value: 1
    //     }
    //   })
    // }
    // return authority

    return currChoose.map(o => {
      return {
        key: o,
        value: 1
      }
    })
  }
  // 格式化字段权限的数据
  formatMoudleFields(currModuleItem) {
    // 字段权限
    const list = currModuleItem.list || []
    const data = currModuleItem.data || []
    return data.map((item) => {
      let total = 0
      Object.keys(item).forEach((keys) => {
        var obj = list.find((column) => column.value === keys && item[keys])
        if (obj) total += obj.authValue
      })
      return {
        keys: item.id,
        value: total
      }
    })
  }

  // 根据匹配文字过滤路由树节点
  filterNode(value, data) {
    if (!value) return true
    return data.name.indexOf(value) !== -1
  }

  // 选择当前 tab
  async nodeClick(data) {
    if (data.children && data.children.length > 0) return

    this.currentModule = {
      label: data.name,
      id: data.moduleId
    }
  }

  // 选择树节点的事件
  checkAllTree(flag) {
    this.checkedKeys = flag ? this.treeId : []
    // 仅仅只是让树的复选框渲染钩上了，实际并不会触发check方法
    ;(this.$refs.tree as any).setCheckedKeys(this.checkedKeys)
    this.chooseTreeNode = flag ? this.moduleId : []
  }

  // 树单例选框勾选事件
  checkedMoudle(data, val) {
    this.chooseTreeNode = val.checkedNodes.filter((item) => !item.children).map((k) => k.moduleId)
  }

  // 重置树
  resetChecked() {
    (this.$refs.tree as any).setCheckedKeys([])
  }

  /**
   *  重置全局操作设置
   */
  resetOperate() {
    this.allOperationChoose = []
  }

  // 全局按钮组操作的全选 和 非全选
  handleCheckAllChange(flag) {
    console.log('handleCheckAllChange falg', flag)
    for (const k in this.permissionSetConfig) {
      const operation = this.permissionSetConfig[k].operation
      operation.choose = flag ? operation.list.map((k) => k.value) : []
    }
  }

  // 全局按钮的选择
  checkedCurrentChange({ val, current }) {
    for (const k in this.permissionSetConfig) {
      const operation = this.permissionSetConfig[k].operation
      const index = operation.list.findIndex((k) => k.value === current)

      if (index > -1) {
        val
          ? operation.choose.push(current)
          : operation.choose.splice(operation.choose.indexOf(current), 1)
      }
    }
  }

  /**
   * 获得模块树状信息和操作权限列表
  */
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.module-group {
  .operation {
    display: flex;
    align-items: center;
    white-space: nowrap;
    background: $baseTableBg;
    height: 42px;

    padding: 0 8px;
  }
  .box {
    display: flex;
    min-height: calc(100vh - 254px);
    padding: 0 8px 8px 8px;
    background: $baseTableBg;
    &__left {
      min-width: 140px;
      margin-right: 2px;
      box-shadow: -1px 0px 0px 0px rgba(238, 238, 238, 1);
      padding: 8px;
      background: #fff;
      border-radius: 2px 0px 0px 2px;
      /deep/.el-tree-node__label {
        font-size: 12px;
      }
    }
    &__right {
      flex: 1;
      background: #fff;
      border-radius: 0px 2px 2px 0px;
    }
  }
}
</style>
