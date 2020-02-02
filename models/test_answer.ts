import ITestAnswerStatus from '~/enums/testanswer_status'
export interface ITestAnswer {
  user_id?: string
  answer_type: 'text' | 'vioce'
  status: ITestAnswerStatus
  doctor_answer: string
  doctor_chat_id?: string
  user_satisfaction?: number
  files: Array<string>
  is_confirm?: number | boolean
}
