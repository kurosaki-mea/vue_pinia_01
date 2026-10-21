<script setup>
// 1. 导入定义的 Store 函数
import { useCounterStore } from '@/stores/counter'

// 2. 实例化 Store
const counterStore = useCounterStore()
</script>

<template>
  <div>
    <!-- 直接读取 State 与 Getters -->
    <p>数字是: {{ counterStore.count }}</p>
    <p>双倍是: {{ counterStore.doubleCount }}</p>

    <!-- 直接调用方法修改 -->
    <!-- 直接调用 Actions 方法 -->
    <button @click="counterStore.increment()">点我 +1</button>
  </div>
</template>