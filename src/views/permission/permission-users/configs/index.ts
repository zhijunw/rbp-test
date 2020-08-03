import {
  commonIndexConfig,
  ListComponentsConfig,
  DetailComponentsConfig,
  TableHeaderConfig,
  DetailTabsConfig } from '@/typings'

import apiUrl from '@/api/permission/usersPermission'
import commonApiUrl from '@/api/common-api/index'

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

const tableHeader:TableHeaderConfig[] = [
  // {
  //   label: '用户ID',
  //   value: 'id',
  //   en: 'User Id',
  //   lang: 'usersPermission.list.tableHeader.id'
  // },
  {
    label: '用户名',
    value: 'code',
    en: 'User NickName',
    lang: 'usersPermission.list.tableHeader.code'
  },
  {
    label: '姓名',
    value: 'name',
    en: 'The Name',
    lang: 'usersPermission.list.tableHeader.name'
  },
  {
    label: '状态',
    value: 'status',
    en: 'Condition',
    lang: 'usersPermission.list.tableHeader.status'
  },
  {
    label: '部门',
    value: 'department',
    en: 'Department',
    lang: 'usersPermission.list.tableHeader.department'
  },
  {
    label: '职位',
    value: 'position',
    en: 'Position',
    lang: 'usersPermission.list.tableHeader.position'
  },
  {
    label: '角色',
    value: 'roleNames',
    en: 'Character',
    lang: 'usersPermission.list.tableHeader.roleNames'
  },
  {
    label: '数据集',
    value: 'dataNames',
    en: 'Data Set',
    lang: 'usersPermission.list.tableHeader.dataNames'
  },
  {
    label: '类型',
    value: 'typeName',
    en: 'Type',
    lang: 'usersPermission.list.tableHeader.typeName'
  },
  {
    label: '性别',
    value: 'sexName',
    en: 'Sex',
    lang: 'usersPermission.list.tableHeader.sexName'
  },
  {
    label: '身份证号',
    value: 'idCard',
    en: 'ID Number',
    lang: 'usersPermission.list.tableHeader.idCard'
  },
  {
    label: '手机号',
    value: 'mobile',
    en: 'Phone Number',
    lang: 'usersPermission.list.tableHeader.mobile'
  },
  {
    label: '邮箱',
    value: 'yx',
    en: 'Email',
    lang: 'usersPermission.list.tableHeader.yx'
  },
  {
    label: '微信',
    value: 'weixin',
    en: 'Wechat',
    lang: 'usersPermission.list.tableHeader.weixin'
  },
  {
    label: '企业微信ID',
    value: 'qyweixin',
    en: 'Enterprise WeChat ID',
    lang: 'usersPermission.list.tableHeader.qyweixin'
  },
  {
    label: '生日',
    value: 'birthdayDate',
    en: 'Birthday',
    lang: 'usersPermission.list.tableHeader.birthdayDate'
  },
  {
    label: '入职日期',
    value: 'workDate',
    en: 'Date of entry',
    lang: 'usersPermission.list.tableHeader.workDate'
  },
  {
    label: '备注',
    value: 'notes',
    en: 'Note',
    lang: 'usersPermission.list.tableHeader.notes'
  },
  {
    label: '制单人',
    value: 'createdByName',
    en: 'Making people',
    lang: 'usersPermission.list.tableHeader.createdByName'
  },
  {
    label: '制单时间',
    value: 'createdTime',
    en: 'Making time',
    lang: 'usersPermission.list.tableHeader.createdTime'
  },
  // {
  //   label: '审核人',
  //   value: 'shr',
  //   en: 'The reviewer',
  //   lang: 'usersPermission.list.tableHeader.shr'
  // },
  // {
  //   label: '审核时间',
  //   value: 'shsj',
  //   en: 'The reviewer time',
  //   lang: 'usersPermission.list.tableHeader.shsj'
  // },
  {
    label: '修改人',
    value: 'updatedByName',
    en: 'The modifier',
    lang: 'usersPermission.list.tableHeader.updatedByName'
  },
  {
    label: '修改时间',
    value: 'updatedTime',
    en: 'The Modify time',
    lang: 'usersPermission.list.tableHeader.updatedTime'
  }
]

export const listConfig: ListComponentsConfig = {
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
      value: 'batchEnable',
      lang: 'layout.btns.batchEnable',
      event: 'batch-enable',
      id: 'btn_g_gray',
      plain: true,
      interface: {
        apiUrl: apiUrl.enableUsers
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
        apiUrl: apiUrl.disableUsers
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
        apiUrl: apiUrl.deleteUsers
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
    placeholder: 'form.placeholder.usersPermissionPlaceholder',
    long: true,
    prefixIcon: 'el-icon-search'
  },
  tableHeader: tableHeader,
  formList: [
    {
      label: '用户名',
      value: 'code',
      type: 'input',
      lang: 'usersPermission.list.filter.code',
      setLength: 12
      // value: 'createdByList',
      // type: 'filter',
      // fuzzyConfig: {
      //   apiUrl: commonApiUrl.userFuzzy,
      //   multiple: true
      // },
    },
    {
      label: '姓名',
      value: 'name',
      type: 'input',
      lang: 'usersPermission.list.filter.name',
      setLength: 12
    },
    {
      label: '手机号',
      value: 'mobile',
      type: 'input',
      lang: 'usersPermission.list.filter.mobile',
      setLength: 12
    },
    {
      label: '数据集',
      value: 'dataIds',
      lang: 'usersPermission.list.filter.dataIds',
      setLength: 12,
      type: 'select',
      config: {
        multiple: true
      },
      options: []
    },
    {
      label: '部门',
      value: 'department',
      type: 'input',
      lang: 'usersPermission.list.filter.department',
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
      label: '角色',
      value: 'roleIds',
      lang: 'usersPermission.list.filter.roleIds',
      setLength: 12,
      type: 'select',
      config: {
        multiple: true
      },
      options: [
      ]
    },
    {
      label: '类型',
      value: 'type',
      lang: 'usersPermission.list.filter.type',
      setLength: 12,
      type: 'select',
      config: {
        multiple: true
      },
      options: [
        {
          label: '员工',
          value: '0'
        },
        {
          label: '管理员',
          value: '1'
        }
      ]
    },
    {
      label: '入职日期',
      value: 'workDate',
      lang: 'usersPermission.list.filter.workDate',
      type: 'datePick',
      setLength: 12,
      config: {
        type: 'daterange'
      }
    },
    {
      label: '制单人',
      lang: 'usersPermission.list.filter.createdByList',
      setLength: 12,
      value: 'createdByList',
      type: 'filter',
      fuzzyConfig: {
        apiUrl: commonApiUrl.userFuzzy,
        multiple: true
      }
    },
    {
      label: '制单时间',
      value: 'createdTime',
      lang: 'usersPermission.list.filter.createdTime',
      type: 'datePick',
      setLength: 12,
      config: {
        type: 'daterange'
      }
    },
    {
      label: '修改人',
      lang: 'usersPermission.list.filter.updateByList',
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
      value: 'updatedTime',
      lang: 'usersPermission.list.filter.updatedTime',
      type: 'datePick',
      setLength: 12,
      config: {
        type: 'daterange'
      }
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
        name: '删除',
        apiUrl: apiUrl.deleteUsers
      }
    },
    {
      name: '修改',
      value: 'edit',
      svgIcon: 'rbp-operate_edit',
      operationId: 'MODIFY',
      type: 'text',
      lang: 'operationGroup.btns.edit',
      interface: {
        name: '修改',
        apiUrl: 'null'
      }
    },
    {
      name: '取消',
      value: 'cancel',
      svgIcon: 'rbp-operate_cancel',
      lang: 'operationGroup.btns.cancel',
      type: 'text',
      isValidatePermisssion: true,
      interface: {
        name: '取消',
        apiUrl: 'null'
      }
    },
    {
      name: '保存',
      value: 'save',
      svgIcon: 'rbp-operate_save',
      lang: 'operationGroup.btns.save',
      type: 'text',
      isValidatePermisssion: true,
      interface: {
        name: '保存',
        apiUrl: 'null'
      }
    },
    {
      name: '启用',
      value: 'enable',
      svgIcon: 'rbp-operate_start',
      lang: 'operationGroup.btns.enable',
      type: 'text',
      isValidatePermisssion: true,
      interface: {
        name: '启用',
        apiUrl: apiUrl.enableUsers
      }
    },
    {
      name: '禁用',
      value: 'disable',
      svgIcon: 'rbp-operate_ban',
      lang: 'operationGroup.btns.disable',
      type: 'text',
      isValidatePermisssion: true,
      interface: {
        name: '禁用',
        apiUrl: apiUrl.disableUsers
      }
    },
    {
      name: '上一个',
      value: 'prev',
      svgIcon: 'rbp-operate_previous',
      lang: 'operationGroup.btns.prev',
      type: 'text',
      class: 'prev-btn',
      isValidatePermisssion: true,
      interface: {
        name: '上一个',
        apiUrl: 'null'
      }
    },
    {
      name: '下一个',
      value: 'next',
      svgIcon: 'rbp-operate_next',
      lang: 'operationGroup.btns.next',
      type: 'text',
      isValidatePermisssion: true,
      interface: {
        name: '下一个',
        apiUrl: 'null'
      }
    }
  ],
  formList: [
    // {
    //   label: '用户ID',
    //   value: 'id',
    //   en: 'User ID',
    //   lang: 'usersPermission.detail.formList.id',
    //   disabled: true,
    //   type: 'input'
    // },
    {
      label: '用户名',
      value: 'code',
      en: 'User Name',
      lang: 'usersPermission.detail.formList.code',
      type: 'input',
      rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
    },
    {
      label: '登录密码',
      value: 'password',
      en: 'User Name',
      lang: 'usersPermission.detail.formList.password',
      type: 'input',
      rules: [{ required: true, message: '请输入登录密码', trigger: 'blur' }]
    }
  ]
}
export const tabsConfig: DetailTabsConfig = {
  userConfig: {
    list: [
      {
        label: '姓名',
        value: 'name',
        en: 'User Name',
        lang: 'usersPermission.tabs.userConfig.formList.name',
        type: 'input',
        rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },
      {
        label: '性别',
        value: 'sex',
        en: 'Sex',
        lang: 'usersPermission.tabs.userConfig.formList.sex',
        type: 'select',
        options: [
          {
            label: '男',
            value: 0
          },
          {
            label: '女',
            value: 1
          }
        ],
        rules: [{ required: true, message: '请输入性别', trigger: 'blur' }]
      },
      {
        label: '身份证号',
        value: 'idCard',
        en: 'ID Number',
        lang: 'usersPermission.tabs.userConfig.formList.idCard',
        type: 'input',
        rules: [{ required: true, message: '请输入身份证号', trigger: 'blur' }]
      },
      {
        label: '手机号',
        value: 'mobile',
        en: 'Phone Number',
        lang: 'usersPermission.tabs.userConfig.formList.mobile',
        type: 'input',
        rules: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      },
      {
        label: '邮箱',
        value: 'email',
        en: 'Email',
        lang: 'usersPermission.tabs.userConfig.formList.email',
        type: 'input'
      },
      {
        label: '微信',
        value: 'weixin',
        en: 'Wechat',
        lang: 'usersPermission.tabs.userConfig.formList.weixin',
        type: 'input'
      },
      {
        label: '企业微信ID',
        value: 'qyweixin',
        en: 'Enterprise WeChat ID',
        lang: 'usersPermission.tabs.userConfig.formList.qyweixin',
        type: 'input'
      },
      {
        label: '生日',
        value: 'birthdayDate',
        en: 'Birthday',
        lang: 'usersPermission.tabs.userConfig.formList.birthdayDate',
        type: 'datePick'
      },
      {
        label: '部门',
        value: 'department',
        en: 'Department',
        lang: 'usersPermission.tabs.userConfig.formList.department',
        type: 'input'
      },
      {
        label: '职位',
        value: 'position',
        en: 'Position',
        lang: 'usersPermission.tabs.userConfig.formList.position',
        type: 'input'
      },
      {
        label: '类型',
        value: 'type',
        en: 'Type',
        lang: 'usersPermission.tabs.userConfig.formList.type',
        type: 'select',
        options: [
          {
            label: '员工',
            value: 0
          },
          {
            label: '管理员',
            value: 1
          }
        ]
      },
      {
        label: '入职日期',
        value: 'workDate',
        en: 'Date of entry',
        lang: 'usersPermission.tabs.userConfig.formList.workDate',
        type: 'datePick'
      },
      {
        label: '备注',
        value: 'notes',
        en: 'Note',
        lang: 'usersPermission.tabs.userConfig.formList.notes',
        setLength: 8,
        type: 'input'
      }
    ]
  },
  characterConfig: {
    list: [
      {
        label: '角色名称',
        value: 'name',
        en: 'Character name',
        type: 'select',
        lang: 'usersPermission.tabs.characterConfig.fields.name'
      },
      {
        label: '角色编号',
        value: 'code',
        en: 'Character name',
        lang: 'usersPermission.tabs.characterConfig.fields.code'
      }
    ]
  },
  datasetConfig: {
    list: [
      {
        label: '数据集名称',
        value: 'name',
        en: 'Dataset Name',
        type: 'select',
        lang: 'usersPermission.tabs.datasetConfig.fields.name'
      },
      {
        label: '数据集编号',
        value: 'code',
        en: 'Dataset Number',
        lang: 'usersPermission.tabs.datasetConfig.fields.code'
      }
    ]
  },
  anchorConfig: {
    list: [
      {
        label: '用户资料',
        value: 'userData',
        en: 'User Data',
        lang: 'usersPermission.tabs.anchorConfig.fields.userData',
        ref: '1'
      },
      {
        label: '用户角色',
        value: 'userCharacter',
        en: 'User Character',
        lang: 'usersPermission.tabs.anchorConfig.fields.userCharacter',
        ref: '2'
      },
      {
        label: '数据集',
        value: 'dataSet',
        en: 'Data Set',
        lang: 'usersPermission.tabs.anchorConfig.fields.dataSet',
        ref: '3'
      }
    ]
  }
}
// export const initFormData = () => {
//   const detailData = {
//     code: '',
//     name: '',
//     notes: ''
//   }
//   return detailData
// }

// 这里定义用途 用作 国际化 的数据
export const usersPermission = { list: listConfig, detail: detailConfig, tabs: tabsConfig }
