import Layout from '@/views/layout/index.vue'
import { RouterConfig } from '../index'
const constantRouters: RouterConfig[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/errorPage/404.vue'),
    hidden: true
  },
  {
    path: '/printPreview',
    name: 'printPreview',
    component: () => import('@/views/tools-view/preview.vue'),
    hidden: true
  },

  {
    path: '/redirect/:path*',
    name: 'redirect',
    component: () => import('@/views/tools-view/redirect.vue'),
    hidden: true
  },
  {
    path: '/addPrintConfig',
    name: 'addPrintConfig',
    component: () => import('@/views/configCenter/print-config/addConfig.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401.vue'),
    hidden: true
  },
  // {
  //   path: 'bpmnView',
  //   name: 'bpmnView',
  //   component: () => import('@/views/bpmn/index.vue'),
  //   meta: {
  //     title: 'bpmnView',
  //     hidden: true
  //   }
  // },
  // has layout
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'nav_home',
          routerId: 'dashboard',
          moduleId: 'dashboard',
          affix: true,
          noCache: true
        }
      },
      {
        path: '/socketList',
        name: 'socketList',
        component: () => import('@/views/tools-view/socket-info.vue'),
        meta: {
          title: 'socketList',
          hidden: true
        }
      },
      {
        path: 'bpmnView',
        name: 'bpmnView',
        component: () => import('@/views/bpmn/index.vue'),
        meta: {
          title: 'bpmnView',
          hidden: true
        }
      },
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'customTheme',
        component: () => import('@/views/customTheme/index.vue'),
        name: 'customTheme',
        meta: {
          title: 'customTheme',
          icon: 'dashboard',
          routerId: 'customTheme',
          moduleId: 'customTheme'
        }
      }
    ]
  },
  {
    path: '/iframe',
    component: Layout,
    redirect: '/iframe/index',
    // hidden: true,
    meta: {
      hidden: true
    },
    children: [
      {
        path: 'index/:id',
        component: () => import('@/views/iframe/index.vue'),
        name: 'rbp-iframe',
        meta: {
          title: 'iframe页面',
          // noCache: true,
          isNotTranslateTitle: true // 是否不通过$t翻译title
        }
      }
    ]
  }
]

export default constantRouters
