import {
  commonIndexConfig,
  TableHeaderConfig,
  ListComponentsConfig,
  Dictionary,
  CommonConfig,
  DetailOperationConfig,
  FormListConfig
} from '@/typings'
import { Tools } from '@/utils/tools'

import commonApiUrl from '@/api/common-api/index'
import {

  channelSearchConfig,
  goodsSearchConfig } from '@/layout-components/vip-dialog/config'
interface DialogContentConfig {
  tableHeader: TableHeaderConfig[]
  formList: FormListConfig[]
  queryForm: FormListConfig[]
}
interface ListConfig extends Pick<ListComponentsConfig, 'btns'|'tableHeader'|'formList'> {
  devlierPlainDialog:Pick<ListComponentsConfig, 'tableHeader'|'formList'>
  oneClickMergeDialog: DialogContentConfig
}
interface BoxDialogConfig {
  formList: FormListConfig[]
}
interface DetailConfig {
  btns: DetailOperationConfig[]
  formList: FormListConfig[]
  tabsList: CommonConfig[]
  packingDetail: Dictionary
  createBoxDialog: BoxDialogConfig
  finishDialog: BoxDialogConfig

}

const tableHeader: TableHeaderConfig[] = [

  {
    label: '指令单号',
    value: 'billNo',
    en: 'Order number',
    isLink: true,
    lang: 'packingWorktop.list.tableHeader.billNo'
  },
  {
    label: '手工单号',
    value: 'manualId',
    en: 'Manual order number',
    lang: 'packingWorktop.list.tableHeader.manualId'
  },
  {
    label: '装箱单号',
    value: 'packingBillNo',
    en: 'Packing list No',
    width: '250px',
    type: 'other',
    lang: 'packingWorktop.list.tableHeader.packingBillNo'
  },
  {
    label: '单据类型',
    value: 'noticeBillTypeName',
    en: 'Document type',
    lang: 'packingWorktop.list.tableHeader.noticeBillTypeName'
  },
  {
    label: '完结状态',
    value: 'finishStatusName',
    en: 'Completion status',
    lang: 'packingWorktop.list.tableHeader.finishStatusName'
  },
  {
    label: '装箱状态',
    value: 'packingBillProcessStatusName',
    en: 'carton condition',
    lang: 'packingWorktop.list.tableHeader.packingBillProcessStatusName'
  },
  {
    label: '发货渠道',
    value: 'channelName',
    en: 'Delivery channel',
    lang: 'packingWorktop.list.tableHeader.channelName'
  },
  {
    label: '收货渠道',
    value: 'toChannelName',
    en: 'Receiving channel',
    lang: 'packingWorktop.list.tableHeader.toChannelName'
  },
  {
    label: '原指令类型',
    value: 'oldNoticeTypeName',
    en: 'Original instruction type',
    lang: 'packingWorktop.list.tableHeader.oldNoticeTypeName'
  }
]

const mergeTableHeader: TableHeaderConfig[] = [
  {
    label: '单据类型',
    value: 'billTypeName',
    en: 'Document type',
    lang: 'packingWorktop.list.devlierPlainDailog.tableHeader.billTypeName'
  },
  {
    label: '单号',
    value: 'billNo',
    en: 'Bill Number',
    width: '120px',
    lang: 'packingWorktop.list.devlierPlainDailog.tableHeader.billNo'
  },
  {
    label: '单据日期',
    value: 'billDate',
    en: 'Document date',
    width: '150px',
    lang: 'packingWorktop.list.devlierPlainDailog.tableHeader.billDate'
  },
  {
    label: '指令数',
    value: 'noticeQuantity',
    isShowTotal: true,
    width: '60',
    en: 'Number of instructions',
    lang: 'packingWorktop.list.devlierPlainDailog.tableHeader.noticeQuantity'
  },
  {
    label: '未装箱数',
    value: 'wzxs',
    width: '70',
    en: 'Unbounded quantity',
    lang: 'packingWorktop.list.devlierPlainDailog.tableHeader.wzxs'
  },
  {
    label: '手工单号',
    value: 'manualId',
    width: '150px',
    en: 'Manual order number',
    lang: 'packingWorktop.list.devlierPlainDailog.tableHeader.manualId'
  },
  {
    label: '业务类型',
    value: 'businessTypeName',
    width: '70px',
    en: 'Business type',
    lang: 'packingWorktop.list.devlierPlainDailog.tableHeader.businessTypeName'
  },
  {
    label: '价格类型',
    value: 'priceTypeName',
    width: '70px',
    en: 'Price type',
    lang: 'packingWorktop.list.devlierPlainDailog.tableHeader.priceTypeName'
  },
  {
    label: '备注',
    value: 'notes',
    width: '120px',
    en: 'notes',
    lang: 'packingWorktop.list.devlierPlainDailog.tableHeader.notes'
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
export const listConfig: ListConfig = {
  btns: [
    {
      name: '无指令装箱',
      value: 'packing',
      lang: 'layout.btns.packing',
      event: 'packing',
      plain: true

    },
    {
      name: '一键合并',
      value: 'merge',
      lang: 'layout.btns.merge',
      event: 'merge',
      plain: true
    },
    {
      name: '合并为发货计划',
      value: 'mergeDeliveryPlan',
      lang: 'layout.btns.mergeDeliveryPlan',
      event: 'mergeDeliveryPlan',
      plain: true

    },
    {
      name: '打印',
      value: 'print',
      lang: 'layout.btns.print',
      event: 'print',
      plain: true

    }

  ],
  tableHeader: tableHeader,
  formList: [
    {
      label: '单据类型',
      en: 'Document type',
      lang: 'packingWorktop.list.filter.noticeBillTypeIdList',
      value: 'noticeBillTypeIdList',
      matchSelectKey: 'noticeBillTypeList',
      type: 'select',
      options: [],
      config: {
        multiple: true
      },
      setLength: 6
    },
    {
      label: '单号',
      en: 'billNo',
      lang: 'packingWorktop.list.filter.billNo',
      value: 'billNo',
      type: 'input',
      setLength: 6
    },
    {
      label: '发货渠道',
      en: 'Send Channel',
      lang: 'packingWorktop.list.filter.channelIdList',
      value: 'channelIdList',
      type: 'highSearch',
      linkValue: 'channelFilterParam',
      highSearchConfig: {
        dialogSearchConfig: channelSearchConfig,
        apiUrl: commonApiUrl.channelFuzzy
      },
      setLength: 6
    },
    {
      label: '收货渠道',
      en: 'receive Channel',
      lang: 'packingWorktop.list.filter.toChannelIdList',
      value: 'toChannelIdList',
      type: 'highSearch',
      linkValue: 'toChannelFilterParam',
      highSearchConfig: {
        dialogSearchConfig: channelSearchConfig,
        apiUrl: commonApiUrl.channelFuzzy
      },
      setLength: 6
    },
    {
      label: '货品',
      en: 'goods',
      lang: 'packingWorktop.list.filter.goodsIdList',
      value: 'goodsIdList',
      type: 'highSearch',
      linkValue: 'goodsFilterParam',
      highSearchConfig: {
        dialogSearchConfig: goodsSearchConfig,
        apiUrl: commonApiUrl.goodsFuzzy
      },
      setLength: 6
    },
    {
      label: '装箱状态',
      en: 'carton condition',
      lang: 'packingWorktop.list.filter.processStatusList',
      value: 'processStatusList',
      type: 'select',
      config: {
        multiple: true
      },
      options: [],
      setLength: 6
    },
    {
      label: '打印状态',
      en: 'Print status',
      lang: 'packingWorktop.list.filter.printStatus',
      value: 'printStatus',
      matchSelectKey: 'printStatusList',
      type: 'select',

      options: [],
      setLength: 6
    },
    {
      label: '装箱操作员',
      en: 'Packing operator',
      lang: 'packingWorktop.list.filter.operateByList',
      value: 'operateByList',
      type: 'select',
      config: {
        multiple: true
      },
      options: [],
      setLength: 6
    },
    {
      label: '手工单号',
      en: 'Manual order number',
      lang: 'packingWorktop.list.filter.manualNo',
      value: 'manualNo',
      type: 'input',
      setLength: 6
    },
    {
      label: '制单用户',
      en: 'Single person',
      lang: 'packingWorktop.list.filter.createdByList',
      value: 'createdByList',
      type: 'filter',
      fuzzyConfig: {
        apiUrl: commonApiUrl.userFuzzy,
        multiple: true
      },
      setLength: 6
    },
    {
      label: '制单日期',
      en: 'Date of making order',
      lang: 'packingWorktop.list.filter.createdTime',
      value: 'createdTime',
      config: {
        type: 'daterange'
      },
      type: 'datePick',
      setLength: 6
    },

    {
      label: '审核用户',
      en: 'Audit User',
      lang: 'packingWorktop.list.filter.checkByList',
      value: 'checkByList',
      type: 'filter',
      fuzzyConfig: {
        apiUrl: commonApiUrl.userFuzzy,
        multiple: true

      },
      setLength: 6
    },
    {
      label: '审核日期',
      en: 'Aduit Date',
      lang: 'packingWorktop.list.filter.checkTime',
      value: 'checkTime',
      config: {
        type: 'daterange'
      },
      type: 'datePick',
      setLength: 6
    },
    {
      label: '指令单完结状态',
      en: 'Order completion status',
      lang: 'packingWorktop.list.filter.noticeFinishStatus',
      value: 'noticeFinishStatus',
      matchSelectKey: 'noticeFinishStatusList',
      type: 'select',
      config: {
        multiple: true
      },
      options: [],
      setLength: 6
    }

  ],
  devlierPlainDialog: {
    tableHeader: mergeTableHeader,
    formList: [
      {
        label: '发货渠道',
        en: 'Send Channel',
        lang: 'packingWorktop.list.devlierPlainDailog.formList.channelId',
        value: 'channelId',
        type: 'highSearch',
        alwaysDisabled: true,
        linkValue: 'channelFilterParam',
        highSearchConfig: {
          dialogSearchConfig: Object.assign({}, channelSearchConfig, { isSingleSelect: true }),
          apiUrl: commonApiUrl.channelFuzzy
        },
        setLength: 6
      },
      {
        label: '收货渠道',
        en: 'receive Channel',
        lang: 'packingWorktop.list.devlierPlainDailog.formList.toChannelId',
        value: 'toChannelId',
        type: 'highSearch',
        alwaysDisabled: true,
        linkValue: 'channelFilterParam',
        highSearchConfig: {
          dialogSearchConfig: Object.assign({}, channelSearchConfig, { isSingleSelect: true }),
          apiUrl: commonApiUrl.channelFuzzy
        },
        setLength: 6
      },
      {
        label: '单据日期',
        en: 'Date of making order',
        lang: 'packingWorktop.list.devlierPlainDailog.formList.billDate',
        value: 'billDate',
        type: 'datePick',
        setLength: 6
      },
      {
        label: '手工单号',
        en: 'Manual order number',
        lang: 'packingWorktop.list.devlierPlainDailog.formList.manualId',
        value: 'manualId',
        type: 'input',
        setLength: 6
      },
      {
        label: '备注',
        en: 'Notes',
        lang: 'packingWorktop.list.devlierPlainDailog.formList.notes',
        value: 'notes',
        type: 'input',
        setLength: 6
      }
    ]
  },
  oneClickMergeDialog: {
    tableHeader: mergeTableHeader.slice(1),
    queryForm: [
      {
        label: '指令单类型',
        en: 'Plan Type',
        lang: 'packingWorktop.list.oneClickMergeDialog.planType',
        value: 'noticeBillTypeIdList',
        type: 'select',
        setLength: 6,
        options: []
      },
      {
        label: '发货渠道',
        en: 'Send Channel',
        lang: 'packingWorktop.list.devlierPlainDailog.formList.channelId',
        value: 'channelId',
        type: 'highSearch',
        linkValue: 'channelFilterParam',
        highSearchConfig: {
          dialogSearchConfig: channelSearchConfig,
          apiUrl: commonApiUrl.channelFuzzy
        },
        setLength: 6
      },
      {
        label: '收货渠道',
        en: 'receive Channel',
        lang: 'packingWorktop.list.devlierPlainDailog.formList.toChannelId',
        value: 'toChannelId',
        type: 'highSearch',
        linkValue: 'channelFilterParam',
        highSearchConfig: {
          dialogSearchConfig: channelSearchConfig,
          apiUrl: commonApiUrl.channelFuzzy
        },
        setLength: 6
      },
      {
        label: '按钮组',
        en: 'Btn Group',
        lang: 'packingWorktop.list.devlierPlainDailog.formList.btnsGroup',
        value: 'btnsGroup',
        setLength: 6
      }
    ],
    formList: [
      {
        label: '单据日期',
        en: 'Date of making order',
        lang: 'packingWorktop.list.devlierPlainDailog.formList.billDate',
        value: 'billDate',
        type: 'datePick',
        setLength: 6
      },
      {
        label: '备注',
        en: 'Notes',
        lang: 'packingWorktop.list.devlierPlainDailog.formList.notes',
        value: 'notes',
        type: 'input',
        setLength: 6
      }
    ]

  }
}

export const detailConfig: DetailConfig = {
  btns: [
    {
      name: '生成箱',
      value: 'createBox',
      svgIcon: 'rbp-operate_add',
      lang: 'packingWorktop.detail.btns.createBox',
      type: 'text'
    },
    {
      name: '完成箱',
      value: 'finishBox',
      svgIcon: 'rbp-operate_done',
      lang: 'packingWorktop.detail.btns.finishBox',
      type: 'text'

    },
    {
      name: '合并箱',
      value: 'mergeBox',
      svgIcon: 'rbp-operate_release',
      type: 'text',
      lang: 'packingWorktop.detail.btns.mergeBox'
    },
    {
      name: '调整箱',
      value: 'adjustmentBox',
      svgIcon: 'rbp-operate_edit',
      type: 'text',
      lang: 'packingWorktop.detail.btns.adjustmentBox'
    },
    {
      name: '直接发货',
      value: 'directDelivery',
      svgIcon: 'rbp-operate_delivery',
      type: 'text',
      lang: 'packingWorktop.detail.btns.directDelivery'
    },
    {
      name: '作废箱',
      value: 'invalidBox',
      svgIcon: 'rbp-operate_cancellation',
      type: 'text',
      lang: 'packingWorktop.detail.btns.invalidBox'
    },
    {
      name: '完成整单',
      value: 'completeOrder',
      svgIcon: 'rbp-operate_done',
      type: 'text',
      class: 'prev-btn',
      lang: 'packingWorktop.detail.btns.completeOrder'
    },
    {
      name: '解除整单',
      value: 'relieveBox',
      svgIcon: 'rbp-operate_release',
      type: 'text',
      lang: 'packingWorktop.detail.btns.relieveBox'
    },
    {
      name: '重新开始',
      value: 'restart',
      svgIcon: 'rbp-operate_restore',
      type: 'text',
      lang: 'packingWorktop.detail.btns.restart'
    },
    {
      name: '打印',
      value: 'print',
      class: 'prev-btn',
      svgIcon: 'rbp-operate_print',
      type: 'text',
      lang: 'operationGroup.btns.print'
    },
    {
      name: '刷新',
      value: 'refresh',
      svgIcon: 'rbp-operate_refresh',
      type: 'text',
      lang: 'operationGroup.btns.refresh'
    },
    {
      name: '关闭',
      value: 'close',
      svgIcon: 'rbp-operate_cancel',
      type: 'text',
      lang: 'operationGroup.btns.close'
    }
  ],
  formList: [
    {
      label: '发货渠道',
      en: 'Send Channel',
      lang: 'packingWorktop.list.filter.channelIdList',
      value: 'channelIdList',
      type: 'highSearch',
      linkValue: 'channelFilterParam',
      highSearchConfig: {
        dialogSearchConfig: channelSearchConfig,
        apiUrl: commonApiUrl.channelFuzzy
      },
      setLength: 6
    },
    {
      label: '收货渠道',
      en: 'receive Channel',
      lang: 'packingWorktop.list.filter.toChannelIdList',
      value: 'toChannelIdList',
      type: 'highSearch',
      linkValue: 'channelFilterParam',
      highSearchConfig: {
        dialogSearchConfig: channelSearchConfig,
        apiUrl: commonApiUrl.channelFuzzy
      },
      setLength: 6
    },
    {
      label: '单据日期',
      value: 'billDate',
      en: 'Document date',
      lang: 'packingWorktop.detail.formList.billDate',
      type: 'datePick'
    },
    {
      label: '物流公司',
      value: 'wlgs',
      en: 'logistics company',
      lang: 'packingWorktop.detail.formList.wlgs',
      type: 'select',
      options: []
    },
    {
      label: '货运单号',
      value: 'hydh',
      en: 'Waybill number',
      lang: 'packingWorktop.detail.formList.hydh',
      type: 'input'
    },
    {
      label: '备注',
      value: 'notes',
      en: 'Notes',
      lang: 'packingWorktop.detail.formList.notes',
      type: 'input'
    }
  ],
  tabsList: [
    {
      label: '装箱明细',
      value: 'packingDetail',
      en: 'Packing Detail',
      lang: 'packingWorktop.detail.tabsList.packingDetail'
    },
    {
      label: '货运信息',
      value: 'freightInfo',
      en: 'Freight Info',
      lang: 'packingWorktop.detail.tabsList.freightInfo'
    }
  ],
  packingDetail: {
    packingTableHeader: [
      {
        label: '状态',
        value: 'statusName',
        en: 'Status',
        lang: 'packingWorktop.detail.packingDetail.packingTableHeader.statusName'
      },
      {
        label: '箱号',
        value: 'billNo',
        en: 'Case number',
        lang: 'packingWorktop.detail.packingDetail.packingTableHeader.billNo'
      },
      {
        label: '手工箱号',
        value: 'manualId',
        en: 'Handmade case number',
        lang: 'packingWorktop.detail.packingDetail.packingTableHeader.manualId'
      },
      {
        label: '操作人',
        value: 'createdByName',
        en: 'Operator',
        lang: 'packingWorktop.detail.packingDetail.packingTableHeader.createdByName'
      },
      {
        label: '重量',
        value: 'weight',
        en: 'Status',
        lang: 'packingWorktop.detail.packingDetail.packingTableHeader.weight'
      },
      {
        label: '货品数量',
        value: 'quantity',
        en: 'Quantity of goods',
        lang: 'packingWorktop.detail.packingDetail.packingTableHeader.quantity'
      },
      {
        label: '备注',
        value: 'notes',
        en: 'Notes',
        lang: 'packingWorktop.detail.packingDetail.packingTableHeader.notes'
      },
      {
        label: '发货单',
        value: 'fhd',
        en: 'Invoice',
        lang: 'packingWorktop.detail.packingDetail.packingTableHeader.fhd'
      },
      {
        label: '物流公司',
        value: 'logisticsBillCode',
        en: 'logistics company',
        lang: 'packingWorktop.detail.packingDetail.packingTableHeader.logisticsBillCode'
      },
      {
        label: '货运单号',
        value: 'hydh',
        en: 'Waybill number',
        lang: 'packingWorktop.detail.packingDetail.packingTableHeader.hydh'
      }
    ],
    skuTableHeader: [
      {
        label: '货号',
        value: 'hh',
        en: 'Article number',
        lang: 'packingWorktop.detail.packingDetail.skuTableHeader.hh'
      },
      {
        label: '品名',
        value: 'pm',
        en: 'Article number',
        lang: 'packingWorktop.detail.packingDetail.skuTableHeader.pm'
      },
      {
        label: '颜色',
        value: 'color',
        en: 'Color',
        lang: 'packingWorktop.detail.packingDetail.skuTableHeader.color'
      },
      {
        label: '内长',
        value: 'lc',
        en: 'Internal length',
        lang: 'packingWorktop.detail.packingDetail.skuTableHeader.lc'
      },
      {
        label: '尺码',
        value: 'size',
        en: 'Size',
        lang: 'packingWorktop.detail.packingDetail.skuTableHeader.size'
      },
      {
        label: '数量',
        value: 'number',
        en: 'number',
        lang: 'packingWorktop.detail.packingDetail.skuTableHeader.number'
      }
    ],
    differTableHeader: [
      {
        label: '货号',
        value: 'hh',
        en: 'Article number',
        width: '100px',
        lang: 'packingWorktop.detail.packingDetail.differTableHeader.hh'
      },
      {
        label: '品名',
        value: 'pm',
        width: '100px',
        en: 'Article number',
        lang: 'packingWorktop.detail.packingDetail.differTableHeader.pm'
      },
      {
        label: '欠数',
        value: 'qs',
        width: '80px',
        en: 'Under count',
        lang: 'packingWorktop.detail.packingDetail.differTableHeader.qs'
      },
      {
        label: '已装箱',
        value: 'yzx',
        width: '80px',
        en: 'boxed',
        lang: 'packingWorktop.detail.packingDetail.differTableHeader.yzx'
      },
      {
        label: '待装箱',
        width: '80px',
        value: 'dzx',
        en: 'To be packed',
        lang: 'packingWorktop.detail.packingDetail.differTableHeader.dzx'
      }
    ]
  },
  createBoxDialog: {
    formList: [
      {
        label: '箱类型',
        value: 'type',
        en: 'Box Types',
        lang: 'packingWorktop.detail.createBoxDialog.formList.type',
        type: 'radio',
        setLength: 12,
        options: [
          {
            label: '普通箱',
            value: 0
          },
          {
            label: '配码箱',
            value: 1
          }
        ]
      },
      {
        label: '配码类型',
        value: 'distributionTypeId',
        en: 'Box Types',
        lang: 'packingWorktop.detail.createBoxDialog.formList.distributionTypeId',
        type: 'select',
        options: [],
        setLength: 12,
        alwaysDisabled: true

      },
      {
        label: '箱数量',
        value: 'boxQuantity',
        en: 'Box Number',
        setLength: 12,
        lang: 'packingWorktop.detail.createBoxDialog.formList.boxQuantity',
        type: 'number'

      },
      {
        label: '打印方案',
        value: 'dyfa',
        en: 'Print Plan',
        setLength: 12,
        lang: 'packingWorktop.detail.createBoxDialog.formList.dyfa',
        type: 'select',
        options: []
      },
      {
        label: '打印份数',
        value: 'printId',
        en: 'Printing Number',
        setLength: 12,
        lang: 'packingWorktop.detail.createBoxDialog.formList.printId',
        type: 'select',
        options: []
      }
      // {
      //   label: '备注',
      //   value: 'notes',
      //   en: 'Notes',
      //   lang: 'packingWorktop.detail.createBoxDialog.formList.notes',
      //   type: 'input',
      //   setLength: 24
      // }
    ]
  },
  finishDialog: {
    formList: [
      {
        label: '手工单号',
        value: 'sgdh',
        en: 'Manual order number',
        lang: 'packingWorktop.detail.finishDialog.formList.sgdh',
        type: 'input',
        setLength: 12
      },
      {
        label: '重量(KG)',
        value: 'zl',
        en: 'Weight',
        lang: 'packingWorktop.detail.finishDialog.formList.zl',
        type: 'input',
        setLength: 12

      },
      {
        label: '备注',
        value: 'notes',
        en: 'Notes',
        lang: 'packingWorktop.detail.finishDialog.formList.notes',
        type: 'input',
        setLength: 24
      },
      {
        label: '打印方案',
        value: 'dyfa',
        en: 'Print Plan',
        lang: 'packingWorktop.detail.finishDialog.formList.dyfa',
        type: 'select',
        options: [],
        setLength: 12

      },
      {
        label: '打印份数',
        value: 'dyfs',
        en: 'Printing Number',
        lang: 'packingWorktop.detail.finishDialog.formList.dyfs',
        type: 'select',
        options: [],
        setLength: 12

      }

    ]
  }
}
export const initFormData = () => {
  const detailData = {

  }
  return detailData
}
// 这里定义用途 用作 国际化 的数据
export const packingWorktop = {
  list: listConfig,
  detail: detailConfig
  // highSearchDialog: highSearchDialog
}
