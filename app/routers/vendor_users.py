"""
Vendor web application routes - endpoints only
"""
from fastapi import APIRouter, HTTPException, status
from app.schemas.vendor_schemas import (
    VendorSignupRequest,
    VendorSignupResponse,
    VendorLoginRequest,
    VendorLoginResponse
)
from app.services.vendor_users_services import VendorService

router = APIRouter(prefix="/vendors", tags=["vendors"])

# Initialize service
vendor_service = VendorService()


@router.post("/signup", response_model=VendorSignupResponse, status_code=status.HTTP_201_CREATED)
async def signup(vendor_data: VendorSignupRequest):
    """
    Vendor signup endpoint

    - **name**: Vendor full name
    - **phone_number**: Vendor phone number
    - **email**: Vendor email address
    - **password**: Vendor password
    - **confirm_password**: Confirm password
    """
    result = await vendor_service.signup(vendor_data)

    if not result.get("success"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result.get("message", "Signup failed")
        )

    return {
        "vendor_id": result["vendor_id"],
        "name": result["name"],
        "email": result["email"],
        "phone_number": result["phone_number"],
        "message": result["message"]
    }


@router.post("/login", response_model=VendorLoginResponse)
async def login(login_data: VendorLoginRequest):
    """
    Vendor login endpoint

    - **email_or_phone**: Vendor email or phone number
    - **password**: Vendor password
    """
    result = await vendor_service.login(login_data)

    if not result.get("success"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=result.get("message", "Login failed")
        )

    return {
        "vendor_id": result["vendor_id"],
        "name": result["name"],
        "email": result["email"],
        "phone_number": result["phone_number"],
        "message": result["message"]
    }
