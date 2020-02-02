import { IQuiz } from '~/models/quiz'
import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { BaseService } from './helper/BaseService'
export default class TestAnswerService extends BaseService<IQuiz> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'admin/test_answer')
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    test_answer: TestAnswerService
  }
}
