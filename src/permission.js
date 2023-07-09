import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (to.meta.auth) {
    const hasUserInfo = store.getters.user
    if (hasUserInfo && hasToken) {
      next()
      NProgress.done()
    } else if (hasToken) {
      // 尝试获取用户信息,验证token是否有效
      try {
        await store.dispatch('user/getInfo')
        next()
        NProgress.done()
      } catch (error) {
        await store.dispatch('user/resetToken')
        Message.error(error || 'Has Error')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    } else {
      next({ path: '/login' })
      NProgress.done()
    }
  } else if (to.path === '/login') {
    // if is logged in, redirect to the home page
    if (hasToken) {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
      NProgress.done()
    }
  } else {
    next()
    NProgress.done()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
