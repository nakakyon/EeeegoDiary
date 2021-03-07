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
                  rows="2"
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
                  rows="2"
                  outlined
                  dense
                  auto-grow
                  placeholder="日記に書いた内容を英訳してみましょう"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed @click="cancel"> キャンセル </v-btn>
            <v-btn depressed color="primary" @click="submit"> 保存 </v-btn>
          </v-card-actions>
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

  required = (v: string) => !!v || '入力して下さい'

  @Watch('syncedIsDisplay')
  daialogOpen() {
    if (this.syncedIsDisplay) {
      this.date = this.diary.date
      this.jpDiary = this.diary.jpDiary
      this.enDiary = this.diary.enDiary
    } else {
      this.date = ''
      this.jpDiary = ''
      this.enDiary = ''
    }
  }

  cancel() {
    ;(this.$refs as any).form.resetValidation()
    this.syncedIsDisplay = false
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
