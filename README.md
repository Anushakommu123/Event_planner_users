# Event_planner_users
# Event Planner API

A complete backend application for Event Planning with three main modules: Users, Vendors, and Admin.

## Project Structure

```
Event_Planner_New/
├── app/
│   ├── routers/          # API route handlers
│   │   ├── users.py      # User endpoints
│   │   ├── vendors.py    # Vendor endpoints
│   │   └── admin.py      # Admin endpoints
│   ├── services/         # Business logic
│   ├── schemas/          # Pydantic models
│   ├── utils/            # Utility functions
│   ├── config.py         # Configuration settings
│   ├── database.py       # Database connection
│   └── master_mongo.py   # MongoDB operations
├── main.py               # FastAPI app entry point
├── .env                  # Environment variables
├── .gitignore            # Git ignore rules
├── requirements.txt      # Python dependencies
└── README.md             # This file
```

## Features

- **FastAPI Framework**: Modern async web framework
- **MongoDB Integration**: Using Motor for async database operations
- **Three Main Modules**:
  - Users Web Application
  - Vendors Web Application
  - Admin Application
- **CORS Support**: Cross-origin resource sharing enabled
- **Environment Configuration**: Manage configs via .env file

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment variables:
- Edit `.env` file with your settings
- Ensure MongoDB is running

## Running the Application

```bash
python main.py
```

Or using Uvicorn directly:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

- **Docs**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/health
- **Users**: /api/v1/users
- **Vendors**: /api/v1/vendors
- **Admin**: /api/v1/admin

## Development

This project uses:
- Python 3.8+
- FastAPI 0.104+
- Motor (Async MongoDB)
- Pydantic for data validation

## License

MIT License
