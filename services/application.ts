import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { BaseService } from './helper/BaseService'
import { IApplication } from '~/models/application'
export default class ApplicationService extends BaseService<IApplication> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'admin/applications')
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    application: ApplicationService
  }
}
