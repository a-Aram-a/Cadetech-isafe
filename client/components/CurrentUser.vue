<script lang="ts" setup>
const authStore = useAuthStore()
</script>

<template>
    <p>Current user: <b>{{ authStore.user?.email }}</b></p>
</template>

<style lang="scss" scoped>
</style>