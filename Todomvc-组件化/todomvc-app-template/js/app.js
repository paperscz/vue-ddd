(function (window) {
	'use strict';

	const vm = new Vue({
		el: "#app",
		data: {
			list: [
				{ id: 1, name: "厉害了", status: false },
				{ id: 2, name: "好舒服哦", status: true },
				{ id: 3, name: "贼", status: false },
			]
		},
		methods: {
			// 删除数据
			delDataP(id) {
				this.list = this.list.filter(item => item.id != id)
			},
			// 添加数据
			addDataP(name) {
				// 生成id (数组最后一项id + 1)
				let id = this.list.length == 0 ? 1 : this.list[this.list.length - 1].id + 1
				this.list.push({
					name,
					id,
					status: false
				})
			},
			// 保存修改的数据
			amendSave(data, id) {
				this.list.find(item => item.id == id).name = data
			},
			// 删除已完成的
			clearCompletedP() {
				this.list = this.list.filter(item => !item.status)
			}
		},
		computed: {
			// 显示(>一条时显示)
			isFooterShow() {
				return this.list.length > 0
			},
			// 显示完成的个数
			completedNum() {
				return this.list.filter(item => item.status == true).length
			},
			// 显示清理
			isCompletedShow() {
				return this.list.filter(item=>item.status == true).length > 0
			}

		}
	})

})(window);
