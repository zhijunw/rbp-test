import {
  CommonConfig,
  commonIndexConfig,
  DetailOperationConfig,
  FormListConfig,
  ListComponentsConfig,
  RecordLogConfig,
  TableHeaderConfig
} from '@/typings'
import { Tools } from '@/utils/tools'
import {
  channelSearchConfig,
  goodsSearchConfig,
  instructionSheetSearchConfig
} from '@/layout-components/vip-dialog/config'

import apiUrl from '@/api/logisticsCenter/deliver'
import commonApiUrl from '@/api/common-api/index'

interface GoodsDetailConfig {
  detailTableHeader: TableHeaderConfig[]
}

interface deliverDetail {
  btns: DetailOperationConfig[]
  formList: FormListConfig[]
  tabsList: CommonConfig[]
  freight: FormListConfig[]
  relateBox: TableHeaderConfig[]
  onlyKey: TableHeaderConfig[]
}

export const globalConfigs = {
  moduleName: 'deliverModule',
  moduleId: '700005', // 这个模块ID是Vuex 注册的
  realModuleId: '700005', // 这个模块ID是和后端对应的
  customVux: {
    state: [],
    mutations: [],
    actions: []
  }
}
const tableHeader: TableHeaderConfig[] = [
  {
    label: '单据编号',
    value: 'billNo',
    en: 'Plain Number',
    width: '150px',
    lang: 'deliver.list.tableHeader.billNo'
  },
  {
    label: '手工单号',
    value: 'manualId',
    en: 'Manual Number',
    lang: 'deliver.list.tableHeader.manualId'
  },
  {
    label: '渠道',
    value: 'channelName',
    en: 'channel',
    lang: 'deliver.list.tableHeader.channelName'
  },
  {
    label: '已配数量',
    value: 'totalAllocateQuantity',
    en: 'Allocated quantity',
    lang: 'deliver.list.tableHeader.totalAllocateQuantity'
  },
  {
    label: '数量',
    value: 'totalQuantity',
    en: 'number',
    lang: 'deliver.list.tableHeader.totalQuantity',
    isShowTotal: true
  },
  {
    label: '金额',
    value: 'totalBalancePrice',
    en: 'money',
    lang: 'deliver.list.tableHeader.totalBalancePrice',
    isShowTotal: true
  },
  {
    label: '业务类型',
    value: 'businessTypeName',
    en: 'Business type',
    lang: 'deliver.list.tableHeader.businessTypeName'
  },
  {
    label: '价格类型',
    value: 'priceTypeName',
    en: 'Price Type',
    lang: 'deliver.list.tableHeader.priceTypeName'
  },
  {
    label: '吊牌价',
    value: 'totalTagPrice',
    en: 'Price',
    lang: 'deliver.list.tableHeader.totalTagPrice'
  },
  {
    label: '审批状态',
    value: 'flowTypeName',
    en: 'flowTypeName',
    width: '150px',
    lang: 'deliver.list.tableHeader.flowTypeName'
  },
  {
    label: '制单用户',
    value: 'createdByName',
    en: 'createdByName',
    lang: 'deliver.list.tableHeader.createdByName'
  },
  {
    label: '制单时间',
    value: 'createdTime',
    en: 'Make Up Date',
    lang: 'deliver.list.tableHeader.createdTime'
  },
  {
    label: '修改用户',
    value: 'updatedByName',
    en: 'Modify User',
    lang: 'deliver.list.tableHeader.updatedByName'
  },
  {
    label: '修改日期',
    value: 'updatedTime',
    en: 'Modify Date',
    lang: 'deliver.list.tableHeader.updatedTime'
  },
  {
    label: '审核用户',
    value: 'checkByName',
    en: 'Audit User',
    lang: 'deliver.list.tableHeader.checkByName'
  },
  {
    label: '审核日期',
    value: 'checkTime',
    en: 'Audit Date',
    lang: 'deliver.list.tableHeader.checkTime'
  },
  {
    label: '作废用户',
    value: 'cancelByName',
    en: 'Invalid user',
    lang: 'deliver.list.tableHeader.cancelByName'
  },
  {
    label: '作废日期',
    value: 'cancelTime',
    en: 'Invalid Date',
    lang: 'deliver.list.tableHeader.cancelTime'
  },
  {
    label: '备注',
    value: 'remark',
    en: 'remark',
    lang: 'deliver.list.tableHeader.remark'
  },
  /** ~~~*/
  {
    label: '状态',
    value: 'statusName',
    en: 'Status',
    lang: 'deliver.list.tableHeader.statusName'
  },
  {
    label: '单据日期',
    value: 'billDate',
    en: 'billDate',
    lang: 'deliver.list.tableHeader.billDate'
  },
  {
    label: '说明',
    value: 'notes',
    en: 'notes',
    lang: 'deliver.list.tableHeader.notes'
  },
  {
    label: '渠道编号',
    value: 'channelCode',
    en: 'channelCode',
    lang: 'deliver.list.tableHeader.channelCode'
  },
  {
    label: '执行状态',
    value: 'processStatusName',
    en: 'processStatusName',
    lang: 'deliver.list.tableHeader.processStatusName'
  },
  {
    label: '货币类型',
    value: 'currencyTypeName',
    en: 'currencyTypeName',
    lang: 'deliver.list.tableHeader.currencyTypeName'
  },
  {
    label: '反审核用户',
    value: 'uncheckByName',
    en: 'uncheckByName',
    lang: 'deliver.list.tableHeader.uncheckByName'
  },
  {
    label: '反审核时间',
    value: 'uncheckTime',
    en: 'uncheckTime',
    lang: 'deliver.list.tableHeader.uncheckTime'
  },
  {
    label: '组织架构1',
    value: 'layoutChannelOrganization1',
    en: 'layoutChannelOrganization1',
    lang: 'deliver.list.tableHeader.layoutChannelOrganization1'
  },
  {
    label: '组织架构2',
    value: 'layoutChannelOrganization2',
    en: 'layoutChannelOrganization2',
    lang: 'deliver.list.tableHeader.layoutChannelOrganization1'
  },
  {
    label: '组织架构3',
    value: 'layoutChannelOrganization3',
    en: 'layoutChannelOrganization3',
    lang: 'deliver.list.tableHeader.layoutChannelOrganization1'
  },
  {
    label: '组织架构4',
    value: 'layoutChannelOrganization4',
    en: 'layoutChannelOrganization4',
    lang: 'deliver.list.tableHeader.layoutChannelOrganization4'
  },
  {
    label: '组织架构5',
    value: 'layoutChannelOrganization5',
    en: 'layoutChannelOrganization5',
    lang: 'deliver.list.tableHeader.layoutChannelOrganization1'
  },
  {
    label: '组织渠道编号',
    value: 'layoutChannelCode',
    en: 'layoutChannelCode',
    lang: 'deliver.list.tableHeader.layoutChannelCode'
  },
  {
    label: '组织渠道名称',
    value: 'layoutChannelName',
    en: 'layoutChannelName',
    lang: 'deliver.list.tableHeader.layoutChannelName'
  },
  {
    label: '组织渠道全称',
    value: 'layoutChannelFullName',
    en: 'layoutChannelFullName',
    lang: 'deliver.list.tableHeader.layoutChannelFullName'
  },
  {
    label: '组织渠道创建日期',
    value: 'layoutChannelBuildDate',
    en: 'layoutChannelBuildDate',
    lang: 'deliver.list.tableHeader.layoutChannelBuildDate'
  },
  {
    label: '组织渠道区域',
    value: 'layoutChannelRegion',
    en: 'layoutChannelRegion',
    lang: 'deliver.list.tableHeader.layoutChannelRegion'
  },
  {
    label: '组织渠道地址',
    value: 'layoutChannelAddress',
    en: 'layoutChannelAddress',
    lang: 'deliver.list.tableHeader.layoutChannelAddress'
  },
  {
    label: '组织上级渠道名称',
    value: 'layoutChannelParentChannelName',
    en: 'layoutChannelParentChannelName',
    lang: 'deliver.list.tableHeader.layoutChannelParentChannelName'
  },
  {
    label: '组织渠道分支公司名称',
    value: 'layoutChannelBranchCompanyName',
    en: 'layoutChannelBranchCompanyName',
    lang: 'deliver.list.tableHeader.layoutChannelBranchCompanyName'
  },
  {
    label: '组织渠道等级名称',
    value: 'layoutChannelGradeName',
    en: 'layoutChannelGradeName',
    lang: 'deliver.list.tableHeader.layoutChannelGradeName'
  },
  {
    label: '组织渠道业务格式名称',
    value: 'layoutChannelBusinessFormatName',
    en: 'layoutChannelBusinessFormatName',
    lang: 'deliver.list.tableHeader.layoutChannelBusinessFormatName'
  },
  {
    label: '组织渠道价格类型',
    value: 'layoutChannelBalanceType',
    en: 'layoutChannelBalanceType',
    lang: 'deliver.list.tableHeader.layoutChannelBalanceType'
  },
  {
    label: '组织渠道零售价格类型',
    value: 'layoutChannelRetailTagPriceType',
    en: 'layoutChannelRetailTagPriceType',
    lang: 'deliver.list.tableHeader.layoutChannelRetailTagPriceType'
  },
  {
    label: '组织渠道销售价格类型',
    value: 'layoutChannelSaleTagPriceType',
    en: 'layoutChannelSaleTagPriceType',
    lang: 'deliver.list.tableHeader.layoutChannelSaleTagPriceType'
  },
  {
    label: '组织渠道销售范围',
    value: 'layoutChannelSaleRangeName',
    en: 'layoutChannelSaleRangeName',
    lang: 'deliver.list.tableHeader.layoutChannelSaleRangeName'
  },
  {
    label: '组织渠道法人名称',
    value: 'layoutChannelLegalPersonName',
    en: 'layoutChannelLegalPersonName',
    lang: 'deliver.list.tableHeader.layoutChannelLegalPersonName'
  },
  {
    label: '组织渠道信用额度',
    value: 'layoutChannelCredit',
    en: 'layoutChannelCredit',
    lang: 'deliver.list.tableHeader.layoutChannelCredit'
  }
]
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
      },
      dropdown: [
        {
          event: 'deliveryByorder',
          lang: 'layout.btns.deliveryByorder'
        },
        {
          event: 'directDelivery',
          lang: 'layout.btns.directDelivery'
        }
      ]
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
    placeholder: 'form.placeholder.input',
    selectOptions: [{ label: '单据编号', value: 0 }, { label: '手工单号', value: 1 }, { label: '指令单号', value: 2 }],
    selectDefault: 0,
    long: true,
    prefixIcon: 'el-icon-search'
  },
  tableHeader: tableHeader,
  formList: [
    {
      label: '发货渠道',
      en: 'channel',
      lang: 'deliver.list.filter.channelIdList',
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
      label: '收货渠道',
      en: 'toChannelIdList',
      lang: 'deliver.list.filter.toChannelIdList',
      value: 'toChannelIdList',
      type: 'highSearch',
      linkValue: 'toChannelFilterParam',
      highSearchConfig: {
        dialogSearchConfig: channelSearchConfig,
        apiUrl: commonApiUrl.channelFuzzy
      },
      setLength: 12
    },
    {
      label: '货品',
      en: 'goods',
      lang: 'deliver.list.filter.goodsIdList',
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
      label: '价格类型',
      en: 'Price type',
      lang: 'deliver.list.filter.priceTypeIdList',
      value: 'priceTypeIdList',
      matchSelectKey: 'priceTypeIds',
      type: 'select',
      fuzzyConfig: {
        multiple: true
      },
      options: [],
      setLength: 12
    },
    {
      label: '处理状态',
      value: 'processStatusList',
      en: 'processStatusList',
      lang: 'deliver.list.filter.processStatusList',
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
    },
    {
      label: '单据状态',
      value: 'status',
      en: 'State',
      lang: 'deliver.list.filter.status',
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
    },
    {
      label: '审批状态',
      value: 'status_',
      en: 'status_',
      lang: 'deliver.list.filter.status_',
      setLength: 12,
      type: 'select',
      config: {
        multiple: true
      },
      options: [
        {
          label: '初始化',
          value: '0'
        },
        {
          label: '待审核',
          value: '1'
        },
        {
          label: '审核中',
          value: '2'
        },
        {
          label: '已驳回',
          value: '3'
        },
        {
          label: '已通过',
          value: '3'
        }
      ]
    },
    {
      label: '制单用户',
      en: 'Single person',
      lang: 'deliver.list.filter.createdByList',
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
      lang: 'deliver.list.filter.createdTime',
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
      lang: 'deliver.list.filter.updateByList',
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
      lang: 'deliver.list.filter.updatedTime',
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
      lang: 'deliver.list.filter.checkByList',
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
      lang: 'deliver.list.filter.checkTime',
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
      lang: 'deliver.list.filter.cancelByList',
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
      lang: 'deliver.list.filter.cancelTime',
      value: 'cancelTime',
      config: {
        type: 'daterange'
      },
      type: 'datePick',
      setLength: 12
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

// 详情 [按单发货/直接发货]
export const deliveryFormList = [
  {
    label: '单据编号',
    value: 'billNo',
    en: 'Plain Number',
    lang: 'deliver.detail.formList.billNo',
    editDisabled: true,
    type: 'input',
    alwaysDisabled: true,
    disabled: false
  },
  {
    label: '单据日期',
    value: 'billDate',
    en: 'Document date',
    lang: 'deliver.detail.formList.billDate',
    type: 'datePick',
    disabled: false,
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
    value: 'businessTypeIds',
    en: 'Business type',
    lang: 'deliver.detail.formList.businessTypeIds',
    matchSelectKey: 'businessTypeIds',
    type: 'select',
    disabled: false,
    rules: [
      {
        required: true,
        message: '请输入业务类型',
        trigger: ['blur', 'change']
      }
    ]
  },
  {
    label: '指令单',
    value: 'noticeId',
    en: 'instructionSheet',
    lang: 'deliver.detail.formList.noticeId',
    type: 'other',
    disabled: false,
    highSearchConfig: {
      dialogSearchConfig: Object.assign({}, instructionSheetSearchConfig, {
        isSingleSelect: true,
        dialogWidth: '600px'
      }),
      apiUrl: commonApiUrl.noticeBillFuzzy
    },
    rules: [
      {
        required: true,
        message: '请选择',
        trigger: ['change']
      }
    ]
  },
  {
    label: '发货渠道',
    value: 'channelId',
    en: 'Channel',
    lang: 'deliver.detail.formList.channelId',
    type: 'other',
    disabled: false,
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
        message: '请选择发货渠道',
        trigger: 'blur'
      }
    ]
  },
  {
    label: '收货渠道',
    value: 'toChannelId',
    en: 'Channel',
    lang: 'deliver.detail.formList.toChannelId',
    type: 'other',
    alwaysDisabled: false,
    disabled: false,
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
        message: '请选择收货渠道',
        trigger: 'blur'
      }
    ]
  },
  {
    label: '价格类型',
    value: 'priceTypeIds',
    en: 'Price type',
    lang: 'deliver.detail.formList.priceTypeIds',
    matchSelectKey: 'priceTypeIds',
    type: 'select',
    alwaysDisabled: false,
    disabled: false,
    rules: [
      {
        required: true,
        message: '请输入价格类型',
        trigger: ['blur', 'change']
      }
    ]

  },
  {
    label: '手工单号',
    value: 'manualId',
    en: 'Plain Number',
    lang: 'deliver.detail.formList.manualId',
    editDisabled: true,
    disabled: false,
    type: 'input'
  },
  {
    label: '备注',
    value: 'notes',
    en: 'Remark',
    lang: 'deliver.detail.formList.notes',
    type: 'input',
    disabled: false,
    setLength: 12

  }
]
export const deliveryAutoFromList = [
  {
    label: '单据编号',
    value: 'billNo',
    en: 'Plain Number',
    lang: 'deliver.detail.formList.billNo',
    editDisabled: true,
    type: 'input',
    alwaysDisabled: true,
    disabled: false
  },
  {
    label: '单据日期',
    value: 'billDate',
    en: 'Document date',
    lang: 'deliver.detail.formList.billDate',
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
    ],
    disabled: false
  },
  {
    label: '业务类型',
    value: 'businessTypeIds',
    en: 'Business type',
    lang: 'deliver.detail.formList.businessTypeIds',
    matchSelectKey: 'businessTypeIds',
    type: 'select',
    rules: [
      {
        required: true,
        message: '请输入业务类型',
        trigger: ['blur', 'change']
      }
    ],
    disabled: false
  },
  {
    label: '发货渠道',
    value: 'channelId',
    en: 'Channel',
    lang: 'deliver.detail.formList.channelId',
    type: 'other',
    disabled: false,
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
        message: '请选择发货渠道',
        trigger: 'blur'
      }
    ]
  },
  {
    label: '收货渠道',
    value: 'toChannelId',
    en: 'Channel',
    lang: 'deliver.detail.formList.toChannelId',
    type: 'other',
    disabled: false,
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
        message: '请选择收货渠道',
        trigger: 'blur'
      }
    ]
  },
  {
    label: '价格类型',
    value: 'priceTypeIds',
    en: 'Price type',
    lang: 'deliver.detail.formList.priceTypeIds',
    matchSelectKey: 'priceTypeIds',
    type: 'select',
    rules: [
      {
        required: true,
        message: '请输入价格类型',
        trigger: ['blur', 'change']
      }
    ],
    disabled: false

  },
  {
    label: '手工单号',
    value: 'manualId',
    en: 'Plain Number',
    lang: 'deliver.detail.formList.manualId',
    editDisabled: true,
    type: 'input',
    disabled: false
  },
  {
    label: '',
    value: 'null',
    en: '',
    lang: 'distributionPlain.detail.formList.null',
    type: 'other',
    disabled: false
  },
  {
    label: '备注',
    value: 'notes',
    en: 'Remark',
    lang: 'deliver.detail.formList.notes',
    type: 'input',
    setLength: 12,
    disabled: false
  }
]
export const detailConfig: deliverDetail = {
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
        apiUrl: 'apiUrl.printBatch'
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
          id: '',
          moduleId: globalConfigs.realModuleId
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
          id: '',
          moduleId: globalConfigs.realModuleId
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
          id: '',
          moduleId: globalConfigs.realModuleId
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
          id: '',
          moduleId: globalConfigs.realModuleId
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
        params: [{ moduleId: globalConfigs.realModuleId }]
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
        apiUrl: ''
      }
    }
  ],
  formList: [
    {
      label: '指令单',
      value: 'noticeId',
      en: 'Business type',
      lang: 'deliver.detail.formList.noticeId',
      matchSelectKey: 'noticeBillNo',
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
      label: '计划单号',
      value: 'billNo',
      en: 'Plain Number',
      lang: 'deliver.detail.formList.billNo',
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
      lang: 'deliver.detail.formList.billDate',
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
      value: 'businessTypeIds',
      en: 'Business type',
      lang: 'deliver.detail.formList.businessTypeIds',
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
      label: '指令单',
      value: 'instructionSheet',
      en: 'instructionSheet',
      lang: 'deliver.detail.formList.instructionSheet',
      matchSelectKey: 'instructionSheet',
      type: 'other',
      highSearchConfig: {
        dialogSearchConfig: Object.assign({}, instructionSheetSearchConfig, {
          isSingleSelect: true,
          dialogWidth: '600px'
        }),
        apiUrl: 'commonApiUrl.channelFuzzy'
      },
      rules: [
        {
          required: true,
          message: '请输入业务类型',
          trigger: ['blur', 'change']
        }
      ]
    },
    {
      label: '发货渠道',
      value: 'channelId',
      en: 'Channel',
      lang: 'deliver.detail.formList.channelId',
      type: 'other',
      disabled: false,
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
          message: '请选择发货渠道',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '收货渠道',
      value: 'toChannelId',
      en: 'Channel',
      lang: 'deliver.detail.formList.toChannelId',
      type: 'other',
      disabled: false,
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
          message: '请选择收货渠道',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '手工单号',
      value: 'manualId',
      en: 'Manual Number',
      lang: 'deliver.detail.formList.manualId',
      type: 'input'
    },
    {
      label: '价格类型',
      value: 'priceTypeIds',
      en: 'Price type',
      lang: 'deliver.detail.formList.priceTypeIds',
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
      lang: 'deliver.detail.formList.notes',
      type: 'input',
      setLength: 12

    }
  ],
  tabsList: [
    {
      label: '货品明细',
      value: 'goodsDetail',
      en: 'Goods Details',
      lang: 'deliver.detail.tabsList.goodsDetail'
    },
    {
      label: '货运信息',
      value: 'freightInfo',
      en: 'Freight Info',
      lang: 'deliver.detail.tabsList.freightInfo'
    },
    {
      label: '关联箱',
      value: 'associatedBox',
      en: 'Associated Box',
      lang: 'deliver.detail.tabsList.associatedBox'
    },
    {
      label: '唯一码',
      value: 'onlyKey',
      en: 'only Key',
      lang: 'deliver.detail.tabsList.onlyKey'
    }
  ],
  freight: [
    {
      label: '物流公司',
      value: 'logisticsBillCode',
      matchSelectKey: 'logisticsCompanyIds',
      en: 'logistics company',
      lang: 'deliver.detail.freight.logisticsBillCode',
      type: 'select',
      options: []
    },
    {
      label: '国家/地区',
      value: 'Country',
      en: 'Country',
      lang: 'deliver.detail.freight.Country',
      type: 'select',
      options: []
    },
    {
      label: '州/省/地区',
      value: 'province',
      en: 'province',
      lang: 'deliver.detail.freight.province',
      type: 'select',
      options: []
    },
    {
      label: '市',
      value: 'city',
      en: 'city',
      lang: 'deliver.detail.freight.city',
      type: 'select',
      options: []
    },
    {
      label: '县/区',
      value: 'county',
      en: 'county',
      lang: 'deliver.detail.freight.county',
      type: 'select',
      options: []
    },
    {
      label: '详细地址',
      value: 'address',
      en: 'address',
      lang: 'deliver.detail.freight.address',
      type: 'input',
      setLength: 12
    },
    {
      label: '收货人',
      value: 'contactsPerson',
      en: 'contactsPerson',
      lang: 'deliver.detail.freight.contactsPerson',
      type: 'input'
    },
    {
      label: '邮政编码',
      value: 'postCode',
      en: 'Postal Code',
      type: 'input',
      lang: 'deliver.detail.freight.postCode'
    },
    {
      label: '手机号',
      value: 'mobile',
      en: 'mobile',
      lang: 'deliver.detail.freight.mobile',
      type: 'input'
    },
    {
      label: '货运单号',
      value: 'billId',
      en: 'billId',
      lang: 'deliver.detail.freight.billId',
      type: 'input'
    },
    {
      label: '说明',
      value: 'notes',
      en: 'notes',
      lang: 'deliver.detail.freight.notes',
      type: 'input',
      setLength: 12
    }
  ],
  relateBox: [
    {
      label: '箱号',
      value: 'code',
      en: 'code',
      width: '150px',
      lang: 'deliver.detail.relateBox.code'
    },
    {
      label: '手工单号',
      value: 'manualId',
      en: 'Manual Number',
      lang: 'deliver.detail.relateBox.manualId'
    },
    {
      label: '装箱人',
      value: 'createdByName',
      en: 'createdByName',
      lang: 'deliver.detail.relateBox.createdByName'
    },
    {
      label: '装箱日期',
      value: 'createdTime',
      en: 'createdTime',
      lang: 'deliver.detail.relateBox.createdTime'
    },
    {
      label: '货品数量',
      value: 'quantity',
      en: 'quantity',
      lang: 'deliver.detail.relateBox.quantity'
    },
    {
      label: '重量',
      value: 'weight',
      en: 'weight',
      lang: 'deliver.detail.relateBox.weight'
    },
    {
      label: '备注',
      value: 'notes',
      en: 'notes',
      lang: 'deliver.detail.relateBox.notes'
    }
  ],
  onlyKey: [
    {
      label: '唯一码',
      value: 'code',
      en: 'code',
      width: '150px',
      lang: 'deliver.detail.onlyKey.code'
    },
    {
      label: '货号',
      value: 'manualId',
      en: 'Manual Number',
      lang: 'deliver.detail.onlyKey.manualId'
    },
    {
      label: '品名',
      value: 'createdByName',
      en: 'createdByName',
      lang: 'deliver.detail.onlyKey.createdByName'
    },
    {
      label: '颜色',
      value: 'createdTime',
      en: 'createdTime',
      lang: 'deliver.detail.onlyKey.createdTime'
    },
    {
      label: '尺码',
      value: 'quantity',
      en: 'quantity',
      lang: 'deliver.detail.onlyKey.quantity'
    },
    {
      label: '内长',
      value: 'weight',
      en: 'weight',
      lang: 'deliver.detail.onlyKey.weight'
    }
  ]
}
export const importGoodsHeader: TableHeaderConfig[] = [
  {
    label: '货号',
    value: 'goodsCode',
    en: 'Goods Code',
    lang: 'deliver.importGoodsHeader.goodsCode'
  },
  {
    label: '品名',
    value: 'goodsName',
    en: 'Goods Name',
    lang: 'deliver.importGoodsHeader.goodsName'
  },
  {
    label: '数量',
    value: 'quantity',
    en: 'Quantity',
    lang: 'deliver.importGoodsHeader.quantity'
  },
  {
    label: '欠数',
    value: 'ownQuantity',
    en: 'Own Quantity',
    lang: 'deliver.importGoodsHeader.ownQuantity'
  }
]
// 操作记录
export const recordLogObj: RecordLogConfig = {
  formList: [
    {
      label: '计划单号',
      value: 'billNo',
      en: 'Plain Number',
      lang: 'deliver.recordLog.formList.billNo',
      type: 'input',
      setLength: 12

    },
    {
      label: '操作人',
      en: 'operateBy',
      lang: 'deliver.recordLog.formList.operateBy',
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
      lang: 'deliver.recordLog.formList.actionCode',
      value: 'actionCode',
      type: 'select',
      setLength: 12,
      options: []
    },
    {
      label: '操作时间',
      en: 'operateDate',
      lang: 'deliver.recordLog.formList.operateDate',
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
      lang: 'deliver.recordLog.tableHeader.billNo'
    },
    {
      label: '操作',
      value: 'actionName',
      en: 'actionName',
      lang: 'deliver.recordLog.tableHeader.actionName'
    },
    {
      label: '操作人',
      value: 'operateByName',
      en: 'Operate Name',
      lang: 'deliver.recordLog.tableHeader.operateByName'
    },
    {
      label: '操作时间',
      value: 'operateTime',
      en: 'operateTime',
      lang: 'deliver.recordLog.tableHeader.operateTime'
    }
  ],
  api: commonApiUrl.operatorLog,
  moduleId: globalConfigs.realModuleId
}
export const initFormData = () => {
  return {
    deliver: {
      billNo: '',
      billDate: Tools.getCurrentData(false),
      businessTypeIds: '',
      toChannelId: '',
      channelId: '',
      manualId: '',
      priceTypeIds: '',
      notes: '',
      noticeId: ''
    },
    customFieldMap: {},
    billGoodsList: [],
    billLogistics: {}

  }
}
// 这里定义用途 用作 国际化 的数据
export const deliver = {
  list: listConfig,
  detail: detailConfig,
  recordLogObj,
  importGoodsHeader
}
