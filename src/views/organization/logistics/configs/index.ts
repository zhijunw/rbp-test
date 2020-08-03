import {
  commonIndexConfig,
  ListComponentsConfig,
  DetailComponentsConfig,
  DetailTabsConfig
} from '@/typings'

import apiUrl from '@/api/organization-center/logistics'
import commonApiUrl from '@/api/common-api'

// 界面
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
// 搜索框配置
/* export const highSearchDialog: highSearchDialogConfig = {
  formList: [
    {
      label: '编号',
      value: 'code',
      en: 'code',
      lang: 'channelOrganization.highSearchDialog.formlist.code',
      type: 'input',
      options: [],
      setLength: 24
    },
    {
      label: '名称',
      value: 'name',
      en: 'name',
      lang: 'channelOrganization.highSearchDialog.formlist.name',
      type: 'input',
      options: [],
      setLength: 24
    },
    {
      label: '区域',
      value: 'region',
      en: 'region',
      matchSelectKey: 'areaTreeList',
      lang: 'channelOrganization.highSearchDialog.formlist.region',
      type: 'cascader',
      options: [],
      setLength: 24,
      config: {
        multiple: true
      }
    },
    {
      label: '组织架构',
      value: 'organization',
      en: 'organization',
      matchSelectKey: 'organizationTreeList',
      lang: 'channelOrganization.highSearchDialog.formlist.organization',
      type: 'cascader',
      options: [],
      setLength: 24,
      config: {
        multiple: true
      }
    },
    {
      label: '品牌',
      value: 'brandId',
      en: 'brand',
      lang: 'channelOrganization.highSearchDialog.formlist.brandId',
      type: 'select',
      options: [],
      setLength: 24,
      config: {
        multiple: true
      }
    },
    {
      label: '业务',
      value: 'businessFormatId',
      en: 'Type of Style',
      lang: 'channelOrganization.highSearchDialog.formlist.businessFormatId',
      type: 'select',
      options: [],
      setLength: 24,
      config: {
        multiple: true
      }
    },
    {
      label: '等级',
      value: 'gradeId',
      en: 'Style',
      lang: 'channelOrganization.highSearchDialog.formlist.gradeId',
      type: 'select',
      options: [],
      setLength: 24,
      config: {
        multiple: true
      }
    },
    {
      label: '户口',
      value: 'receivableChannelId',
      en: 'Registered residence',
      lang: 'channelOrganization.highSearchDialog.formlist.receivableChannelId',
      type: 'select',
      options: [],
      setLength: 24,
      config: {
        multiple: true
      }
    }

  ],
  tableColumn: [
    {
      label: '渠道编号',
      value: 'code',
      en: 'Channel Id',
      lang: 'channelOrganization.highSearchDialog.tableHeader.code'
    },
    {
      label: '渠道简称',
      value: 'name',
      en: 'Channel Name',
      lang: 'channelOrganization.highSearchDialog.tableHeader.name'
    }
  ],
  api: 'apiUrl.channelHighSearch',
  title: 'channelOrganization.highSearchDialog.title'
};*/
// 列表配置
export const listConfig: ListComponentsConfig = {
  // 按钮
  btns: [
    {
      name: '新建单据',
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
      name: '启用',
      value: 'batchEnable',
      lang: 'layout.btns.batchEnable',
      event: 'batch-enable',
      id: 'btn_g_gray',
      plain: true,
      interface: {
        name: 'batch-enable',
        apiUrl: apiUrl.enable
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
        apiUrl: apiUrl.disable
      }
    },
    // {
    //   name: '审核',
    //   value: 'batchAudit',
    //   lang: 'layout.btns.batchAudit',
    //   event: 'batch-audit',
    //   id: 'btn_g_gray',
    //   plain: true,
    //   interface: {
    //     name: 'batch-audit',
    //     apiUrl: 'apiUrl.auditChannel'
    //   }
    // },
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
    },
    {
      name: '导入',
      value: 'batchImport',
      lang: 'layout.btns.batchImport',
      event: 'batch-import',
      id: 'btn_g_gray',
      plain: true,
      interface: {
        name: 'batch-import'
      }
    },
    {
      name: '导出',
      value: 'singleExport',
      lang: 'layout.btns.singleExport',
      event: 'batch-export',
      id: 'btn_g_gray',
      plain: true,
      interface: {
        name: 'batch-out'
      }
    },
    {
      name: '筛选器',
      value: 'filter',
      lang: 'layout.btns.filters',
      event: 'filter',
      class: 'right',
      type: 'primary',
      interface: {
        name: 'filter'
      }
    }
  ],
  // 搜索框
  InputConfig: {
    placeholder: 'form.placeholder.searchCompanyCodePlaceholder',
    long: false,
    prefixIcon: 'el-icon-search'
  },
  // 表头
  tableHeader: [
    {
      label: '公司编号',
      value: 'code',
      en: 'Company Code',
      lang: 'logisticsOrganization.list.tableHeader.code'
    },
    {
      label: '公司名称',
      value: 'name',
      en: 'Company Name',
      lang: 'logisticsOrganization.list.tableHeader.name'
    },
    {
      label: '是否启用',
      value: 'status',
      en: 'Is Enable',
      lang: 'logisticsOrganization.list.tableHeader.status'
    },
    {
      label: '录入日期',
      value: 'createdTime',
      en: 'Entry Date',
      lang: 'logisticsOrganization.list.tableHeader.createdTime'
    },
    {
      label: '联系人',
      value: 'contactsPerson',
      en: 'Contacts',
      lang: 'logisticsOrganization.list.tableHeader.contactsPerson'
    },
    {
      label: '联系电话',
      value: 'mobile',
      en: 'mobile',
      lang: 'logisticsOrganization.list.tableHeader.mobile'
    },
    {
      label: '传真',
      value: 'fax',
      en: 'Fax',
      lang: 'logisticsOrganization.list.tableHeader.fax'
    },
    {
      label: '公司地址',
      value: 'webSite',
      en: 'Company Address',
      lang: 'logisticsOrganization.list.tableHeader.webSite'
    },
    {
      label: '材料费用',
      value: 'materialCost',
      en: 'Material Cost',
      lang: 'logisticsOrganization.list.tableHeader.materialCost'
    },
    {
      label: '默认打印机',
      value: 'defaultPrinter',
      en: 'Default Printer',
      lang: 'logisticsOrganization.list.tableHeader.defaultPrinter'
    }
    // {
    //   label: '状态',
    //   value: 'state',
    //   en: 'State',
    //   lang: 'logisticsOrganization.list.tableHeader.state'
    // }
  ],
  // 筛选器
  formList: [
    {
      label: '启用状态',
      value: 'status',
      en: 'State',
      lang: 'logisticsOrganization.list.filter.status',
      type: 'select',
      setLength: 12,
      config: {
        multiple: true
      },
      options: [
        {
          label: '启用',
          value: 100
        },
        {
          label: '禁用',
          value: 101
        }
      ]
    },
    {
      label: '录入日期',
      value: 'createdTime',
      en: 'Prepare Date',
      lang: 'logisticsOrganization.list.filter.createdTime',
      type: 'datePick',
      setLength: 12,
      config: {
        type: 'daterange',
        valueFormat: 'yyyy-MM-dd'
      }
    },
    {
      label: '制单用户',
      value: 'voucherMaker',
      en: 'Voucher Maker',
      lang: 'logisticsOrganization.list.filter.voucherMaker',
      type: 'filter',
      setLength: 12,
      config: {
        multiple: true
      },
      fuzzyConfig: {
        apiUrl: commonApiUrl.userFuzzy
      }
    },
    {
      label: '制单日期',
      value: 'PrepareData',
      en: 'Prepare Date',
      lang: 'logisticsOrganization.list.filter.PrepareData',
      type: 'datePick',
      setLength: 12,
      config: {
        type: 'daterange',
        valueFormat: 'yyyy-MM-dd'
      }
    },
    {
      label: '修改用户',
      value: 'modifyUser',
      en: 'Modify User',
      lang: 'logisticsOrganization.list.filter.modifyUser',
      type: 'filter',
      setLength: 12,
      config: {
        multiple: true
      },
      fuzzyConfig: {
        apiUrl: commonApiUrl.userFuzzy
      }
    },
    {
      label: '修改日期',
      value: 'modifyDate',
      en: 'Prepare Date',
      lang: 'logisticsOrganization.list.filter.modifyDate',
      type: 'datePick',
      setLength: 12,
      config: {
        type: 'daterange',
        valueFormat: 'yyyy-MM-dd'
      }
    }
  ]
  // TODO: 表头配置-待原型更新修改

}
// 详情的配置
export const detailConfig: DetailComponentsConfig = {
  // 按钮
  btns: [
    {
      name: '新建',
      value: 'add',
      hiddenIcon: true,
      icon: 'el-icon-plus',
      operationId: 'ADD',
      lang: 'operationGroup.btns.create',
      plain: true,
      id: 'btn_g_d_blue'
    },
    {
      name: '打印',
      value: 'print',
      svgIcon: 'rbp-operate_print',
      lang: 'operationGroup.btns.print',
      type: 'text',
      operationId: 'PRINT'
    },
    {
      name: '修改',
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
    // {
    //   name: '审核',
    //   value: 'audit',
    //   svgIcon: 'rbp-operate_check',
    //   lang: 'operationGroup.btns.audit',
    //   type: 'text',
    //   operationId: 'APPROVE',
    //   interface: {
    //     apiUrl: 'apiUrl.singleAuditChannel',
    //     params: 'single'
    //   }
    // },
    // {
    //   name: '反审核',
    //   value: 'unaudit',
    //   svgIcon: 'rbp-operate_recheck',
    //   lang: 'operationGroup.btns.unaudit',
    //   type: 'text',
    //   operationId: 'UNAUDIT',
    //   interface: {
    //     apiUrl: 'apiUrl.singleUnAuditChannel',
    //     params: 'single'
    //   }
    // },
    // {
    //   name: '恢复',
    //   value: 'restore',
    //   operationId: 'restore',
    //   svgIcon: 'rbp-operate_restore',
    //   lang: 'operationGroup.btns.restore',
    //   type: 'text',
    //   interface: {
    //     apiUrl: 'apiUrl.restore',
    //     params: 'string'
    //   }
    // },
    // {
    //   name: '作废',
    //   value: 'invalid',
    //   svgIcon: 'rbp-operate_cancellation',
    //   lang: 'operationGroup.btns.invalid',
    //   type: 'text',
    //   operationId: 'INVALID',
    //   interface: {
    //     apiUrl: 'apiUrl.singleInvoidChannel',
    //     params: 'single'
    //   }
    // },
    {
      name: '删除',
      value: 'delete',
      svgIcon: 'rbp-operate_delete',
      operationId: 'DELETE',
      type: 'text',
      lang: 'operationGroup.btns.delete',
      interface: {
        apiUrl: apiUrl.deletes
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
  //
  formList: [
    {
      label: '公司编号',
      value: 'code',
      en: 'Company Code',
      lang: 'logisticsOrganization.detail.formList.code',
      type: 'input',
      rules: [{ required: true, message: '公司编号', trigger: 'blur' }]
    },
    {
      label: '公司名称',
      value: 'name',
      en: 'Company Name',
      lang: 'logisticsOrganization.detail.formList.name',
      type: 'input'
    },
    {
      label: '录入日期',
      value: 'createdTime',
      en: 'Entry Date',
      lang: 'logisticsOrganization.detail.formList.createdTime',
      type: 'datePick',
      config: {
        valueFormat: 'yyyy-MM-dd hh:mm:ss'
      }
    },
    {
      label: '联系电话',
      value: 'mobile',
      en: 'mobile',
      lang: 'logisticsOrganization.detail.formList.mobile',
      type: 'input'
    },
    {
      label: '传真',
      value: 'fax',
      en: 'Fax',
      lang: 'logisticsOrganization.detail.formList.fax',
      type: 'input'
    },
    {
      label: '联系人',
      value: 'contactsPerson',
      en: 'Contacts Person',
      lang: 'logisticsOrganization.detail.formList.contactsPerson',
      type: 'input'
    },
    {
      label: '默认打印机',
      value: 'defaultPrinter',
      en: 'default Printer',
      lang: 'logisticsOrganization.detail.formList.defaultPrinter',
      type: 'input'
    },
    {
      label: '材料费用',
      value: 'materialCost',
      en: 'Material Cost',
      lang: 'logisticsOrganization.detail.formList.materialCost',
      type: 'number',
      config: {
        prefixIcon: 'iconfont rbp-Group-'
      }
    },
    {
      label: '单号长度',
      value: 'billLength',
      en: 'Bill Length',
      lang: 'logisticsOrganization.detail.formList.billLength',
      type: 'input'
    },
    {
      label: '公司网址',
      value: 'webSite',
      en: 'Web Site',
      lang: 'logisticsOrganization.detail.formList.webSite',
      type: 'input',
      setLength: 12
    },
    {
      label: '备注',
      value: 'notes',
      en: 'notes',
      lang: 'logisticsOrganization.detail.formList.notes',
      type: 'input',
      setLength: 12
    }
  ]
}
// tab配置
export const tabsConfig :DetailTabsConfig = {
  platformNumberSetting: {
    tableHeader: [
      {
        label: '平台类型',
        value: 'companyCode',
        type: 'input',
        en: 'Company Code',
        lang: 'logisticsOrganization.tabs.platformNumberSetting.formList.companyCode'
      },
      {
        label: '对应编码',
        type: 'input',
        value: 'companyName',
        en: 'Company Name',
        lang: 'logisticsOrganization.tabs.platformNumberSetting.formList.companyName'
      }
    ]
  },
  anchorConfig: {
    list: [
      {
        label: '平台编号设置',
        value: 'platformNumberSetting',
        en: 'Platform Code Setting',
        lang: 'logisticsOrganization.tabs.anchorConfig.fields.platformNumberSetting',
        ref: 'platformNumberSetting'
      }
    ]
  }
}

// 数据词典
export const initFormData = () => {
  const detailData = {
    formData: {
      'billLength': '',
      'code': '',
      'contactsPerson': '',
      'createdBy': '',
      'createdByName': '',
      'createdTime': '',
      'defaultPrinter': '',
      'fax': '',
      'id': '',
      'materialCost': '',
      'mobile': '',
      'name': '',
      'notes': '',
      'status': '',
      'updatedBy': '',
      'updatedByName': '',
      'updatedTime': '',
      'webSite': ''
    }
  }
  return detailData
}

// 这里定义用途 用作 国际化 的数据
export const logisticsOrganization = {
  list: listConfig,
  detail: detailConfig,
  tabs: tabsConfig,
  highSearchDialog: {}
}
