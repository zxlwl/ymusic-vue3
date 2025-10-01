import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
    state: (): {
        name: string,
        image: string,
        themeType: 'light' | 'dark'
    } => ({
        name: 'user',
        image: '',
        themeType: 'light'
    }),
    persist: {
        key: 'user',
    },
    actions: {
        setTheme(theme: 'light' | 'dark') {
            this.themeType = theme
        }
    }
})
