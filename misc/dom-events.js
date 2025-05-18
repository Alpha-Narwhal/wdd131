// events.js
let tasks = [];

document.getElementById('submitTask').addEventListener('click', newTask)

function renderTasks(tasks) {
  // get the list element from the DOM
    const listElement = document.querySelector("#todoList");
    listElement.innerHTML = "";
  // loop through the tasks array. transform (map) each task object into the appropriate HTML to represent a to-do.
    const html = tasks.map(taskTemplate).join("");
    listElement.innerHTML = html
}

function taskTemplate(task) {
  return `
    <li ${task.completed ? 'class="strike"' : ""}>
      <p>${task.detail}</p>
      <div>
        <span data-function="delete">❎</span>
        <span data-function="complete">✅</span>
      </div>
    </li>`
}

function newTask() {
  // get the value entered into the #todo input
    let task = document.getElementById("todo").value;
  // add it to our arrays tasks
    tasks.push({ detail: task, completed: false });
  // render out the list
    renderTasks(tasks);
}

function removeTask(taskElement) {
  // Note the use of Array.filter to remove the element from our task array
  // Notice also how we are using taskElement instead of document as our starting point?
  // This will restrict our search to the element instead of searching the whole document.
  tasks = tasks.filter(
    (task) => task.detail != taskElement.querySelector('p').innerText
  );

  // this line removes the HTML element from the DOM
  taskElement.remove();
  removeTask(tasks)
}

function completeTask(taskElement) {
  // In this case we need to find the index of the task so we can modify it.
  const taskIndex = tasks.findIndex(
    (task) => task.detail === taskElement.querySelector('p').innerText
  );
  // once we have the index we can modify the complete field.
  // tasks[taskIndex].completed ? false : true is a ternary expression.
  // If the first part is true (left of the ?), then the value on the left of the : will get returned, otherwise the value on the right of the : will be returned.
  tasks[taskIndex].completed = tasks[taskIndex].completed ? false : true;
  // toggle adds a class if it is not there, removes it if it is.
  taskElement.classList.toggle("strike");
  console.log(tasks);
  renderTasks(tasks)
}

function manageTasks(event) {
  // did they click the delete or complete icon?
  console.log(event.target);
  console.log(event.currentTarget);
  // event.target will point to the actual icon clicked on. We need to get the parent li to work with however. HINT: Remember element.closest()? Look it up if you don't
const clicked = event.target;
const taskElement = clicked.closest('li')
  // because we added 'data-action="delete"' to each icon in a task we can access a dataset property on our target (e.target.dataset.action)
  const action = clicked.dataset.function;

  // use that in a couple of if statements to decide whether to run removeTask or completeTask
  if (action === 'delete') {
    removeTask(taskElement);
  }
  if (action === 'complete') {
    completeTask(taskElement);
  }

}

document.getElementById('todoList').addEventListener('click', manageTasks);


// Add your event listeners here
// We need to attach listeners to the submit button and the list. Listen for a click, call the 'newTask' function on submit and call the 'manageTasks' function if either of the icons are clicked in the list of tasks.