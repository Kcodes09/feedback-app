# 🗣️ Feedback App

A minimal feedback collection app built using **Express.js (Node.js)** for the backend and **Next.js** for the frontend. It allows users to submit feedback, which is displayed instantly in the UI.

---

## ✨ Features

- Submit feedback with name and message
- View all feedbacks in reverse chronological order
- Responsive UI (works on desktop and mobile)
- Simple JSON file-based backend (for local/dev use)

---

## 🚀 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express
- **Storage**: JSON file (non-persistent — use a database for production)

---

## 📁 Project Structure

```
feedback-app/
│
├── server/           # Express server (Node.js)
│   └── feedbacks.json # Stores feedback data (non-persistent)
│
├── client/            # Next.js frontend
│   ├── pages/
│   └── public/
│       └── favicon.ico
│
└── README.md
```

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Kcodes09/feedback-app.git
cd feedback-app
```

### 2. Start Backend

```bash
cd backend
npm install
node index.js
```

The backend will run on: `http://localhost:5000`

### 3. Start Frontend

```bash
cd client
npm install
npm run dev
```

The frontend will run on: `http://localhost:3000`

---

## ⚠️ Note on Persistence

This app stores feedback in a local `feedbacks.json` file. When deployed on  **Render** , this file may be erased after inactivity or redeploys.

---

## 🤝 Contributing

Contributions, suggestions, and issues are welcome! Please open a pull request or issue if you have feedback.
