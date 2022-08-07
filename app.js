let todoItems = [];

function addTodo(text) {

    const todo = {
        text,
        checked: false,
        id: Date.now(),
    };

    todoItems.push(todo);
    renderTodo(todo);
    console.log(todoItems);

}

const form = document.querySelector('.js-form');

form.addEventListener('submit', event => {

    event.preventDefault();

    const input = document.querySelector('.js-todo-input')

    const text = input.value.trim();

    if (text != '') {
        addTodo(text)
        input.value = '';
        input.focus();
    }


});

const list = document.querySelector('.js-todo-list')

list.addEventListener('click', event => {
    if (event.target.classList.contains('js-tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey)


    }

});


const toggleDone = (key) => {
    // findIndex é método de array que returna a posição do elemento
    // em um array
    const index = todoItems.findIndex(item => item.id === Number(key));
    // Localiza o item no array todoItems e configura o atributo checked
    // para o oposto. Isto significado, `true` deve se tornar `false` and vice
    // versa.
    todoItems[index].checked = !todoItems[index].checked;
    renderTodo(todoItems[index]);
}


const renderTodo = (todo) => {

    const list = document.querySelector('.js-todo-list');

    const item = document.querySelector(`[data-key='${todo.id}']`);

    const isChecked = todo.checked ? 'done' : '';

    const node = document.createElement('li');

    node.setAttribute('class', `todo-item ${isChecked}`)

    node.setAttribute('data-key', todo.id);

    node.innerHTML =
        `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
    
  `;

   if (item){
    list.replaceChild(node , item);
   }else {
    list.appendChild(node)
   }
}

