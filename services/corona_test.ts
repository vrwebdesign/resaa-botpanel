import { ICoronaTest } from './../models/corona_test'
import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { BaseService } from './helper/BaseService'
export default class CoronaTestService extends BaseService<ICoronaTest> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'admin/corona_test')
  }
  exportExcel() {
    this.$axios.$get(`${this.path}/exportExcel`)
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    corona_test: CoronaTestService
  }
}
