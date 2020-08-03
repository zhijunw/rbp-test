const apiUrl = {
  uploadCssFile: '/zuul/app/file/upload', // 上传elementUI CSS
  getItemJson: '/app/themeStyle/', // 根据ID获取对应主题的json
  createTheme: '/app/themeStyle/create', // 创建或修改主题
  selectTheme: '/app/themeStyle/createUserTheme', // 选择主题
  findThemeList: '/app/themeStyle/list', // 获取主题列表
  findUserTheme: '/app/themeStyle/findUserTheme', // 根据用户ID获取当前主题
  removeTheme: '/app/themeStyle/delete' // 删除主题
}
export default apiUrl
