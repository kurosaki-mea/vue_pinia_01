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
      meta: { requiresAuth: false }, // 不需要登录
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: { requiresAuth: false }, // 不需要登录

    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: {
        requiresAuth: true,  // 需要登录才能访问
        title: '用户后台页面',
      },
      // 路由独享守卫  进入这个页面之前
      beforeEnter: (to, from) => {
        // alert(`你是从 ${from.path} 进入的本页面: 后台页面`)
        console.log(`你是从 ${from.path} 进入的本页面 ${to.path}`)
      }
    }
  ],
})


// 全局前置路由守卫
router.beforeEach((to, from) => {
  // 必须在守卫内部（pinia 挂载之后）实例化 store
  const userStore = useUserStore()

  // 判断该路由是否需要登录权限
  // 【?? 空值合并 运算符】
  ////只有当左侧是 null 或 undefined 时，才会返回右侧的值，否则直接左侧。
  // 如果前面的表达式结果是 null 或 undefined，就取默认值 true，
  // 
  // 1,如果左侧是true，需要登录，那 true??true 就为true
  // 2,如果左侧是false，不需要登录，那 false??true 就为false
  // 3,如果左侧这个属性，为null或undefined，那 null??true 就为true
  const requiresAuth = to.meta.requiresAuth ?? true // 默认需要登录

  if (requiresAuth && !userStore.isLogin) {
    // 1. 需要登录但未登录：直接 return 重定向到登录页
    // 如果需要登录，但当前没有登录，则重定向到登录页
    alert('您还没有登录！')
    return { name: 'Login'}
  }
  if (to.name === 'Login' && userStore.isLogin) {
    // 2. 已经登录了还去登录页：直接 return 重定向回首页
    // 如果已经登录了，还想去登录页，直接拉回到首页
    alert('您已经登录了！')
    return { name: 'Home' }
  }
  // 其他情况正常放行
  // 3. 其他情况正常放行（不写 return，或者 return true 均可）

})

export default router
