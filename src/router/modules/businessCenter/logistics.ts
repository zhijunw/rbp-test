import Layout from '@/views/layout/index.vue'
import { RouterConfig } from '../../index'

const permission: RouterConfig = {
  path: '/logistic',
  component: Layout,
  name: 'logistic-center',
  redirect: '/logistic/deliver',
  meta: {
    title: 'logistic',
    routerId: 'logistic',
    moduleId: 'logistic',
    icon: 'nav_content',
    noCache: true
  },
  children: [
    {
      path: 'deliver',
      name: 'deliver',
      component: () => import('@/views/logisticsCenter/deliver/index.vue'),
      meta: {
        title: 'deliver',
        routerId: '700005',
        moduleId: '700005'
      }
    }
  ]
}
export default permission
