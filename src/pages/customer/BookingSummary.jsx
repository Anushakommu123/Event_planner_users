import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, CreditCard, Check } from 'lucide-react';
import Navbar from '../../components/Navbar';
import './BookingSummary.css';

const BookingSummary = () => {
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [paymentData, setPaymentData] = useState({
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        securityCode: '',
        discountCode: ''
    });

    const bookingDetails = {
        venue: 'Venue Vista Grand',
        rating: 4.8,
        reviews: 1230,
        address: '123 Event Lane, Metropolis, CA 90210',
        date: 'Friday, October 27, 2024',
        time: '7:00 PM - 11:00 PM (4-hour duration)',
        services: [
            { name: 'Grand Ballroom Rental', price: 1200 },
            { name: 'Premium Catering Package (150 guests)', price: 4500 },
            { name: 'Professional DJ Services', price: 600 },
            { name: 'Elegant Floral Decor Package', price: 750 }
        ],
        subtotal: 7250,
        discount: -250,
        tax: 580,
        total: 7580
    };

    const handleChange = (e) => {
        setPaymentData({
            ...paymentData,
            [e.target.name]: e.target.value
        });
    };

    const handleConfirmBooking = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const handleBackToServices = () => {
        navigate('/browse-services');
    };

    if (showConfirmation) {
        return (
            <div className="booking-page">
                <Navbar role="customer" />
                <div className="confirmation-container">
                    <div className="confirmation-card">
                        <div className="success-icon">
                            <Check size={64} />
                        </div>
                        <h1>Booking Confirmed!</h1>
                        <p>Your event booking has been successfully confirmed.</p>
                        <p className="confirmation-details">
                            A confirmation email has been sent to your registered email address with all the details.
                        </p>
                        <div className="confirmation-actions">
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate('/home')}
                            >
                                Back to Home
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => navigate('/my-events')}
                            >
                                View My Events
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-page">
            <Navbar role="customer" />

            <main className="booking-content">
                <div className="container">
                    <h1 className="page-title">Review and Confirm Your Event</h1>

                    <div className="booking-layout">
                        {/* Left Side - Payment Form */}
                        <div className="payment-section">
                            <div className="section-card">
                                <h2>Payment method</h2>
                                <p className="section-subtitle">
                                    You won't be charged now, payment will be collected at the venue after your event.
                                </p>

                                <form onSubmit={handleConfirmBooking}>
                                    <label htmlFor="cardName" className="form-label">Name on card*</label>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            id="cardName"
                                            name="cardName"
                                            placeholder="Add card holder full name"
                                            value={paymentData.cardName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <label htmlFor="cardNumber" className="form-label">Card number*</label>
                                    <div className="form-group">
                                        <div className="card-input">
                                            <input
                                                type="text"
                                                id="cardNumber"
                                                name="cardNumber"
                                                placeholder="Credit or debit card number"
                                                value={paymentData.cardNumber}
                                                onChange={handleChange}
                                                maxLength="19"
                                                required
                                            />
                                            <CreditCard size={20} />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div>
                                            <label htmlFor="expiryDate" className="form-label">Expiry date*</label>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    id="expiryDate"
                                                    name="expiryDate"
                                                    placeholder="MM/YY"
                                                    value={paymentData.expiryDate}
                                                    onChange={handleChange}
                                                    maxLength="5"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="securityCode" className="form-label">Security code*</label>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    id="securityCode"
                                                    name="securityCode"
                                                    placeholder="123"
                                                    value={paymentData.securityCode}
                                                    onChange={handleChange}
                                                    maxLength="4"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="payment-badges">
                                        <span>Pay securely with</span>
                                        <div className="badge-icons">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" />
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" />
                                        </div>
                                    </div>

                                    <div className="discount-section">
                                        <h3>Discount code</h3>
                                        <div className="discount-input">
                                            <input
                                                type="text"
                                                name="discountCode"
                                                placeholder="Enter discount code"
                                                value={paymentData.discountCode}
                                                onChange={handleChange}
                                            />
                                            <button type="button" className="apply-btn">Apply</button>
                                        </div>
                                    </div>

                                    <div className="cancellation-policy">
                                        <h3>Cancellation policy</h3>
                                        <p>
                                            Cancel for free up to <strong>24 hours ahead</strong>, otherwise you will be charged{' '}
                                            <strong>50%</strong> of the service price for late cancellation or{' '}
                                            <strong>100%</strong> for not showing up.
                                        </p>
                                    </div>

                                    <div className="booking-notes">
                                        <h3>Booking notes</h3>
                                        <textarea
                                            placeholder="Include comments or requests about your booking"
                                            rows="4"
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary confirm-btn">
                                        Confirm Booking
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-secondary back-btn"
                                        onClick={handleBackToServices}
                                    >
                                        Back to Services
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right Side - Booking Summary */}
                        <div className="summary-section">
                            <div className="venue-card">
                                <img
                                    src="https://images.unsplash.com/photo-1519167758481-83f29da8c1f0?w=600&h=400&fit=crop"
                                    alt={bookingDetails.venue}
                                />
                                <div className="venue-info">
                                    <h3>{bookingDetails.venue}</h3>
                                    <div className="venue-rating">
                                        <span className="rating-star">★</span>
                                        <span>{bookingDetails.rating}</span>
                                        <span className="reviews">({bookingDetails.reviews} reviews)</span>
                                    </div>
                                    <div className="venue-address">
                                        <MapPin size={16} />
                                        <span>{bookingDetails.address}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="event-details">
                                <div className="detail-item">
                                    <Calendar size={18} />
                                    <span>{bookingDetails.date}</span>
                                </div>
                                <div className="detail-item">
                                    <Clock size={18} />
                                    <span>{bookingDetails.time}</span>
                                </div>
                            </div>

                            <div className="services-breakdown">
                                {bookingDetails.services.map((service, index) => (
                                    <div key={index} className="service-item">
                                        <span className="service-name">{service.name}</span>
                                        <span className="service-price">${service.price}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="price-breakdown">
                                <div className="price-item">
                                    <span>Subtotal</span>
                                    <span>${bookingDetails.subtotal}</span>
                                </div>
                                <div className="price-item discount">
                                    <span>Discounts</span>
                                    <span>-${Math.abs(bookingDetails.discount)}</span>
                                </div>
                                <div className="price-item">
                                    <span>Tax</span>
                                    <span>${bookingDetails.tax}</span>
                                </div>
                            </div>

                            <div className="total-price">
                                <span>Total</span>
                                <span>${bookingDetails.total}</span>
                            </div>

                            <div className="payment-options">
                                <div className="payment-option">
                                    <span className="option-label">Pay now</span>
                                    <span className="option-value">$0</span>
                                </div>
                                <div className="payment-option">
                                    <span className="option-label">Pay at venue</span>
                                    <span className="option-value">${bookingDetails.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BookingSummary;
