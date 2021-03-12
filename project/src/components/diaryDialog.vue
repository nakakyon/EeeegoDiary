<template>
  <v-dialog
    v-model="syncedIsDisplay"
    :max-width="$vuetify.breakpoint.mdAndUp ? '80vw' : ''"
    @close="cancel"
    @click:outside="cancel"
  >
    <v-form ref="form">
      <v-card>
        <v-container>
          <v-card-title>{{ date }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="jpDiary"
                  label="日記"
                  rows="4"
                  outlined
                  dense
                  auto-grow
                  placeholder="1行目にタイトル、2行目以降は本文を書いて下さい"
                  :rules="[required]"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="enDiary"
                  label="英訳"
                  rows="4"
                  outlined
                  dense
                  auto-grow
                  placeholder="日記に書いた内容を英訳してみましょう"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="transDiary"
                  label="翻訳"
                  rows="2"
                  outlined
                  dense
                  auto-grow
                  readonly
                  placeholder="翻訳した日記の内容がここに書き込まれます"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn depressed color="primary" @click="trans"> 翻訳 </v-btn>
            <v-spacer></v-spacer>
            <v-btn depressed @click="cancel"> キャンセル </v-btn>
            <v-btn depressed color="primary" @click="submit"> 保存 </v-btn>
          </v-card-actions>
          <v-dialog v-model="isLoading" hide-overlay persistent width="300">
            <v-card color="primary" dark>
              <v-card-text>
                翻訳中…
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-container>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Watch } from 'nuxt-property-decorator'
import firebase from '@/plugins/firebase'
import { userStore } from '@/store'

@Component({
  components: {},
})
export default class Dialog extends Vue {
  @PropSync('isDisplay', { type: Boolean })
  syncedIsDisplay!: boolean

  @Prop(Object)
  diary!: {
    date: string
    jpDiary: string
    enDiary: string
  }

  date: string = ''
  jpDiary: string = ''
  enDiary: string = ''
  transDiary: string = ''
  isLoading: boolean = false

  required = (v: string) => !!v || '入力して下さい'

  @Watch('syncedIsDisplay')
  daialogOpen() {
    if (this.syncedIsDisplay) {
      this.date = this.diary.date
      this.jpDiary = this.diary.jpDiary
      this.enDiary = this.diary.enDiary
      this.transDiary = ''
    } else {
      this.date = ''
      this.jpDiary = ''
      this.enDiary = ''
      this.transDiary = ''
    }
  }

  cancel() {
    ;(this.$refs as any).form.resetValidation()
    this.syncedIsDisplay = false
  }

  async trans() {
    this.isLoading = true
    // 改行単位に分割
    const diaryTexts = this.jpDiary.split('\n')
    // API呼び出し単位に翻訳する文字列を格納する
    const apiCalls: string[] = []
    let text: string = ''

    for (let i = 0; i < diaryTexts.length; i++) {
      text = text + diaryTexts[i] + '\n'
      let isPushed = false
      // 500文字を超えた場合は追加
      if (text.length > 500) {
        apiCalls.push(text)
        isPushed = true
        // 初期化
        text = ''
      }
      // 最後の配列で追加を行っていない場合は追加
      if (i === diaryTexts.length - 1 && !isPushed) {
        apiCalls.push(text)
      }
    }

    // Promiseインスタンスの配列を作成
    const transDiaries = apiCalls.map(async (value) => {
      return await this.$transRepository.get('ja', 'en', value)
    })
    // Promiseインスタンスの配列を翻訳し、文字列に変換する
    this.transDiary = (await Promise.all(transDiaries)).join('')
    // 末尾が改行で終わってる場合はTRIMして除去する
    this.transDiary = this.transDiary.trim()
    this.isLoading = false
  }

  async submit() {
    if (!(this.$refs as any).form.validate()) {
      return
    }

    const db = firebase.firestore()
    await db
      .collection('users')
      .doc(userStore.getUid!)
      .collection('yearMonth')
      .doc(this.date.substring(0, 7))
      .collection('day')
      .doc(this.date.substring(8, 10))
      .set(
        {
          jpDiary: this.jpDiary,
          enDiary: this.enDiary,
        },
        { merge: true }
      )
    this.syncedIsDisplay = false
    this.$emit('getDiaryList')
  }
}
</script>
