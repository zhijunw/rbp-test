import {
  commonIndexConfig,
  ListComponentsConfig,
  DetailComponentsConfig,
  DetailTabsConfig
} from '@/typings'

import apiUrl from '@/api/config-center/channelOrganization'
import { highSearchDialogConfig } from '@/layout-components/vip-dialog/index'
import commonApiUrl from '@/api/common-api/index'
import { Tools } from '@/utils/tools'

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

export const highSearchDialog: highSearchDialogConfig = {
  formList: [
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
      label: '业务',
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
      matchSelectKey: 'fundAccountList',
      lang: 'channelOrganization.highSearchDialog.formlist.receivableChannelId',
      type: 'select',
      options: [],
      setLength: 24,
      config: {
        multiple: true
      }
    }

  ],
  tableColumn: [
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
  ],
  api: apiUrl.channelHighSearch,
  title: 'channelOrganization.highSearchDialog.title'
}

export const listConfig: ListComponentsConfig = {
  btns: [
    {
      name: '新建渠道',
      value: 'add',
      lang: 'layout.btns.addChannel',
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
      value: 'batchAudit',
      lang: 'layout.btns.batchAudit',
      event: 'batch-audit',
      id: 'btn_g_gray',
      plain: true,
      interface: {
        name: 'batch-audit',
        apiUrl: apiUrl.auditChannel
      }
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
        apiUrl: apiUrl.delChannel
      }
    },
    {
      name: '导入',
      value: 'batchImport',
      lang: 'layout.btns.batchImport',
      event: 'batch-import',
      id: 'btn_g_gray',
      plain: true,
      interface: {
        name: 'batch-import'
      }
    },
    {
      name: '导出',
      value: 'singleExport',
      lang: 'layout.btns.singleExport',
      event: 'batch-out',
      id: 'btn_g_gray',
      plain: true,
      interface: {
        name: 'batch-out'
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
    placeholder: 'form.placeholder.channelPlaceholder',
    long: true,
    prefixIcon: 'el-icon-search'
  },
  tableHeader: [],
  formList: [
    {
      label: '渠道',
      en: 'Channel Number',
      lang: 'channelOrganization.list.filter.channelIdList',
      value: 'channelIdList',
      type: 'highSearch',
      linkValue: 'channelFilterParam',
      highSearchConfig: {
        dialogSearchConfig: highSearchDialog,
        apiUrl: apiUrl.fuzzy
      },
      setLength: 12
    },
    {
      label: '制单用户',
      en: 'Making The User',
      lang: 'channelOrganization.list.filter.createdBy',
      value: 'createdBy',
      type: 'input',
      setLength: 12
    },
    {
      label: '制单日期',
      value: 'createdTime',
      en: 'Prepare Date',
      lang: 'channelOrganization.list.filter.createdTime',
      type: 'datePick',
      setLength: 12,
      config: {
        type: 'daterange',
        valueFormat: 'yyyy-MM-dd'
      }
    },
    {
      label: '修改用户',
      en: 'Modify The User',
      lang: 'channelOrganization.list.filter.updateByList',
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
      value: 'updatedTime',
      en: 'Modification Time',
      lang: 'channelOrganization.list.filter.updatedTime',
      type: 'datePick',
      setLength: 12,
      config: {
        type: 'daterange',
        valueFormat: 'yyyy-MM-dd'
      }
    },
    {
      label: '审核用户',
      en: 'Review The User',
      lang: 'channelOrganization.list.filter.checkByList',
      value: 'checkByList',
      type: 'filter',
      fuzzyConfig: {
        apiUrl: commonApiUrl.userFuzzy,
        multiple: true

      },
      setLength: 12
    },
    {
      label: '审核时间',
      value: 'checkTime',
      en: 'Audit Date',
      lang: 'channelOrganization.list.filter.checkTime',
      type: 'datePick',
      setLength: 12,
      config: {
        type: 'daterange',
        valueFormat: 'yyyy-MM-dd'
      }
    },
    {
      label: '作废用户',
      en: 'Invalid User',
      lang: 'channelOrganization.list.filter.cancelByList',
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
      value: 'cancelTime',
      en: 'Invalid Time',
      lang: 'channelOrganization.list.filter.cancelTime',
      type: 'datePick',
      setLength: 12,
      config: {
        type: 'daterange',
        valueFormat: 'yyyy-MM-dd'
      }
    },
    {
      label: '状态',
      value: 'status',
      en: 'State',
      lang: 'channelOrganization.list.filter.status',
      type: 'select',
      setLength: 12,
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
          label: '已注销',
          value: '3'
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
      lang: 'operationGroup.btns.addChannel',
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
        apiUrl: apiUrl.delChannel
      }
    },
    {
      name: '修改',
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
      name: '审核',
      value: 'audit',
      svgIcon: 'rbp-operate_check',
      lang: 'operationGroup.btns.audit',
      type: 'text',
      operationId: 'APPROVE',
      interface: {
        apiUrl: apiUrl.singleAuditChannel,
        params: 'single'
      }
    },
    {
      name: '反审核',
      value: 'unaudit',
      svgIcon: 'rbp-operate_recheck',
      lang: 'operationGroup.btns.unaudit',
      type: 'text',
      operationId: 'UNAUDIT',
      interface: {
        apiUrl: apiUrl.singleUnAuditChannel,
        params: 'single'
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
        params: 'string'
      }
    },
    {
      name: '作废',
      value: 'invalid',
      svgIcon: 'rbp-operate_cancellation',
      lang: 'operationGroup.btns.invalid',
      type: 'text',
      operationId: 'INVALID',
      interface: {
        apiUrl: apiUrl.singleInvoidChannel,
        params: 'single'
      }
    },
    {
      name: '导入',
      value: 'import',
      svgIcon: 'rbp-operate_import',
      lang: 'operationGroup.btns.import',
      type: 'text',
      operationId: 'IMPORT'
    },
    {
      name: '导出',
      value: 'export',
      svgIcon: 'rbp-operate_export',
      lang: 'operationGroup.btns.export',
      type: 'text',
      operationId: 'EXPORT'
    },
    {
      name: '打印',
      value: 'print',
      svgIcon: 'rbp-operate_print',
      lang: 'operationGroup.btns.print',
      type: 'text',
      operationId: 'PRINT'
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
      label: '渠道编号',
      value: 'code',
      en: 'Channel Number',
      lang: 'channelOrganization.detail.formList.code',
      type: 'input',
      rules: [{ required: true, message: '请输入渠道编号', trigger: 'blur' }]
    },
    {
      label: '渠道名称',
      value: 'fullName',
      en: 'Channel name',
      lang: 'channelOrganization.detail.formList.fullName',
      type: 'input',
      rules: [{ required: true, message: '请输入渠道名称', trigger: 'blur' }]
    },
    {
      label: '渠道简称',
      value: 'name',
      en: 'abbreviation',
      lang: 'channelOrganization.detail.formList.name',
      type: 'input'
    },
    {
      label: '建档日期',
      value: 'buildDate',
      en: 'Document Date',
      lang: 'channelOrganization.detail.formList.buildDate',
      type: 'datePick',
      rules: [{ required: true, message: '请输入制单日期', trigger: 'change' }],
      config: {
        valueFormat: 'yyyy-MM-dd'
      }
    }
  ]
}

export const tabsConfig :DetailTabsConfig = {
  channelProperties: {
    list: [
      {
        label: '区域',
        value: 'area',
        en: 'Area',
        lang: 'channelOrganization.tabs.channelProperties.formList.area',
        type: 'cascader',
        matchSelectKey: 'areaTreeList',
        setLength: 12,
        cascaderConfig: ['nation', 'region', 'province', 'city', 'county'],
        options: []
      },
      {
        label: '详细地址',
        value: 'address',
        en: 'Detailed Address',
        lang: 'channelOrganization.tabs.channelProperties.formList.address',
        type: 'input',
        setLength: 12
      },
      {
        label: '组织架构',
        value: 'organization',
        en: 'Organizational Structure',
        matchSelectKey: 'organizationTreeList',
        lang: 'channelOrganization.tabs.channelProperties.formList.organization',
        type: 'cascader',
        setLength: 12,
        cascaderConfig: ['organization1', 'organization2', 'organization3', 'organization4', 'organization5'],
        options: []
      },
      {
        label: '品牌',
        value: 'brandId',
        en: 'Brand',
        lang: 'channelOrganization.tabs.channelProperties.formList.brandId',
        type: 'select',
        setLength: 12,
        config: {
          multiple: true
        },
        options: [],
        refreshKey: 'brand',
        refreshAPI: '/information/systemDictionary/option/refresh'
      },
      {
        label: '上级渠道',
        value: 'parentChannelId',
        en: 'The Superior Channels',
        lang: 'channelOrganization.tabs.channelProperties.formList.parentChannelId',
        type: 'select',
        setLength: 6,
        options: []
      },
      {
        label: '分公司',
        value: 'branchCompanyId',
        en: 'Filiale',
        lang: 'channelOrganization.tabs.channelProperties.formList.branchCompanyId',
        type: 'select',
        setLength: 6,
        options: [],
        refreshKey: 'branchCompany',
        refreshAPI: '/information/systemDictionary/option/refresh'
      },
      {
        label: '渠道等级',
        value: 'gradeId',
        en: 'Channel Level',
        lang: 'channelOrganization.tabs.channelProperties.formList.gradeId',
        type: 'select',
        setLength: 6,
        options: [],
        refreshKey: 'channelGrade',
        refreshAPI: '/information/systemDictionary/option/refresh'
      },
      {
        label: '渠道业态',
        value: 'businessFormatId',
        en: 'Channel Forms',
        lang: 'channelOrganization.tabs.channelProperties.formList.businessFormatId',
        type: 'select',
        setLength: 6,
        options: [],
        refreshKey: 'channelBusinessFormat',
        refreshAPI: '/information/systemDictionary/option/refresh'
      },
      {
        label: '结算方式',
        value: 'balanceTypeId',
        en: 'Clearing Form',
        lang: 'channelOrganization.tabs.channelProperties.formList.balanceTypeId',
        type: 'select',
        setLength: 6,
        options: [],
        refreshKey: 'channelbalanceType',
        refreshAPI: '/information/systemDictionary/option/refresh'
      },
      {
        label: '零售吊牌价类型',
        value: 'retailTagPriceTypeId',
        en: 'Type of retail tag price',
        lang: 'channelOrganization.tabs.channelProperties.formList.retailTagPriceTypeId',
        type: 'select',
        matchSelectKey: 'tagPriceTypeId',
        setLength: 6,
        options: [],
        refreshKey: 'tagPriceType',
        refreshAPI: '/information/systemDictionary/option/refresh'
      },
      {
        label: '分销吊牌价类型',
        value: 'saleTagPriceTypeId',
        matchSelectKey: 'tagPriceTypeId',
        en: 'Distribution tag price type',
        lang: 'channelOrganization.tabs.channelProperties.formList.saleTagPriceTypeId',
        type: 'select',
        setLength: 6,
        options: [],
        refreshKey: 'tagPriceType',
        refreshAPI: '/information/systemDictionary/option/refresh'
      }
    ]
  },
  financialInformation: {
    list: [
      {
        label: '应收户口编号',
        value: 'receivableChannelId',
        en: 'Account Receivable Number',
        lang: 'channelOrganization.tabs.financialInformation.formList.receivableChannelId',
        type: 'select',
        matchSelectKey: 'fundAccountList',
        setLength: 6,

        options: []
      },
      {
        label: '应付户口编号',
        value: 'payableChannelId',
        en: 'Account Number Payable',
        lang: 'channelOrganization.tabs.financialInformation.formList.payableChannelId',
        type: 'select',
        setLength: 6,
        matchSelectKey: 'fundAccountList',
        options: []
      },
      {
        label: '法人',
        value: 'legalPersonId',
        en: 'Legal Person',
        lang: 'channelOrganization.tabs.financialInformation.formList.legalPersonId',
        type: 'select',
        setLength: 6,

        options: []
      },
      {
        label: '信用额度',
        value: 'credit',
        en: 'Credits',
        lang: 'channelOrganization.tabs.financialInformation.formList.credit',
        type: 'number',
        config: {
          prefixIcon: 'iconfont rbp-Group-'
        },
        setLength: 6
      },
      {
        label: '开户行',
        value: 'openingBank',
        en: 'Opening Bank',
        lang: 'channelOrganization.tabs.financialInformation.formList.openingBank',
        type: 'input',
        setLength: 6
      },
      {
        label: '银行卡号',
        value: 'bankCard',
        en: 'Credit Card Numbers',
        lang: 'channelOrganization.tabs.financialInformation.formList.bankCard',
        type: 'input',
        setLength: 6
      }
    ]
  },
  salePolicy: [
    {
      label: '销售类别',
      value: 'priceTypeId',
      en: 'Sales category',
      lang: 'channelOrganization.tabs.salePolicy.priceTypeId',
      type: 'select',
      matchSelectKey: 'priceTypeList',
      options: [],
      align: 'left',
      refreshKey: 'priceType',
      refreshAPI: '/information/systemDictionary/option/refresh'
    },
    {
      label: '折扣',
      value: 'discount',
      en: 'Discount',
      lang: 'channelOrganization.tabs.salePolicy.discount',
      type: 'number',
      align: 'left'

    }
  ],
  anchorConfig: {
    list: [
      {
        label: '渠道属性',
        value: 'ChannelProperties',
        en: 'Channel Properties',
        lang: 'channelOrganization.tabs.anchorConfig.fields.ChannelProperties',
        ref: 'ChannelProperties'
      },
      {
        label: '财务信息',
        value: 'financialInformation',
        en: 'Financial Information',
        lang: 'channelOrganization.tabs.anchorConfig.fields.financialInformation',
        ref: 'financialInformation'
      },
      {
        label: '销售政策',
        value: 'salePolicy',
        en: 'sale Policy',
        lang: 'channelOrganization.tabs.anchorConfig.fields.salePolicy',
        ref: 'salePolicy'
      },
      {
        label: '控制选项',
        value: 'settingOptions',
        en: 'setting Options',
        lang: 'channelOrganization.tabs.anchorConfig.fields.settingOptions',
        ref: 'settingOptions'
      }
    ]
  }
}
export const initFormData = () => {
  // 数据字典
  const detailData = {
    // form部分
    code: '', // 渠道编号
    fullName: '', // 渠道名称
    name: '', // 渠道简称
    buildDate: Tools.getCurrentData(false), // 制单日期

    // 渠道属性部分
    area: [], // 区域
    nation: '', // 国家
    region: '', // 大区
    province: '', // 省份
    city: '', // 城市
    county: '', // 区/县

    address: '', // 地址

    organization: [], // 组织架构
    organization1: '', // 组织架构1
    organization2: '', // 组织架构2
    organization3: '', // 组织架构3
    organization4: '', // 组织架构4
    organization5: '', // 组织架构5

    brandId: [], // 品牌
    parentChannelId: '', // 上级渠道
    branchCompanyId: '', // 分公司
    gradeId: '', // 渠道等级
    businessFormatId: '', // 渠道业态
    balanceTypeId: '', // 结算方式
    tagPriceTypeId: '', // 吊牌价类型
    salesAreaId: '', // 销售区域

    // 财务信息部分
    receivableChannelId: '', // 应收户口编号
    payableChannelId: '', // 应付户口编号
    legalPersonId: '', // 法人
    credit: '', // 信用额度
    openingBank: '', // 开户行
    bankCard: '', // 银行卡号
    customFieldMap: {},
    // 销售政策
    channelSaleDiscountList: []
  }
  return detailData
}

// 这里定义用途 用作 国际化 的数据
export const channelOrganization = {
  list: listConfig,
  detail: detailConfig,
  tabs: tabsConfig,
  highSearchDialog: highSearchDialog
}
