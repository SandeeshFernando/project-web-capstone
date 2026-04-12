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


let currentTab = "all"
let currentSearch = ""
let currentSort = "date"

function updateStats() {
  const today = new Date()

  const inProgress = tasks.filter(function(task) {
    return task.status === "in-progress"
  })

  const done = tasks.filter(function(task) {
    return task.status === "done"
  })

  const overdue = tasks.filter(function(task) {
    const dueDate = new Date(task.date)
    return dueDate < today && task.status !== "done"
  })

  document.getElementById("stat-total").textContent = tasks.length
  document.getElementById("stat-inprogress").textContent = inProgress.length
  document.getElementById("stat-done").textContent = done.length
  document.getElementById("stat-overdue").textContent = overdue.length
}

function renderTasks() {
  const container = document.getElementById("task-container")
  container.innerHTML = ""

  let filtered = tasks.filter(function(task) {
    if (currentTab === "all") return true
    return task.status === currentTab
  })

  filtered = filtered.filter(function(task) {
    const search = currentSearch.toLowerCase()
    return task.name.toLowerCase().includes(search) ||
           task.desc.toLowerCase().includes(search)
  })
// sorting loop

  if (currentSort === "name") {
    filtered.sort(function(a, b) {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
  } else if (currentSort === "priority") {
    const order = { high: 1, medium: 2, low: 3 }
    filtered.sort(function(a, b) {
      return order[a.priority] - order[b.priority]
    })
  } else if (currentSort === "date") {
    filtered.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date)
    })
  }



  if (filtered.length === 0) {
    container.innerHTML = "<p>No tasks found.</p>"
    updateStats()
    return
  }
//status label is going to be like this

  filtered.forEach(function(task) {
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

  updateStats()
}

//delete tasks

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id)
  renderTasks()
}

function advanceStatus(id) {
  const task = tasks.find(t => t.id === id)
  if (task.status === "todo") task.status = "in-progress"
  else if (task.status === "in-progress") task.status = "done"
  else if (task.status === "done") task.status = "todo"
  renderTasks()
}
 
function initCardActions() {
  const container = document.getElementById("task-container")
  container.addEventListener("click", function(e) {
    if (e.target.classList.contains("status-btn")) {
      advanceStatus(Number(e.target.dataset.id))
    }
    if (e.target.classList.contains("delete-btn")) {
      deleteTask(Number(e.target.dataset.id))
    }
  })
}

  

function initTabs() {
  const tabs = document.querySelectorAll(".tab")

  tabs.forEach(function(tab) {
    tab.addEventListener("click", function() {
      tabs.forEach(function(t) {
        t.classList.remove("active-tab")
      })
      tab.classList.add("active-tab")
      currentTab = tab.dataset.status
      renderTasks()
    })
  })
}

function initSearch() {
  const searchInput = document.getElementById("search-input")

  searchInput.addEventListener("input", function() {
    currentSearch = searchInput.value
    renderTasks()
  })
}

function initSort() {
  const sortBtn = document.getElementById("sort-btn")
  const sortMenu = document.getElementById("sort-menu")
 
  sortBtn.addEventListener("click", function(e) {
    e.stopPropagation()
    sortMenu.classList.toggle("visible")
  })


  document.querySelectorAll(".sort-option").forEach(function(option) {
    option.addEventListener("click", function() {
      currentSort = option.dataset.sort
      sortMenu.classList.remove("visible")
      renderTasks()
    })
  })

  document.addEventListener("click", function() {
    sortMenu.classList.remove("visible")
  })
}
 

function initModal() {
  const overlay = document.getElementById("modal-overlay")
  const addBtn = document.getElementById("add-task-btn")
  const closeBtn = document.getElementById("modal-close")
  const cancelBtn = document.getElementById("modal-cancel")
  const submitBtn = document.getElementById("modal-submit")

  // open modal
  addBtn.addEventListener("click", function() {
    overlay.style.display = "flex"
  })

  // close modal — X button
  closeBtn.addEventListener("click", function() {
    closeModal()
  })

  // close modal — Cancel button
  cancelBtn.addEventListener("click", function() {
    closeModal()
  })

  // close modal — clicking the overlay background
  overlay.addEventListener("click", function(e) {
    if (e.target === overlay) {
      closeModal()
    }
  })

  // close modal — pressing Escape key
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      closeModal()
    }
  })

  // submit the form
  submitBtn.addEventListener("click", function() {
    const name = document.getElementById("input-name").value.trim()
    const desc = document.getElementById("input-desc").value.trim()
    const priority = document.getElementById("input-priority").value
    const status = document.getElementById("input-status").value
    const date = document.getElementById("input-date").value

    // name is required
    if (name === "") {
      alert("Please enter a task name!")
      return
    }

    // create new task object
    const newTask = {
      id: tasks.length + 1,
      name: name,
      desc: desc,
      priority: priority,
      status: status,
      date: date
    }

    // add to array and redraw
    tasks.push(newTask)
    renderTasks()
    closeModal()
  })
}

function closeModal() {
  const overlay = document.getElementById("modal-overlay")
  overlay.style.display = "none"

  // clear the form
  document.getElementById("input-name").value = ""
  document.getElementById("input-desc").value = ""
  document.getElementById("input-date").value = ""
  document.getElementById("input-priority").value = "low"
  document.getElementById("input-status").value = "todo"
}




//hamberburger menu forr mobile

function initHamburger() {
  const btn = document.getElementById("hamburger-btn")
  const menu = document.getElementById("mobile-menu")
 
  btn.addEventListener("click", function(e) {
    e.stopPropagation()
    menu.classList.toggle("open")
  })
 
  document.addEventListener("click", function() {
    menu.classList.remove("open")
  })
}



renderTasks()
initTabs()
initSearch()
initSort()
initModal()
initCardActions()
initHamburger()
deleteTask()