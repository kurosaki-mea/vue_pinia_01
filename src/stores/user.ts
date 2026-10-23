
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore('user', () => {
    // 1. state：从 localStorage 初始化，防止页面刷新后登录状态丢失
    // 定义了一个响应式变量 token 指定类型是字符串类型，
    // 然后local....获取本地缓存名为token的数据，如果没有就用''空字符串代替
    const token = ref<string>(localStorage.getItem('token') || '')
    const userInfo = ref<any>(JSON.parse(localStorage.getItem('userInfo') || '{}'))

    // 2. getters / 计算属性：判断是否登录
    // !!（双叹号）：用来把变量强制转换为布尔值（true 或 false）
    // 如果token有东西，比如aa，就先!aa为false，然后!!aa就变成了true（代表已经登录）
    // 如果没有东西是个空字符串，!token.value为true，然后!!token.value就是false（未登录）
    const isLogin = computed(() => !!token.value)

    // 3. Actions: 登录方法
    function setLoginData(newToken: string, info: any) {
        token.value = newToken
        userInfo.value = info
        // 同步到本地缓存localStorage
        localStorage.setItem('token', newToken)
        localStorage.setItem('userInfo', JSON.stringify(info))
    }

    // 4. Actions: 退出登录方法
    function logout() {
        // 清空 Pinia 内存里的状态：
        token.value = ''
        userInfo.value = {}
        // 清空浏览器本地持久化缓存：
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
    }

    return { token, userInfo, isLogin, setLoginData, logout }
})