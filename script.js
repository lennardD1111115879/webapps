document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") addTask();
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <div>
                <button class="btn btn-sm btn-success me-2 done-btn">✓</button>
                <button class="btn btn-sm btn-danger delete-btn">✗</button>
            </div>
        `;

        taskList.appendChild(li);
        taskInput.value = "";

        // Event Listener für Buttons
        li.querySelector(".done-btn").addEventListener("click", function () {
            li.querySelector(".task-text").classList.toggle("text-decoration-line-through");
        });

        li.querySelector(".delete-btn").addEventListener("click", function () {
            li.remove();
        });
    }
});
