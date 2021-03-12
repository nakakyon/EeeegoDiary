import colors from 'vuetify/es5/util/colors'

export default {
  srcDir: 'src',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // titleTemplate: '%s - EnglishDiary',
    title: 'Eeee語日記',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Eeee語日記は、日本語と英語で日記を書くことで、日常生活と結びついた英語を学習するサービスです' },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'Eeee語日記,英語日記,英語,日記,English,Diary',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'robots', name: 'robots', content: 'noindex' },
    ],
    link: [
      { rel: 'shortcut icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        href: '/android-chrome-512x512.png',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/firebase.ts', { src: '~/plugins/localStorage.ts', ssr: false }, '~/plugins/axios.ts'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
  ],
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Eeee語日記',
      lang: 'ja',
      short_name: 'Eeee語日記',
      title: 'Eeee語日記',
      'og:title': 'Eeee語日記',
      description: 'Eeee語日記は、日本語と英語で日記を書くことで、日常生活と結びついた英語を学習するサービスです',
      'og:description': 'Eeee語日記は、日本語と英語で日記を書くことで、日常生活と結びついた英語を学習するサービスです',
      theme_color: '#FFFFFF',
      background_color: '#FFFFFF'
    },
  },
  // 画面遷移時にFirebase認証処理を実行
  router: {
    middleware: ["auth"]
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config: any, ctx: any) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|ts|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
}
