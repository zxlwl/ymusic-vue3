import { defineStore } from 'pinia'

export const useApiStore = defineStore('api', {
    state: (): {
        api: string,
    } => ({
        api: 'https://musicapi.leanapp.cn',
    }),
    actions: {
        setApi(api: string) {
            this.api = api
        }
    }
})