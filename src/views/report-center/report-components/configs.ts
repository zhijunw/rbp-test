import {
  ListOperationBtnsConfig,
  FormListConfig,
  LayoutConfig
} from '@/typings'

interface ListConfig {
    btns: ListOperationBtnsConfig[]
    layoutList: LayoutConfig[]
}
export const listConfig: ListConfig = {
  btns: [
    {
      name: '导出',
      value: 'export',
      lang: 'layout.btns.singleExport',
      event: 'export',
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
  // layoutList: [],
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

