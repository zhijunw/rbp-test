import {
  commonIndexConfig,
  ListComponentsConfig,
  DetailComponentsConfig,
  TableHeaderConfig,
  FormListConfig,
  TreeObject,
  DetailTabsConfig } from '@/typings'

export interface FilterFormlistConfig extends FormListConfig {
 match: string[]
}
interface ListConfig {
  fieldsListTableHeader: TableHeaderConfig[]
  fieldsPropTableHeader: TableHeaderConfig[]
  langTableHeader: TableHeaderConfig[]
  fieldsPropFormlist: FormListConfig[]
  filterFormList: FilterFormlistConfig[]
}
interface ModuleSettingConfig {
  tableHeader: TableHeaderConfig[]
  menuList: TreeObject[]
  productConfigHeader: TableHeaderConfig[]
}
export const layoutConfigs: commonIndexConfig = {
  tabs: [
    {
      label: '自定义字段',
      value: 'list',
      lang: 'fieldConfiguration.tabs.list'
    },
    {
      label: '模块字段配置',
      value: 'detail',
      lang: 'fieldConfiguration.tabs.detail'
    },
    {
      label: '模块货品字段配置',
      value: 'productConfig',
      lang: 'fieldConfiguration.tabs.productConfig'
    }
  ]
}
export const initData = () => {
  const detailData = {
    column: {
      name: '',
      code: '',
      type: ''
    },
    valueList: [],
    languageList: [
      {
        languageName: '中文',
        languageCode: 'zh_CHS',
        name: ''

      },
      {
        languageName: '繁体中文',
        languageCode: 'zh_CHT',
        name: ''
      },
      {
        languageName: '英文',
        languageCode: 'en',
        name: ''
      }
    ]
  }
  return detailData
}

const tableHeader:TableHeaderConfig[] = [
  {
    label: '字段名称',
    value: 'name',
    en: 'Name',
    align: 'left',
    lang: 'fieldConfiguration.list.fieldsListTableHeader.name'
  },
  {
    label: '字段类型',
    value: 'type',
    en: 'Type',
    align: 'left',
    lang: 'fieldConfiguration.list.fieldsListTableHeader.type'
  },
  {
    label: '引用模块',
    value: 'moduleName',
    en: 'Used Modules',
    align: 'left',
    lang: 'fieldConfiguration.list.fieldsListTableHeader.moduleName'
  }
]
const tableHeader2:TableHeaderConfig[] = [
  {
    label: '选项名称',
    value: 'value',
    en: 'Select Name',
    lang: 'fieldConfiguration.list.fieldsPropTableHeader.value'
  },
  {
    label: '默认值',
    value: 'defaultFlag',
    en: 'Default Value',
    lang: 'fieldConfiguration.list.fieldsPropTableHeader.defaultFlag',
    width: '62'
  },
  {
    label: '启用',
    value: 'userFlag',
    en: 'Enable',
    lang: 'fieldConfiguration.list.fieldsPropTableHeader.userFlag',
    width: '56'

  }
]
const langTableHeader: TableHeaderConfig[] = [
  {
    label: '语言',
    value: 'languageName',
    en: 'Lang',
    lang: 'fieldConfiguration.list.langTableHeader.languageName'
  },
  {
    label: '描述',
    value: 'name',
    en: 'describe',
    lang: 'fieldConfiguration.list.langTableHeader.name'
  }
]

export const listConfig: ListConfig = {
  fieldsListTableHeader: tableHeader,
  fieldsPropTableHeader: tableHeader2,
  langTableHeader,
  filterFormList: [{
    label: '输入框大小',
    value: 'width',
    type: 'select',
    en: 'Input box size',
    lang: 'fieldConfiguration.list.filterFormList.width',
    setLength: 12,
    match: ['text', 'number'],
    options: [
      {
        label: '小',
        value: 1
      },
      {
        label: '中',
        value: 2
      },
      {
        label: '大',
        value: 3
      }
    ]
  },
  {
    label: '字数限制',
    value: 'length',
    en: 'Word limit',
    lang: 'fieldConfiguration.list.filterFormList.length',
    setLength: 12,
    type: 'number',
    match: ['text']

  },
  {
    label: '默认值',
    value: 'defaultValue',
    en: 'Default',
    lang: 'fieldConfiguration.list.filterFormList.defaultValue',
    setLength: 12,
    type: 'input',
    match: ['text', 'number']

  },
  {
    label: '保留整数位',
    value: 'integerDigits',
    en: 'Integer',
    lang: 'fieldConfiguration.list.filterFormList.integerDigits',
    setLength: 12,
    type: 'number',
    match: ['number']

  },
  {
    label: '保留小数位',
    value: 'decimalDigits',
    en: 'Decimal',
    lang: 'fieldConfiguration.list.filterFormList.decimalDigits',
    setLength: 12,
    type: 'number',
    match: ['number']

  },
  {
    label: '默认日期',
    value: 'defaultDate',
    en: 'Default Date',
    lang: 'fieldConfiguration.list.filterFormList.defaultDate',
    setLength: 12,
    type: 'datePick',
    match: ['datePick']

  }],
  fieldsPropFormlist: [
    {
      label: '字段名称',
      value: 'name',
      type: 'input',
      en: 'Name',
      lang: 'fieldConfiguration.list.formList.name',
      setLength: 12,
      rules: [{ required: true, message: '请输入字段名称', trigger: 'blur' }]
    },
    {
      label: 'key',
      value: 'code',
      type: 'input',
      en: 'Key',
      lang: 'fieldConfiguration.list.formList.code',
      editDisabled: true,
      setLength: 12,
      rules: [{ required: true, message: 'key 只能输入英文字母', trigger: 'blur', pattern: /^[a-zA-Z]\w{1,15}$/ }]
    },
    {
      label: '字段类别',
      value: 'type',
      en: 'Field class',
      lang: 'fieldConfiguration.list.formList.type',
      type: 'select',
      editDisabled: true,
      setLength: 12,
      options: [
        {
          label: '文本输入',
          value: 'text'
        },
        {
          label: '数值输入',
          value: 'number'
        },
        {
          label: '单选',
          value: 'select'
        },

        {
          label: '日期时间',
          value: 'datePick'
        }
      ],
      rules: [{ required: true, message: '请选择字段类别', trigger: 'blur' }]
    }
  ]
}
const detailTableHeader: TableHeaderConfig[] = [
  {
    label: '序号',
    value: 'index',
    en: 'Index',
    align: 'left',
    lang: 'fieldConfiguration.moduleSettings.tableHeader.index',
    width: '60px'
  },
  {
    label: '字段名称',
    value: 'columnName',
    en: 'fieldname',
    align: 'left',
    lang: 'fieldConfiguration.moduleSettings.tableHeader.columnName'
  },
  {
    label: '字段类型',
    value: 'type',
    en: 'fieldtype',
    align: 'left',
    lang: 'fieldConfiguration.moduleSettings.tableHeader.type'
  },
  {
    label: '是否必填',
    value: 'requireFlag',
    en: 'Is Require',
    type: 'checkbox',
    lang: 'fieldConfiguration.moduleSettings.tableHeader.requireFlag'
  },
  {
    label: '是否启用',
    value: 'userFlag',
    en: 'Is Enable',
    type: 'checkbox',
    lang: 'fieldConfiguration.moduleSettings.tableHeader.userFlag'
  },
  {
    label: '查询条件',
    value: 'searchFlag',
    en: 'Is Search',
    type: 'checkbox',
    lang: 'fieldConfiguration.moduleSettings.tableHeader.searchFlag'
  },
  {
    label: '操作',
    value: 'operation',
    en: 'Operation',
    width: '100px',
    lang: 'fieldConfiguration.moduleSettings.tableHeader.operation'
  },
  {
    label: '排序',
    value: 'sort',
    en: 'sort',
    width: '100px',
    lang: 'fieldConfiguration.moduleSettings.tableHeader.sort'
  }
]
const productConfigHeader: TableHeaderConfig[] = [
  {
    label: '货品字段名称',
    value: 'columnNameList',
    en: 'producrName',
    align: 'left',
    lang: 'fieldConfiguration.moduleSettings.productConfigHeader.columnNameList'
  },
  {
    label: '单据模块',
    value: 'moduleList',
    en: 'billModule',
    align: 'left',
    lang: 'fieldConfiguration.moduleSettings.productConfigHeader.moduleList'
  }
]
export const moduleSettings: ModuleSettingConfig = {
  tableHeader: detailTableHeader,
  productConfigHeader: productConfigHeader,
  menuList: []
}

// 这里定义用途 用作 国际化 的数据
export const fieldConfiguration = { list: listConfig, detail: moduleSettings }
