import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // 网页加载条
import 'nprogress/nprogress.css'// 网页加载条样式
// import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false }) // NProgress 网页加载条配置

// const whiteList = ['/login'] // 路由白名单，不进行登录验证

router.beforeEach((to, from, next) => {
  NProgress.start() // 加载条开始
  // if (getToken()) { // 校验是否存在 token
  //   /* 存在 token */
  //   if (to.path === '/login') {
  //     // 当判断已登录时，/login 路由直接跳转到主页
  //     next({ path: '/' })
  //     NProgress.done() // 若当前页是主页，跳转时不会进行路由转换，所以手动处理
  //   } else {
  //     // 判断当前用户是否已获取 user_info 信息
  //     const hasRoles = store.getters.roles && store.getters.roles.length > 0
  //     if (hasRoles) {
  //       next()
  //     } else {
  //       // 拉取 user_info
  //       store.dispatch('user/getUserInfo').then(data => {
  //         const roles = data.roles // roles 必须是数组，如: ['editor','develop']
  //         store.dispatch('permission/generateRoutes', roles).then(accessRoutes => { // 根据roles权限生成可访问的路由表
  //           router.addRoutes(accessRoutes) // 动态添加可访问路由表
  //           next({ ...to, replace: true }) // hack 方法 确保 addRoutes 已完成，set the replace: true so the navigation will not leave a history record
  //         })
  //         next({ ...to, replace: true })
  //       }).catch(() => {
  //         store.dispatch('user/fedLogout').then(() => {
  //           Message.error('获取权限失败，请重新登录！')
  //           next({ path: '/login' })
  //         })
  //       })
  //     }
  //   }
  // } else {
  //   /* has no token */
  //   if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
  //     next()
  //   } else {
  //     next('/login') // 否则全部重定向到登录页
  //     NProgress.done() // 若当前页是登录页，跳转时不会进行路由转换，所以手动处理
  //   }
  // }
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
