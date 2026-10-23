<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

// 拟定好账号密码
const username = ref('admin123')
const password = ref('123456')

const handleLogin = () => {
    // 模拟调接口成功，拿到后端返回的 token
    const mockToken = 'mock_token_abcdef123456'
    const mockUserInfo = { 
        userName: username.value,  // 获取用户账号id名字
        name: '管理员',
        role: 'admin' 
    }

    // 1. 存入 Pinia 和 LocalStorage
    // 调用 user 仓库(store)的 setLoginData 方法，将 token 和用户信息存入 Pinia
    // >>>保存登录凭证与用户信息到全局 Store
    userStore.setLoginData(mockToken, mockUserInfo)
    
    // 欢迎登录
    alert(`欢迎登录！${mockUserInfo.userName}`)

    // 2. 跳转到 指定页面
    router.push('/dashboard')
}
</script>
<template>
    <div>
        <h1>登录 login</h1>
        <div class="login-container">
            <h2>系统登录页</h2>
            <input v-model="username" placeholder="请输入账号" />
            <input v-model="password" type="password" placeholder="请输入密码" />
            <button @click="handleLogin">登录</button>
        </div>
    </div>


</template>
<style lang="css" scoped></style>