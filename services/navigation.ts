import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { INav } from '~/models/Navigation'
export default class NavigationService {
  constructor(public $axios: NuxtAxiosInstance) {}
  get(roles: string[]): INav[] {
    let corona_navs = [
      {
        icon: 'la-city',
        title: 'شهرها',
        to: '/corona-cities'
      },
      {
        icon: 'la-sync',
        title: 'ریتارگتینگ',
        to: '/corona-retarget'
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
      }
    ]
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
          icon: 'la-image',
          title: 'جواب آزمایش',
          to: '/test-answer'
        },
        {
          icon: 'la-vial',
          title: 'کرونا',
          child: corona_navs
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
<<<<<<< HEAD
=======
          icon: 'la-city',
          title: 'شهرها',
          to: '/corona-cities'
        },
        {
          icon: 'la-vial',
          title: 'تست کرونا',
          to: '/corona-test'
        },
        {
>>>>>>> master
          icon: 'la-image',
          title: 'جواب آزمایش',
          to: '/test-answer'
        },
        ...corona_navs
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
