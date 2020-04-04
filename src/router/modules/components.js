/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/views/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  alwaysShow: true,
  name: 'ComponentDemo',
  meta: {
    title: 'components',
    icon: 'component'
  },
  children: [
    {
      path: 'svg-icons',
      component: () => import('@/views/icons'),
      name: 'SvgIconsDemo',
      meta: { title: 'icons', icon: 'icon', noCache: true }
    }
  ]
}

export default componentsRouter
