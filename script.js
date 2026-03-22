const tasks = [
  {
    id: 1,
    name: "Design homepage wireframe",
    desc: "Create low-fi wireframes for the new landing page.",
    priority: "high",
    status: "in-progress",
    date: "2026-03-10"
  },
  {
    id: 2,
    name: "Write project proposal",
    desc: "Draft the proposal document for client approval.",
    priority: "medium",
    status: "todo",
    date: "2026-03-25"
  },
  {
    id: 3,
    name: "Set up database schema",
    desc: "Define tables and relationships for the new system.",
    priority: "high",
    status: "todo",
    date: "2026-02-15"
  },
  {
    id: 4,
    name: "Fix login page bug",
    desc: "Users getting logged out randomly on mobile.",
    priority: "high",
    status: "done",
    date: "2026-03-01"
  },
  {
    id: 5,
    name: "Write unit tests",
    desc: "Cover all API endpoints with Jest tests.",
    priority: "medium",
    status: "in-progress",
    date: "2026-03-20"
  },
  {
    id: 6,
    name: "Update privacy policy",
    desc: "Reflect new data handling changes from legal team.",
    priority: "low",
    status: "todo",
    date: "2026-04-01"
  },
  {
    id: 7,
    name: "Design email templates",
    desc: "Create HTML templates for transactional emails.",
    priority: "medium",
    status: "done",
    date: "2026-02-28"
  },
  {
    id: 8,
    name: "Deploy to staging server",
    desc: "Push latest build to staging for QA testing.",
    priority: "high",
    status: "todo",
    date: "2026-02-10"
  }
]             

function renderTasks() {
  const container = document.getElementById("task-container")
  
  container.innerHTML = ""
  
  tasks.forEach(function(task) {
    const card = document.createElement("div")
    card.innerHTML = `
      <h3>${task.name}</h3>
      <p>${task.desc}</p>
      <p>Priority: ${task.priority}</p>
      <p>Status: ${task.status}</p>
      <p>Due: ${task.date}</p>
    `
    container.appendChild(card)
  })
}

renderTasks()