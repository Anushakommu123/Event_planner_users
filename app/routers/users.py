"""
User web application routes - endpoints only
"""
from fastapi import APIRouter, HTTPException, status
from app.schemas.users_schemas import (
    UserSignupRequest,
    UserSignupResponse,
    UserLoginRequest,
    UserLoginResponse
)
from app.services.users_services import UserService

router = APIRouter(prefix="/users", tags=["users"])

# Initialize service
user_service = UserService()


@router.post("/signup", response_model=UserSignupResponse, status_code=status.HTTP_201_CREATED)
async def signup(user_data: UserSignupRequest):
    """
    User signup endpoint
    
    - **name**: User full name
    - **phone_number**: User phone number
    - **email**: User email address
    - **password**: User password
    - **confirm_password**: Confirm password
    """
    result = await user_service.signup(user_data)
    
    if not result.get("success"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result.get("message", "Signup failed")
        )
    
    return {
        "user_id": result["user_id"],
        "name": result["name"],
        "email": result["email"],
        "phone_number": result["phone_number"],
        "message": result["message"]
    }


@router.post("/login", response_model=UserLoginResponse)
async def login(login_data: UserLoginRequest):
    """
    User login endpoint
    
    - **email_or_phone**: User email or phone number
    - **password**: User password
    """
    result = await user_service.login(login_data)
    
    if not result.get("success"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=result.get("message", "Login failed")
        )
    
    return {
        "user_id": result["user_id"],
        "name": result["name"],
        "email": result["email"],
        "phone_number": result["phone_number"],
        "message": result["message"]
    }
