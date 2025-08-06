// Declare token globally
let token = localStorage.getItem('token') || '';

// REGISTER
async function register() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert('Please enter username and password');
    return;
  }

  const res = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    alert('Registered successfully! Now login.');
  } else {
    const error = await res.json();
    alert('Error: ' + error.error);
  }
}

// LOGIN
async function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !password) {
    alert('Please enter username and password');
    return;
  }

  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    const data = await res.json();
    token = data.token;
    localStorage.setItem('token', token); // save token for later
    document.getElementById('auth').style.display = 'none';
    document.getElementById('tasks').style.display = 'block';
    document.getElementById('logoutBtn').style.display = 'block'; // show logout
    loadTasks();
  } else {
    const error = await res.json();
    alert('Login Failed: ' + error.error);
  }
}

// LOAD TASKS
async function loadTasks() {
  const res = await fetch('http://localhost:5000/api/tasks', {
    headers: { 'Authorization': token }
  });

  if (!res.ok) {
    alert('Failed to load tasks');
    return;
  }

  const tasks = await res.json();
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.classList.add('task-item'); // Apply flex styling
    if (task.completed) {
      li.classList.add('completed'); // Add class for styling (optional)
    }

    li.innerHTML = `
      <span class="task-title">${task.title}</span>
      <div class="task-actions">
        <button onclick="toggleTask('${task._id}', ${!task.completed})">
          ${task.completed ? 'Undo' : 'Complete'}
        </button>
        <button onclick="editTaskPrompt('${task._id}', '${task.title.replace(/'/g, "\\'")}')">Edit</button>
        <button onclick="deleteTask('${task._id}')">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

// ADD TASK
async function addTask() {
  const title = document.getElementById('taskTitle').value.trim();
  if (!title) {
    alert('Task cannot be empty');
    return;
  }

  const res = await fetch('http://localhost:5000/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({ title })
  });

  if (res.ok) {
    document.getElementById('taskTitle').value = '';
    loadTasks();
  } else {
    const error = await res.json();
    alert('Error adding task: ' + error.error);
  }
}

// DELETE TASK
async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) return;

  const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': token }
  });

  if (res.ok) {
    loadTasks();
  } else {
    alert('Error deleting task');
  }
}

// TOGGLE COMPLETE
async function toggleTask(id, completed) {
  const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({ completed })
  });

  if (res.ok) {
    loadTasks();
  } else {
    alert('Error updating task');
  }
}

// EDIT TASK PROMPT
function editTaskPrompt(id, currentTitle) {
  const newTitle = prompt('Edit task:', currentTitle);
  if (newTitle && newTitle.trim()) {
    editTask(id, newTitle.trim());
  }
}

// EDIT TASK
async function editTask(id, newTitle) {
  const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify({ title: newTitle })
  });

  if (res.ok) {
    loadTasks();
  } else {
    alert('Error editing task');
  }
}

// LOGOUT FUNCTION
function logout() {
  localStorage.removeItem('token'); // clear saved token
  token = ''; // reset token
  document.getElementById('auth').style.display = 'block';
  document.getElementById('tasks').style.display = 'none';
  document.getElementById('logoutBtn').style.display = 'none';
}

// ✅ Auto-login if token exists
if (token) {
  document.getElementById('auth').style.display = 'none';
  document.getElementById('tasks').style.display = 'block';
  document.getElementById('logoutBtn').style.display = 'block'; // show logout
  loadTasks();
}
