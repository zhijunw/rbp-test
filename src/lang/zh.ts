
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
import { deliver } from '../views/logisticsCenter/deliver/configs'
// import { salePlainAdjustment } from '../views/sale-center/sale-plain-adjustment/configs'
import { salePlainAdjustment } from '../views/sale-center/sale-plain-adjustment/configs'
import { distributionPlain } from '../views/sale-center/distribution-plain/configs'
import { terminalLogistics } from '../views/retail-center/terminal-logistics/configs'
import {
  goodsFormList,
  userFormList,
  userTableColumn,
  instructionSheetFormList,
  instructionSheetTableColumn
} from '@/layout-components/vip-dialog/config'
import { packingWorktop } from '../views/sale-center/packing-worktop/configs'
import { getZhDesc, getObjZhDesc } from './tool'

// @ts-ignore
import { menuConfig } from '../views/configCenter/menu-config/configs'
// @ts-ignore
export default {
  mainMenu: {
    businessCenter: '业务中心',
    newspaperCenter: '数据中心',
    version: '版本',
    currentVersion: '当前版本',
    updateContent: '更新内容',
    content: '销售订单中英文切换'
  },
  // 共用 route 字条
  route: {
    dashboard: '首页',
    // 采购
    purchase: '采购',
    purchaseOrder: '采购订单',
    purchaseGoods: '采购收货',
    plannedOrder: '计划单',
    instructOrder: '指令单',
    // 自定义主题
    customTheme: '自定义主题',
    // 权限控制
    permission: '权限中心',
    usersPermission: '用户权限',
    rolesPermission: '角色权限',
    datasetPermission: '数据权限',
    // 组织中心
    organization: '组织中心',
    channelOrganization: '渠道档案',
    supplier: '供应商档案',
    logistics: '物流公司资料',
    // 配置中心
    configCenter: '配置中心',
    fieldConfig: '字段配置',
    channelConfig: '渠道配置',
    goodsConfig: '货品配置',
    globalConfig: '系统配置',
    printConfig: '打印配置',
    addPrintConfig: '添加打印配置',
    systemDictionary: '系统字典',
    moduleConfig: '模块配置',
    menuConfig: '菜单管理',
    // 货品中心
    contentCenter: '内容中心',
    goodsFiels: '货品档案',
    barcode: '条形码档案',
    // 报表中心
    reportCenter: '报表中心',
    goodsReport: '货品报表',
    orderDetailReport: '订单明细报表',
    // 销售计划
    sale: '销售单据',
    salePlain: '销售计划',
    salePlainAdjustment: '销售计划调整',
    distributionPlain: '配货指令单',
    packingWorkTop: '装箱工作台',
    // 工具路由
    printPreview: '打印',
    socketList: '任务列表',
    bpmnView: '流程设计器',
    // 审核工作流
    auditActivity: '审核工作流',
    auditConfig: '审核配置',
    auditList: '审核工作台',
    // 物流中心
    logistic: '物流中心',
    deliver: '发货单',
    // 终端物流
    retailCenter: '零售中心',
    terminalLogistics: '终端物流'

  },
  // 共用 navbar 字条
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
    screenfull: '全屏',
    theme: '换肤',
    size: '布局大小',
    chinese: '中文',
    english: '英文',
    about: '关于'
  },
  // 共用导航切换 tag 字条
  tagsView: {
    refresh: '刷新',
    close: '关闭当前',
    closeOthers: '关闭其他',
    closeAll: '关闭全部'
  },
  // 共用 login 字条
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  // 公用词条
  commonWord: {
    zh: '中文',
    en: '英文',
    login: '登录',
    allSelect: '全选',
    allData: '全部',
    reverseSelection: '反选',
    optionalField: '可选字段',
    selectedFields: '已选字段',
    defaultPlain: '默认方案',
    loadMore: '拼命加载中...',
    noMoreData: '暂无更多数据',
    noData: '暂无数据',
    tips: '提示',
    confirm: '确认',
    cancel: '取消',
    pass: '通过',
    reject: '驳回',
    layoutName: '布局名称',
    saveLayout: '保存布局',
    deleteLayoutTips: '是否确认删除布局',
    delteLayout: '删除布局',
    deleteTag: '是否要删除该属性',
    success: '操作成功',
    saveEdit: '请先保存编辑内容',
    notSelect: '请勾选删除项',
    noDataWarning: '请先选择单据',
    noContentWarning: '请先选择内容',
    option: '选项',
    add: '添加',
    lang: '多语言',
    attrFilter: '属性筛选',
    positiveFilter: '正向筛选',
    reverseFilter: '反向排除',
    selectedList: '已选项',
    queryResult: '查询条件',
    sureDelete: '确定要删除单据？',
    infoBarcode: '可扫描/录入条形码',
    chooseArea: '选择区域',
    text: '文本输入',
    number: '数值输入',
    select: '下拉单选',
    datePick: '日期时间',
    hasChooseChannel: '已选列表',
    actionSuccess: '{action}成功',
    name: '名称',
    open: '展开',
    packUp: '收起',
    scanRecord: '扫码记录',
    input: '录入',
    fix: '定位',
    showGoodsImage: '显示商品图片',
    inputNumber: '填写数量',
    goodsImage: '货品图片',
    operation: '操作',
    operator: '操作人',
    belongModule: '所属模块',
    project: '项目',
    operateTime: '操作时间',
    numberText: '数量',
    noBarcodeData: '暂无扫码记录',
    fieldsSort: '字段顺序排序',
    fieldsSortConfig: '字段顺序配置',
    importTitle: '从excel导入',
    importScheme: '导入方案',
    printName: '方案名称',
    addPlain: '新增方案',
    editPlainName: '修改方案名称',
    flowTypeName: '工作流名称',
    status: '状态',
    preview: '预览',
    more: '更多',
    auditInfo: '审核生效后，单据不可再编辑',
    commitInvalid: '提交作废',
    commitRestore: '提交恢复',
    operationTime: '操作时间',
    approvalLevel: '层级审批',
    auditComments: '审批意见',
    billType: '单据类型',
    approval: '审批',
    download: '下载',
    checkMore: '查看更多',
    cancelMerger: '撤销合并',
    operateResult: '操作结果',
    placeSelectFileType: '请选择文件类型',
    downloadSampleFile: '下载样表文件',
    checkOnlyCode: '查看唯一码',
    printingManagement: '打印管理方案',
    boxNo: '箱号',
    color: '颜色',
    size: '尺码',
    search: '查询',
    onlyKey: '唯一码',
    sellPlan: '发货计划',
    up: '上移',
    down: '下移',
    addChildrenCategory: '添加二级分类'
  },
  reportCommonWord: {
    title: '标题',
    chooseData: '选择日期',
    addLayout: '新建布局',
    managePersonLayout: '管理个人布局',
    manageAdminLayout: '管理系统布局',
    layoutName: '视图名称',
    layoutCreatTime: '创建时间',
    saleReport: '销售报表',
    person: '个人视图',
    admin: '系统视图',
    layoutConfig: '视图配置',
    SaveSystemView: '存为系统视图',
    createdView: '创建视图成功',
    editViewSuccess: '更新视图成功',
    deleteView: '确定要删除视图吗?',
    placeInputViewName: '请输入视图名称',
    outputFields: '输出字段',
    saveAsCurrentView: '保存到当前视图',
    saveAsNewView: '另存为新视图',
    index: '序号',
    fields: '字段',
    total: '合计',
    layout: '布局',
    goodsName: '品名',
    goodsCode: '货号',
    quantity: '数量',
    oweQuantity: '欠数'
  },
  // 共用页面布局 字条
  layout: {
    tabs: {
      list: '列表',
      detail: '详情'
    },
    btns: {
      new: '新建单据',
      batchAudit: '审核',
      batchReverseAudit: '反审核',
      batchCharge: '冲销',
      batchPost: '过账',
      batchImport: '导入',
      tabelheaderConfig: '表头配置',
      backTop: '回到顶部',
      batchExport: '批量导出',
      singleExport: '导出',
      batchReceive: '批量完成收货',
      batchHandle: '批量差异处理',
      batchDelete: '删除',
      batchInvalid: '作废',
      batchDisable: '禁用',
      batchEnable: '启用',
      BatchInvalid: '作废',
      filters: '筛选器',
      integratedQuery: '相关功能',
      relatedModules: '相关模块',
      relatedReports: '相关报表',
      relatedWeb: '相关网页',
      batchPrint: '批量打印',
      batchCheck: '批量查看',
      query: '查询',
      clearQuery: '清空条件',
      checkDetail: '详情',
      operation: '操作',
      save: '保存',
      copy: '复制',
      saveLayout: '保存布局',
      saveNewLayout: '保存新布局',
      sure: '确定',
      close: '关闭',
      cancel: '取消',
      directFilter: '直接筛选',
      edit: '编辑',
      filter: '筛选',
      add: '添加',
      disable: '停用',
      sort: '排序',
      delete: '删除',
      confirm: '确认',
      reset: '重置',
      addRoles: '添加角色',
      checkbox: '全部',
      themerger: '合并计划单',
      synthesize: '综合查询',
      addChannel: '新建渠道',
      addFields: '新增字段',
      addCategory: '新增分类',
      addGoodsFiels: '新增货品',
      addColor: '新增颜色',
      addFile: '新建档案',
      addModule: '新建模块',
      addView: '新增视图',
      addActivity: '新增工作流',
      approval: '审批',
      packing: '无指令装箱',
      merge: '一键合并',
      mergeDeliveryPlan: '合并为发货计划',
      print: '打印',
      deliveryByorder: '按单发货',
      directDelivery: '直接发货'
    },
    divider: {
      open: '展开',
      pickUp: '收起'
    },
    pagination: {
      total: '共{total}条记录, {pageNo}/{pageCount}'
    }
  },
  // 共用 form 表格字条
  form: {
    placeholder: {
      startDate: '开始日期',
      endDate: '结束日期',
      startMonth: '开始月份',
      endMonth: '结束月份',
      chooseDate: '请选择日期',
      chooseMonth: '请选择月份',
      chooseYear: '请选择年份',
      chooseWeek: '请选择周',
      fuzzySearch: '模糊搜索',
      select: '请选择',
      input: '请输入 {msg}',
      filter: '添加*可模糊查询',
      enterFilter: '回车可模糊搜索',
      option: '请输入新增项',
      num: '请输入数量',
      userAccount: '请输入账户名',
      password: '请输入密码',
      default: '请输入',
      quickly: '快速选择',
      copy: '请输入精确值(可直接复制粘贴)',
      orderPlaceholder: '输入单号/手动单号/申请单/制单人/审核人',
      usersPermissionPlaceholder: '输入用户编号/用户名称',
      rolesPermissionPlaceholder: '输入角色编号/角色名称',
      dataPermissionPlaceholder: '输入数据集编号或数据集名称',
      fieldsPlaceholder: '输入字段模糊搜索',
      orderObscurePlaceholder: '输入单号模糊搜索',
      channelPlaceholder: '输入渠道编号/渠道名称模糊搜索',
      keywordPlaceholder: '输入关键词搜索',
      goodsFielsPlaceholder: '输入货号模糊搜索',
      configPlaceholder: '搜索配置项',
      salePlainPlaceholder: '输入计划单号/手工单号搜索',
      terminalLogisticsPlaceholder: '输入单据编号/手工单号搜索',
      barcodePlaceholder: '请录入条形码',
      keywordsPlaceholder: '输入关键字过滤',
      modulePlaceholder: '请输入模块名称模糊搜索',
      inputNumber: '录入数量',
      goodsInput: '录入货号',
      skuInput: '请选择颜色/内长/尺码',
      fuzzyGoodsFix: '输入货号定位',
      searchCompanyCodePlaceholder: '搜索公司编号/名称',
      projectPlaceholder: '请输入项目名称搜索',
      mulitPlaceholder: '条形码/唯一码/箱数录入',
      barcodeInput: '条形码录入',
      onlyCodePlaceholder: '唯一码录入',
      boxInput: '箱号录入'
    },
    multSelect: '多选',
    excatMult: '精确多选'
  },
  // 共用按钮组字条
  operationGroup: {
    btns: {
      add: '新建单据',
      newAdd: '新增',
      addRoles: '添加角色',
      query: '查询',
      new: '新增',
      invalid: '作废',
      delete: '删除',
      edit: '修改',
      cancel: '取消',
      save: '保存',
      audit: '审核',
      unaudit: '反审核',
      enable: '启用',
      disable: '禁用',
      prev: '上一条',
      next: '下一条',
      export: '导出',
      import: '导入',
      print: '打印',
      restore: '恢复',
      record: '操作记录',
      copy: '复制',
      addChannel: '新建渠道',
      create: '新建',
      close: '关闭',
      refresh: '刷新'
    },
    billDesc: '单据状态',
    enableStatusDesc: '启用状态',
    status: {
      unaudit: '未审核',
      reverseAudit: '反审核',
      audit: '已审核',
      enable: '启用',
      disable: '禁用',
      invalid: '已作废'
    },
    pedingStatus: {
      1: '待审批',
      2: '审批中',
      3: '已驳回',
      4: '已通过'
    },
    sex: {
      man: '男',
      woman: '女'
    },
    type: {
      user: '员工',
      admin: '管理员'
    }
  },
  dialogPrompt: {
    delete: '此操作将永久删除该文件, 是否继续?',
    cancel: '数据尚未保存，是否放弃？',
    audit: '是否要审核单据?',
    unaudit: '是否要反审核单据?',
    deleteItem: '是否删除此选项?',
    invalid: '是否作废该单据',
    enable: '是否要启用单据?',
    disable: '是否要禁用单据?',
    able: '是否要启用单据?',
    batchDelete: '是否删除该列全部选项?',
    save: '是否要保存单据?',
    prepare: '是否要预制发票?',
    sainternationalCode: '是否要保存国际码7位?',
    unPrepare: '是否要取消预制发票?',
    restore: '是否要恢复单据',
    commitAudit: '是否确定提交审核',
    commitInvalid: '是否确定提交作废',
    commitRestore: '是否确定提交恢复'

  },
  saveRules: {
    saveText: '是否保存单据？'
  },
  dialog: {
    confirmButtonText: '是',
    cancelButtonText: '否',
    info: '提示',
    error: '错误'
  },
  // Inform弹窗组件
  inform: {
    titleSuccess: '成功通知',
    titleError: '错误通知',
    titleInfo: '提示通知',
    titleWarning: '警告通知',
    copyBtn: '一键复制',
    copySuccess: '复制成功',
    copyFail: '该浏览器不支持自动复制',
    singleConfirmBtn: '我知道了',
    confirmBtn: '确定',
    cancelBtn: '取消'
  },
  // 批量操作
  batchErrorMsg: {
    success: '成功',
    fail: '失败'
  },
  // 货品筛选组件
  goodsHighSearch: {
    title: '货品筛选器',
    formlist: getZhDesc(goodsFormList)
  },
  userHighSearch: {
    title: '用户筛选器',
    formlist: getZhDesc(userFormList),
    userTableColumn: getZhDesc(userTableColumn)
  },
  // 渠道配置
  channelMenus: {
    code: '编号',
    channelforms: '渠道业态',
    channelLevel: '渠道等级',
    theMethodOfpayment: '结算方式',
    areas: '区域',
    organizationalStructure: '组织架构',
    tagsType: '吊牌价类型',
    brand: '品牌',
    salesArea: '销售区域',
    branchCompany: '分公司',
    area: {
      country: '国家',
      region: '大区',
      province: '省份',
      city: '城市',
      apart: '区域'
    },
    classify: {
      level1: '一级',
      level2: '二级',
      level3: '三级',
      level4: '四级',
      level5: '五级'
    },
    btn: {
      add: '新增',
      addCategory: '增加分类'
    }
  },
  // 货品配置
  goodsConfig: {
    color: '颜色',
    size: '尺码',
    shape: '号型',
    category: '类别',
    inTheLong: '内长',
    aSeriesOf: '系列',
    model: '款型',
    style: '风格',
    salesOfClassification: '销售分类',
    year: '年份',
    season: '季节',
    band: '波段',
    theFabric: '面料',
    sex: '性别',
    age: '年龄段',
    exchangeCategory: '换货类别',
    barCodeRules: '条码规则',
    title: {
      colorGroup: '颜色组',
      color: '颜色',
      barCodeRules: '条码规则'
    },
    tableHeader: {
      colorGroupName: '颜色组名称',
      colorNumber: '颜色编号',
      colorDescription: '颜色说明',
      sizeCategories: '尺码类别',
      sizeSpecification: '尺码说明',
      shapeCategory: '号型类别',
      shapeDescription: '号型说明'
    }
  },

  // 数据权限
  datasetPermission: {
    list: {
      dialogHeader: '数据集列表表头配置',
      tableHeader: getZhDesc(datasetPermission.list.tableHeader),
      filter: getZhDesc(datasetPermission.list.formList)
    },
    detail: {
      formList: getZhDesc(datasetPermission.detail.formList),
      anchorConfig: getZhDesc(datasetPermission.detail.anchorConfig as any[])
    },
    detailTabs: {
      userDataset: {
        tableHeader: getZhDesc(datasetPermission.detailTabs.userDataset.list)
      },
      mainChannel: '主渠道',
      minorChannel: '次渠道',
      supplierProp: '供应商参数',
      goodsProp: '货品参数',

      dialogTitle: '添加用户',
      group: '条件组',
      addOptions: '添加条件',
      noData: '暂无条件，请点添加',
      propFilter: '属性筛选',
      chooseArea: '选择区域'
    }
  },
  // 用户权限模块的 字条
  usersPermission: {
    list: {
      dialogHeader: '用户权限列表表头配置',
      tableHeader: getZhDesc(usersPermission.list.tableHeader),
      filter: getZhDesc(usersPermission.list.formList)
    },
    detail: {
      formList: getZhDesc(usersPermission.detail.formList)
    },
    tabs: {
      userConfig: {
        formList: getZhDesc(usersPermission.tabs.userConfig.list)
      },
      characterConfig: {
        fields: getZhDesc(usersPermission.tabs.characterConfig.list)
      },
      datasetConfig: {
        fields: getZhDesc(usersPermission.tabs.datasetConfig.list)
      },
      anchorConfig: {
        fields: getZhDesc(usersPermission.tabs.anchorConfig.list)
      }
    }
  },

  // 角色权限模块的字条
  rolesPermission: {
    list: {
      dialogHeader: '角色权限列表表头配置',
      tableHeader: getZhDesc(rolesPermission.list.tableHeader),
      filter: getZhDesc(rolesPermission.list.formList)
    },
    detail: {
      formList: getZhDesc(rolesPermission.detail.formList),
      anchorConfig: getZhDesc((rolesPermission.detail.anchorConfig as any[]))
    },
    page: '页面权限',
    operation: '操作权限',
    fields: '字段权限',
    operateAll: '全局操作设置',
    detailTabs: {
      moduleTab: {
        operateAll: '全局操作设置',
        page: {
          name: '页面权限'
        },
        operate: {
          name: '操作权限'
        },
        fields: {
          name: '字段权限',
          tableHeader: ['序号', '字段']
        }
      },
      userTab: {
        tableHeader: getZhDesc(rolesPermission.detailTabs.userTab.list),
        // dialogFormlist: getZhDesc(rolesPermission.detailTabs.userTab.addUserDialog.formList),
        // dialogTableHeader: getZhDesc(rolesPermission.detailTabs.userTab.addUserDialog.tableColumn),
        dialogTitle: '添加用户',
        deleteTips: '请先选择要删除的选项'
      }
    }
  },

  // 组织中心-物流公司资料
  logisticsOrganization: {
    list: {
      tableHeader: getZhDesc(logisticsOrganization.list.tableHeader),
      filter: getZhDesc(logisticsOrganization.list.formList)
    },
    detail: {
      formList: getZhDesc(logisticsOrganization.detail.formList),
      barcodeInfo: getZhDesc(goodsFiels.detail.barcodeInfo)
    },
    tabs: {
      platformNumberSetting: {
        formList: getZhDesc(logisticsOrganization.tabs.platformNumberSetting.tableHeader)
      },
      anchorConfig: {
        fields: getZhDesc(logisticsOrganization.tabs.anchorConfig.list)
      }
    }
  },
  // 组织中心-渠道档案
  channelOrganization: {
    list: {
      dialogHeader: '渠道档案列表表头配置',

      filter: getZhDesc(channelOrganization.list.formList)
    },
    highSearchDialog: {
      title: '渠道筛选器',
      formlist: getZhDesc(channelOrganization.highSearchDialog.formList),
      tableHeader: getZhDesc(channelOrganization.highSearchDialog.tableColumn)
    },
    detail: {
      formList: getZhDesc(channelOrganization.detail.formList)
    },
    tabs: {
      channelProperties: {
        formList: getZhDesc(channelOrganization.tabs.channelProperties.list)
      },
      financialInformation: {
        formList: getZhDesc(channelOrganization.tabs.financialInformation.list)
      },
      anchorConfig: {
        fields: getZhDesc(channelOrganization.tabs.anchorConfig.list)
      },
      salePolicy: getZhDesc(channelOrganization.tabs.salePolicy),
      addSalePolicy: '添加销售类别'
    }
  },
  // 配置中心 系统字典
  systemDictionary: {
    tabs: getZhDesc(systemDictionary.tabs),
    // files: getZhDesc(systemDictionary.filesOptions),
    files: {
      goods: '货品档案',
      channel: '渠道档案',
      supplier: '供应商档案',
      moduleConfig: '模块配置',
      goodsAndChannel: '货品档案/渠道档案',
      moduleConfigAndChannel: '渠道档案/模块配置'
    },
    templateConfig: {
      tableHeader: getObjZhDesc(systemDictionary.templateConfig),
      label: '配置项',
      filesName: '所属档案'
    }
  },
  // 配置中心 模块配置
  moduleConfig: {
    tabs: {
      list: '列表',
      detail: '详情'
    },
    list: {
      tableHeader: getZhDesc(moduleConfig.list.tableHeader),
      filter: getZhDesc(moduleConfig.list.formList)
    },
    detail: {
      formList: getZhDesc(moduleConfig.detail.formList),
      moduleProp: getZhDesc(moduleConfig.detail.moduleProp),
      anchorConfig: getZhDesc(moduleConfig.detail.anchorConfig),
      featuresConfig: getZhDesc(moduleConfig.detail.featuresConfig)
    },
    propFilterTabs: {
      tableHeader: {
        code: '渠道编号',
        name: '渠道名称'
      },
      supplier: {
        code: '渠道编号',
        name: '渠道名称'
      },
      goods: {
        code: '货品编号',
        name: '货品名称'
      }
    }
  },
  // 配置中心 字段配置
  fieldConfiguration: {
    tabs: {
      list: '自定义字段',
      detail: '模块字段配置',
      productConfig: '模块货品字段配置'
    },
    list: {
      fieldsList: '字段列表',
      fieldsProp: '字段属性',
      fieldsListTableHeader: getZhDesc(fieldConfiguration.list.fieldsListTableHeader),
      fieldsPropTableHeader: getZhDesc(fieldConfiguration.list.fieldsPropTableHeader),
      langTableHeader: getZhDesc(fieldConfiguration.list.langTableHeader),
      formList: getZhDesc(fieldConfiguration.list.fieldsPropFormlist),
      filterFormList: getZhDesc(fieldConfiguration.list.filterFormList),
      tableWarning: '请先输入表名'
    },
    moduleSettings: {
      addCustomField: '新增自定义字段',
      tableHeader: getZhDesc(fieldConfiguration.detail.tableHeader),
      productConfigHeader: getZhDesc(fieldConfiguration.detail.productConfigHeader)

    },
    productConfig: '货品字段配置'
  },
  // 货品档案
  goodsFiels: {
    tabs: {
      list: '列表',
      detail: '详情'
    },
    list: {
      filter: getZhDesc(goodsFiels.list.formList)
    },
    detail: {
      formList: getZhDesc(goodsFiels.detail.formList),
      productProp: getZhDesc(goodsFiels.detail.productProp),
      anchorConfig: getZhDesc(goodsFiels.detail.anchorConfig),
      goodsColor: getZhDesc(goodsFiels.detail.goodsColor),
      barcodeInfo: getZhDesc(goodsFiels.detail.barcodeInfo)
    }
  },
  // 条形码档案
  barcode: {
    list: {
      tableHeader: getZhDesc(barcode.list.tableHeader),
      sizeHeader: getZhDesc(barcode.list.sizeHeader),
      createBarcode: {
        name: '批量生成条码',
        goodsSearch: '搜货品',
        barcodeSearch: '搜条码',
        quickly: '一键生成'
      }
    },
    // highSearchDialog: {
    //   title: '货品筛选器',
    //   formlist: getZhDesc(barcode.highSearchDialog.formList)
    // },
    barcodeDialog: {
      formlist: getZhDesc(barcode.barcodeDialog.formList)
    },
    tabs: {
      name: '货品条码'
    }
  },
  // 供应商档案
  supplie: {
    tabs: {
      list: '列表',
      detail: '详情'
    },
    list: {
      filter: getZhDesc(supplie.list.formList)
    },
    detail: {
      formList: getZhDesc(supplie.detail.formList),
      supplieProp: getZhDesc(supplie.detail.supplieProp),
      financialInfo: getZhDesc(supplie.detail.financialInfo),
      shipAddress: getZhDesc(supplie.detail.shipAddress),
      contacts: getZhDesc(supplie.detail.contacts),
      anchorConfig: getZhDesc(supplie.detail.anchorConfig),
      addAdress: '添加地址',
      addContacts: '添加联系人'

    },
    highSearchDialog: {
      title: '供应商筛选器',
      formlist: getZhDesc(supplie.highSearchDialog.formList)
    }
  },
  // 终端物流
  terminalLogistics: {
    tabs: {
      list: '列表',
      detail: '详情'
    },
    list: {
      tableHeader: getZhDesc(terminalLogistics.list.tableHeader),
      filter: getZhDesc(terminalLogistics.list.formList)
    },
    detail: {
      formList: getZhDesc(terminalLogistics.detail.formList),
      tabsList: getZhDesc(terminalLogistics.detail.tabsList),
      freight: getZhDesc(terminalLogistics.detail.freight),
      adjustmentRecord: getZhDesc(terminalLogistics.detail.adjustmentRecord),
      adjustmentDetail: getZhDesc(terminalLogistics.detail.adjustmentDetail),
      difference: getZhDesc(terminalLogistics.detail.differenceDetail),
      associationBox: getZhDesc(terminalLogistics.detail.associationBox),
      uniqueCode: getZhDesc(terminalLogistics.detail.uniqueCode),
      totalInfo: getZhDesc(terminalLogistics.detail.totalInfo)
    },
    recordLog: {
      formList: getZhDesc(terminalLogistics.recordLogObj.formList),
      tableHeader: getZhDesc(terminalLogistics.recordLogObj.tableHeader)
    },
    titleDialog: '发货单筛选器'
  },
  // 销售计划
  salePlain: {
    tabs: {
      list: '列表',
      detail: '详情'
    },
    list: {
      filter: getZhDesc(salePlain.list.formList)
    },
    detail: {
      formList: getZhDesc(salePlain.detail.formList),
      tabsList: getZhDesc(salePlain.detail.tabsList),

      freight: getZhDesc(salePlain.detail.freight),
      adjustmentRecord: getZhDesc(salePlain.detail.adjustmentRecord),
      adjustmentDetail: getZhDesc(salePlain.detail.adjustmentDetail)
    },
    recordLog: {
      formList: getZhDesc(salePlain.recordLogObj.formList),
      tableHeader: getZhDesc(salePlain.recordLogObj.tableHeader)
    }
  },
  // 销售计划调整
  salePlainAdjustment: {
    tabs: {
      list: '列表',
      detail: '详情'
    },
    list: {

      filter: getZhDesc(salePlainAdjustment.list.formList)
    },
    detail: {
      formList: getZhDesc(salePlainAdjustment.detail.formList),
      tabsList: getZhDesc(salePlainAdjustment.detail.tabsList)
    },
    recordLog: {
      formList: getZhDesc(salePlainAdjustment.recordLogObj.formList),
      tableHeader: getZhDesc(salePlainAdjustment.recordLogObj.tableHeader)
    },
    titleDialog: '销售计划筛选器'
  },
  // 配货指令单
  distributionPlain: {
    tabs: {
      list: '列表',
      detail: '详情'
    },
    list: {
      filter: getZhDesc(distributionPlain.list.formList)
    },
    detail: {
      formList: getZhDesc(distributionPlain.detail.formList),
      tabsList: getZhDesc(distributionPlain.detail.tabsList),
      freight: getZhDesc(distributionPlain.detail.freight)
    },
    recordLog: {
      formList: getZhDesc(distributionPlain.recordLogObj.formList),
      tableHeader: getZhDesc(distributionPlain.recordLogObj.tableHeader)
    },
    titleDialog: '销售计划筛选器',
    highSearchDialog: {
      title: '指令单筛选器',
      formlist: getZhDesc(instructionSheetFormList),
      tableHeader: getZhDesc(instructionSheetTableColumn)
    }
  },
  // 装箱工作台
  packingWorktop: {
    tabs: {
      list: '列表',
      detail: '详情'
    },
    btns: {
      packing: '开始装箱',
      continuePacking: '继续装箱',
      manualClosure: '手动完结',
      cancelMerger: '撤销合并'
    },
    list: {
      tableHeader: getZhDesc(packingWorktop.list.tableHeader),
      filter: getZhDesc(packingWorktop.list.formList),
      devlierPlainDailog: {
        tableHeader: getZhDesc(packingWorktop.list.devlierPlainDialog.tableHeader),
        formList: getZhDesc(packingWorktop.list.devlierPlainDialog.formList),
        title: '合并为发货计划'
      },
      oneClickMergeDialog: {
        title: '一键合并',
        planType: '指令单类型'
      },
      deliverPlanDetailDialog: {
        title: '发货计划详情'
      }
    },
    detail: {
      btns: {
        createBox: '生成箱',
        finishBox: '完成箱',
        mergeBox: '合并箱',
        adjustmentBox: '调整箱',
        directDelivery: '直接发货',
        invalidBox: '作废箱',
        completeOrder: '完成整单',
        relieveBox: '解除整单',
        restart: '重新开始'
      },
      tabsList: getZhDesc(packingWorktop.detail.tabsList),
      formList: getZhDesc(packingWorktop.detail.formList),
      createBoxDialog: {
        formList: getZhDesc(packingWorktop.detail.createBoxDialog.formList),
        title: '生成箱'
      },
      finishDialog: {
        formList: getZhDesc(packingWorktop.detail.finishDialog.formList),
        title: '完成箱'
      },
      packingDetail: {
        packingTableHeader: getZhDesc(packingWorktop.detail.packingDetail.packingTableHeader),
        skuTableHeader: getZhDesc(packingWorktop.detail.packingDetail.skuTableHeader),
        differTableHeader: getZhDesc(packingWorktop.detail.packingDetail.differTableHeader),
        checkOnlyCodeDialog: {
          title: '查看唯一码'
        }
      }
    }
  },
  // 发货单
  deliver: {
    tabs: {
      list: '列表',
      detail: '详情'
    },
    list: {
      tableHeader: getZhDesc(deliver.list.tableHeader),
      filter: getZhDesc(deliver.list.formList)
    },
    detail: {
      formList: getZhDesc(deliver.detail.formList),
      tabsList: getZhDesc(deliver.detail.tabsList),
      freight: getZhDesc(deliver.detail.freight),
      relateBox: getZhDesc(deliver.detail.relateBox),
      onlyKey: getZhDesc(deliver.detail.onlyKey)
    },
    recordLog: {
      formList: getZhDesc(deliver.recordLogObj.formList),
      tableHeader: getZhDesc(deliver.recordLogObj.tableHeader)
    },
    importGoodsHeader: getZhDesc(deliver.importGoodsHeader)
  },
  // 菜单配置
  menuConfig: {
    menuTableHeader: getZhDesc(menuConfig.menuTableHeader),
    moduleTableHeader: getZhDesc(menuConfig.moduleTableHeader),
    addMenu: '添加菜单分类',
    addToMenu: '添加到菜单',
    menu: '菜单',
    module: '模块',
    addCategory: '新增分类',
    editCategory: '编辑分类'
  }
}
