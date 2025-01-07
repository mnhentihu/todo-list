document.addEventListener("DOMContentLoaded", () => {
  const tasks = [];
  const completedTasks = [];
  const taskForm = document.getElementById("todo-form");
  const tasksContainer = document.getElementById("tasks-container");
  const tabTodo = document.getElementById("tab-todo");
  const tabCompleted = document.getElementById("tab-completed");

  let activeTab = "todo";

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskDescription = document.getElementById("task").value.trim();
    const priority = document.getElementById("priority").value;
    const deadline = document.getElementById("deadline").value;

    if (taskDescription && priority && deadline) {
      const newTask = {
        description: taskDescription,
        priority,
        deadline: new Date(deadline),
        submitTime: new Date(),
        id: Date.now(),
        completed: false,
      };
      tasks.push(newTask);
      activeTab = "todo";
      renderTasks("todo");
      taskForm.reset();
    }
  });

  function renderTasks(type) {
    tasksContainer.innerHTML = "";

    const hasTodoTasks = tasks.some((task) => !task.completed);
    const hasCompletedTasks = tasks.some((task) => task.completed);

    tabTodo.classList.toggle("hidden", !hasTodoTasks && !hasCompletedTasks);
    tabCompleted.classList.toggle(
      "hidden",
      !hasTodoTasks && !hasCompletedTasks
    );

    const currentTasks =
      type === "todo"
        ? tasks.filter((task) => !task.completed)
        : tasks.filter((task) => task.completed);

    if (currentTasks.length === 0) {
      const noTaskMessage = document.createElement("p");
      noTaskMessage.className = "text-center text-gray-600 font-medium";
      noTaskMessage.innerText =
        type === "todo" ? "No tasks to do." : "No completed tasks.";
      tasksContainer.appendChild(noTaskMessage);
      return;
    }

    currentTasks.forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.className =
        "bg-white shadow-md p-4 rounded-md flex items-start justify-between";

      const taskDetails = document.createElement("div");
      taskDetails.className = "space-y-2";

      const taskDescription = document.createElement("p");
      taskDescription.className = "text-gray-800 font-semibold";
      taskDescription.innerText = task.description;

      const submitTime = document.createElement("p");
      submitTime.className = "text-gray-500 text-sm";
      submitTime.innerText = `Submitted: ${formatDate(task.submitTime)}`;

      const deadlineTime = document.createElement("p");
      deadlineTime.className = "text-gray-500 text-sm";
      deadlineTime.innerText = `Deadline: ${formatDate(task.deadline)}`;

      const priorityMarker = document.createElement("div");
      priorityMarker.className = `w-4 h-4 rounded-full mt-2 ${
        task.priority === "High"
          ? "bg-red-500"
          : task.priority === "Medium"
          ? "bg-yellow-500"
          : "bg-blue-500"
      }`;

      taskDetails.appendChild(taskDescription);
      taskDetails.appendChild(submitTime);
      taskDetails.appendChild(deadlineTime);
      taskDetails.appendChild(priorityMarker);

      const actionsDiv = document.createElement("div");
      actionsDiv.className = "flex items-center";

      const completeCheckbox = document.createElement("input");
      completeCheckbox.type = "checkbox";
      completeCheckbox.checked = task.completed;
      completeCheckbox.className = "w-5 h-5 cursor-pointer";
      completeCheckbox.addEventListener("change", () =>
        toggleTaskCompletion(task.id)
      );

      actionsDiv.appendChild(completeCheckbox);

      taskDiv.appendChild(taskDetails);
      taskDiv.appendChild(actionsDiv);
      tasksContainer.appendChild(taskDiv);
    });
  }

  function toggleTaskCompletion(taskId) {
    const task = tasks.find((task) => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }
    renderTasks(activeTab);
  }

  function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }

  window.switchTab = function (tab) {
    activeTab = tab;

    if (tab === "todo") {
      tabTodo.classList.add("bg-primary", "font-bold");
      tabTodo.classList.remove("bg-secondary", "hover:bg-primary");
      tabCompleted.classList.add("bg-secondary", "hover:bg-primary");
      tabCompleted.classList.remove("bg-primary", "font-bold");
    } else {
      tabCompleted.classList.add("bg-primary", "font-bold");
      tabCompleted.classList.remove("bg-secondary", "hover:bg-primary");
      tabTodo.classList.add("bg-secondary", "hover:bg-primary");
      tabTodo.classList.remove("bg-primary", "font-bold");
    }

    renderTasks(tab);
  };

  function clearAllTasks() {
    tasks.length = 0;
    completedTasks.length = 0;
    renderTasks(activeTab);
    checkTaskAvailability();
  }

  window.clearAllTasks = clearAllTasks;

  renderTasks("todo");
});
