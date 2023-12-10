import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/recordModules'
  },
  {
    path: '/recordModules',
    name: 'RecordModules',
    component: () => import('../views/RecordModule.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})