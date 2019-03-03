(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	const vm = new Vue({
		el: "#app",
		data: {
			list: [
				{ id: 1, name: "旅游环节", status: false },
				{ id: 2, name: "屠杀环节", status: false },
				{ id: 3, name: "吸金环节", status: true }
			],
			inputValue: '',
			editId: -1,
			focusStatus: false,
		},
		methods: {
			// 删除数据
			// 方法1: 通过下标的方法
			// destroyItem(index) {
			// 	this.list.splice(index, 1)
			// }
			// 方法2: 通过过滤 
			// destroyItem(id) {
			// 	this.list = this.list.filter( item => item.id != id )
			// }
			// 方法3: 通过id -> index ->splice
			destroyItem(id) {
				let index = this.list.findIndex(item => item.id == id)
				this.list.splice(index, 1)
			},
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
		computed:{
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