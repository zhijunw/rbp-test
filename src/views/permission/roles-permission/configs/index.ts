import {
  CommonConfig,
  Dictionary,
  TableHeaderConfig,
  ListComponentsConfig,
  DetailComponentsConfig,
  commonIndexConfig
} from '@/typings'

import apiUrl from '@/api/permission/roles'

import { highSearchDialogConfig } from '@/layout-components/vip-dialog/index'
interface TabsConfig {
  moduleTab: Dictionary
  userTab: {
    list: TableHeaderConfig[]
    // addUserDialog: highSearchDialogConfig
  }
}
import commonApiUrl from '@/api/common-api/index'

export const apiList = apiUrl
const tableHeader:TableHeaderConfig[] = [
  // {
  //   label: '角色ID',
  //   en: 'Roles Id',
  //   lang: 'rolesPermission.list.tableHeader.code',
  //   value: 'code'
  // },
  {
    label: '角色编号',
    en: 'Role Code',
    lang: 'rolesPermission.list.tableHeader.code',
    value: 'code'
  },
  {
    label: '角色名称',
    en: 'Role name',
    lang: 'rolesPermission.list.tableHeader.name',
    value: 'name'
  },
  {
    label: '状态',
    en: 'Status',
    lang: 'rolesPermission.list.tableHeader.status',
    value: 'status'
  },
  {
    label: '备注',
    en: 'Remark',
    lang: 'rolesPermission.list.tableHeader.notes',
    value: 'notes'
  },
  {
    label: '制单人',
    en: 'Single person',
    lang: 'rolesPermission.list.tableHeader.createdName',
    value: 'createdName'
  },
  {
    label: '制单时间',
    en: 'Making time',
    lang: 'rolesPermission.list.tableHeader.createdTime',
    value: 'createdTime'
  },
  {
    label: '修改人',
    en: 'Modifier',
    lang: 'rolesPermission.list.tableHeader.updatedName',
    value: 'updatedName'
  },
  {
    label: '修改时间',
    en: 'Modifier Time',
    lang: 'rolesPermission.list.tableHeader.updatedTime',
    value: 'updatedTime'
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
  tableHeader: tableHeader,
  btns: [
    {
      name: '新建单据',
      value: 'add',
      lang: 'layout.btns.new',
      event: 'add',
      id: 'btn_g_d_blue',
      plain: true,
      icon: 'el-icon-plus'

    },
    {
      name: '启用',
      value: 'enable',
      lang: 'layout.btns.batchEnable',
      event: 'batch-enable',
      plain: true,
      interface: {
        apiUrl: apiUrl.enableRoles
      }
    },
    {
      name: '禁用',
      value: 'disable',
      lang: 'layout.btns.batchDisable',
      event: 'batch-disable',
      plain: true,
      interface: {
        apiUrl: apiUrl.disableRoles
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
        apiUrl: apiUrl.deleteRoles
      }
    },
    {
      name: '筛选器',
      value: 'filter',
      lang: 'layout.btns.filters',
      event: 'filter',
      class: 'right',
      type: 'primary'
    }
    // {
    //   name: '表头配置',
    //   value: 'tabelheaderConfig',
    //   lang: 'layout.btns.tabelheaderConfig',
    //   event: 'showTabelheaderConfig',
    //   id: 'btn_g_gray',
    //   plain: true,
    //   class: 'right'
    // }
  ],
  InputConfig: {
    placeholder: 'form.placeholder.rolesPermissionPlaceholder',
    long: true,
    prefixIcon: 'el-icon-search'
  },
  formList: [
    {
      label: '角色名称',
      en: 'Role name',
      lang: 'rolesPermission.list.filter.name',
      value: 'name',
      type: 'input',
      setLength: 12
    },
    {
      label: '状态',
      value: 'status',
      lang: 'usersPermission.list.filter.status',
      setLength: 12,
      type: 'select',
      config: {
        multiple: true
      },
      options: [

        {
          label: '启用',
          value: '100'
        },
        {
          label: '禁用',
          value: '101'
        }
      ]
    },
    {
      label: '制单人',
      en: 'Single person',
      lang: 'rolesPermission.list.filter.createdByList',
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
      lang: 'rolesPermission.list.filter.createdTime',
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
      lang: 'rolesPermission.list.filter.updateByList',
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
      lang: 'rolesPermission.list.filter.updatedTime',
      value: 'updatedTime',
      config: {
        type: 'daterange'
      },
      type: 'datePick',
      setLength: 12
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
        apiUrl: apiUrl.deleteRoles
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
        apiUrl: apiUrl.enableRoles
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
        apiUrl: apiUrl.disableRoles
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
      label: '角色编号',
      value: 'code',
      en: 'Roles Code',
      lang: 'rolesPermission.detail.formList.code',
      type: 'input',
      // alwaysDisabled: true
      // editDisabled: true,
      rules: [{ required: true, message: '请输入角色编号', trigger: 'blur' }]
    },
    {
      label: '角色名称',
      value: 'name',
      en: 'Roles Name',
      lang: 'rolesPermission.detail.formList.name',
      type: 'input',
      rules: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
    },
    {
      label: '角色描述',
      value: 'notes',
      en: 'Remarks',
      lang: 'rolesPermission.detail.formList.notes',
      type: 'input'
    }
  ],
  anchorConfig: [
    {
      label: '模块权限',
      value: 'moduleGroup',
      en: 'Module permissions',
      lang: 'rolesPermission.detail.anchorConfig.moduleGroup',
      ref: 'moduleGroup'
    },
    {
      label: '用户分配',
      value: 'userGroup',
      en: 'User allocation',
      lang: 'rolesPermission.detail.anchorConfig.userGroup',
      ref: 'userGroup'
    }
  ]
}
export const tabsConfig: TabsConfig = {
  moduleTab: {
    btnGroup: [
      {
        label: '查询',
        value: '2',
        lang: 'operationGroup.btns.query'
      },
      {
        label: '新增',
        value: '4',
        lang: 'operationGroup.btns.new'
      },
      {
        label: '修改',
        value: '8',
        lang: 'operationGroup.btns.edit'
      },
      {
        label: '删除',
        value: '16',
        lang: 'operationGroup.btns.delete'
      },
      {
        label: '保存',
        value: '32',
        lang: 'operationGroup.btns.save'
      },
      {
        label: '审核',
        value: '64',
        lang: 'operationGroup.btns.audit'
      },
      {
        label: '反审核',
        value: '128',
        lang: 'operationGroup.btns.unaudit'
      },
      {
        label: '作废',
        value: '256',
        lang: 'operationGroup.btns.invalid'
      },
      {
        label: '导出',
        value: '516',
        lang: 'operationGroup.btns.export'
      },
      {
        label: '导出',
        value: '1032',
        lang: 'operationGroup.btns.import'
      },
      {
        label: '打印',
        value: '2072',
        lang: 'operationGroup.btns.print'
      }
    ],
    page: {
      name: '页面权限',
      lang: 'rolesPermission.detailTabs.moduleTab.page.name'
    },
    operate: {
      name: '操作权限',
      lang: 'rolesPermission.detailTabs.moduleTab.operate.name'
    },
    fields: {
      name: '字段权限',
      lang: 'rolesPermission.detailTabs.moduleTab.fields.name',
      tableHeader: [
        {
          name: '序号',
          lang: 'rolesPermission.detailTabs.moduleTab.fields.tableHeader[0]'
        },
        {
          name: '字段',
          lang: 'rolesPermission.detailTabs.moduleTab.fields.tableHeader[1]'
        }
      ]
    }
  },
  // 用户组分配 配置
  userTab: {
    list: [
      {
        label: '用户名称',
        en: 'username',
        lang: 'rolesPermission.detailTabs.userTab.tableHeader.name',
        value: 'name'
      },
      {
        label: '用户编号',
        en: 'user Order',
        lang: 'rolesPermission.detailTabs.userTab.tableHeader.code',
        value: 'code'
      }
    ]
  }
}
/**
 * TODO:需要实现数据字典
*/
export const detail = {

}

export const rolesPermission = { list: listConfig, detail: detailConfig, detailTabs: tabsConfig }
