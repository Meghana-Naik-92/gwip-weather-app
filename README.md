# GWIP Weather Telemetry Portal 🌍⚡

Welcome to the official repository for **GWIP**, a modern, high-performance full-stack weather application designed to deliver real-time meteorological data with sleek neon aesthetics and secure user telemetry.

---

## 🌟 What is GWIP? (For Everyone)

**GWIP** is your personal window into global weather conditions. Whether you want to check if it's raining in Bengaluru, sunny in London, or hot in Tulsa, GWIP provides instant, exact weather updates right at your fingertips.

### Key Highlights:

* **Global Search:** Type any city or global coordinates to instantly stream current weather parameters.
* **Exact Precision:** Displays exact temperature decimal readings (e.g., $25.62^\circ\text{C}$ or $32.96^\circ\text{C}$) rather than rounded-off numbers.
* **Personalized Account Security:** Securely log in or register your own account to keep your private search history safe.
* **Interactive History Stream:** Easily view and re-click your recently searched cities from your personal database timeline.

---

## 🛠️ The Technology Stack (For Developers)

GWIP is built using a robust, enterprise-grade architecture separating a high-performance Java backend from a lightning-fast React frontend.

### Frontend:

* **React 19** & **Vite** for rapid component rendering and build optimization.
* **Tailwind CSS** for modern utility-first, glassmorphism UI design.
* **Axios** for handling secure HTTP REST requests.
* **FontAwesome** for dynamic weather indicator icons.

### Backend:

* **Java Spring Boot** (REST API architecture).
* **Spring Security & JWT (JSON Web Tokens)** for stateless user authentication and session management.
* **Spring Data JPA & Hibernate** for object-relational mapping.
* **PostgreSQL** relational database for persistent user accounts and search history tracking.

---

## ⚙️ Project Architecture & File Structure

```text
gwip/
│
├── frontend/                 # React + Vite Frontend Application
│   ├── src/
│   │   ├── components/       # UI Components (AuthCard, WeatherDashboard, HistoryStream, Navbar)
│   │   ├── services/         # API connection handlers (Axios config)
│   │   ├── App.jsx           # Main routing & state controller
│   │   └── index.css         # Tailwind styling
│   └── package.json
│
├── src/                      # Spring Boot Java Backend
│   ├── main/java/com/weather/gwip/
│   │   ├── controller/       # REST Endpoints (Auth, Weather, History)
│   │   ├── model/            # Database Entities (User, SearchHistory)
│   │   ├── repository/       # Data Access Interfaces
│   │   └── security/         # JWT Filters & Security Configuration
│   └── main/resources/       # Configuration files (application.properties)
│
└── pom.xml                   # Maven build configuration

```

---

## 🚀 Local Development Setup

To run this application locally on your machine, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/Meghana-Naik-92/gwip-weather-app.git
cd gwip

```

### 2. Set Up the Database

* Ensure you have **PostgreSQL** installed and running locally.
* Create a database named `gwip_db`:
```sql
CREATE DATABASE gwip_db;

```



### 3. Configure Backend Properties

Create an `application.properties` file inside `src/main/resources/` with your local credentials and OpenWeatherMap API key:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5433/gwip_db
spring.datasource.username=your_postgres_username
spring.datasource.password=your_postgres_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

weather.api.key=YOUR_OPENWEATHERMAP_API_KEY
jwt.secret=YOUR_SECURE_JWT_SECRET_KEY

```

### 4. Run the Spring Boot Backend

Using Maven from the root directory:

```bash
./mvnw spring-boot:run

```

*(The backend server will launch on `http://localhost:8080`)*

### 5. Run the React Frontend

Open a separate terminal window, navigate to the frontend folder, install dependencies, and start the development server:

```bash
cd frontend
npm install
npm run dev

```

*(The frontend application will launch on `http://localhost:5173`)*

---

## 🔒 License & Copyright

© 2026 Meghananaik. All rights reserved.
This software and its source code are proprietary and protected. No part of this application may be copied, reproduced, or distributed without explicit permission.
