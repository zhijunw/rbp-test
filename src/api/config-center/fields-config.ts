const apiUrl = {
  getFieldsList: '/information/customizecolumn/page', // 查询列表
  batchDelete: '/information/customizecolumn/delete', // 删除
  getDetailData: '/information/customizecolumn', // 查看详情
  addFields: '/information/customizecolumn/create',
  updateFields: '/information/customizecolumn/update',
  getTree: '/system/module/tree',
  getModuleCategoryData: '/information/modulecustomizegroup/page', // 获取模块分类的数据
  creatModuleGroup: '/information/modulecustomizegroup/create',
  deleteModuleGroup: '/information/modulecustomizegroup/delete', // 删除模块组
  // getModuleFields: '/information/customizecolumn/list',// 模糊搜索 自定义字段
  getModuleFields: '/information/customizecolumn/option/page', // 模糊搜索 自定义字段
  updateGroupFields: '/information/modulecustomizecolumn/update',
  deletegGroupFields: '/information/modulecustomizecolumn/delete', // 删除模块字段
  creatGroupFields: '/information/modulecustomizecolumn/create',
  updateGroupFieldsSort: '/information/modulecustomizecolumn/updateBatch',
  updateGroupSort: '/information/modulecustomizegroup/updateBatch',
  // 模块货品字段配置
  getModuleSelect: '/information/billGoodsColumnSetting/dropDown', // 获取货品字段模块下拉框
  produceFieldsCreate: '/information/billGoodsColumnSetting/create', // 新增
  produceFieldsDelete: '/information/billGoodsColumnSetting/delete', // 删除
  produceModuleList: '/information/billGoodsColumnSetting/list', // 获取列表
  produceFieldsUpdate: '/information/billGoodsColumnSetting/update',
  produceFieldsList: '/information/goods/getGoodsColumnList' // 获取字段列表
}
export default apiUrl
