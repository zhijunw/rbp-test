export default {
  list: '/bill/receiveBill/page',
  deletes: '/bill/receiveBill/delete',
  getSelect: '/bill/receiveBill/dropDown',
  printBatch: '/bill/noticeBill/printBatch',
  check: '/bill/receiveBill/check',
  uncheck: '/bill/receiveBill/uncheck',
  restore: '/bill/receiveBill/restore',
  invalid: '/bill/receiveBill/invalid',
  create: '/bill/receiveBill/create', // 新增
  update: '/bill/receiveBill/update', // 更新
  billDropDown: '/bill/receiveBill/dropDown', // 全部下拉
  details: '/bill/receiveBill', // 详情
  sendList: '/information/sendBill', // 发货单列表
  scan: '/information/packingBill/automaticIdentification',
  getGoodsSkuHeader: '/bill/receiveBill/getGoodsSkuHeader',
  getGoodsSku: '/bill/receiveBill/getGoodsSkuList',
  goodsEntry: '/information/goods/scan/page', // 货品录入
  batchCheck: '/bill/receiveBill/check/batch',
  operationLog: '/bill/receiveBill/receiveBillOperatorLog/page', // 操作记录
  salePlanList: '/bill/salePlanBill/option/page?keyWord=',
  billFuzzy: '/bill/noticeBill/filter/page',
  areaDropDown: '/information/channelConfig/area/dropDown',
  scanAuto: '/information/packingBill/automaticIdentification',
  barScan: '/information/packingBill/scanBarcode', // 2
  uniCode: '/information/packingBill/scanLabelCode', // 3
  sku: '/information/packingBill/scanSku', // 4
  boxScan: '/information/packingBill/scanBox' // 扫箱号
}
