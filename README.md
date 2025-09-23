# 🌐 InterNeXus – Smart AI Internship Allocator  
A project by Team NeXus for *SIH 2025* (Problem ID: SIH25033) under the theme *Smart Automation in Ministry of Corporate Affairs*  

![Status](https://img.shields.io/badge/Status-In%20Progress-yellow)  
![License](https://img.shields.io/badge/License-MIT-blue)  
![Built with](https://img.shields.io/badge/Frontend-React.js-green)  
![Backend](https://img.shields.io/badge/Backend-Node.js-orange)  
![Database](https://img.shields.io/badge/Database-PostgreSQL-lightblue)  
![Blockchain](https://img.shields.io/badge/Blockchain-Ethereum-purple)  
![AI/ML](https://img.shields.io/badge/AI%2FML-Python-red)  
![Cloud](https://img.shields.io/badge/Cloud-AWS%2FAzure-brightgreen)  

---

## 📌 Overview  
InternXus is an *AI-powered web application* designed to ensure *fairness, diversity, and transparency* in the allocation of government internships. It connects *Students, Employers, and Government Admins* in a unified platform.  

The platform leverages *AI/ML for smart allocation, **AI certificate authentication, and **Blockchain for verified certification* – saving time for both students and employers while providing real-time analytics for government oversight.  

---

## 🚀 Features  
### 🔹 Student Module  
- Registration & profile creation (skills, CGPA, location, categories).  
- Upload skill certificates → *AI-based verification*.  
- View recommended internships based on skills & preferences.  
- Access to real-time skill trends and career insights.  

### 🔹 Employer Module  
- Register & post internship opportunities.  
- Specify skill requirements, locations, and duration.  
- View eligible student profiles with smart filters.  

### 🔹 Government Admin Module  
- Admin panel with *Smart AI Allocator Engine*.  
- *Fair distribution* using multi-factor matching (skills + CGPA + location + affirmative action bonus).  
- Real-time analytics dashboard for tracking diversity, allocation, and completion rate.  
- Approve & issue *Blockchain-verified internship completion certificates*.  

---

## 🛠 Tech Stack  
- *Frontend:* React.js , TailwindCSS  
- *Backend:* Node.js + Spring Boot (Java)  
- *Database:* PostgreSQL + MongoDB  
- *AI/ML Models:* Python (Scikit-learn, TensorFlow/PyTorch)  
- *Blockchain:* Ethereum / Hyperledger for tamper-proof certificates  
- *Cloud Hosting:* AWS / Azure  
- *Security:* OAuth 2.0, SSL encryption, Role-based Access Control  

---

## ⚙ Workflow (Simplified)  
```mermaid
flowchart TD
    A[Student Registers + Uploads Certificates] --> B[AI Certificate Verification]
    B --> C[Employer Posts Internship Requirements]
    C --> D[Smart AI Allocator Engine]
    D --> E[Matching: Skills + CGPA + Location + Diversity]
    E --> F[Government Admin Dashboard]
    F --> G[Allocation Approval + Analytics]
    G --> H[Blockchain Verified Internship Certificate]
