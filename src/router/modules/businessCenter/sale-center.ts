import Layout from '@/views/layout/index.vue'
import { RouterConfig } from '../../index'
const sale: RouterConfig = {
  path: '/sale',
  component: Layout,
  name: 'sale',
  redirect: 'salePlain',
  meta: {
    title: 'sale',
    routerId: 'sale',
    moduleId: 'sale',
    icon: 'nav_organization',
    noCache: true
  },
  children: [
    {
      path: 'salePlain',
      name: 'router-700001',
      component: () => import('@/views/sale-center/sale-plain/index.vue'),
      meta: {
        title: 'salePlain',
        routerId: '700001',
        moduleId: '700001'
        // moduleId: 'salePlainModule'
      }
    },
    // {
    //   path: 'salePlain-700008',
    //   name: 'router-700001',
    //   component: () => import('@/views/sale-center/sale-plain/index.vue'),
    //   meta: {
    //     title: '分支1',
    //     isNotTranslateTitle: true,
    //     routerId: '700008',
    //     moduleId: '700008'
    //   }
    // },
    {
      path: 'salePlainAdjustment',
      // name: 'salePlainAdjustment',
      name: 'router-700002',
      component: () => import('@/views/sale-center/sale-plain-adjustment/index.vue'),
      meta: {
        title: 'salePlainAdjustment',
        routerId: '700002',
        moduleId: '700002'
        // moduleId: 'salePlainAdjustmentModule'
      }
    },
    {
      path: 'distributionPlain',
      name: 'router-700005',
      component: () => import('@/views/sale-center/distribution-plain/index.vue'),
      meta: {
        title: 'distributionPlain',
        routerId: '700005',
        moduleId: '700005'
        // moduleId: 'distributionPlainModule'
      }
    },
    {
      path: 'packingWorkTop',
      name: 'router-700006',
      component: () => import('@/views/sale-center/packing-worktop/index.vue'),
      meta: {
        title: 'packingWorkTop',
        routerId: '700006',
        moduleId: '700006'
        // moduleId: 'packingWorktopModule'
      }
    }
    // {
    //   path: 'worktop', // 路径
    //   name: 'worktop', // keep-alive 缓存的name
    //   component: () => import('@/views/sale-center/worktop/index.vue'),
    //   meta: {
    //     title: 'worktop',
    //     routerId: '700008',
    //     isNotTranslateTitle: true,
    //     moduleId: 'worktopModule'
    //   },
    //   children: [
    //     {
    //       path: 'packing',
    //       name: 'packing',
    //       component: () => import('@/views/sale-center/worktop/packing-worktop/index.vue'),
    //       meta: {
    //         title: 'packingWorkTop',
    //         routerId: '700004',
    //         isNotTranslateTitle: true,
    //         moduleId: 'packingModule'
    //       }
    //     },
    //     {
    //       path: 'salePlain-700009',
    //       name: 'salePlain-700009',
    //       component: () => import('@/views/sale-center/sale-plain/index.vue'),
    //       meta: {
    //         title: '分支2',
    //         isNotTranslateTitle: true,
    //         routerId: '700009',
    //         moduleId: '700009'
    //       }
    //     }
    //   ]
    // }
  ]
}
export default sale
