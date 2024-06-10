import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    if (!authStore.isLoggedIn) {
        return navigateTo('/');
    }
    if(to.path.startsWith('/admin') && authStore.user?.role !== 'admin') {
        return navigateTo('/home');
    }
})
