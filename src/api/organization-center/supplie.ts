const apiUrl = {
  fuzzy: '/information/supplier/option/page',
  HighSearch: '/information/supplier/filter/page',
  batchCheck: '/information/supplier/check/batch', // 批量审核
  check: '/information/supplier/check', // 单审核
  create: '/information/supplier/create', // 新增
  deletes: '/information/supplier/delete', // 删除
  getSelect: '/information/supplier/dropDown', // 获取到下拉框的值
  invalid: '/information/supplier/invalid', // 单作废
  list: '/information/supplier/page', // 获取列表
  restore: '/information/supplier/restore', // 单恢复
  uncheck: '/information/supplier/uncheck', // 反审核
  update: 'information/supplier/update', // 更新
  detail: '/information/supplier' // 获取详情
}
export default apiUrl
