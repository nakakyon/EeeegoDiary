import { Context } from '@nuxt/types'
import createPersistedState from 'vuex-persistedstate'

// データをLocal Storageに保存
export default ({ store }: Context) => {
  createPersistedState({
    paths: ['user'],
  })(store)
}
