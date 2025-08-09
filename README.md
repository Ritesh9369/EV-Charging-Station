<<<<<<< HEAD
# ⚡ EV Charging Station Website

A modern, responsive **EV Charging Station web application** built with **React.js (Vite)**, **Bootstrap**, and **Node.js + Express + MySQL**.  
It allows users to **search EV stations, book charging slots, view booking history, manage profiles, and make secure payments**.

---

## 🚀 Features

### 🔹 User Features
- **Home Page** – Introduction and features.
- **Search & Book** – Find nearest EV stations using location search + Leaflet.js map.
- **Booking System** – Select charging slot, confirm booking, and pay online.
- **Payment Integration** – Razorpay for secure transactions.
- **User Profile** – View/update personal info.
- **Booking History** – See past charging sessions.
- **Mobile Friendly** – Fully responsive UI.

### 🔹 Admin Features (Optional)
- Add/Edit/Delete EV stations.
- Manage bookings and payments.
- View analytics dashboard.

---

## 🛠 Tech Stack

### **Frontend**
- [React.js (Vite)](https://vitejs.dev/)
- [Bootstrap](https://getbootstrap.com/)
- [Leaflet.js](https://leafletjs.com/) – Maps
- [Axios](https://axios-http.com/) – API calls

### **Backend**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Razorpay](https://razorpay.com/) – Payments

---

## 📂 Folder Structure


---

## ⚙️ Installation & Setup

### **1️⃣ Clone Repository**
```bash
git clone https://github.com/your-username/ev-charging-station.git
cd ev-charging-station
2️⃣ Setup Frontend

cd frontend
npm install
npm run dev

3️⃣ Setup Backend

cd ../backend
npm install
node index.js

🗄 MySQL Database Setup
Create database:


CREATE DATABASE ev_charging_db;
Create users table:


CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  google_id VARCHAR(255) UNIQUE NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

📸 Screenshots
=======
# EV-Charging-Station
EV Charging Station web application built with React, Bootstrap, Node.js, Express, and MySQL, Leaflet.ja map.
>>>>>>> f0dc1d5519eca9d4f4a5b0e51496282be0817b86
