<script setup lang="ts">

import { RouterLink, RouterView } from 'vue-router';

</script>
<template>
    <div>
        <nav class="nav-links">
            <RouterLink to="/">首页home</RouterLink>
            <RouterLink to="/login">登录</RouterLink>
            <RouterLink to="/dashboard">后台</RouterLink>
        </nav>

    </div>
</template>
<style lang="css" scoped></style>