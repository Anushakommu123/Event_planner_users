"""
MongoDB master operations and utilities
"""
from motor.motor_asyncio import AsyncDatabase
from bson import ObjectId
from typing import Any, Dict, List, Optional


class MongoDB:
    """
    Master MongoDB operations class
    """
    
    def __init__(self, db: AsyncDatabase):
        self.db = db
    
    async def find_one(
        self, 
        collection: str, 
        query: Dict[str, Any]
    ) -> Optional[Dict]:
        """
        Find single document
        """
        return await self.db[collection].find_one(query)
    
    async def find_many(
        self, 
        collection: str, 
        query: Dict[str, Any] = None,
        skip: int = 0,
        limit: int = 10
    ) -> List[Dict]:
        """
        Find multiple documents with pagination
        """
        query = query or {}
        cursor = self.db[collection].find(query).skip(skip).limit(limit)
        return await cursor.to_list(length=limit)
    
    async def insert_one(
        self, 
        collection: str, 
        document: Dict[str, Any]
    ) -> str:
        """
        Insert single document
        """
        result = await self.db[collection].insert_one(document)
        return str(result.inserted_id)
    
    async def update_one(
        self, 
        collection: str, 
        query: Dict[str, Any],
        update: Dict[str, Any]
    ) -> int:
        """
        Update single document
        """
        result = await self.db[collection].update_one(
            query, 
            {"$set": update}
        )
        return result.modified_count
    
    async def delete_one(
        self, 
        collection: str, 
        query: Dict[str, Any]
    ) -> int:
        """
        Delete single document
        """
        result = await self.db[collection].delete_one(query)
        return result.deleted_count
    
    async def count_documents(
        self, 
        collection: str, 
        query: Dict[str, Any] = None
    ) -> int:
        """
        Count documents in collection
        """
        query = query or {}
        return await self.db[collection].count_documents(query)
