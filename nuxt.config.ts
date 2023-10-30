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
})