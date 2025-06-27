# 🔐 Password Reminder Service

A full-stack web application that helps users track when they need to change passwords for different accounts and notifies them when it's time. 

Built with:
- ⚙️ Spring Boot (Backend)
- 🌐 React (Frontend)
- 📬 Email Notification Support
- 🔐 JWT-based Authentication

---

## 🗂 Project Structure

```
password-reminder-service/
├── src/                     # Spring Boot backend source
├── frontend_clean_ui/       # React frontend source
├── pom.xml                  # Maven config
├── .gitignore
└── README.md                # ← You're here
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- Java 17+
- Maven
- Node.js + npm
- MySQL (or MariaDB)

---

### 🛠 Backend Setup (Spring Boot)

1. **Set up MySQL**:
   ```sql
   CREATE DATABASE passwordreminderdb;
   ```

2. **Update `application.properties`:**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/passwordreminderdb
   spring.datasource.username=yourUsername
   spring.datasource.password=yourPassword
   ```

3. **Run backend**:
   ```bash
   cd password-reminder-service
   ./mvnw spring-boot:run
   ```

   > Server will start at: `http://localhost:8080`

---

### 💻 Frontend Setup (React)

1. Navigate to the frontend folder:
   ```bash
   cd frontend_clean_ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the React app:
   ```bash
   npm run dev
   ```

   > App will be live at: `http://localhost:5173`

---

## ✨ Features

- Register/Login with email & password
- Add/Edit/Delete reminders for password change
- Email alerts one day before password is due
- JWT-based secured API
- Upcoming reminders view
- Mark reminders as changed
- Fully responsive UI

---

## 🔒 Tech Stack

| Layer      | Technology             |
|------------|------------------------|
| Frontend   | React, Axios, Vite     |
| Backend    | Spring Boot, Spring Security |
| Database   | MySQL         |
| Auth       | JWT                    |
| Email      | Spring Mail (SMTP)     |

---


## 📬 Author

Made with ❤️ by [Raman Thatte](https://www.linkedin.com/in/raman-thatte-10071522b/)
