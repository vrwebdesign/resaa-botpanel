import { ICoronaTest } from '../models/corona_test'
import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { BaseService } from './helper/BaseService'
export default class CoronaTestService extends BaseService<ICoronaTest> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'admin/corona-tests')
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    corona_tests: CoronaTestService
  }
}
