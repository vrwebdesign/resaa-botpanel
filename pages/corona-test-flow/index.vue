<style lang="scss"></style>

<template>
  <section ref="wrapper">
    <v-card>
      <vr-data-grid
        :headers="headers"
        :title="title"
        :editUrl="'/corona-test/:id'"
        :filters="filters"
        :withAdd="false"
        :queryService="queryService"
        :withRecycle="true"
        :syncUrl="true"
      >
        <template #items="{item}">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.mobile }}</td>
          <td>{{ item.nationalCode }}</td>
          <td>
            <vr-badge
              :color="colors.corona_test[item.doctor_id]"
            >{{item.doctor_id | enum('corona_test')}}</vr-badge>
          </td>
          <td>{{item.amount | currency | persianDigit}} تومان</td>
          <td>
            <vr-badge
              :color="colors.corona_test_payment_status[item.payment_status]"
              type="dot"
            >{{ item.payment_status | enum('corona_test_payment_status') }}</vr-badge>
          </td>
          <td>
            <vr-badge
              :color="colors.corona_test_status[item.status]"
            >{{ item.status | enum('corona_test_status') }}</vr-badge>
          </td>
          <td class="text-xs-center" dir="ltr">
            <vr-badge :color="calc_color(item)">{{ calc_hour(item) }}</vr-badge>
          </td>
        </template>
        <template #actions_right="{item}">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">{{item.description?"la-exclamation":"a"}}</v-icon>
            </template>
            <span>{{item.description}}</span>
          </v-tooltip>
        </template>
      </vr-data-grid>
    </v-card>
  </section>
</template>
<script>
import colors from '@/colors'
import moment from 'moment-jalaali'
export default {
  data() {
    return {
      title: {
        text: 'پیگیری های تست کرونا',
        icon: 'la-vial'
      },
      headers: [
        { text: 'آیدی', align: 'right', value: 'id', width: '5%' },
        { text: 'نام کاربر', align: 'right', value: 'name', width: '10%' },
        { text: 'شماره کاربر', align: 'right', value: 'mobile', width: '10%' },
        {
          text: 'کد ملی',
          align: 'right',
          value: 'phoneNumber',
          width: '10%'
        },
        { text: 'نوع تست', align: 'right', value: 'doctor_id', width: '10%' },
        { text: 'قیمت', align: 'right', value: 'amount', width: '10%' },
        {
          text: 'وضعیت پرداخت',
          align: 'right',
          value: 'payment_status',
          width: '10%'
        },
        { text: 'وضعیت', align: 'right', value: 'status', width: '10%' },
        {
          text: 'زمان',
          align: 'right',
          value: 'created_at',
          width: '10%'
        }
      ],
      filters: [
        {
          label: 'آیدی',
          model: 'id:='
        },
        {
          label: 'نام کاربر',
          model: 'name'
        },
        {
          label: 'شماره همراه کاربر',
          model: 'mobile'
        },
        {
          label: 'شماره همراه کاربر رسا ',
          model: 'phoneNumber'
        },
        {
          label: 'کد پیگیری درگاه ',
          model: 'trackingNumber'
        },
        {
          label: 'کد ملی ',
          model: 'nationalCode'
        }
      ],
      colors
    }
  },
  mounted() {},
  computed: {
    ExportExcel() {
      let token = this.$store.getters['auth/token']
      let url = `${window.location.origin}/api/admin/corona_test/exportExcel?token=${token}`
      return url
    }
  },
  methods: {
    queryService() {
      return this.$service.corona_test.flow()
    },
    calc_color(item) {
      let hour = this.calc_difs(item)
      if (hour > 92) {
        return 'red darken-3'
      }
      if (hour > 72) {
        return 'pink'
      }
      return 'green'
    },
    calc_hour(item) {
      let hour = this.calc_difs(item)
      return hour
    },
    calc_difs(item) {
      let now = moment()
      let start = moment(item.created_at)
      let remain = moment.duration(now.diff(start)).as('hours')
      return Math.ceil(remain)
    }
  }
}
</script>
