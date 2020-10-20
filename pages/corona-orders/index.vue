<style lang="scss"></style>

<template>
  <section ref="wrapper">
    <v-card>
      <vr-data-grid
        :headers="headers"
        :title="title"
        :service="$service.corona_orders"
        :filters="filters"
        :withRecycle="true"
        :syncUrl="true"
      >
        <template #toollbar_left>
          <v-btn color="pink" round outline to="/corona-orders-flow">
            <v-icon class="ml-2">la-history</v-icon>
            <span>پیگیری</span>
          </v-btn>
          <v-btn color="green" :href="ExportExcel" download round outline>
            <v-icon class="ml-2">import_export</v-icon>
            <span>خروجی اکسل</span>
          </v-btn>
        </template>
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
          <td>{{ item.count | persianDigit }}</td>
          <td>{{ item.prepay_amount | currency | persianDigit }} تومان</td>
          <td>{{ item.payable_amount | currency | persianDigit }} تومان</td>
          <td>
            <span v-if="item.role_discount_amount">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <span v-on="on"
                    >{{
                      item.role_discount_amount | currency | persianDigit
                    }}
                    تومان</span
                  >
                </template>
                <span>تخفیف روی تعداد</span>
              </v-tooltip>
            </span>
            <span v-if="item.discount">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <span v-on="on"
                    >{{
                      item.discount.amount | currency | persianDigit
                    }}
                    تومان</span
                  >
                </template>
                <span>کد تخفیف {{ item.discount.code }}</span>
              </v-tooltip>
            </span>
            <span v-if="!item.role_discount_amount && !item.discount">-</span>
          </td>
          <td>
            <span v-if="item.transaction">
              <vr-badge
                :color="
                  colors.corona_transaction_status[item.transaction.status]
                "
                type="dot"
                >{{ item.transaction.status | enum('corona_transaction_status') }}</vr-badge
              >
            </span>
            <span v-else>-</span>
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
    { text: 'نام کاربر', align: 'right', value: 'user_fullname', width: '10%' },
    { text: 'شماره کاربر', align: 'right', value: 'user_mobile', width: '10%' },
    {
      text: 'شهر',
      align: 'right',
      sortable: false,
      width: '10%'
    },
    {
      text: 'کد ملی',
      align: 'right',
      value: 'user_nationalcode',
      width: '10%'
    },
    { text: 'نوع تست', align: 'right', sortable: false, width: '10%' },
    {
      text: 'تعداد',
      align: 'right',
      value: 'count',
      width: '10%'
    },
    {
      text: 'پیش پرداخت',
      align: 'right',
      value: 'prepay_amount',
      width: '10%'
    },
    {
      text: 'باقیمانده',
      align: 'right',
      value: 'payable_amount',
      width: '10%'
    },
    { text: 'تخفیف', align: 'right', sortable: false, width: '10%' },
    {
      text: 'وضعیت پرداخت',
      align: 'right',
      sortable: false,
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
      model: 'transaction.status:=',
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
    }
  ]
  colors = colors
  get ExportExcel() {
    let filters = this.$route.query.filters
    let token = this.$store.getters['auth/token']
    let url = `${window.location.origin}/api/admin/corona-orders/exportExcel?token=${token}`
    if(filters){
      url += `&filters=${filters}`
    }
    return url
  }
  get meta() {
    return { roles: ['administrator', 'corona_admin'] }
  }
  exportExcel() {
    this.$service.corona_orders.exportExcel()
  }
}
</script>
