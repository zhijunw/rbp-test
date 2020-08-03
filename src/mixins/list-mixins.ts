import { Vue, Component, Watch } from 'vue-property-decorator'
import {
  PageObj,
  DrawerConfig,
  ListComponentsConfig,
  ListBtnApiConfig,
  Dictionary,
  ListResponse, TableHeaderConfig
} from '@/typings'
import commonApiUrl from '@/api/common-api'
import { _downaxios, _downUrl } from '@/api/apiConfig'

import { to } from '@/utils'
interface ErrorData {
  failList: any[]
  succcessList: any[]
}
/** 单据状态值有做改变
 * 在单据类型的模块 状态值如下
 * 0 未审核 1 已审核 -1 反审核 -5 作废 (旧版)
 * 0 未审核 1 已审核 2反审核 3 作废
 * 在 启用 禁用 模块 状态值如下
 * 0 启用 => 10,100, 1 禁用 => 11, 101
 *  */
const statusMap = new Map<any, string[]>([
  [0, ['unaudit', 'danger']],
  [1, ['audit', 'success']],
  [2, ['reverseAudit', 'warning']],
  [3, ['invalid', 'invalid']],
  [100, ['enable', 'success']],
  [101, ['disable', 'invalid']],
  ['default', []]
])
/**
 * 工作流类型 1审核工作流 2反审核工作流 3作废工作流
 * 审批状态 0初始化 1待审核 2审批中 3已驳回 4已通过
 */
const activityStatusMap = new Map([
  ['1-1', 'regular'], // 审核工作流 待审核
  ['1-2', 'regular'], // 同上
  ['2-1', 'warning'], // 反审核工作流 待审核
  ['2-2', 'warning'], // 同上
  ['2-3', 'danger'], //  驳回
  ['1-3', 'danger'], // 驳回
  ['2-4', 'success'], // 通过
  ['1-4', 'success'] // 通过
])
interface QueryConfig {
  args?: any
  from?: string
}
@Component({
  components: {
    inform: () => import('@/components/base-inform/src/inform.vue')
  }
})
export default class listMixins extends Vue {
  m_page: PageObj = {
    total: 0,
    pageNo: 1,
    pageSize: 25,
    pageCount: 1
  }
  m_currentIndex: number = 0 // 当前行项目的 index
  m_inputValue: any // 列表页搜索框
  m_inputValueType:any // 列表页搜索类型
  m_selectData: any[] = [] // 存储选择数据
  listApi: string // 列表接口地址
  deleteItemApi: string // 删除接口
  listConfig: ListComponentsConfig // 列表配置项
  m_drawerObj: DrawerConfig = {
    isShowDrawer: false
  } // 筛选弹窗配置
  routeName: string = ''
  // m_moduleName: string // 当前模块名称
  m_tableData: any[] = [] // 列表数据
  m_errorIds: string[] = [] // 错误集合
  formData: Dictionary // 筛选条件数据
  m_modelRelationList: Dictionary = { // 关联模块列表
    moduleList: [],
    formList: [],
    webList: []
  }
  m_tableLoading: boolean = false
  listOtherDate:object = {}
  m_tableHeader: TableHeaderConfig[] = []
  m_totalData: any = {}// 合计
  // 观察列表的刷新
  @Watch('v_refreshListTable')
  onv_refreshListTable(val) {
    console.log('v_refreshListTable', val)
    if (val) {
      this.m_query()
    }
  }

  // 观察上一页下一页的动作
  @Watch('v_turn')
  onTurnChange(val: string) {
    if (val) {
      const action = val.split('_')[0]
      action === 'prev' ? this.m_prevFn() : this.m_nextFn()
    }
  }
  pointTimer:any = null

  activated() {
    this.m_routeChangeEvent()
  }
  get m_moduleName() {
    return this.$route.meta.moduleId
  }
  m_routeChangeEvent() {
    const params = this.$route.params
    if (params.id && this.$route.name === params.routeName) {
      this.m_viewDetail(params)
      this.$store.commit('tagsView/SET_RELATIONNAME', '')
    }
  }

  // 设置关联模块内容
  async m_setModelRelation(url, id) {
    // TODO: id后续改成动态的
    const res = await this._get({
      url: url + id
    })

    if (res.code === 0) {
      const data = res.data
      const modelRelationList = this.m_modelRelationList
      // type 1 => 相关模块 2 => 相关报表  3,4 => 内链 外链
      for (const o of data) {
        if (o.type === 1) {
          modelRelationList.moduleList.push(o)
        } else if (o.type === 2) {
          modelRelationList.formList.push(o)
        } else if (o.type === 3 || o.type === 4) {
          modelRelationList.webList.push(o)
          // if (o.type === 3) {
          //   modelRelationList.webList.push({
          //     title: 'vue.js',
          //     type: 3,
          //     content: 'https://cn.vuejs.org'
          //   })
          // }
        }
      }
    }
  }

  m_add() {
    console.log('新增')
    const status = this.$store.state[this.m_moduleName].v_status
    if (['edit'].includes(status)) {
      this._confirm({ content: this.$t('dialogPrompt.cancel') })
        .then(() => {
          this.m_addFn()
        })
        .catch(() => {
          return false
        })
    } else {
      this.m_addFn()
    }
  }
  // 上一步
  m_prevFn() {
    const _row = this.m_tableData[this.m_currentIndex - 1]
    this.m_viewDetail(_row)
    ;(this.$refs.listTable as any).setHighLightRow(_row) // 高亮当前行
  }
  // 下一步
  m_nextFn() {
    const _row = this.m_tableData[this.m_currentIndex + 1]
    this.m_viewDetail(_row)
    ;(this.$refs.listTable as any).setHighLightRow(_row) // 高亮当前行
  }
  m_addFn() {
    /**
     * 1 把页面切换到详情
     * 2 把当前状态设置为 add
     * 3 把按钮组状态设置为 add
     * 4 页面设置可写
     * 5.重置详情数据
     */
    this.$store.commit(`${this.m_moduleName}/SET_ACTIVENAME`, 'detail')
    this.$store.commit(`${this.m_moduleName}/SET_ID`, '')
    this.$store.commit(`${this.m_moduleName}/SET_STATUS`, 'add')
    this.$store.dispatch(`${this.m_moduleName}/v_setBtnsAuth`, 'add')
    // this.$store.commit(`${this.m_moduleName}/SET_ACTIVENAME`, 'detail')
    this.$store.commit(`${this.m_moduleName}/SET_READ_STATUS`, false)
    this.$store.commit(`${this.m_moduleName}/SET_RESET_DETAIL`, new Date().getTime())
    this.$store.commit(`${this.m_moduleName}/SET_ID`, '')
  }
  async m_batchAudit(config: ListBtnApiConfig) {
    /**
     * TODO:
     * 这一部分相同逻辑的代码可抽离 可优化
     */
    if (this.infoFun()) {
      const res = await this._put({
        url: config.apiUrl!,
        data: { data: this.m_selectData }
      })
      if (res.code === 0) {
        if (!res.data.failList || !res.data.failList.length) {
          this.m_dealSuccessAction(config.name!)
        } else {
          this.m_error(res.data, config.name!)
        }
      }
    }
  }

  // 禁用
  async m_batchDisable(config: ListBtnApiConfig) {
    /**
     * TODO:
     * 这一部分相同逻辑的代码可抽离 可优化
     */
    if (this.infoFun()) {
      const res = await this._put({
        url: config.apiUrl!,
        data: { data: this.m_selectData }
      })
      if (res.code === 0) {
        if (res.data.failList.length > 0) {
          this.m_error(res.data, config.name!)
        } else {
          this.m_dealSuccessAction(config.name!)
        }
      }
    }
  }

  infoFun() {
    if (!this.m_selectData.length) {
      this._message({ message: this.$t('commonWord.noDataWarning'), type: 'warning' })
      return false
    }
    return true
  }
  // 处理操作成功之后的逻辑
  m_dealSuccessAction(name: any) {
    // this._message({ message: `${name}成功`, type: 'success' })
    this._message({
      message: this.$t('commonWord.actionSuccess', { action: this.$t(name) }),
      type: 'success'
    })

    this.m_selectData = []
    this.$store.commit(`${this.m_moduleName}/SET_REFRESH_LIST_TABLE`, new Date().getTime())
  }
  // 导入
  m_batchImport() {
    (this.$refs.upload as any).open()
  }
  // 批量导出
  async m_batchExport(e) {
    const queryObj = { keyword: this.m_inputValue }
    const queryData = Object.assign(
      {},
      queryObj,
      this.formData,
      this.m_formatDateTime()
    )
    if (this.pointTimer) return // 防止快速操作
    try {
      const res = await this._post({ url: commonApiUrl.batchExport, data: {
        data: {
          moduleId: this.m_moduleName,
          queryParam: JSON.stringify(queryData),
          type: 'batchVertical'
        }
      }})
      if (res.code === 0) {
        if (e.$points) {
          const points = e.$points.children[e.$points.children.length - 1]
          points.classList.add('move')
          this.pointTimer = setTimeout(() => {
            points.classList.remove('move')
            clearTimeout(this.pointTimer)
            this.pointTimer = null
          }, 990)
        }
        this._message({ message: '创建任务成功', type: 'success' })
      }
    } catch (err) {
      // this.$throw(err)
      console.log('err', err)
    }
  }
  // 下载样式表文件
  async m_downLoadExcel() {
    try {
      await _downUrl({ url: commonApiUrl.getImportModel, params: {
        moduleId: this.m_moduleName,
        type: 'batchVertical'
      }, fileName: '样式模板文件.xlsx' })
    } catch (err) {
      // this.$throw(err)
      console.log('err', err)
    }
  }
  // 启用
  async m_batchEnable(config: ListBtnApiConfig) {
    // console.log('config: ', config)
    /**
     * TODO:
     * 这一部分相同逻辑的代码可抽离 可优化
     */
    if (this.infoFun()) {
      const res = await this._put({
        url: config.apiUrl!,
        data: { data: this.m_selectData }
      })
      if (res.code === 0) {
        if (!res.data.failList || !res.data.failList.length) {
          this.m_dealSuccessAction(config.name!)
        } else {
          this.m_error(res.data, config.name!)
        }
      }
    }
  }
  m_batchInvalid() {}
  m_batchUnaudit() {}
  // 错误报告
  m_error(data:ErrorData, name: string) {
    const { failList, succcessList } = data
    const calculator = failList.length + succcessList.length
    const failListMsg = failList.map((val) => {
      return `<p>${val.id}：${val.message}，${this.$t(name)}${this.$t('batchErrorMsg.fail')}</p>`
    })
    this.$vInform({
      type: 'error',
      content: `一共${this.$t(name)}${calculator}条记录，其中<span style="color:#23C811">${this.$t(
        'batchErrorMsg.success'
      )}</span>${succcessList.length}条，<span style="color:#FA4150">${this.$t(
        'batchErrorMsg.fail'
      )}</span>${failList.length}条`,
      detail: `${failListMsg.join(',').replace(/,/g, '')}`
    })
    this.m_errorIds = failList.map((val) => val.id)
  }
  // 打开筛选弹窗
  m_filter() {
    this.m_drawerObj.isShowDrawer = true
  }
  // 重置
  m_reset() {
    this.formData = { channelIdList: [], goodsIdList: [], supplierIds: [] }
    // 确定这里是否需要去查询
    // this.m_query()
  }
  m_select({ section, formatSection }) {
    //  section 是元数据  formatSection 是根据 id 格式化的一个数组
    /**
     * TODO:
     * 这里先 默认用 formatSection 的数据 如果有特殊的 可以在某个功能的 按钮组下面配置参数
     */
    // console.log('section: ', section, formatSection)
    this.m_selectData = formatSection
  }
  // 切换页数
  m_changePage(page: number) {
    this.m_page.pageNo = page
    this.m_query()
  }
  // 切换条数
  m_changePageSize(size: number) {
    this.m_page.pageSize = size
    this.m_query()
  }
  // 查看详情
  m_viewDetail(row: any) {
    const status = this.$store.state[this.m_moduleName].v_status
    if (['add', 'edit'].includes(status)) {
      this._confirm({ content: this.$t('dialogPrompt.cancel') })
        .then(() => {
          this.m_viewDetailFn(row)
        })
        .catch(() => {
          return false
        })
    } else {
      this.m_viewDetailFn(row)
    }
  }
  m_viewDetailFn(row: any) {
    /**
     * 1 校验当前页是否有下一页 或者 上一页
     * 2. 设置 ID
     * 3. 设置可读状态
     * 4. 切换页面到详情
     */
    this.m_handleTurnCommit(row.id)

    this.$store.commit(`${this.m_moduleName}/SET_STATUS`, 'detail')
    this.$store.commit(`${this.m_moduleName}/SET_ID`, `${row.id}_${new Date().getTime()}`)
    this.$store.commit(`${this.m_moduleName}/SET_READ_STATUS`, true)
    this.$store.commit(`${this.m_moduleName}/SET_ACTIVENAME`, 'detail')
    // this.$store.dispatch(`${this.m_moduleName}/v_setBtnsAuth`, row.status + '')
  }
  // 是否有 上一页 下一页 功能
  m_handleTurnCommit(id: string) {
    let turnBoundary: string
    if (this.m_tableData.length === 1) {
      turnBoundary = 'null'
    } else {
      this.m_currentIndex = this.m_tableData.findIndex((item) => item.id === id)

      // 如果是最后一页  则不能下一页 如果是第一页 则不能上一页
      const boundaryObj = {
        [this.m_tableData.length - 1]: 'next',
        0: 'prev'
      }
      turnBoundary = boundaryObj[this.m_currentIndex] || 'all'
      // console.log('m_currentIndex: ', this.m_currentIndex, turnBoundary)
    }
    this.$store.commit(`${this.m_moduleName}/SET_TURN_BOUNDARY`, turnBoundary)
  }
  // 删除
  async m_batchDelete(config: ListBtnApiConfig) {
    /**
       * TODO:
       * 这一部分相同逻辑的代码可抽离 可优化
       */
    if (this.infoFun()) {
      const res = await this._post({
        url: config.apiUrl!,
        data: { data: this.m_selectData }
      })
      if (res.code === 0) this.m_dealSuccessAction(config.name!)
      if (res.code === 20001) this.m_error(res.data, config.name!)
    }
  }
  // 删除
  m_deleteItem(row: any) {
    this._confirm({ content: this.$t('commonWord.sureDelete') })
      .then(async() => {
        const res = await this._post({
          url: this.deleteItemApi,
          data: { data: [row.id], user: 'admin' }
        })
        if (res.code === 0) this.m_dealSuccessAction('layout.btns.delete')
      })
      .catch(() => {
        return false
      })
  }
  // 格式化 type = dateType 的数据
  m_formatDateTime() {
    const datePick: any[] = this.listConfig.formList.filter((item) => item.type === 'datePick')
    const datePickObj: Object = {}
    datePick.forEach((item) => {
      if (this.formData[item.value]) {
        datePickObj[item.value] = {
          startTime: this.formData[item.value][0],
          endTime: this.formData[item.value][1]
        }
      }
    })
    return datePickObj
  }
  // 输入框的查询搜索类型
  m_inputTypeSelect(value:any) {
    this.m_inputValueType = value
    // m_inputValueType
  }
  // 输入框的查询
  m_inputEnter(value: string) {
    this.m_inputValue = value.trim()
    this.m_query({ from: 'singeInput', args: {
      keywordType: +this.m_inputValueType || 0
    }})
  }

  m_dealArgs(args: Dictionary): Dictionary {
    const queryObj = { keyword: this.m_inputValue }
    if (args) {
      Object.assign(queryObj, args)
    }
    const data = Object.assign(
      { moduleId: this.m_moduleName },
      queryObj,
      this.formData,
      this.m_formatDateTime()
    )
    const postData = {
      data,
      page: this.m_page.pageNo,
      pageSize: this.m_page.pageSize
    }
    return postData
  }
  // 找数据
  // 原始数据
  originalHeader:TableHeaderConfig[] = [];
  marginTableHeader(dataHeader: any[]): TableHeaderConfig[] {
    return dataHeader.map((item) => {
      const obj:TableHeaderConfig = {
        label: item.columnTitle,
        value: item.columnKey
      }
      if (this.listConfig.tableHeader.length) {
        const match = this.listConfig.tableHeader.find((fields) => fields.value === item.columnKey)
        Object.assign(obj, match)
      }
      return obj
    })
  }
  // 查询
  async m_query({ args, from = 'default' }: QueryConfig = {}) {
    this.m_tableLoading = true
    if (from !== 'singeInput') {
      // 如果不是从单输入框执行的查询
      this.m_inputValue = ''
      this.$refs.listOperation && (this.$refs.listOperation as any).resetInputValue() // 清空单输入框搜索
    }
    const postData = this.m_dealArgs(args)
    const [err, res] = await to(this._post({ url: this.listApi, data: postData }))
    if (err) {
      this.m_tableLoading = false
      return
    }
    console.log('query', res)
    // debugger
    // eslint-disable-next-line prefer-const
    let { total, pageSize, pageCount, data: tableData, bottomSum, dataHeader } = res
    Object.assign(this.m_page, { total, pageSize, pageCount })

    if (!tableData) tableData = []
    if (!bottomSum) bottomSum = {}
    this.m_tableData = tableData.map((item) => {
      let statusAction: any[] = []
      // 根据状态显示不同颜色的字体
      if (!isNaN(item.status)) {
        statusAction = statusMap.get(item.status) || []
        // 将状态值转换成文本
        item.status = this.$t('operationGroup.status')[statusAction[0] || '']
      }
      item.statusClass = statusAction[1]
      // 根据工作流状态显示不同颜色字体
      if (item.flowStatus) {
        item.activityClass = activityStatusMap.get(`${item.flowType}-${item.flowStatus}`)
      }
      return item
    })
    // 存在自定义dataHeader才执行
    // dataHeader && (this.listConfig.tableHeader = this.marginTableHeader(dataHeader || []))
    this.m_tableHeader = this.marginTableHeader(dataHeader || [])
    this.m_totalData = bottomSum
    this.m_tableLoading = false
  }
}
