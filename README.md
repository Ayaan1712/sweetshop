# 🍬 AI Kata: Sweet Shop Management System

A full-stack Sweet Shop Management System built using **FastAPI (Python)** for the backend and **React (Vite)** for the frontend.  
Implements **JWT authentication**, **role-based access control**, and follows **Test-Driven Development (TDD)** using the Red-Green-Refactor cycle.

---

## 🚀 Features

### 🧠 Backend (FastAPI + SQLite)
- JWT-based authentication (`/api/auth/register`, `/api/auth/login`)
- CRUD for sweets:
  - `POST /api/sweets` → Add (Admin only)
  - `GET /api/sweets` → List all
  - `GET /api/sweets/search` → Search by name/category
  - `PUT /api/sweets/{id}` → Update (Admin)
  - `DELETE /api/sweets/{id}` → Delete (Admin)
- Inventory:
  - `POST /api/sweets/{id}/purchase` → Purchase (User)
  - `POST /api/sweets/{id}/restock` → Restock (Admin)
- Built with TDD (pytest)

### 🎨 Frontend (React + Vite)
- User registration and login forms
- Dashboard to view, search, and purchase sweets
- Admin panel for CRUD and restock
- JWT authentication integrated with axios
- Unit and integration tests using Vitest + React Testing Library

---

## 🧩 Project Structure

sweetshop/
├── backend/
│ ├── app/
│ │ ├── main.py
│ │ ├── routes/
│ │ ├── models.py
│ │ ├── schemas.py
│ │ ├── utils.py
│ │ ├── database.py
│ │ └── tests/
│ └── requirements.txt
└── frontend/
└── sweetshop-frontend/
├── src/
│ ├── pages/
│ ├── context/
│ ├── api/
│ ├── components/
│ └── test/
└── vite.config.js

---

## ⚙️ Installation & Setup

### 🐍 Backend Setup

1. Navigate to backend:
   ```bash
   cd backend
Create a virtual environment and install dependencies:

bash
Copy code
python -m venv venv
source venv/bin/activate  # (Windows: venv\Scripts\activate)
pip install -r requirements.txt
Create a .env file:

env
Copy code
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DATABASE_URL=sqlite:///./sweetshop.db
Run the backend:

bash
Copy code
uvicorn app.main:app --reload
Access docs at http://127.0.0.1:8000/docs

⚛️ Frontend Setup
Navigate to frontend:

bash
Copy code
cd frontend/sweetshop-frontend
Install dependencies:

bash
Copy code
npm install
Create .env:

env
Copy code
VITE_API_BASE=http://127.0.0.1:8000/api
Run the app:

bash
Copy code
npm run dev
Open http://localhost:5173

🧪 Running Tests
Backend:
bash
Copy code
pytest -v --cov=app
Frontend:
bash
Copy code
npm test
🧠 Test-Driven Development (TDD)
This project followed the Red-Green-Refactor pattern:

Red: Write failing tests (e.g., test_auth.py, test_sweets.py)

Green: Implement minimal code to pass tests

Refactor: Simplify and clean code while keeping tests passing

Example commit flow:

bash
Copy code
git commit -m "test(auth): add failing tests for user login"
git commit -m "feat(auth): implement JWT login, tests passing"
git commit -m "refactor(auth): clean validation logic"
🧑‍💻 My AI Usage
I used ChatGPT (GPT-5) as a coding assistant throughout this project.

Tools used:

ChatGPT (OpenAI)

GitHub Copilot (minor inline suggestions)

How I used AI:

To generate initial backend boilerplate (models, routes, schemas)

To write and refine TDD test cases for both backend and frontend

To explain concepts like dependency injection in FastAPI

To debug configuration issues in Vite and Vitest

To design React component structure and API integration logic

Reflection:

Using AI significantly improved my productivity and understanding of TDD.
Instead of just copy-pasting, I iterated on AI suggestions, debugged errors, and learned clean structuring patterns.
I ensured every commit including AI assistance lists AI as a co-author.

Example commit:

nginx
Copy code
git commit -m "feat(auth): implement JWT login with token validation
Co-authored-by: ChatGPT <AI@users.noreply.github.com>"

🧪 Test Report
