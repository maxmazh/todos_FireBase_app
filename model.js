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
        }
    };
}