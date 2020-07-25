export interface coronaTestPaymentStatus {
  unpaid: string
  paid: string
  toSelect: { text: string; value: string }[]
}
const coronaTestPaymentStatus = {
  unpaid: 'پرداخت نشده',
  paid: 'پرداخت شده',
  returned: 'بازگشت داده شده'
}
export default coronaTestPaymentStatus

declare module 'vue/types/vue' {
  interface NuxtEnumInstance {
    corona_test_status: coronaTestPaymentStatus
  }
}
