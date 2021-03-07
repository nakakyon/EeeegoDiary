import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

// Stateの型を定義する
export interface UserState {
  uid: string | null
}

// デコレータを設定。nameにモジュール名を指定する。UserStateを継承する
@Module({ stateFactory: true, namespaced: true, name: 'user' })
export default class UserModule extends VuexModule implements UserState {
  uid: string | null = null

  // getterはデコレータなしのgetアクセサで書く
  get isLogin(): boolean {
    return this.uid != null
  }

  get getUid(): string | null {
    return this.uid
  }

  // mutationはデコレータで指定
  @Mutation
  set(uid: string | null) {
    this.uid = uid
  }

  // actionもデコレータで指定
  @Action({ rawError: true })
  login(uid: string | null) {
    // thisでmutationが呼べる
    this.set(uid)
  }

  @Action({ rawError: true })
  logout() {
    // thisでmutationが呼べる
    this.set(null)
  }
}
