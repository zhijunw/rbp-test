import Layout from '@/views/layout/index.vue'
import { RouterConfig } from '../../index'
const permission: RouterConfig = {
  path: '/permission',
  component: Layout,
  name: 'permission',
  redirect: '/permission/user',
  meta: {
    title: 'permission',
    routerId: 'permission',
    moduleId: 'permission',
    icon: 'nav_authority',
    noCache: true
  },
  children: [
    {
      path: 'users',
      name: 'router-110001',
      component: () => import('@/views/permission/permission-users/index.vue'),
      meta: {
        title: 'usersPermission',
        routerId: '110001',
        moduleId: '110001'
        // moduleId: 'usersPermissionModule'
      }
    },
    {
      path: 'roles',
      name: 'router-110002',
      // component: () => import('@/views/permission/roles1/index.vue'),
      component: () => import('@/views/permission/roles-permission/index.vue'),

      meta: {
        title: 'rolesPermission',
        routerId: '110002',
        // moduleId: 'rolesPermissionModule'
        moduleId: '110002'
      }
    },
    // {
    //   path: 'roles',
    //   name: 'roles-permission',
    //   component: () => import('@/views/permission/roles1/index.vue'),
    //   meta: {
    //     title: 'rolesPermission',
    //     routerId: '6002',
    //     moduleId: 'rolesPermissionModule'
    //   }
    // },
    {
      path: 'dataset',
      name: 'router-110003',
      component: () => import('@/views/permission/data-permission/index.vue'),
      meta: {
        title: 'datasetPermission',
        routerId: '110003',
        moduleId: '110003'
        // moduleId: 'datasetPermissionModule'
      }
    }
  ]
}
export default permission
