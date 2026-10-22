import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 定义并导出 Store（仓库）
export const useCounterStore = defineStore('counter', () => {
  // 1. State 对应 （数据/状态）
  // 【存数据】
  const count = ref(0)

  // 2. Getters 对应 （计算属性，自动缓存）
  // 【算数据/计算属性】
  const doubleCount = computed(() => count.value * 2)

  // 3. Actions 对应 （方法/业务逻辑）
  // 【改数据的方法】
  function increment() {
    count.value++
  }

  // 4. 对外暴露（发射）出去，外部组件才能拿到
  return { count, doubleCount, increment }
})