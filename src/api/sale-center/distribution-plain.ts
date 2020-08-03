export default {
  list: '/bill/noticeBill/page',
  deletes: '/bill/noticeBill/delete',
  getSelect: '/bill/noticeBill/dropDown',
  printBatch: '/bill/noticeBill/printBatch',
  check: '/bill/noticeBill/check',
  uncheck: '/bill/noticeBill/uncheck',
  restore: '/bill/noticeBill/restore',
  invalid: '/bill/noticeBill/invalid',
  create: '/bill/noticeBill/create', // 新增
  update: '/bill/noticeBill/update', // 更新
  billDropDown: '/bill/noticeBill/dropDown', // 销售计划全部下拉
  details: '/bill/noticeBill', // 详情
  saleList: '/bill/salePlanBill/getSalePlanBillGoodsFinalList', // 销售计划列表
  scan: '/information/goodsBarcode/scan',
  getGoodsSkuHeader: '/bill/noticeBill/getGoodsSkuHeader',
  getGoodsSku: '/bill/noticeBill/getGoodsSkuList',
  goodsEntry: '/information/goods/scan/page', // 货品录入
  batchCheck: '/bill/noticeBill/check/batch',
  operationLog: '/bill/noticeBill/noticeBillOperatorLog/page', // 操作记录
  salePlanList: '/bill/salePlanBill/option/page?keyWord=',
  billFuzzy: '/bill/noticeBill/filter/page',
  // scan: '/information/goods/scan/page' //货品录入
  // 区域物流下拉
  areaDropDown: '/information/channelConfig/area/dropDown'
}
