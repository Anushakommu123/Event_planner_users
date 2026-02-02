# Klyra Planners - Event Planning Platform

This project is a complete Event Planning platform consisting of a React-based frontend and a Python-based backend.

## 🚀 Frontend (React + Vite)

The frontend is built with React and Vite, providing a modern and responsive user interface for Customers, Vendors, and Admins.

### Features
- Modern UI with Klyra Planners branding
- Dedicated dashboards for Customers, Vendors, and Admins
- Seamless event creation and service browsing

### Setup
```bash
npm install
npm run dev
```

---

## ⚙️ Backend (Python - FastAPI)

The backend provides API endpoints for Users, Vendors, and Admin modules.

### Features
- **FastAPI Framework**: Modern async web framework
- **MongoDB Integration**: Using Motor for async database operations
- **Three Main Modules**: Users, Vendors, and Admin.

### Setup
1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the application:
```bash
python main.py
```

### API Endpoints
- **Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health

---

## License
MIT License
