// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: { rootId: false, rootTag: undefined },
  devServer: {
    host: "127.0.0.1",
    port: 5173,
    // https: {
    //   key: fs.readFileSync("C:/A/laragon-portable/www/localhost.key").toString(),
    //   cert: fs.readFileSync("C:/A/laragon-portable/www/localhost.crt").toString(),
    // },
  },
  devtools: { enabled: true },
  css: ['~/styles.css', '~/styles.less'],
  components: [{ path: '~/components', pathPrefix: false }],
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
  ],
  ui: {
    global: true,
    icons: ['mdi', 'simple-icons'],    
  },
})
