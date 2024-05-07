import $api from "~/http"

export interface IUser {
    _id: string
    email: string
    role: string
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<IUser | null>(useCookie('user').value ?? null as any)
    const isLoggedIn = computed(() => user.value !== null)

    function storeUser(usr: IUser) {
        user.value = usr
        const newCookie = useCookie('user', {
            maxAge: 60 * 24 * 28,
            secure: false
        })
        newCookie.value = JSON.stringify(usr)
    }

    async function login(email: string, password: string) {
        const response = await $api.post('/auth/login', { email, password })

        storeUser(response.data.user)
        localStorage.setItem('token', response.data.token)
    }

    async function register(email: string, password: string) {
        const response = await $api.post('/auth/register', { email, password })
    }


    return {
        user,
        isLoggedIn,
        login,
        register
    }
})