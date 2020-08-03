import {
  commonIndexConfig,
  ListComponentsConfig,
  AnchorConfig,
  TableHeaderConfig,
  DetailOperationConfig,
  FormListConfig
} from '@/typings'

import { highSearchDialogConfig } from '@/layout-components/vip-dialog/index'

import apiUrl from '@/api/organization-center/supplie'
import commonApiUrl from '@/api/common-api/index'

interface GooodsFileDetail {
    btns: DetailOperationConfig[]
    formList: FormListConfig[]
    supplieProp: FormListConfig[]

    financialInfo: FormListConfig[]
    anchorConfig: AnchorConfig[]
    shipAddress: TableHeaderConfig[]
    contacts: TableHeaderConfig[]
}

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
      label: '供应商编号',
      value: 'code',
      en: 'name',
      lang: 'supplie.highSearchDialog.formlist.code',
      type: 'input',
      options: [],
      setLength: 24
    },
    {
      label: '供应商全称',
      value: 'fullName',
      en: 'fullName',
      lang: 'supplie.highSearchDialog.formlist.fullName',
      type: 'input',
      options: [],
      setLength: 24
    },
    {
      label: '供应商简称',
      value: 'name',
      en: 'Supplie Full Name',
      lang: 'supplie.highSearchDialog.formlist.name',
      type: 'input',
      setLength: 24
    },
    {
      label: '供应商分类',
      value: 'type',
      en: 'Supplier classification',
      lang: 'supplie.highSearchDialog.formlist.type',
      type: 'select',
      matchSelectKey: 'typeIds',
      options: [],
      setLength: 24,
      config: {
        multiple: true
      }
    },
    {
      label: '性质',
      value: 'natureId',
      en: 'Nature',
      lang: 'supplie.highSearchDialog.formlist.natureId',
      type: 'select',
      matchSelectKey: 'natureIds',
      options: [],
      setLength: 24,
      config: {
        multiple: true
      }
    },

    {
      label: '区域',
      value: 'region',
      en: 'Area',
      lang: 'supplie.highSearchDialog.formlist.region',
      type: 'cascader',
      matchSelectKey: 'areaTreeIds',
      options: [],
      setLength: 24,
      config: {
        multiple: true
      }
    },
    {
      label: '资金号',
      value: 'fundAccountId',
      en: 'Fund number',
      lang: 'supplie.highSearchDialog.formlist.fundAccountId',
      type: 'select',
      matchSelectKey: 'fundAccountIds',
      options: [],
      setLength: 24,
      config: {
        multiple: true
      }
    },
    {
      label: '等级',
      value: 'gradeId',
      en: 'Grade',
      lang: 'supplie.highSearchDialog.formlist.gradeId',
      type: 'select',
      matchSelectKey: 'gradeIds',
      options: [],
      setLength: 24,
      config: {
        multiple: true
      }
    },
    {
      label: '状态',
      value: 'status',
      en: 'State',
      matchSelectKey: 'statusIds',
      lang: 'supplie.list.filter.status',
      setLength: 24,
      type: 'select',
      options: [],
      config: {
        multiple: true
      }
    }
  ],
  tableColumn: [
    {
      label: '供应商编号',
      value: 'code',
      en: 'Item Number',
      lang: 'supplie.list.tableHeader.code'
    },
    {
      label: '供应商简称',
      value: 'name',
      en: 'Supplie Name',
      lang: 'supplie.list.tableHeader.name'
    }
  ],
  api: apiUrl.HighSearch,
  title: 'supplie.highSearchDialog.title'

}
export const listConfig: ListComponentsConfig = {
  btns: [
    {
      name: '新建档案',
      value: 'add',
      lang: 'layout.btns.addFile',
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
        apiUrl: apiUrl.batchCheck
      }

    },

    {
      name: '导入',
      value: 'import',
      lang: 'layout.btns.batchImport',
      event: 'batch-import',
      plain: true
    },
    {
      name: '导出',
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
        apiUrl: apiUrl.deletes
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
    placeholder: 'form.placeholder.fieldsPlaceholder',
    long: true,
    prefixIcon: 'el-icon-search'
  },
  tableHeader: [],
  formList: [
    {
      label: '供应商',
      en: 'Item Number',
      lang: 'supplie.list.filter.supplierIds',
      value: 'supplierIds',
      type: 'highSearch',
      linkValue: 'supplierFilterParam',
      highSearchConfig: {
        dialogSearchConfig: highSearchDialog,
        apiUrl: apiUrl.fuzzy
      },
      setLength: 12
    },
    {
      label: '制单用户',
      en: 'Single person',
      lang: 'supplie.list.filter.createdByList',
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
      lang: 'supplie.list.filter.createdTime',
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
      lang: 'supplie.list.filter.updateByList',
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
      lang: 'supplie.list.filter.updatedTime',
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
      lang: 'supplie.list.filter.checkByList',

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
      lang: 'supplie.list.filter.checkTime',
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
      lang: 'supplie.list.filter.cancelByList',
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
      lang: 'supplie.list.filter.cancelTime',
      value: 'cancelTime',
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
    }

  ]
}

export const detailConfig: GooodsFileDetail = {
  btns: [
    {
      name: '新建',
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
        apiUrl: apiUrl.deletes
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
        apiUrl: apiUrl.check,
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
        apiUrl: apiUrl.uncheck,
        params: 'string'
      }

    },
    {
      name: '恢复',
      value: 'restore',
      operationId: 'restore',
      svgIcon: 'rbp-operate_cancellation',
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
        apiUrl: apiUrl.invalid,
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
      label: '供应商编号',
      value: 'code',
      en: 'Supplie Code',
      lang: 'supplie.detail.formList.code',
      editDisabled: true,
      type: 'input',
      rules: [{
        required: true,
        message: '请输入正确的供应商编号(字母+数字)',
        trigger: 'blur',
        pattern: /^[0-9a-zA-Z]+$/
      }]
    },
    {
      label: '供应商全称',
      value: 'fullName',
      en: 'Supplie Name',
      lang: 'supplie.detail.formList.fullName',
      type: 'input',
      rules: [{
        required: true,
        message: '请输入供应商全称',
        trigger: 'blur'
      }]
    },
    {
      label: '供应商简称',
      value: 'name',
      en: 'Short name of supplier',
      lang: 'supplie.detail.formList.name',
      type: 'input',
      rules: [{
        required: true,
        message: '供应商简称',
        trigger: 'blur'
      }]
    },
    {
      label: '供应商分类',
      value: 'type',
      en: 'Supplier classification',
      lang: 'supplie.detail.formList.type',
      type: 'select',
      matchSelectKey: 'typeIds',
      options: []
    },
    {
      label: '来货超差类型',
      value: 'receiveDifferentType',
      en: 'Type of over delivery',
      lang: 'supplie.detail.formList.receiveDifferentType',
      type: 'select',
      matchSelectKey: 'receiveDifferentTypeIds',
      options: []
    },
    {
      label: '来货超差比例',
      value: 'receiveDifferentPercent',
      en: 'Over tolerance ratio of incoming goods',
      lang: 'supplie.detail.formList.receiveDifferentPercent',
      type: 'number',
      config: {
        suffixIcon: 'iconfont rbp-baifenbi',
        clearable: false

      }
    }
  ],
  supplieProp: [
    {
      label: '区域',
      value: 'area',
      en: 'Area',
      lang: 'supplie.detail.supplieProp.area',
      type: 'cascader',
      matchSelectKey: 'areaTreeIds',
      cascaderConfig: ['nation', 'region', 'province', 'city', 'county'],
      rules: [{
        required: true,
        message: '请选择区域',
        trigger: 'change'
      }],
      options: []
    },
    {
      label: '性质',
      value: 'natureId',
      en: 'Nature',
      lang: 'supplie.detail.supplieProp.natureId',
      type: 'select',
      matchSelectKey: 'natureIds',
      options: [],
      refreshKey: 'supplierNature',
      refreshAPI: '/information/systemDictionary/option/refresh'
    },
    {
      label: '等级',
      value: 'gradeId',
      en: 'Grade',
      lang: 'supplie.detail.supplieProp.gradeId',
      type: 'select',
      matchSelectKey: 'gradeIds',
      options: [],
      refreshKey: 'supplierGrade',
      refreshAPI: '/information/systemDictionary/option/refresh'
    },
    {
      label: '负责人',
      value: 'headPerson',
      en: 'Person in charge',
      lang: 'supplie.detail.supplieProp.headPerson',
      type: 'input'
    },

    {
      label: '电话1',
      value: 'tel1',
      en: 'Telephone',
      lang: 'supplie.detail.supplieProp.tel1',
      rules: [{
        message: '输入正确的电话号码',
        pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
        trigger: 'blur'
      }],
      type: 'input',
      options: []
    },
    {
      label: '电话2',
      value: 'tel2',
      en: 'Telephone',
      lang: 'supplie.detail.supplieProp.tel2',
      type: 'input',
      rules: [{
        message: '输入正确的电话号码',
        pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
        trigger: 'blur'
      }],
      options: []
    },
    {
      label: '详细地址',
      value: 'address',
      en: 'Address',
      lang: 'supplie.detail.supplieProp.address',
      type: 'input',
      setLength: 12
    },
    {
      label: '备注',
      value: 'notes',
      en: 'Notes',
      lang: 'supplie.detail.supplieProp.notes',
      type: 'input',
      setLength: 12
    }
  ],
  financialInfo: [
    {
      label: '资金号',
      value: 'fundAccountId',
      en: 'Fund number',
      lang: 'supplie.detail.financialInfo.fundAccountId',
      type: 'select',
      matchSelectKey: 'fundAccountIds',
      options: [],
      rules: [{
        required: true,
        message: '请选择资金号',
        trigger: 'change'
      }]
    },
    {
      label: '默认税率',
      value: 'taxrate',
      en: 'Default rate',
      lang: 'supplie.detail.financialInfo.taxrate',
      type: 'number',
      config: {
        suffixIcon: 'iconfont rbp-baifenbi',
        clearable: false
      },
      rules: [{
        required: true,
        message: '请输入默认税率',
        trigger: 'bulr'
      }]
    }
  ],
  anchorConfig: [
    {
      label: '供应商属性',
      value: 'supplieProp',
      en: 'Supplie Prop',
      lang: 'supplie.detail.anchorConfig.supplieProp',
      ref: 'supplieProp'
    },
    {
      label: '财务资料',
      value: 'financialInfo',
      en: 'Financial Info',
      lang: 'supplie.detail.anchorConfig.financialInfo',
      ref: 'financialInfo'
    },
    {
      label: '发货地址',
      value: 'shipAddress',
      en: 'ship Address',
      lang: 'supplie.detail.anchorConfig.shipAddress',
      ref: 'shipAddress'
    },
    {
      label: '联系人',
      value: 'contacts',
      en: 'Contacts',
      lang: 'supplie.detail.anchorConfig.contacts',
      ref: 'contacts'
    }

  ],
  shipAddress: [
    {
      label: '默认',
      value: 'defaultFlag',
      en: 'Default',
      width: '60px',
      type: 'radio',
      align: 'left',
      lang: 'supplie.detail.shipAddress.defaultFlag'
    },
    {
      label: '编号',
      value: 'code',
      en: 'code',
      type: 'input',
      width: '90px',
      align: 'left',

      lang: 'supplie.detail.shipAddress.code'
    },
    {
      label: '详细地址',
      value: 'address',
      en: 'Address',
      type: 'input',
      lang: 'supplie.detail.shipAddress.address'
    },
    {
      label: '联系人',
      value: 'contactsPerson',
      en: 'Contacts',
      type: 'input',
      width: '90px',
      lang: 'supplie.detail.shipAddress.contactsPerson'
    },
    {
      label: '邮政编码',
      value: 'postCode',
      en: 'Postal Code',
      type: 'input',
      width: '90px',
      lang: 'supplie.detail.shipAddress.postCode'
    },
    {
      label: '手机号码',
      value: 'mobile',
      en: 'Telphone',
      type: 'number',
      lang: 'supplie.detail.shipAddress.mobile'
    }
  ],
  contacts: [
    {
      label: '姓名',
      value: 'name',
      en: 'name',
      type: 'input',
      width: '90px',
      lang: 'supplie.detail.contacts.name'
    },
    {
      label: '职位',
      value: 'position',
      en: 'Job',
      width: '90px',
      type: 'input',
      lang: 'supplie.detail.contacts.position'
    },
    {
      label: '办公电话',
      value: 'officeTel',
      en: 'Office phone',
      type: 'input',
      lang: 'supplie.detail.contacts.officeTel'
    },
    {
      label: '手机号码1',
      value: 'mobile1',
      en: 'Telphone One',
      type: 'number',
      lang: 'supplie.detail.contacts.mobile1'
    },
    {
      label: '手机号码2',
      value: 'mobile2',
      en: 'Telphone Two',
      type: 'number',
      lang: 'supplie.detail.contacts.mobile2'
    },
    {
      label: '邮箱地址',
      value: 'email',
      en: 'Email',
      type: 'input',
      lang: 'supplie.detail.contacts.email'
    },
    {
      label: 'QQ',
      value: 'qq',
      en: 'QQ',
      type: 'input',
      lang: 'supplie.detail.contacts.qq'
    }
  ]
}
export const initFormData = () => {
  const detailData = {
    supplie: {
      code: '',
      name: '',
      fullName: '',
      taxrate: '',
      area: [],
      tel1: '',
      tel2: '',
      fundAccountId: ''
    },
    customFieldMap: {},
    sendAddressList: [],
    contactsPersonList: []
  }
  return detailData
}
// 这里定义用途 用作 国际化 的数据
export const supplie = {
  list: listConfig,
  detail: detailConfig,
  highSearchDialog: highSearchDialog

}
