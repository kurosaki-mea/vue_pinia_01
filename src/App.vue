<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
// demo
import CounterBox_01 from './components/CounterBox_01.vue'
import CounterBox_02_storeToRefs from './components/CounterBox_02_storeToRefs.vue'

// 引入全局公共组件
import Header from '@/components/Header.vue'


</script>

<template>
  <div id="app">
    <h1> Vue Pinia </h1>
    <!-- <CounterBox_01 /> -->
    <!-- <CounterBox_02_storeToRefs /> -->
    <Header />
    <hr />
    <!-- 路由出口 -->
    <RouterView />
  </div>
</template>

<style>
/* 全局文件的a都有这个样式 */
a {
  margin: 0px 5px;
}
</style>
<style scoped></style>
