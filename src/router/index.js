import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/projectScreen',
    component: () => import('@/views/projectScreen'),
    hidden: true
  },

  {
    path: '/videoScreen',
    component: () => import('@/views/videoScreen'),
    hidden: true
  },

  {
    path: '/bigScreen',
    component: () => import('@/views/bigScreen'),
    hidden: true
  },

  {
    path: '/aiScreen',
    component: () => import('@/views/aiScreen'),
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: 'Dashboard', icon: 'dashboard' }
  //   }]
  // },

  {
    path: '/',
    component: Layout,
    redirect: '/overview',
    name: '平台概览',
    meta: { title: '平台概览', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: () => import('@/views/Platform/overview/index'),
        meta: { title: '平台概览', icon: 'tree' }
      },
      // {
      //   path: 'map',
      //   name: 'map',
      //   component: () => import('@/views/Platform/map/index'),
      //   meta: { title: '设备地图', icon: 'tree' }
      // }
    ]
  },
  {
    path: '/equipment',
    component: Layout,
    redirect: '/equipment/data',
    name: 'Equipment',
    meta: { title: '设备管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'monitor',
        name: 'monitor',
        component: () => import('@/views/equipment/monitor/index'),
        meta: { title: '设备监控', icon: 'table' }
      },
      {
        path: 'manage',
        name: 'manage',
        component: () => import('@/views/equipment/manage/index'),
        meta: { title: '设备管理', icon: 'tree' }
      },
      {
        path: 'warehouse',
        name: 'warehouse',
        component: () => import('@/views/equipment/warehouse/index'),
        meta: { title: '设备仓库', icon: 'tree' }
      },
      {
        path: 'group',
        name: 'group',
        component: () => import('@/views/equipment/group/index'),
        meta: { title: '分组管理', icon: 'tree' }
      }
    ]
  },

  {
    path: '/warining',
    component: Layout,
    redirect: '/warining/info',
    name: 'Warining',
    meta: { title: '报警信息', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'info',
        name: 'info',
        component: () => import('@/views/warning/info/index'),
        meta: { title: '未读报警', icon: 'table' }
      },
      {
        path: 'all',
        name: 'all',
        component: () => import('@/views/warning/all/index'),
        meta: { title: '全部报警', icon: 'tree' }
      }
    ]
  },

  {
    path: '/history',
    component: Layout,
    redirect: '/history/data',
    name: 'History',
    meta: { title: '历史数据', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'data',
        name: 'data',
        component: () => import('@/views/history/data/index'),
        meta: { title: '历史数据', icon: 'table' }
      },
      {
        path: 'analysis',
        name: 'analysis',
        component: () => import('@/views/history/analysis/index'),
        meta: { title: '历史分析', icon: 'tree' }
      },
      {
        path: 'record',
        name: 'record',
        component: () => import('@/views/history/record/index'),
        meta: { title: '运行记录', icon: 'tree' }
      }
    ]
  },

  {
    path: '/alarm',
    component: Layout,
    redirect: '/alarm/setting',
    name: 'Alarm',
    meta: { title: '报警设置', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('@/views/alarm/setting/index'),
        meta: { title: '报警设置', icon: 'table' }
      },
      {
        path: 'people',
        name: 'People',
        component: () => import('@/views/alarm/people/index'),
        meta: { title: '报警联系人', icon: 'tree' }
      }
    ]
  },

  {
    path: '/contract',
    component: Layout,
    redirect: 'contract/manage', // 重定向到子路由，确保首次访问显示子页面
    name: 'contractManage',
    meta: { title: '合同管理', icon: 'el-icon-s-help',alwaysShow:true },
    children: [
      {
        path: 'manage', // 子路由路径（非空，且不等于父路由的 path）
        name: 'ContractList',
        component: () => import('@/views/contract/index'),
        meta: { title: '合同列表', icon: 'tree' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
