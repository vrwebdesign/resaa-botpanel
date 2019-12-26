import { IQuestion } from '~/models/question'
import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { BaseService } from './helper/BaseService'
export default class QuestionService extends BaseService<IQuestion> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'admin/questions')
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    questions: QuestionService
  }
}
