<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();

definePageMeta({
    middleware: function (to, from) {
        const authStore = useAuthStore();

        if (!authStore.isLoggedIn) {
            return navigateTo('/');
        }
    },
});
</script>

<template>
    <article class="layout-page-x-padding">
        <header class="text-center pt-6">
            <h1 class="text-heading-1">Home</h1>
            <p>Hello, {{ authStore.user?.email }}</p>
        </header>
    </article>
</template>

<style lang="scss" scoped></style>