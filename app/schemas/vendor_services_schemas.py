"""
Pydantic models for vendor service management
"""
from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


class DayOfWeek(str, Enum):
    MONDAY = "Monday"
    TUESDAY = "Tuesday"
    WEDNESDAY = "Wednesday"
    THURSDAY = "Thursday"
    FRIDAY = "Friday"
    SATURDAY = "Saturday"
    SUNDAY = "Sunday"


class PackageOption(BaseModel):
    """
    Package option model (nested inside service)
    """
    package_name: str = Field(..., min_length=1, max_length=200, description="Name of the package")
    package_description: str = Field(..., min_length=1, max_length=1000, description="Description of the package")
    package_price: float = Field(..., gt=0, description="Price of the package")
    availability_settings: list[DayOfWeek] = Field(..., min_length=1, description="Available days (Monday to Sunday)")
    additional_notes: Optional[str] = Field(None, max_length=1000, description="Additional notes for the package")

    class Config:
        json_schema_extra = {
            "example": {
                "package_name": "Gold Package",
                "package_description": "Full event decoration with premium flowers",
                "package_price": 5000.00,
                "availability_settings": ["Monday", "Wednesday", "Friday", "Saturday", "Sunday"],
                "additional_notes": "Includes setup and cleanup"
            }
        }


class CreateVendorServiceRequest(BaseModel):
    """
    Request model for creating a new vendor service
    """
    vendor_id: str = Field(..., description="ID of the vendor creating the service")
    service_name: str = Field(..., min_length=1, max_length=200, description="Name of the service")
    description: str = Field(..., min_length=1, max_length=2000, description="Service description")
    category: str = Field(..., min_length=1, max_length=100, description="Service category")
    base_price: float = Field(..., gt=0, description="Base price of the service")
    image_url: str = Field(..., min_length=1, description="Image URL for the service")
    package_options: list[PackageOption] = Field(..., min_length=1, description="List of package options")

    class Config:
        json_schema_extra = {
            "example": {
                "vendor_id": "507f1f77bcf86cd799439011",
                "service_name": "Birthday Party Decoration",
                "description": "Complete birthday party decoration with balloons, banners and theme setup",
                "category": "Birthday",
                "base_price": 2000.00,
                "image_url": "https://example.com/images/birthday-decor.jpg",
                "package_options": [
                    {
                        "package_name": "Silver Package",
                        "package_description": "Basic decoration with balloons and banners",
                        "package_price": 2000.00,
                        "availability_settings": ["Saturday", "Sunday"],
                        "additional_notes": "Setup 2 hours before event"
                    },
                    {
                        "package_name": "Gold Package",
                        "package_description": "Premium decoration with theme setup",
                        "package_price": 5000.00,
                        "availability_settings": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                        "additional_notes": "Includes photographer for 1 hour"
                    }
                ]
            }
        }


class PackageOptionOut(BaseModel):
    """
    Package option output model
    """
    package_name: str
    package_description: str
    package_price: float
    availability_settings: list[str]
    additional_notes: Optional[str] = None


class VendorServiceDetail(BaseModel):
    """
    Model for a single vendor service
    """
    service_id: str = Field(..., description="Unique service ID")
    vendor_id: str = Field(..., description="Vendor ID")
    service_name: str = Field(..., description="Name of the service")
    description: str = Field(..., description="Service description")
    category: str = Field(..., description="Service category")
    base_price: float = Field(..., description="Base price")
    image_url: str = Field(..., description="Image URL")
    package_options: list[PackageOptionOut] = Field(..., description="Package options")
    created_at: str = Field(..., description="Creation timestamp")
    updated_at: str = Field(..., description="Last updated timestamp")


class CreateVendorServiceResponse(BaseModel):
    """
    Response model for service creation
    """
    service_id: str = Field(..., description="Unique service ID")
    service_name: str = Field(..., description="Name of the service")
    message: str = Field(..., description="Response message")


class GetVendorServicesResponse(BaseModel):
    """
    Response model for getting vendor services
    """
    vendor_id: str = Field(..., description="Vendor ID")
    services: list[VendorServiceDetail] = Field(..., description="List of vendor services")
    total_services: int = Field(..., description="Total number of services")
    message: str = Field(..., description="Response message")


class EditPackageOption(BaseModel):
    """
    Package option model for editing (used inside edit request)
    """
    package_name: str = Field(..., min_length=1, max_length=200, description="Name of the package")
    package_description: str = Field(..., min_length=1, max_length=1000, description="Description of the package")
    package_price: float = Field(..., gt=0, description="Price of the package")
    availability_settings: list[DayOfWeek] = Field(..., min_length=1, description="Available days (Monday to Sunday)")
    additional_notes: Optional[str] = Field(None, max_length=1000, description="Additional notes for the package")


class EditVendorServiceRequest(BaseModel):
    """
    Request model for editing a vendor service (all fields optional)
    """
    service_name: Optional[str] = Field(None, min_length=1, max_length=200, description="Name of the service")
    description: Optional[str] = Field(None, min_length=1, max_length=2000, description="Service description")
    category: Optional[str] = Field(None, min_length=1, max_length=100, description="Service category")
    base_price: Optional[float] = Field(None, gt=0, description="Base price of the service")
    image_url: Optional[str] = Field(None, min_length=1, description="Image URL for the service")
    package_options: Optional[list[EditPackageOption]] = Field(None, min_length=1, description="List of package options")

    class Config:
        json_schema_extra = {
            "example": {
                "service_name": "Updated Birthday Party Decoration",
                "base_price": 2500.00
            }
        }


class EditVendorServiceResponse(BaseModel):
    """
    Response model for editing a vendor service
    """
    service_id: str = Field(..., description="Unique service ID")
    service_name: str = Field(..., description="Name of the service")
    message: str = Field(..., description="Response message")


class DeleteVendorServiceResponse(BaseModel):
    """
    Response model for deleting a vendor service
    """
    service_id: str = Field(..., description="Deleted service ID")
    message: str = Field(..., description="Response message")
