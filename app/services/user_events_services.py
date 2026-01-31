"""
Service for user event operations
"""
from bson import ObjectId
from datetime import datetime
from typing import Dict, Any, List
from app.database import get_db
from app.schemas.user_events_schemas import CreateEventRequest, EditEventRequest


class UserEventService:
    """
    Service class for user event operations
    """

    def __init__(self):
        self.collection_name = "user_created_events"

    async def create_event(self, event_data: CreateEventRequest) -> Dict[str, Any]:
        """
        Create a new event for a user
        """
        db = get_db()

        event_doc = {
            "user_id": event_data.user_id,
            "event_name": event_data.event_name,
            "event_type": event_data.event_type.value,
            "event_date": event_data.event_date,
            "event_time": event_data.event_time,
            "location": event_data.location,
            "estimated_guest_count": event_data.estimated_guest_count.value,
            "additional_features": event_data.additional_features,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }

        try:
            result = await db[self.collection_name].insert_one(event_doc)

            return {
                "success": True,
                "message": "Event created successfully",
                "event_id": str(result.inserted_id),
                "event_name": event_data.event_name,
                "event_type": event_data.event_type.value,
                "event_date": event_data.event_date,
                "event_time": event_data.event_time,
                "location": event_data.location,
                "estimated_guest_count": event_data.estimated_guest_count.value,
                "additional_features": event_data.additional_features
            }
        except Exception as e:
            return {
                "success": False,
                "message": f"Error creating event: {str(e)}"
            }

    async def get_events_by_user(self, user_id: str) -> Dict[str, Any]:
        """
        Get all events created by a user
        """
        db = get_db()

        try:
            cursor = db[self.collection_name].find({"user_id": user_id})
            events = await cursor.to_list(length=None)

            event_list = []
            for event in events:
                event_list.append({
                    "event_id": str(event["_id"]),
                    "event_name": event["event_name"],
                    "event_type": event["event_type"],
                    "event_date": event["event_date"],
                    "event_time": event["event_time"],
                    "location": event["location"],
                    "estimated_guest_count": event["estimated_guest_count"],
                    "additional_features": event.get("additional_features"),
                    "created_at": str(event["created_at"]),
                    "updated_at": str(event["updated_at"])
                })

            return {
                "success": True,
                "message": "Events retrieved successfully",
                "user_id": user_id,
                "events": event_list,
                "total_events": len(event_list)
            }
        except Exception as e:
            return {
                "success": False,
                "message": f"Error retrieving events: {str(e)}"
            }

    async def edit_event(self, event_id: str, user_id: str, event_data: EditEventRequest) -> Dict[str, Any]:
        """
        Edit an existing event
        """
        db = get_db()

        try:
            existing = await db[self.collection_name].find_one({
                "_id": ObjectId(event_id),
                "user_id": user_id
            })

            if not existing:
                return {
                    "success": False,
                    "message": "Event not found or does not belong to this user"
                }

            # Build update dict from provided fields only
            update_fields = {}
            for field, value in event_data.model_dump(exclude_none=True).items():
                if field in ("event_type", "estimated_guest_count"):
                    update_fields[field] = value.value if hasattr(value, "value") else value
                else:
                    update_fields[field] = value

            if not update_fields:
                return {
                    "success": False,
                    "message": "No fields provided to update"
                }

            update_fields["updated_at"] = datetime.utcnow()

            await db[self.collection_name].update_one(
                {"_id": ObjectId(event_id)},
                {"$set": update_fields}
            )

            # Fetch updated document
            updated = await db[self.collection_name].find_one({"_id": ObjectId(event_id)})

            return {
                "success": True,
                "message": "Event updated successfully",
                "event_id": str(updated["_id"]),
                "event_name": updated["event_name"],
                "event_type": updated["event_type"],
                "event_date": updated["event_date"],
                "event_time": updated["event_time"],
                "location": updated["location"],
                "estimated_guest_count": updated["estimated_guest_count"],
                "additional_features": updated.get("additional_features")
            }
        except Exception as e:
            return {
                "success": False,
                "message": f"Error updating event: {str(e)}"
            }
