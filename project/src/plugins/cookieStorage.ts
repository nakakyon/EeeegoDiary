import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'
import { Context } from '@nuxt/types'

export default ({ store, req, isDev }: Context) => {
  createPersistedState({
    paths: ['user'],
    storage: {
      getItem: (key) =>
        process.client
          ? Cookies.getJSON(key)
          : cookie.parse(req.headers.cookie || '')[key],
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 1, secure: !isDev }),
      removeItem: (key) => Cookies.remove(key),
    },
  })(store)
}
