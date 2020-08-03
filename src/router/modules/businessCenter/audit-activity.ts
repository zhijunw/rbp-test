import Layout from '@/views/layout/index.vue'
import { RouterConfig } from '../../index'
const auditActivity: RouterConfig = {
  path: '/auditActivity',
  component: Layout,
  name: 'auditActivity',
  redirect: '/auditActivity/auditConfig',
  meta: {
    title: 'auditActivity',
    routerId: 'auditActivity',
    moduleId: 'auditActivity',
    icon: 'nav_authority',
    noCache: true
  },
  children: [
    // {
    //   path: 'bpmnView',
    //   name: 'bpmnView',
    //   component: () => import('@/views/bpmn/index.vue'),
    //   meta: {
    //     title: 'bpmnView',
    //     moduleId: 'bpmnViewModule',
    //     hidden: true
    //   }
    // },
    {
      path: 'auditConfig',
      name: 'router-100008',
      component: () => import('@/views/audit-activity/audit-config/index.vue'),
      meta: {
        title: 'auditConfig',
        routerId: '100008',
        moduleId: '100008'
      }
    },
    {
      path: 'auditList',
      name: 'router-100007',
      component: () => import('@/views/audit-activity/audit-list/index.vue'),
      meta: {
        title: 'auditList',
        routerId: '100007',
        moduleId: '100007'
      }
    }

  ]
}
export default auditActivity
