/**
 * @description 登录相关接口
 */
import request from '@/utils/request'

export function getCaptcha() {
  return request({
    url: '/res/captcha',
    method: 'get'
  })
}

