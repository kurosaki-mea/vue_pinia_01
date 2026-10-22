<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const username = ref('admin')
const password = ref('123456')

const handleLogin = () => {
    // 模拟调接口成功，拿到后端返回的 token
    const mockToken = 'mock_token_abcdef123456'
    const mockUserInfo = { name: '管理员', role: 'admin' }

    // 1. 存入 Pinia 和 LocalStorage
    userStore.setLoginData(mockToken, mockUserInfo)

    // 2. 跳转到首页
    router.push('/dashboard')
}
</script>
<template>
    <div>
        <h1>这是登录 login</h1>
        <div class="login-container">
            <h2>系统登录页</h2>
            <input v-model="username" placeholder="请输入账号" />
            <input v-model="password" type="password" placeholder="请输入密码" />
            <button @click="handleLogin">登录</button>
        </div>
    </div>


</template>
<style lang="css" scoped></style>