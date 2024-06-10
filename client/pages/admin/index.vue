<script lang="ts" setup>
definePageMeta({
    middleware: ['auth-middleware'],
});

import Header from '~/components/Header.vue';
import CurrentUser from '~/components/CurrentUser.vue';
import TenantIdForm from '~/components/admin/TenantIdForm.vue';
</script>

<template>
    <article class="layout-page-x-padding">
        <Header />
        <section class="layout-section-margin-top">
            <h2 class="text-heading-2">Admin</h2>
            <CurrentUser />
            <TenantIdForm class="layout-section-inner-margin-top" />
        </section>
    </article>
</template>

<style lang="scss" scoped></style>