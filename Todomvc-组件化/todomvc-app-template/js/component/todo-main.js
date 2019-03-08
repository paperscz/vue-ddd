Vue.component("todo-main", {
    template: `
        <section class="main">
            <input id="toggle-all" class="toggle-all" type="checkbox">
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                <li :class="{completed: item.status,editing: item.id == editId}" v-for="item in list">
                    <div class="view">
                        <input class="toggle" type="checkbox" v-model="item.status">
                        <label @dblclick="amendData(item.id)">{{ item.name }}</label>
                        <button class="destroy" @click="delData(item.id)"></button>
                    </div>
                    <input class="edit" :value="item.name" @keyup.enter="saveData">
                </li>
            </ul>
        </section>
    `,
    props: ["list"],
    data() {
        return {
            editId: -1
        }
    },
    methods: {
        // 删除数据
        delData(id) {
            this.$emit("deldate", id)
        },
        // 修改数据
        amendData(id) {
            this.editId = id
        },
        // 保存数据
        saveData(e) {
            this.$emit("amend-save",e.target.value,this.editId)
            this.editId = -1
        }

    }
})
