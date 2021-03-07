<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { userStore } from '@/store'
import firebase, { authProviders } from '@/plugins/firebase'

@Component({})
export default class FirebaseAuth extends Vue {
  mounted() {
    firebase.auth().onAuthStateChanged((user: any) => {
      if (!user) {
        const firebaseui = require('firebaseui-ja')
        require('firebaseui-ja/dist/firebaseui.css')
        const ui =
          firebaseui.auth.AuthUI.getInstance() ||
          new firebaseui.auth.AuthUI(firebase.auth())

        const config = {
          signInOptions: [authProviders.Email, authProviders.Gmail],
          callbacks: {
            signInSuccessWithAuthResult: () => {
              this.$router.push('/diary')
              return false
            },
            signInSuccessUrl: '/diary',
            signInFlow: 'popup',
          },
        }
        ui.start('#firebaseui-auth-container', config)
      } else {
        userStore.login(user.uid)
        this.$router.push('/diary')
      }
    })
  }
}
</script>
