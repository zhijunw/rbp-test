import {
  ListComponentsConfig,
  TableHeaderConfig,
  commonIndexConfig,
  FormListConfig,
  Dictionary,
  Omit
} from '@/typings'

import apiUrl from '@/api/content-center/barcode-fiels'
import { highSearchDialogConfig } from '@/layout-components/vip-dialog/index'
// interface ListConfig extends Omit<ListComponentsConfig, 'tableFieldsConfig'> {
//     sizeHeader: TableHeaderConfig[]
// }
import {
  goodsSearchConfig } from '@/layout-components/vip-dialog/config'

import commonApiUrl from '@/api/common-api/index'
interface ListConfig extends ListComponentsConfig {
    sizeHeader: TableHeaderConfig[]
}
interface BarcodeDialog {
    formList: FormListConfig[]
    formData: Dictionary
}

const tableHeader: TableHeaderConfig[] = [
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

const sizeHeader: TableHeaderConfig[] = [
  {
    label: '颜色组',
    value: 'colorName',
    en: 'Color Type',
    align: 'left',
    width: '80px',
    lang: 'barcode.list.sizeHeader.colorName'
  },
  {
    label: '颜色编号',
    value: 'colorCode',
    en: 'Color Type',
    align: 'left',
    width: '100px',
    lang: 'barcode.list.sizeHeader.colorCode'
  },
  {
    label: '颜色说明',
    value: 'colorNameExplain ',
    en: 'Color Desc',
    align: 'left',
    width: '120px',
    lang: 'barcode.list.sizeHeader.colorNameExplain '
  },
  {
    label: '内长',
    value: 'longName',
    en: 'inside Length',
    align: 'left',
    width: '64px',
    lang: 'barcode.list.sizeHeader.longName'
  },
  {
    label: '尺码',
    value: 'sizeName',
    en: 'size',
    align: 'left',
    width: '64px',

    lang: 'barcode.list.sizeHeader.sizeName'
  }
]
export const layoutConfigs: commonIndexConfig = {
  tabs: [
    {
      label: '货品条码',
      value: 'list',
      lang: 'barcode.tabs.name'
    }
  ]
}
export const barcodeDialog: BarcodeDialog = {
  formList: [
    {
      label: '货品',
      en: 'Item Number',
      lang: 'barcode.barcodeDialog.formlist.goodsIds',
      value: 'goodsIds',
      type: 'highSearch',
      linkValue: 'goodsFilterParam',
      highSearchConfig: {
        dialogSearchConfig: goodsSearchConfig,
        apiUrl: apiUrl.fuzzy
      },
      setLength: 24,
      rules: [{ required: true, message: '请选择货品', trigger: 'blur' }]
    },
    {
      label: '条码规则',
      en: 'Barcode rules',
      lang: 'barcode.barcodeDialog.formlist.barcodeRuleId',
      value: 'barcodeRuleId',
      type: 'select',
      options: [],
      setLength: 24,
      rules: [{ required: true, message: '请选择条码规则', trigger: 'blur' }]
    }
  ],
  formData: {
    goodsIds: '',
    barcodeRuleId: ''
  }
}

export const listConfig: ListConfig = {
  btns: [
    {
      name: '批量生成条码',
      value: 'createdBarcode',
      lang: 'barcode.list.createBarcode.name',
      event: 'createdBarcode',
      plain: true,
      id: 'btn_g_d_blue'
    },
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
  ],
  InputConfig: {
    placeholder: 'form.placeholder.keywordPlaceholder',
    long: true,
    prefixIcon: 'el-icon-search'
  },
  tableHeader: tableHeader,
  sizeHeader: sizeHeader,
  formList: [
    // {
    //   label: '货号',
    //   en: 'Item Number',
    //   lang: 'goodsFiels.list.filter.goodsIdList',
    //   value: 'goodsIdList',
    //   type: 'input',
    //   setLength: 12
    // },
    {
      label: '货品',
      en: 'goods',
      lang: 'goodsFiels.list.filter.goodsIdList',
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
      setLength: 12,
      value: 'createdByList',
      type: 'filter',
      fuzzyConfig: {
        apiUrl: commonApiUrl.userFuzzy,
        multiple: true
      }
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
      setLength: 12,
      value: 'updateByList',
      type: 'filter',
      fuzzyConfig: {
        apiUrl: commonApiUrl.userFuzzy,
        multiple: true

      }
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
      setLength: 12,
      value: 'checkByList',
      type: 'filter',
      fuzzyConfig: {
        apiUrl: commonApiUrl.userFuzzy,
        multiple: true

      }
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

  ]
}
// 这里定义用途 用作 国际化 的数据
export const barcode = {
  list: listConfig,
  barcodeDialog: barcodeDialog
}
