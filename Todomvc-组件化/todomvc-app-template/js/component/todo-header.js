Vue.component("todo-header", {
    template: `
        <header class="header">
            <h1>todos</h1>
            <input class="new-todo" v-model="todoName" placeholder="What needs to be done?" @keyup.enter="addData" autofocus>
        </header>
    `,
    data() {
        return {
            todoName: ""
        }
    },
    methods: {
        //添加数据
        addData() {
            if (this.todoName.trim() == "") {
                return
            }
            this.$emit("add-data", this.todoName)
            this.todoName = ""
        }

    }

})