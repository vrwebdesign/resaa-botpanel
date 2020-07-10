export interface ITestAnswerStatus {
  request: string
  sendToDoctor: string
  answered: string
  sendToClient: string
  toSelect: { text: string; value: string }[]
}
const testAnswerStatus = {
  6843: 'تست PCR',
  6844: 'تست AntyBody',
  6845: 'PCR & AntyBody'
}
export default testAnswerStatus

declare module 'vue/types/vue' {
  interface NuxtEnumInstance {
    testanswer_status: ITestAnswerStatus
  }
}
