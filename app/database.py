"""
Database connection and session management
"""
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from app.config import MONGO_URI, DATABASE_NAME

client: AsyncIOMotorClient = None
database: AsyncIOMotorDatabase = None


async def connect_db():
    """
    Create database connection
    """
    global client, database
    try:
        client = AsyncIOMotorClient(MONGO_URI)
        database = client[DATABASE_NAME]
        # Verify connection
        await database.command("ping")
        print("✓ Connected to MongoDB")
    except Exception as e:
        print(f"✗ Failed to connect to MongoDB: {e}")
        raise


async def close_db():
    """
    Close database connection
    """
    global client
    if client:
        client.close()
        print("✓ Closed MongoDB connection")


def get_db() -> AsyncIOMotorDatabase:
    """
    Get database instance
    """
    return database
