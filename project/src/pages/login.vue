<template>
  <v-main>
    <v-container>
      <firebase-auth />
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import FirebaseAuth from '@/components/firebaseAuth.vue'

@Component({
  components: {
    FirebaseAuth,
  },
})
export default class Login extends Vue {}
</script>
