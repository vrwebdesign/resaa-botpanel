import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { ICoronaTest } from '~/models/corona_test'
import { BaseService } from './helper/BaseService'
export default class CoronaTestService extends BaseService<ICoronaTest> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'admin/corona-old-orders')
  }
  exportExcel() {
    return this.$axios.$get(`${this.path}/exportExcel`)
  }
  flow(params) {
    return this.$axios.$get(`${this.path}/flow`, { params })
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    corona_old_orders: CoronaTestService
  }
}
