"""
Main FastAPI application entry point
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import PROJECT_NAME, PROJECT_VERSION, API_V1_PREFIX, DEBUG
from app.database import connect_db, close_db
from app.routers import users, admin, user_events, vendor_users, vendor_services


# Lifespan context manager for startup and shutdown events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    try:
        await connect_db()
        print("✓ Application startup complete")
    except Exception as e:
        print(f"✗ Startup error: {e}")
        raise
    
    yield
    
    # Shutdown
    try:
        await close_db()
        print("✓ Application shutdown complete")
    except Exception as e:
        print(f"✗ Shutdown error: {e}")


# Create FastAPI app with lifespan
app = FastAPI(
    title=PROJECT_NAME,
    version=PROJECT_VERSION,
    debug=DEBUG,
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(users.router, prefix=API_V1_PREFIX)
app.include_router(vendor_users.router, prefix=API_V1_PREFIX)
app.include_router(admin.router, prefix=API_V1_PREFIX)
app.include_router(user_events.router, prefix=API_V1_PREFIX)
app.include_router(vendor_services.router, prefix=API_V1_PREFIX)


# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "service": PROJECT_NAME,
        "version": PROJECT_VERSION
    }


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "service": PROJECT_NAME,
        "version": PROJECT_VERSION,
        "docs": "/docs",
        "endpoints": {
            "users": f"{API_V1_PREFIX}/users",
            "vendors": f"{API_V1_PREFIX}/vendors",
            "admin": f"{API_V1_PREFIX}/admin"
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=DEBUG
    )
