<style lang="scss"></style>

<template>
  <section ref="wrapper">
    <v-card>
      <vr-data-grid
        editUrl="/students/:id/info"
        :headers="headers"
        :title="title"
        :queryService="getService"
        :filters="filters"
        :withoutAction="true"
        :withAdd="false"
      >
        <template #items="{item}">
          <td>{{ item.text }}</td>
          <td>
            <span v-if="item.doctor_asigned[0]"
              >{{ item.doctor_asigned[0].first_name }}
              {{ item.doctor_asigned[0].last_name }}
            </span>
            <span v-else>-</span>
          </td>
          <td>
            <span v-if="item.answer[0]">{{ item.answer[0].answer }}</span>
            <span v-else>-</span>
          </td>
          <td>
            {{
              item.created_at
                | persianDate('jYYYY/jMM/jDD HH:mm:ss')
                | persianDigit
            }}
          </td>
          <td>
            <span v-if="item.answer[0]">{{
              item.answer[0].created_at
                | persianDate('jYYYY/jMM/jDD HH:mm:ss')
                | persianDigit
            }}</span>
            <span v-else>-</span>
          </td>
          <td>
            <span v-if="item.answer[0]">{{
              item.answer[0].updated_at
                | persianDate('jYYYY/jMM/jDD HH:mm:ss')
                | persianDigit
            }}</span>
            <span v-else>-</span>
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
        { text: 'متن سوال', align: 'right', value: 'text', width: '20%' },
        {
          text: 'اساین به پزشک',
          align: 'right',
          sortable: false,
          width: '10%'
        },
        {
          text: 'پاسخ پزشک',
          align: 'right',
          sortable: false,
          width: '20%'
        },
        {
          text: 'تاریخ ایجاد',
          align: 'right',
          value: 'created_at',
          width: '10%'
        },
        {
          text: 'تاریخ ارسال برای پزشک',
          align: 'right',
          sortable: false,
          width: '10%'
        },
        {
          text: 'تاریخ پاسخ',
          align: 'right',
          sortable: false,
          width: '10%'
        }
      ],
      filters: [
        {
          icon: 'la-search',
          name: 'name',
          model: 'answer.doctor.first_name',
          label: 'نام پزشک'
        },
        {
          icon: 'la-search',
          name: 'family',
          model: 'answer.doctor.last_name',
          label: ' نام خانوادگی پرشک'
        },
        {
          icon: 'la-search',
          name: 'national_code',
          model: 'answer.doctor.subscriber_number',
          label: 'کد پزشک'
        }
      ],
      service: this.$service.students
    }
  },
  mounted() {},
  methods: {
    getService(params) {
      return this.$service.questions.$query(params)
    }
  }
}
</script>
