export function createView(selector) {
    const node = document.querySelector(selector);

    return {
        node,
        render: function(Todos) {
            Todos.forEach((todo) => {
                this.addTodo(todo);
            })
        },
        addTodo: function(todo) {
            const div = document.createElement('div');
            const input = document.createElement('input');
            const label = document.createElement('label');

            input.setAttribute('type', 'checkbox');
            input.setAttribute('id', todo.id);

            if (todo.done) {
                input.setAttribute('checked', true);
            }

            label.innerText = todo.title;
            label.setAttribute('for', todo.id);

            div.append(input, label);

            this.node.append(div);
        }
    };
}