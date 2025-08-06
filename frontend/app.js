let token = '';

async function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password })
  });
  alert('Registered successfully');
}

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  token = data.token;
  document.getElementById('auth').style.display = 'none';
  document.getElementById('tasks').style.display = 'block';
  loadTasks();
}

async function loadTasks() {
  const res = await fetch('http://localhost:5000/api/tasks', {
    headers: { 'Authorization': token }
  });
  const tasks = await res.json();
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.title;
    list.appendChild(li);
  });
}

async function addTask() {
  const title = document.getElementById('taskTitle').value;
  await fetch('http://localhost:5000/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': token },
    body: JSON.stringify({ title })
  });
  loadTasks();
}