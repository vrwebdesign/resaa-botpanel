import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { BaseService } from './helper/BaseService'
import { IReservation } from '~/models/reservation'
export default class ReservationService extends BaseService<IReservation> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'admin/reservations')
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    reservations: ReservationService
  }
}
