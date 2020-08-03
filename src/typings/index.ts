
import { highSearchDialogConfig } from '@/layout-components/vip-dialog/index'
type InputType =
  | 'input' // 输入框
  | 'text'// 输入框文本
  | 'select'// 多选框
  | 'number'// 输入框数字
  | 'upload' // 上传
  | 'datePick' // 日期区间
  | 'textarea'// 多行文本
  | 'filter' // 模糊搜索
  | 'cascader' // 级联
  | 'checkbox'// checkbox
  | 'timePick'// 时间选择 小时
  | 'radio' // 单选框
  | 'tree' //  树结构
  | 'highSearch' // 高级搜索
  | 'image' // 图片
  | 'other' // 其他类型
export type BillStatus = 'add' | 'edit' | 'detail' | 'cancel' | ''

type Direction = 'ltr' | 'rtl' | 'ttb' | 'btt'

export type TabIndex = 'list' | 'detail'

type BtnType = 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'text' | ''

type DatePickType = 'year' | 'month' | 'date' | 'dates' | 'week' | 'datetime' | 'datetimerange' | 'daterange' | 'monthrange'

type Fixed = 'right' | 'left'

type align = 'left' | 'center' | 'right'
export interface Dictionary<T = any> {
  [key: string]: T
}

interface CommonProp {
  [propName: string]: any
}

export interface Response<T = any> {
  code: number
  msg: string
  data: T
}

export interface CommonConfig {
  label: string
  value: string | number
  lang?: string
  en?: string
  refreshKey?:string // 刷新传入的参数key
  refreshAPI?:string // 刷新的接口暴露
}

// 规范 anchor 基础选项配置
export interface AnchorConfig extends CommonConfig{
  // label:string
  // value:string
  // en:string
  // lang:string
  ref:string
}

// 规范 input 基础选项配置
export interface InputConfig {
  inputSize?: string
  showPassword?: boolean
  inputType?: string
  long?: boolean
  maxlength?:number
  minlength?:number
  placeholder?:string
  clearable?:boolean
  disabled?:boolean
  autofocus?: boolean
  prefixIcon?:string
  suffixIcon?:String
  selectDefault?:any
  selectOptions?:any[]
}
// 规范 模糊搜索 组件配置
export interface FuzzyConfig {
  // loading?: boolean
  apiUrl?: string
  value?: string | number
  multiple?: boolean
  // options?: Options[]
}
// 规范 datePicker 组件规范
export interface DatePickerConfig {
  type?: DatePickType
  placeholder?: string
  clearable?: boolean
  readonly?: boolean
  disabled?: boolean
  format?:string
  valueFormat?: string
  unlinkPanels?: boolean
}

// 规范 datePicker 组件规范
export interface TimePickerConfig {
  placeholder?: string
  arrowControl?: boolean
  readonly?: boolean
  disabled?: boolean
  clearable?: boolean
  isRange?: boolean
  rangeSeparator?: string
  startPlaceholder?: string
  endPlaceholder?: string
}
// 规范下拉框配置
export interface Options {
  disabled?: boolean
  children?: any[]
  label: string
  value: string | number | boolean
  lang?: string
  en?: string
  [propName: string]: any
}
// 规范 cascader 级联组件配置
export interface CascaderOptionsConfig {
  disabled?: boolean
  children: any[]
}
//  规范 checkbox 选择器
export interface CheckboxConfig {
  showCheckAll?: boolean
  showCheckReverse?: boolean
  isLine?: boolean
}
//  规范高级搜索组件
export interface HighSearchConfig {
  dialogSearchConfig: highSearchDialogConfig
  apiUrl?: string
  customerQuery?: boolean
}
// 通用 button 组件规范
export interface CommonBtnConfig {
  name: string
  value: string
  lang: string
  event?: string
  id?: string
  icon?: string
  class?: string
  type?: BtnType
  plain?: boolean
  dropdown?: any[]
}

// 规范 element 基础选项配置
export interface ElBaseConfig {
  clearable?: boolean
  collapseTags?: boolean
  filterable?: boolean
  multiple?: boolean
  placeholder?: string
  allowCreate?: boolean
  popperAppendToBody?: boolean
  popperClass?: string
  size?: string
}

// 规范列表配置
export interface ListInterface extends CommonProp {
  label: string
  value: string
  id?: string | number
  type?: InputType
  width?: string
  class?: string
  options?: Options[]
}
interface planConfig extends Options {
  default?: boolean
}
interface tableFieldsConfig {
  fields: TableHeaderConfig[]
  plan: planConfig[]
  choose: Dictionary<any[]>
}
// 规范分页配置
export interface PageObj {
  pageSize?: number // 条数
  pageNo?: number // 当前页数
  pageCount?: number // 总共页数
  total: number // 总数
}

// 规范弹窗配置
export interface DialogObj extends CommonProp {
  title: any
  isShowDialog: boolean
  width?: string
  modalAppendToBody?: boolean
  appendToBody?: boolean
  modal?: boolean
  setShow?: boolean,
  parameter?:object
}

// 规范列表表头配置
export interface TableHeaderConfig extends CommonConfig {
  disabled?: boolean
  isEdit?: boolean
  searchable?: boolean
  width?: string
  sortable?: boolean
  columnKey?: string
  isImage?: boolean
  isLink?: boolean
  isExpand?:boolean
  type?: InputType
  align?: align
  field?: any
  options?: any[]
  filters?: any[]
  require?: boolean
  tooltip?: boolean
  isShow?: boolean
  fixed?: boolean | string
  isShowTotal?:boolean
  matchSelectKey?: string // 匹配 后端返回全部下拉框选项接口 对应的 key
}

// 规范表格配置
export interface TabelConfig {
  isMultiSelect?: boolean
  isShowExpand?:boolean
  isShowOpera?: boolean
  isShowPagination?: boolean
  fieldsArr?: string[]
  rowId?: string
  height?: string
  maxHeight?: string
  isRight?: Fixed
  width?: string
  stripe?: boolean,
  isIndex?: boolean
  operatWidth?: number
  showHeader?: boolean
  highlightCurrentRow?: boolean
  id?: string
  border?: boolean
  defaultExpandAll?: boolean
  showSummary?: boolean
}

export interface FormItemConfig extends ElBaseConfig, InputConfig, DatePickerConfig, TimePickerConfig{}
// 规范 upload 基础选项配置
export interface UploadConfig{
  multiple?:boolean
  name?:string
  drag?:boolean
  limit?:number
  showFileList?:boolean
  data?: Dictionary
  autoUpload?:boolean,
  extra?:boolean
}

// 规范 tree 数据结构
export interface TreeObject {
  id?: number | string
  children?: TreeObject[]
  disabled?:boolean
  label?: string
  name?: string
}
// 规范 tree 基础选项配置
export interface TreeConfig {
  nodeKey?: string
  defaultExpandAll?: boolean
  showCheckbox?: boolean
  accordion?: boolean
  indent?: number
  isFilter?: boolean
  iconClass?: string
  currentNodeKey?:string | number
  defaultExpandedKeys?: any[]
  defaultCheckedKeys?: any[]
}

// 规范 组件 formlist 配置
export interface FormListConfig extends CommonConfig {
  type?: InputType
  fuzzyConfig?: FuzzyConfig
  highSearchConfig?: HighSearchConfig
  config?: FormItemConfig
  setLength?: number
  offset?: number
  linkValue?: string // 这个字段是用于 高级搜索 value 的字段
  push?: number
  maxlength?: number
  isShowPassword?: boolean
  readonly?: boolean
  placeholder?: string
  loading?: boolean
  disabled?: boolean
  editDisabled?: boolean
  alwaysDisabled?: boolean
  options?: Options[]
  cascaderConfig?: string[] // 给级联赋值的
  rules?: any
  fieldsType?: string // 是否是自定义字段类型 如果是自定义字段 则放入到 customer 集合中
  matchSelectKey?: string // 匹配 后端返回全部下拉框选项接口 对应的 key
  refreshKey?: string // base-select 下拉框刷新的标识字段
  refreshAPI?: string // base-select 下拉框刷新的api
}

// 规范组件 drawer 配置
export interface DrawerConfig {
  isShowDrawer: boolean
  title?: string
  direction?: Direction
  isshowClose?: boolean
  wrapperClosable?: boolean
  modalAppendToBody?: boolean
  appendToBody?: boolean
  modal?: boolean
}

// 规范组件 commonIndex 的列表配置
export interface commonIndexConfig {
  tabs: CommonConfig[]
}

export interface ListBtnApiConfig {
  apiUrl?: string // 这里先改为可选  开发完后都改为必选
  params?: string | string[] | object // 单个 | json单参数批量 ｜ json多参数批量
  name?: string
}

export interface DetailBtnApiConfig {
  apiUrl?: string
  params?: string | string[] | object // 单个 | json单参数批量 ｜ json多参数批量
  name?: string
}

// 规范组件 listOperation 的配置
export interface ListOperationBtnsConfig extends CommonBtnConfig {
  interface?: ListBtnApiConfig
  slot?: boolean
}

// 规范 list 组件里面的配置项
export interface ListComponentsConfig {
  btns: ListOperationBtnsConfig[]
  InputConfig: InputConfig
  tableHeader: TableHeaderConfig[]
  tableFieldsConfig?: tableFieldsConfig
  // tableHeaderFieldsConfig?: TableHeaderConfig[]
  formList: FormListConfig[]
  cascaderConfig? : any,
  layoutList?:LayoutConfig[]
}

// 规范 detail 组件里面的配置项
export interface DetailComponentsConfig {
  btns: DetailOperationConfig[]
  formList: FormListConfig[]
  formData?: Dictionary<any>
  anchorConfig?: AnchorConfig[],
  apiUrl?: any,
  cascaderConfig?: any
}

// 规定 detail 里面的 tabs 配置
export interface DetailTabsConfig extends CommonProp {
  tabsList?: CommonConfig[]
}

// 规范 详情界面的 operation 组件规范
export interface DetailOperationConfig extends CommonBtnConfig {
  interface?:DetailBtnApiConfig
  hiddenIcon?: boolean
  svgIcon?: string
  operationId?: string
  isValidatePermisssion?: boolean
}

// 规范 datePicker 组件规范
export interface DatePickerConfig {
  placeholder?: string
  clearable?: boolean
  readonly?: boolean
  format?:string
  valueFormat?: string
}

// 定义列表布局的数据规范
export interface LayoutConfig {
  id: number
  name: string
  default?: boolean
  children: LayoutConfig[]
}
export interface RecordLogConfig {
  formList: FormListConfig[]
  tableHeader: TableHeaderConfig[]
  api: string
  moduleId?: string | number
}
// 通知组件每条通知的格式
export interface InformConfig {
  type?: 'info' | 'success' | 'error' | 'warning',
  isConfirm? : boolean,
  confirmButtonText?: string,
  cancelButtonText?: string,
  content?: string,
  detail?: string
}
// 列表返回的结构定义
export interface ListResponse {
  msg: string
  code: string
  pageCount: number
  pageSize: number
  total: number
  data: any[]
}
// keyof 取对象的 key  typeof 代表取某个值的 type
export function get<T extends object, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]
}

// type 和 interface 的区别
//  1. 都可以互相拓展 extends 不过 type 的写法是 & 2. interface 有可读和可写属性

// 以下是 typescript 自带的属性  使用的时候可无需引用
// 约定只取对象的某个 key 或者 选取部分属性生成新的 type
export type Pick<T extends Object, K extends keyof T> = {
  [P in K]: T[K]
}
// 规定对象的属性
export type Partial<T> = {
  [P in keyof T]?: T[P]
}
// 必要属性
export type Required<T> = {
  [P in keyof T]-?: T[P]
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
// const a:Omit < ListComponentsConfig, 'tableFieldsConfig'> = {
//   btns: ListOperationBtnsConfig[]
//   InputConfig: InputConfig
//   tableHeader: TableHeaderConfig[]
//   formList: FormListConfig[]
// }
// 只读属性
export type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
// 创建一个具有同类型属性值的对象
export type Record<K extends keyof any, T> = {
  [P in K]: T
}
// 剔除 一个对象中的 key
export type Exclude<T, U> = T extends U ? never : T
