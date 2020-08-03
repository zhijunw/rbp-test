import {

  TableHeaderConfig
} from '@/typings'

const menuTableHeader:TableHeaderConfig[] = [
  {
    label: '菜单名称',
    value: 'name',
    en: 'Name',
    align: 'left',
    lang: 'menuConfig.menuTableHeader.name'
  },
  {
    label: '菜单图标',
    value: 'icon',
    en: 'icon',
    align: 'left',
    lang: 'menuConfig.menuTableHeader.icon'
  }

]
const moduleTableHeader:TableHeaderConfig[] = [
  {
    label: '模块编号',
    value: 'id',
    en: 'Id',
    lang: 'menuConfig.moduleTableHeader.id'
  },
  {
    label: '模块名称',
    value: 'name',
    en: 'Default Value',
    lang: 'menuConfig.moduleTableHeader.name'
  }
]
export const iconList: string[] = [
  'nav_home',
  'nav_content',
  'nav_delivery',
  'nav_order',
  'nav_organization',
  'nav_member',
  'nav_sale',
  'nav_account',
  'nav_data',
  'nav_authority',
  'nav_manage',
  'nav_review'
]
export const menuConfig = { menuTableHeader, moduleTableHeader }

// 这里定义用途 用作 国际化 的数据

