import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { INav } from '~/models/Navigation'
export default class NavigationService {
  constructor(public $axios: NuxtAxiosInstance) {}
  get(roles: string[]): INav[] {
    return [
      {
        icon: 'apps',
        title: 'دشبورد',
        to: '/'
      },
      {
        icon: 'la-question',
        title: 'سوالات',
        to: '/questions'
      },
      {
        icon: 'la-user-md',
        title: 'پزشکان',
        to: '/doctors'
      },
      {
        icon: 'la-send',
        title: 'ارسال پیام',
        to: '/send-message'
      },
      {
        icon: 'la-question',
        title: 'کوییز',
        to: '/quiz'
      },
      {
        icon: 'la-image',
        title: 'جواب آزمایش',
        to: '/test-answer'
      }
    ]
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    navigation: NavigationService
  }
}
