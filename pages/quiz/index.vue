<style lang="scss"></style>

<template>
  <section ref="wrapper">
    <v-card>
      <vr-data-grid
        :headers="headers"
        :title="title"
        :queryService="getService"
        :service="$service.quiz"
        :filters="filters"
        :withRecycle="true"
      >
        <template #actions_right="{item}">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon depressed text :ripple="false" v-on="on">
                <v-icon @click="send_test(item)">la-paper-plane</v-icon>
              </v-btn>
            </template>
            <span>ارسال تستی</span>
          </v-tooltip>
        </template>
        <template #items="{item}">
          <td>{{ item.id }}</td>
          <td>
            <v-avatar size="75" color="grey" class="my-3">
              <img v-if="item.image" :src="item.image.replace('original','thumb')" alt="alt" />
            </v-avatar>
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.question }}</td>
          <td>
            <span>
              <v-icon color="green" class="ml-1">la-check</v-icon>
              <span>پاسخ صحیح {{correct_answers(item) | persianDigit}}</span>
            </span>
            <br />
            <br />
            <span>
              <v-icon color="red" class="ml-1">la-remove</v-icon>
              <span>پاسخ غلط {{incorrect_answers(item) | persianDigit}}</span>
            </span>
          </td>
          <td>
            <v-btn
              :color="answer.is_correct ? 'secondary' : 'info'"
              outline
              depressed
              small
              :ripple="false"
              class="ma-1"
              v-for="(answer, i) in item.answers"
              :key="i"
            >
              <v-icon size="17" class="ml-2" v-if="answer.is_correct">la-check-square</v-icon>
              <span>{{ answer.text }}</span>
            </v-btn>
          </td>
          <td>{{ item.created_at | persianDate | persianDigit }}</td>

          <td>
            <span v-if="item.send_time">{{ item.send_time | persianDate | persianDigit }}</span>
            <span v-else>-</span>
          </td>
        </template>
      </vr-data-grid>
    </v-card>
  </section>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'

Component.registerHooks(['meta'])
@Component({
  middleware: 'authorization'
})
export default class QuizPage extends Vue {
  title = {
    text: 'لیست سوال ها',
    icon: 'la-question'
  }
  headers = [
    { text: 'آیدی', align: 'right', value: 'id', width: '20%' },
    { text: 'عکس', align: 'right', sortable: false, width: '20%' },
    { text: 'عنوان', align: 'right', value: 'title', width: '20%' },
    { text: 'متن سوال', align: 'right', value: 'question', width: '20%' },
    { text: 'پاسخ کاربران', align: 'right', sortable: false, width: '20%' },
    {
      text: 'پاسخ ها',
      align: 'right',
      sortable: false,
      width: '10%'
    },
    {
      text: 'تاریخ ایجاد',
      align: 'right',
      value: 'created_at',
      width: '10%'
    },
    {
      text: 'تاریخ ارسال',
      align: 'right',
      sortable: false,
      width: '10%'
    }
  ]
  filters = []
  get meta() {
    return { roles: ['administrator', 'bot_admin'] }
  }
  getService(params) {
    return this.$service.quiz.$query(params)
  }
  async send_test(item) {
    try {
      let chat_id = await this.$dialog
        .title('چت آیدی مورد نظر را وارد نمایید')
        .prompt()
      try {
        let response = await this.$service.quiz.send_test(item.id, chat_id)
        this.$toast.success().showSimple('با موفقیت ارسال شد')
      } catch (error) {
        console.log(error)
        this.$toast.error().showSimple('با مشکل مواجه شد')
      }
    } catch (error) {}
  }
  correct_answers(item) {
    return item.quiz_answers.filter(item => item.is_correct == 1).length
  }
  incorrect_answers(item) {
    return item.quiz_answers.filter(item => item.is_correct == 0).length
  }
}
</script>

