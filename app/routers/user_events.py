"""
User event routes - endpoints for event operations
"""
from fastapi import APIRouter, HTTPException, status
from app.schemas.user_events_schemas import (
    CreateEventRequest,
    CreateEventResponse,
    GetUserEventsResponse,
    EditEventRequest,
    EditEventResponse
)
from app.services.user_events_services import UserEventService

router = APIRouter(prefix="/user-events", tags=["user-events"])

# Initialize service
user_event_service = UserEventService()


@router.post("/create", response_model=CreateEventResponse, status_code=status.HTTP_201_CREATED)
async def create_event(event_data: CreateEventRequest):
    """
    Create a new event

    - **user_id**: ID of the user creating the event
    - **event_name**: Name of the event
    - **event_type**: Type of event (Corporate, Wedding, Birthday, Social Gathering, Festival, Private Party)
    - **event_date**: Date of the event (YYYY-MM-DD)
    - **event_time**: Time of the event (HH:MM)
    - **location**: Event location
    - **estimated_guest_count**: Estimated number of guests
    - **additional_features**: Any additional features or requirements (optional)
    """
    result = await user_event_service.create_event(event_data)

    if not result.get("success"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result.get("message", "Event creation failed")
        )

    return {
        "event_id": result["event_id"],
        "event_name": result["event_name"],
        "event_type": result["event_type"],
        "event_date": result["event_date"],
        "event_time": result["event_time"],
        "location": result["location"],
        "estimated_guest_count": result["estimated_guest_count"],
        "additional_features": result["additional_features"],
        "message": result["message"]
    }


@router.get("/get-events/{user_id}", response_model=GetUserEventsResponse)
async def get_user_events(user_id: str):
    """
    Get all events created by a user

    - **user_id**: ID of the user (path parameter)
    """
    result = await user_event_service.get_events_by_user(user_id)

    if not result.get("success"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result.get("message", "Failed to retrieve events")
        )

    return {
        "user_id": result["user_id"],
        "events": result["events"],
        "total_events": result["total_events"],
        "message": result["message"]
    }


@router.put("/edit-event/{event_id}", response_model=EditEventResponse)
async def edit_event(event_id: str, user_id: str, event_data: EditEventRequest):
    """
    Edit an existing event

    - **event_id**: ID of the event to edit (path parameter)
    - **user_id**: ID of the user who owns the event (query parameter)
    - Only send the fields you want to update
    """
    result = await user_event_service.edit_event(event_id, user_id, event_data)

    if not result.get("success"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=result.get("message", "Event update failed")
        )

    return {
        "event_id": result["event_id"],
        "event_name": result["event_name"],
        "event_type": result["event_type"],
        "event_date": result["event_date"],
        "event_time": result["event_time"],
        "location": result["location"],
        "estimated_guest_count": result["estimated_guest_count"],
        "additional_features": result["additional_features"],
        "message": result["message"]
    }
