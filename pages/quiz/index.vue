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
                <v-icon @click="send_test(item)">la-send</v-icon>
              </v-btn>
            </template>
            <span>ارسال تستی</span>
          </v-tooltip>
        </template>
        <template #items="{item}">
          <td>{{ item.title }}</td>
          <td>{{ item.question }}</td>
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
              <v-icon size="17" class="ml-2" v-if="answer.is_correct"
                >la-check-square</v-icon
              >
              <span>
                {{ answer.text }}
              </span>
            </v-btn>
          </td>
          <td>
            {{ item.created_at | persianDate | persianDigit }}
          </td>

          <td>
            <span v-if="item.send_at">
              {{ item.send_at | persianDate | persianDigit }}
            </span>
            <span v-else>
              -
            </span>
          </td>
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
        text: 'لیست سوال ها',
        icon: 'la-question'
      },
      headers: [
        { text: 'عنوان', align: 'right', value: 'title', width: '20%' },
        { text: 'متن سوال', align: 'right', value: 'question', width: '20%' },
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
      ],
      filters: [],
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
    }
  }
}
</script>
