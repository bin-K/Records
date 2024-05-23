<template>
	<div class="overlay">
		<div class="overlay-dialog">
			<div class="dialog" ref="dialogRef">
				<div class="header" ref="dialogHeaderRef">
					<div class="title">弹窗头部</div>
				</div>
				<div class="body">
					<div class="content">弹窗内容</div>
					<ued-radio v-model="overflow" :value="false" label="不允许溢出" />
					<ued-radio v-model="overflow" :value="true" label="允许溢出" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const overflow = ref(false)
const dialogRef = ref<HTMLDivElement>()
const dialogHeaderRef = ref<HTMLDivElement>()

const mousedown = (e: MouseEvent) => {
	const downX = e.clientX
	const downY = e.clientY

	const targetRect = dialogHeaderRef.value!.getBoundingClientRect()
	const targetLeft = targetRect.left
	const targetTop = targetRect.top
	const targetWidth = targetRect.width
	const targetHeight = targetRect.height

	const clientWidth = document.documentElement.clientWidth
	const clientHeight = document.documentElement.clientHeight

	const mousemove = (e: MouseEvent) => {
		let moveX = e.clientX - downX
		let moveY = e.clientY - downY

		if (dialogRef.value) {
			dialogRef.value.style.top = `${targetTop + moveY}px`
			dialogRef.value.style.left = `${targetLeft + moveX}px`
			if (!overflow.value) {
				if (targetLeft + moveX < 0) {
					dialogRef.value.style.left = `0px`
				}
				if (targetLeft + targetWidth + moveX > clientWidth) {
					dialogRef.value.style.left = `${clientWidth - targetWidth}px`
				}
				if (targetTop + moveY < 0) {
					dialogRef.value.style.top = `0px`
				}
				if (targetTop + targetHeight + moveY > clientHeight) {
					dialogRef.value.style.top = `${clientHeight - targetHeight}px`
				}
			}
		}
	}

	const mouseup = () => {
		document.removeEventListener('mousemove', mousemove)
		document.removeEventListener('mouseup', mouseup)
	}

	document.addEventListener('mousemove', mousemove)
	document.addEventListener('mouseup', mouseup)
}

onMounted(() => {
	if (dialogRef.value && dialogHeaderRef.value) {
		dialogHeaderRef.value?.addEventListener('mousedown', mousedown)
	}
})
onBeforeUnmount(() => {
	if (dialogRef.value && dialogHeaderRef.value) {
		dialogHeaderRef.value?.removeEventListener('mousedown', mousedown)
	}
})
</script>

<style scoped>
.overlay {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 2000;
	height: 100%;
}
.overlay-dialog {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
}
.dialog {
	position: absolute;
	top: 50%;
	left: 50%;
	/* transform: translate(-50%, -50%); */
	width: 50%;
	background-color: #fff;
	border-radius: 4px;
}
.dialog .header {
	padding: 10px;
	font-size: 14px;
	font-weight: 700;
	color: #000;
	cursor: move;
}
.dialog .body {
	padding: 20px;
	font-size: 14px;
	font-weight: 700;
	color: #000;
}
</style>
