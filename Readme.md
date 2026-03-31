<div align="center">
  <h1>🚀 CodeofDuty: Parametric Income Protection for Q-Commerce Workers</h1>
  <p><b>Guidewire DEVTrails 2026: Unicorn Chase — Phase 2 Final Submission</b></p>

  ![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
  ![Azure](https://img.shields.io/badge/Azure-Cloud_Platform-0089D6?logo=microsoft-azure)
  ![Java 17](https://img.shields.io/badge/Java-17-ED8B00?logo=openjdk)
  ![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?logo=spring)
  ![React + Vite](https://img.shields.io/badge/React_Vite-18.x-61DAFB?logo=react)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css)
  ![Python](https://img.shields.io/badge/Python-ML_Engine-3776AB?logo=python)
</div>

---

## 🌟 Executive Summary

In the hyper-competitive world of quick commerce (10-minute deliveries), gig economy workers are the backbone. Yet, when severe weather strikes, political unrest halts traffic, or massive gridlocks occur, these riders face **immediate, uncontrollable income loss**—often dropping by 20-30% on disrupted days. 

**CodeofDuty** introduces an enterprise-grade, fully automated parametric insurance platform designed explicitly to protect the earnings of Q-Commerce Delivery Partners. By leveraging real-time environmental and social data triggers, we eliminate the traditional claims process entirely. When a disruption breaches a predefined threshold, the payout is triggered automatically.

> **CRITICAL COVERAGE SCOPE**:  
> ⚠️ **We cover LOSS OF INCOME ONLY** caused by external disruptions.  
> ⛔️ We strictly **EXCLUDE** coverage for health, life, personal accidents, or vehicle repair and maintenance.

---

## 🎯 The Target Persona

Meet **Rahul**, a 24-year-old delivery partner for a leading Q-Commerce platform (e.g., Zepto, Blinkit).  
Rahul relies on completing 20-30 orders a day to support his family. When a sudden monsoon floods the city streets or a localized strike imposes roadblocks, Rahul is forced to stop working. He doesn't just lose time; he loses wages. He cannot afford complex deductibles, nor does he have the time to file lengthy loss-of-income claims. He needs financial resilience that works as fast as he does.

---

## 🚀 Phase 2 Highlights: What We Built

For Phase 2, CodeofDuty transitioned from a conceptual architecture to a **fully functional, live-simulated InsurTech ecosystem**.

- 🌗 **Split-Screen Reality UI:** A high-fidelity, dual-view interface. On the left, the "Admin Simulator" injects live environmental data. On the right, the exact mobile app interface (RiderShield) that the delivery partner sees in their pocket, updating in real-time.
- 🌪️ **Multi-Variate Trigger Hub:** Expanded beyond just weather. The engine now actively simulates and processes parameters for **Heavy Rainfall (>30mm)**, **Extreme Heat (>42°C)**, **AQI Hazards (>300)**, and **Traffic Gridlock (<5km/h)** mapped to the Vadodara city zone.
- 🛡️ **GPS Fraud Guardian:** Implemented active telemetry validation. If a claim is triggered but the rider's phone pings outside the verified "Impact Zone," the system instantly blocks the payout, proving enterprise-grade security.
- 📊 **Actuarial Risk Pool Visualizer:** A live financial dashboard that dynamically deducts payouts from the global risk pool and recalculates the following week's premium to ensure business sustainability.
- 🌌 **Future Tech Aesthetic:** Rebuilt the entire frontend using a stunning "Neurolink" live-wallpaper aesthetic, featuring glassmorphism layering, glowing holographic radar rings, and dynamic data-node tracking.

---

## 🔥 Core Capabilities

| Capability | Description |
|---|---|
| 💸 **Dynamic Weekly Pricing** | The financial model and premium calculation are structured **strictly on a Weekly basis**, adapting dynamically to predicted local disruption risks using AI and predictive modeling. |
| ⚡ **Zero-Touch Claims** | No forms, no adjusters, no delays. Payouts are entirely trigger-based (parametric). If the data verifies the event, the payout is processed instantly. |
| 🛡️ **Intelligent Fraud Detection** | Integrates GPS validation to ensure the worker was actively situated in the disrupted zone during the event, mitigating risk and preserving capital. |

---

## ⚙️ Parametric Trigger Workflow

Our architecture guarantees a seamless flow from event detection to simulated instant payout without manual intervention.

1. **Environmental/Social Event Occurs**: Severe waterlogging or a major protest disrupts specific city zones (e.g., Vadodara).
2. **Real-Time Polling**: An **Azure Function** continuously polls the **OpenWeatherMap API** (environmental triggers) and **TomTom Traffic API / Groq NLP** (social disruption models).
3. **Threshold Breach Evaluation**: The system detects that the disruption index exceeds the parametric contract limits for the affected geofence.
4. **Trigger Generation**: The Azure Function signals the core **Spring Boot Backend** via real-time webhooks.
5. **Worker Validation & Disbursement**: The backend verifies the rider's GPS ping and initiates an automated, simulated instant payout via **Razorpay Test Mode**.

---

## 🏗️ System Architecture & Tech Stack

Our platform is engineered for high availability, low latency, and infinite scalability, leveraging a modern cloud-native stack.

### 🌐 Frontend & Mobile Access
- **React.js & Vite**: Provides lightning-fast HMR and an optimized build process for our frontend dashboard.
- **Tailwind CSS**: Powers the responsive Insurtech UI, utilizing advanced glassmorphism and animated backgrounds.
- **React Native (Simulated via Mobile Web Container)**: Delivers a lightweight, performant Mobile Worker App (`RiderShield`) for our delivery partners.

### 🧠 Backend Core
- **Java 17 & Spring Boot**: The robust, enterprise-ready engine driving our core business logic, threshold evaluation, and transaction management.
- **Maven**: Handles dependency management and build automation.
- **Spring Security**: Secures all REST APIs with JWT-based authentication.
- **Hibernate ORM**: Manages seamless, structured interactions with our relational data layer.

### ☁️ Cloud Infrastructure (Microsoft Azure)
- **Azure App Service**: Highly scalable hosting for our Spring Boot backend and React dashboards.
- **Azure Functions**: Serverless event-driven architecture polling real-time APIs for parametric triggers constraint-free.
- **Azure SQL**: A secure, fully managed relational database storing policies, worker profiles, and trigger logs.

### 🤖 AI / ML Engine & Third-Party APIs
- **Python & Scikit-Learn**: Drives our Predictive Dynamic Weekly Pricing models.
- **Groq API / NLP**: Powers real-time social disruption analysis.
- **OpenWeatherMap & TomTom APIs**: Provides granular, real-time climate and traffic telemetry.

---

## ✅ Deliverables Roadmap

- [x] **Phase 1:** Idea Document Completed (Financial model & risk assessment).
- [x] **Phase 1:** Workflow Architecture Defined.
- [x] **Phase 2:** Live Spring Boot REST API deployed and routing claims.
- [x] **Phase 2:** Multi-Variate Parametric Service established.
- [x] **Phase 2:** Fraud Guardian (GPS Telemetry) logic implemented.
- [x] **Phase 2:** High-fidelity, split-screen React frontend built and deployed to Vercel.

---

## 🛠️ Local Setup Instructions

Get the **CodeofDuty** platform running on your local machine in minutes.

### Prerequisites
- Java 17 (JDK)
- Maven (v3.8+)
- Node.js (v18+) & npm
- Python 3.10+
- Microsoft Azure CLI

### 1️⃣ Clone the Repository
```bash
git clone [https://github.com/yourusername/codeofduty-v2.git](https://github.com/yourusername/codeofduty-v2.git)
cd codeofduty-v2

### 2️⃣ Run the Insurtech Admin Dashboard (Frontend)
```bash
cd frontend-dashboard
npm install
npm run dev
```
*The dashboard will be available at `http://localhost:3000`.*

### 3️⃣ Run the Core API Engine (Backend)
```bash
cd backend-core
mvn clean install
mvn spring-boot:run
```
*The Spring Boot server will start on `http://localhost:8080`.*

### 4️⃣ Start the AI/ML Prediction Service
```bash
cd ai-pricing-model
pip install -r requirements.txt
python main.py
```

---
<div align="center">
  <i>Built with determination by Team <b>CodeofDuty</b> for Guidewire DEVTrails 2026.</i><br>
  <i>Protecting the gig economy, one delivery at a time. 🦄</i>
</div>
