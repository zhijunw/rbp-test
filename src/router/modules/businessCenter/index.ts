import purchase from './purchase'
import permission from './permission'
import organization from './organization'
import contentCenter from './contentCenter'
import sale from './sale-center'
import auditActivity from './audit-activity'
import systemConfiguration from './systemConfiguration'
import retailCenter from './retailCenter'
import logistics from './logistics'
/**
 * hidden: true                   当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面(默认 false)
 * alwaysShow: true               当设置 true 的时候永远会显示根菜单，不设置的情况下只有当子路由个数大于一个时才会显示根菜单
 *                                当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式。只有一个时会将那个子路由当做根路由
 *
 * redirect: noredirect           当设置 noredirect 的时候该路由不会在面包屑导航中出现
 * name:'router-name'             设定路由的名字，一定要填写不然 使用 <keep-alive> 时会出现各种问题
 * meta : {
    roles: ['admin','editor'],   设置该路由进入的权限，支持多个权限叠加
    moduleId,                    设置模块的命名空间 对应的 Vuex 命名空间
    routeId,                     设置路由的 ID 和后台返回的权限列表进行匹配
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             设置该路由的图标
    noCache: true                如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
  }
 **/
const businessCenter = [contentCenter, organization, sale, permission, auditActivity, systemConfiguration, logistics, retailCenter]

export default businessCenter
