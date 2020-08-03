import { FormListConfig, Dictionary, TableHeaderConfig } from '@/typings'
// 规范 vip-dilog 组件规范
export interface highSearchDialogConfig {
  formList: FormListConfig[]
  formData?: Dictionary<any>
  tableColumn: TableHeaderConfig[]
  title: string
  api?: string
  selectApi?: string
  isSingleSelect?: boolean
  dialogWidth?: string
  searchType?: string
  // 单选弹窗选择会绑定到value 方法用于【格式化参数】 如果有这个方法则绑定
  singleSelectFunction?: Function
  needModuleId?: boolean
}
