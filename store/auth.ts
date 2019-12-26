import jwtDecode from 'jwt-decode'
export const state = () => ({
  token: null,
  refreshToken: null
})
export const mutations = {
  set_token(state, params) {
    state.token = params.token
    state.refreshToken = params.refreshToken
    localStorage.setItem('auth', JSON.stringify(params))
    return (<any>this).$axios.setToken(state.token, 'Bearer')
  },
  logout() {
    localStorage.removeItem('auth')
    return (<any>this).$axios.setToken(false)
  },
  init(state, $axios) {
    let auth = localStorage.getItem('auth')
    if (!auth) {
      return
    }
    let parsed_auth = JSON.parse(auth)
    state.token = parsed_auth.token
    state.refreshToken = parsed_auth.refreshToken
    $axios.setToken(state.token, 'Bearer')
  }
}
export const actions = {}
export const getters = {
  token(state) {
    return state.token
  },
  role(state) {
    if (!state.token) {
      return
    }
    let { data } = jwtDecode(state.token)
    return data.roles
    // let has_role = data.roles.some(item => item == role)
    // if (!has_role) {
    //   return error({ statusCode: 403 })
    // }
  }
}
