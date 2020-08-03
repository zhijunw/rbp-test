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
import { billSearchConfig, channelSearchConfig, goodsSearchConfig } from '@/layout-components/vip-dialog/config'

import apiUrl from '@/api/sale-center/distribution-plain'
import commonApiUrl from '@/api/common-api/index'

interface GoodsDetailConfig {
    detailTableHeader: TableHeaderConfig[]
}

interface distributionPlain {
  btns: DetailOperationConfig[]
  formList: FormListConfig[]
  tabsList: CommonConfig[]
  // goodsDetail: GoodsDetailConfig,
  freight: FormListConfig[]
}

export const layoutConfigs = {
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
    selectOptions: [{ label: '指令单据', value: 0 }, { label: '手工单号', value: 1 }, { label: '计划单据', value: 2 }],
    selectDefault: 0,
    long: true,
    prefixIcon: 'el-icon-search'
  },
  tableHeader: [],
  formList: [
    {
      label: '货品',
      en: 'goods',
      lang: 'distributionPlain.list.filter.goodsIdList',
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
      label: '发货渠道',
      en: 'channel',
      lang: 'distributionPlain.list.filter.channelIdList',
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
      lang: 'distributionPlain.list.filter.toChannelIdList',
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
      label: '销售计划',
      value: 'salePlanIdList',
      en: 'salePlanIdList',
      lang: 'distributionPlain.list.filter.salePlanIdList',
      type: 'highSearch',
      linkValue: 'salePlanFilterParam',
      highSearchConfig: {
        dialogSearchConfig: Object.assign({}, billSearchConfig, {
          selectApi: `${apiUrl.billDropDown}`,
          needModuleId: true
        }),
        apiUrl: commonApiUrl.billFuzzy
      },
      setLength: 12
    },
    {
      label: '业务类型',
      en: 'Business type',
      lang: 'distributionPlain.list.filter.businessTypeIdList',
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
      lang: 'distributionPlain.list.filter.priceTypeIdList',
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
      label: '单据日期',
      en: 'Bill Date',
      lang: 'distributionPlain.list.filter.billDate',
      value: 'billDate',
      config: {
        type: 'daterange'
      },
      type: 'datePick',
      setLength: 12
    },
    {
      label: '制单用户',
      en: 'Single person',
      lang: 'distributionPlain.list.filter.createdByList',
      value: 'createdByList',
      type: 'filter',
      fuzzyConfig: {
        apiUrl: commonApiUrl.userFuzzy,
        multiple: true
      },
      setLength: 12
    },
    {
      label: '状态',
      value: 'status',
      en: 'State',
      lang: 'distributionPlain.list.filter.status',
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
      label: '修改用户',
      en: 'Last modified',
      lang: 'distributionPlain.list.filter.updateByList',
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
      lang: 'distributionPlain.list.filter.updateTime',
      value: 'updateTime',
      config: {
        type: 'daterange'
      },
      type: 'datePick',
      setLength: 12
    },
    {
      label: '审核用户',
      en: 'Audit User',
      lang: 'distributionPlain.list.filter.checkByList',
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
      lang: 'distributionPlain.list.filter.checkTime',
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
      lang: 'distributionPlain.list.filter.cancelByList',
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
      lang: 'distributionPlain.list.filter.cancelTime',
      value: 'cancelTime',
      config: {
        type: 'daterange'
      },
      type: 'datePick',
      setLength: 12
    }
  ]
}
// 详情
export const detailConfig: distributionPlain = {
  // 操作类型
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
  // 填选项
  formList: [
    {
      label: '指令单号',
      value: 'billNo',
      en: 'Plain Number',
      lang: 'distributionPlain.detail.formList.billNo',
      editDisabled: true,
      type: 'input',
      alwaysDisabled: true
    },
    {
      label: '单据日期',
      value: 'billDate',
      en: 'Document date',
      lang: 'distributionPlain.detail.formList.billDate',
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
      lang: 'distributionPlain.detail.formList.businessTypeId',
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
      label: '销售计划单',
      value: 'salePlanBillId',
      en: 'salePlanBillNo',
      lang: 'distributionPlain.detail.formList.salePlanBillId',
      type: 'other',
      disabled: false,
      linkValue: 'salePlanBillId',
      highSearchConfig: {
        dialogSearchConfig: Object.assign({}, billSearchConfig, {
          isSingleSelect: true,
          // dialogWidth: '600px',
          selectApi: `${apiUrl.billDropDown}`

        }),
        apiUrl: commonApiUrl.billFuzzy
      }
      // rules: [
      //   {
      //     required: true,
      //     message: '请选择销售计划单',
      //     trigger: 'change'
      //   }
      // ]
    },
    {
      label: '发货渠道',
      value: 'channelId',
      en: 'Channel',
      lang: 'distributionPlain.detail.formList.channelId',
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
      lang: 'distributionPlain.detail.formList.toChannelId',
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
      value: 'priceTypeId',
      en: 'Price type',
      lang: 'distributionPlain.detail.formList.priceTypeId',
      matchSelectKey: 'priceTypeIds',
      type: 'select',
      disabled: false,
      rules: [
        {
          required: true,
          message: '请输入价格类型',
          trigger: ['blur']
        }
      ]

    },
    {
      label: '手工单号',
      value: 'manualId',
      en: 'Manual Number',
      lang: 'distributionPlain.detail.formList.manualId',
      type: 'input'
    },
    {
      label: '备注',
      value: 'notes',
      en: 'Remark',
      lang: 'distributionPlain.detail.formList.notes',
      type: 'input',
      setLength: 12

    }
  ],
  tabsList: [
    {
      label: '货品明细',
      value: 'goodsDetail',
      en: 'Goods Details',
      lang: 'distributionPlain.detail.tabsList.goodsDetail'
    },
    {
      label: '货运信息',
      value: 'freightInfo',
      en: 'Freight Info',
      lang: 'distributionPlain.detail.tabsList.freightInfo'
    }
  ],
  freight: [
    {
      label: '物流公司',
      value: 'logisticsCompanyId',
      matchSelectKey: 'logisticsCompanyId',
      en: 'logistics company',
      lang: 'distributionPlain.detail.freight.logisticsCompanyId',
      type: 'select',
      options: []
    },
    {
      label: '国家/地区',
      value: 'country',
      matchSelectKey: 'country',
      en: 'country',
      lang: 'distributionPlain.detail.freight.country',
      type: 'select',
      options: []
    },
    {
      label: '州/省/地区',
      value: 'province',
      en: 'province',
      matchSelectKey: 'province',
      lang: 'distributionPlain.detail.freight.province',
      type: 'select',
      options: []
    },
    {
      label: '市',
      value: 'city',
      en: 'city',
      matchSelectKey: 'city',
      lang: 'distributionPlain.detail.freight.city',
      type: 'select',
      options: []
    },
    {
      label: '县/区',
      value: 'county',
      en: 'county',
      matchSelectKey: 'county',
      lang: 'distributionPlain.detail.freight.county',
      type: 'select',
      options: []
    },
    {
      label: '详细地址',
      value: 'address',
      en: 'address',
      lang: 'distributionPlain.detail.freight.address',
      type: 'input',
      setLength: 12
    },
    {
      label: '收货人',
      value: 'contactsPerson',
      en: 'contactsPerson',
      lang: 'distributionPlain.detail.freight.contactsPerson',
      type: 'input'
    },
    {
      label: '邮政编码',
      value: 'postCode',
      en: 'Postal Code',
      type: 'input',
      lang: 'distributionPlain.detail.freight.postCode'
    },
    {
      label: '手机号',
      value: 'mobile',
      en: 'mobile',
      lang: 'distributionPlain.detail.freight.mobile',
      type: 'input'
    },
    {
      label: '货运单号',
      value: 'billId',
      en: 'billId',
      lang: 'distributionPlain.detail.freight.billId',
      type: 'input'
    },
    {
      label: '说明',
      value: 'notes',
      en: 'notes',
      lang: 'distributionPlain.detail.freight.notes',
      type: 'input',
      setLength: 12
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
      lang: 'distributionPlain.recordLog.formList.billNo',
      type: 'input',
      setLength: 12

    },
    {
      label: '操作人',
      en: 'operateBy',
      lang: 'distributionPlain.recordLog.formList.operateBy',
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
      lang: 'distributionPlain.recordLog.formList.actionCode',
      value: 'actionCode',
      type: 'select',
      setLength: 12,
      options: []
    },
    {
      label: '操作时间',
      en: 'operateDate',
      lang: 'distributionPlain.recordLog.formList.operateDate',
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
      lang: 'distributionPlain.recordLog.tableHeader.billNo'
    },
    {
      label: '操作',
      value: 'actionName',
      en: 'actionName',
      lang: 'distributionPlain.recordLog.tableHeader.actionName'
    },
    {
      label: '操作人',
      value: 'operateByName',
      en: 'Operate Name',
      lang: 'distributionPlain.recordLog.tableHeader.operateByName'
    },
    {
      label: '操作时间',
      value: 'operateTime',
      en: 'operateTime',
      lang: 'distributionPlain.recordLog.tableHeader.operateTime'
    }
  ],
  api: commonApiUrl.operatorLog
}
export const initFormData = () => {
  return {
    noticeBill: {
      salePlanBillId: '',
      toChannelId: '',
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
    billLogistics: {
      logisticsCompanyId: '',
      country: '',
      province: '',
      city: '',
      county: '',
      address: '',
      contactsPerson: '',
      postCode: '',
      mobile: '',
      billId: '',
      notes: ''
    }

  }
}

export const salePlanList:any[] = []
// 这里定义用途 用作 国际化 的数据
export const distributionPlain = {
  list: listConfig,
  detail: detailConfig,
  recordLogObj
  // highSearchDialog: highSearchDialog
}
