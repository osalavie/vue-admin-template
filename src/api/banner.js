import request from '@/utils/request'

export function getBanners() {
  return request({
    url: '/api/banner',
    method: 'get'
  })
}

export function updateBanner(data) {
  return request({
    url: '/api/banner',
    method: 'post',
    data
  })
}
