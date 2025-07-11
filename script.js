// Uhrzeit und Datum aktualisieren
function updateClock() {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('de-DE');
    document.getElementById('date').textContent = now.toLocaleDateString('de-DE');
}
setInterval(updateClock, 1000);
updateClock();

// Status ändern
const statusSelect = document.getElementById("statusSelect");
const statusText = document.getElementById("statusText");
const statusIndicator = document.getElementById("statusIndicator");

statusSelect.addEventListener("change", function () {
    const status = this.value;
    statusText.textContent = status === "online" ? "Online" :
        status === "busy" ? "In einer Besprechung" : "Pause";

    statusIndicator.className = "status-indicator " +
        (status === "online" ? "status-online" :
            status === "busy" ? "status-busy" :
                "status-break");
});

// Aufgabenlogik
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `${taskText} <button class="btn btn-sm btn-danger" onclick="this.parentElement.remove()">✖</button>`;
    taskList.appendChild(li);
    taskInput.value = "";
}