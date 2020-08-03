import {
  commonIndexConfig,
  ListComponentsConfig,
  AnchorConfig,
  TableHeaderConfig,
  DetailOperationConfig,
  FormListConfig
} from '@/typings'

import {
  goodsSearchConfig } from '@/layout-components/vip-dialog/config'
import apiUrl from '@/api/content-center/goods-fiels'
import commonApiUrl from '@/api/common-api/index'

interface GooodsFileDetail {
    btns: DetailOperationConfig[]
    formList: FormListConfig[]
    productProp: FormListConfig[]
    anchorConfig: AnchorConfig[]
    goodsColor: TableHeaderConfig[]
    barcodeInfo: TableHeaderConfig[]
}

export const globalConfigs = {
  moduleName: 'goodsFielsModule',
  moduleId: 'goodsFiels',
  realModuleId: 120003,
  customVux: {
    state: [],
    mutations: [],
    actions: []
  }
}
const tableHeader: TableHeaderConfig[] = [
  {
    label: '货号',
    value: 'code',
    en: 'Item Number',
    lang: 'goodsFiels.list.tableHeader.code'
  },
  {
    label: '品名',
    value: 'name',
    en: 'Product Name',
    lang: 'goodsFiels.list.tableHeader.name'
  },
  {
    label: '建档日期',
    value: 'buildDate',
    en: 'Created Date',
    lang: 'goodsFiels.list.tableHeader.buildDate'
  },
  {
    label: '状态',
    value: 'status',
    en: 'status',
    lang: 'goodsFiels.list.tableHeader.status'
  },
  {
    label: '制单用户',
    value: 'createdByName',
    en: 'Single user',
    lang: 'goodsFiels.list.tableHeader.createdByName'
  },
  {
    label: '制单日期',
    value: 'createdTime',
    en: 'Date of making order',
    lang: 'goodsFiels.list.tableHeader.createdTime'
  },
  {
    label: '修改人',
    value: 'updatedByName',
    en: 'Modify user',
    lang: 'goodsFiels.list.tableHeader.updatedByName'
  },
  {
    label: '修改日期',
    value: 'updatedTime',
    en: 'Modify Date',
    lang: 'goodsFiels.list.tableHeader.updatedTime'
  },
  {
    label: '审核用户',
    value: 'checkByName',
    en: 'Audit User',
    lang: 'goodsFiels.list.tableHeader.checkByName'
  },
  {
    label: '审核日期',
    value: 'checkTime',
    en: 'Audit Date',
    lang: 'goodsFiels.list.tableHeader.checkTime'
  },
  {
    label: '作废用户',
    value: 'cancelByName',
    en: 'Invalid user',
    lang: 'goodsFiels.list.tableHeader.cancelByName'
  },
  {
    label: '作废日期',
    value: 'cancelTime',
    en: 'Invalid Date',
    lang: 'goodsFiels.list.tableHeader.cancelTime'
  },
  {
    label: '备注',
    value: 'notes',
    en: 'Remark',
    lang: 'goodsFiels.list.tableHeader.notes'
  },
  {
    label: '状态',
    value: 'statusName',
    en: 'status',
    lang: 'goodsFiels.list.tableHeader.statusName'
  },
  {
    label: '反审核用户',
    value: 'uncheckByName',
    en: 'unAudit User',
    lang: 'goodsFiels.list.tableHeader.uncheckByName'
  },
  {
    label: '反审核日期',
    value: 'uncheckTime',
    en: 'unAudit Date',
    lang: 'goodsFiels.list.tableHeader.uncheckTime'
  },
  {
    label: '助记码',
    value: 'mnemonicCode',
    en: 'mnemonic Code',
    lang: 'goodsFiels.list.tableHeader.mnemonicCode'
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
      name: '新建货品',
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
        apiUrl: apiUrl.batchAudit
      }
    },
    // {
    //     name: '删除',
    //     value: 'delete',
    //     lang: 'layout.btns.delete',
    //     event: 'batch-delete',
    //     id: 'btn_g_red',
    //     plain: true,
    //     interface: {
    //         apiUrl: apiUrl.batchAudit
    //     }
    // },
    {
      name: '导入',
      value: 'import',
      lang: 'layout.btns.batchImport',
      event: 'batch-import',
      plain: true
    },
    {
      name: '导入',
      value: 'export',
      lang: 'layout.btns.batchExport',
      event: 'batch-export',
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
    placeholder: 'form.placeholder.goodsFielsPlaceholder',
    long: true,
    prefixIcon: 'el-icon-search'
  },
  tableHeader: tableHeader,
  formList: [
    {
      label: '货号',
      en: 'Item Number',
      lang: 'goodsFiels.list.filter.goodsIdList',
      value: 'goodsIdList',
      type: 'highSearch',
      linkValue: 'goodsFilterParam',
      highSearchConfig: {
        dialogSearchConfig: goodsSearchConfig,
        apiUrl: apiUrl.fuzzy
      },
      setLength: 12
    },
    {
      label: '品名',
      en: 'Product Name',
      lang: 'goodsFiels.list.filter.name',
      value: 'name',
      type: 'input',
      setLength: 12
    },
    {
      label: '建档日期',
      en: 'Date of making order',
      lang: 'goodsFiels.list.filter.buildDate',
      value: 'buildDate',
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
      lang: 'goodsFiels.list.filter.status',
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
      label: '制单用户',
      en: 'Single person',
      lang: 'goodsFiels.list.filter.createdByList',
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
      lang: 'goodsFiels.list.filter.createdTime',
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
      lang: 'goodsFiels.list.filter.updateByList',
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
      lang: 'goodsFiels.list.filter.updatedTime',
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
      lang: 'goodsFiels.list.filter.checkByList',
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
      lang: 'goodsFiels.list.filter.checkTime',
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
      lang: 'goodsFiels.list.filter.cancelByList',
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
      lang: 'goodsFiels.list.filter.cancelTime',
      value: 'cancelTime',
      config: {
        type: 'daterange'
      },
      type: 'datePick',
      setLength: 12
    }

  ],
  tableFieldsConfig: {
    fields: tableHeader,
    plan: [
      {
        value: 'id1',
        label: '默认方案',
        default: true
      },
      {
        value: 'id2',
        label: '方案2'
      }
    ],
    choose: {
      id1: [],
      id2: []
    }
  }
}

export const detailConfig: GooodsFileDetail = {
  btns: [
    {
      name: '新建单据',
      value: 'add',
      hiddenIcon: true,
      icon: 'el-icon-plus',
      operationId: 'create',
      lang: 'operationGroup.btns.add',
      plain: true,
      id: 'btn_g_d_blue'
    },
    {
      name: '删除',
      value: 'delete',
      svgIcon: 'rbp-operate_delete',
      operationId: 'delete',
      type: 'text',
      lang: 'operationGroup.btns.delete',
      interface: {
        apiUrl: apiUrl.deleteGoods,
        params: []
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
        apiUrl: apiUrl.audit,
        params: 'string'
      }
    },
    {
      name: '反审核',
      value: 'unaudit',
      operationId: 'uncheck',
      svgIcon: 'rbp-operate_recheck',
      lang: 'operationGroup.btns.unaudit',
      type: 'text',
      interface: {
        apiUrl: apiUrl.unCheckBills,
        params: 'string'
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
      operationId: 'cancel',
      svgIcon: 'rbp-operate_cancellation',
      lang: 'operationGroup.btns.invalid',
      type: 'text',
      interface: {
        apiUrl: apiUrl.invalidBills,
        params: 'string'
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
      name: '导出',
      value: 'export',
      operationId: 'export',
      svgIcon: 'rbp-operate_export',
      lang: 'operationGroup.btns.export',
      type: 'text'
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
      label: '货号',
      value: 'code',
      en: 'Item number',
      lang: 'goodsFiels.detail.formList.code',
      editDisabled: true,
      type: 'input',
      rules: [{
        required: true,
        message: '请输入正确的货号(字母加数字)',
        trigger: 'blur',
        pattern: /^[0-9a-zA-Z]+$/
      }]
    },
    {
      label: '品名',
      value: 'name',
      en: 'Product Name',
      lang: 'goodsFiels.detail.formList.name',
      type: 'input'
    },
    {
      label: '货品类型',
      value: 'type',
      en: 'Type of goods',
      lang: 'goodsFiels.detail.formList.type',
      type: 'select',
      editDisabled: true,
      rules: [{ required: true, message: '请选择货品类型', trigger: 'change' }],
      options: [
        {
          label: '普通物料',
          value: 1
        },
        {
          label: '单一物料',
          value: 2
        }
      ]
    },
    {
      label: '建档日期',
      value: 'buildDate',
      en: 'created date',
      lang: 'goodsFiels.detail.formList.buildDate',
      type: 'datePick'
    },
    {
      label: '助记码',
      value: 'mnemonicCode',
      en: 'Mnemonic code',
      lang: 'goodsFiels.detail.formList.mnemonicCode',
      type: 'input'
    },
    {
      label: '备注',
      value: 'notes',
      en: 'Remark',
      lang: 'goodsFiels.detail.formList.notes',
      type: 'input',
      setLength: 12
    }
  ],
  productProp: [
    {
      label: '品牌',
      value: 'brandId',
      en: 'brand',
      lang: 'goodsFiels.detail.productProp.brandId',
      type: 'select',
      options: [],
      rules: [{
        required: true,
        message: '请选择品牌',
        trigger: 'change'
      }],
      refreshKey: 'brand',
      refreshAPI: '/information/systemDictionary/option/refresh'
    },
    {
      label: '类别',
      value: 'categoryId',
      en: 'category',
      lang: 'goodsFiels.detail.productProp.categoryId',
      type: 'select',
      options: [],
      refreshKey: 'category',
      refreshAPI: '/information/systemDictionary/option/refresh'
    },
    {
      label: '系列',
      value: 'seriesId',
      en: 'series',
      lang: 'goodsFiels.detail.productProp.seriesId',
      type: 'select',
      options: [],
      refreshKey: 'series',
      refreshAPI: '/information/systemDictionary/option/refresh'
    },
    {
      label: '款型',
      value: 'patternId',
      en: 'Type of Style',
      lang: 'goodsFiels.detail.productProp.patternId',
      type: 'select',
      options: [],
      refreshKey: 'pattern',
      refreshAPI: '/information/systemDictionary/option/refresh'
    },
    // {
    //     label: '风格',
    //     value: 'styleId',
    //     en: 'Style',
    //     lang: 'goodsFiels.detail.productProp.styleId',
    //     type: 'select',
    //     options:[]
    // },
    {
      label: '销售分类',
      value: 'saleClassId',
      en: 'Sales classification',
      lang: 'goodsFiels.detail.productProp.saleClassId',
      type: 'select',
      options: [],
      refreshKey: 'saleClass',
      refreshAPI: '/information/systemDictionary/option/refresh'
    },
    {
      label: '年份',
      value: 'yearId',
      en: 'Years',
      lang: 'goodsFiels.detail.productProp.yearId',
      type: 'select',
      options: [],
      refreshKey: 'year',
      refreshAPI: '/information/systemDictionary/option/refresh'
    },
    {
      label: '季节',
      value: 'seasonId',
      en: 'Season',
      lang: 'goodsFiels.detail.productProp.seasonId',
      type: 'select',
      options: [],
      refreshKey: 'season',
      refreshAPI: '/information/systemDictionary/option/refresh'
    },
    {
      label: '波段',
      value: 'bandId',
      en: 'Wave Band',
      lang: 'goodsFiels.detail.productProp.bandId',
      type: 'select',
      options: [],
      refreshKey: 'band',
      refreshAPI: '/information/systemDictionary/option/refresh'
    },
    // {
    //     label: '面料',
    //     value: 'materialId',
    //     en: 'Fabric',
    //     lang: 'goodsFiels.detail.productProp.materialId',
    //     type: 'select',
    //     options:[]
    // },
    {
      label: '性别',
      value: 'sexId',
      en: 'Sex',
      lang: 'goodsFiels.detail.productProp.sexId',
      type: 'select',
      options: [],
      refreshKey: 'sex',
      refreshAPI: '/information/systemDictionary/option/refresh'
    },
    {
      label: '年龄段',
      value: 'ageRangeId',
      en: 'Age group',
      lang: 'goodsFiels.detail.productProp.ageRangeId',
      type: 'select',
      options: [],
      refreshKey: 'ageRange',
      refreshAPI: '/information/systemDictionary/option/refresh'
    },
    {
      label: '商品法人',
      value: 'legalPersonId',
      en: 'Commodity legal person',
      lang: 'goodsFiels.detail.productProp.legalPersonId',
      type: 'select',
      options: []
    },
    {
      label: '换货类别',
      value: 'exchangeCategoryId',
      en: 'Replacement category',
      lang: 'goodsFiels.detail.productProp.exchangeCategoryId',
      type: 'select',
      options: [],
      refreshKey: 'exchangeCategory',
      refreshAPI: '/information/systemDictionary/option/refresh'
    },
    {
      label: '二维码链接',
      value: 'qrcodeLink',
      en: 'Qrcode Link',
      lang: 'goodsFiels.detail.productProp.qrcodeLink',
      type: 'input',
      setLength: 12
    },
    {
      label: '是否有唯一码',
      value: 'uniqueCodeFlag',
      en: 'Unique CodeFlag',
      lang: 'goodsFiels.detail.productProp.uniqueCodeFlag',
      type: 'radio',
      options: [
        {
          label: '是',
          value: true
        },
        {
          label: '否',
          value: false
        }
      ]
    }
  ],
  anchorConfig: [
    {
      label: '货品属性',
      value: 'productProp',
      en: 'Product Prop',
      lang: 'goodsFiels.detail.anchorConfig.productProp',
      ref: 'productProp'
    },
    {
      label: '颜色分类',
      value: 'goodsColor',
      en: 'Goods Color',
      lang: 'goodsFiels.detail.anchorConfig.goodsColor',
      ref: 'goodsColor'
    },
    {
      label: '内长分类',
      value: 'goodsInsideLength',
      en: 'goods Inside Length',
      lang: 'goodsFiels.detail.anchorConfig.goodsInsideLength',
      ref: 'goodsInsideLength',
      refreshKey: 'long',
      refreshAPI: '/information/systemDictionary/option/refresh'
    },
    {
      label: '尺码分类',
      value: 'goodsSize',
      en: 'Goods Size',
      lang: 'goodsFiels.detail.anchorConfig.goodsSize',
      ref: 'goodsSize'
    },
    {
      label: '价格类型',
      value: 'priceInfo',
      en: 'Price Info',
      lang: 'goodsFiels.detail.anchorConfig.priceInfo',
      ref: 'priceInfo'
    }
    // {
    //     label: '条码信息',
    //     value: 'barcodeInfo',
    //     en: 'barcode Info',
    //     lang: 'goodsFiels.detail.anchorConfig.barcodeInfo',
    //     ref: 'barcodeInfo'
    // },
  ],
  goodsColor: [
    {
      label: '颜色',
      value: 'colorId',
      en: 'Color',
      type: 'select',
      lang: 'goodsFiels.detail.goodsColor.colorId'
    },
    {
      label: '颜色说明',
      value: 'colorName',
      en: 'Color Desc',
      type: 'input',
      lang: 'goodsFiels.detail.goodsColor.colorName'
    }
  ],
  barcodeInfo: [
    {
      label: '颜色分类',
      value: 'color',
      en: 'Color Type',
      width: '80px',
      lang: 'goodsFiels.detail.barcodeInfo.color'
    },
    {
      label: '颜色说明',
      value: 'colordesc',
      en: 'Color Desc',
      width: '80px',
      lang: 'goodsFiels.detail.barcodeInfo.colordesc'
    },
    {
      label: '内长',
      value: 'insideLength',
      en: 'inside Length',
      width: '64px',
      lang: 'goodsFiels.detail.barcodeInfo.insideLength'
    },
    {
      label: '尺码',
      value: 'sizeId',
      en: 'size',
      width: '64px',
      lang: 'goodsFiels.detail.barcodeInfo.sizeId'
    }
  ]
}
export const initFormData = () => {
  const detailData = {
    Goods: {
      code: '',
      name: '',
      type: '',
      buildDate: '',
      mnemonicCode: '',
      notes: '',
      brandId: '',
      categoryId: '',
      seriesId: '',
      patternId: '',
      styleId: '',
      saleClassId: '',
      yearId: '',
      seasonId: '',
      bandId: '',
      materialId: '',
      sexId: '',
      ageRangeId: '',
      legalPersonId: '',
      exchangeCategoryId: '',
      sizeClassId: '',
      modelClassId: '',
      qrcodeLink: '',
      uniqueCodeFlag: true,
      goodsLongList: []
    },
    customFieldMap: {},
    colorList: [],
    sizeDisableList: [],
    tagPriceList: []
  }
  return detailData
}
// 这里定义用途 用作 国际化 的数据
export const goodsFiels = {
  list: listConfig,
  detail: detailConfig
}
