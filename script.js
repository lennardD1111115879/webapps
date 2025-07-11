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


    // Uhrzeit & Datum
    function updateClock() {
      const now = new Date();
      document.getElementById('clock').textContent = now.toLocaleTimeString('de-DE');
      document.getElementById('date').textContent = now.toLocaleDateString('de-DE');
    }
    setInterval(updateClock, 1000);
    updateClock();

    
    statusSelect.addEventListener("change", () => {
      const status = statusSelect.value;
      statusText.textContent = status === "online" ? "Online" : status === "busy" ? "In einer Besprechung" : "Pause";
      statusIndicator.className = "status-indicator " +
        (status === "online" ? "status-online" :
         status === "busy" ? "status-busy" :
         "status-break");
    });

    // Aufgaben
    function addTask() {
      const taskInput = document.getElementById("taskInput");
      const taskList = document.getElementById("taskList");
      const taskText = taskInput.value.trim();
      if (!taskText) return;

      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `${taskText} <button class="btn btn-sm btn-danger" onclick="this.parentElement.remove()">✖</button>`;
      taskList.appendChild(li);
      taskInput.value = "";
    }

    // Kalender
    function renderCalendar() {
      const calendarDays = document.getElementById("calendarDays");
      const calendarMonth = document.getElementById("calendarMonth");
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
      calendarMonth.textContent = `${monthNames[month]} ${year}`;

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      calendarDays.innerHTML = '';
      for (let i = 0; i < firstDay - 1; i++) {
        calendarDays.innerHTML += '<div class="calendar-day"></div>';
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === today.getDate();
        const dayEl = document.createElement("div");
        dayEl.className = "calendar-day" + (isToday ? " today" : "");
        dayEl.textContent = day;
        calendarDays.appendChild(dayEl);
      }
    }

    renderCalendar();