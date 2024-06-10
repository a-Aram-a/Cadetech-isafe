import $api from "~/http"

export interface IApplication {
    id: string
    name: string
    description: string
}

export const useApplicationsStore = defineStore('applications', () => {
    const applications = ref([] as any)

    return {
        applications,
    }
})