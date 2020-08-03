import {
  commonIndexConfig,
  ListComponentsConfig,
  AnchorConfig,
  TableHeaderConfig,
  DetailOperationConfig,
  FormListConfig,
  CommonConfig,
  RecordLogConfig, ListOperationBtnsConfig, LayoutConfig
} from '@/typings'
import { Tools } from '@/utils/tools'
import {

  channelSearchConfig,
  goodsSearchConfig } from '@/layout-components/vip-dialog/config'

import apiUrl from '@/api/sale-center/sale-plain'
import commonApiUrl from '@/api/common-api/index'
interface GoodsDetailConfig {
    detailTableHeader: TableHeaderConfig[]
}
interface salePlainDetail {
  btns: DetailOperationConfig[]
  formList: FormListConfig[]
  tabsList: CommonConfig[]
  // goodsDetail: GoodsDetailConfig,
  adjustmentRecord: TableHeaderConfig[]
  freight: FormListConfig[]
  adjustmentDetail:TableHeaderConfig[]
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
      plain: true,
      slot: true
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
        apiUrl: commonApiUrl.userFuzzy,
        multiple: true
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
        apiUrl: commonApiUrl.userFuzzy,
        multiple: true
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
        apiUrl: commonApiUrl.userFuzzy,
        multiple: true

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
      label: '作废用户',
      en: 'Invalid User',
      lang: 'salePlain.list.filter.cancelByList',
      value: 'cancelByList',
      type: 'filter',
      fuzzyConfig: {
        apiUrl: commonApiUrl.userFuzzy,
        multiple: true
      },
      setLength: 12
    },
    {
      label: '作废时间',
      en: 'Invalid Date',
      lang: 'salePlain.list.filter.cancelTime',
      value: 'cancelTime',
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
  ],
  layoutList: [
    {
      name: '个人视图',
      id: 1,
      children: []
    },
    {
      name: '系统视图',
      id: 2,
      children: []
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
      type: 'text',
      interface: {
        apiUrl: apiUrl.printBatch
      }
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
      name: '导入',
      value: 'import',
      operationId: 'import',
      svgIcon: 'rbp-operate_import',
      lang: 'operationGroup.btns.import',
      type: 'text'
    },
    {
      name: '反审核',
      value: 'unaudit',
      operationId: 'uncheck',
      svgIcon: 'rbp-operate_recheck',
      lang: 'operationGroup.btns.unaudit',
      type: 'text',
      interface: {
        apiUrl: apiUrl.uncheck,
        params: {
          id: ''
        }
      }
    },
    {
      name: '恢复',
      value: 'restore',
      operationId: 'restore',
      svgIcon: 'rbp-operate_restore',
      lang: 'operationGroup.btns.restore',
      type: 'text',
      interface: {
        apiUrl: apiUrl.restore,
        params: {
          id: ''
        }
      }
    },
    {
      name: '作废',
      value: 'invalid',
      operationId: 'cancel',
      svgIcon: 'rbp-operate_cancellation',
      lang: 'operationGroup.btns.invalid',
      type: 'text',
      interface: {
        apiUrl: apiUrl.invalid,
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
        apiUrl: apiUrl.deletes

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
      label: '计划单号',
      value: 'billNo',
      en: 'Plain Number',
      lang: 'salePlain.detail.formList.billNo',
      editDisabled: true,
      type: 'input',
      // rules: [
      //   {
      //     required: true,
      //     message: '请输入正确的计划单号(字母+数字)',
      //     trigger: 'blur',
      //     pattern: /^[0-9a-zA-Z]+$/
      //   }
      // ],
      alwaysDisabled: true
    },
    {
      label: '单据日期',
      value: 'billDate',
      en: 'Document date',
      lang: 'salePlain.detail.formList.billDate',
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
      label: '业务类型',
      value: 'businessTypeId',
      en: 'Business type',
      lang: 'salePlain.detail.formList.businessTypeId',
      matchSelectKey: 'businessTypeIds',
      type: 'select',
      rules: [
        {
          required: true,
          message: '请输入业务类型',
          trigger: ['blur', 'change']
        }
      ]
    },
    {
      label: '渠道',
      value: 'channelId',
      en: 'Channel',
      lang: 'salePlain.detail.formList.channelId',
      type: 'other',
      highSearchConfig: {
        dialogSearchConfig: Object.assign({}, channelSearchConfig, {
          isSingleSelect: true,
          dialogWidth: '600px'
        }),
        apiUrl: commonApiUrl.channelFuzzy
      },
      rules: [
        {
          required: true,
          message: '请选择渠道',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '手工单号',
      value: 'manualId',
      en: 'Manual Number',
      lang: 'salePlain.detail.formList.manualId',
      type: 'input'
    },
    {
      label: '价格类型',
      value: 'priceTypeId',
      en: 'Price type',
      lang: 'salePlain.detail.formList.priceTypeId',
      matchSelectKey: 'priceTypeIds',
      type: 'select',
      rules: [
        {
          required: true,
          message: '请输入价格类型',
          trigger: ['blur', 'change']
        }
      ]

    },
    {
      label: '备注',
      value: 'notes',
      en: 'Remark',
      lang: 'salePlain.detail.formList.notes',
      type: 'input',
      setLength: 12

    }
  ],
  tabsList: [
    {
      label: '货品明细',
      value: 'goodsDetail',
      en: 'Goods Details',
      lang: 'salePlain.detail.tabsList.goodsDetail'
    },
    {
      label: '货运信息',
      value: 'freightInfo',
      en: 'Freight Info',
      lang: 'salePlain.detail.tabsList.freightInfo'
    },
    {
      label: '调整历史',
      value: 'adjustmentRecord',
      en: 'Adjustment record',
      lang: 'salePlain.detail.tabsList.adjustmentRecord'
    },
    {
      label: '调整后明细',
      value: 'adjustmentDetail',
      en: 'adjustmentDetail',
      lang: 'salePlain.detail.tabsList.adjustmentDetail'
    },
    {
      label: '审核记录',
      value: 'auditRecord',
      en: 'Audit Record',
      lang: 'salePlain.detail.tabsList.auditRecord'
    }
  ],
  freight: [
    {
      label: '物流公司',
      value: 'logisticsBillCode',
      matchSelectKey: 'logisticsCompanyIds',
      en: 'logistics company',
      lang: 'salePlain.detail.freight.logisticsBillCode',
      type: 'select',
      options: []
    },
    {
      label: '国家/地区',
      value: 'Country',
      en: 'Country',
      lang: 'salePlain.detail.freight.Country',
      type: 'select',
      options: []
    },

    {
      label: '州/省/地区',
      value: 'province',
      en: 'province',
      lang: 'salePlain.detail.freight.province',
      type: 'select',
      options: []
    },
    {
      label: '市',
      value: 'city',
      en: 'city',
      lang: 'salePlain.detail.freight.city',
      type: 'select',
      options: []
    },
    {
      label: '县/区',
      value: 'county',
      en: 'county',
      lang: 'salePlain.detail.freight.county',
      type: 'select',
      options: []
    },
    {
      label: '详细地址',
      value: 'address',
      en: 'address',
      lang: 'salePlain.detail.freight.address',
      type: 'input',
      setLength: 12
    },
    {
      label: '收货人',
      value: 'contactsPerson',
      en: 'contactsPerson',
      lang: 'salePlain.detail.freight.contactsPerson',
      type: 'input'
    },
    {
      label: '邮政编码',
      value: 'postCode',
      en: 'Postal Code',
      type: 'input',
      lang: 'salePlain.detail.freight.postCode'
    },
    {
      label: '手机号',
      value: 'mobile',
      en: 'mobile',
      lang: 'salePlain.detail.freight.mobile',
      type: 'input'
    },
    {
      label: '货运单号',
      value: 'billId',
      en: 'billId',
      lang: 'salePlain.detail.freight.billId',
      type: 'input'
    },
    {
      label: '说明',
      value: 'notes',
      en: 'notes',
      lang: 'salePlain.detail.freight.notes',
      type: 'input',
      setLength: 12
    }
  ],
  adjustmentRecord: [
    {
      label: '销售计划调整单',
      value: 'billNo',
      en: 'Code',
      lang: 'salePlain.detail.adjustmentRecord.billNo'
    },
    {
      label: '日期',
      value: 'billDate',
      en: 'billDate',
      lang: 'salePlain.detail.adjustmentRecord.billDate'
    },
    {
      label: '操作',
      value: 'operateName',
      en: 'operateName',
      lang: 'salePlain.detail.adjustmentRecord.operateName'
    },
    {
      label: '货号',
      value: 'goodsCode',
      en: 'goodsCode',
      lang: 'salePlain.detail.adjustmentRecord.goodsCode'
    },
    {
      label: '品名',
      value: 'goodsName',
      en: 'goodsName',
      lang: 'salePlain.detail.adjustmentRecord.goodsName'
    },
    {
      label: '颜色',
      value: 'colorName',
      en: 'colorName',
      lang: 'salePlain.detail.adjustmentRecord.colorName'
    },
    {
      label: '尺码',
      value: 'sizeName',
      en: 'sizeName',
      lang: 'salePlain.detail.adjustmentRecord.sizeName'
    },
    {
      label: '数量',
      value: 'quantity',
      en: 'quantity',
      lang: 'salePlain.detail.adjustmentRecord.quantity'
    },
    {
      label: '审核人',
      value: 'checkByName',
      en: 'Code',
      lang: 'salePlain.detail.adjustmentRecord.checkByName'
    },
    {
      label: '审核时间',
      value: 'checkTime',
      en: 'checkTime',
      lang: 'salePlain.detail.adjustmentRecord.checkTime'
    },
    {
      label: '说明',
      value: 'notes',
      en: 'notes',
      lang: 'salePlain.detail.adjustmentRecord.notes'
    }
  ],
  adjustmentDetail: [
    {
      label: '货号',
      value: 'goodsCode',
      en: 'Code',
      lang: 'salePlain.detail.adjustmentDetail.goodsCode'
    },
    {
      label: '品名',
      value: 'goodsName',
      en: 'goodsName',
      lang: 'salePlain.detail.adjustmentDetail.goodsName'
    },
    {
      label: '吊牌价',
      value: 'tagPrice',
      en: 'tagPrice',
      lang: 'salePlain.detail.adjustmentDetail.tagPrice'
    },
    {
      label: '折扣',
      value: 'discountName',
      en: 'discountName',
      lang: 'salePlain.detail.adjustmentDetail.discountName'
    },
    {
      label: '结算价',
      value: 'balancePrice',
      en: 'balancePrice',
      lang: 'salePlain.detail.adjustmentDetail.balancePrice'
    },
    {
      label: '数量',
      value: 'quantity',
      en: 'quantity',
      lang: 'salePlain.detail.adjustmentDetail.quantity'
    },
    {
      label: '可配货数量',
      value: 'oweQuantity',
      en: 'oweQuantity',
      lang: 'salePlain.detail.adjustmentDetail.oweQuantity'
    },
    {
      label: '总金额',
      value: 'totalPrice',
      en: 'totalPrice',
      lang: 'salePlain.detail.adjustmentDetail.totalPrice'
    }
  ]
}

// 操作记录
export const recordLogObj: RecordLogConfig = {
  formList: [
    {
      label: '计划单号',
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
        apiUrl: commonApiUrl.userFuzzy
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
    salePlain: {
      billNo: '',
      billDate: Tools.getCurrentData(false),
      businessTypeId: '',
      channelId: '',
      manualId: '',
      priceTypeId: '',
      notes: ''
    },
    customFieldMap: {},
    billGoodsList: [],
    billLogistics: {}

  }
  return detailData
}
// 这里定义用途 用作 国际化 的数据
export const salePlain = {
  list: listConfig,
  detail: detailConfig,
  recordLogObj
  // highSearchDialog: highSearchDialog
}
