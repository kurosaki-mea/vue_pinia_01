<script setup lang="ts">


</script>
<template>
    <div>
        <h1>这是主页 home</h1>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/login">登录</RouterLink>
            <RouterLink to="/dashboard">后台</RouterLink>
        </nav>
    </div>
    <!-- 路由出口 -->
    <RouterView />
</template>
<style lang="css" scoped></style>