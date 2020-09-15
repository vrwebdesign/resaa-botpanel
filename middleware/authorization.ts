import jwtDecode from 'jwt-decode'

export default function(ctx) {
  try {
    let roles = ctx.route.meta.find((meta: any) => {
      if (meta.roles && typeof meta.roles !== 'undefined') {
        return true
      }
    }).roles
    let token = ctx.store.getters['auth/token']
    if (!token) {
      return
    }
    let { data } = jwtDecode(token)
    let has_role = data.roles.some(item => roles.includes(item))
    if (!has_role) {
      return ctx.error({ statusCode: 403 })
    }
  } catch (error) {}
}
