import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { BaseService } from './helper/BaseService'
export default class CoronaTestService extends BaseService<any> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'admin/corona_test')
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    corona_test: CoronaTestService
  }
}
