import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { BaseService } from './helper/BaseService'
import { IPatient } from '~/models/patient'
export default class PatientService extends BaseService<IPatient> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'admin/patients')
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    patients: PatientService
  }
}
