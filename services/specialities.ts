import { ISpeciality } from '@/models/speciality'
import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { BaseService } from './helper/BaseService'
export default class SpecialityService extends BaseService<ISpeciality> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'admin/specialities')
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    specialities: SpecialityService
  }
}
