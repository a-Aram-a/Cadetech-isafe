<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore()

async function onSubmit(e: any) {
    const elements = e.target.elements

    const email = elements.email.value
    const password = elements.password.value

    try {
        await authStore.login(email, password)
        await navigateTo('/home')
    } catch (error: any) {
        const message = error?.response?.data?.message ?? 'Login failed'
        alert(`Error: ${message}`)
    }
}
</script>

<template>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-6 bg-background-secondary p-6 rounded-2xl min-w-96">
        <div class="flex flex-col gap-2">
            <label>Email</label>
            <input type="email" name="email" class="p-2 rounded-xl border" required placeholder="Enter your email">
        </div>
        <div class="flex flex-col gap-2">
            <label>Password</label>
            <input type="text" name="password" class="p-2 rounded-xl border" required placeholder="Enter your password">
        </div>
        <button class="btn btn-primary">Login</button>
    </form>
</template>

<style lang="scss" scoped></style>