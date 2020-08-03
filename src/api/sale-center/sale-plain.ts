const apiUrl = {
  // fuzzy: '/information/supplier/option/page',
  // goodsFuzzy: '/information/goods/option/page',
  // goodsHighSearch: '/information/goods/filter/page',
  // channelFuzzy: '/information/channel/option/page',
  // channelHighSearch: '/information/channelSelect/filter/page',
  batchCheck: '/bill/salePlanBill/check/batch', // 批量审核
  check: '/bill/salePlanBill/check', // 单审核
  create: '/bill/salePlanBill/create', // 新增
  deletes: '/bill/salePlanBill/delete', // 删除
  getSelect: '/bill/salePlanBill/dropDown', // 获取到下拉框的值
  invalid: '/bill/salePlanBill/invalid', // 单作废
  list: '/bill/salePlanBill/page', // 获取列表
  restore: '/bill/salePlanBill/restore', // 单恢复
  uncheck: '/bill/salePlanBill/uncheck', // 反审核
  update: '/bill/salePlanBill/update', // 更新
  detail: '/bill/salePlanBill', // 获取详情
  getGoodsSku: '/bill/salePlanBill/getGoodsSkuList',
  scan: '/information/goodsBarcode/scan', // 扫码
  goodsEntry: '/information/goods/scan/page', // 货品录入
  getGoodsSkuHeader: '/bill/salePlanBill/getGoodsSkuHeader',
  printBatch: '/bill/salePlanBill/printBatch',
  adjustmentRecord: '/bill/salePlanBill/getSalePlanAdjustHistoryPage', // 调整记录
  operationLog: '/bill/salePlanBill/salePlanBillOperatorLog/page', // 操作记录
  getAdjustmentDetail: '/bill/salePlanBill/getSalePlanBillGoodsFinalList' // 调整后明细表
}
export default apiUrl

