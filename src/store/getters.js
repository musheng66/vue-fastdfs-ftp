const getters = {
  themeColor: state => state.settings.themeColor,
  themeName: state => state.settings.themeName,

  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,

  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  permission_routes: state => state.permission.routes,

  errorLogs: state => state.errorLog.logs,

  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles
}
export default getters
