<script setup lang="ts">

import CounterBox_01 from './components/CounterBox_01.vue'
import CounterBox_02_storeToRefs from './components/CounterBox_02_storeToRefs.vue'

// 主页 Home 组件
import Home from '@/components/Home.vue'


</script>

<template>
  <h1> Vue Pinia </h1>
  <!-- <CounterBox_01 /> -->
  <!-- <CounterBox_02_storeToRefs /> -->
  <hr />
  <Home />
</template>

<style>
/* 全局文件的a都有这个样式 */
a {
  margin: 0px 5px;
}
</style>
<style scoped>

</style>
