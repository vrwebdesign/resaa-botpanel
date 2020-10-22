import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { ICoronaTest } from '~/models/corona_test'
import { BaseService } from './helper/BaseService'
export default class CoronaTestService extends BaseService<ICoronaTest> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'admin/corona-orders')
  }
  exportExcel() {
    return this.$axios.$get(`${this.path}/exportExcel`)
  }
  flow(params) {
    return this.$axios.$get(`${this.path}/flow`, { params })
  }
  changeIsChecked(item) {
    return this.$axios.$patch(`${this.path}/${item.id}/change-is-checked`, {
      is_checked: item.is_checked
    })
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    corona_orders: CoronaTestService
  }
}
