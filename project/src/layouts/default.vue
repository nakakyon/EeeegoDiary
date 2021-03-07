<template>
  <v-app>
    <v-app-bar app color="white">
      <v-toolbar-title class="font-weight-black headline">
        Eeee語日記
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <client-only>
        <template v-if="!isLogin">
          <v-btn color="grey" to="/login" outlined large>
            <span class="grey--text text--darken-1 font-weight-bold">
              ログイン
            </span>
          </v-btn>
        </template>
        <template v-else>
          <v-btn color="grey" outlined large @click="logout">
            <span class="grey--text text--darken-1 font-weight-bold">
              ログアウト
            </span>
          </v-btn>
        </template>
      </client-only>
    </v-app-bar>
    <nuxt />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { userStore } from '@/store'
import firebase from '@/plugins/firebase'

@Component({
  components: {},
})
export default class Index extends Vue {
  get isLogin() {
    return userStore.isLogin
  }

  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        userStore.logout()
        this.$router.push('/')
      })
  }
}
</script>
