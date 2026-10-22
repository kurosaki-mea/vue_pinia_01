import { createRouter, createWebHistory } from 'vue-router'

// 
import { useUserStore } from '@/stores/user'

// 导入vue组件 主页等等
import Index from '@/App.vue'
import Home from '@/components/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: { requiresAuth: false } // 不需要登录
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: {
        requiresAuth: true,  // 需要登录才能访问
        VipToken: 1 | 2 | 3,
        title: '用户后台页面',
      },
      // 路由独享守卫
      beforeEnter: (to, from) => {
        const vipToken = localStorage.getItem('token');
        if (!vipToken) {
          alert('只有 VIP 才能进入该页面！')
          return '/login'  // 拦截并重定向
        }
      }
    }
  ],
})


// 全局前置路由守卫
router.beforeEach((to, form, next) => {
  // 必须在守卫内部（pinia 挂载之后）实例化 store
  const userStore = useUserStore()

  // 判断该路由是否需要登录权限
  const requiresAuth = to.meta.requiresAuth ?? true // 默认需要登录

  if (requiresAuth && !userStore.isLogin) {
    // 如果需要登录，但当前没有登录，则重定向到登录页
    next({ name: 'Login' })
  } else if (to.name === 'login' && userStore.isLogin) {
    // 如果已经登录了，还想去登录页，直接拉回到首页
    next({ name: 'Home' })
  } else {
    // 其他情况正常放行
    next()
  }




})

export default router
