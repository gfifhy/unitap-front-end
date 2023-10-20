// https://logo.com/docs/api/configuration/logo-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vite-pwa/nuxt',
  ],


  pwa: {
    manifest: {
      name: 'Unitap',
      short_name: 'Unitap',
      description: 'Testing PWA in unitap',
      icons: [
        {
          src: 'logo.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'logo.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: 'logo.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'logo.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ]
    },
    workbox: {
      navigateFallback: '/',
    },
    devOptions: {
      enabled: true,
      type: "module",
    },

  }
})
