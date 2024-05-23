import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Index',
		component: () => import('../views/index.vue'),
	},
	{
		path: '/record-module',
		name: 'RecordModules',
		component: () => import('../components/record-module/index.vue'),
	},
	{
		path: '/ued-plus-test',
		name: 'UedPlusTest',
		component: () => import('../components/ued-plus/test.vue'),
	},
	{
		path: '/dialog-translate',
		name: 'DialogTranslate',
		component: () => import('../components/dialog/translate.vue'),
	},
	{
		path: '/dialog-position',
		name: 'DialogPosition',
		component: () => import('../components/dialog/position.vue'),
	},
]

export default createRouter({
	history: createWebHistory(),
	routes,
})
