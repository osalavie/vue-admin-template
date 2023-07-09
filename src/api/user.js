import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

// 获取用户信息，恢复登录状态
export function getInfo(token) {
  return request({
    url: '/api/admin/whoami',
    method: 'get',
    params: { token }
  })
}

// 修改用户
export function setUser(data) {
  return request({
    url: '/api/admin',
    method: 'PUT',
    data
  })
}
