import { login, getInfo } from '@/api/user'
import { removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    // name: '',
    // avatar: '',
    // userInfo: {}
    user: null // 用户信息
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // },
  SET_USER: (state, user) => {
    state.user = user
  }
}

const actions = {
  // user login
  login({ commit }, user) {
    return new Promise((resolve, reject) => {
      login(user)
        .then((res) => {
          const { data: user } = res
          if (user) {
            commit('SET_USER', user)
            resolve()
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        if (typeof res === 'string') {
          res = JSON.parse(res)
          if (res.code === 401) {
            reject('token已过期')
          }
        } else {
          const { data: user } = res
          if (user) {
            commit('SET_USER', user)
            resolve(res)
          } else {
            reject('无法获取用户信息，请重新登陆')
          }
        }
      })
      // getInfo(state.token)
      //   .then((response) => {
      //     const { data } = response

      //     if (!data) {
      //       return reject('Verification failed, please Login again.')
      //     }

      //     const { name, avatar } = data

      //     commit('SET_NAME', name)
      //     commit('SET_AVATAR', avatar)
      //     resolve(data)
      //   })
      //   .catch((error) => {
      //     reject(error)
      //   })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
      // logout(state.token)
      //   .then(() => {
      //     removeToken() // must remove  token  first
      //     resetRouter()
      //     commit('RESET_STATE')
      //     resolve()
      //   })
      //   .catch((error) => {
      //     reject(error)
      //   })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

