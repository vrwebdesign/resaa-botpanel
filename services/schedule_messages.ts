import { IScheduleMessage } from '~/models/schedule_message'
import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { BaseService } from './helper/BaseService'
export default class ScheduleMessageService extends BaseService<
  IScheduleMessage
> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'admin/schedule_messages')
  }
  send_test(id: number, chat_id: string) {
    return this.$axios.$post(`${this.path}/${id}/send_test`, { chat_id })
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    schedule_messages: ScheduleMessageService
  }
}
