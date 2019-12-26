import jwtDecode from 'jwt-decode'

export default function({ store, redirect, error, role }) {
  let token = store.getters['auth/token']
  if (!token) {
    return
  }
  let { data } = jwtDecode(token)
  let has_role = data.roles.some(item => item == role)
  if (!has_role) {
    return error({ statusCode: 403 })
  }
}
