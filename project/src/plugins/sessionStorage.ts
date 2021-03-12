import { Context } from '@nuxt/types'
import createPersistedState from 'vuex-persistedstate'

// データをSession Storageに保存
export default ({ store }: Context) => {
  createPersistedState({
    paths: ['user'],
    storage: window.sessionStorage,
  })(store)
}
