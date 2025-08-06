# ✅ Task Manager App

A full-stack **Task Manager** application with **User Authentication (JWT)** and **Task Management (CRUD)**.  
Built using **Node.js, Express.js, MongoDB, and Vanilla JavaScript** with a **dark theme UI**.

---

## 🚀 Features
- 🔐 **User Authentication** (Register/Login using JWT)
- ➕ **Add Tasks**, ✏ **Edit**, ❌ **Delete**, ✅ **Mark Complete**
- 🌗 **Dark Theme UI with Stylish Fonts**
- 💾 **Persistent Session using Local Storage**
- 🛡 **Secure API with JWT Middleware**
- 🎨 Responsive & Modern Design

---

## 🛠 Tech Stack
- **Frontend:** HTML, CSS (Dark Theme), JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT + bcrypt
- **Environment Config:** dotenv

---

## 📂 Project Structure
P1-TASK-MANAGER/
│
├── backend/
│ ├── middleware/
│ │ └── authMiddleware.js # JWT verification
│ ├── models/
│ │ ├── task.js # Task schema
│ │ └── user.js # User schema
│ ├── routes/
│ │ ├── authRoutes.js # Login/Register routes
│ │ └── taskRoutes.js # Task CRUD routes
│ ├── .env # Environment variables
│ └── server.js # Main Express server
│
├── frontend/
│ ├── app.js # Handles UI and API calls
│ ├── index.html # Main HTML file
│ └── style.css # Dark theme styles
│
├── node_modules/
├── package.json
├── package-lock.json
└── .gitignore

yaml
Copy code

---

## ⚙️ Installation & Setup

### 1️⃣ **Clone the repository**
```bash
git clone https://github.com/your-username/P1-TASK-MANAGER.git
cd P1-TASK-MANAGER
2️⃣ Setup Backend
bash
Copy code
cd backend
npm install
Create a .env file in the backend folder:

ini
Copy code
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
Run backend:

bash
Copy code
node server.js
3️⃣ Setup Frontend
No build needed. Just open frontend/index.html in your browser OR serve it using Express for production.

▶️ Usage
Register → Login → Add/Edit/Delete/Complete Tasks

Logout anytime to clear session

✔ Completed tasks show a green tick

🌍 Deployment
Backend → Render, Railway

Frontend → Vercel or GitHub Pages