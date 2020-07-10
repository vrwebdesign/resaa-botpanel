export interface ITestAnswerStatus {
  pending: string
  paid: string
  canceled: string
  toSelect: { text: string; value: string }[]
}
const testAnswerStatus = {
  pending: 'پرداخت نشده',
  paid: 'پرداخت شده',
  canceled: 'لغو شده'
}
export default testAnswerStatus

declare module 'vue/types/vue' {
  interface NuxtEnumInstance {
    corona_test_status: ITestAnswerStatus
  }
}
