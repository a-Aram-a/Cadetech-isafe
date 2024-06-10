import $api from "~/http"

export interface IMeter {
    _id: string
    devEUI: string
    name: string
    description?: string
    type: 'virtual' | 'smart-as0101' | 'isafe'
    address: string
    status: 'active' | 'inactive'
    user: string
}

export const useMetersStore = defineStore('meters', () => {
    const meters = ref<IMeter[]>([])

    async function getMeters() {
        const response = await $api.get('/meters')
        meters.value = response.data
    }

    async function getMeterMessages(meterId: any) {
        const response = await $api.get(`/meters/${meterId}/messages`)
        return response.data
    }

    return {
        meters,
        getMeters,
        getMeterMessages
    }
})