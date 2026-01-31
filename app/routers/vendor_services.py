"""
Vendor service routes - CRUD endpoints for vendor services
"""
from fastapi import APIRouter, HTTPException, status
from app.schemas.vendor_services_schemas import (
    CreateVendorServiceRequest,
    CreateVendorServiceResponse,
    GetVendorServicesResponse,
    EditVendorServiceRequest,
    EditVendorServiceResponse,
    DeleteVendorServiceResponse
)
from app.services.vendor_services_services import VendorServiceManager

router = APIRouter(prefix="/vendor-services", tags=["vendor-services"])

# Initialize service
vendor_service_manager = VendorServiceManager()


@router.post("/create", response_model=CreateVendorServiceResponse, status_code=status.HTTP_201_CREATED)
async def create_service(service_data: CreateVendorServiceRequest):
    """
    Create a new vendor service

    - **vendor_id**: ID of the vendor
    - **service_name**: Name of the service
    - **description**: Service description
    - **category**: Service category
    - **base_price**: Base price
    - **image_url**: Image URL
    - **package_options**: List of package options with availability settings
    """
    result = await vendor_service_manager.create_service(service_data)

    if not result.get("success"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result.get("message", "Service creation failed")
        )

    return {
        "service_id": result["service_id"],
        "service_name": result["service_name"],
        "message": result["message"]
    }


@router.get("/get-services/{vendor_id}", response_model=GetVendorServicesResponse)
async def get_vendor_services(vendor_id: str):
    """
    Get all services created by a vendor

    - **vendor_id**: ID of the vendor (path parameter)
    """
    result = await vendor_service_manager.get_services_by_vendor(vendor_id)

    if not result.get("success"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result.get("message", "Failed to retrieve services")
        )

    return {
        "vendor_id": result["vendor_id"],
        "services": result["services"],
        "total_services": result["total_services"],
        "message": result["message"]
    }


@router.put("/edit-service/{service_id}", response_model=EditVendorServiceResponse)
async def edit_service(service_id: str, vendor_id: str, service_data: EditVendorServiceRequest):
    """
    Edit an existing vendor service

    - **service_id**: ID of the service to edit (path parameter)
    - **vendor_id**: ID of the vendor who owns the service (query parameter)
    - Only send the fields you want to update
    """
    result = await vendor_service_manager.edit_service(service_id, vendor_id, service_data)

    if not result.get("success"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result.get("message", "Service update failed")
        )

    return {
        "service_id": result["service_id"],
        "service_name": result["service_name"],
        "message": result["message"]
    }


@router.delete("/delete-service/{service_id}", response_model=DeleteVendorServiceResponse)
async def delete_service(service_id: str, vendor_id: str):
    """
    Delete a vendor service

    - **service_id**: ID of the service to delete (path parameter)
    - **vendor_id**: ID of the vendor who owns the service (query parameter)
    """
    result = await vendor_service_manager.delete_service(service_id, vendor_id)

    if not result.get("success"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result.get("message", "Service deletion failed")
        )

    return {
        "service_id": result["service_id"],
        "message": result["message"]
    }
