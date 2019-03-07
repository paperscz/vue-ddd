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
			// axios 1. 获取数据
			// 从模拟的服务器接口中,获取数据
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
				// axios 2. 删除数据
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
				// let id = this.list.length == 0 ? 1 : this.list[this.list.length - 1].id + 1
				// axios 3. 保存数据
				//          获取input的值 
				axios.post("http://localhost:3000/list", {
					// post 默认会加id
					name: this.inputValue,  // inputValue 是双向绑定的
					status: false
				}).then(res => {
					// 注意: 当数据存入接口后, 实例vm中的data并未发生改变,所以要将数据存入实例的data中
					this.list.push(res.data)
				})
				// this.list.push({
				// 	id,   //id:id  --> 可简写
				// 	name: this.inputValue,
				// 	status: false
				// })
				this.inputValue = ''
			},
			//编辑数据
			editData(id) {
				this.editId = id
			},
			//关闭编辑器
			closeEdit(e) {
				// 4. axios 修改数据(通过id进行修改)
				//    1. 获取id
				//    2. 获取修改的值 (事件对象的e.target.value拿到值)
				//    注意: 不能用失焦事件, 否则触发两次
				axios.patch("http://localhost:3000/list/" + this.editId, {
					name: e.target.value
				}).then(res => {
					this.editId = -1
				})
			},
			changeStatus(id) {
				// 5. axios 修改选中的状态
				//    1. 获取对应的id,
				//    2. 根据id获取对应项的状态值(取反存入接口)
				//       (不能用过过滤,因为过滤返回的是数组)
				let done = this.list.find(item => item.id == id)
				axios.patch("http://localhost:3000/list/" + id, {
					status: !done.status
				}).then(res => {
					// console.log(res)
				})
			},
			clearComleted() {
				// 6. axios 清楚选中项,一次只能删一个所以要遍历删除
				//    1. 获取status为true的对象的id(存到空数组中) (filter / map)
				//    2. 遍历数组,通过id删除对应标签
				let arr = this.list.filter(item => item.status)
				let arrId = arr.map(item => item.id)
				for (let i = 0; i < arrId.length; i++) {
					axios.delete("http://localhost:3000/list/" + arrId[i]).then(res => {
						// console.log(res)
						// 删除 只是把接口中的数据删除,并没有修改data中的list,所以要过滤
						this.list = this.list.filter(item=> item.id != arrId[i])
					})
				}
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