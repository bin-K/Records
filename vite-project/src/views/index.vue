<template>
	<ued-button v-for="item in routerLink" @click="$router.push(item.link)">
		{{ item.name }}
	</ued-button>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const $router = useRouter()

const routerLink = [
	{
		name: '容器中线是否进入元素',
		link: '/record-module',
	},
	{
		name: 'ued-plus组件测试',
		link: '/ued-plus-test',
	},
	{
		name: '拖拽弹窗-translate',
		link: '/dialog-translate',
	},
	{
		name: '拖拽弹窗-position',
		link: '/dialog-position',
	},
]
</script>
