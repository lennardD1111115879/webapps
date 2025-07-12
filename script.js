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
// Besprechungen hinzufügen
function addMeeting() {
    const name = document.getElementById("meetingName").value.trim();
    const time = document.getElementById("meetingTime").value.trim();
    const link = document.getElementById("meetingLink").value.trim();
    const list = document.getElementById("meetingList");

    if (!name || !time || !link) return alert("Bitte alle Felder ausfüllen!");

    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = `<a href="${link}" target="_blank">${name} – ${time}</a>`;
    list.appendChild(li);

    // Felder leeren
    document.getElementById("meetingName").value = "";
    document.getElementById("meetingTime").value = "";
    document.getElementById("meetingLink").value = "";
}

function clearMeetings() {
    if (confirm("Alle Meetings wirklich löschen?")) {
        localStorage.removeItem("homeoffice_meetings");
        renderMeetings([]);
    }
}



// Speicher-Schlüssel
const MEETINGS_KEY = "homeoffice_meetings";

// Meeting hinzufügen
function addMeeting() {
    const name = document.getElementById("meetingName").value.trim();
    const time = document.getElementById("meetingTime").value.trim();
    const link = document.getElementById("meetingLink").value.trim();

    if (!name || !time || !link) {
        alert("Bitte alle Felder ausfüllen!");
        return;
    }

    const newMeeting = { name, time, link };
    const meetings = loadMeetings();
    meetings.push(newMeeting);
    saveMeetings(meetings);
    renderMeetings(meetings);

    // Felder leeren
    document.getElementById("meetingName").value = "";
    document.getElementById("meetingTime").value = "";
    document.getElementById("meetingLink").value = "";
}

// Meetings speichern
function saveMeetings(meetings) {
    localStorage.setItem(MEETINGS_KEY, JSON.stringify(meetings));
}

// Meetings laden
function loadMeetings() {
    const data = localStorage.getItem(MEETINGS_KEY);
    return data ? JSON.parse(data) : getDefaultMeetings();
}

// Standard-Meetings 
function getDefaultMeetings() {
    return [

        { name: "Team-Meeting", time: "10:00 Uhr", link: "https://discord.gg/DeWdzqrY" },
        { name: "Projektbesprechung", time: "14:00 Uhr", link: "https://example.com/meeting2" },
        { name: "Kundenanruf", time: "16:00 Uhr", link: "https://example.com/meeting3" }
    ];
}

// Meetings anzeigen
function renderMeetings(meetings) {
    const list = document.getElementById("meetingList");
    list.innerHTML = "";
    meetings.forEach(meeting => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `<a href="${meeting.link}" target="_blank">${meeting.name} – ${meeting.time}</a>`;
        list.appendChild(li);
    });
}

// Beim Laden initialisieren
document.addEventListener("DOMContentLoaded", () => {
    const meetings = loadMeetings();
    renderMeetings(meetings);
});

const toggleBtn = document.getElementById("toggleDarkMode");

function applyTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    toggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    localStorage.setItem("darkMode", isDark ? "true" : "false");
}

toggleBtn.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark-mode");
    applyTheme(isDark);
});

// Beim Laden: Theme wiederherstellen
document.addEventListener("DOMContentLoaded", () => {
    const isDark = localStorage.getItem("darkMode") === "true";
    applyTheme(isDark);
});
