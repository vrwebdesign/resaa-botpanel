export interface CoronaTestStatus {
  pending: string
  in_process: string
  cordinated: string
  referred: string
  test_result_posted: string
  canceled: string
  toSelect: { text: string; value: string }[]
}

const coronaTestStatus = {
  pending: 'بررسی نشده',
  in_process: 'در حال رسیدگی',
  cordinated: 'هماهنگ شده',
  referred: 'مراجعه شده',
  test_result_posted: 'ارسال نتیجه',
  canceled: 'لغو شده'
}
export default coronaTestStatus

declare module 'vue/types/vue' {
  interface NuxtEnumInstance {
    corona_test_payment_status: CoronaTestStatus
  }
}
