# SleuthDigits — Math Detective 

SleuthDigits is a **kid-friendly, detective-themed web application** that transforms math word problems into interactive crime-solving cases.
Learners act as “math detectives”, solving story-based problems using logic, calculations, and clues.

The project focuses on **learning through gameplay**, not rote practice.

---

## About the Use Case

Each math problem is presented as a **case file** with:

* A short detective story
* A scenario image
* A math word problem (speed & distance, ratios, probability, units, etc.)

Students:

* Enter answers (supports integers, decimals, fractions, and percentages)
* Request hints if stuck
* View step-by-step explanations
* Build streaks and track progress

Correct answers increase the streak and progress bar.
Wrong answers reset the streak, encouraging careful reasoning.

---

## Features

* Detective-style narrative math problems
* Image-driven problem scenarios
* Multiple problem types:

  * Speed & distance
  * Ratios
  * Probability
  * Unit conversions
* Flexible answer parsing:

  * Integers (`20`)
  * Decimals (`0.5`)
  * Fractions (`4/5`)
  * Percentages (`50%`)
* Tolerant numeric checking (handles rounding differences)
* Detective-themed hints (non-spoiler)
* Step-by-step explanations (“Detective’s Notes”)
* Streak counter for motivation
* Visual progress bar
* Responsive UI (mobile + desktop)
* Graceful handling of edge cases (empty input, wrong format, no history)

---

## Project Structure

```
SleuthDigits/
│
├── public/
│   └── vite.svg
│
├── src/
│   ├── assets/                  # UI images & illustrations
│   │  
│   │
│   ├── backend/                 # Node.js + Express backend
│   │   ├── images/              # Problem scenario images
│   │   ├── server.js
│   │   ├── package.json
│   │   └── package-lock.json
│   │
│   ├── components/              # React components
│   │   ├── Home.jsx
│   │   ├── ProblemsPage.jsx
│   │   ├── About.jsx
│   │   └── NavBar.jsx
│   │
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── vite.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

> The backend is colocated inside `src/backend/` to keep the project **self-contained and easy to evaluate** in a lab environment.

---

## Technologies Used

### Frontend

* **ReactJS (Vite)** – Component-based UI and routing
* **HTML5 & CSS3** – Layout and responsiveness
* **JavaScript (ES6)** – App logic and interaction
* **Chart.js / Recharts** *(extendable)* – Progress visualization

### Backend

* **Node.js + Express** – API and asset serving
* **CORS Middleware** – Secure frontend–backend communication

### Data Layer

* **Local JSON / JS objects** for problem data
* Each problem contains:

  * `id`
  * `image`
  * `question`
  * `answer`
  * `explanation`
  * `hint`

*(MongoDB can be added later for persistence if needed.)*

---

## How to Run Locally

### Clone the Repository

```bash
git clone https://github.com/saravanapriyaa21/SleuthDigits.git
cd SleuthDigits
```

---

### Install Frontend Dependencies

```bash
npm install
```

---

### Start the Frontend (Vite)

```bash
npm run dev
```

The app will run at:

```
http://localhost:5173
```

---

### 4️⃣ Start the Backend (in a new terminal)

```bash
cd src/backend
npm install
node server.js
```

Backend runs at:

```
http://localhost:3000
```

---

## 🧭 Application Pages

* **Home** – Introduction and instructions
* **Problems** – Sequential case solving
* **Problem/:id** – Individual case view
* **About** – Project description and motivation

---

## Functional Highlights

* Multi-page navigation using React Router
* API endpoints:

  * `GET /api/problems`
  * `GET /api/problems/:id`
* Image serving from backend (`/images/...`)
* Client-side tracking of solved problems
* Edge-case handling:

  * Empty input
  * Invalid formats
  * Wrong answers
* User-friendly feedback and error messages

---

## Notes

* Designed for **academic purpose and learning**
* No external paid services or APIs
* Easy to extend with database or analytics
* Clean code, clear structure, and documented logic
