"""
Admin application routes
"""
from fastapi import APIRouter

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/")
async def admin_dashboard():
    """Admin dashboard endpoint"""
    return {"message": "Admin dashboard endpoint"}


@router.get("/stats")
async def get_stats():
    """Get system statistics"""
    return {"message": "Get stats endpoint"}
