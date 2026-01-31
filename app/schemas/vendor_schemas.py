"""
Pydantic models for vendor signup and login
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class VendorSignupRequest(BaseModel):
    """
    Vendor signup request model
    """
    name: str = Field(..., min_length=1, max_length=100, description="Vendor full name")
    phone_number: str = Field(..., min_length=10, max_length=20, description="Vendor phone number")
    email: EmailStr = Field(..., description="Vendor email address")
    password: str = Field(..., min_length=6, description="Vendor password")
    confirm_password: str = Field(..., min_length=6, description="Confirm password")

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Jane Smith",
                "phone_number": "+1-234-567-8900",
                "email": "jane@vendor.com",
                "password": "password123",
                "confirm_password": "password123"
            }
        }


class VendorSignupResponse(BaseModel):
    """
    Vendor signup response model
    """
    vendor_id: str = Field(..., description="Unique vendor ID")
    name: str = Field(..., description="Vendor full name")
    email: str = Field(..., description="Vendor email address")
    phone_number: str = Field(..., description="Vendor phone number")
    message: str = Field(..., description="Response message")

    class Config:
        json_schema_extra = {
            "example": {
                "vendor_id": "507f1f77bcf86cd799439011",
                "name": "Jane Smith",
                "email": "jane@vendor.com",
                "phone_number": "+1-234-567-8900",
                "message": "Vendor registered successfully"
            }
        }


class VendorLoginRequest(BaseModel):
    """
    Vendor login request model
    """
    email_or_phone: str = Field(..., description="Vendor email or phone number")
    password: str = Field(..., min_length=6, description="Vendor password")

    class Config:
        json_schema_extra = {
            "example": {
                "email_or_phone": "jane@vendor.com",
                "password": "password123"
            }
        }


class VendorLoginResponse(BaseModel):
    """
    Vendor login response model
    """
    vendor_id: str = Field(..., description="Unique vendor ID")
    name: str = Field(..., description="Vendor full name")
    email: str = Field(..., description="Vendor email address")
    phone_number: str = Field(..., description="Vendor phone number")
    message: str = Field(..., description="Response message")

    class Config:
        json_schema_extra = {
            "example": {
                "vendor_id": "507f1f77bcf86cd799439011",
                "name": "Jane Smith",
                "email": "jane@vendor.com",
                "phone_number": "+1-234-567-8900",
                "message": "Login successful"
            }
        }
