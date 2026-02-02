"""
Vendor web application routes
"""
from fastapi import APIRouter

router = APIRouter(prefix="/vendors", tags=["vendors"])


@router.get("/")
async def get_vendors():
    """Get all vendors"""
    return {"message": "Get vendors endpoint"}


@router.post("/")
async def create_vendor():
    """Create new vendor"""
    return {"message": "Create vendor endpoint"}
