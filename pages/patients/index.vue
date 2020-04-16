<style lang="scss"></style>

<template>
  <section ref="wrapper">
    <v-card>
      <vr-data-grid
        :headers="headers"
        :title="title"
        :service="$service.patients"
        :filters="filters"
        :withRecycle="true"
      >
        <template #items="{item}">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.mobile }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.created_at | persianDate | persianDigit }}</td>
        </template>
      </vr-data-grid>
    </v-card>
  </section>
</template>
<script>
export default {
  data() {
    return {
      title: {
        text: 'لیست بیماران',
        icon: 'la-user-injured'
      },
      headers: [
        { text: 'آیدی', align: 'right', value: 'id', width: '10%' },
        {
          text: 'نام و نام خانوادگی',
          align: 'right',
          value: 'title',
          width: '20%'
        },
        { text: 'موبایل', align: 'right', value: 'mobile', width: '20%' },
        { text: 'ایمیل', align: 'right', vaue: 'email', width: '20%' },
        {
          text: 'تاریخ ایجاد',
          align: 'right',
          value: 'created_at',
          width: '20%'
        }
      ],
      filters: [
        {
          label: 'آیدی',
          model: 'id:='
        },
        {
          label: 'موبایل',
          model: 'mobile'
        },
        {
          label: 'ایمیل',
          model: 'email'
        }
      ],
      service: this.$service.students
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
