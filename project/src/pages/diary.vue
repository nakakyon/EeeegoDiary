<template>
  <v-main class="grey lighten-3">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-sheet
            rounded="lg"
            color="white"
            :min-height="$vuetify.breakpoint.mdAndUp ? '80vh' : ''"
          >
            <v-date-picker
              v-model="date"
              :events="arrayEvents"
              event-color="green lighten-1"
              full-width
              @update:picker-date="pickerUpdate($event)"
              @click:date="dateClick"
            ></v-date-picker>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="8">
          <v-sheet min-height="80vh" rounded="lg">
            <template v-if="diaryList.length === 0">
              該当日の日記はまだありません。
            </template>
            <template v-else>
              <v-card class="mx-auto">
                <v-list two-line max-height="80vh" class="overflow-y-auto">
                  <template v-for="(item, index) in diaryList">
                    <v-list-item :key="item.date">
                      <!-- NOTE: ビルドした場合に2つサイズを指定しないと崩れる -->
                      <v-list-item-avatar color="primary" size="48">
                        <v-avatar size="48">
                          <span class="white--text">{{ item.day }}</span>
                        </v-avatar>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title text-truncate>
                          {{ item.title }}
                        </v-list-item-title>
                        <v-list-item-subtitle text-truncate>
                          {{ item.text }}
                        </v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-btn depressed small @click="dateClick(item.date)">
                          編集
                          <v-icon color="orange darken-4" right>
                            mdi-open-in-new
                          </v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider
                      v-if="index < diaryList.length - 1"
                      :key="index"
                    ></v-divider>
                  </template>
                </v-list>
              </v-card>
            </template>
          </v-sheet>
        </v-col>
      </v-row>
      <diary-dialog
        :is-display.sync="isDisplay"
        :diary="diary"
        @getDiaryList="getDiaryList"
      ></diary-dialog>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import diaryDialog from '@/components/diaryDialog.vue'
import firebase from '@/plugins/firebase'
import { userStore } from '@/store'
import { DiaryDoc } from '@/datas/types'
import { Context } from '@nuxt/types'

@Component({
  components: { diaryDialog },
})
export default class Diary extends Vue {
  isDisplay: boolean = false
  date: string = new Date().toISOString().substr(0, 10)
  pickerDate: string = new Date().toISOString().substr(7)
  arrayEvents: string[] = []
  diaryList: {
    date: string
    day: string
    title: string
    text: string
    jpDiary: string
    enDiary: string
  }[] = []

  diary: {
    date: string
    jpDiary: string
    enDiary: string
  } = { date: '', jpDiary: '', enDiary: '' }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async asyncData(context: Context) {
    const yearMonth = new Date().toISOString().substr(7)
    const db = firebase.firestore()
    const diary = db
      .collection('users')
      .doc(userStore.getUid!)
      .collection('yearMonth')
      .doc(yearMonth)
      .collection('day')
    const snapShot = await diary.get()
    const arrayEvents: string[] = []
    const diaryList = snapShot.docs.map((doc) => {
      const data = doc.data() as DiaryDoc
      const jpDiaryArgs = data.jpDiary.split('\n')
      const title = jpDiaryArgs[0] !== null ? jpDiaryArgs[0] : ''
      const text = jpDiaryArgs
        .filter((value, index) => {
          if (index !== 0) {
            return value
          } else {
            return ''
          }
        })
        .join(' ')
      arrayEvents.push(`${yearMonth}-${doc.id}`)
      return {
        date: `${yearMonth}-${doc.id}`,
        day: doc.id,
        title,
        text,
        jpDiary: data.jpDiary,
        enDiary: data.enDiary,
      }
    })
    return { diaryList, arrayEvents }
  }

  dateClick(date: string) {
    this.date = date
    this.isDisplay = true
    const diaryData = this.diaryList.find((diary) => diary.date === date)
    if (diaryData) {
      this.diary = {
        date: diaryData.date,
        jpDiary: diaryData.jpDiary,
        enDiary: diaryData.enDiary,
      }
    } else {
      this.diary = { date, jpDiary: '', enDiary: '' }
    }
  }

  pickerUpdate(yearMonth: string) {
    this.pickerDate = yearMonth
    this.getDiaryList()
  }

  async getDiaryList() {
    const db = firebase.firestore()
    const diary = db
      .collection('users')
      .doc(userStore.getUid!)
      .collection('yearMonth')
      .doc(this.pickerDate)
      .collection('day')
    const snapShot = await diary.get()
    // 全てクリア
    this.arrayEvents.splice(0)
    this.diaryList = snapShot.docs.map((doc) => {
      const data = doc.data() as DiaryDoc
      const jpDiaryArgs = data.jpDiary.split('\n')
      const title = jpDiaryArgs[0] !== null ? jpDiaryArgs[0] : ''
      const text = jpDiaryArgs
        .filter((value, index) => {
          if (index !== 0) {
            return value
          } else {
            return ''
          }
        })
        .join(' ')
      this.arrayEvents.push(`${this.pickerDate}-${doc.id}`)
      return {
        date: `${this.pickerDate}-${doc.id}`,
        day: doc.id,
        title,
        text,
        jpDiary: data.jpDiary,
        enDiary: data.enDiary,
      }
    })
  }
}
</script>
