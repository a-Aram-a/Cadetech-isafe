import $api from "~/http"

export interface IUser {
    _id: string
    email: string
    role: string
    tenantId: string
}

export const useAuthStore = defineStore('auth', () => {
    const user = useCookie<IUser | undefined>('user')
    const accessToken = useCookie<string | undefined>('token')
    const isLoggedIn = computed(() => user.value !== undefined)

    async function login(email: string, password: string) {
        const response = await $api.post('/auth/login', { email, password })

        user.value = response.data.user
        accessToken.value = response.data.token
    }

    async function register(email: string, password: string) {
        const response = await $api.post('/auth/register', { email, password })
    }

    async function logout() {
        try {
            const response = await $api.post('/auth/logout')
        } catch (e) {
            throw e
        } finally {
            user.value = undefined
            accessToken.value = undefined
        }
    }

    async function updateUser(id: string, data: any) {
        const response = await $api.patch(`/auth/users/${id}`, data)
        if(response.data._id === user.value?._id) {
            user.value = response.data
        }
        return response.data
    }

    return {
        user,
        isLoggedIn,
        login,
        register,
        logout,

        updateUser
    }
})