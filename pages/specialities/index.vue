<style lang="scss"></style>

<template>
  <section ref="wrapper">
    <v-card>
      <vr-data-grid
        :headers="headers"
        :title="title"
        :service="$service.specialities"
        :filters="filters"
        :withRecycle="true"
        :withAdd="false"
      >
        <template #items="{item}">
          <td>{{ item.id | persianDigit }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
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
export default class SpecialityPage extends Vue {
  title = {
    text: 'لیست تخصص‌ها',
    icon: 'la-tag'
  }
  headers = [
    { text: 'آیدی', align: 'right', value: 'id', width: '10%' },
    {
      text: 'عنوان',
      align: 'right',
      value: 'title',
      width: '20%'
    },
    { text: 'توضیحات', align: 'right', value: 'description', width: '20%' }
  ]
  filters = [
    {
      label: 'آیدی',
      model: 'id:='
    },
    {
      label: 'عنوان',
      model: 'title'
    }
  ]
  service = this.$service.specialities

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

