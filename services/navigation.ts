import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { INav } from '~/models/Navigation'
export default class NavigationService {
  constructor(public $axios: NuxtAxiosInstance) {}
  get(roles: string[]): INav[] {
    if (roles.includes('administrator')) {
      return [
        {
          icon: 'apps',
          title: 'دشبورد',
          to: '/'
        },
        {
          icon: 'la-question-circle',
          title: 'سوالات',
          to: '/questions'
        },
        {
          icon: 'la-tag',
          title: 'تخصص ها',
          to: '/specialities'
        },
        {
          icon: 'la-stethoscope',
          title: 'پزشکان',
          to: '/doctors'
        },
        {
          icon: 'la-paper-plane',
          title: 'ارسال پیام',
          to: '/send-message'
        },
        {
          icon: 'la-question-circle',
          title: 'کوییز',
          to: '/quiz'
        },
        {
          icon: 'la-image',
          title: 'جواب آزمایش',
          to: '/test-answer'
        },
        {
          icon: 'la-mobile',
          title: 'اپلیکیشن رسا',
          to: '/application'
        },
        {
          icon: 'la-vial',
          title: 'تست کرونا',
          to: '/corona-test'
        }
      ]
    } else if (roles.includes('bot_admin')) {
      return [
        {
          icon: 'la-question-circle',
          title: 'سوالات',
          to: '/questions'
        },
        {
          icon: 'la-tag',
          title: 'تخصص ها',
          to: '/specialities'
        },
        {
          icon: 'la-stethoscope',
          title: 'پزشکان',
          to: '/doctors'
        },
        {
          icon: 'la-paper-plane',
          title: 'ارسال پیام',
          to: '/send-message'
        },
        {
          icon: 'la-question-circle',
          title: 'کوییز',
          to: '/quiz'
        }
      ]
    } else if (roles.includes('application_admin')) {
      return [
        {
          icon: 'la-mobile',
          title: 'اپلیکیشن رسا',
          to: '/application'
        }
      ]
    } else if (roles.includes('corona_admin')) {
      return [
        {
          icon: 'la-vial',
          title: 'تست کرونا',
          to: '/corona-test'
        },
        {
          icon: 'la-image',
          title: 'جواب آزمایش',
          to: '/test-answer'
        }
      ]
    }
    return []
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    navigation: NavigationService
  }
}
