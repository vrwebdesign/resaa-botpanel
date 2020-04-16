import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { BaseService } from './helper/BaseService'
export default class DoctorCommentService extends BaseService<any> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'admin/doctor-reviews')
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    doctor_reviews: DoctorCommentService
  }
}
