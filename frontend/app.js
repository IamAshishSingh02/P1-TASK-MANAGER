async function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    alert('Registered successfully');
  } else {
    const error = await res.json();
    alert('Error: ' + error.error);
  }
}

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    const data = await res.json();
    token = data.token;
    document.getElementById('auth').style.display = 'none';
    document.getElementById('tasks').style.display = 'block';
    loadTasks();
  } else {
    const error = await res.json();
    alert('Login Failed: ' + error.error);
  }
}
