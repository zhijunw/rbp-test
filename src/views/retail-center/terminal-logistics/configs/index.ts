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

  sendSearchConfig,
  goodsSearchConfig,
  channelSearchConfig } from '@/layout-components/vip-dialog/config'

import apiUrl from '@/api/retail-center/terminal-logistics'
import commonApiUrl from '@/api/common-api/index'
interface GoodsDetailConfig {
    detailTableHeader: TableHeaderConfig[]
}
interface terminalLogisticsDetail {
  btns: DetailOperationConfig[]
  formList: FormListConfig[]
  tabsList: CommonConfig[]
  // goodsDetail: GoodsDetailConfig,
  adjustmentRecord: TableHeaderConfig[]
  freight: FormListConfig[]
  adjustmentDetail:TableHeaderConfig[]
  differenceDetail:TableHeaderConfig[]
  associationBox:TableHeaderConfig[]
  uniqueCode:TableHeaderConfig[]
  totalInfo:any[]
}

export const globalConfigs = {
  moduleName: 'terminalLogisticsModule',
  moduleId: 'terminalLogisticsModule', // 这个模块ID是Vuex 注册的
  realModuleId: '700007', // 这个模块ID是和后端对应的
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
    lang: 'terminalLogistics.list.tableHeader.billNo'
  },
  {
    label: '手工单号',
    value: 'manualId',
    en: 'Manual Number',
    lang: 'terminalLogistics.list.tableHeader.manualId'
  },
  {
    label: '发货渠道',
    value: 'channelName',
    en: 'channel',
    lang: 'terminalLogistics.list.tableHeader.channelName'
  },
  {
    label: '收货渠道',
    value: 'toChannelName',
    en: 'toChannelName',
    lang: 'terminalLogistics.list.tableHeader.toChannelName'
  },
  {
    label: '已配数量',
    value: 'totalAllocateQuantity',
    en: 'Allocated quantity',
    lang: 'terminalLogistics.list.tableHeader.totalAllocateQuantity'
  },
  {
    label: '数量',
    value: 'totalQuantity',
    en: 'number',
    lang: 'terminalLogistics.list.tableHeader.totalQuantity',
    isShowTotal: true
  },
  {
    label: '金额',
    value: 'totalBalancePrice',
    en: 'money',
    lang: 'terminalLogistics.list.tableHeader.totalBalancePrice',
    isShowTotal: true
  },
  {
    label: '业务类型',
    value: 'businessTypeName',
    en: 'Business type',
    lang: 'terminalLogistics.list.tableHeader.businessTypeName'
  },
  {
    label: '价格类型',
    value: 'priceTypeName',
    en: 'Price Type',
    lang: 'terminalLogistics.list.tableHeader.priceTypeName'
  },
  {
    label: '吊牌价',
    value: 'totalTagPrice',
    en: 'Price',
    lang: 'terminalLogistics.list.tableHeader.totalTagPrice'
  },
  {
    label: '审批状态',
    value: 'flowTypeName',
    en: 'flowTypeName',
    width: '150px',
    lang: 'terminalLogistics.list.tableHeader.flowTypeName'
  },
  {
    label: '制单用户',
    value: 'createdByName',
    en: 'createdByName',
    lang: 'terminalLogistics.list.tableHeader.createdByName'
  },
  {
    label: '制单时间',
    value: 'createdTime',
    en: 'Make Up Date',
    lang: 'terminalLogistics.list.tableHeader.createdTime'
  },
  {
    label: '修改用户',
    value: 'updatedByName',
    en: 'Modify User',
    lang: 'terminalLogistics.list.tableHeader.updatedByName'
  },
  {
    label: '修改日期',
    value: 'updatedTime',
    en: 'Modify Date',
    lang: 'terminalLogistics.list.tableHeader.updatedTime'
  },
  {
    label: '审核用户',
    value: 'checkByName',
    en: 'Audit User',
    lang: 'terminalLogistics.list.tableHeader.checkByName'
  },
  {
    label: '审核日期',
    value: 'checkTime',
    en: 'Audit Date',
    lang: 'terminalLogistics.list.tableHeader.checkTime'
  },
  {
    label: '作废用户',
    value: 'cancelByName',
    en: 'Invalid user',
    lang: 'terminalLogistics.list.tableHeader.cancelByName'
  },
  {
    label: '作废日期',
    value: 'cancelTime',
    en: 'Invalid Date',
    lang: 'terminalLogistics.list.tableHeader.cancelTime'
  },
  {
    label: '备注',
    value: 'remark',
    en: 'remark',
    lang: 'terminalLogistics.list.tableHeader.remark'
  },
  {
    label: '状态',
    value: 'statusName',
    en: 'Status',
    lang: 'terminalLogistics.list.tableHeader.statusName'
  },
  {
    label: '单据日期',
    value: 'billDate',
    en: 'billDate',
    lang: 'terminalLogistics.list.tableHeader.billDate'
  },
  {
    label: '说明',
    value: 'notes',
    en: 'notes',
    lang: 'terminalLogistics.list.tableHeader.notes'
  },
  {
    label: '渠道编号',
    value: 'channelCode',
    en: 'channelCode',
    lang: 'terminalLogistics.list.tableHeader.channelCode'
  },
  {
    label: '执行状态',
    value: 'processStatusName',
    en: 'processStatusName',
    lang: 'terminalLogistics.list.tableHeader.processStatusName'
  },
  {
    label: '货币类型',
    value: 'currencyTypeName',
    en: 'currencyTypeName',
    lang: 'terminalLogistics.list.tableHeader.currencyTypeName'
  },
  {
    label: '反审核用户',
    value: 'uncheckByName',
    en: 'uncheckByName',
    lang: 'terminalLogistics.list.tableHeader.uncheckByName'
  },
  {
    label: '反审核时间',
    value: 'uncheckTime',
    en: 'uncheckTime',
    lang: 'terminalLogistics.list.tableHeader.uncheckTime'
  },
  {
    label: '组织架构1',
    value: 'layoutChannelOrganization1',
    en: 'layoutChannelOrganization1',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelOrganization1'
  },
  {
    label: '组织架构2',
    value: 'layoutChannelOrganization2',
    en: 'layoutChannelOrganization2',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelOrganization1'
  },
  {
    label: '组织架构3',
    value: 'layoutChannelOrganization3',
    en: 'layoutChannelOrganization3',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelOrganization1'
  },
  {
    label: '组织架构4',
    value: 'layoutChannelOrganization4',
    en: 'layoutChannelOrganization4',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelOrganization4'
  },
  {
    label: '组织架构5',
    value: 'layoutChannelOrganization5',
    en: 'layoutChannelOrganization5',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelOrganization1'
  },
  {
    label: '组织渠道编号',
    value: 'layoutChannelCode',
    en: 'layoutChannelCode',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelCode'
  },
  {
    label: '组织渠道名称',
    value: 'layoutChannelName',
    en: 'layoutChannelName',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelName'
  },
  {
    label: '组织渠道全称',
    value: 'layoutChannelFullName',
    en: 'layoutChannelFullName',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelFullName'
  },
  {
    label: '组织渠道创建日期',
    value: 'layoutChannelBuildDate',
    en: 'layoutChannelBuildDate',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelBuildDate'
  },
  {
    label: '组织渠道区域',
    value: 'layoutChannelRegion',
    en: 'layoutChannelRegion',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelRegion'
  },
  {
    label: '组织渠道地址',
    value: 'layoutChannelAddress',
    en: 'layoutChannelAddress',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelAddress'
  },
  {
    label: '组织上级渠道名称',
    value: 'layoutChannelParentChannelName',
    en: 'layoutChannelParentChannelName',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelParentChannelName'
  },
  {
    label: '组织渠道分支公司名称',
    value: 'layoutChannelBranchCompanyName',
    en: 'layoutChannelBranchCompanyName',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelBranchCompanyName'
  },
  {
    label: '组织渠道等级名称',
    value: 'layoutChannelGradeName',
    en: 'layoutChannelGradeName',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelGradeName'
  },
  {
    label: '组织渠道业务格式名称',
    value: 'layoutChannelBusinessFormatName',
    en: 'layoutChannelBusinessFormatName',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelBusinessFormatName'
  },
  {
    label: '组织渠道价格类型',
    value: 'layoutChannelBalanceType',
    en: 'layoutChannelBalanceType',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelBalanceType'
  },
  {
    label: '组织渠道零售价格类型',
    value: 'layoutChannelRetailTagPriceType',
    en: 'layoutChannelRetailTagPriceType',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelRetailTagPriceType'
  },
  {
    label: '组织渠道销售价格类型',
    value: 'layoutChannelSaleTagPriceType',
    en: 'layoutChannelSaleTagPriceType',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelSaleTagPriceType'
  },
  {
    label: '组织渠道销售范围',
    value: 'layoutChannelSaleRangeName',
    en: 'layoutChannelSaleRangeName',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelSaleRangeName'
  },
  {
    label: '组织渠道法人名称',
    value: 'layoutChannelLegalPersonName',
    en: 'layoutChannelLegalPersonName',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelLegalPersonName'
  },
  {
    label: '组织渠道信用额度',
    value: 'layoutChannelCredit',
    en: 'layoutChannelCredit',
    lang: 'terminalLogistics.list.tableHeader.layoutChannelCredit'
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
    selectOptions: [{ label: '单据编号', value: 0 }, { label: '手工单号', value: 1 }, { label: '发货单号', value: 2 }],
    selectDefault: 0,
    long: true,
    prefixIcon: 'el-icon-search'
  },
  tableHeader: tableHeader,
  formList: [
    {
      label: '发货渠道',
      en: 'channelId',
      lang: 'terminalLogistics.list.filter.channelId',
      value: 'channelId',
      type: 'highSearch',
      linkValue: 'channelIdFilterParam',
      highSearchConfig: {
        dialogSearchConfig: channelSearchConfig,
        apiUrl: commonApiUrl.channelFuzzy
      },
      setLength: 12
    },
    {
      label: '收货渠道',
      en: 'toChannelId',
      lang: 'terminalLogistics.list.filter.toChannelId',
      value: 'toChannelId',
      type: 'highSearch',
      linkValue: 'toChannelIdFilterParam',
      highSearchConfig: {
        dialogSearchConfig: goodsSearchConfig,
        apiUrl: commonApiUrl.goodsFuzzy
      },
      setLength: 12
    },
    {
      label: '货品',
      en: 'goods',
      lang: 'terminalLogistics.list.filter.goodsIdList',
      value: 'goodsIdList',
      linkValue: 'goodsIdListFilterParam',
      type: 'highSearch',
      highSearchConfig: {
        dialogSearchConfig: goodsSearchConfig,
        apiUrl: commonApiUrl.goodsFuzzy
      },
      setLength: 12
    },
    {
      label: '价格类型',
      en: 'Price type',
      lang: 'terminalLogistics.list.filter.priceTypeIdList',
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
      label: '单据状态',
      value: 'billStatus',
      en: 'billStatus',
      lang: 'terminalLogistics.list.filter.billStatus',
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
      value: 'auditStatus',
      en: 'auditStatus',
      lang: 'terminalLogistics.list.filter.auditStatus',
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
        }, {
          label: '已通过',
          value: '4'
        }
      ]
    },
    {
      label: '备注',
      value: 'remake',
      en: 'remake',
      lang: 'terminalLogistics.list.filter.remake',
      type: 'input'
    },
    {
      label: '制单用户',
      en: 'Single person',
      lang: 'terminalLogistics.list.filter.createdByList',
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
      lang: 'terminalLogistics.list.filter.createdTime',
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
      lang: 'terminalLogistics.list.filter.updateByList',
      value: 'updateByList',
      type: 'filter',
      fuzzyConfig: {
        apiUrl: commonApiUrl.userFuzzy,
        multiple: true
      },
      setLength: 12
    },
    {
      label: '修改日期',
      en: 'Last modified date',
      lang: 'terminalLogistics.list.filter.updatedTime',
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
      lang: 'terminalLogistics.list.filter.checkByList',
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
      lang: 'terminalLogistics.list.filter.checkTime',
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
      lang: 'terminalLogistics.list.filter.cancelByList',
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
      lang: 'terminalLogistics.list.filter.cancelTime',
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

export const detailConfig: terminalLogisticsDetail = {
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
        apiUrl: apiUrl.operationLog
      }
    }
  ],
  formList: [
    {
      label: '单据编号',
      value: 'billNo',
      en: 'Plain Number',
      lang: 'terminalLogistics.detail.formList.billNo',
      editDisabled: true,
      type: 'input',
      alwaysDisabled: true
    },
    {
      label: '单据日期',
      value: 'billDate',
      en: 'Document date',
      lang: 'terminalLogistics.detail.formList.billDate',
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
      lang: 'terminalLogistics.detail.formList.businessTypeId',
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
      label: '发货单',
      value: 'sendId',
      en: 'sendId',
      lang: 'terminalLogistics.detail.formList.sendId',
      type: 'other',
      highSearchConfig: {
        customerQuery: false,
        dialogSearchConfig: Object.assign({}, sendSearchConfig, {
          isSingleSelect: true,
          selectApi: `${apiUrl.billDropDown}?moduleId=${globalConfigs.realModuleId}`
          // dialogWidth: '600px'
        }),
        apiUrl: commonApiUrl.sendFuzzy
      },
      rules: [
        {
          required: true,
          message: '请选择发货单',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '发货渠道',
      value: 'channelId',
      en: 'channelId',
      lang: 'terminalLogistics.detail.formList.channelId',
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
          message: '发货渠道',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '收货渠道',
      value: 'toChannelId',
      en: 'toChannelId',
      lang: 'terminalLogistics.detail.formList.toChannelId',
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
          message: '收货渠道',
          trigger: 'blur'
        }
      ]
    },
    {
      label: '手工单号',
      value: 'manualId',
      en: 'Manual Number',
      lang: 'terminalLogistics.detail.formList.manualId',
      type: 'input'
    },
    {
      label: '备注',
      value: 'notes',
      en: 'Remark',
      lang: 'terminalLogistics.detail.formList.notes',
      type: 'input',
      setLength: 12

    }
  ],
  tabsList: [
    {
      label: '实收数',
      value: 'actualNumber',
      en: 'Actual Number',
      lang: 'terminalLogistics.detail.tabsList.actualNumber'
    },
    {
      label: '原单数',
      value: 'originalNumber',
      en: 'Original Number',
      lang: 'terminalLogistics.detail.tabsList.originalNumber'
    },
    {
      label: '差异数(SKU)',
      value: 'differenceNumber',
      en: 'Difference Number',
      lang: 'terminalLogistics.detail.tabsList.differenceNumber'
    },
    {
      label: '关联箱',
      value: 'associationBox',
      en: 'Association Box',
      lang: 'terminalLogistics.detail.tabsList.associationBox'
    },
    {
      label: '唯一码',
      value: 'uniqueCode',
      en: 'Unique code',
      lang: 'terminalLogistics.detail.tabsList.uniqueCode'
    }
  ],
  freight: [
    {
      label: '物流公司',
      value: 'logisticsBillCode',
      matchSelectKey: 'logisticsCompanyIds',
      en: 'logistics company',
      lang: 'terminalLogistics.detail.freight.logisticsBillCode',
      type: 'select',
      options: []
    },
    {
      label: '国家/地区',
      value: 'Country',
      en: 'Country',
      lang: 'terminalLogistics.detail.freight.Country',
      type: 'select',
      options: []
    },

    {
      label: '州/省/地区',
      value: 'province',
      en: 'province',
      lang: 'terminalLogistics.detail.freight.province',
      type: 'select',
      options: []
    },
    {
      label: '市',
      value: 'city',
      en: 'city',
      lang: 'terminalLogistics.detail.freight.city',
      type: 'select',
      options: []
    },
    {
      label: '县/区',
      value: 'county',
      en: 'county',
      lang: 'terminalLogistics.detail.freight.county',
      type: 'select',
      options: []
    },
    {
      label: '详细地址',
      value: 'address',
      en: 'address',
      lang: 'terminalLogistics.detail.freight.address',
      type: 'input',
      setLength: 12
    },
    {
      label: '收货人',
      value: 'contactsPerson',
      en: 'contactsPerson',
      lang: 'terminalLogistics.detail.freight.contactsPerson',
      type: 'input'
    },
    {
      label: '邮政编码',
      value: 'postCode',
      en: 'Postal Code',
      type: 'input',
      lang: 'terminalLogistics.detail.freight.postCode'
    },
    {
      label: '手机号',
      value: 'mobile',
      en: 'mobile',
      lang: 'terminalLogistics.detail.freight.mobile',
      type: 'input'
    },
    {
      label: '货运单号',
      value: 'billId',
      en: 'billId',
      lang: 'terminalLogistics.detail.freight.billId',
      type: 'input'
    },
    {
      label: '说明',
      value: 'notes',
      en: 'notes',
      lang: 'terminalLogistics.detail.freight.notes',
      type: 'input',
      setLength: 12
    }
  ],
  adjustmentRecord: [
    {
      label: '销售计划调整单',
      value: 'billNo',
      en: 'Code',
      lang: 'terminalLogistics.detail.adjustmentRecord.billNo'
    },
    {
      label: '日期',
      value: 'billDate',
      en: 'billDate',
      lang: 'terminalLogistics.detail.adjustmentRecord.billDate'
    },
    {
      label: '操作',
      value: 'operateName',
      en: 'operateName',
      lang: 'terminalLogistics.detail.adjustmentRecord.operateName'
    },
    {
      label: '货号',
      value: 'goodsCode',
      en: 'goodsCode',
      lang: 'terminalLogistics.detail.adjustmentRecord.goodsCode'
    },
    {
      label: '品名',
      value: 'goodsName',
      en: 'goodsName',
      lang: 'terminalLogistics.detail.adjustmentRecord.goodsName'
    },
    {
      label: '颜色',
      value: 'colorName',
      en: 'colorName',
      lang: 'terminalLogistics.detail.adjustmentRecord.colorName'
    },
    {
      label: '尺码',
      value: 'sizeName',
      en: 'sizeName',
      lang: 'terminalLogistics.detail.adjustmentRecord.sizeName'
    },
    {
      label: '数量',
      value: 'quantity',
      en: 'quantity',
      lang: 'terminalLogistics.detail.adjustmentRecord.quantity'
    },
    {
      label: '审核人',
      value: 'checkByName',
      en: 'Code',
      lang: 'terminalLogistics.detail.adjustmentRecord.checkByName'
    },
    {
      label: '审核时间',
      value: 'checkTime',
      en: 'checkTime',
      lang: 'terminalLogistics.detail.adjustmentRecord.checkTime'
    },
    {
      label: '说明',
      value: 'notes',
      en: 'notes',
      lang: 'terminalLogistics.detail.adjustmentRecord.notes'
    }
  ],
  adjustmentDetail: [
    {
      label: '货号',
      value: 'goodsCode',
      en: 'Code',
      lang: 'terminalLogistics.detail.adjustmentDetail.goodsCode'
    },
    {
      label: '品名',
      value: 'goodsName',
      en: 'goodsName',
      lang: 'terminalLogistics.detail.adjustmentDetail.goodsName'
    },
    {
      label: '吊牌价',
      value: 'tagPrice',
      en: 'tagPrice',
      lang: 'terminalLogistics.detail.adjustmentDetail.tagPrice'
    },
    {
      label: '折扣',
      value: 'discountName',
      en: 'discountName',
      lang: 'terminalLogistics.detail.adjustmentDetail.discountName'
    },
    {
      label: '结算价',
      value: 'balancePrice',
      en: 'balancePrice',
      lang: 'terminalLogistics.detail.adjustmentDetail.balancePrice'
    },
    {
      label: '数量',
      value: 'quantity',
      en: 'quantity',
      lang: 'terminalLogistics.detail.adjustmentDetail.quantity'
    },
    {
      label: '可配货数量',
      value: 'oweQuantity',
      en: 'oweQuantity',
      lang: 'terminalLogistics.detail.adjustmentDetail.oweQuantity'
    },
    {
      label: '总金额',
      value: 'totalPrice',
      en: 'totalPrice',
      lang: 'terminalLogistics.detail.adjustmentDetail.totalPrice'
    }
  ],
  differenceDetail: [{
    label: '货号',
    value: 'goodsCode',
    en: 'goodsCode',
    lang: 'terminalLogistics.detail.difference.goodsCode'
  },
  {
    label: '品名',
    value: 'goodsName',
    en: 'goodsName',
    lang: 'terminalLogistics.detail.difference.goodsName'
  },
  {
    label: '条码',
    value: 'barcode',
    en: 'barCode',
    lang: 'terminalLogistics.detail.difference.barcode'
  },
  {
    label: '颜色',
    value: 'colorName',
    en: 'colorName',
    lang: 'terminalLogistics.detail.difference.colorName'
  },
  {
    label: '尺码',
    value: 'sizeName',
    en: 'sizeName',
    lang: 'terminalLogistics.detail.difference.sizeName'
  }, {
    label: '内长',
    value: 'longName',
    en: 'inside Length',
    lang: 'terminalLogistics.detail.difference.longName'
  },
  {
    label: '差异数',
    value: 'quantity',
    en: 'Quantity',
    lang: 'terminalLogistics.detail.difference.quantity'
  }, {
    label: '备注',
    value: 'remark',
    en: 'remark',
    lang: 'terminalLogistics.detail.difference.remark'
  }],
  associationBox: [{
    label: '箱号',
    value: 'boxCode',
    en: 'boxCode',
    lang: 'terminalLogistics.detail.associationBox.boxCode'
  }, {
    label: '手工箱号',
    value: 'manualCode',
    en: 'manualCode',
    lang: 'terminalLogistics.detail.associationBox.manualCode'
  }, {
    label: '装箱人',
    value: 'installer',
    en: 'installer',
    lang: 'terminalLogistics.detail.associationBox.installer'
  }, {
    label: '装箱日期',
    value: 'installDate',
    en: 'installDate',
    lang: 'terminalLogistics.detail.associationBox.installDate'
  }, {
    label: '数量',
    value: 'number',
    en: 'number',
    lang: 'terminalLogistics.detail.associationBox.number'
  }, {
    label: '重量',
    value: 'weight',
    en: 'weight',
    lang: 'terminalLogistics.detail.associationBox.weight'
  }, {
    label: '单号',
    value: 'billId',
    en: 'billId',
    lang: 'terminalLogistics.detail.associationBox.billId'
  }, {
    label: '备注',
    value: 'remark',
    en: 'remark',
    lang: 'terminalLogistics.detail.associationBox.remark'
  }],
  uniqueCode: [{
    label: '唯一码',
    value: 'uniqueCode',
    en: 'uniqueCode',
    lang: 'terminalLogistics.detail.uniqueCode.uniqueCode'
  }, {
    label: '货号',
    value: 'goodsCode',
    en: 'goodsCode',
    lang: 'terminalLogistics.detail.difference.goodsCode'
  }, {
    label: '品名',
    value: 'goodsName',
    en: 'goodsName',
    lang: 'terminalLogistics.detail.difference.goodsName'
  }, {
    label: '颜色',
    value: 'colorName',
    en: 'colorName',
    lang: 'terminalLogistics.detail.difference.colorName'
  },
  {
    label: '尺码',
    value: 'sizeName',
    en: 'sizeName',
    lang: 'terminalLogistics.detail.difference.sizeName'
  }, {
    label: '内长',
    value: 'insideLength',
    en: 'inside Length',
    lang: 'terminalLogistics.detail.difference.insideLength'
  }],
  totalInfo: [{
    label: '差异数',
    id: 0,
    total: 0,
    price: '',
    class: 'fg-red',
    en: 'Difference Number',
    lang: 'terminalLogistics.detail.totalInfo.differenceNumber'
  }, {
    label: '实收数',
    id: 1,
    total: 0,
    price: '',
    class: 'fg-blue',
    en: 'Actual Number',
    lang: 'terminalLogistics.detail.totalInfo.actualNumber'
  }, {
    label: '原单数',
    id: 2,
    total: 0,
    price: '',
    class: 'fg-blue',
    en: 'Original Number',
    lang: 'terminalLogistics.detail.totalInfo.originalNumber'
  }]
}

// 操作记录
export const recordLogObj: RecordLogConfig = {
  formList: [
    {
      label: '单据编号',
      value: 'billNo',
      en: 'Plain Number',
      lang: 'terminalLogistics.recordLog.formList.billNo',
      type: 'input',
      setLength: 12

    },
    {
      label: '操作人',
      en: 'operateBy',
      lang: 'terminalLogistics.recordLog.formList.operateBy',
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
      lang: 'terminalLogistics.recordLog.formList.actionCode',
      value: 'actionCode',
      type: 'select',
      setLength: 12,
      options: []
    },
    {
      label: '操作时间',
      en: 'operateDate',
      lang: 'terminalLogistics.recordLog.formList.operateDate',
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
      label: '单据编号',
      value: 'billNo',
      en: 'billNo',
      lang: 'terminalLogistics.recordLog.tableHeader.billNo'
    },
    {
      label: '操作',
      value: 'actionName',
      en: 'actionName',
      lang: 'terminalLogistics.recordLog.tableHeader.actionName'
    },
    {
      label: '操作人',
      value: 'operateByName',
      en: 'Operate Name',
      lang: 'terminalLogistics.recordLog.tableHeader.operateByName'
    },
    {
      label: '操作时间',
      value: 'operateTime',
      en: 'operateTime',
      lang: 'terminalLogistics.recordLog.tableHeader.operateTime'
    }
  ],
  api: apiUrl.operationLog,
  moduleId: globalConfigs.realModuleId
}
export const initFormData = () => {
  const detailData = {
    terminalLogistics: {
      billNo: '',
      billDate: Tools.getCurrentData(false),
      channelId: '',
      notes: '',
      sendId: '',
      toChannelId: '',
      businessTypeId: ''
    },
    customFieldMap: {},
    billGoodsList: [],
    billRealGoodsList: [],
    billLogistics: {}
  }
  return detailData
}
// 这里定义用途 用作 国际化 的数据
export const terminalLogistics = {
  list: listConfig,
  detail: detailConfig,
  recordLogObj
  // highSearchDialog: highSearchDialog
}
