import Layout from '@/views/layout/index.vue'
import { RouterConfig } from '../../index'
const permission: RouterConfig = {
  path: '/retailCenter',
  component: Layout,
  name: 'retail-center',
  redirect: '/retailCenter/terminalLogistics',
  meta: {
    title: 'retailCenter',
    routerId: 'retailCenter',
    moduleId: 'retailCenter',
    icon: 'nav_content',
    noCache: true
  },
  children: [
    {
      path: 'terminalLogistics',
      name: 'terminal-logistics',
      component: () => import('@/views/retail-center/terminal-logistics/index.vue'),
      meta: {
        title: 'terminalLogistics',
        routerId: '700007',
        moduleId: '700007',
        icon: 'nav_content'
      }
    }
  ]
}
export default permission
