<style lang="scss"></style>

<template>
  <section ref="wrapper">
    <v-card>
      <vr-data-grid
        :headers="headers"
        :title="title"
        :service="$service.test_answer"
        :filters="filters"
        :withRecycle="true"
        :withAdd="false"
      >
        <template #items="{item}">
          <td>{{ item.id | persianDigit }}</td>
          <td>
            <span v-if="item.user">{{ item.user.phone }}</span>
            <span v-else></span>
          </td>
          <td>
            <span v-if="item.doctor">
              <a
                target="_blank"
                :href="
                  `https://resaa.net/doctors/${item.doctor.subscriberNumber}`
                "
                >{{ item.doctor.firstName }} {{ item.doctor.lastName }}</a
              >
            </span>
            <span v-else>-</span>
          </td>
          <td>{{ item.price | currency | persianDigit }} تومان</td>

          <td>
            <vr-badge
              :color="colors.testanswer_status[item.status]"
              >{{ item.status | enum('testanswer_status') }}</vr-badge
            >
          </td>
          <td class="text-xs-center">
            <span v-if="item.user_satisfaction">
              <vr-badge :color="item.user_satisfaction == 1 ? 'red' : 'cyan'">{{
                item.user_satisfaction == 1 ? 'ناراضی' : 'راضی'
              }}</vr-badge>
              <!-- <v-icon
                size="16"
                color="yellow darken-1"
                v-for="rate in item.user_satisfaction"
                :key="rate"
              >la-star</v-icon>-->
            </span>
            <span v-else>-</span>
          </td>
          <td>
            <vr-badge type="dot" :color="item.is_confirm ? 'green' : 'red'">{{
              item.is_confirm ? 'تایید شده' : 'تایید نشده'
            }}</vr-badge>
          </td>
          <td class="text-xs-center" dir="ltr">
            <span v-if="item.answer_at">{{
              item.answer_at | persianDate('jYYYY-jMM-jDD HH:mm') | persianDigit
            }}</span>
            <span v-else>-</span>
          </td>
          <td class="text-xs-center">
            <vr-badge
              v-if="item.answer_type"
              :color="item.answer_type == 'text' ? 'cyan' : 'pink'"
              >{{ item.answer_type }}</vr-badge
            >
            <span v-else>-</span>
          </td>
          <td class="text-xs-center" dir="ltr">
            {{
              item.created_at
                | persianDate('jYYYY-jMM-jDD HH:mm')
                | persianDigit
            }}
          </td>
        </template>
        <template #actions_right="{item}">
          <v-tooltip top v-if="item.description">
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">{{
                item.description ? 'la-exclamation' : 'a'
              }}</v-icon>
            </template>
            <span>{{ item.description }}</span>
          </v-tooltip>
        </template>
      </vr-data-grid>
    </v-card>
  </section>
</template>
<script lang="ts">
import colors from '@/colors'
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'

@Component
export default class TestAnswerPage extends Vue {
  title = {
    text: 'لیست آزمایش ها',
    icon: 'la-image'
  }
  headers = [
    { text: 'آیدی', align: 'right', value: 'id', width: '5%' },
    { text: 'کاربر', align: 'right', sortable: false, width: '10%' },
    { text: 'پزشک', align: 'right', sortable: false, width: '10%' },
    { text: 'قیمت', align: 'right', value: 'price', width: '10%' },
    { text: 'وضعیت', align: 'right', value: 'status', width: '10%' },
    {
      text: 'رضایت کاربر',
      align: 'center',
      value: 'user_satisfaction',
      width: '10%'
    },
    {
      text: 'تایید مالی',
      align: 'right',
      value: 'is_confirm',
      width: '10%'
    },
    {
      text: 'تاریخ پاسخ ',
      align: 'right',
      value: 'answer_at',
      width: '5%'
    },
    {
      text: 'نوع پاسخ',
      align: 'right',
      value: 'answer_type',
      width: '5%'
    },
    {
      text: 'تاریخ ایجاد',
      align: 'right',
      value: 'created_at',
      width: '10%'
    }
  ]
  filters = [
    {
      label: 'آیدی',
      model: 'id:='
    },
    {
      label: 'شماره همراه کاربر',
      model: 'user.phone'
    },
    {
      label: 'نام، نام خانودگی یا کد پزشک',
      model: 'doctor'
    }
  ]

  colors = colors
}
</script>
