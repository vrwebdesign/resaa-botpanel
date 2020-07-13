export interface CoronaTestStatus {
  pending: string
  cordinated: string
  referred: string
  test_result_posted: string
  canceled: string
  toSelect: { text: string; value: string }[]
}

const coronaTestStatus = {
  pending: 'بررسی نشده',
  cordinated: 'هماهنگ شده',
  referred: 'مراجعه شده',
  test_result_posted: 'نتیجه تست ارسال شده',
  canceled: 'لغو شده'
}
export default coronaTestStatus

declare module 'vue/types/vue' {
  interface NuxtEnumInstance {
    corona_test_payment_status: CoronaTestStatus
  }
}
