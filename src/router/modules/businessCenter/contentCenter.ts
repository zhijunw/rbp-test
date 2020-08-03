import Layout from '@/views/layout/index.vue'
import { RouterConfig } from '../../index'
const permission: RouterConfig = {
  path: '/contentCenter',
  component: Layout,
  name: 'content-center',
  redirect: '/contentCenter/goodsFiels',
  meta: {
    title: 'contentCenter',
    routerId: 'contentCenter',
    moduleId: 'contentCenter',
    icon: 'nav_content',
    noCache: true
  },
  children: [
    {
      path: 'goodsFiels',
      name: 'goods-fiels',
      component: () => import('@/views/content-center/goods-fiels/index.vue'),
      meta: {
        title: 'goodsFiels',
        routerId: '120003',
        // moduleId: 'goodsFielsModule'
        moduleId: '120003'
      }
    },
    {
      path: 'barcode',
      name: 'barcode-fiels',
      component: () => import('@/views/content-center/barcode-fiels/index.vue'),
      meta: {
        title: 'barcode',
        routerId: '120004',
        moduleId: '120004'
        // moduleId: 'barcodeModule'
      }
    }
  ]
}
export default permission
