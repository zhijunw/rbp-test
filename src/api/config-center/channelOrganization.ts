const apiUrl = {
  getChannelList: '/information/channel/page',
  getChannelDetail: '/information/channel/',
  addChannel: '/information/channel/create',
  delChannel: '/information/channel/delete',
  updateChannel: '/information/channel/update',
  auditChannel: '/information/channel/check/batch',
  singleAuditChannel: '/information/channel/check',
  singleUnAuditChannel: '/information/channel/uncheck',
  singleInvoidChannel: '/information/channel/invalid',
  getDropDown: '/information/channel/dropDown',
  channelHighSearch: '/information/channelSelect/filter/page',
  fuzzy: '/information/channel/option/page',
  restore: '/information/channel/restore',
  exportData: '/information/channel/exportData',
  getChannelSetting: '/information/channelSetting/list'
}

export default apiUrl

