(function (window) {
	'use strict';

	// let list = JSON.parse(localStorage.getItem("list")) || []

	// Your starting point. Enjoy the ride!
	const vm = new Vue({
		el: "#app",
		data: {
			list: [],
			inputValue: '',
			editId: -1,
			focusStatus: false,
		},
		created() {
			// 从模拟的服务器接口中,获取胡数据
			axios.get("http://localhost:3000/list").then(res => {
				this.list = res.data || []
			})
		},
		watch: {
			// 监听器
			list: {
				deep: true,
				handler(newVal) {
					// newVal是这个数组
					localStorage.setItem("list", JSON.stringify(newVal))
				}
			}
		},
		methods: {
			// 删除数据
			// 方法1: 通过下标的方法
			// destroyItem(index) {
			// 	this.list.splice(index, 1)
			// }
			// 方法2: 通过过滤 
			destroyItem(id) {
				axios.delete(`http://localhost:3000/list/${id}`).then(() => {
					this.list = this.list.filter(item => item.id != id)
				})
			},
			// 方法3: 通过id -> index ->splice
			// destroyItem(id) {
			// 	let index = this.list.findIndex(item => item.id == id)
			// 	this.list.splice(index, 1)
			// },
			// 保存数据
			saveDate() {
				if (this.inputValue.trim() == '') {
					return
				}
				let id = this.list.length == 0 ? 1 : this.list[this.list.length - 1].id + 1
				this.list.push({
					id,   //id:id  --> 可简写
					name: this.inputValue,
					status: false
				})
				this.inputValue = ''
			},
			//编辑数据
			editData(id) {
				this.editId = id
			},
			//关闭编辑器
			closeEdit() {
				this.editId = -1
			}
		},
		computed: {
			showStatus() {
				return this.list.length > 0
			},
			showUnDone() {
				return this.list.filter(item => item.status == false).length
			},
			showClearCompleted() {
				return this.list.some(item => item.status == true)
			}
		},
		directives: {
			'todo-focus': function (el) {
				el.focus();
			}
		}
	})




})(window);