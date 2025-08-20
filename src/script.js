document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-btn");
  const todoList = document.getElementById("todo-lists");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => renderTasks(task));

  addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      isCompleted: false,
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks(newTask);
    todoInput.value = "";

    console.log(tasks);
  });

  function renderTasks(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.classList.add("todo-item");
    if (task.isCompleted) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.classList.add("todo-text");

    const btn = document.createElement("button");
    btn.textContent = "Delete";
    btn.classList.add("delete-btn");

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.isCompleted = !task.isCompleted;
      li.classList.toggle("completed");
      saveTasks();
    });

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    li.appendChild(span);
    li.appendChild(btn);
    todoList.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
