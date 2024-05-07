// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
