<style lang="scss"></style>

<template>
  <section ref="wrapper">
    <v-card>
      <vr-data-grid
        :headers="headers"
        :title="title"
        :editUrl="'/corona-orders/:id'"
        :filters="filters"
        :withAdd="false"
        :queryService="queryService"
        :withRecycle="true"
        :syncUrl="true"
      >
        <template #items="{item}">
          <td>{{ item.id | persianDigit }}</td>
          <td>{{ item.user_fullname }}</td>
          <td>{{ item.user_mobile | persianDigit }}</td>
          <td>
            <span v-if="item.city">
              {{ item.city.name }}
            </span>
            <span v-else>-</span>
          </td>
          <td>{{ item.user_nationalcode | persianDigit }}</td>
          <td>
            <vr-badge :color="item.test.color">
              <span>
                {{ item.test.name }}
              </span>
            </vr-badge>
          </td>
          <td>{{ item.prepay_amount | currency | persianDigit }} تومان</td>
          <td>
            <vr-badge
              :color="colors.corona_transaction_status[item.transaction.status]"
              type="dot"
              >{{ item.transaction.status | enum('corona_transaction_status') }}</vr-badge
            >
          </td>
          <td>
            <vr-badge
              :color="colors.corona_transaction_status[item.status]"
              >{{ item.status | enum('corona_test_status') }}</vr-badge
            >
          </td>
          <td class="text-xs-center" dir="ltr">
            <vr-badge :color="calc_color(item)">{{ calc_hour(item) }}</vr-badge>
          </td>
        </template>
        <template #actions_right="{item}">
          <v-tooltip top>
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
import moment from 'moment-jalaali'
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'

Component.registerHooks(['meta'])
@Component({
  middleware: 'authorization'
})
export default class CoronaFlowPage extends Vue {
  title = {
    text: 'پیگیری های سفارش کرونا',
    icon: 'la-shopping-basket'
  }
  headers = [
    { text: 'آیدی', align: 'right', value: 'id', width: '5%' },
    { text: 'نام کاربر', align: 'right', value: 'user_fullname', width: '10%' },
    {
      text: 'شماره کاربر',
      align: 'right',
      value: 'userr_mobile',
      width: '10%'
    },
    {
      text: 'شهر',
      align: 'right',
      sortable: false,
      width: '10%'
    },
    {
      text: 'کد ملی',
      align: 'right',
      value: 'user_nationacode',
      width: '10%'
    },
    { text: 'نوع تست', align: 'right', sortable: false, width: '10%' },
    { text: 'قیمت', align: 'right', value: 'prepay_amount', width: '10%' },
    {
      text: 'وضعیت پرداخت',
      align: 'right',
      sortable: false,
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
  ]
  filters = [
    {
      label: 'آیدی',
      model: 'id:='
    },
    {
      label: 'نام کاربر',
      model: 'user_fullname'
    },
    {
      label: 'شماره همراه کاربر',
      model: 'user_mobile'
    },
    {
      label: 'کد پیگیری درگاه ',
      model: 'transaction.tracking_code'
    },
    {
      label: 'کد ملی ',
      model: 'user_nationalcode'
    }
  ]
  colors = colors
  get meta() {
    return { roles: ['administrator', 'corona_admin'] }
  }
  queryService(params) {
    return this.$service.corona_orders.flow(params)
  }
  calc_color(item) {
    let hour = this.calc_difs(item)
    if (hour > 92) {
      return 'red darken-3'
    }
    if (hour > 72) {
      return 'pink'
    }
    return 'green'
  }
  calc_hour(item) {
    let hour = this.calc_difs(item)
    return hour
  }
  calc_difs(item) {
    let now = moment()
    let start = moment(item.created_at)
    let remain = moment.duration(now.diff(start)).as('hours')
    return Math.ceil(remain)
  }
}
</script>

