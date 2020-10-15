import { ICoronaTest } from '../models/corona_test'
import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { BaseService } from './helper/BaseService'
export default class CoronaTransactionService extends BaseService<ICoronaTest> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'admin/corona-transactions')
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    corona_transactions: CoronaTransactionService
  }
}
