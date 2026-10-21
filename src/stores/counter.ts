import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 定义并导出 Store（仓库）
export const useCounterStore = defineStore('counter', () => {
  // 1. 对应 State（数据/状态）
  const count = ref(0)

  // 2. 对应 Getters（计算属性，自动缓存）
  const doubleCount = computed(() => count.value * 2)

  // 3. 对应 Actions（方法/业务逻辑）
  function increment() {
    count.value++
  }

  // 4. 对外暴露（发射）出去，外部组件才能拿到
  return { count, doubleCount, increment }
})