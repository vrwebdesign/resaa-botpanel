<style lang="scss"></style>

<template>
  <section ref="wrapper">
    <v-card>
      <vr-data-grid
        :headers="headers"
        :title="title"
        :service="$service.corona_test"
        :filters="filters"
        :withRecycle="true"
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
              :color="colors.corona_test_status[item.status]"
              type="dot"
            >{{ item.status | enum('corona_test_status') }}</vr-badge>
          </td>
          <td
            class="text-xs-center"
            dir="ltr"
          >{{ item.created_at | persianDate('jYYYY-jMM-jDD HH:mm') | persianDigit }}</td>
        </template>
      </vr-data-grid>
    </v-card>
  </section>
</template>
<script>
import colors from '@/colors'
export default {
  data() {
    return {
      title: {
        text: 'درخواست های تست کرونا',
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
        { text: 'وضعیت', align: 'right', value: 'status', width: '10%' },
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
      service: this.$service.corona_test,
      colors
    }
  },
  mounted() {}
}
</script>
