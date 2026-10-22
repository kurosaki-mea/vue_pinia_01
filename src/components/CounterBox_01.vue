<script setup>
// 1. 导入定义的 Store 函数
import { useCounterStore } from '@/stores/counter'

// 2. 实例化 Store
// 组件内调用：在组件里 useCounterStore() 并直接读写。
// 调用 useCounterStore() 这个方法，会返回一个大对象（也就是这个 Store 的实例）
// 然后把它存到 counterStore 变量里之后，就可以 counterStore.count 去读取数据了
const counterStore = useCounterStore()


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
    
  </div>
</template>