// 这里是配置 渠道搜索 货品搜索 供应商搜索的 条件选项 和列表选项
import {
  TableHeaderConfig,
  FormListConfig

} from '@/typings'
import commonApiUrl from '@/api/common-api/index'
// 渠道搜索的配置
export const channelFormList:FormListConfig[] = [
  {
    label: '编号',
    value: 'code',
    en: 'code',
    lang: 'channelOrganization.highSearchDialog.formlist.code',
    type: 'input',
    options: [],
    setLength: 24
  },
  {
    label: '名称',
    value: 'name',
    en: 'name',
    lang: 'channelOrganization.highSearchDialog.formlist.name',
    type: 'input',
    options: [],
    setLength: 24
  },
  {
    label: '区域',
    value: 'region',
    en: 'region',
    matchSelectKey: 'areaTreeList',
    lang: 'channelOrganization.highSearchDialog.formlist.region',
    type: 'cascader',
    options: [],
    setLength: 24,
    config: {
      multiple: true
    }
  },
  {
    label: '组织架构',
    value: 'organization',
    en: 'organization',
    matchSelectKey: 'organizationTreeList',
    lang: 'channelOrganization.highSearchDialog.formlist.organization',
    type: 'cascader',
    options: [],
    setLength: 24,
    config: {
      multiple: true
    }
  },
  {
    label: '品牌',
    value: 'brandId',
    en: 'brand',
    lang: 'channelOrganization.highSearchDialog.formlist.brandId',
    type: 'select',
    options: [],
    setLength: 24,
    config: {
      multiple: true
    }
  },
  {
    label: '业态',
    value: 'businessFormatId',
    en: 'Type of Style',
    lang: 'channelOrganization.highSearchDialog.formlist.businessFormatId',
    type: 'select',
    options: [],
    setLength: 24,
    config: {
      multiple: true
    }
  },
  {
    label: '等级',
    value: 'gradeId',
    en: 'Style',
    lang: 'channelOrganization.highSearchDialog.formlist.gradeId',
    type: 'select',
    options: [],
    setLength: 24,
    config: {
      multiple: true
    }
  },
  {
    label: '户口',
    value: 'receivableChannelId',
    en: 'Registered residence',
    lang: 'channelOrganization.highSearchDialog.formlist.receivableChannelId',
    type: 'select',
    options: [],
    setLength: 24,
    config: {
      multiple: true
    }
  }
]
export const channelTabelColumn: TableHeaderConfig[] = [
  {
    label: '渠道编号',
    value: 'code',
    en: 'Channel Id',
    lang: 'channelOrganization.highSearchDialog.tableHeader.code'
  },
  {
    label: '渠道简称',
    value: 'name',
    en: 'Channel Name',
    lang: 'channelOrganization.highSearchDialog.tableHeader.name'
  }
]
export const channelSearchConfig = {
  formList: channelFormList,
  tableColumn: channelTabelColumn,
  title: 'channelOrganization.highSearchDialog.title',
  api: commonApiUrl.channelHighSearch,
  selectApi: commonApiUrl.getChannelSearchSelect
}
// 货品搜索的配置
export const goodsFormList:FormListConfig[] = [
  {
    label: '货名',
    value: 'code',
    en: 'name',
    lang: 'goodsHighSearch.formlist.code',
    type: 'input',
    options: [],
    setLength: 24
  },
  {
    label: '品名',
    value: 'name',
    en: 'name',
    lang: 'goodsHighSearch.formlist.name',
    type: 'input',
    options: [],
    setLength: 24
  },
  {
    label: '品牌',
    value: 'brandId',
    en: 'brand',
    lang: 'goodsHighSearch.formlist.brandId',
    type: 'select',
    options: [],
    setLength: 24,
    config: {
      multiple: true
    }
  },
  {
    label: '类别',
    value: 'categoryId',
    en: 'category',
    lang: 'goodsHighSearch.formlist.categoryId',
    type: 'select',
    options: [],
    setLength: 24,
    config: {
      multiple: true
    }
  },
  {
    label: '系列',
    value: 'seriesId',
    en: 'series',
    lang: 'goodsHighSearch.formlist.seriesId',
    type: 'select',
    options: [],
    setLength: 24,
    config: {
      multiple: true
    }
  },
  {
    label: '款型',
    value: 'patternId',
    en: 'Type of Style',
    lang: 'goodsHighSearch.formlist.patternId',
    type: 'select',
    options: [],
    setLength: 24,
    config: {
      multiple: true
    }
  },
  {
    label: '风格',
    value: 'styleId',
    en: 'Style',
    lang: 'goodsHighSearch.formlist.styleId',
    type: 'select',
    options: [],
    setLength: 24,
    config: {
      multiple: true
    }
  },
  {
    label: '销售分类',
    value: 'saleClassId',
    en: 'Sales classification',
    lang: 'goodsHighSearch.formlist.saleClassId',
    type: 'select',
    options: [],
    setLength: 24,
    config: {
      multiple: true
    }
  },
  {
    label: '年份',
    value: 'yearId',
    en: 'Years',
    lang: 'goodsHighSearch.formlist.yearId',
    type: 'select',
    options: [],
    setLength: 24,
    config: {
      multiple: true
    }
  },
  {
    label: '季节',
    value: 'seasonId',
    en: 'Season',
    lang: 'goodsHighSearch.formlist.seasonId',
    type: 'select',
    options: [],
    setLength: 24,
    config: {
      multiple: true
    }
  },
  {
    label: '波段',
    value: 'bandId',
    en: 'Wave Band',
    lang: 'goodsHighSearch.formlist.bandId',
    type: 'select',
    options: [],
    setLength: 24,
    config: {
      multiple: true
    }
  },

  {
    label: '性别',
    value: 'sexId',
    en: 'Sex',
    lang: 'goodsHighSearch.formlist.sexId',
    type: 'select',
    options: [],
    setLength: 24,
    config: {
      multiple: true
    }
  },
  {
    label: '状态',
    value: 'status',
    en: 'State',
    lang: 'goodsFiels.list.filter.status',
    setLength: 24,
    matchSelectKey: 'statusIds',
    options: [],
    type: 'select',
    config: {
      multiple: true
    }
  }
]
export const goodsTableColumn:TableHeaderConfig[] = [
  {
    label: '货品货号',
    value: 'code',
    en: 'Item Number',
    lang: 'barcode.list.tableHeader.code'
  },
  {
    label: '货品名称',
    value: 'name',
    en: 'Product Name',
    lang: 'barcode.list.tableHeader.name'
  }
]
export const goodsSearchConfig = {
  formList: goodsFormList,
  tableColumn: goodsTableColumn,
  title: 'goodsHighSearch.title',
  api: commonApiUrl.goodsHighSearch,
  selectApi: commonApiUrl.getGoodsSearchSelect
}
// 单据搜索的配置
export const billFormList: FormListConfig[] = [
  {
    label: '单据编号',
    value: 'billNo',
    en: 'billNo',
    lang: 'salePlainAdjustment.detail.formList.billNo',
    type: 'input',
    setLength: 24
  },
  {
    label: '手工单号',
    value: 'manualId',
    en: 'manualId',
    lang: 'salePlainAdjustment.detail.formList.manualId',
    type: 'input',
    setLength: 24
  },
  {
    label: '业务类型',
    value: 'businessTypeId',
    en: 'businessTypeId',
    matchSelectKey: 'businessTypeIds',
    lang: 'salePlain.list.filter.businessTypeIdList',
    type: 'select',
    options: [],
    setLength: 24
  },
  {
    label: '价格类型',
    value: 'priceTypeId',
    en: 'priceTypeId',
    lang: 'salePlain.list.filter.priceTypeIdList',
    type: 'select',
    options: [],
    setLength: 24
  },
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
    setLength: 24
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
    setLength: 24
  }
  // {
  //   label: '货品',
  //   value: 'goods',
  //   en: 'goods',
  //   lang: 'salePlain.list.filter.goodsIdList',
  //   type: 'select',
  //   options: [],
  //   setLength: 24
  // }
]
export const billTableColumn: TableHeaderConfig[] = [
  {
    label: '单据编号',
    value: 'billNo',
    en: 'billNo',
    lang: 'salePlainAdjustment.detail.formList.billNo'
  },
  {
    label: '手工单号',
    value: 'manualId',
    en: 'manualId',
    lang: 'salePlainAdjustment.detail.formList.manualId'
  }
]
export const billSearchConfig = {
  formList: billFormList,
  tableColumn: billTableColumn,
  title: 'salePlainAdjustment.titleDialog',
  api: commonApiUrl.billHighSearch
  // selectApi: commonApiUrl.getBillNoSearchSelect
}
// 指令单搜索的配置
export const instructionSheetFormList: FormListConfig[] = [
  {
    label: '单据编号',
    value: 'billNo',
    en: 'code',
    lang: 'distributionPlain.highSearchDialog.formlist.billNo',
    type: 'input',
    options: [],
    setLength: 24
  },
  {
    label: '手工单号',
    value: 'manualId',
    en: 'manual',
    lang: 'distributionPlain.highSearchDialog.formlist.manualId',
    type: 'input',
    options: [],
    setLength: 24
  },
  {
    label: '发货渠道',
    value: 'channelId',
    en: 'Channel',
    lang: 'deliver.detail.formList.channelId',
    type: 'highSearch',
    disabled: false,
    highSearchConfig: {
      dialogSearchConfig: Object.assign({}, channelSearchConfig),
      apiUrl: commonApiUrl.channelFuzzy
    },
    setLength: 24
  },
  {
    label: '收货渠道',
    value: 'toChannelId',
    en: 'Channel',
    lang: 'distributionPlain.detail.formList.toChannelId',
    type: 'highSearch',
    disabled: false,
    highSearchConfig: {
      dialogSearchConfig: Object.assign({}, channelSearchConfig),
      apiUrl: commonApiUrl.channelFuzzy
    },
    setLength: 24
  },
  {
    label: '价格类型',
    value: 'priceTypeIds',
    en: 'Price type',
    lang: 'deliver.detail.formList.priceTypeIds',
    matchSelectKey: 'priceTypeIds',
    type: 'select',
    setLength: 24,
    options: []
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
    setLength: 24
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
    setLength: 24
  },
  {
    label: '备注',
    value: 'notes',
    en: 'Remark',
    lang: 'deliver.detail.formList.notes',
    type: 'input',
    setLength: 24
  }
]
export const instructionSheetTableColumn: TableHeaderConfig[] = [
  {
    width: '100',
    label: '单据编号',
    value: 'billNo',
    en: 'bill Id',
    lang: 'distributionPlain.highSearchDialog.tableHeader.billNo'
  },
  {
    width: '100',
    label: '手工单号',
    value: 'manualId',
    en: 'bill Id',
    lang: 'distributionPlain.highSearchDialog.tableHeader.manualId'
  },
  {
    width: '100',
    label: '单据类型',
    value: 'businessTypeName',
    en: 'businessTypeName',
    lang: 'distributionPlain.highSearchDialog.tableHeader.businessTypeName'
  },
  {
    width: '120',
    label: '发货渠道',
    value: 'channelName',
    en: 'channelName',
    lang: 'distributionPlain.highSearchDialog.tableHeader.channelName'
  },
  {
    width: '120',
    label: '收货渠道',
    value: 'toChannelName',
    en: 'to ChannelName',
    lang: 'distributionPlain.highSearchDialog.tableHeader.toChannelName'
  },
  {
    width: '120',
    label: '备注',
    value: 'notes',
    en: 'notes',
    lang: 'distributionPlain.highSearchDialog.tableHeader.notes'
  }
]
export const instructionSheetSearchConfig = {
  formList: instructionSheetFormList,
  tableColumn: instructionSheetTableColumn,
  title: 'distributionPlain.highSearchDialog.title',
  api: commonApiUrl.noticeBillHighSearch
}

// 发货单筛选
// 单据搜索的配置
export const sendFormList: FormListConfig[] = [
  {
    label: '单据编号',
    value: 'billNo',
    en: 'billNo',
    lang: 'terminalLogistics.detail.formList.billNo',
    type: 'input',
    setLength: 24
  },
  {
    label: '手工单号',
    value: 'manualId',
    en: 'manualId',
    lang: 'terminalLogistics.detail.formList.manualId',
    type: 'input',
    setLength: 24
  },
  {
    label: '业务类型',
    value: 'businessTypeId',
    en: 'businessTypeId',
    matchSelectKey: 'businessTypeIds',
    lang: 'terminalLogistics.detail.formList.businessTypeId',
    type: 'select',
    options: [],
    setLength: 24
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
    setLength: 24
  },
  {
    label: '发货渠道',
    en: 'channelId',
    lang: 'terminalLogistics.list.filter.channelId',
    value: 'channelId',
    type: 'highSearch',
    linkValue: 'channelIdFilterParam',
    disabled: false,
    highSearchConfig: {
      dialogSearchConfig: channelSearchConfig,
      apiUrl: commonApiUrl.channelFuzzy
    },
    setLength: 24
  },
  {
    label: '收货渠道',
    en: 'toChannelId',
    lang: 'terminalLogistics.list.filter.toChannelId',
    value: 'toChannelId',
    type: 'highSearch',
    linkValue: 'toChannelIdFilterParam',
    disabled: false,
    highSearchConfig: {
      dialogSearchConfig: channelSearchConfig,
      apiUrl: commonApiUrl.channelFuzzy
    },
    setLength: 24
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
    setLength: 24
  }
]
export const sendTableColumn: TableHeaderConfig[] = [
  {
    label: '单据编号',
    value: 'code',
    en: 'billNo',
    lang: 'salePlainAdjustment.detail.formList.billNo'
  },
  {
    label: '手工单号',
    value: 'name',
    en: 'manualId',
    lang: 'salePlainAdjustment.detail.formList.manualId'
  }
]

export const sendSearchConfig = {
  formList: sendFormList,
  tableColumn: sendTableColumn,
  title: 'terminalLogistics.titleDialog',
  api: commonApiUrl.sendHighSearch
  // selectApi: commonApiUrl.getBillNoSearchSelect
}

export const userFormList: FormListConfig[] = [

  {
    label: '用户名称',
    value: 'userIds',
    en: 'Customer Name',
    lang: 'userHighSearch.formlist.userIds',
    type: 'filter',
    fuzzyConfig: {
      apiUrl: commonApiUrl.userFuzzy,
      multiple: true
    },
    setLength: 24
  },
  {
    label: '角色',
    value: 'roleIds',
    matchSelectKey: 'role',
    en: 'Roles',
    lang: 'userHighSearch.formlist.roleIds',
    type: 'select',
    config: {
      multiple: true
    },
    options: [],
    setLength: 24
  },
  {
    label: '数据集',
    value: 'dataIds',
    matchSelectKey: 'data',
    en: 'Dataset',
    lang: 'userHighSearch.formlist.dataIds',
    type: 'select',
    options: [],
    config: {
      multiple: true
    },
    setLength: 24
  }

]
export const userTableColumn: TableHeaderConfig[] = [
  {
    value: 'code',
    label: '用户编号',
    en: 'User Id',
    lang: 'userHighSearch.userTableColumn.code'
  },
  {
    value: 'name',
    label: '用户名称',
    en: 'Username',
    lang: 'userHighSearch.userTableColumn.name'
  }
]
export const userSearchConfig = {
  formList: userFormList,
  tableColumn: userTableColumn,
  title: 'userHighSearch.title',
  api: commonApiUrl.userHighSearch,
  selectApi: commonApiUrl.getSelect
}

export const configs = {
  channel: {
    formList: channelFormList,
    tableColumn: channelTabelColumn,
    title: 'channelOrganization.highSearchDialog.title',
    api: commonApiUrl.channelHighSearch,
    selectApi: commonApiUrl.getChannelSearchSelect
  },
  goods: {
    formList: goodsFormList,
    tableColumn: goodsTableColumn,
    title: 'goodsFiels.highSearchDialog.title',
    api: commonApiUrl.goodsHighSearch,
    selectApi: commonApiUrl.getGoodsSearchSelect
  }
}
