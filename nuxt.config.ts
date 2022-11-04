import * as messages from './translations'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({

    modules: [
        'nuxt-icon',
        '@nuxt/image-edge',
    ],
    buildModules: [
        '@nuxtjs/google-fonts',
        '@nuxtjs/i18n',
    ],
    googleFonts: {
        families: {
            Nunito: {
                wght: [100, 300, 400, 500, 600],
            },
        }
    },
    i18n: {
        locales: [
            { code: 'tr', iso: 'tr-TR' },
            { code: 'en', iso: 'en-US' },
            { code: 'ua', iso: 'ua-UA' },
            { code: 'ru', iso: 'ru-RU' }
        ],
        defaultLocale: 'en',
        vueI18n: {
            fallbackLocale: 'en',
            messages
        }
    },

    image: {
        domains: ['www.avrasyacity.com'],
        provider: 'ipx'
    },

    app: {
        head () {
            return this.$nuxtI18nHead({ addSeoAttributes: true });
        },
    },

    css: ['normalize.css/normalize.css']

})
