<script setup lang="ts">

// 引入 router
import { useRouter } from 'vue-router'
const router = useRouter()
// 引入 storeToRefs  数据响应式
import { storeToRefs } from 'pinia';

// 引用 user store 用户仓库
import { useUserStore } from '@/stores/user';
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

// 退出登录
const handleLogout = () =>{

    const userName = userInfo.value.userName

    // 清空状态
    userStore.logout()
    // 清空本地缓存 用户信息
    // localStorage.removeItem('token')
    // localStorage.removeItem('userInfo')
    //
    // 上面的自定义方法 .logout() 在 user.ts 里为：
    /* 4. Actions: 退出登录方法
        function logout() {
            token.value = ''
            userInfo.value = {}
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
        }
    */

    // 提示
    // alert(`您已经退出登录！账号：${userName}`)
    console.log(userName)

    // 回到登录页
    router.push('/login')
    // router.push({name: 'Login'})
}


</script>
<template>
<div>
    <h1>后台 dashboard</h1>
    <nav>
        <h3>欢迎来到后台首页！</h3>
        欢迎用户：{{ userInfo.userName }} <br/>
        退出账号：<button @click="handleLogout">退出登录</button>
    </nav>
</div>


</template>
<style lang="css" scoped>


</style>