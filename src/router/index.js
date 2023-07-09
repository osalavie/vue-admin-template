import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '网站监控', icon: 'dashboard', auth: true }
      }
    ]
  },
  {
    path: '/banners',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Banners',
        component: () => import('@/views/banners/index'),
        meta: { title: '首页', icon: 'el-icon-s-home', auth: true }
      }
    ]
  },
  {
    path: '/articles',
    component: Layout,
    meta: { title: '文章', icon: 'el-icon-notebook-2', auth: true },
    redirect: '/articles/list',
    children: [
      {
        path: 'list',
        name: 'ArticleList',
        component: () => import('@/views/articles/index'),
        meta: { title: '文章列表', icon: 'el-icon-s-order', auth: true }
      },
      {
        path: 'create',
        name: 'ArticleCreate',
        component: () => import('@/views/articles/create'),
        meta: {
          title: '创建文章',
          icon: 'el-icon-document-add',
          auth: true
        }
      },
      {
        path: 'edit/:id',
        name: 'ArticleModify',
        component: () => import('@/views/articles/edit'),
        hidden: true,
        meta: {
          title: '编辑文章',
          icon: 'el-icon-document-add',
          auth: true
        }
      },
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/articles/category'),
        meta: { title: '文章分类', icon: 'el-icon-files', auth: true }
      }
    ]
  },
  {
    path: '/projects',
    component: Layout,
    meta: { title: '项目', icon: 'el-icon-s-cooperation', auth: true },
    redirect: '/projects/list',
    children: [
      {
        path: 'list',
        name: 'ProjectList',
        component: () => import('@/views/projects/index'),
        meta: { title: '项目列表', icon: 'el-icon-s-order', auth: true }
      },
      {
        path: 'add',
        name: 'AddProject',
        component: () => import('@/views/projects/create'),
        meta: {
          title: '添加项目',
          icon: 'el-icon-circle-plus-outline',
          auth: true
        }
      }
    ]
  },
  {
    path: '/comments',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'comments',
        component: () => import('@/views/comments/index'),
        meta: { title: '评论', icon: 'el-icon-s-comment', auth: true }
      }
    ]
  },
  {
    path: '/messages',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'messages',
        component: () => import('@/views/messages/index'),
        meta: { title: '留言板', icon: 'el-icon-bell', auth: true }
      }
    ]
  },
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'about',
        component: () => import('@/views/about/index'),
        meta: { title: '关于', icon: 'el-icon-info' }
      }
    ]
  },
  {
    path: '/settings',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'settings',
        component: () => import('@/views/settings/index'),
        meta: { title: '设置', icon: 'el-icon-setting', auth: true }
      }
    ]
  },
  {
    path: '/personalSetting',
    component: Layout,
    hidden: true,
    meta: { children: ['/personalSetting'] },
    children: [
      {
        path: '/personalSetting',
        name: 'PersonalSetting',
        component: () => import('@/views/personalSetting/index'),
        meta: { title: '个人中心', icon: 'el-icon-document-copy', auth: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
