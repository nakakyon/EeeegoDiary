import { userStore } from '@/store'
import firebase from '@/plugins/firebase'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ({ route, store, redirect }: any) {
  if (route.name !== 'index' && route.name !== 'login') {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        userStore.login(user.uid)
      } else {
        redirect('/')
      }
    })
  }
}
