export interface CoronaTestStatus {
  pending: string
  paid: string
  canceled: string
  toSelect: { text: string; value: string }[]
}
const coronaTestStatus = {
  pending: 'پرداخت نشده',
  paid: 'پرداخت شده',
  canceled: 'لغو شده'
}
export default coronaTestStatus

declare module 'vue/types/vue' {
  interface NuxtEnumInstance {
    corona_test_status: CoronaTestStatus
  }
}
