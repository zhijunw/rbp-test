const apiUrl = {

  batchCheck: '/bill/salePlanAdjustBill/check/batch', // 批量审核
  check: '/bill/salePlanAdjustBill/check', // 单审核
  create: '/bill/salePlanAdjustBill/create', // 新增
  deletes: '/bill/salePlanAdjustBill/delete', // 删除
  getSelect: '/bill/salePlanAdjustBill/dropDown', // 获取到下拉框的值
  // invalid: '/bill/salePlanBill/invalid', // 单作废
  list: '/bill/salePlanAdjustBill/page', // 获取列表
  // restore: '/bill/salePlanBill/restore', // 单恢复
  // uncheck: '/bill/salePlanBill/uncheck', // 反审核
  update: '/bill/salePlanAdjustBill/update', // 更新
  detail: '/bill/salePlanAdjustBill', // 获取详情
  getGoodsSku: '/bill/salePlanBill/getGoodsSkuList',
  scan: '/information/goodsBarcode/scan', // 扫码
  goodsEntry: '/information/goods/scan/page', // 货品录入
  getGoodsSkuHeader: '/bill/salePlanBill/getGoodsSkuHeader',
  operationLog: '/bill/salePlanAdjustBill/salePlanAdjustBillOperatorLog/page' // 操作记录
}
export default apiUrl

