import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/recordModules'
  },
  {
    path: '/recordModules',
    name: 'RecordModules',
    component: () => import('../views/RecordModule.vue')
  },
  {
    path: '/surround',
    name: 'Surround',
    component: () => import('../views/Surround.vue')
  },
  {
    path: '/element-test',
    name: 'ElementTest',
    component: () => import('../views/ElementTest.vue')
  },
   {
    path: '/ued-test',
    name: 'UedTest',
    component: () => import('../views/UedTest.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})