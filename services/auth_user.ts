import { IAuthUser } from '~/models/authUser'
import { NuxtAxiosInstance } from 'vrwebdesign-nuxt/modules/nuxt-axios/types'
import { BaseService } from './helper/BaseService'
export default class AuthService extends BaseService<IAuthUser> {
  constructor(public $axios: NuxtAxiosInstance) {
    super($axios, 'auth')
  }
  login(params) {
    return this.$axios.$post(`${this.path}/login`, params)
  }
  register(params) {
    return this.$axios.$post(`${this.path}/register`, params)
  }
  mobile_check(params) {
    return this.$axios.$post(`${this.path}/forget_password`, params)
  }
  reset_password(params) {
    return this.$axios.$post(`${this.path}/reset_password`, params)
  }
  check_duplicate_user(params) {
    return this.$axios.$post(`${this.path}/check_duplicate_user`, params)
  }
}

declare module 'vue/types/vue' {
  interface NuxtServiceInstance {
    auth_user: AuthService
  }
}
