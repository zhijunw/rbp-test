import { Vue, Component, Prop } from 'vue-property-decorator'
import { ListBtnApiConfig, Dictionary } from '@/typings'
import { AxiosConfig } from '@/api/apiConfig'
import commonApi from '@/api/common-api/index'

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

@Component({})
export default class operationMixins extends Vue {
   @Prop() formData: Dictionary
    [x: string]: any
    get m_activityTextClass() {
      if (this.formData.flowStatus) {
        return activityStatusMap.get(`${this.formData.flowType}-${this.formData.flowStatus}`)
      } else {
        return ''
      }
    }

    get m_moduleName() {
      return this.$route.meta.moduleId
    }

    get billId() {
      return this.$store.state[this.m_moduleName].v_id.split('_')[0]
    }
    get user() {
      return this.$store.state.user.name
    }

    // 获取请求接口对象
    getUrlObj(apiUrl: string, params: string | string[] | object | undefined): AxiosConfig {
      const valueType: string = Object.prototype.toString.call(params)

      if (valueType === '[object Undefined]') {
        return { url: apiUrl, data: { data: [this.billId], user: this.user }}
      } else if (valueType === '[object String]') {
        return { url: `${apiUrl}/${this.billId}` }
      } else if (valueType === '[object Object]') {
        params!['id'] = this.billId
        return { url: apiUrl, data: { data: params }}
      } else if (valueType === '[object Array]') {
        return { url: apiUrl, data: Object.assign({}, { data: [this.billId] }, params![0]) }
      }
      return { url: '' }
    }

    // 操作成功后执行的方法
    m_dealSuccessAction(name: any, status?: string) {
      const billStatus = status + ''
      this._message({ message: this.$t('commonWord.actionSuccess', { action: this.$t(name) }), type: 'success' })
      this.formData.status = status
      this.$store.commit(`${this.m_moduleName}/SET_REFRESH_LIST_TABLE`, new Date().getTime())
      this.$store.commit(`${this.m_moduleName}/SET_BILL_STATUS`, billStatus)
      this.$store.dispatch(`${this.m_moduleName}/v_setBtnsAuth`, billStatus)
    }

    // 新建
    // TODO: 可根据 v_status 和 v_resetDetail 值判断是否刷新。 这2个状态可去掉1个
    m_add() {
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
    m_addFn() {
      this.$store.commit(`${this.m_moduleName}/SET_STATUS`, 'add')
      this.$store.dispatch(`${this.m_moduleName}/v_setBtnsAuth`, 'add')
      this.$store.commit(`${this.m_moduleName}/SET_READ_STATUS`, false)
      this.$store.commit(`${this.m_moduleName}/SET_RESET_DETAIL`, new Date().getTime())
      this.$store.commit(`${this.m_moduleName}/SET_ID`, '')
    }
    m_copy() {

    }
    // 删除
    async m_delete(config: ListBtnApiConfig) {
      const res = await this._post(this.getUrlObj(config.apiUrl!, config.params))
      // const res = await this._post({ url: config.apiUrl!, data: { data: [this.billId], user:this.user }})
      if (res.code === 0) {
      // this.m_dealSuccessAction(config.name, 'default')
      // this.m_cancel()
        this._message({ message: this.$t('commonWord.actionSuccess', { action: this.$t(name) }), type: 'success' })
        this.$store.dispatch(`${this.m_moduleName}/v_setBtnsAuth`, '')
        this.$store.commit(`${this.m_moduleName}/SET_REFRESH_LIST_TABLE`, new Date().getTime())
        this.$store.commit(`${this.m_moduleName}/SET_STATUS`, 'add')
        this.$store.commit(`${this.m_moduleName}/SET_ID`, '')
      } else {
        this._message({ message: res.msg, type: 'error' })
      }
    }

    // 编辑
    m_edit() {
    // 编辑的时候 页面和按钮组设置成 edit 页面设置成 可写
      this.$store.commit(`${this.m_moduleName}/SET_STATUS`, 'edit')
      this.$store.dispatch(`${this.m_moduleName}/v_setBtnsAuth`, 'edit')
      this.$store.commit(`${this.m_moduleName}/SET_READ_STATUS`, false)
    }

    // 取消
    m_cancel() {
    /**
       * 1.设置当前页面状态 cancel
       * 2.设置页面只可读
       * 3.重置 详情信息
       * 4.如果有 ID 则重新获取接口 没有则回到原始状态
       */
      this.$store.commit(`${this.m_moduleName}/SET_STATUS`, 'cancel')

      this.$store.commit(`${this.m_moduleName}/SET_READ_STATUS`, true)

      // const Id = this.$store.state[this.m_moduleName].v_id

      this.$store.commit(`${this.m_moduleName}/SET_RESET_DETAIL`, new Date().getTime())
      if (this.billId) {
      // 重新获取查看详情接口
        this.$store.commit(`${this.m_moduleName}/SET_ID`, `${this.billId}_${new Date().getTime()}`)
      } else {
        this.$store.dispatch(`${this.m_moduleName}/v_setBtnsAuth`, '')
      // 重置所有组件数据 须有方法
      }
    }

    // 保存
    m_save() {
      this.$emit('save')
    }
    // 发起审批流程
    async createActivity() {
      // flowType: 1 (审核流程) 2(反审核流程) 3(作废流程)
      const confirmText = this.$t('dialogPrompt.commitAudit')
      const tips = this.$t('commonWord.auditInfo')
      this._confirm({ content: confirmText, info: tips }).then(async() => {
        this.m_createActivityFn({ flowType: 1 })
      })
    }
    async m_createActivityFn(args: Dictionary) {
      const res = await this._post({ url: commonApi.createActivity, data: {
        data: {
          billId: this.billId,
          moduleId: this.m_moduleName,
          ...args
        }
      }})
      if (res.code === 0) {
        this._message({ message: this.$t('commonWord.success'), type: 'success' })
        // 1.刷新列表更新列表数据的状态 2.更新审批流程的状态 3.更新按钮组的状态为 pendingAudit 修改等功能禁用
        this.$store.commit(`${this.m_moduleName}/SET_REFRESH_LIST_TABLE`, new Date().getTime())
        this.$store.commit(`${this.m_moduleName}/SET_ID`, `${this.billId}_${new Date().getTime()}`)
      }
    }

    // 执行审批
    // flowType: 1 (审核流程) 2(反审核流程) 3(作废流程)
    async m_auditActivity(flowType: number) {
      const args = {
        billId: this.billId,
        moduleId: this.m_moduleName
      };
      (this.$refs.auditComments as any).open({ args, flowType })
    }
    // 审核
    async m_audit(config: ListBtnApiConfig) {
      const { flowDto, flowStatus } = this.formData

      // 如果有发起审批并且当前登陆用户可以审批单据
      // flowStatus 0(初始化) 1(待审批) 2(审批中) 3(已驳回) 4(已通过)
      if ([1, 2].includes(flowStatus) && flowDto.flowCheckFlag) {
        this.m_auditActivity(1)
        return
      }
      // 如果有审批工作流则执行审批工作流 流程
      if (flowDto && flowDto.flowFlag) {
        this.createActivity()
        return
      }
      // 如果没有审批工作流 则直接审核
      this.m_commonFn(config, 'audit')
    }
    m_commonFn(config: ListBtnApiConfig, name: string) {
      this._confirm({ content: this.$t('dialogPrompt')[name] })
        .then(async() => {
          const res = await this._put(this.getUrlObj(config.apiUrl!, config.params))
          if (res.code === 0) {
            this.m_dealSuccessAction(config.name, res.status)
          } else {
            this._message({ message: res.msg, type: 'error' })
          }
        })
    }

    // 反审核
    async m_unaudit(config: ListBtnApiConfig) {
      const { flowDto, flowStatus } = this.formData

      // 如果有发起审批并且当前登陆用户可以审批单据
      // flowStatus 0(初始化) 1(待审批) 2(审批中) 3(以驳回) 4(已通过)
      if ([1, 2].includes(flowStatus) && flowDto.flowUnCheckFlag) {
        this.m_auditActivity(2)
        return
      }
      // 如果有审批工作流则发起审批工作流 流程
      if (flowDto && flowDto.flowFlag) {
        // this.createActivity()
        (this.$refs.auditComments as any).open({ flowType: 2 })

        return
      }
      // 如果没有审批工作流 则直接审核
      this.m_commonFn(config, 'unaudit')
    }

    // 作废
    async m_invalid(config: ListBtnApiConfig) {
      const { flowDto, flowStatus } = this.formData

      // 如果有发起审批并且当前登陆用户可以审批单据
      // flowStatus 0(初始化) 1(待审批) 2(审批中) 3(以驳回) 4(已通过)
      if ([1, 2].includes(flowStatus) && flowDto.flowInvalidFlag) {
        this.m_auditActivity(3)
        return
      }
      // 如果有审批工作流则发起审批工作流 流程
      if (flowDto && flowDto.flowFlag) {
        // flowType: 1 (审核流程) 2(反审核流程) 3(作废流程)
        const confirmText = this.$t('dialogPrompt.commitInvalid')
        const tips = this.$t('commonWord.commitInvalid')
        this._confirm({ content: confirmText, info: tips }).then(async() => {
          this.m_createActivityFn({ flowType: 3 })
        })

        return
      }
      // 如果没有审批工作流 则直接审核
      this.m_commonFn(config, 'invalid')
    }
    // 恢复
    async m_restore(config: ListBtnApiConfig) {
      // this.m_commonFn(config, 'restore')
      const { flowDto, flowStatus } = this.formData

      // 如果有发起审批并且当前登陆用户可以审批单据
      // flowStatus 0(初始化) 1(待审批) 2(审批中) 3(以驳回) 4(已通过)
      if ([1, 2].includes(flowStatus) && flowDto.flowUnInvalidFlag) {
        this.m_auditActivity(0)
        return
      }
      // 如果有审批工作流则发起审批工作流 流程
      if (flowDto && flowDto.flowFlag) {
        this.m_createActivityFn({ flowType: 0 })
        const confirmText = this.$t('dialogPrompt.commitRestore')
        const tips = this.$t('commonWord.commitRestore')
        this._confirm({ content: confirmText, info: tips }).then(async() => {
          this.m_createActivityFn({ flowType: 0 })
        })

        return
      }
      // 如果没有审批工作流 则直接审核
      this.m_commonFn(config, 'restore')
    }
    async m_activityEndFn({ url, type, args }) {
      const res = await this._post({ url, data: {
        data: {
          billId: this.billId,
          moduleId: this.m_moduleName,
          flowId: this.formData.flowId,
          ...args
        }
      }})
      if (res.code === 0) {
        this._message({ message: this.$t('commonWord.actionSuccess', { action: this.$t('commonWord')[type] }), type: 'success' })
        this.$store.commit(`${this.m_moduleName}/SET_REFRESH_LIST_TABLE`, new Date().getTime())

        this.$store.commit(`${this.m_moduleName}/SET_ID`, `${this.billId}_${new Date().getTime()}`)
      }
    }
    // 审批通过
    async m_pass({ comments, imgUrl, flowType }) {
      this.m_activityEndFn({ url: commonApi.auditActivity, type: 'pass', args: {
        flowSuggestion: comments,
        fileKeyList: imgUrl,
        flowType
      }})
    }
    // 审批驳回
    async m_reject({ comments, imgUrl, flowType }) {
      this.m_activityEndFn({ url: commonApi.rejectActivity, type: 'reject', args: {
        flowSuggestion: comments,
        fileKeyList: imgUrl,
        flowType
      }})
    }

    // 开始反审核工作流 因为反审核工作流需要弹窗 所以需要出发事件
    async m_createUnauditActivity({ comments, imgUrl, flowType }) {
      this.m_createActivityFn({ flowType, flowSuggestion: comments, fileKeyList: imgUrl })
    }

    // 启用
    // TODO: 操作里面处理的逻辑 可优化
    async m_enable(config: ListBtnApiConfig) {
      this.m_commonFn(config, 'enable')
    }

    // 禁用
    async m_disable(config: ListBtnApiConfig) {
      this.m_commonFn(config, 'disable')
    }

    // 上一页
    m_prev() {
      this.$store.commit(`${this.m_moduleName}/SET_TURN`, 'prev_' + new Date().getTime())
    }

    // 下一页
    m_next() {
      this.$store.commit(`${this.m_moduleName}/SET_TURN`, 'next_' + new Date().getTime())
    }
}
