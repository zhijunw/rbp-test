import {
  commonIndexConfig,
  ListComponentsConfig,
  TableHeaderConfig,
  DetailOperationConfig,
  FormListConfig,
  CommonConfig,
  RecordLogConfig
} from '@/typings'
import { Tools } from '@/utils/tools'
import {

  channelSearchConfig,
  goodsSearchConfig,
  billSearchConfig } from '@/layout-components/vip-dialog/config'

import apiUrl from '@/api/sale-center/sale-plain-adjustment'
import commonApiUrl from '@/api/common-api/index'

interface GoodsDetailConfig {
    detailTableHeader: TableHeaderConfig[]
}
interface salePlainDetail {
  btns: DetailOperationConfig[]
  formList: FormListConfig[]
  tabsList: CommonConfig[]
  // goodsDetail: GoodsDetailConfig,
  // freight: FormListConfig[]
}

export const layoutConfigs: commonIndexConfig = {
  tabs: [
    {
      label: '列表',
      value: 'list',
      lang: 'layout.tabs.list'
    },
    {
      label: '详情',
      value: 'detail',
      lang: 'layout.tabs.detail'
    }
  ]
}

export const listConfig: ListComponentsConfig = {
  btns: [
    {
      name: '新建单据',
      value: 'add',
      lang: 'layout.btns.new',
      event: 'add',
      id: 'btn_g_d_blue',
      plain: true,
      icon: 'el-icon-plus',
      interface: {
        name: 'add'
      }
    },
    {
      name: '审核',
      value: 'audit',
      lang: 'layout.btns.batchAudit',
      event: 'batch-audit',
      plain: true,
      interface: {
        apiUrl: apiUrl.batchCheck
      }
    },

    {
      name: '导入',
      value: 'import',
      lang: 'layout.btns.batchImport',
      event: 'batch-import',
      plain: true
    },
    {
      name: '导出',
      value: 'export',
      lang: 'layout.btns.batchExport',
      event: 'batch-export',
      plain: true
    },
    {
      name: '删除',
      value: 'batchDelete',
      lang: 'layout.btns.batchDelete',
      event: 'batch-delete',
      id: 'btn_g_red',
      plain: true,
      interface: {
        name: 'batch-delete',
        apiUrl: apiUrl.deletes
      }
    },
    {
      name: '操作记录',
      value: 'recordLog',
      lang: 'operationGroup.btns.record',
      event: 'recordLog',
      plain: true

    },
    {
      name: '筛选器',
      value: 'filter',
      lang: 'layout.btns.filters',
      event: 'filter',
      type: 'primary',
      class: 'right',
      interface: {
        name: 'filter'
      }
    }
  ],
  InputConfig: {
    placeholder: 'form.placeholder.salePlainPlaceholder',
    long: true,
    prefixIcon: 'el-icon-search'
  },
  tableHeader: [
    {
      value: 'billNo',
      label: '计划单号',
      width: '150px'
    },
    {
      value: 'salePlanBillNo',
      width: '150px',
      label: '原单号'
    },
    {
      value: 'totalQuantity',
      label: '数量',
      isShowTotal: true
    },
    {
      value: 'totalBalancePrice',
      label: '金额',
      isShowTotal: true
    }
  ],
  formList: [
    {
      label: '渠道',
      en: 'channel',
      lang: 'salePlain.list.filter.channelIdList',
      value: 'channelIdList',
      type: 'highSearch',
      linkValue: 'channelFilterParam',
      highSearchConfig: {
        dialogSearchConfig: channelSearchConfig,
        apiUrl: commonApiUrl.channelFuzzy
      },
      setLength: 12
    },
    {
      label: '货品',
      en: 'goods',
      lang: 'salePlain.list.filter.goodsIdList',
      value: 'goodsIdList',
      type: 'highSearch',
      linkValue: 'goodsFilterParam',
      highSearchConfig: {
        dialogSearchConfig: goodsSearchConfig,
        apiUrl: commonApiUrl.goodsFuzzy
      },
      setLength: 12
    },
    {
      label: '业务类型',
      en: 'Business type',
      lang: 'salePlain.list.filter.businessTypeIdList',
      value: 'businessTypeIdList',
      matchSelectKey: 'businessTypeIds',
      type: 'select',
      config: {
        multiple: true
      },
      options: [],
      setLength: 12
    },
    {
      label: '价格类型',
      en: 'Price type',
      lang: 'salePlain.list.filter.priceTypeIdList',
      value: 'priceTypeIdList',
      matchSelectKey: 'priceTypeIds',
      type: 'select',
      config: {
        multiple: true
      },
      options: [],
      setLength: 12
    },
    {
      label: '制单用户',
      en: 'Single person',
      lang: 'salePlain.list.filter.createdByList',
      value: 'createdByList',
      type: 'filter',
      fuzzyConfig: {
        apiUrl: commonApiUrl.userFuzzy
      },
      setLength: 12
    },
    {
      label: '制单日期',
      en: 'Date of making order',
      lang: 'salePlain.list.filter.createdTime',
      value: 'createdTime',
      config: {
        type: 'daterange'
      },
      type: 'datePick',
      setLength: 12
    },
    {
      label: '修改用户',
      en: 'Last modified',
      lang: 'salePlain.list.filter.updateByList',
      value: 'updateByList',
      type: 'filter',
      fuzzyConfig: {
        apiUrl: commonApiUrl.userFuzzy
      },
      setLength: 12
    },
    {
      label: '修改时间',
      en: 'Last modified date',
      lang: 'salePlain.list.filter.updatedTime',
      value: 'updatedTime',
      config: {
        type: 'daterange'
      },
      type: 'datePick',
      setLength: 12
    },
    {
      label: '审核用户',
      en: 'Audit User',
      lang: 'salePlain.list.filter.checkByList',
      value: 'checkByList',
      type: 'filter',
      fuzzyConfig: {
        apiUrl: commonApiUrl.userFuzzy
      },
      setLength: 12
    },
    {
      label: '审核日期',
      en: 'Aduit Date',
      lang: 'salePlain.list.filter.checkTime',
      value: 'checkTime',
      config: {
        type: 'daterange'
      },
      type: 'datePick',
      setLength: 12
    },
    {
      label: '状态',
      value: 'status',
      en: 'State',
      lang: 'salePlain.list.filter.status',
      setLength: 12,
      type: 'select',
      config: {
        multiple: true
      },
      options: [
        {
          label: '未审核',
          value: '0'
        },
        {
          label: '已审核',
          value: '1'
        },
        {
          label: '反审核',
          value: '2'
        },
        {
          label: '已作废',
          value: '3'
        }
      ]
    }
  ]
}

export const detailConfig: salePlainDetail = {
  btns: [
    {
      name: '新建',
      value: 'add',
      hiddenIcon: true,
      icon: 'el-icon-plus',
      operationId: 'create',
      lang: 'operationGroup.btns.add',
      plain: true,
      id: 'btn_g_d_blue'
    },
    {
      name: '打印',
      value: 'print',
      operationId: 'print',
      svgIcon: 'rbp-operate_print',
      lang: 'operationGroup.btns.print',
      type: 'text'
    },
    {
      name: '编辑',
      value: 'edit',
      svgIcon: 'rbp-operate_edit',
      operationId: 'edit',
      type: 'text',
      lang: 'operationGroup.btns.edit'
    },
    {
      name: '复制',
      value: 'copy',
      svgIcon: 'rbp-operate_edit',
      operationId: 'copy',
      type: 'text',
      lang: 'operationGroup.btns.copy'
    },
    {
      name: '取消',
      value: 'cancel',
      svgIcon: 'rbp-operate_cancel',
      lang: 'operationGroup.btns.cancel',
      type: 'text',
      isValidatePermisssion: true
    },
    {
      name: '保存',
      value: 'save',
      svgIcon: 'rbp-operate_save',
      lang: 'operationGroup.btns.save',
      type: 'text',
      isValidatePermisssion: true
    },
    {
      name: '审核',
      value: 'audit',
      operationId: 'check',
      svgIcon: 'rbp-operate_check',
      lang: 'operationGroup.btns.audit',
      type: 'text',
      interface: {
        apiUrl: apiUrl.check,
        params: {
          id: ''

        }
      }
    },
    {
      name: '删除',
      value: 'delete',
      svgIcon: 'rbp-operate_delete',
      operationId: 'delete',
      type: 'text',
      lang: 'operationGroup.btns.delete',
      interface: {
        apiUrl: apiUrl.deletes,
        params: []
      }
    },
    {
      name: '上一个',
      value: 'prev',
      svgIcon: 'rbp-operate_previous',
      lang: 'operationGroup.btns.prev',
      type: 'text',
      class: 'prev-btn',
      isValidatePermisssion: true
    },
    {
      name: '下一个',
      value: 'next',
      svgIcon: 'rbp-operate_next',
      lang: 'operationGroup.btns.next',
      type: 'text',
      isValidatePermisssion: true
    },
    {
      name: '操作记录',
      value: 'record',
      svgIcon: 'rbp-operate_record',
      lang: 'operationGroup.btns.record',
      type: 'text',
      id: 'color-info',
      isValidatePermisssion: true,
      interface: {
        apiUrl: apiUrl.operationLog
      }
    }
  ],
  formList: [
    {
      label: '单据编号',
      value: 'billNo',
      en: 'Plain Number',
      lang: 'salePlainAdjustment.detail.formList.billNo',
      type: 'input',
      alwaysDisabled: true
    },
    {
      label: '原单号',
      value: 'salePlanBillId',
      en: 'salePlanBillNo',
      lang: 'salePlainAdjustment.detail.formList.salePlanBillId',
      type: 'other',
      highSearchConfig: {
        dialogSearchConfig: Object.assign({}, billSearchConfig, {
          isSingleSelect: true,
          dialogWidth: '600px',
          selectApi: `${commonApiUrl.getBillNoSearchSelect}`

        }),
        apiUrl: commonApiUrl.billFuzzy
      },
      rules: [
        {
          required: true,
          message: '请选择原单号',
          trigger: 'change'
        }
      ]
    },
    {
      label: '单据日期',
      value: 'billDate',
      en: 'Document date',
      lang: 'salePlainAdjustment.detail.formList.billDate',
      type: 'datePick',
      config: {
        type: 'date'
      },
      rules: [
        {
          required: true,
          message: '请输入单据日期',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '手工单号',
      value: 'manualId',
      en: 'Manual Number',
      lang: 'salePlainAdjustment.detail.formList.manualId',
      type: 'input'
    },
    {
      label: '业务类型',
      value: 'businessTypeId',
      en: 'Business type',
      lang: 'salePlainAdjustment.detail.formList.businessTypeId',
      matchSelectKey: 'businessTypeIds',
      type: 'select',
      options: [],
      alwaysDisabled: true
    },
    {
      label: '渠道',
      value: 'channelName',
      en: 'Channel',
      lang: 'salePlainAdjustment.detail.formList.channelName',
      type: 'input',
      alwaysDisabled: true

    },

    {
      label: '备注',
      value: 'notes',
      en: 'Remark',
      lang: 'salePlain.detail.formList.notes',
      type: 'input',
      config: {
        long: true
      }
    }
  ],
  tabsList: [
    {
      label: '货品明细',
      value: 'goodsDetail',
      en: 'Goods Details',
      lang: 'salePlain.detail.tabsList.goodsDetail'
    }
  ]
}

// 操作记录
export const recordLogObj: RecordLogConfig = {
  formList: [
    {
      label: '调整单号',
      value: 'billNo',
      en: 'Plain Number',
      lang: 'salePlain.recordLog.formList.billNo',
      type: 'input',
      setLength: 12

    },
    {
      label: '操作人',
      en: 'operateBy',
      lang: 'salePlain.recordLog.formList.operateBy',
      value: 'operateBy',
      type: 'filter',
      fuzzyConfig: {
        apiUrl: commonApiUrl.userFuzzy,
        multiple: false
      },
      setLength: 12
    },
    {
      label: '操作类型',
      en: 'actionCode',
      lang: 'salePlain.recordLog.formList.actionCode',
      value: 'actionCode',
      type: 'select',
      setLength: 12,
      options: []
    },
    {
      label: '操作时间',
      en: 'operateDate',
      lang: 'salePlain.recordLog.formList.operateDate',
      value: 'operateDate',
      config: {
        type: 'daterange'
      },
      type: 'datePick',
      setLength: 12

    }
  ],
  tableHeader: [
    {
      label: '计划单号',
      value: 'billNo',
      en: 'billNo',
      lang: 'salePlain.recordLog.tableHeader.billNo'
    },
    {
      label: '操作',
      value: 'actionName',
      en: 'actionName',
      lang: 'salePlain.recordLog.tableHeader.actionName'
    },
    {
      label: '操作人',
      value: 'operateByName',
      en: 'Operate Name',
      lang: 'salePlain.recordLog.tableHeader.operateByName'
    },
    {
      label: '操作时间',
      value: 'operateTime',
      en: 'operateTime',
      lang: 'salePlain.recordLog.tableHeader.operateTime'
    }
  ],
  api: commonApiUrl.operatorLog
}
export const initFormData = () => {
  const detailData = {
    salePlainAdjustment: {
      billNo: '',
      salePlanBillId: '',
      billDate: Tools.getCurrentData(false),
      manualId: '',
      businessTypeId: '',
      channelId: '',
      priceTypeId: '',
      notes: ''
    },
    customFieldMap: {},
    billGoodsList: []

  }
  return detailData
}
// 这里定义用途 用作 国际化 的数据
export const salePlainAdjustment = {
  list: listConfig,
  detail: detailConfig,
  recordLogObj
  // highSearchDialog: highSearchDialog
}
