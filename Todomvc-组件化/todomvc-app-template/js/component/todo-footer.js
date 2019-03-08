Vue.component("todo-footer", {
    template: `
        <footer class="footer" v-show="isFooterShow">
            <span class="todo-count"><strong>{{ completedNum }}</strong> item left</span>
        
            <ul class="filters">
                <li>
                    <a class="selected" href="#/">All</a>
                </li>
                <li>
                    <a href="#/active">Active</a>
                </li>
                <li>
                    <a href="#/completed">Completed</a>
                </li>
            </ul>
            
            <button v-show="isCompletedShow" class="clear-completed" @click="clearCompleted">Clear completed</button>
        </footer>
    `,
    props: ["isFooterShow","completedNum","isCompletedShow"],
    methods: {
        clearCompleted() {
            this.$emit("clear-completed")
        }
    }
})