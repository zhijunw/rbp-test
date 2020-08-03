import {
  commonIndexConfig,
  ListComponentsConfig,
  DetailComponentsConfig,
  TableHeaderConfig,
  CommonConfig,
  Options,
  TreeObject,
  TreeConfig,
  TabelConfig,
  FuzzyConfig
} from '@/typings'

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
import commonApiUrl from '@/api/common-api/index'

import apiUrl from '@/api/permission/dataset'
import commonApi from '@/api/common-api/index'
import { highSearchDialogConfig } from '@/layout-components/vip-dialog/index'

interface TabsConfig {
  datasetGroup: any[]
  userDataset: {
    list: TableHeaderConfig[]
    // addUserDialog: highSearchDialogConfig
  }
}

const tableHeader: TableHeaderConfig[] = [
  {
    label: '数据集编号',
    value: 'code',
    en: 'Dataset number',
    lang: 'datasetPermission.list.tableHeader.code'
  },
  {
    label: '数据集名称',
    value: 'name',
    en: 'Dataset name',
    lang: 'datasetPermission.list.tableHeader.name'
  },
  {
    label: '状态',
    value: 'status',
    en: 'State',
    lang: 'datasetPermission.list.tableHeader.status'
  },
  {
    label: '备注',
    value: 'notes',
    en: 'Remarks',
    lang: 'datasetPermission.list.tableHeader.notes'
  },
  {
    label: '制单日期',
    value: 'createdTime',
    en: 'Date of creation',
    lang: 'datasetPermission.list.tableHeader.createdTime'
  },
  {
    label: '制单人',
    value: 'createdByName',
    en: 'Founder',
    lang: 'datasetPermission.list.tableHeader.createdByName'
  },

  {
    label: '修改时间',
    value: 'updatedTime',
    en: 'Modification time',
    lang: 'datasetPermission.list.tableHeader.updatedTime'
  },
  {
    label: '修改人',
    value: 'updatedByName',
    en: 'Modifier',
    lang: 'datasetPermission.list.tableHeader.updatedByName'
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
      name: '删除',
      value: 'delete',
      lang: 'layout.btns.delete',
      event: 'batch-delete',
      id: 'btn_g_red',
      plain: true,
      interface: {
        apiUrl: apiUrl.batchDeleteDataset
      }
    },
    {
      name: '启用',
      value: 'enable',
      lang: 'layout.btns.batchEnable',
      event: 'batch-enable',
      plain: true,
      interface: {
        apiUrl: apiUrl.batchEnableDataset
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
        apiUrl: apiUrl.batchDisabelDataset
      }
    },
    {
      name: '筛选器',
      value: 'filter',
      lang: 'layout.btns.filters',
      event: 'filter',
      class: 'right',
      type: 'primary',
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
    placeholder: 'form.placeholder.dataPermissionPlaceholder',
    long: true,
    prefixIcon: 'el-icon-search'
  },
  tableHeader: tableHeader,
  formList: [
    {
      label: '数据集编号',
      en: 'Dataset Number',
      lang: 'datasetPermission.list.filter.code',
      value: 'code',
      type: 'input',
      setLength: 12
    },
    {
      label: '数据集名称',
      en: 'Dataset Name',
      lang: 'datasetPermission.list.filter.name',
      value: 'name',
      type: 'input',
      setLength: 12
    },
    {
      label: '制单人',
      en: 'Single person',
      lang: 'datasetPermission.list.filter.createdByList',
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
      lang: 'datasetPermission.list.filter.createdTime',
      value: 'createdTime',
      config: {
        type: 'daterange'
      },
      type: 'datePick',
      setLength: 12
    },
    {
      label: '最后修改人',
      en: 'Last modified',
      lang: 'datasetPermission.list.filter.updateByList',
      value: 'updateByList',
      type: 'filter',
      fuzzyConfig: {
        apiUrl: commonApiUrl.userFuzzy,
        multiple: true
      },
      setLength: 12
    },
    {
      label: '最后修改日期',
      en: 'Last modified date',
      lang: 'datasetPermission.list.filter.updatedTime',
      value: 'updatedTime',
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
      lang: 'datasetPermission.list.filter.status',
      setLength: 12,
      type: 'select',
      config: {
        multiple: true
      },
      options: [

        {
          label: '禁用',
          value: '101'
        },
        {
          label: '启用',
          value: '100'
        }
      ]
    }
  ]
}

export const detailConfig: DetailComponentsConfig = {
  btns: [
    {
      name: '新建单据',
      value: 'add',
      hiddenIcon: true,
      icon: 'el-icon-plus',
      operationId: 'ADD',
      lang: 'operationGroup.btns.add',
      plain: true,
      id: 'btn_g_d_blue'
    },
    {
      name: '删除',
      value: 'delete',
      svgIcon: 'rbp-operate_delete',
      operationId: 'DELETE',
      type: 'text',
      lang: 'operationGroup.btns.delete',
      interface: {
        apiUrl: apiUrl.batchDeleteDataset
      }
    },
    {
      name: '编辑',
      value: 'edit',
      svgIcon: 'rbp-operate_edit',
      operationId: 'MODIFY',
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
      operationId: 'ENABLE',
      svgIcon: 'rbp-operate_start',
      lang: 'operationGroup.btns.enable',
      type: 'text',
      interface: {
        apiUrl: apiUrl.batchEnableDataset
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
        apiUrl: apiUrl.batchDisabelDataset
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
      label: '数据集编号',
      value: 'code',
      en: 'Dataset number',
      lang: 'datasetPermission.detail.formList.code',
      type: 'input',
      // alwaysDisabled: true
      // editDisabled: true,
      rules: [{ required: true, message: '请输入数据集编号', trigger: 'blur' }]
    },
    {
      label: '数据集名称',
      value: 'name',
      en: 'Dataset Name',
      lang: 'datasetPermission.detail.formList.name',
      type: 'input',
      rules: [{ required: true, message: '数据集名称', trigger: 'blur' }]
    },
    {
      label: '备注',
      value: 'notes',
      en: 'Remarks',
      lang: 'datasetPermission.detail.formList.notes',
      type: 'input'
    }
  ],
  formData: {
    code: '',
    name: '',
    notes: ''
  },
  anchorConfig: [
    {
      label: '数据权限分配',
      value: 'datasetGroup',
      en: 'Data permission assignment',
      lang: 'datasetPermission.detail.anchorConfig.datasetGroup',
      ref: 'datasetGroup'
    },
    {
      label: '用户分配',
      value: 'userGroup',
      en: 'User allocation',
      lang: 'datasetPermission.detail.anchorConfig.userGroup',
      ref: 'userGroup'
    }
  ]
}
// 供应商筛选器
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
      apiUrl: commonApi.supplierList
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
// 渠道筛选器
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
        // width: '100px',
        lang: 'moduleConfig.propFilterTabs.tableHeader.code'
      },
      {
        label: '渠道名称',
        value: 'name',
        en: 'Channel Name',
        // width: '100px',
        lang: 'moduleConfig.propFilterTabs.tableHeader.name'
      }
    ],
    tableConfig: {
      isShowOpera: false,
      isMultiSelect: true,
      height: '280px'
    },
    fuzzyConfig: {
      apiUrl: commonApi.channelList
    }
  },
  {
    label: '资金号',
    value: 'fundAccount',
    type: 'checkboxTemplate',
    options: []
  }
]
// 货品筛选器
export const goodsPropFilterTab: PropFilterTabConfig[] = [
  {
    label: '货品编号',
    value: 'goodsCode',
    type: 'checkboxTemplate',
    tableHeader: [
      {
        label: '货品款号',
        value: 'code',
        en: 'Goods Number',
        lang: 'moduleConfig.propFilterTabs.goods.code'
      },
      {
        label: '货品名称',
        value: 'name',
        en: 'Goods Name',
        lang: 'moduleConfig.propFilterTabs.goods.name'
      }
    ],
    tableConfig: {
      isShowOpera: false,
      isIndex: true,
      isMultiSelect: true,
      height: '270px'
    },
    fuzzyConfig: {
      apiUrl: commonApi.goodsList
    }
  },
  {
    label: '货品类型',
    value: 'type',
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
    label: '类别',
    value: 'category',
    type: 'checkboxTemplate',
    options: []
  },
  {
    label: '系列',
    value: 'series',
    type: 'checkboxTemplate',
    options: []
  },
  {
    label: '年份',
    value: 'year',
    type: 'checkboxTemplate',
    options: []
  }
]

export const tabsConfig: TabsConfig = {
  // 数据集分配 配置
  datasetGroup: [
    {
      groupName: '主渠道',
      groupId: 'mainChannelList',
      en: 'Main Channel',
      lang: 'datasetPermission.detailTabs.mainChannel',
      list: [],
      propTabs: propFilterTabsConfig
    },
    {
      groupName: '次渠道',
      groupId: 'minorChannelList',
      en: 'Minor Channel',
      lang: 'datasetPermission.detailTabs.minorChannel',
      list: [],
      propTabs: propFilterTabsConfig
    },
    {
      groupName: '供应商参数',
      groupId: 'supplierList',
      en: 'Supplier Prop',
      lang: 'datasetPermission.detailTabs.supplierProp',
      list: [],
      propTabs: suppliePropFilterTab

    },
    {
      groupName: '货品参数',
      groupId: 'goodsList',
      en: 'Goods Prop',
      lang: 'datasetPermission.detailTabs.goodsProp',
      list: [],
      propTabs: goodsPropFilterTab
    }
  ],
  // 用户组分配 配置
  userDataset: {
    list: [

      {
        label: '用户名称',
        en: 'username',
        lang: 'datasetPermission.detailTabs.userDataset.tableHeader.name',
        value: 'name'
      },
      {
        label: '用户编号',
        en: 'user Order',
        lang: 'datasetPermission.detailTabs.userDataset.tableHeader.code',
        value: 'code'
      }
    ]
  }
}
export const initFormData = () => {
  const detailData = {
    code: '',
    name: '',
    notes: ''
  }
  return detailData
}
// 这里定义用途 用作 国际化 的数据
export const datasetPermission = {
  list: listConfig,
  detail: detailConfig,
  detailTabs: tabsConfig
  // mainChannel: {
  //   tableHeader: mainChannelTableHeader
  // }
}

