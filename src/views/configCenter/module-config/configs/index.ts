import {
  commonIndexConfig,
  ListComponentsConfig,
  AnchorConfig,
  TableHeaderConfig,
  DetailOperationConfig,
  FormListConfig,
  CommonConfig,
  TabelConfig,
  FuzzyConfig,
  TreeConfig,
  TreeObject,
  Options
} from '@/typings'

import apiUrl from '@/api/config-center/module-config'

interface GooodsFileDetail {
    btns: DetailOperationConfig[]
    formList: FormListConfig[]
    moduleProp: FormListConfig[]

    anchorConfig: AnchorConfig[]
    featuresConfig: TableHeaderConfig[]
}
type TemplateType = 'checkboxTemplate' | 'treeTemplate' | 'tableTemplate' | 'cascaderTemplate'
interface PropFilterTabConfig extends CommonConfig {
    type: TemplateType
    options?: Options[]
    treeOptions?: TreeObject[]
    tableHeader?: TableHeaderConfig[]
    treeConfig?: TreeConfig
    tableConfig?: TabelConfig
    fuzzyConfig?: FuzzyConfig
}

export const suppliePropFilterTab: PropFilterTabConfig[] = [
  {
    label: '供应商编号',
    value: 'supplierCode',
    type: 'tableTemplate',
    tableHeader: [
      {
        label: '供应商编号',
        value: 'code',
        en: 'Channel number',
        lang: 'moduleConfig.propFilterTabs.supplier.code'
      },
      {
        label: '供应商名称',
        value: 'name',
        en: 'Channel Name',
        lang: 'moduleConfig.propFilterTabs.supplier.name'
      }
    ],
    tableConfig: {
      isShowOpera: false,
      isIndex: true,
      isMultiSelect: true,
      height: '270px'
    },
    fuzzyConfig: {
      apiUrl: apiUrl.supplierFuzzy
    }
  },
  {
    label: '供应商分类',
    value: 'supplerType',
    type: 'checkboxTemplate',
    options: []
  },
  {
    label: '区域',
    value: 'areaTree',
    type: 'treeTemplate',
    treeConfig: {
      showCheckbox: true,
      isFilter: true,
      defaultExpandAll: true
    },
    treeOptions: []
  },
  {
    label: '性质',
    value: 'supplierNature',
    type: 'checkboxTemplate',
    options: []
  },
  {
    label: '资金号',
    value: 'fundAccount',
    type: 'checkboxTemplate',
    options: []
  }
]

export const propFilterTabsConfig: PropFilterTabConfig[] = [
  {
    label: '渠道业态',
    value: 'channelBusinessFormat',
    type: 'checkboxTemplate',
    options: []
  },
  {
    label: '区域',
    value: 'areaTree',
    type: 'treeTemplate',
    treeConfig: {
      showCheckbox: true,
      isFilter: true,
      defaultExpandAll: true
    },
    treeOptions: []
  },
  {
    label: '组织架构',
    value: 'organizationTree',
    type: 'treeTemplate',
    treeConfig: {
      showCheckbox: true,
      isFilter: true,
      defaultExpandAll: true
    },
    treeOptions: []
  },
  {
    label: '结算方式',
    value: 'channelBalanceType',
    type: 'checkboxTemplate',
    options: []
  },
  {
    label: '品牌',
    value: 'brand',
    type: 'checkboxTemplate',
    options: []
  },
  {
    label: '渠道编号',
    value: 'channelCode',
    type: 'tableTemplate',
    tableHeader: [
      {
        label: '渠道编号',
        value: 'code',
        en: 'Channel number',
        lang: 'moduleConfig.propFilterTabs.tableHeader.code'
      },
      {
        label: '渠道名称',
        value: 'name',
        en: 'Channel Name',
        lang: 'moduleConfig.propFilterTabs.tableHeader.name'
      }
    ],
    tableConfig: {
      isShowOpera: false,
      isIndex: true,
      isMultiSelect: true,
      height: '270px'
    },
    fuzzyConfig: {
      apiUrl: apiUrl.channelFuzyy
    }
  },
  {
    label: '资金号',
    value: 'fundAccount',
    type: 'checkboxTemplate',
    options: []
  }
]

const tableHeader: TableHeaderConfig[] = [
  {
    label: '模块编号',
    value: 'id',
    en: 'Item Number',
    lang: 'moduleConfig.list.tableHeader.id'
  },
  {
    label: '模块名称',
    value: 'name',
    en: 'Module Name',
    lang: 'moduleConfig.list.tableHeader.name'
  },
  {
    label: '基础模块',
    value: 'baseModuleName',
    en: 'Base Module',
    lang: 'moduleConfig.list.tableHeader.baseModuleName'
  },
  {
    label: '模块业务类型',
    value: 'typeName',
    en: 'Module business type',
    lang: 'moduleConfig.list.tableHeader.typeName'
  },
  {
    label: '状态',
    value: 'status',
    en: 'status',
    lang: 'moduleConfig.list.tableHeader.status'
  },
  {
    label: '主渠道',
    value: 'mainChannelTypeName',
    en: 'Main Channel',
    lang: 'moduleConfig.list.tableHeader.mainChannelTypeName'
  },
  {
    label: '科目',
    value: 'subjectName',
    en: 'Subject',
    lang: 'moduleConfig.list.tableHeader.subjectName'
  },
  {
    label: '创建人',
    value: 'createdByName',
    en: 'Single user',
    lang: 'moduleConfig.list.tableHeader.createdByName'
  },
  {
    label: '创建日期',
    value: 'createdTime',
    en: 'Date of making order',
    lang: 'moduleConfig.list.tableHeader.createdTime'
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
      name: '新建模块',
      value: 'add',
      lang: 'layout.btns.addModule',
      event: 'add',
      id: 'btn_g_d_blue',
      plain: true,
      icon: 'el-icon-plus',
      interface: {
        name: 'add'
      }
    },
    {
      name: '启用',
      value: 'enable',
      lang: 'layout.btns.batchEnable',
      event: 'batch-enable',
      plain: true,
      interface: {
        apiUrl: apiUrl.batchEnable
      }
    },
    {
      name: '禁用',
      value: 'batchDisable',
      lang: 'layout.btns.batchDisable',
      event: 'batch-disable',
      id: 'btn_g_red',
      plain: true,
      interface: {
        apiUrl: apiUrl.batchDisable
      }
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
    // {
    //   name: '表头配置',
    //   value: 'tabelheaderConfig',
    //   lang: 'layout.btns.tabelheaderConfig',
    //   event: 'showTabelheaderConfig',
    //   id: 'btn_g_gray',
    //   plain: true,
    //   class: 'right',
    //   interface: {
    //     name: 'filter'
    //   }
    // }
  ],
  InputConfig: {
    placeholder: 'form.placeholder.keywordPlaceholder',
    long: true,
    prefixIcon: 'el-icon-search'
  },
  tableHeader: tableHeader,
  formList: [

    {
      label: '基础模块',
      en: 'Base Module',
      lang: 'moduleConfig.list.filter.baseModuleId',
      value: 'baseModuleId',
      type: 'select',
      matchSelectKey: 'baseModule',
      setLength: 12,
      config: {
        multiple: true
      },
      options: []
    },
    {
      label: '模块编号',
      en: 'Module Number',
      lang: 'moduleConfig.list.filter.id',
      value: 'id',
      type: 'input',
      setLength: 12
    },
    {
      label: '模块名称',
      en: 'Module Name',
      lang: 'moduleConfig.list.filter.name',
      value: 'name',
      type: 'input',
      setLength: 12
    },
    {
      label: '备注',
      en: 'Notes',
      lang: 'moduleConfig.list.filter.notes',
      value: 'notes',
      type: 'input',
      setLength: 12
    }

  ]

}

export const detailConfig: GooodsFileDetail = {
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
      name: '编辑',
      value: 'edit',
      svgIcon: 'rbp-operate_edit',
      operationId: 'edit',
      type: 'text',
      lang: 'operationGroup.btns.edit'
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
      name: '启用',
      value: 'enable',
      operationId: 'enable',
      svgIcon: 'rbp-operate_start',
      lang: 'operationGroup.btns.enable',
      type: 'text',
      interface: {
        apiUrl: apiUrl.batchEnable,
        params: []
      }
    },
    {
      name: '禁用',
      value: 'disable',
      operationId: 'disable',
      svgIcon: 'rbp-operate_ban',
      lang: 'operationGroup.btns.disable',
      type: 'text',
      interface: {
        apiUrl: apiUrl.batchDisable,
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
    }
  ],
  formList: [
    {
      label: '基础模块',
      value: 'baseModuleId',
      en: 'Base Module',
      lang: 'moduleConfig.detail.formList.baseModuleId',
      options: [],
      type: 'select',
      matchSelectKey: 'baseModule',
      rules: [{
        required: true,
        message: '请选择基础模块',
        trigger: 'change'
      }]
    },
    {
      label: '模块业务类型',
      value: 'type',
      en: 'Module business type',
      lang: 'moduleConfig.detail.formList.type',
      type: 'select',
      matchSelectKey: 'type',
      options: [],
      rules: [{
        required: true,
        message: '请选择模块业务类型',
        trigger: 'change'
      }]
    },
    {
      label: '模块编号',
      value: 'id',
      en: 'Module Number',
      lang: 'moduleConfig.detail.formList.id',
      // type: 'input',
      rules: [{
        required: true,
        message: '请输入模块编号',
        trigger: 'blur'
      }]
    },
    {
      label: '模块名称',
      value: 'name',
      en: 'Module Name',
      lang: 'moduleConfig.detail.formList.name',
      type: 'input',
      rules: [{
        required: true,
        message: '请输入模块名称',
        trigger: 'blur'
      }]
    }
  ],
  moduleProp: [
    {
      label: '发货渠道范围',
      value: 'sendChannels',
      en: 'Scope of delivery channels',
      lang: 'moduleConfig.detail.moduleProp.sendChannels',
      setLength: 12,
      options: []
    },
    {
      label: '收货渠道范围',
      value: 'receiveChannels',
      en: 'Receiving channel range',
      lang: 'moduleConfig.detail.moduleProp.receiveChannels',
      setLength: 12,
      options: []
    },
    {
      label: '供应商范围',
      value: 'suppliers',
      en: 'Supplier scope',
      lang: 'moduleConfig.detail.moduleProp.suppliers',
      setLength: 12,
      options: []
    },
    {
      label: '主渠道',
      value: 'mainChannelType',
      en: 'Main Channer',
      lang: 'moduleConfig.detail.moduleProp.mainChannelType',
      type: 'select',
      matchSelectKey: 'mainChannelType',
      options: []
    },

    {
      label: '科目',
      value: 'subjectId',
      en: 'Subject',
      lang: 'moduleConfig.detail.moduleProp.subjectId',
      type: 'select',
      matchSelectKey: 'subjectId',
      options: []
    },
    {
      label: '业务类型',
      value: 'businessTypes',
      en: 'Business type',
      lang: 'moduleConfig.detail.moduleProp.businessTypes',
      type: 'select',
      matchSelectKey: 'businessType',
      config: {
        multiple: true
      },
      options: []
    },
    {
      label: '上级业务类型',
      value: 'preBusinessTypes',
      en: 'Parent business type',
      lang: 'moduleConfig.detail.moduleProp.preBusinessTypes',
      type: 'select',
      matchSelectKey: 'businessType',
      config: {
        multiple: true
      },
      options: []
    },
    {
      label: '价格类型',
      value: 'priceTypes',
      en: 'Price type',
      lang: 'moduleConfig.detail.moduleProp.priceTypes',
      type: 'select',
      matchSelectKey: 'priceType',
      config: {
        multiple: true
      },
      options: []
    },
    {
      label: '备注',
      value: 'notes',
      en: 'Notes',
      lang: 'moduleConfig.detail.moduleProp.notes',
      type: 'input',
      disabled: true,
      setLength: 12
    }
  ],
  anchorConfig: [
    {
      label: '模块属性',
      value: 'moduleProp',
      en: 'Module Prop',
      lang: 'moduleConfig.detail.anchorConfig.moduleProp',
      ref: 'moduleProp'
    },
    {
      label: '特性配置',
      value: 'featuresConfig',
      en: 'Features Config',
      lang: 'moduleConfig.detail.anchorConfig.featuresConfig',
      ref: 'featuresConfig'
    }

  ],
  featuresConfig: [

    {
      label: '启用',
      value: 'enable',
      en: 'Enable',
      type: 'checkbox',
      width: '90px',
      lang: 'moduleConfig.detail.featuresConfig.enable'
    },
    {
      label: '配置项',
      value: 'name',
      en: 'Config Item',
      lang: 'moduleConfig.detail.featuresConfig.name'
    },
    {
      label: '值',
      value: 'value',
      en: 'Value',
      type: 'input',
      lang: 'moduleConfig.detail.featuresConfig.value'
    }
  ]
}
export const initFormData = () => {
  const detailData = {
    module: {
      baseModuleId: '',
      type: '',
      id: '',
      name: ''
    },
    sendChannels: [],
    receiveChannels: [],
    suppliers: [],
    features: []
  }
  return detailData
}
// 这里定义用途 用作 国际化 的数据
export const moduleConfig = {
  list: listConfig,
  detail: detailConfig

}
