`2026年10月21日`

# 🍍 Vue Pinia 状态管理核心实战与进阶备忘录

`仅使用AI分析总结`

> 这是一个系统学习与演练 **Pinia (Vue 3 + TypeScript)** 状态管理的实战项目。项目通过清晰的模块化拆分，完整覆盖了从基础 Store 创建、State 响应式解构 (`storeToRefs`)、Getters 计算属性与 Actions 异步操作，到结合 Vue Router 实现**全局用户登录态与权限鉴权流转**的真实业务场景。

## 📂 项目目录结构全览

项目采用标准的 Vue 3 工程化分层结构，将全局状态仓库（`stores/`）、功能组件（`components/`）、路由视图（`views/`）以及路由权限控制（`router/`）有机结合：

```
src/
├── main.ts                                  # 应用入口：创建并挂载 Pinia 实例 (createPinia)
├── App.vue                                  # 顶层根组件：展示全局布局与状态共享效果
│
├── stores/                                  # 🍍 Pinia 状态仓库中心 (核心模块化 Store)
│   ├── counter.ts                           # 计数器基础 Store (State, Getters, Actions 演练)
│   ├── counter_原版.ts                      # 计数器初始对比版 (Option Store / Setup Store 对比参考)
│   └── user.ts                              # 用户中心 Store (管理 Token、用户信息、登录/登出逻辑)
│
├── components/                              # 🧩 功能与状态消费组件
│   ├── CounterBox_01.vue                    # [基础版] 直接通过 store 实例访问与修改状态
│   ├── CounterBox_02_storeToRefs.vue        # [进阶版] 使用 storeToRefs() 保持响应式解构演练
│   ├── Header.vue                           # 顶部导航栏组件 (跨组件实时响应 user/counter 状态变化)
│   └── Home.vue                             # 首页组件 (状态展示与交互测试)
│
├── views/                                   # 🖼️ 业务路由视图层
│   ├── Login.vue                            # 登录页 (调用 userStore.login 写入全局状态与本地持久化)
│   └── Dashboard.vue                        # 控制台/受保护页面 (读取当前登录用户信息、执行退出登录)
│
└── router/                                  # 🧭 路由与权限拦截层
    └── index.ts                             # 配置路由表，并结合 userStore 实现全局前置守卫鉴权
```

## ⚡ 核心模块与技术细节逐一详解

### 1. 计数器状态管理与响应式解构 (`counter.ts` & `CounterBox`)

* **涉及文件**：`stores/counter.ts`、`stores/counter_原版.ts`、`components/CounterBox_01.vue`、`components/CounterBox_02_storeToRefs.vue`
* **核心知识点**：
  * **Store 定义规范**：使用 `defineStore('counter', ...)` 定义独立状态模块，区分 **Setup Store（组合式函数写法）** 与 **Option Store（配置对象写法）**。
  * **`CounterBox_01.vue`（直接访问）**：直接通过 `const counterStore = useCounterStore()` 读取 `counterStore.count` 或调用 `counterStore.increment()`，天然保持响应式。
  * **`CounterBox_02_storeToRefs.vue`（响应式解构）**：
    * ⚠️ **核心避坑**：直接对 Store 进行 ES6 解构（如 `const { count } = useCounterStore()`）会**丢失响应式**！
    * ✅ **标准解法**：必须使用 `const { count, doubleCount } = storeToRefs(counterStore)` 提取状态（`state` 和 `getters`），而方法（`actions`）则可以直接从 `counterStore` 中解构。

### 2. 跨组件状态共享 (`Header.vue` & `Home.vue`)

* **涉及文件**：`components/Header.vue`、`components/Home.vue`、`App.vue`
* **设计亮点**：
  * 演示 Pinia 脱离组件层级限制（无需繁琐的 `props` 逐层透传或 `emit` 事件总线）的能力。
  * 在 `Home.vue` 或 `CounterBox` 中修改状态，`Header.vue` 顶部栏中的状态数据会**实时同步更新**，实现真正的全局单一数据源（Single Source of Truth）。

### 3. 真实业务闭环：用户鉴权与路由联动 (`user.ts` & `views/` & `router/`)

* **涉及文件**：`stores/user.ts`、`views/Login.vue`、`views/Dashboard.vue`、`router/index.ts`
* **业务流转全解析**：
  1. **状态与动作封装 (`stores/user.ts`)**：集中管理用户的登录凭证（`token`）、个人资料（`userInfo`），封装异步 `login()` 登录请求、持久化存储（同步至 `localStorage` 防刷新丢失）以及 `logout()` 清理状态的完整动作。
  2. **登录交互 (`views/Login.vue`)**：表单提交后调用 `userStore.login()`，登录成功后自动重定向至 `/dashboard`。
  3. **受保护页面 (`views/Dashboard.vue`)**：展示当前登录用户的状态信息，并提供退出登录按钮触发状态清空并跳回登录页。
  4. **路由守卫联动 (`router/index.ts`)**：在 `router.beforeEach` 导航守卫中实例化 `useUserStore()`，检查目标路由是否需要登录权限，未登录或无 Token 时自动拦截并跳转至 `Login.vue`。

## 🛠️ 快速复习速查表 (Cheat Sheet)

```typescript
// 1. Setup Store 现代组合式标准写法 (stores/counter.ts)
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // State -> ref()
  const count = ref(0)
  
  // Getters -> computed()
  const doubleCount = computed(() => count.value * 2)
  
  // Actions -> function()
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

// 2. 组件内正确使用与解构 (CounterBox_02_storeToRefs.vue)
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()
// 状态和计算属性用 storeToRefs 保持响应式
const { count, doubleCount } = storeToRefs(counterStore)
// Action 方法直接解构即可
const { increment } = counterStore

// 3. 批量修改状态与重置
counterStore.$patch({ count: 10 }) // 批量更新
counterStore.$reset()              // 重置为初始值 (Option Store 内置，Setup Store 需手动实现)
```

*✨ 从基础响应式解构到结合路由守卫的真实用户鉴权闭环，是一份清晰实用的 Pinia 核心知识备忘库！*