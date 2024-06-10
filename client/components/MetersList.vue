<script lang="ts" setup>
import { useMetersStore } from '~/stores/meters';
const metersStore = useMetersStore()
</script>

<template>
    <article>
        <div v-if="metersStore.meters?.length > 0">You have {{ metersStore.meters?.length }} meters:</div>
        <div v-else>You don't have any meters. Contact your administrator.</div>
        <div v-for="meter in metersStore.meters" :key="meter._id" class="mt-2 sm:mt-3">
            <hr>
            <div class="flex justify-between gap-3">
                <NuxtLink :to="`/meters/${meter._id}`" class="underline">{{ meter.name }}</NuxtLink>
                <div>devEUI: <b>{{ meter.devEUI }}</b></div>
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped></style>