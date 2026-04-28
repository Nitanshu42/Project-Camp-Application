<div align="center">
  <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200&h=300" alt="Project Camp Banner" style="border-radius: 12px; margin-bottom: 20px;"/>
  <h1>⛺ Project Camp Application</h1>
  <p><i>Your ultimate basecamp for seamless project and task management.</i></p>
  
  [![React](https://img.shields.io/badge/React-18.3-blue.svg?style=for-the-badge&logo=react)](https://react.dev)
  [![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg?style=for-the-badge&logo=nodedotjs)](https://nodejs.org)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green.svg?style=for-the-badge&logo=mongodb)](https://mongodb.com)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
</div>

<br />

## 🌟 About The Project

**Project Camp** is a modern, full-stack project management application designed for beginners and professionals alike. It provides a clean, intuitive, and responsive interface to manage your projects, tasks, subtasks, and notes. Whether you're organizing a small personal project or coordinating with a team, Project Camp sets up your basecamp for success.

## ✨ Key Features

- **🔐 Secure Authentication:** Robust user registration, login, and JWT-based session management, including password reset functionality via email.
- **📊 Interactive Dashboard:** Get a bird's eye view of all your projects and tasks in a single, well-organized dashboard.
- **📁 Comprehensive Project Management:** Create, read, update, and delete projects with ease.
- **✅ Task & Subtask Tracking:** Break down your projects into actionable tasks and granular subtasks.
- **📝 Notes Integration:** Attach quick notes and ideas directly within your projects.
- **🎨 Beautiful UI:** A premium, fully responsive interface powered by React, Tailwind CSS, Framer Motion, and shadcn/ui.
- **📧 Automated Emails:** Welcome emails and secure password reset links powered by Nodemailer and Mailgen.

---

## 🛠️ Tech Stack

This application is built using the **MERN** stack along with modern frontend tooling.

### Frontend
- **Framework:** React 18 with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS & shadcn/ui
- **Routing:** React Router v6
- **Data Fetching:** TanStack React Query
- **Animations:** Framer Motion

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcrypt
- **Mailing:** Nodemailer & Mailgen
- **File Uploads:** Multer

---

## 📂 Project Structure

```text
Project Camp Application/
├── Project Camp Backend/         # Express API layer
│   ├── src/
│   │   ├── controllers/          # Request handlers
│   │   ├── models/               # Mongoose schemas (User, Project, Task, etc.)
│   │   ├── routes/               # API endpoint definitions
│   │   ├── middlewares/          # Auth and upload middlewares
│   │   └── utils/                # Helper functions (Mail, API Response handling)
│   └── .env.example              # Environment variables template
│
└── Project Camp Frontend/        # React application
    ├── src/
    │   ├── components/           # Reusable UI components (Layout, UI library)
    │   ├── pages/                # Main application views (Dashboard, Auth, Projects)
    │   ├── services/             # API communication logic
    │   └── hooks/                # Custom React hooks
    └── tailwind.config.ts        # Tailwind CSS configuration
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB Atlas account or a local MongoDB server
- Git

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd project-camp-application
```

### 2. Backend Setup
```bash
cd "Project Camp Backend"
npm install
```
- Copy the `.env.example` file to a new file named `.env` and fill in your configuration (MongoDB URI, JWT secrets, Email SMTP credentials, etc.).
- Start the development server:
```bash
npm run dev
```
The backend will run on `http://localhost:8000` (or whatever port you set in `.env`).

### 3. Frontend Setup
Open a new terminal window:
```bash
cd "../Project Camp Frontend"
npm install
```
- Start the Vite development server:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`.

---

## 🛣️ API Endpoints Overview

The backend exposes a structured RESTful API:
- **/api/v1/auth:** User registration, login, password recovery.
- **/api/v1/project:** Project creation, retrieval, updates, and deletion.
- **/api/v1/task:** Task and subtask management.
- **/api/v1/note:** Adding and managing project notes.
- **/api/v1/healthcheck:** System health verification.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page. 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License.

---

<div align="center">
  <b>Developed  by Shubham Jamdar and Nitanshu Tiwari</b>
</div>
