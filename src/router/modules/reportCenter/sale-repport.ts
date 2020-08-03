import Layout from '@/views/layout/index.vue'
import { RouterConfig } from '../../index'
const saleReport: RouterConfig = {
  path: '/reportCenter',
  component: Layout,
  name: 'reportCenter',
  redirect: 'saleReport',
  meta: {
    title: 'reportCenter',
    routerId: 'reportCenter',
    moduleId: 'reportCenter',
    icon: 'nav_organization',
    noCache: true
  },
  children: [
    {
      path: 'goodsReport',
      name: 'router-130001',
      component: () => import('@/views/report-center/goods-report/index.vue'),
      meta: {
        title: 'goodsReport',
        routerId: '130001',
        moduleId: 'goodsReportModule'
      }
    },
    {
      path: 'orderDetailReport',
      name: 'router-130002',
      component: () => import('@/views/report-center/orderdetail-report/index.vue'),
      meta: {
        title: 'orderDetailReport',
        routerId: '130002',
        moduleId: 'orderDetailReportModule'
      }
    }
  ]
}
export default saleReport
