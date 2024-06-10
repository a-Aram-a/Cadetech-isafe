<script lang="ts" setup>
const authStore = useAuthStore();

async function logout() {
    try {
        await authStore.logout()
    } catch (error: any) {
        const message = error?.response?.data?.message ?? 'Logout failed'
        alert(`Error: ${message}`)
    } finally {
        await navigateTo('/')
    }
}
</script>

<template>
    <header class="text-center pt-6 flex justify-between gap-4 items-center">
        <h1 class="text-heading-1">MyCadetech iSAFE</h1>
        <div class="flex gap-2 sm:gap-3">
            <NuxtLink to="/admin" class="common-button--blue" v-if="authStore.user?.role === 'admin' && !$route.path.startsWith('/admin')">Admin</NuxtLink>
            <NuxtLink to="/home" class="common-button--blue" v-else>Home</NuxtLink>
            <button class="common-button--blue" @click="logout()">Logout</button>
        </div>
    </header>
</template>

<style lang="scss" scoped></style>