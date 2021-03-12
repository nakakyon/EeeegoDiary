import TransRepository from '~/repository/transRepository'

// Vueインスタンスや、Contextの型を拡張する
declare module 'vue/types/vue' {
  interface Vue {
    readonly $transRepository: TransRepository
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    readonly $transRepository: TransRepository
  }

  interface Context {
    readonly $transRepository: TransRepository
  }
}
