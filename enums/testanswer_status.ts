type testAnswerStatus = 'request' | 'sendToDoctor' | 'answered' | 'sendToClient'
export interface ITestAnswerStatus {
  request: string
  sendToDoctor: string
  answered: string
  sendToClient: string
  toSelect: { text: string; value: string }[]
}
const testAnswerStatus = {
  request: 'درخواست',
  sendToDoctor: 'ارسال به پزشک',
  answered: 'پاسخ پزشک',
  sendToClient: 'ارسال به کاربر'
}
export default testAnswerStatus

declare module 'vue/types/vue' {
  interface NuxtEnumInstance {
    testanswer_status: ITestAnswerStatus
  }
}
