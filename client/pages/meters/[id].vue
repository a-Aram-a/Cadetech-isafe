<script lang="ts" setup>
import { useMetersStore } from '~/stores/meters';

const metersStore = useMetersStore()

const id = useRoute().params.id

const meterMessages = ref<any[]>([])

onMounted(async () => {
    meterMessages.value = await metersStore.getMeterMessages(id)

    //let messagesEventSource = new EventSource("/events/subscribe");
})
</script>

<template>
    <article class="layout-page-x-padding">
        <Header />
        <section class="layout-section-margin-top">
            <CurrentUser />
            <h2 class="text-heading-2 mt-6">Meter (id: {{ id }})</h2>
            <ClientOnly>
                <section>
                    <div class="mt-4">
                        <div v-if="meterMessages?.length">Messages ({{ meterMessages.length }}):</div>
                        <div v-else>No messages yet.</div>
                    </div>
                    <div v-for="message in meterMessages" :key="message._id" class="mt-5">
                        <p>{{ message.message }}</p>
                    </div>
                </section>
            </ClientOnly>
        </section>
    </article>
</template>

<style lang="scss" scoped></style>