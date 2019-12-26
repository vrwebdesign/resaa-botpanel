import { IDoctor } from '~/models/doctor'
import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { BaseService } from './helper/BaseService'
export default class DoctorService extends BaseService<IDoctor> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'admin/doctors')
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    doctors: DoctorService
  }
}
