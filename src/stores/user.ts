import { defineStore } from 'pinia'
import type { GlobalTheme } from 'naive-ui'
import { lightTheme } from 'naive-ui'
export const useUserStore = defineStore('user', {
    state: (): {
        name: string,
        image: string,
        theme: GlobalTheme,
    } => ({
        name: 'user',
        image: '',
        theme: lightTheme,
    }),
    persist: {
        key: 'user',
    },
    actions: {
        setTheme(theme: GlobalTheme | null) {
            this.theme = theme || lightTheme
        }
    }
})
