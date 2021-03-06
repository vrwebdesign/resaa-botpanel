import { rejects } from 'assert'

export default function(ctx) {
  ctx.$axios.onError(async error => {
    debugger
    const status = parseInt(error.response && error.response.status)
    if (status === 401) {
      return ctx.redirect('/auth')
    }
    if (status == 403) {
      return ctx.error({ statusCode: 403 })
    }
    return Promise.reject(error)
  })
}
