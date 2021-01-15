// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const taskInput = document.querySelector("#task");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);

  // Add task event
  form.addEventListener("submit", addTask);

  // Remove task event
  taskList.addEventListener("click", removeTask);

  // Clear task event
  clearBtn.addEventListener("click", clearTasks);

  // Filter tasks event
  filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from LS
function getTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // Get what's in LS and parse to JSON
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  // Create DOM element from LS
  tasks.forEach((task) => createTaskItem(task));
}

function createTaskItem(task) {
  // Create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item ";
  // Create text node and append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);
}

// Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Empty task, please enter a valid task.");
    return;
  }

  createTaskItem(taskInput.value)

  // Store in LocalStorage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = "";

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // Get what's in LocalStorage and parse to JSON
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are You sure?")) e.target.parentElement.parentElement.remove();
  }

  // Remove from LS all list item
  removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  //console.log(taskItem)

  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    // Get what's in LocalStorage and parse to JSON
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // Clear from LS
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  // What's typed
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach((task) => {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}