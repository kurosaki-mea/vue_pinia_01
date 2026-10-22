<script setup>
// 使用 storeToRefs 解构
// 导入 storeToRefs
// 用于解构 Pinia store 时保持 state 和 getters 的响应式
import { storeToRefs } from 'pinia';

// 1. 导入定义的 Store 函数
import { useCounterStore } from '@/stores/counter'

// 2. 实例化 Store
// 组件内调用：在组件里 useCounterStore() 并直接读写。
const counterStore = useCounterStore()

// 2.1 使用 storeToRefs() 解构store，不会失去响应式
const { count, doubleCount } = storeToRefs(counterStore)
// 上述，是把名为 count 和 doubleCount 的属性，从这个大对象里抽出来，各自存成同名的独立变量。
// 因为键名和变量名一样，所以 ES6 简化成了：{ count, doubleCount }
// 语法：{ 原数据属性名 : 新变量名 }

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