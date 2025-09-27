import { defineStore } from 'pinia'

export const useTemporaryStore = defineStore('temporary', {
    state: (): {
        searchText: string,
    } => ({
        searchText: '',
    }),
})