import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import User from '@/store/user'

// eslint-disable-next-line import/no-mutable-exports
let userStore: User

// ストアを初期化する関数。rootのstoreを受け取って、モジュールを初期化する
function initialiseStores(store: Store<any>): void {
  // userStoreはここで初期化。
  userStore = getModule(User, store)
}

export { initialiseStores, userStore }
