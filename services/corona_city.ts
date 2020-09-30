import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { BaseService } from './helper/BaseService'
import { ICoronaCity } from '~/models/corona_city'
export default class CoronaCityService extends BaseService<ICoronaCity> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'admin/corona_cities')
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    corona_city: CoronaCityService
  }
}
