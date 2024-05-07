// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/main.scss'],
  modules: [
    '@pinia/nuxt',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  routeRules: {
    "/api/**": {
      proxy: 'http://server:3001/**'
    },
  },
  vite: {
    server: {
      watch: {
        usePolling: true
      }
    }
  }
})
