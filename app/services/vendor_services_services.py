"""
Service for vendor service management (CRUD)
"""
from bson import ObjectId
from datetime import datetime
from typing import Dict, Any
from app.database import get_db
from app.schemas.vendor_services_schemas import CreateVendorServiceRequest, EditVendorServiceRequest


class VendorServiceManager:
    """
    Service class for vendor service operations
    """

    def __init__(self):
        self.collection_name = "vendors_add_service"

    async def create_service(self, service_data: CreateVendorServiceRequest) -> Dict[str, Any]:
        """
        Create a new vendor service
        """
        db = get_db()

        # Convert package options to dicts
        packages = []
        for pkg in service_data.package_options:
            packages.append({
                "package_name": pkg.package_name,
                "package_description": pkg.package_description,
                "package_price": pkg.package_price,
                "availability_settings": [day.value for day in pkg.availability_settings],
                "additional_notes": pkg.additional_notes
            })

        service_doc = {
            "vendor_id": service_data.vendor_id,
            "service_name": service_data.service_name,
            "description": service_data.description,
            "category": service_data.category,
            "base_price": service_data.base_price,
            "image_url": service_data.image_url,
            "package_options": packages,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }

        try:
            result = await db[self.collection_name].insert_one(service_doc)

            return {
                "success": True,
                "message": "Service created successfully",
                "service_id": str(result.inserted_id),
                "service_name": service_data.service_name
            }
        except Exception as e:
            return {
                "success": False,
                "message": f"Error creating service: {str(e)}"
            }

    async def get_services_by_vendor(self, vendor_id: str) -> Dict[str, Any]:
        """
        Get all services created by a vendor
        """
        db = get_db()

        try:
            cursor = db[self.collection_name].find({"vendor_id": vendor_id})
            services = await cursor.to_list(length=None)

            service_list = []
            for svc in services:
                service_list.append({
                    "service_id": str(svc["_id"]),
                    "vendor_id": svc["vendor_id"],
                    "service_name": svc["service_name"],
                    "description": svc["description"],
                    "category": svc["category"],
                    "base_price": svc["base_price"],
                    "image_url": svc["image_url"],
                    "package_options": svc["package_options"],
                    "created_at": str(svc["created_at"]),
                    "updated_at": str(svc["updated_at"])
                })

            return {
                "success": True,
                "message": "Services retrieved successfully",
                "vendor_id": vendor_id,
                "services": service_list,
                "total_services": len(service_list)
            }
        except Exception as e:
            return {
                "success": False,
                "message": f"Error retrieving services: {str(e)}"
            }

    async def edit_service(self, service_id: str, vendor_id: str, service_data: EditVendorServiceRequest) -> Dict[str, Any]:
        """
        Edit an existing vendor service
        """
        db = get_db()

        try:
            existing = await db[self.collection_name].find_one({
                "_id": ObjectId(service_id),
                "vendor_id": vendor_id
            })

            if not existing:
                return {
                    "success": False,
                    "message": "Service not found or does not belong to this vendor"
                }

            update_fields = {}
            for field, value in service_data.model_dump(exclude_none=True).items():
                if field == "package_options":
                    packages = []
                    for pkg in value:
                        packages.append({
                            "package_name": pkg["package_name"],
                            "package_description": pkg["package_description"],
                            "package_price": pkg["package_price"],
                            "availability_settings": [
                                day.value if hasattr(day, "value") else day
                                for day in pkg["availability_settings"]
                            ],
                            "additional_notes": pkg.get("additional_notes")
                        })
                    update_fields["package_options"] = packages
                else:
                    update_fields[field] = value

            if not update_fields:
                return {
                    "success": False,
                    "message": "No fields provided to update"
                }

            update_fields["updated_at"] = datetime.utcnow()

            await db[self.collection_name].update_one(
                {"_id": ObjectId(service_id)},
                {"$set": update_fields}
            )

            updated = await db[self.collection_name].find_one({"_id": ObjectId(service_id)})

            return {
                "success": True,
                "message": "Service updated successfully",
                "service_id": str(updated["_id"]),
                "service_name": updated["service_name"]
            }
        except Exception as e:
            return {
                "success": False,
                "message": f"Error updating service: {str(e)}"
            }

    async def delete_service(self, service_id: str, vendor_id: str) -> Dict[str, Any]:
        """
        Delete a vendor service
        """
        db = get_db()

        try:
            existing = await db[self.collection_name].find_one({
                "_id": ObjectId(service_id),
                "vendor_id": vendor_id
            })

            if not existing:
                return {
                    "success": False,
                    "message": "Service not found or does not belong to this vendor"
                }

            await db[self.collection_name].delete_one({"_id": ObjectId(service_id)})

            return {
                "success": True,
                "message": "Service deleted successfully",
                "service_id": service_id
            }
        except Exception as e:
            return {
                "success": False,
                "message": f"Error deleting service: {str(e)}"
            }
