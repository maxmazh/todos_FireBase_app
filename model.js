export function createTodosModel(Todos) {
    return {
        Todos,
        update: function(Todos) {
            this.Todos = Todos;
        },
        add: function(todo) {
            this.Todos.push(todo);
        },
        get: function() {
            return this.Todos;
        },
        clear: function() {
            this.Todos = [];
        },
        toggleTodo: function(id) {
            this.get().forEach(todo => {
                if (id !== todo.id) {
                    return;
                }
                todo.done = !todo.done;

                console.log(todo);
            });
        },
        getTodo: function(id) {
            let result = null;

            this.get().forEach(todo => {
                if (id === todo.id) {
                    result = todo;
                }
            })
            return result;
        }
    };
}