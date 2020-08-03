const apiUrl = {
  getCusotmerFields: '/information/modulecustomizecolumn/getColumnList', // 获取模块筛选器下面自定义字段
  getModulePermissionData: '/system/module/list', // 获取模块下面的 权限数据
  modelRelation: '/information/modelRelation/', // 获取某模块相关的 模块链接
  propFilterSelect: '/information/dialog/channelDialog', // 属性选择器之渠道属性 获取下拉框
  supplierPropFilterSelect: '/information/dialog/supplierDialog', // 属性选择器之供应商属性 获取下拉框
  goodsPropFilterSelect: '/information/dialog/goodsDialog', // 属性选择器之货品属性 获取下拉框
  channelList: '/information/dialog/channelOptions', // 属性筛选器之渠道编号 模糊搜索
  supplierList: '/information/dialog/supplierOptions', // 属性筛选器之供应商编号 模糊搜索
  userList: '/information/dialog/userOptions', // 属性筛选器之用户编号模糊搜索
  rolesList: '/information/dialog/roleOptions', // 属性筛选器之角色编号模糊搜索
  goodsList: '/information/dialog/goodsOptions', // 属性筛选器之货号编号 模糊搜索
  getSelect: '/system/user/dropDown', // 用户高级搜索器 获取用户里面的下拉框
  getUserList: '/system/user/queryUserBase', // 用户高级搜索器 根据条件查询查出对应用户列表
  userFuzzy: '/system/user/option/page', // 模糊搜索用户
  getChannelSearchSelect: '/information/channel/filter/dropDown', // 获取渠道筛选器的下拉框选项
  getNoticeBillSearchSelect: '/bill/noticeBill/option/page?keyWord=', // 获取指令单筛选器的下拉框选项
  getGoodsSearchSelect: '/information/goods/filter/dropDown', // 获取货品筛选器的下拉框选项
  getBillNoSearchSelect: '/bill/salePlanAdjustBill/dropDown', // 获取销售计划调整的下拉框选项值
  goodsFuzzy: '/information/goods/option/page', // 货品的模糊搜索
  goodsHighSearch: '/information/goods/filter/page', // 商品查询
  channelFuzzy: '/information/channel/option/page', // 渠道模糊搜索
  noticeBillFuzzy: '/bill/noticeBill/option/page', // 指令单模糊搜索

  // 获取模块列表数据
  getModuleList: '/system/menu/items',
  billFuzzy: '/bill/salePlanBill/option/page', // 订单号模糊搜索
  billHighSearch: '/bill/salePlanBill/filter/page', // 销售计划单号查询
  channelHighSearch: '/information/channelSelect/filter/page', // 渠道查询
  noticeBillHighSearch: '/bill/noticeBill/filter/page', // 指令单查询
  userHighSearch: '/system/user/query', // 用户高级搜索
  sendFuzzy: '/information/sendBill/option/page', // 发货单模糊搜索
  sendHighSearch: '/information/sendBill/filter/page', // 发货单号查询
  // 自定义字段通用接口
  getCustomHeader: '/information/billColumnSetting/list', // 获取自定义表头数据
  updatedCustomHeaderSort: '/information/billColumnSetting/update', // 自定义表头数据排序
  getModuleCustomerFields: '/information/modulecustomizecolumn/getGroupColumnList', // 获取模块下的自定义字段

  // 打印通用接口
  getPrintDetail: '/bill/billPrintTemplate', // 获取打印详情
  getPrintList: '/bill/billPrintTemplate/search', // 获取模块打印列表

  // 导入导出
  uploadDetailExcel: '/information/excel/importDetail', // 详情上传
  uploadExcel: '/information/excel/import', // 上传文件
  batchExport: '/information/excel/export', // 批量导出
  getImportModel: '/information/excel/getImportModel', // 获取导入模板

  // 工作流通用接口
  createActivity: '/bill/process/create', // 创建工作流实例
  auditActivity: '/activiti/approval', // 审批通过
  rejectActivity: '/activiti/reject', // 驳回

  // 通用操作日志接口
  operatorLog: '/bill/operatorLog/page',

  layoutModule: '/moduleLayout/',
  layoutList: '/moduleLayout/list', // 模块视图【单独】列表
  layoutCopy: '/moduleLayout/copy', // 模块视图复制
  layoutCreate: '/moduleLayout/create', // 模块视图创建
  layoutDelete: '/moduleLayout/delete', // 模块视图删除
  layoutDetail: '/moduleLayout', // 模块视图详情
  layoutUpdate: '/moduleLayout/update', // 更新s
  layoutMove: '/moduleLayout/move', // 选择视图
  // 扫码接口
  scanAuto: '/information/packingBill/automaticIdentification', // 自动识别
  barScan: '/information/goodsBarcode/scan', // 条形码  2
  uniCodeScan: '/information/packingBill/scanLabelCode', // 唯一码  3
  skuScan: '/information/packingBill/scanSku', // SKU 4
  // 获取货品颜色尺码
  scanGoodsPage: '/information/packingBill/scanGoodsPage'
}
export default apiUrl
