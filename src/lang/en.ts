import { datasetPermission } from '../views/permission/data-permission/configs'
import { usersPermission } from '../views/permission/permission-users/configs'
import { rolesPermission } from '../views/permission/roles-permission/configs'
import { channelOrganization } from '../views/organization/channel-organization/configs'
import { logisticsOrganization } from '../views/organization/logistics/configs'
import { fieldConfiguration } from '../views/configCenter/field-config/configs'
import { goodsFiels } from '../views/content-center/goods-fiels/configs'
import { barcode } from '../views/content-center/barcode-fiels/configs'
import { supplie } from '../views/organization/supplie/configs'
import { systemDictionary } from '../views/configCenter/system-dictionary/configs'
import { moduleConfig } from '../views/configCenter/module-config/configs'
import { salePlain } from '../views/sale-center/sale-plain/configs'
import { distributionPlain } from '../views/sale-center/distribution-plain/configs'
// import { salePlainAdjustment } from '../views/sale-center/sale-plain-adjustment/configs'
import { salePlainAdjustment } from '../views/sale-center/sale-plain-adjustment/configs'
import { terminalLogistics } from '../views/retail-center/terminal-logistics/configs'

import { getZhDesc, getObjZhDesc } from './tool'
import { goodsFormList, userFormList, userTableColumn } from '@/layout-components/vip-dialog/config'
import { packingWorktop } from '../views/sale-center/packing-worktop/configs'
import { menuConfig } from '../views/configCenter/menu-config/configs'

export default {
  mainMenu: {
    businessCenter: 'Business Center',
    newspaperCenter: 'Newspaper Center',
    version: 'Version',
    currentVersion: 'Current Version',
    updateContent: 'Update content',
    content: 'English-Chinese Switching Of Sales Orders'
  },

  route: {
    dashboard: 'Dashboard',
    order: 'Order',
    // 采购
    purchase: 'Purchase',
    purchaseGoods: 'PurchaseGoods',
    purchaseOrder: 'PurchaseOrder',
    plannedOrder: 'PlannedOrder',
    instructOrder: 'InstructOrder',
    // 自定义主题
    customTheme: 'CustomTheme',
    // 权限
    permission: 'Permission',
    usersPermission: 'UsersPermission',
    rolesPermission: 'RolesPermission',
    datasetPermission: 'DatasetPermission',
    // 组织中心
    organization: 'Organization',
    supplier: 'supplie',
    channelOrganization: 'ChannelOrganization',
    logistics: 'Logistics Company',
    // 配置中心
    configCenter: 'ConfigCenter',
    fieldConfig: 'FieldConfig',
    channelConfig: 'ChannelConfig',
    globalConfig: 'GlobalConfig',
    printConfig: 'PrintConfig',
    addPrintConfig: 'add PrintConfig',
    systemDictionary: 'System Dictionary',
    moduleConfig: 'Module Config',
    menuConfig: 'Menu Config',
    // 货品中心
    contentCenter: 'contentCenter',
    goodsFiels: 'GoodsFiels',
    barcode: 'BarcodeFile',
    goodsConfig: 'goodsConfig',
    // 报表中心
    reportCenter: 'Report Center',
    goodsReport: 'goods Report',
    orderDetailReport: 'orderDetail Report',
    // 销售计划
    sale: 'sale',
    salePlain: 'Sale Plain',
    salePlainAdjustment: 'Sale Plain Adjustment',
    packingWorkTop: 'Packing Worktop',
    distributionPlain: 'Distribution Plain',
    printPreview: 'print',
    bpmnView: 'BPMN VIEW',
    socketList: 'Task List',
    // 审核工作流
    auditActivity: 'Audit Activity',
    auditConfig: 'Audit Config',
    auditList: 'Audit List',
    // 终端物流
    retailCenter: 'Retail Center',
    terminalLogistics: 'Terminal Logistics'
  },
  commonWord: {
    zh: 'Chinese',
    en: 'English',
    login: 'Login',
    allSelect: 'All Select',
    allData: 'All',
    reverseSelection: 'Reverse Selection',
    optionalField: 'Optional Field',
    selectedFields: 'Selected Fields',
    loadMore: 'Load More ...',
    noMoreData: 'No More Data',
    noData: 'No Data',
    tips: 'Tips',
    confirm: 'Confirm',
    cancel: 'Cancel',
    pass: 'Pass',
    reject: 'Reject',
    layoutName: 'Layout Name',
    saveLayout: 'Save Layout',
    deleteLayoutTips: 'Confirm to delete layout',
    delteLayout: 'Delete Layout',
    deleteTag: 'Do you want to delete this property',
    success: 'Success',
    option: 'Option',
    lang: 'Multi Language',
    add: 'Add',
    copy: 'Copy',
    chooseArea: 'Choose Area',
    queryResult: 'Query Result',
    attrFilter: 'Attribute selection',
    positiveFilter: 'Positive Filter',
    reverseFilter: 'Reverse Filter',
    selectedList: 'Selected List',
    saveEdit: 'Please save the edit first',
    notSelect: 'Please Check The Delete Option',
    noDataWarning: 'Please select the document first',
    noContentWarning: 'Please select content first',
    sureDelete: 'Are you sure you want to delete the document?',
    infoBarcode: 'Can scan / enter barcode',
    text: 'Text Input',
    number: 'Number Input',
    select: 'Select',
    hasChooseChannel: 'Has Choose Channel',
    datePick: 'DatePick',
    actionSuccess: '{action} Success',
    name: 'Name',
    open: 'Open',
    packUp: 'Pack Up',
    scanRecord: 'Scan Record',
    input: 'Goods Input',
    fix: 'fix',
    showGoodsImage: 'Show Goods Image',
    inputNumber: 'Fill in quantity',
    goodsImage: 'Goods Image',
    operation: 'operation',
    operator: 'operator',
    operateTime: 'operateTime',
    belongModule: 'Belong Module',
    project: 'Project',
    numberText: 'Number',
    noBarcodeData: 'No Barcode Data',
    fieldsSort: 'Field order',
    fieldsSortConfig: 'Field Order Config',
    importTitle: 'Import from Excel',
    importScheme: 'Import Scheme',
    printName: 'Print Name',
    status: 'Status',
    addPlain: 'Add Plain',
    flowTypeName: 'flowTypeName',
    editPlainName: 'Edit Plain Name',
    preview: 'Preview',
    more: 'More',
    auditInfo: 'After the approval becomes effective, the document can no longer be edited',
    commitInvalid: 'Commit Invalid',
    commitRestore: 'Commit Restore',
    operationTime: 'Operation Time',
    approvalLevel: 'Approval Level',
    auditComments: 'Audit Comments',
    approval: 'approval',
    billType: 'Bill Type',
    download: 'Download',
    checkMore: 'Check More',
    cancelMerger: 'Cancel Merger',
    operateResult: 'Operate Result',
    placeSelectFileType: 'Place Select File Type',
    downloadSampleFile: 'Download Sample File',
    checkOnlyCode: 'Check Only Code',
    up: 'Up',
    down: 'Down',
    addChildrenCategory: 'Add Children Category',
    printingManagement: 'printing Management'
  },
  reportCommonWord: {
    title: 'title',
    chooseData: 'Choose Data',
    addLayout: 'Add Layout',
    managePersonLayout: 'Manage Person Layout',
    manageAdminLayout: 'Mange Admin Layout',
    layoutName: 'Layout Name',
    layoutCreatTime: 'Layout CreatTime',
    saleReport: 'saleReport',
    person: 'person',
    admin: 'admin',
    layoutConfig: 'Layout Config',
    SaveSystemView: 'Save as system view',
    createdView: 'Created View Success',
    editViewSuccess: 'Edit View Success',
    deleteView: 'Are you sure you want to delete the view?',
    placeInputViewName: 'Please enter a view name',
    outputFields: 'Output Field',
    saveAsCurrentView: 'Save As Current View',
    saveAsNewView: 'save As New View',
    index: 'index',
    fields: 'fields',
    total: 'total',
    layout: 'layout',
    goodsName: 'Goods Name',
    goodsCode: 'Goods Code',
    quantity: 'quantity',
    oweQuantity: 'Owe Quantity'
  },
  layout: {
    tabs: {
      list: 'List',
      detail: 'Detail'
    },
    btns: {
      new: 'New',
      batchAudit: 'Batch Audit',
      batchReverseAudit: 'Batch Reverse Audit',
      batchUnaudit: 'batch Unaudit',
      batchCharge: 'Batch Charge',
      batchImport: 'Batch Import',
      batchExport: 'Batch Export',
      singleExport: 'Export',
      batchDelete: 'Batch Delete',
      reverseAudit: 'Reverse Audit',
      batchInvalid: 'batch Invalid',
      batchDisable: 'Batch Disable',
      batchEnable: 'Batch Enable',
      BatchInvalid: 'Batch Invalid',
      batchPost: 'Batch Post',
      batchReceive: 'Batch Receive',
      batchHandle: 'Batch Handle',
      filters: 'Filters',
      integratedQuery: 'Integrated Query',
      relatedModules: 'Related Modules',
      relatedReports: 'Related Reports',
      relatedWeb: 'Related Web',
      filter: 'Filter',
      tabelheaderConfig: 'Tabelheader Config',
      backTop: 'Back Top',
      batchPrint: 'Batch Print',
      batchCheck: 'Batch Check',
      edit: 'Edit',
      add: 'Add',
      sort: 'Sort',
      directFilter: 'Direct Filter',
      disable: 'Disable',
      delete: 'Delete',
      save: 'Save',
      close: 'Close',
      saveLayout: 'save Layout',
      saveNewLayout: 'save New Layout',
      sure: 'Confirm',
      cancel: 'Cancel',
      query: 'Query',
      clearQuery: 'Clear Query',
      checkDetail: 'Check Detail',
      operation: 'Operation',
      confirm: 'Confirm',
      reset: 'Reset',
      addRoles: 'Add Roles',
      checkbox: 'All',
      synthesize: 'Integrated Query',
      addChannel: 'Add Channel',
      restore: 'Restore',
      addFields: 'Add Fields',
      addCategory: 'Add Category',
      addGoodsFiels: 'Add Product',
      addColor: 'Add Color',
      addFile: 'Add File',
      addModule: 'Add Module',
      addView: 'Add View',
      addActivity: 'Add Activity',
      approval: 'Approval',
      packing: 'Packing',
      merge: 'Merge',
      mergeDeliveryPlan: 'MergeDeliveryPlan',
      print: 'Print'

    },
    divider: {
      open: 'Open',
      pickUp: 'pick up'
    },
    pagination: {
      total: '{total} records in total, {pageNo} / {pageCount}'
    }
  },
  operationGroup: {
    btns: {
      add: 'ADD',
      newAdd: 'Add New',
      delete: 'Delete',
      edit: 'Edit',
      cancel: 'Cancel',
      query: 'Query',
      new: 'New',
      invalid: 'Invalid',
      save: 'Save',
      audit: 'Audit',
      unaudit: 'Unaudit',
      prev: 'Prev',
      enable: 'Enable',
      disable: 'Disable',
      next: 'Next',
      export: 'Export',
      record: 'Record',
      import: 'Import',
      print: 'Print',
      copy: 'Copy',
      addChannel: 'Add Channel',
      close: 'Close',
      refresh: 'Refresh'
    },
    billDesc: 'Bill Status',
    enableStatusDesc: 'Enable Status',
    status: {
      unaudit: 'Unaudit',
      reverseAudit: 'Reverse Audit',
      audit: 'Audited',
      enable: 'Enable',
      disable: 'Disable',
      invalid: 'Invalid'
    },
    pedingStatus: {
      1: 'Pending approval',
      2: 'Under approval',
      3: 'Rejected',
      4: 'Passed'
    },
    sex: {
      man: 'Man',
      woman: 'Woman'
    },
    type: {
      user: 'User',
      admin: 'Admin'
    }
  },
  dialogPrompt: {
    delete: 'This operation will permanently delete the file. Do you want to continue?',
    cancel: 'The data has not been saved, do you want to give up?',
    audit: 'Do you want to audit the documents?',
    unaudit: 'Do you want to review the documents?',
    enable: 'Do you want to start using the documents?',
    disable: 'Do you want to stop using the documents?',
    invalid: 'Do you want to invalid the documents?',
    save: 'Do you want save the documents?',
    deleteItem: 'Do you want delete the documents?',
    batchDelete: 'Do you want delete all options?',
    able: 'Do you want to enable documents?',
    sainternationalCode: 'Do you want to save international code 7 bits?',
    prepare: 'Do you want to prefabricate the invoice?',
    restore: 'Do you want to restore the documents',
    unPrepare: 'Do you want to cancel the prefabricated invoice?',
    commitAudit: 'Are you sure to submit for review',
    commitInvalid: 'Are you sure to submit for Void this document',
    commitRestore: 'Are you sure to submit for resume the audit'

  },
  saveRules: {
    saveText: 'Do you keep the documents?'
  },
  dialog: {
    confirmButtonText: 'yes',
    cancelButtonText: 'no',
    info: 'Prompt',
    error: 'Error'
  },
  detailFormTitle: {
    backTop: 'Back Top',
    userData: 'User Datas',
    userCharacter: 'User Character',
    dataSet: 'Data Set'
  },
  form: {
    placeholder: {
      startDate: 'Start Date',
      endDate: 'End Date',
      chooseDate: 'Choose Date',
      startMonth: 'Start Month',
      endMonth: 'End Month',
      chooseMonth: 'Plase Choose Month',
      chooseYear: 'Plase Choose Year',
      chooseWeek: 'Plase Choose Week',
      fuzzySearch: 'Fuzzy Search',
      select: 'Plase Choose',
      input: 'Please Input {msg}',
      option: 'Please Input New Option',
      filter: 'Adding * Fuzzy Query',
      enterFilter: 'Fuzzy Search for Return',
      num: 'Please Enter Number',
      default: 'Please Input',
      quickly: 'Quick Selection',
      userAccount: 'Please enter account name',
      password: 'Please input password',
      copy: 'Please enter the exact value (which can be directly copied and pasted)',
      orderPlaceholder: 'Input doc No. / manual doc No. / application form / creator / Reviewer',
      usersPermissionPlaceholder: 'Input user number / user name',
      dataPermissionPlaceholder: 'Enter a dataset number or dataset name',
      rolesPermissionPlaceholder: 'Input roles number / roles name',
      orderObscurePlaceholder: 'Please enter doc No. for fuzzy query',
      channelPlaceholder: 'Enter channel number / channel name for fuzzy search',
      keywordPlaceholder: 'Enter keyword search',
      fieldsPlaceholder: 'Input field fuzzy search',
      configPlaceholder: 'Search configuration items',
      salePlainPlaceholder: 'Enter Plan No. / manual No. search',
      barcodePlaceholder: 'Please enter barcode',
      modulePlaceholder: 'Please enter module name fuzzy search',
      inputNumber: 'Entered quantity',
      goodsInput: 'Input Goods Code',
      skuInput: 'Select Color/InnerLong/Size',
      fuzzyGoodsFix: 'Input Goods Code To Fix',
      searchCompanyCodePlaceholder: 'Please enter Code / Name of logistics Company',
      projectPlaceholder: 'Please enter item name to search',
      mulitPlaceholder: 'Barcode / unique code / box number entry',
      barcodeInput: 'Bar code entry',
      onlyCodePlaceholder: 'onlyCodePlaceholder',
      boxInput: 'boxInput'
    },
    multSelect: 'Multiple selection',
    excatMult: 'Precise multiple selection '
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    screenfull: 'Screenfull',
    theme: 'Theme',
    size: 'Global Size',
    chinese: 'Chinese',
    english: 'English',
    about: 'About'
  },

  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  // Inform弹窗组件
  inform: {
    titleSuccess: 'Success Notification',
    titleError: 'Error Notification',
    titleInfo: 'Info Notification',
    titleWarning: 'Warning Notification',
    copyBtn: 'Copy',
    copySuccess: 'Copy Success',
    copyFail: 'The browser does not support automatic copying',
    singleConfirmBtn: 'I Know',
    confirmBtn: 'Confirm',
    cancelBtn: 'Cancel'
  },
  login: {
    title: 'Login Form',
    logIn: 'Log in',
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips:
      'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  batchErrorMsg: {
    success: 'success',
    fail: 'fail'
  },
  // 货品筛选组件
  goodsHighSearch: {
    title: 'Product Search',
    formlist: getZhDesc(goodsFormList, 'en')
  },
  userHighSearch: {
    title: 'User Search',
    formlist: getZhDesc(userFormList, 'en'),
    userTableColumn: getZhDesc(userTableColumn, 'en')

  },
  channelMenus: {
    code: 'Code',
    channelforms: 'Channel forms',
    channelLevel: 'Channel Level',
    theMethodOfpayment: 'The method of payment',
    areas: 'Area',
    organizationalStructure: 'Organizational structure',
    tagsType: 'Tags type',
    brand: 'brand',
    salesArea: 'sales Area',
    branchCompany: 'branch Company',
    area: {
      country: 'Country',
      region: 'Region',
      province: 'Province',
      city: 'City',
      apart: 'Apart'
    },
    classify: {
      level1: 'level One',
      level2: 'level two',
      level3: 'level three',
      level4: 'level four',
      level5: 'level five'
    },
    btn: {
      add: 'add',
      addCategory: 'add classify'
    }
  },
  // 货品配置
  goodsConfig: {
    color: 'Color',
    size: 'Size',
    shape: 'Shape',
    inTheLong: 'In The Long',
    category: 'Category',
    aSeriesOf: 'A Series Of',
    model: 'Model',
    style: 'Style',
    salesOfClassification: 'Sales Of Classification',
    year: 'Year',
    season: 'Season',
    band: 'Band',
    theFabric: 'The Fabric',
    sex: 'Sex',
    age: 'Age',
    exchangeCategory: 'Exchange Category',
    barCodeRules: 'Bar Code Rules',
    title: {
      colorGroup: 'Color Group',
      color: 'Color',
      barCodeRules: 'Bar Code Rules'
    },
    tableHeader: {
      colorGroupName: 'Color Group Name',
      colorNumber: 'Color  Number',
      colorDescription: 'Color Description',
      sizeCategories: 'Size Categories',
      sizeSpecification: 'Size Specification',
      shapeCategory: 'Shape Category',
      shapeDescription: 'Shape Description'
    }
  },
  // 数据权限
  datasetPermission: {
    list: {
      dialogHeader: 'Dataset list header configuration',
      tableHeader: getZhDesc(datasetPermission.list.tableHeader, 'en'),
      filter: getZhDesc(datasetPermission.list.formList, 'en')
    },
    detail: {
      formList: getZhDesc(datasetPermission.detail.formList, 'en'),
      anchorConfig: getZhDesc(datasetPermission.detail.anchorConfig as any[], 'en')
    },
    detailTabs: {
      userDataset: {
        tableHeader: getZhDesc(datasetPermission.detailTabs.userDataset.list, 'en')
      },

      mainChannel: 'Main Channel',
      minorChannel: 'Minor Channel',
      supplierProp: 'Supplier Prop',
      goodsProp: 'Goods Prop',

      dialogTitle: 'Add User',
      group: 'Condition group',
      addOptions: 'Adding conditions',
      noData: 'No conditions, please click Add',
      propFilter: 'Attribute selection',
      chooseArea: 'Selection area'
    }
  },
  // 用户权限的字条
  usersPermission: {
    list: {
      dialogHeader: 'users permission list header configuration',
      tableHeader: getZhDesc(usersPermission.list.tableHeader, 'en'),
      filter: getZhDesc(usersPermission.list.formList, 'en')
    },
    detail: {
      formList: getZhDesc(usersPermission.detail.formList, 'en')
    },
    tabs: {
      userConfig: {
        formList: getZhDesc(usersPermission.tabs.userConfig.list, 'en')
      },
      characterConfig: {
        fields: getZhDesc(usersPermission.tabs.characterConfig.list, 'en')
      },
      datasetConfig: {
        fields: getZhDesc(usersPermission.tabs.datasetConfig.list, 'en')
      },
      anchorConfig: {
        fields: getZhDesc(usersPermission.tabs.anchorConfig.list, 'en')
      }
    }
  },

  // 角色权限模块的字条
  rolesPermission: {
    list: {
      dialogHeader: 'Role permission list header configuration',
      tableHeader: getZhDesc(rolesPermission.list.tableHeader, 'en'),
      filter: getZhDesc(rolesPermission.list.formList, 'en')
    },
    detail: {
      formList: getZhDesc(rolesPermission.detail.formList, 'en'),
      anchorConfig: getZhDesc((rolesPermission.detail.anchorConfig as any[]), 'en')
    },
    page: 'page authorization',
    operation: 'operating authorization',
    fields: 'fields authorization',
    operateAll: 'Global Operation Settings',
    detailTabs: {
      moduleTab: {
        operateAll: 'Global Operation Settings',
        page: {
          name: 'page authorization'
        },
        operate: {
          name: 'operating authorization'
        },
        fields: {
          name: 'fields authorization',
          tableHeader: ['order number', 'fields']
        }
      },
      userTab: {
        tableHeader: getZhDesc(rolesPermission.detailTabs.userTab.list, 'en'),
        // dialogFormlist: getZhDesc(rolesPermission.detailTabs.userTab.addUserDialog.formList, 'en'),
        // dialogTableHeader: getZhDesc(rolesPermission.detailTabs.userTab.addUserDialog.tableColumn, 'en'),
        dialogTitle: 'Add User',
        deleteTips: 'Please select the option to delete first'
      }
    }
  },
  // 组织中心-渠道档案
  channelOrganization: {
    list: {
      dialogHeader: 'Channel file list header configuration',
      filter: getZhDesc(channelOrganization.list.formList, 'en')

    },
    highSearchDialog: {
      title: 'Channel Search',
      formlist: getZhDesc(channelOrganization.highSearchDialog.formList, 'en'),
      tableHeader: getZhDesc(channelOrganization.highSearchDialog.tableColumn, 'en')
    },
    detail: {
      formList: getZhDesc(channelOrganization.detail.formList, 'en')
    },
    tabs: {
      channelProperties: {
        formList: getZhDesc(channelOrganization.tabs.channelProperties.list, 'en')
      },
      financialInformation: {
        formList: getZhDesc(channelOrganization.tabs.financialInformation.list, 'en')
      },
      anchorConfig: {
        fields: getZhDesc(channelOrganization.tabs.anchorConfig.list, 'en')
      },
      salePolicy: getZhDesc(channelOrganization.tabs.salePolicy, 'en'),
      addSalePolicy: 'Add SalePolicy'

    }
  },
  // 组织中心-物流公司
  logisticsOrganization: {
    list: {
      tableHeader: getZhDesc(logisticsOrganization.list.tableHeader, 'en'),
      filter: getZhDesc(logisticsOrganization.list.formList, 'en')
    },
    detail: {
      formList: getZhDesc(logisticsOrganization.detail.formList, 'en'),
      barcodeInfo: getZhDesc(goodsFiels.detail.barcodeInfo, 'en')
    },
    tabs: {
      platformNumberSetting: {
        formList: getZhDesc(logisticsOrganization.tabs.platformNumberSetting.tableHeader, 'en')
      },
      anchorConfig: {
        fields: getZhDesc(logisticsOrganization.tabs.anchorConfig.list, 'en')
      }
    }
  },
  // 配置中心 系统字典
  systemDictionary: {
    tabs: getZhDesc(systemDictionary.tabs, 'en'),
    // files: getZhDesc(systemDictionary.filesOptions, 'en'),
    files: {
      goods: 'Goods Files',
      channel: 'Channel Files',
      supplier: 'Supplier Files',
      moduleConfig: 'Module Config',
      goodsAndChannel: 'Goods Files/Channel Files',
      moduleConfigAndChannel: 'Channel Files/Module Config'
    },

    templateConfig: {
      tableHeader: getObjZhDesc(systemDictionary.templateConfig, 'en'),
      label: 'Config Item',
      filesName: 'Record'
    }
  },
  // 配置中心 模块配置
  moduleConfig: {
    tabs: {
      list: 'List',
      detail: 'Detail'
    },
    list: {
      tableHeader: getZhDesc(moduleConfig.list.tableHeader, 'en'),
      filter: getZhDesc(moduleConfig.list.formList, 'en')
    },
    detail: {
      formList: getZhDesc(moduleConfig.detail.formList, 'en'),
      moduleProp: getZhDesc(moduleConfig.detail.moduleProp, 'en'),
      anchorConfig: getZhDesc(moduleConfig.detail.anchorConfig, 'en'),
      featuresConfig: getZhDesc(moduleConfig.detail.featuresConfig, 'en')
    },
    propFilterTabs: {
      tableHeader: {
        code: 'Channel Number',
        name: 'Channel Name'
      },
      supplier: {
        code: 'Supplier Number',
        name: 'Supplier Name'
      },
      goods: {
        code: 'Goods Number',
        name: 'Goods Name'
      }
    }
  },
  // 配置中心 字段配置
  fieldConfiguration: {
    tabs: {
      list: 'Custom Fields',
      detail: 'Module Field Configuration',
      productConfig: 'Module Product Fields Configuration'

    },
    list: {
      fieldsList: 'Fields List',
      fieldsProp: 'Fields Prop',
      fieldsListTableHeader: getZhDesc(fieldConfiguration.list.fieldsListTableHeader, 'en'),
      fieldsPropTableHeader: getZhDesc(fieldConfiguration.list.fieldsPropTableHeader, 'en'),
      langTableHeader: getZhDesc(fieldConfiguration.list.langTableHeader, 'en'),
      formList: getZhDesc(fieldConfiguration.list.fieldsPropFormlist, 'en'),
      filterFormList: getZhDesc(fieldConfiguration.list.filterFormList, 'en'),
      tableWarning: 'Please input the table name first'
    },
    moduleSettings: {
      addCustomField: 'New custom field',
      tableHeader: getZhDesc(fieldConfiguration.detail.tableHeader, 'en'),
      productConfigHeader: getZhDesc(fieldConfiguration.detail.productConfigHeader, 'en')
    },
    productConfig: 'Product Fields Config'

  },
  // 货品档案
  goodsFiels: {
    tabs: {
      list: 'List',
      detail: 'Detail'
    },
    list: {
      filter: getZhDesc(goodsFiels.list.formList, 'en')
    },
    detail: {
      formList: getZhDesc(goodsFiels.detail.formList, 'en'),
      productProp: getZhDesc(goodsFiels.detail.productProp, 'en'),
      anchorConfig: getZhDesc(goodsFiels.detail.anchorConfig, 'en'),
      goodsColor: getZhDesc(goodsFiels.detail.goodsColor, 'en'),
      barcodeInfo: getZhDesc(goodsFiels.detail.barcodeInfo, 'en')
    }
  },
  barcode: {
    list: {
      tableHeader: getZhDesc(barcode.list.tableHeader, 'en'),
      filsizeHeaderter: getZhDesc(barcode.list.sizeHeader, 'en'),
      createBarcode: {
        name: 'barcode generation',
        goodsSearch: 'goods Search',
        barcodeSearch: 'barcode Search',
        quickly: 'one touch'
      },
      // highSearchDialog: {
      //   title: 'Product Search',
      //   formlist: getZhDesc(barcode.highSearchDialog.formList)

      // },
      barcodeDialog: {
        formlist: getZhDesc(barcode.barcodeDialog.formList, 'en')
      },
      tabs: {
        name: 'Goods barcode'
      }
    }
  },
  supplie: {
    tabs: {
      list: 'List',
      detail: 'Detail'
    },
    list: {
      filter: getZhDesc(supplie.list.formList, 'en')
    },
    detail: {
      formList: getZhDesc(supplie.detail.formList, 'en'),
      supplieProp: getZhDesc(supplie.detail.supplieProp, 'en'),
      financialInfo: getZhDesc(supplie.detail.financialInfo, 'en'),
      shipAddress: getZhDesc(supplie.detail.shipAddress, 'en'),
      contacts: getZhDesc(supplie.detail.contacts, 'en'),
      anchorConfig: getZhDesc(supplie.detail.anchorConfig, 'en'),
      addAdress: 'Add Adress',
      addContacts: 'Add Contacts'
    },
    highSearchDialog: {
      title: 'Supplie Search',
      formlist: getZhDesc(supplie.highSearchDialog.formList, 'en')
    }
  },
  // 终端物流
  terminalLogistics: {
    tabs: {
      list: 'List',
      detail: 'Detail'
    },
    list: {
      tableHeader: getZhDesc(terminalLogistics.list.tableHeader, 'en'),
      filter: getZhDesc(terminalLogistics.list.formList, 'en')
    },
    detail: {
      formList: getZhDesc(terminalLogistics.detail.formList, 'en'),
      tabsList: getZhDesc(terminalLogistics.detail.tabsList, 'en'),
      freight: getZhDesc(terminalLogistics.detail.freight, 'en'),
      adjustmentRecord: getZhDesc(terminalLogistics.detail.adjustmentRecord, 'en'),
      adjustmentDetail: getZhDesc(terminalLogistics.detail.adjustmentDetail, 'en'),
      difference: getZhDesc(terminalLogistics.detail.differenceDetail, 'en'),
      associationBox: getZhDesc(terminalLogistics.detail.associationBox, 'en'),
      uniqueCode: getZhDesc(terminalLogistics.detail.uniqueCode, 'en'),
      totalInfo: getZhDesc(terminalLogistics.detail.totalInfo, 'en')
    },
    recordLog: {
      formList: getZhDesc(terminalLogistics.recordLogObj.formList, 'en'),
      tableHeader: getZhDesc(terminalLogistics.recordLogObj.tableHeader, 'en')
    }
  },
  // 销售计划
  salePlain: {
    tabs: {
      list: 'List',
      detail: 'Detail'
    },
    list: {
      tableHeader: getZhDesc(salePlain.list.tableHeader, 'en'),
      filter: getZhDesc(salePlain.list.formList, 'en')
    },
    detail: {
      formList: getZhDesc(salePlain.detail.formList, 'en'),
      tabsList: getZhDesc(salePlain.detail.tabsList, 'en'),
      // goodsDetail: {
      //   detailTableHeader: getZhDesc(salePlain.detail.goodsDetail.detailTableHeader, 'en')
      // },
      freight: getZhDesc(salePlain.detail.freight, 'en'),
      adjustmentRecord: getZhDesc(salePlain.detail.adjustmentRecord, 'en'),
      adjustmentDetail: getZhDesc(salePlain.detail.adjustmentDetail, 'en')
    },
    recordLog: {
      formList: getZhDesc(salePlain.recordLogObj.formList, 'en'),
      tableHeader: getZhDesc(salePlain.recordLogObj.tableHeader, 'en')
    }
  },
  // 销售计划调整
  salePlainAdjustment: {
    tabs: {
      list: 'List',
      detail: 'Detail'
    },
    list: {

      filter: getZhDesc(salePlainAdjustment.list.formList, 'en')
    },
    detail: {
      formList: getZhDesc(salePlainAdjustment.detail.formList, 'en'),
      tabsList: getZhDesc(salePlainAdjustment.detail.tabsList, 'en')
    },
    recordLog: {
      formList: getZhDesc(salePlainAdjustment.recordLogObj.formList, 'en'),
      tableHeader: getZhDesc(salePlainAdjustment.recordLogObj.tableHeader, 'en')
    },
    titleDialog: 'Sales plan filter'
  },
  // 配货指令单
  distributionPlain: {
    tabs: {
      list: 'List',
      detail: 'Detail'
    },
    list: {
      filter: getZhDesc(distributionPlain.list.formList, 'en')
    },
    detail: {
      formList: getZhDesc(distributionPlain.detail.formList, 'en'),
      tabsList: getZhDesc(distributionPlain.detail.tabsList, 'en'),
      freight: getZhDesc(distributionPlain.detail.freight, 'en')
    },
    recordLog: {
      formList: getZhDesc(distributionPlain.recordLogObj.formList, 'en'),
      tableHeader: getZhDesc(distributionPlain.recordLogObj.tableHeader, 'en')
    },
    titleDialog: 'Sales plan filter'
  },
  packingWorktop: {
    tabs: {
      list: 'List',
      detail: 'Detail'
    },
    btns: {
      packing: 'Packing',
      continuePacking: 'Continue Packing',
      manualClosure: 'manualClosure',
      cancelMerger: 'cancelMerger'
    },
    list: {
      tableHeader: getZhDesc(packingWorktop.list.tableHeader, 'en'),
      filter: getZhDesc(packingWorktop.list.formList, 'en'),
      devlierPlainDailog: {
        tableHeader: getZhDesc(packingWorktop.list.devlierPlainDialog.tableHeader, 'en'),
        formList: getZhDesc(packingWorktop.list.devlierPlainDialog.formList, 'en'),
        title: 'Merge into delivery plan'
      },
      oneClickMergeDialog: {
        title: 'One Click Merge',
        planType: 'Plan Type'
      },
      deliverPlanDetailDialog: {
        title: 'Delivery plan details'
      }

    },
    detail: {
      btns: {
        createBox: 'Create Box',
        finishBox: 'Finish Box',
        mergeBox: 'Merge Box',
        adjustmentBox: 'Adjustment Box',
        directDelivery: 'Direct Delivery',
        invalidBox: 'Invalid Box',
        completeOrder: 'Complete Order',
        relieveBox: 'Relieve Box',
        restart: 'Restart'
      },
      tabsList: getZhDesc(packingWorktop.detail.tabsList, 'en'),
      formList: getZhDesc(packingWorktop.detail.formList, 'en'),
      createBoxDialog: {
        formList: getZhDesc(packingWorktop.detail.createBoxDialog.formList, 'en'),
        title: 'createBox'
      },
      finishDialog: {
        formList: getZhDesc(packingWorktop.detail.finishDialog.formList, 'en'),
        title: 'finishBox'
      },
      packingDetail: {
        packingTableHeader: getZhDesc(packingWorktop.detail.packingDetail.packingTableHeader, 'en'),
        skuTableHeader: getZhDesc(packingWorktop.detail.packingDetail.skuTableHeader, 'en'),
        differTableHeader: getZhDesc(packingWorktop.detail.packingDetail.differTableHeader, 'en'),
        checkOnlyCodeDialog: {
          title: 'check Onlycode'
        }
      }
    }
  },
  // 菜单配置
  menuConfig: {
    menuTableHeader: getZhDesc(menuConfig.menuTableHeader, 'en'),
    moduleTableHeader: getZhDesc(menuConfig.moduleTableHeader, 'en'),
    addMenu: 'add Menu',
    addToMenu: 'add To Menu',
    menu: 'Menu',
    module: 'Module',
    addCategory: 'add Category',
    editCategory: 'edit Category'
  }
}
