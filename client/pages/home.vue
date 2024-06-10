<script lang="ts" setup>
definePageMeta({
    middleware: ['auth-middleware'],
});

import CurrentUser from '~/components/CurrentUser.vue';
import Header from '~/components/Header.vue';
import MetersList from '~/components/MetersList.vue';
import { useMetersStore } from '~/stores/meters';

const metersStore = useMetersStore()
onMounted(async () => {
    await metersStore.getMeters()
})
</script>

<template>
    <article class="layout-page-x-padding">
        <Header />
        <section class="layout-section-margin-top">
            <h2 class="text-heading-2">Home</h2>
            <CurrentUser />
            <ClientOnly>
                <MetersList class="layout-section-inner-margin-top" />
            </ClientOnly>
        </section>
    </article>
</template>

<style lang="scss" scoped></style>