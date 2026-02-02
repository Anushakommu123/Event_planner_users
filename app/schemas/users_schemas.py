"""
Pydantic models for user signup and login
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class UserSignupRequest(BaseModel):
    """
    User signup request model
    """
    name: str = Field(..., min_length=1, max_length=100, description="User full name")
    phone_number: str = Field(..., min_length=10, max_length=20, description="User phone number")
    email: EmailStr = Field(..., description="User email address")
    password: str = Field(..., min_length=6, description="User password")
    confirm_password: str = Field(..., min_length=6, description="Confirm password")
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "phone_number": "+1-234-567-8900",
                "email": "john@example.com",
                "password": "password123",
                "confirm_password": "password123"
            }
        }


class UserSignupResponse(BaseModel):
    """
    User signup response model
    """
    user_id: str = Field(..., description="Unique user ID")
    name: str = Field(..., description="User full name")
    email: str = Field(..., description="User email address")
    phone_number: str = Field(..., description="User phone number")
    message: str = Field(..., description="Response message")
    
    class Config:
        json_schema_extra = {
            "example": {
                "user_id": "507f1f77bcf86cd799439011",
                "name": "John Doe",
                "email": "john@example.com",
                "phone_number": "+1-234-567-8900",
                "message": "User registered successfully"
            }
        }


class UserLoginRequest(BaseModel):
    """
    User login request model
    """
    email_or_phone: str = Field(..., description="User email or phone number")
    password: str = Field(..., min_length=6, description="User password")
    
    class Config:
        json_schema_extra = {
            "example": {
                "email_or_phone": "john@example.com",
                "password": "password123"
            }
        }


class UserLoginResponse(BaseModel):
    """
    User login response model
    """
    user_id: str = Field(..., description="Unique user ID")
    name: str = Field(..., description="User full name")
    email: str = Field(..., description="User email address")
    phone_number: str = Field(..., description="User phone number")
    message: str = Field(..., description="Response message")
    
    class Config:
        json_schema_extra = {
            "example": {
                "user_id": "507f1f77bcf86cd799439011",
                "name": "John Doe",
                "email": "john@example.com",
                "phone_number": "+1-234-567-8900",
                "message": "Login successful"
            }
        }
