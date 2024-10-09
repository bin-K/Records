window.onload = function () {
	const vue = new Vue({
		el: '#app',
		data: {
			name: '加载中...',
			age: '加载中...',
			otherInfo: {
				job: '加载中...',
			},
		},
	})

	setTimeout(() => {
		vue.name = '小明'
		vue.age = 18
		vue.otherInfo.job = '哈哈哈哈'
	}, 2000)
}

class Dep {
	constructor() {
		this.watchList = []
	}

	add(node) {
		this.watchList.push(node)
	}

	update(value) {
		this.watchList.forEach((node) => {
			if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
				node.value = value
			} else {
				node.textContent = value
			}
		})
	}
}

class Vue {
	constructor(options) {
		this.options = options
		this.$data = options.data
		this.$el = document.querySelector(options.el)
		this.observe(this.$data)
		this.compile(this.$el, this)
		this.proxy(this.$data, this)
	}

	observe(data) {
		if (data && typeof data === 'object') {
			const _this = this
			Object.keys(data).forEach((key) => {
				const dep = new Dep()
				let value = data[key]
				_this.observe(value)
				Object.defineProperty(data, key, {
					get() {
						Dep.target && dep.add(Dep.target)
						return value
					},
					set(newValue) {
						value = newValue
						_this.observe(value)
						dep.update(value)
					},
				})
			})
		}
	}

	compile(dom, vm) {
		const mustache = /\{\{(.*)\}\}/
		Array.from(dom.childNodes).forEach((child) => {
			if (child.nodeType === 1) {
				Array.from(child.attributes).forEach((attr) => {
					if (attr.name.includes('v-model')) {
						Dep.target = child
						child.value = vm.$data[attr.value]
						Dep.target = null
						child.addEventListener('input', (e) => {
							vm.$data[attr.value] = e.target.value
						})
					}
				})
			}
			if (child.nodeType === 3 && mustache.test(child.textContent)) {
				const key = mustache.exec(child.textContent)[1].trim()
				const keyNoTrim = mustache.exec(child.textContent)[1]
				const keyList = key.split('.')
				Dep.target = child
				let value = vm.$data
				keyList.forEach((item) => (value = value[item]))
				child.textContent = child.textContent.replace(`{{${keyNoTrim}}}`, value)
				Dep.target = null
			}
			if (child.childNodes.length) {
				this.compile(child, vm)
			}
		})
	}

	proxy(data, vm) {
		Object.keys(data).forEach((key) => {
			Object.defineProperty(vm, key, {
				get() {
					return data[key]
				},
				set(newValue) {
					data[key] = newValue
				},
			})
		})
	}
}
