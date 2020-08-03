import Layout from '@/views/layout/index.vue'
import { RouterConfig } from '../../index'
const organization: RouterConfig = {
  path: '/organization',
  component: Layout,
  name: 'organization',
  redirect: '/organization/channelOrganization',
  meta: {
    title: 'organization',
    routerId: 'organization',
    moduleId: 'organization',
    icon: 'nav_organization',
    noCache: true
  },
  children: [
    {
      path: 'channelOrganization',
      // name: 'channelOrganization',
      name: 'router-120001',
      component: () => import('@/views/organization/channel-organization/index.vue'),
      meta: {
        title: 'channelOrganization',
        routerId: '120001',
        moduleId: '120001'
        // moduleId: 'channelOrganizationModule'
      }
    },
    {
      path: 'supplier',
      // name: 'supplier',
      name: 'router-120002',
      component: () => import('@/views/organization/supplie/index.vue'),
      meta: {
        title: 'supplier',
        routerId: '120002',
        moduleId: '120002'
        // moduleId: 'supplierModule'
      }
    },
    {
      path: 'logistics',
      name: 'logistics',
      component: () => import('@/views/organization/logistics/index.vue'),
      meta: {
        title: 'logistics',
        routerId: '120003',
        moduleId: '120003'
        // moduleId: 'logisticsModule'
      }
    }
  ]
}
export default organization
