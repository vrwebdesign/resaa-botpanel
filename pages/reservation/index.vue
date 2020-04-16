<style lang="scss"></style>

<template>
  <section ref="wrapper">
    <v-card>
      <vr-data-grid
        :headers="headers"
        :title="title"
        :service="$service.reservations"
        :filters="filters"
        :withRecycle="true"
      >
        <template #items="{item}">
          <td>{{ item.id }}</td>
          <td>{{ item.track_id }}</td>
          <td>{{ item.doctor_subscriber }}</td>
          <td>
            <span v-if="item.patient">{{ item.patient.name }}</span>
            <span v-else>-</span>
          </td>
          <td>
            <vr-badge
              :color="status_colors[item.status]"
            >{{item.status | enum('reservation_status')}}</vr-badge>
          </td>
          <td>{{ item.start | persianDate('jYYYY/jMM/jDD HH:mm') | persianDigit }}</td>
          <td>{{ item.end | persianDate('jYYYY/jMM/jDD HH:mm') | persianDigit }}</td>
          <td>{{ item.created_at | persianDate | persianDigit }}</td>
        </template>
      </vr-data-grid>
    </v-card>
  </section>
</template>
<script>
import status_colors from '@/colors/reservation_status'
export default {
  data() {
    return {
      title: {
        text: 'لیست رزروها',
        icon: 'la-calendar-day'
      },
      headers: [
        { text: 'آیدی', align: 'right', value: 'id', width: '10%' },
        { text: 'کد پیگیری', align: 'right', value: 'track_id', width: '10%' },
        {
          text: 'آیدی پزشک',
          align: 'right',
          value: 'doctor_subscriber',
          width: '10%'
        },
        {
          text: 'نام و نام خانوادگی',
          align: 'right',
          value: 'title',
          width: '10%'
        },
        { text: 'وضعیت', align: 'right', value: 'status', width: '10%' },
        { text: 'شروع', align: 'right', value: 'start', width: '10%' },
        { text: 'پایان', align: 'right', value: 'end', width: '10%' },
        {
          text: 'تاریخ ایجاد',
          align: 'right',
          value: 'created_at',
          width: '10%'
        }
      ],
      filters: [
        {
          label: 'آیدی',
          model: 'id'
        },
        {
          label: 'کد پیگیری',
          model: 'track_id'
        },
        {
          label: 'آیدی پزشک',
          model: 'doctor_subscriber'
        },
        {
          label: 'وضعیت',
          type: 'select',
          items: [
            { text: 'همه', value: null },
            ...this.$enum.reservation_status.toSelect
          ],
          model: 'status'
        }
      ],
      service: this.$service.students,
      status_colors
    }
  },
  mounted() {},
  methods: {
    getService(params) {
      return this.$service.quiz.$query(params)
    },
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
    },
    correct_answers(item) {
      return item.quiz_answers.filter(item => item.is_correct == 1).length
    },
    incorrect_answers(item) {
      return item.quiz_answers.filter(item => item.is_correct == 0).length
    }
  }
}
</script>
