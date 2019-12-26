import { IQuiz } from '~/models/quiz'
import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { BaseService } from './helper/BaseService'
export default class QuizService extends BaseService<IQuiz> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'admin/quiz')
  }
  send_test(id: number, chat_id: string) {
    return this.$axios.$post(`${this.path}/${id}/send_test`, { chat_id })
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    quiz: QuizService
  }
}
