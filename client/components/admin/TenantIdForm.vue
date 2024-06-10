<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore()

async function onSubmit(e: any) {
    try {
        if(!authStore.user?._id) return
        const updatedUser = await authStore.updateUser(authStore.user?._id, { tenantId: e.target.tenantId.value })
        authStore.user = updatedUser
        alert('Operation successful')
    } catch (error: any) {
        const message = error?.response?.data?.message ?? 'Operation failed'
        alert(`Error: ${message}`)
    }
}
</script>

<template>
    <form @submit.prevent="onSubmit">
        <label>ChirpStack tenantId:</label> <br>
        <input type="text" name="tenantId" placeholder="Your ChirpStack tenant id" class="p-1 rounded-xl border" :value="authStore.user?.tenantId" required>
        <button class="common-button--blue">Submit</button>
    </form>
</template>

<style lang="scss" scoped>
</style>