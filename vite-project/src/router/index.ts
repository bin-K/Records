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
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})