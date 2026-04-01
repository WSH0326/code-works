import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  // 登录页
  {
    path: '/login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/error/403',
    component: () => import('../views/error/403.vue'),
    meta: { requiresAuth: false }
  },

  {
    path: '/',
    redirect: '/index',
    component: HomeView,
    meta: { requiresAuth: true },
    children: [
      // 首页：所有人可进
      {
        path: 'index',
        component: () => import('../views/IndexView.vue'),
        meta: { roles: ['1', '2', '3'] }
      },

      // 业主管理： 物业和管理员
      {
        path: 'owner/list',
        component: () => import('../views/owner/list.vue'),
        meta: { roles: ['1', '2'] }
      },
      {
        path: 'owner/record',
        component: () => import('../views/owner/record.vue'),
        meta: { roles: ['1', '2'] }
      },

      // 订单管理： 物业和管理员
      {
        path: 'order/list',
        component: () => import('../views/order/list.vue'),
        meta: { roles: ['1', '2'] }
      },
      {
        path: 'order/unpay',
        component: () => import('../views/order/unpay.vue'),
        meta: { roles: ['1', '2'] }
      },

      // 报修管理：所有人可看
      {
        path: 'repair/order',
        component: () => import('../views/repair/order.vue'),
        meta: { roles: ['1', '2', '3'] }
      },
      // 派单管理：仅管理员和物业
      {
        path: 'repair/dispatch',
        component: () => import('../views/repair/dispatch.vue'),
        meta: { roles: ['1', '2'] }
      },

      // 仅物业
      {
        path: 'inspect/record',
        component: () => import('../views/inspect/record.vue'),
        meta: { roles: ['1', '2'] }
      },
      {
        path: 'inspect/task',
        component: () => import('../views/inspect/task.vue'),
        meta: { roles: ['1', '2'] }
      },

      // 系统管理：仅超级管理员
      {
        path: 'sys/user',
        component: () => import('../views/sys/user.vue'),
        meta: { roles: ['1'] }
      },
      {
        path: 'sys/role',
        component: () => import('../views/sys/role.vue'),
        meta: { roles: ['1'] }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userRoleId = localStorage.getItem('roleId')

  if (to.meta.requiresAuth === false) return next()

  if (!token) {
    Vue.prototype.$message.warning('请先登录')
    return next('/login')
  }

  if (to.meta.roles && !to.meta.roles.includes(userRoleId)) {
    return next('/error/403')
  }

  next()
})
export default router

