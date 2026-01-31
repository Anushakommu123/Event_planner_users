"""
Vendor authentication services - signup and login logic
"""
from bson import ObjectId
from datetime import datetime
from typing import Optional, Dict, Any
from app.database import get_db
from app.utils.users import (
    validate_passwords_match,
    is_valid_email,
    is_valid_phone_number,
    is_email_or_phone
)
from app.schemas.vendor_schemas import (
    VendorSignupRequest,
    VendorLoginRequest
)


class VendorService:
    """
    Service class for vendor authentication operations
    """

    def __init__(self):
        self.collection_name = "vendor_users"

    async def signup(self, vendor_data: VendorSignupRequest) -> Dict[str, Any]:
        """
        Handle vendor signup
        """
        db = get_db()

        # Validate passwords match
        if not validate_passwords_match(vendor_data.password, vendor_data.confirm_password):
            return {
                "success": False,
                "message": "Password and confirm password do not match"
            }

        # Validate email format
        if not is_valid_email(vendor_data.email):
            return {
                "success": False,
                "message": "Invalid email format"
            }

        # Validate phone number format
        if not is_valid_phone_number(vendor_data.phone_number):
            return {
                "success": False,
                "message": "Invalid phone number format"
            }

        # Check if email already exists
        existing_email = await db[self.collection_name].find_one(
            {"email": vendor_data.email}
        )
        if existing_email:
            return {
                "success": False,
                "message": "Email already registered"
            }

        # Check if phone number already exists
        existing_phone = await db[self.collection_name].find_one(
            {"phone_number": vendor_data.phone_number}
        )
        if existing_phone:
            return {
                "success": False,
                "message": "Phone number already registered"
            }

        # Create vendor document
        vendor_doc = {
            "name": vendor_data.name,
            "email": vendor_data.email,
            "phone_number": vendor_data.phone_number,
            "password": vendor_data.password,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }

        # Insert vendor into database
        try:
            result = await db[self.collection_name].insert_one(vendor_doc)

            return {
                "success": True,
                "message": f"Welcome, {vendor_data.name}! Your vendor account has been created successfully.",
                "vendor_id": str(result.inserted_id),
                "name": vendor_data.name,
                "email": vendor_data.email,
                "phone_number": vendor_data.phone_number
            }
        except Exception as e:
            return {
                "success": False,
                "message": f"Error creating vendor: {str(e)}"
            }

    async def login(self, login_data: VendorLoginRequest) -> Dict[str, Any]:
        """
        Handle vendor login with email or phone number
        """
        db = get_db()

        email_or_phone = login_data.email_or_phone
        password = login_data.password

        # Determine if input is email or phone
        field_name, is_email = is_email_or_phone(email_or_phone)

        # Find vendor by email or phone number
        query = {field_name: email_or_phone}
        vendor = await db[self.collection_name].find_one(query)

        if not vendor:
            return {
                "success": False,
                "message": "Invalid email/phone number or password"
            }

        # Check password
        if vendor["password"] != password:
            return {
                "success": False,
                "message": "Invalid email/phone number or password"
            }

        return {
            "success": True,
            "message": "Login successful",
            "vendor_id": str(vendor["_id"]),
            "name": vendor["name"],
            "email": vendor["email"],
            "phone_number": vendor["phone_number"]
        }

    async def get_vendor_by_id(self, vendor_id: str) -> Optional[Dict]:
        """
        Get vendor details by vendor ID
        """
        db = get_db()

        try:
            vendor = await db[self.collection_name].find_one(
                {"_id": ObjectId(vendor_id)}
            )
            if vendor:
                vendor["_id"] = str(vendor["_id"])
            return vendor
        except Exception:
            return None

    async def get_vendor_by_email(self, email: str) -> Optional[Dict]:
        """
        Get vendor by email
        """
        db = get_db()

        vendor = await db[self.collection_name].find_one(
            {"email": email}
        )
        if vendor:
            vendor["_id"] = str(vendor["_id"])
        return vendor

    async def get_vendor_by_phone(self, phone_number: str) -> Optional[Dict]:
        """
        Get vendor by phone number
        """
        db = get_db()

        vendor = await db[self.collection_name].find_one(
            {"phone_number": phone_number}
        )
        if vendor:
            vendor["_id"] = str(vendor["_id"])
        return vendor
