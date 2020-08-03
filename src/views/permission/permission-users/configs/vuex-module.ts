import { Vue, Component } from 'vue-property-decorator'

import { CommonState } from '@/store/modules/common-module'
@Component({})
export default class vuexMixins extends Vue {
  v_vuexStore:CommonState = {
    v_moduleData: {},
    v_activeName: 'list', // 列表和详情的切换
    v_status: '', // 页面状态
    v_id: '', // 单据ID
    v_turn: '', // 翻页
    v_billStatus: '', // 单据状态
    v_pendingStatus: '', // 审批状态
    v_turnBoundary: '', // 当前翻页的状态
    v_btnsAuth: {
      add: true, // 新建
      delete: false, // 删除
      edit: false, // 编辑
      cancel: false, // 取消
      save: false, // 保存
      audit: false, // 审核
      unaudit: false, // 反审核
      invalid: false, // 作废
      enable: false, // 启用
      disable: false, // 禁用
      restore: false, // 恢复
      next: false, // 上一页
      prev: false, // 下一页
      export: false, // 导出
      record: false, // 操作记录
      print: false, // 打印
      import: false // 导入
    },
    v_disabled: true, // 详情页 全局的 禁用
    v_refreshListTable: '', // 刷新列表
    v_resetDetail: '', // 重置详情
    v_dataSetList: [],
    v_roleList: []
  }
  created() {
    // const state = this.$store.state[this.$route.meta.moduleId]
    this.$nextTick(() => {
      // 这里是根据vuex 在用一个对象进行接受  因为用 计算属性 moduleId 变了 计算属性也会跟着变 导致后面 watch v_status 也会再次执行
      this.v_vuexStore = this.$store.state[this.$route.meta.moduleId]
    })
  }
  get m_moduleId() {
    return this.$route.meta.moduleId
  }
  get v_moduleData() {
    return this.v_vuexStore.v_moduleData
  }
  get v_activeName() {
    return this.v_vuexStore.v_activeName
  }
  get v_btnsAuth() {
    return this.v_vuexStore.v_btnsAuth
  }
  get v_disabled() {
    return this.v_vuexStore.v_disabled
  }
  get v_status() {
    return this.v_vuexStore.v_status
  }
  get v_id() {
    return this.v_vuexStore.v_id
  }
  get v_turn() {
    return this.v_vuexStore.v_turn
  }
  get v_turnBoundary() {
    return this.v_vuexStore.v_turnBoundary
  }
  get v_billStatus() {
    return this.v_vuexStore.v_billStatus
  }
  get v_pendingStatus() {
    return this.v_vuexStore.v_pendingStatus
  }
  get v_dataSetList() {
    return this.v_vuexStore.v_dataSetList
  }
  get v_roleList() {
    return this.v_vuexStore.v_roleList
  }
}
