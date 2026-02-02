import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import Navbar from '../../components/Navbar';
import './CreateEvent.css';

const CreateEvent = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        eventName: 'Annual Gala Dinner',
        eventType: 'Corporate',
        eventDate: '2026-01-30',
        eventTime: '19:00',
        location: 'Grand Ballroom, City Center Hotel',
        guestCount: '50 - 100 guests',
        specialRequests: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleNext = () => {
        if (currentStep === 1) {
            setCurrentStep(2);
        } else {
            // Navigate to browse services
            navigate('/browse-services');
        }
    };

    const handleBack = () => {
        if (currentStep === 2) {
            setCurrentStep(1);
        } else {
            navigate('/home');
        }
    };

    return (
        <div className="create-event-page">
            <Navbar role="customer" />

            <main className="create-event-content">
                <div className="container">
                    <div className="event-form-card">
                        <div className="form-header">
                            <h1>Create Your Event</h1>
                            <p>Let's gather the details for your perfect event.</p>
                        </div>

                        {/* Step Indicator */}
                        <div className="step-indicator">
                            <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                                <div className="step-number">1</div>
                                <div className="step-label">Event Details</div>
                            </div>
                            <div className="step-line"></div>
                            <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                                <div className="step-number">2</div>
                                <div className="step-label">Special Requests</div>
                            </div>
                        </div>

                        {/* Step 1: Event Details */}
                        {currentStep === 1 && (
                            <div className="form-step fade-in">
                                <label htmlFor="eventName" className="form-label">Event Name</label>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="eventName"
                                        name="eventName"
                                        value={formData.eventName}
                                        onChange={handleChange}
                                        placeholder="e.g., Annual Gala Dinner"
                                    />
                                </div>

                                <label htmlFor="eventType" className="form-label">Event Type</label>
                                <div className="form-group">
                                    <select
                                        id="eventType"
                                        name="eventType"
                                        value={formData.eventType}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select event type</option>
                                        <option value="Corporate">Corporate</option>
                                        <option value="Wedding">Wedding</option>
                                        <option value="Birthday">Birthday</option>
                                        <option value="Anniversary">Anniversary</option>
                                        <option value="Social">Social Gathering</option>
                                        <option value="Festival">Festival/Concert</option>
                                        <option value="Private">Private Party</option>
                                    </select>
                                </div>

                                <div className="form-row">
                                    <div>
                                        <label htmlFor="eventDate" className="form-label">Event Date</label>
                                        <div className="form-group">
                                            <div className="input-with-icon">
                                                <input
                                                    type="date"
                                                    id="eventDate"
                                                    name="eventDate"
                                                    value={formData.eventDate}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="eventTime" className="form-label">Event Time</label>
                                        <div className="form-group">
                                            <div className="input-with-icon">                                                <input
                                                type="time"
                                                id="eventTime"
                                                name="eventTime"
                                                value={formData.eventTime}
                                                onChange={handleChange}
                                            />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <label htmlFor="location" className="form-label">Location</label>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g., Grand Ballroom, City Center Hotel"
                                    />
                                </div>

                                <label htmlFor="guestCount" className="form-label">Estimated Guest Count</label>
                                <div className="form-group">
                                    <select
                                        id="guestCount"
                                        name="guestCount"
                                        value={formData.guestCount}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select guest count</option>
                                        <option value="1 - 20 guests">1 - 20 guests</option>
                                        <option value="20 - 50 guests">20 - 50 guests</option>
                                        <option value="50 - 100 guests">50 - 100 guests</option>
                                        <option value="100 - 150 guests">100 - 150 guests</option>
                                        <option value="150 - 200 guests">150 - 200 guests</option>
                                        <option value="200+ guests">200+ guests</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Special Requests */}
                        {currentStep === 2 && (
                            <div className="form-step fade-in">
                                <label htmlFor="specialRequests" className="form-label">Special Requests (Optional)</label>
                                <div className="form-group">
                                    <textarea
                                        id="specialRequests"
                                        name="specialRequests"
                                        value={formData.specialRequests}
                                        onChange={handleChange}
                                        placeholder="Any special requirements, dietary restrictions, accessibility needs, or specific preferences..."
                                        rows="8"
                                    />
                                </div>

                                <div className="event-summary">
                                    <h3>Event Summary</h3>
                                    <div className="summary-grid">
                                        <div className="summary-item">
                                            <span className="summary-label">Event Name:</span>
                                            <span className="summary-value">{formData.eventName}</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="summary-label">Type:</span>
                                            <span className="summary-value">{formData.eventType}</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="summary-label">Date:</span>
                                            <span className="summary-value">{formData.eventDate}</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="summary-label">Time:</span>
                                            <span className="summary-value">{formData.eventTime}</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="summary-label">Location:</span>
                                            <span className="summary-value">{formData.location}</span>
                                        </div>
                                        <div className="summary-item">
                                            <span className="summary-label">Guests:</span>
                                            <span className="summary-value">{formData.guestCount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Form Actions */}
                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleBack}
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleNext}
                            >
                                {currentStep === 1 ? 'Next Step' : 'Browse Services'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateEvent;
