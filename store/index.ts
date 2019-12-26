export const actions = {
  async nuxtClientInit({ state, commit, dispatch }, { req, $axios }) {
    return new Promise((resolve, reject) => {
      commit('auth/init', $axios)
      resolve(true)
    })
  }
}
