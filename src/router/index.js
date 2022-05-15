import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/landing',
    name: 'Landing',
    component: () => import(/* webpackChunkName: "Landing" */ '../views/landing/index.vue')
  },
  {
    path: '/info',
    name: 'StoreInfo',
    component: () => import(/* webpackChunkName: "StoreInfo" */ '../views/info/index.vue')
  },
  {
    path: '/password/forgot',
    name: 'PasswordForgot',
    component: () => import(/* webpackChunkName: "PasswordForgot" */ '../views/password/Forgot.vue')
  },
  {
    path: '/password/setting',
    name: 'PasswordSetting',
    component: () => import(/* webpackChunkName: "PasswordSetting" */ '../views/password/Setting.vue')
  },
  {
    path: '/reimburse/list',
    name: 'ReimburseList',
    component: () => import(/* webpackChunkName: "ReimburseList" */ '../views/reimburse/List.vue')
  },
  {
    path: '/reimburse/input',
    name: 'ReimburseInput',
    component: () => import(/* webpackChunkName: "ReimburseInput" */ '../views/reimburse/Input.vue')
  },
  {
    path: '/reimburse/check/:id',
    name: 'ReimburseCheck',
    component: () => import(/* webpackChunkName: "ReimburseCheck" */ '../views/reimburse/Check.vue')
  },
  {
    path: '/return/scan',
    name: 'ReturnScan',
    component: () => import(/* webpackChunkName: "ReturnScan" */ '../views/rent/Return.vue')
  },
  {
    path: '/return/success/:orderId',
    name: 'ReturnSuccess',
    component: () => import(/* webpackChunkName: "ReturnSuccess" */ '../views/success/Return.vue')
  }
]

const router = new VueRouter({ routes })

export default router
