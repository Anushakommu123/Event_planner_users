"""
User authentication services - signup and login logic
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
from app.schemas.users_schemas import (
    UserSignupRequest,
    UserLoginRequest
)


class UserService:
    """
    Service class for user authentication operations
    """
    
    def __init__(self):
        self.collection_name = "users"
    
    async def signup(self, user_data: UserSignupRequest) -> Dict[str, Any]:
        """
        Handle user signup
        """
        db = get_db()
        
        # Validate passwords match
        if not validate_passwords_match(user_data.password, user_data.confirm_password):
            return {
                "success": False,
                "message": "Password and confirm password do not match"
            }
        
        # Validate email format
        if not is_valid_email(user_data.email):
            return {
                "success": False,
                "message": "Invalid email format"
            }
        
        # Validate phone number format
        if not is_valid_phone_number(user_data.phone_number):
            return {
                "success": False,
                "message": "Invalid phone number format"
            }
        
        # Check if email already exists
        existing_email = await db[self.collection_name].find_one(
            {"email": user_data.email}
        )
        if existing_email:
            return {
                "success": False,
                "message": "Email already registered"
            }
        
        # Check if phone number already exists
        existing_phone = await db[self.collection_name].find_one(
            {"phone_number": user_data.phone_number}
        )
        if existing_phone:
            return {
                "success": False,
                "message": "Phone number already registered"
            }
        
        # Create user document
        user_doc = {
            "name": user_data.name,
            "email": user_data.email,
            "phone_number": user_data.phone_number,
            "password": user_data.password,  # Stored as plain text as requested
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        # Insert user into database
        try:
            result = await db[self.collection_name].insert_one(user_doc)
            
            return {
                "success": True,
                "message": f"Welcome, {user_data.name}! Your account has been created successfully.",
                "user_id": str(result.inserted_id),
                "name": user_data.name,
                "email": user_data.email,
                "phone_number": user_data.phone_number
            }
        except Exception as e:
            return {
                "success": False,
                "message": f"Error creating user: {str(e)}"
            }
    
    async def login(self, login_data: UserLoginRequest) -> Dict[str, Any]:
        """
        Handle user login with email or phone number
        """
        db = get_db()
        
        email_or_phone = login_data.email_or_phone
        password = login_data.password
        
        # Determine if input is email or phone
        field_name, is_email = is_email_or_phone(email_or_phone)
        
        # Find user by email or phone number
        query = {field_name: email_or_phone}
        user = await db[self.collection_name].find_one(query)
        
        if not user:
            return {
                "success": False,
                "message": "Invalid email/phone number or password"
            }
        
        # Check password (plain text comparison as requested)
        if user["password"] != password:
            return {
                "success": False,
                "message": "Invalid email/phone number or password"
            }
        
        return {
            "success": True,
            "message": "Login successful",
            "user_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "phone_number": user["phone_number"]
        }
    
    async def get_user_by_id(self, user_id: str) -> Optional[Dict]:
        """
        Get user details by user ID
        """
        db = get_db()
        
        try:
            user = await db[self.collection_name].find_one(
                {"_id": ObjectId(user_id)}
            )
            if user:
                user["_id"] = str(user["_id"])
            return user
        except Exception:
            return None
    
    async def get_user_by_email(self, email: str) -> Optional[Dict]:
        """
        Get user by email
        """
        db = get_db()
        
        user = await db[self.collection_name].find_one(
            {"email": email}
        )
        if user:
            user["_id"] = str(user["_id"])
        return user
    
    async def get_user_by_phone(self, phone_number: str) -> Optional[Dict]:
        """
        Get user by phone number
        """
        db = get_db()
        
        user = await db[self.collection_name].find_one(
            {"phone_number": phone_number}
        )
        if user:
            user["_id"] = str(user["_id"])
        return user
