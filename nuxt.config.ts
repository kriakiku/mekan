import * as messages from './translations'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({

    modules: [
        'nuxt-icon',
        '@nuxt/image-edge',
        '@kevinmarrec/nuxt-pwa',
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

    pwa: {
      workbox: {
        enabled: true,
        // templatePath: '~/worker.js'
      },
      manifest: {
          name: 'Mekan restaurant menu',
          short_name: 'Mekan',
          description: 'Mekan restaurant menu',          
      },
      meta: {
        name: 'Mekan',
        author: 'Jonas Otter',
        description: 'Mekan restaurant menu',
        favicon: true,
        mobileApp: true,
        mobileAppIOS: true,
        appleStatusBarStyle: true,
        theme_color: '#fff',
        lang: 'en',
      }
    },
    css: ['normalize.css/normalize.css']

})
