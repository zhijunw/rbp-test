const apiUrl = {
  getConfig: '/information/goods/dropDown',
  getBarcodeList: '/information/goodsBarcode/page',
  getBarcodeDetail: '/information/goodsBarcode/searchBarCodeByGoodsId',
  editCode: '/information/goodsBarcode/saveOrupdateBatch',
  createdBarcode: '/information/goodsBarcode/createBarcode',
  // fuzzy: '/information/goods/list',
  fuzzy: '/information/goods/option/page',
  getSelect: '/information/goods/dropDown',
  goodsHighSearch: '/information/goods/filter/page',
  batchCreatedBarcode: '/information/goodsBarcode/batchCreateBarcode'
}
export default apiUrl
