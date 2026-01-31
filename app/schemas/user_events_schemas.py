"""
Pydantic models for user event creation
"""
from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


class EventType(str, Enum):
    CORPORATE = "Corporate"
    WEDDING = "Wedding"
    BIRTHDAY = "Birthday"
    SOCIAL_GATHERING = "Social Gathering"
    FESTIVAL = "Festival"
    PRIVATE_PARTY = "Private Party"


class GuestCount(str, Enum):
    GUESTS_10_25 = "10-25 guests"
    GUESTS_25_50 = "25-50 guests"
    GUESTS_50_100 = "50-100 guests"
    GUESTS_100_200 = "100-200 guests"
    GUESTS_200_PLUS = "200+ guests"


class CreateEventRequest(BaseModel):
    """
    Request model for creating a new event
    """
    user_id: str = Field(..., description="ID of the user creating the event")
    event_name: str = Field(..., min_length=1, max_length=200, description="Name of the event")
    event_type: EventType = Field(..., description="Type of event")
    event_date: str = Field(..., description="Date of the event (YYYY-MM-DD)")
    event_time: str = Field(..., description="Time of the event (HH:MM)")
    location: str = Field(..., min_length=1, max_length=500, description="Event location")
    estimated_guest_count: GuestCount = Field(..., description="Estimated number of guests")
    additional_features: Optional[str] = Field(None, max_length=1000, description="Any additional features or requirements for the event")

    class Config:
        json_schema_extra = {
            "example": {
                "user_id": "507f1f77bcf86cd799439011",
                "event_name": "Annual Tech Conference",
                "event_type": "Corporate",
                "event_date": "2026-03-15",
                "event_time": "10:00",
                "location": "Convention Center, New York",
                "estimated_guest_count": "100-200 guests",
                "additional_features": "Live DJ, Photo Booth, Catering"
            }
        }


class CreateEventResponse(BaseModel):
    """
    Response model for event creation
    """
    event_id: str = Field(..., description="Unique event ID")
    event_name: str = Field(..., description="Name of the event")
    event_type: str = Field(..., description="Type of event")
    event_date: str = Field(..., description="Date of the event")
    event_time: str = Field(..., description="Time of the event")
    location: str = Field(..., description="Event location")
    estimated_guest_count: str = Field(..., description="Estimated number of guests")
    additional_features: Optional[str] = Field(None, description="Additional features or requirements")
    message: str = Field(..., description="Response message")

    class Config:
        json_schema_extra = {
            "example": {
                "event_id": "507f1f77bcf86cd799439011",
                "event_name": "Annual Tech Conference",
                "event_type": "Corporate",
                "event_date": "2026-03-15",
                "event_time": "10:00",
                "location": "Convention Center, New York",
                "estimated_guest_count": "100-200 guests",
                "additional_features": "Live DJ, Photo Booth, Catering",
                "message": "Event created successfully"
            }
        }


class EventDetail(BaseModel):
    """
    Model for a single event in the list
    """
    event_id: str = Field(..., description="Unique event ID")
    event_name: str = Field(..., description="Name of the event")
    event_type: str = Field(..., description="Type of event")
    event_date: str = Field(..., description="Date of the event")
    event_time: str = Field(..., description="Time of the event")
    location: str = Field(..., description="Event location")
    estimated_guest_count: str = Field(..., description="Estimated number of guests")
    additional_features: Optional[str] = Field(None, description="Additional features or requirements")
    created_at: str = Field(..., description="Event creation timestamp")
    updated_at: str = Field(..., description="Event last updated timestamp")


class GetUserEventsResponse(BaseModel):
    """
    Response model for getting user events
    """
    user_id: str = Field(..., description="User ID")
    events: list[EventDetail] = Field(..., description="List of user events")
    total_events: int = Field(..., description="Total number of events")
    message: str = Field(..., description="Response message")


class EditEventRequest(BaseModel):
    """
    Request model for editing an event (all fields optional)
    """
    event_name: Optional[str] = Field(None, min_length=1, max_length=200, description="Name of the event")
    event_type: Optional[EventType] = Field(None, description="Type of event")
    event_date: Optional[str] = Field(None, description="Date of the event (YYYY-MM-DD)")
    event_time: Optional[str] = Field(None, description="Time of the event (HH:MM)")
    location: Optional[str] = Field(None, min_length=1, max_length=500, description="Event location")
    estimated_guest_count: Optional[GuestCount] = Field(None, description="Estimated number of guests")
    additional_features: Optional[str] = Field(None, max_length=1000, description="Any additional features or requirements")

    class Config:
        json_schema_extra = {
            "example": {
                "event_name": "Updated Tech Conference",
                "location": "Grand Hall, Chicago",
                "additional_features": "Live DJ, Photo Booth, VIP Lounge"
            }
        }


class EditEventResponse(BaseModel):
    """
    Response model for editing an event
    """
    event_id: str = Field(..., description="Unique event ID")
    event_name: str = Field(..., description="Name of the event")
    event_type: str = Field(..., description="Type of event")
    event_date: str = Field(..., description="Date of the event")
    event_time: str = Field(..., description="Time of the event")
    location: str = Field(..., description="Event location")
    estimated_guest_count: str = Field(..., description="Estimated number of guests")
    additional_features: Optional[str] = Field(None, description="Additional features or requirements")
    message: str = Field(..., description="Response message")
