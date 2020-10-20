import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { BaseService } from './helper/BaseService'
export default class CoronaRetargetService extends BaseService<any> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'admin/corona-retarget')
  }
  getSetting() {
    return this.$axios.$get(`${this.path}/getSetting`)
  }
  changeSetting(data) {
    return this.$axios.$put(`${this.path}/changeSetting`, data)
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    corona_retarget: CoronaRetargetService
  }
}
