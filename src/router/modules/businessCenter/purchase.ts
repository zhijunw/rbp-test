import Layout from '@/views/layout/index.vue'
import { RouterConfig } from '../../index'
const product: RouterConfig = {
  path: '/purchase',
  component: Layout,
  name: 'purchase',
  redirect: '/purchase/purchaseOrder',
  meta: {
    title: 'purchase',
    routerId: 'purchase',
    moduleId: 'purchase',
    icon: 'nav_goods',
    noCache: true
  },
  children: [
    {
      path: 'purchaseOrder',
      name: 'purchaseOrder',
      component: () => import('@/views/purchase/purchase-order/index.vue'),
      meta: {
        title: 'purchaseOrder',
        routerId: 'purchaseOrder',
        moduleId: 'purchaseOrderModule'
      }
    },
    {
      path: 'purchaseGoods',
      name: 'purchaseGoods',
      component: () => import('@/views/purchase/purchase-goods/index.vue'),
      meta: {
        title: 'purchaseGoods',
        routerId: 'purchaseGoods',
        moduleId: 'purchaseGoodsModule'
      }
    },
    {
      path: 'plannedOrder',
      name: 'plannedOrder',
      component: () => import('@/views/purchase/planned-order/index.vue'),
      meta: {
        title: 'plannedOrder',
        routerId: 'plannedOrder',
        moduleId: 'plannedOrderModule'
      }
    },
    {
      path: 'instructOrder',
      name: 'instructOrder',
      component: () => import('@/views/purchase/instruct-order/index.vue'),
      meta: {
        title: 'instructOrder',
        routerId: 'instructOrder',
        moduleId: 'instructOrderModule'
      }
    }
  ]
}
export default product
