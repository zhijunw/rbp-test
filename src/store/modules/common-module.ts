import { Dictionary, BillStatus } from '@/typings'

export interface PermissionConfig {
  action: string[]
  page: { check: string[], edit: string[] }
  fields: { hide: string[], edit: string[] }
}

export interface CommonState {
  v_moduleData: Object
  v_activeName: string
  v_disabled: Boolean
  v_btnsAuth: Dictionary<boolean>
  v_refreshListTable: string
  v_id: string
  v_status: BillStatus
  v_pendingStatus: string
  v_turn: string
  v_permission?: PermissionConfig
  [propName: string]: any
}

const comnonModule = {
  state(): CommonState {
    return {
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
      v_permission: {
        action: [],
        page: { check: [], edit: [] },
        fields: { hide: [], edit: [] }
      }
    }
  },

  mutations: {
    SET_MODULEDATA(state: CommonState, v_moduleData: any) {
      state.v_moduleData = v_moduleData
    },
    SET_ACTIVENAME(state: CommonState, v_activeName: string) {
      state.v_activeName = v_activeName
    },
    SET_BTN_AUTH(state: CommonState, data: any) {
      state.v_btnsAuth[data.key] = data.flag
    },
    SET_READ_STATUS(state: CommonState, v_disabled: boolean) {
      state.v_disabled = v_disabled
    },
    SET_REFRESH_LIST_TABLE(state: CommonState, v_refreshListTable: string) {
      state.v_refreshListTable = v_refreshListTable
    },
    SET_PENDING_STATUS(state: CommonState, v_pendingStatus: string) {
      state.v_pendingStatus = v_pendingStatus
    },
    SET_STATUS(state: CommonState, v_state: BillStatus) {
      state.v_status = v_state
    },
    SET_ID(state: CommonState, v_id: string) {
      state.v_id = v_id
    },
    SET_TURN(state: CommonState, v_turn: string) {
      state.v_turn = v_turn
    },
    SET_TURN_BOUNDARY(state: CommonState, v_turnBoundary: string) {
      state.v_turnBoundary = v_turnBoundary
    },
    SET_BILL_STATUS(state: CommonState, v_billStatus: string) {
      state.v_billStatus = v_billStatus
    },
    SET_RESET_DETAIL(state: CommonState, resetData: string) {
      state.v_resetDetail = resetData
    },
    SET_PERMISSION(state: CommonState, permission: PermissionConfig) {
      state.v_permission = permission
    }
  },

  actions: {
    v_setBtnsAuth({ commit, state }, status: string) {
      // add新建 edit修改 0禁用 1启用 5未审核 6已审核 7反审核 8已作废
      /** 单据状态值有做改变
       * 在单据类型的模块 状态值如下
       * 0 未审核 1 已审核 -1 反审核 -5 作废 // 不用
       * 0 未审核 1 已审核 2反审核 3 作废
       * 在 启用 禁用 模块 状态值如下
       * 0 禁用 => 10, 1 启用 => 11 // 不用
       * 0 禁用 => 101, 1 启用 => 100
       *  */

      status = status + ''
      const map = new Map([
        [['add', 'edit'], ['cancel', 'save', 'import']],
        [['pendingAudit'], ['add', 'record', 'print', 'next', 'prev']],
        [['101'], ['add', 'delete', 'edit', 'enable', 'next', 'prev', 'record']],
        [['100'], ['add', 'delete', 'edit', 'disable', 'next', 'prev', 'record']],
        [['0', '2'], ['add', 'delete', 'edit', 'audit', 'next', 'prev', 'record', 'print']],
        [['1'], ['add', 'unaudit', 'invalid', 'next', 'prev', 'record', 'print']],
        [['3'], ['add', 'delete', 'restore', 'next', 'prev', 'record']],
        [['default'], ['add']]
      ])

      // 设置单据状态
      commit('SET_BILL_STATUS', status)

      let action: string[] = []
      map.forEach((value, key) => {
        // console.log('key: ', key, status)
        if (key.includes(status)) action = value
        if (!status) action = ['add']
      })
      Object.keys(state.v_btnsAuth).forEach((k) => {
        commit('SET_BTN_AUTH', {
          key: k,
          flag: action.includes(k)
        })
      })
      // 判断分页
      if (state.v_turnBoundary === 'null') {
        commit('SET_BTN_AUTH', {
          key: 'next',
          flag: false
        })
        commit('SET_BTN_AUTH', {
          key: 'prev',
          flag: false
        })
      } else if (state.v_turnBoundary !== 'all') {
        commit('SET_BTN_AUTH', {
          key: state.v_turnBoundary,
          flag: false
        })
      }
    }
  }
}

export default comnonModule
