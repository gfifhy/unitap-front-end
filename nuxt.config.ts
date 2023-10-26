// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: { rootId: false, rootTag: undefined },
  devServer: {
    host: "127.0.0.1",
    port: 5173,
  },
  devtools: { enabled: true },
  css: ['~/tailwind.css',],
  components: [{ path: '~/components', pathPrefix: false }],
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@pinia/nuxt',
  ],
  postcss: {
    plugins: {
      'postcss-nesting': { },
    },
  },
  ui: {
    global: true,
    icons: ['mdi', 'simple-icons'],
  },
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
