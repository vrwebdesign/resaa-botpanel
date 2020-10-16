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
          icon: 'la-city',
          title: 'شهرهای کرونا',
          to: '/corona-cities'
        },
        {
          icon: 'la-tag',
          title: 'کوپن های کرونا',
          to: '/corona-discounts'
        },
        {
          icon: 'la-vial',
          title: 'تست های کرونا',
          to: '/corona-tests'
        },
        {
          icon: 'la-money-bill',
          title: 'تراکنش های کرونا',
          to: '/corona-transactions'
        },
        {
          icon: 'la-shopping-basket',
          title: 'سفارش های تست کرونا',
          to: '/corona-orders'
        },
        {
          icon: 'la-shopping-basket',
          title: 'سفارش های قدیمی',
          to: '/corona-old-orders'
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
          icon: 'la-city',
          title: 'شهرها',
          to: '/corona-cities'
        },
        {
          icon: 'la-tag',
          title: 'کوپن ها',
          to: '/corona-discounts'
        },
        {
          icon: 'la-vial',
          title: 'تست های',
          to: '/corona-tests'
        },
        {
          icon: 'la-money-bill',
          title: 'تراکنش های',
          to: '/corona-transactions'
        },
        {
          icon: 'la-shopping-basket',
          title: 'سفارش های تست',
          to: '/corona-orders'
        },
        {
          icon: 'la-shopping-basket',
          title: 'سفارش های قدیمی',
          to: '/corona-old-orders'
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
