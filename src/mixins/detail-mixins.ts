import { Vue, Component } from 'vue-property-decorator'
import { Dictionary, FormListConfig, AnchorConfig } from '@/typings'
import { transformFields, deepCopy } from '@/utils'
import commonApi from '@/api/common-api/index'

@Component({})
export default class detailMixins extends Vue {
  [x: string]: any
  m_moduleName: string = ''
  m_customerMapTemp: Dictionary = {}
  created() {
    this.m_moduleName = this.$route.meta.moduleId
  }
  // 对返回的自定义字段表单进行格式化
  m_transformCustomerFileds(arr: any[], formdata: Dictionary): FormListConfig[] {
    return arr.map((item) => {
      const obj: FormListConfig = {
        label: item.label,
        value: item.columnName,
        type: item.typeName
      }
      if (item.length) {
        obj.config = {
          maxlength: item.length
        }
      }

      // 如果是必填 则添加匹配规则
      if (item.requireFlag) {
        obj.rules = [
          {
            required: true,
            message: `请输入${item.label}`,
            trigger: item.type === 'select' ? 'change' : 'blur'
          }
        ]
        // this.$set(formdata, item.columnName, '')
        formdata[item.columnName] = ''
      }
      // 如果有下拉框 则格式化下拉框值
      if (item.options) {
        obj.options = transformFields(item.options, { label: 'value', value: 'id' })
      }

      const defaultValue = item.options && item.defaultValue ? Number(item.defaultValue) : item.defaultValue || item.defaultDate
      formdata[item.columnName] = defaultValue
      return obj
    })
  }
  // 获取模块下面的自定义字段
  async m_getModuleCustomerFiledsFn(fixTabs: Dictionary, formdata: Dictionary, realModuleId: string | number) {
    const res = await this._post({ url: `${commonApi.getModuleCustomerFields}/${realModuleId}` })
    if (res.code === 0) {
      const { groupColumnMap } = res.data
      // const customerObj: Dictionary = {}
      // 用户存储自定义字段的默认值
      this.m_customerMapTemp = {}
      for (const key in groupColumnMap) {
        // 如果固定的 tabs 里面有 自定义字段 则 合并
        if (fixTabs[key]) {
          const matchTab = fixTabs[key]

          this[matchTab] = [...this[matchTab], ...this.m_transformCustomerFileds(groupColumnMap[key], this.m_customerMapTemp)]
        } else {
          // 组装 自定义字段 tabs
          const item = groupColumnMap[key][0]
          const anchor: AnchorConfig = {
            label: item.groupName,
            value: key,
            ref: key
          }
          this.anchorList = [...this.anchorList, anchor]
          this.customerFieldsTabs.push({
            ...anchor,
            formList: this.m_transformCustomerFileds(groupColumnMap[key], this.formData.customFieldMap)
          })
        }
      }
      for (const keys in this.m_customerMapTemp) {
        this.$set(formdata, keys, this.m_customerMapTemp[keys])
        this.$set(this.formData.customFieldMap, keys, this.m_customerMapTemp[keys])
      }
    }
  }

  // 处理工作流状态
  m_dealActivityStatus(status:number, flowStatus: number, flowDto: Dictionary) {
    // this.$store.dispatch(`${this.m_moduleName}/v_setBtnsAuth`, status)

    this.$store.commit(`${this.m_moduleName}/SET_PENDING_STATUS`, flowStatus)
    // 如果有审核工作流 则把按钮置为 审批状态
    this.$store.dispatch(`${this.m_moduleName}/v_setBtnsAuth`, flowDto.flowFlag && flowStatus ? 'pendingAudit' : status + '')
    // 如果有发起审核 审批的权限
    if (flowDto.flowCheckFlag) {
      this.$store.commit(`${this.m_moduleName}/SET_BTN_AUTH`, {
        key: 'audit',
        flag: true
      })
    }
    // 如果有发起反审核 反审核审批的权限 并且单据状态为审核状态才可以反审核
    if (flowDto.flowUnCheckFlag && status === 1) {
      this.$store.commit(`${this.m_moduleName}/SET_BTN_AUTH`, {
        key: 'unaudit',
        flag: true
      })
    }
    // 如果有发起作废 反审核审批的权限 并且单据状态为审核状态才可以作废
    if (flowDto.flowInvalidFlag && status === 1) {
      this.$store.commit(`${this.m_moduleName}/SET_BTN_AUTH`, {
        key: 'invalid',
        flag: true
      })
    }
    // 只有作废的单据才能恢复 并且是否有恢复的权限
    if (flowDto.flowUnInvalidFlag && status === 3) {
      this.$store.commit(`${this.m_moduleName}/SET_BTN_AUTH`, {
        key: 'restore',
        flag: true
      })
    }
    this.$store.commit(`${this.m_moduleName}/SET_BILL_STATUS`, status + '')
  }
  // 处理新建之后 字段恢复到初始化  如果有自定义字段且保留
  m_reset(content?: string) {
    for (const key in this.formData) {
      if (this.formData[key] instanceof Array) {
        this.$set(this.formData, key, [])
      } else if (this.formData[key] instanceof Object) {
        // 如果是自定义字段集合  值则设置成默认值
        if (key === 'customFieldMap') {
          for (const customerKey in this.formData[key]) {
            // 恢复表头字段的默认值
            this.$set(content ? this.formData[content] : this.formData, customerKey, this.m_customerMapTemp[customerKey])
            // 恢复自定义 TAB 的字段默认值
            this.$set(this.formData.customFieldMap, customerKey, this.m_customerMapTemp[customerKey])
          }
        } else {
          for (const objectKey in this.formData[key]) {
            // 恢复表头字段的默认值
            // 恢复自定义 TAB 的字段默认值
            this.$set(content ? this.formData[content] : this.formData, objectKey, Array.isArray(this.formData[key][objectKey]) ? [] : null)
          }
        }
      } else {
        this.$set(this.formData, key, '')
      }
    }
    for (const key in this.configFormData) { // 控制选项恢复到初始化
      this.configFormData[key] = []
    }
  }

  m_dealSaveAction(res: { data: string; msg:any }) {
    if (res.data) {
      const status = this.$store.state[this.m_moduleName].v_status
      const successMessage = status === 'add' ? 'save' : 'edit'

      // 设置页面状态
      this._message({ message: this.$t('commonWord.actionSuccess', { action: this.$t('operationGroup.btns')[successMessage] }), type: 'success' })

      // 状态设置 可读
      this.$store.commit(`${this.m_moduleName}/SET_READ_STATUS`, true)

      // 更新 ID
      this.$store.commit(`${this.m_moduleName}/SET_ID`, `${res.data}_${new Date().getTime()}`)

      // 刷新 list 列表
      this.$store.commit(`${this.m_moduleName}/SET_REFRESH_LIST_TABLE`, new Date().getTime())

      this.$store.commit(`${this.m_moduleName}/SET_STATUS`, '')
      // this.$store.commit(`${this.m_moduleName}/SET_STATUS`, 'detail')
    } else {
      this._notify(res.msg)
    }
  }
}
