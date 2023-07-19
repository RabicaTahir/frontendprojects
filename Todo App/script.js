const listContainer = document.querySelector('.tasks'); // ul
const newTodoForm = document.querySelector('.addTodo'); // form
const newTodoInput = document.querySelector('.addNew'); // input
const listCountElement = document.querySelector('.counter'); //counter
const taskTemplate = document.querySelector('#task-template'); // html template
const alert = document.querySelector('.alert'); // alert
const clearCompletedTaskBtn = document.querySelector('.clear'); // clear completed

// filtering
const filterOptions = document.querySelector('.filter-todos');
const allTaskBtn = document.querySelector('.all');
const showActiveTodos = document.querySelector('.activeBtn');
const showCompletedTodos = document.querySelector('.completed');

new Sortable(listContainer, {
  animation: 150,
  ghostClass: 'blue-background-class',
});

const LOCAL_STORAGE_LIST = 'task.todos';

let todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST)) || [
  {
    id: '1',
    name: 'Complete online JavaScript course',
    completed: false,
  },
  {
    id: '2',
    name: 'Jog around the park 3x',
    completed: false,
  },
  {
    id: '3',
    name: '10 minutes meditation',
    completed: false,
  },
  {
    id: '4',
    name: 'Read for 1 hour',
    completed: false,
  },
  {
    id: '5',
    name: 'Pick up groceries',
    completed: false,
  },
  {
    id: '6',
    name: 'Complete Todo App on Frontend Mentor',
    completed: false,
  },
];

const focusInput = () => {
  newTodoInput.focus();
};

const createTask = name => {
  let id = todos.length + 1;
  return { id: id.toString(), name: name, completed: false };
};

const submitTodo = e => {
  e.preventDefault();
  const listName = newTodoInput.value;
  console.log(listName);
  if (listName === null || listName === '') {
    alert.textContent = 'Write a task first';
    alert.style.display = 'block';
    setTimeout(() => {
      alert.style.display = 'none';
    }, 2000);
    focusInput();
    return;
  }

  const task = createTask(listName);
  newTodoInput.value = null;
  todos.push(task);
  focusInput();
  saveAndRender();
};

const isCompleted = e => {
  if (e.target.tagName.toLowerCase() === 'input') {
    const selectedTask = todos.find(task => task.id === e.target.id);
    selectedTask.completed = e.target.checked;
  }

  renderTaskCount();
  saveToLocalstorage();
};

const deleteTodo = e => {
  if (e.target.tagName.toLowerCase() === 'img') {
    const deleteTask = todos.filter(task => task.id !== e.target.id);
    todos = deleteTask;
    focusInput();
    saveAndRender();
  }
  renderTaskCount();
  saveToLocalstorage();
};

const filterTodos = e => {
  if (
    e.target.classList.contains('all') ||
    e.target.classList.contains('activeBtn') ||
    e.target.classList.contains('completed')
  ) {
    listContainer.innerHTML = '';
  }

  todos.map(todo => {
    if (e.target === allTaskBtn) {
      listContainer.innerHTML = '';
      showActiveTodos.classList.remove('active');
      allTaskBtn.classList.add('active');
      showCompletedTodos.classList.remove('active');
      console.log('All');
      saveAndRender();
      focusInput();
    }

    if (e.target === showActiveTodos) {
      showActiveTodos.classList.add('active');
      allTaskBtn.classList.remove('active');
      showCompletedTodos.classList.remove('active');
      if (!todo.completed) {
        const taskElement = document.importNode(taskTemplate.content, true);
        const checkbox = taskElement.querySelector('input');
        checkbox.id = todo.id;
        checkbox.checked = todo.completed;
        const label = taskElement.querySelector('label');
        label.htmlFor = todo.id;
        label.append(todo.name);
        const deleteBtn = taskElement.querySelector('img');
        deleteBtn.id = todo.id;
        listContainer.appendChild(taskElement);
      }
    }

    if (e.target === showCompletedTodos) {
      showActiveTodos.classList.remove('active');
      allTaskBtn.classList.remove('active');
      showCompletedTodos.classList.add('active');
      if (todo.completed) {
        const taskElement = document.importNode(taskTemplate.content, true);
        const checkbox = taskElement.querySelector('input');
        checkbox.id = todo.id;
        checkbox.checked = todo.completed;
        const label = taskElement.querySelector('label');
        label.htmlFor = todo.id;
        label.append(todo.name);
        const deleteBtn = taskElement.querySelector('img');
        deleteBtn.id = todo.id;
        listContainer.appendChild(taskElement);
      }
    }
  });
};

const renderTaskCount = () => {
  const incompleteTaskCount = todos.filter(task => !task.completed).length;
  const taskString = incompleteTaskCount === 1 || incompleteTaskCount === 0 ? 'item' : 'items';
  listCountElement.innerHTML = `${incompleteTaskCount} ${taskString} left`;
};

const clearCompletedTodos = () => {
  const clearCompleted = todos.filter(task => !task.completed);
  allTaskBtn.classList.add('active');
  showCompletedTodos.classList.remove('active');
  if (clearCompleted.length === todos.length) {
    alert.style.display = 'block';
    alert.textContent = 'Tick one or more items first';
    setTimeout(() => {
      alert.style.display = 'none';
    }, 1500);
  }

  if (clearCompleted.length !== todos.length) {
    alert.style.display = 'block';
    alert.textContent = `Deleted`;
    setTimeout(() => {
      alert.style.display = 'none';
    }, 1500);
  }

  if (clearCompleted.length === 0 && todos.length === 0) {
    alert.style.display = 'block';
    alert.textContent = `No item left`;
    setTimeout(() => {
      alert.style.display = 'none';
    }, 1500);
  }
  todos = clearCompleted;
  saveAndRender();
};

const renderTasks = selectedList => {
  clearElement(listContainer);
  todos.forEach(todo => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector('input');
    checkbox.id = todo.id;
    checkbox.checked = todo.completed;
    const label = taskElement.querySelector('label');
    label.htmlFor = todo.id;
    label.append(todo.name);
    const deleteBtn = taskElement.querySelector('img');
    deleteBtn.id = todo.id;
    listContainer.appendChild(taskElement);
  });
  renderTaskCount(selectedList);
  saveToLocalstorage();
};

const clearElement = element => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const saveAndRender = () => {
  saveToLocalstorage();
  renderTasks();
};

const saveToLocalstorage = () => {
  localStorage.setItem(LOCAL_STORAGE_LIST, JSON.stringify(todos));
};

const render = () => {
  clearElement(listContainer);
  renderTasks();
  saveToLocalstorage();
  focusInput();
};

listContainer.addEventListener('click', isCompleted);
newTodoForm.addEventListener('submit', submitTodo);
listContainer.addEventListener('click', deleteTodo);
filterOptions.addEventListener('click', filterTodos);
clearCompletedTaskBtn.addEventListener('click', clearCompletedTodos);

render();