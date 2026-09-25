import { TODOS_STORAGE_KEY } from "./constans";
import { createTodosModel } from "./model";
import { createStorage } from "./storage";
import { createView } from "./view";

const inputNode = document.querySelector('.js_input');
const btnNode = document.querySelector('.js_btn');
const btnClearNode = document.querySelector('.js_clear_btn');

const initialTodos = [];
const model = createTodosModel(initialTodos);
const view = createView('.js_output');
const storage = createStorage(TODOS_STORAGE_KEY);

storage.pull().then((Todos) => {
    model.update(Todos);
    view.render(model.get());
});

btnNode.addEventListener('click', function() {
    const todo = {
        title: inputNode.value,
        status: 'active'
    };

    model.add(todo);

    view.addTodo(todo);

    storage.push(todo);

    // inputNode.innerHTML = '';
});

btnClearNode.addEventListener('click', function() {
    storage.delete(model.get());

    model.clear();

    view.render(model.get());
})