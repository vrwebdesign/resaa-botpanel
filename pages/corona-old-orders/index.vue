<style lang="scss"></style>

<template>
  <section ref="wrapper">
    <v-card>
      <vr-data-grid
        :headers="headers"
        :title="title"
        :service="$service.corona_old_orders"
        :filters="filters"
        :withRecycle="true"
        :syncUrl="true"
      >
        <template #toollbar_left>
          <v-btn color="pink" round outline to="/corona-old-orders-flow">
            <v-icon class="ml-2">la-history</v-icon>
            <span>پیگیری</span>
          </v-btn>
          <v-btn color="green" :href="ExportExcel" download round outline>
            <v-icon class="ml-2">import_export</v-icon>
            <span>خروجی اکسل</span>
          </v-btn>
        </template>
        <template #items="{item}">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.mobile }}</td>
          <td>
            <span v-if="item.city">
              {{ item.city.name }}
            </span>
            <span v-else>-</span>
          </td>
          <td>{{ item.nationalCode }}</td>
          <td>
            <vr-badge
              :color="
                colors.corona_test[item.doctor_id || item.selected_test.id]
              "
            >
              <span>
                {{item.doctor_id || item.selected_test.id | enum('corona_test')}}
              </span>
            </vr-badge>
          </td>
          <td>{{ item.amount | currency | persianDigit }} تومان</td>
          <td>
            <vr-badge
              :color="colors.corona_test_payment_status[item.payment_status]"
              type="dot"
              >{{ item.payment_status | enum('corona_transaction_status') }}</vr-badge
            >
          </td>
          <td>
            <vr-badge
              :color="colors.corona_transaction_status[item.status]"
              >{{ item.status | enum('corona_test_status') }}</vr-badge
            >
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
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'
import colors from '@/colors'
Component.registerHooks(['meta'])
@Component({
  middleware: 'authorization'
})
export default class CoronaTestPage extends Vue {
  title = {
    text: 'درخواست های تست کرونا',
    icon: 'la-vial'
  }
  headers = [
    { text: 'آیدی', align: 'right', value: 'id', width: '5%' },
    { text: 'نام کاربر', align: 'right', value: 'name', width: '10%' },
    { text: 'شماره کاربر', align: 'right', value: 'mobile', width: '10%' },
    {
      text: 'شهر',
      align: 'right',
      sortable: false,
      width: '10%'
    },
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
    },
    {
      label: 'وضعیت',
      model: 'status:=',
      type: 'select',
      items: [
        {
          text: 'همه',
          value: null
        },
        ...this.$enum.corona_test_status.toSelect
      ]
    },
    {
      label: 'وضعیت پرداخت',
      model: 'payment_status:=',
      type: 'select',
      items: [
        {
          text: 'همه',
          value: null
        },
        ...this.$enum.corona_transaction_status.toSelect
      ]
    },
    {
      label: 'شهر',
      model: 'city.name'
    },
  ]
  colors = colors
  get ExportExcel() {
    let token = this.$store.getters['auth/token']
    let url = `${window.location.origin}/api/admin/corona-old-orders/exportExcel?token=${token}`
    return url
  }
  get meta() {
    return { roles: ['administrator', 'corona_admin'] }
  }
  exportExcel() {
    this.$service.corona_old_orders.exportExcel()
  }
}
</script>

