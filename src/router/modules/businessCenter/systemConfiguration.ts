import Layout from '@/views/layout/index.vue'
import { RouterConfig } from '../../index'
const systemConfiguration: RouterConfig = {
  path: '/configCenter',
  component: Layout,
  name: 'configCenter',
  redirect: '/configCenter/field',
  meta: {
    title: 'configCenter',
    routerId: 'configCenter',
    moduleId: 'configCenter',
    icon: 'nav_manage',
    noCache: true
  },
  children: [
    {
      path: 'systemDictionary',
      name: 'router-100001',
      component: () => import('@/views/configCenter/system-dictionary/index.vue'),
      meta: {
        title: 'systemDictionary',
        routerId: '100001',
        moduleId: '100001'
        // moduleId: 'systemDictionaryModule'
      }
    },
    {
      path: 'moduleConfig',
      name: 'router-100002',
      component: () => import('@/views/configCenter/module-config/index.vue'),
      meta: {
        title: 'moduleConfig',
        routerId: '100002',
        moduleId: '100002'
        // moduleId: 'moduleConfigModule'
      }
    },
    {
      path: 'field',
      name: 'router-100003',
      component: () => import('@/views/configCenter/field-config/index.vue'),
      meta: {
        title: 'fieldConfig',
        routerId: '100003',
        moduleId: '100003'
        // moduleId: 'fieldConfigModule'
      }
    },

    {
      path: 'globalConfig',
      name: 'router-100004',
      component: () => import('@/views/configCenter/global-config/index.vue'),
      meta: {
        title: 'globalConfig',
        routerId: '100004',
        moduleId: '100004'
        // moduleId: 'globalConfigModule'
      }
    },
    {
      path: 'menuConfig',
      name: 'router-100005',
      component: () => import('@/views/configCenter/menu-config/index.vue'),
      meta: {
        title: 'menuConfig',
        routerId: '100005',
        moduleId: '100005'
      }
    },
    {
      path: 'printConfig',
      name: 'router-100006',
      component: () => import('@/views/configCenter/print-config/index.vue'),
      meta: {
        title: 'printConfig',
        routerId: '100006',
        moduleId: '100006'
      }
    }
  ]
}
export default systemConfiguration
