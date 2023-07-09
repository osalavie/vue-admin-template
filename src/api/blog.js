import request from '@/utils/request'

/**
 * 添加博客
 * @param {*} data 博客数据
 * @returns
 */
export function addBlog(data) {
  return request({
    url: '/api/blog',
    method: 'post',
    data
  })
}

/**
 * 修改博客
 * @param {*} data 博客数据
 * @returns
 */
export function editBlog(blog) {
  return request({
    url: `/api/blog/${blog.id}`,
    method: 'put',
    data: blog.data
  })
}

/**
 * 根据id获取博客
 * @param {*} id 博客id
 * @returns
 */
export function findOneBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'get'
  })
}

/**
 * 根据条件获取博客列表
 * @param {*} params
 * @returns
 */
export function getBlogs(params) {
  return request({
    url: '/api/blog',
    method: 'get',
    params
  })
}
/**
 * 根据id删除博客
 * @param {*} id 博客id
 * @returns
 */
export function deleteBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'delete'
  })
}

/**
 * 获取分类列表
 * @param {*} params 查询参数
 * @returns
 */
export function getCategories(params) {
  return request({
    url: '/api/blogtype',
    method: 'get',
    params
  })
}

/**
 * 根据分类id删除分类
 * @param {*} id 分类id
 * @returns
 */
export function deleteCategory(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'delete'
  })
}

/**
 * 根据id修改分类
 * @param {*} data 分类数据
 */
export function updateCategory(data) {
  return request({
    url: `/api/blogtype/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 添加分类
 * @param {*} data 分类数据
 */
export function addCategory(data) {
  return request({
    url: '/api/blogtype',
    method: 'post',
    data
  })
}
