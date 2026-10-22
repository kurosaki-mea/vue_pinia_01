<script setup>
// 使用 storeToRefs 解构
// 导入 storeToRefs
import { storeToRefs } from 'pinia';

// 1. 导入定义的 Store 函数
import { useCounterStore } from '@/stores/counter'

// 2. 实例化 Store
// 组件内调用：在组件里 useCounterStore() 并直接读写。
const counterStore = useCounterStore()

// 2.1 使用 storeToRefs(xx) 解构，不会失去响应式
const { count, doubleCount } = storeToRefs(counterStore)

</script>

<template>
  <div>
    <!-- 直接读取 State 与 Getters -->
    <h3> 直接读取 State 与 Getters （counterStore.count）</h3>
    <p>数字是: {{ counterStore.count }}</p>
    <p>双倍是: {{ counterStore.doubleCount }}</p>

    <!-- 直接调用方法修改 -->
    <!-- 直接调用 Actions 方法 -->
    <button @click="counterStore.increment()">点我 +1</button>

    <!-- 使用storeToRefs(xxx) 解构，不会失去响应式 -->
    <h3>使用storeToRefs(xxx) 解构，不会失去响应式</h3>
    <p>数字是: {{ count }}</p>
    <p>双倍是: {{ doubleCount }}</p>
  </div>
</template>