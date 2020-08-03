// @ts-ignore
const apiUrl = {
  list: '/information/packingBill/page', // 获取列表接口
  refreshTodo: '/information/packingBill/getWaitQuantity', // 刷新待办事项
  getSelect: '/information/packingBill/dropDown', // 获取下拉框接口
  confirmMergeDeliverPlan: '/information/sendPlanBill/mergeToSendPlan', // 合并发货计划
  mergeDeliverPlan: '/information/sendPlanBill/getAfterFilterNoticeList', // 获取发货计划合并列表
  oneClickMerge: '/information/sendPlanBill/getAfterFilterGroupNoticeList', // 一键合并列表
  confirmOneClickMerge: '/information/sendPlanBill/getAfterFilterGroupNoticeList', // 一键合并
  getDeliverPlanDetail: '/information/sendPlanBill', // 获取发货计划详情
  cancelMergeDeliverPlan: '/information/sendPlanBill/cancelMergeSendPlan', // 取消合并
  automaticBarcode: '/information/packingBill/automaticIdentification', // 自动识别条码
  searchBarcode: '/information/packingBill/scanBarcode', // 条形码录入
  searchOnlyCode: '/information/packingBill/scanUniqueCode', // 唯一码数录入
  viewBoxDetail: '/information/packingBill', // 查看箱详情
  createBox: '/information/box/generateBox', // 创建箱
  finishBox: '/information/box/completeBox', // 完成箱
  mergeBox: '/information/box/mergeBox', // 合并箱
  adjustBox: '/information/box/adjustBox', // 调整箱
  invalidBox: '/information/box/invalid' // 作废箱
}
export default apiUrl

