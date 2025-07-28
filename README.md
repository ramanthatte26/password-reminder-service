# 🔑 Password Reminder Service

## 📌 Idea Behind the Project

The **Password Reminder Service** was created with the idea of helping users stay secure by **reminding them to change their passwords regularly**.  
Many people forget to update their passwords, which leaves them vulnerable. This service automates reminders and makes it easier for users to keep their credentials fresh and secure.

---

## 🎯 What I Thought and What I Did

### 💡 What I Thought
- I wanted to create a system that automatically sends **reminder emails** to users to change their passwords after a set interval.
- Users should be able to confirm that they have changed their passwords easily.
- The system should be simple to deploy and user-friendly.

### 🛠️ What I Did
- Developed a **full-stack web application** with a MySQL database backend.
- Implemented **automated email reminders** using Spring Boot's mail service.
- Created a **"Mark as Changed"** feature so users can confirm when they have updated their passwords.
- Designed the system to update the database and recalculate the next reminder date once a user confirms.

---

## ⚡ Tech Stack

- **Backend:** Spring Boot (Java)
- **Frontend:** HTML, CSS, JavaScript (Thymeleaf or React if applicable)
- **Database:** MySQL (Hosted on FreeSQLDatabase.com)
- **Email Service:** Spring Mail (SMTP)
- **Deployment:** Render (Frontend + Backend), FreeSQLDatabase.com (Database)

---

## 📝 Features

- Automated password reminder emails.
- Secure database for storing user credentials and reminder schedules.
- One-click confirmation ("Mark as Changed") to reset the reminder cycle.
- Timezone-aware scheduling (Asia/Kolkata).
- Easy to set up and deploy.

---

## 🚀 Running the Project Locally

### 1️⃣ Prerequisites
- Install **Java 17+**
- Install **Maven**
- Install **MySQL** locally or have access to a remote MySQL database
- Install **Git**

### 2️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/password-reminder-service.git
cd password-reminder-service
```

### 3️⃣ Configure the Database
Update the `src/main/resources/application.properties` file with your local database details:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/passwordreminder
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update
```

### 4️⃣ Build and Run the Application
```bash
mvn clean install
mvn spring-boot:run
```

### 5️⃣ Access the Application
- Open your browser and go to: **http://localhost:8080**
- Use the UI to add users and test the reminder service.

---

## 🌍 Live Demo

You can view the live deployed version here:  
👉 **[Live Project Link](https://password-reminder-service-1.onrender.com)**

---

## 📧 Future Improvements
- Replace manual "Mark as Changed" with a one-click confirmation directly from email.
- Add AI-powered password suggestions based on user preferences.
- Add analytics and improved UI for better user experience.
