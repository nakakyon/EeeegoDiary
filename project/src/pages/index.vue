<template>
  <v-main>
    <section id="hero">
      <v-row no-gutters>
        <v-img
          :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
          :src="`${require(`@/static/top-image.jpeg`)}`"
        >
          <v-theme-provider>
            <v-container fill-height>
              <v-row
                align="center"
                class="white--text mx-auto"
                justify="center"
              >
                <v-col class="white--text text-center" cols="12" tag="h1">
                  <span
                    :class="[
                      $vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2',
                    ]"
                    class="font-weight-light"
                  >
                    WELCOME TO
                  </span>

                  <br />

                  <span
                    :class="[
                      $vuetify.breakpoint.smAndDown ? 'display-3' : 'display-4',
                    ]"
                    class="font-weight-black"
                  >
                    Eeee語日記
                  </span>
                </v-col>

                <v-btn
                  class="align-self-end"
                  fab
                  outlined
                  color="white"
                  @click="$vuetify.goTo('#about-me')"
                >
                  <v-icon>mdi-chevron-double-down</v-icon>
                </v-btn>
              </v-row>
            </v-container>
          </v-theme-provider>
        </v-img>
      </v-row>
    </section>

    <section id="about-me">
      <div class="py-12"></div>

      <v-container class="text-center">
        <h2 class="display-2 font-weight-bold mb-3">Eeee語日記とは</h2>

        <v-responsive class="mx-auto mb-8" width="56">
          <v-divider class="mb-1"></v-divider>

          <v-divider></v-divider>
        </v-responsive>

        <v-responsive
          class="mx-auto title font-weight-light mb-8"
          max-width="720"
        >
          Eeee語日記は、日本語と英語で日記を書くことで、<br />
          日常生活と結びついた英語を学習するサービスです<br /><br />
          こんな人におすすめです<br />
        </v-responsive>
        <v-row>
          <v-col
            v-for="({ icon, title, text }, i) in descriptions"
            :key="i"
            cols="12"
            md="4"
          >
            <v-card
              class="py-12 px-4"
              color="grey lighten-5"
              flat
              height="100%"
            >
              <v-theme-provider dark>
                <div>
                  <v-avatar color="primary" size="88">
                    <v-icon large v-text="icon"></v-icon>
                  </v-avatar>
                </div>
              </v-theme-provider>

              <v-card-title
                class="justify-center font-weight-black text-uppercase"
                v-text="title"
              ></v-card-title>

              <v-card-text class="subtitle-1" v-text="text"> </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <div></div>
        <v-responsive
          class="mx-auto title font-weight-light mt-8 mb-4"
          max-width="720"
        >
          Eeee語日記を使ってオリジナルのフレーズが<br />
          瞬時に組み立てられるように取り組みましょう！
        </v-responsive>
        <v-btn color="grey" to="/login" outlined large>
          <span class="grey--text text--darken-1 font-weight-bold">
            ログイン
          </span>
        </v-btn>
      </v-container>
      <div class="py-12"></div>
    </section>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class Index extends Vue {
  descriptions: { icon: string; title: string; text: string }[] = [
    {
      icon: 'mdi-school',
      title: '勉強しても話せる気がしない',
      text:
        '中学、高校、大学と勉強をしてきて読み書きは多少はできるが、英語を話すまでには至っていない',
    },
    {
      icon: 'mdi-account-group-outline',
      title: '話したい単語が思い浮かばない',
      text: '仲間内で英語をふざけて話すこともできない',
    },
    {
      icon: 'mdi-emoticon-cry-outline',
      title: '英語教材が日常とリンクしない',
      text: 'I have a pen. を使う機会なんてない',
    },
  ]
}
</script>
