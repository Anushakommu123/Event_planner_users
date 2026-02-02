import { Calendar, MapPin, Clock, Users, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { bookingRequests } from '../../data/mockData';
import './Dashboard.css';

const VendorBookings = () => {
    return (
        <div className="vendor-dashboard-page">
            <Navbar role="vendor" />

            <main className="dashboard-content">
                <div className="container-wide">
                    <div className="dashboard-header">
                        <h1>Manage Bookings</h1>
                        <p>Track and manage your upcoming event bookings</p>
                    </div>

                    <div className="bookings-tabs mb-4">
                        <button className="tab active">All Bookings</button>
                        <button className="tab">Pending</button>
                        <button className="tab">Confirmed</button>
                        <button className="tab">Completed</button>
                    </div>

                    <div className="bookings-list">
                        {bookingRequests.map((booking) => (
                            <div key={booking.id} className="card booking-detail-card mb-3">
                                <div className="booking-main-info">
                                    <div className="booking-date-badge">
                                        <span className="month">{new Date(booking.eventDate).toLocaleString('default', { month: 'short' })}</span>
                                        <span className="day">{new Date(booking.eventDate).getDate()}</span>
                                    </div>
                                    <div className="booking-summary">
                                        <div className="flex-between">
                                            <h3 className="text-xl font-bold">{booking.eventName}</h3>
                                            <span className={`status-badge ${booking.status}`}>{booking.status}</span>
                                        </div>
                                        <div className="booking-meta-grid">
                                            <div className="meta-item">
                                                <Users size={16} />
                                                <span>{booking.customerName}</span>
                                            </div>
                                            <div className="meta-item">
                                                <Calendar size={16} />
                                                <span>{booking.eventDate}</span>
                                            </div>
                                            <div className="meta-item">
                                                <Clock size={16} />
                                                <span>{booking.eventTime}</span>
                                            </div>
                                            <div className="meta-item">
                                                <MapPin size={16} />
                                                <span>{booking.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="booking-price">
                                        <span className="label">Total Amount</span>
                                        <span className="value">${booking.amount.toLocaleString()}</span>
                                    </div>
                                    <div className="booking-actions">
                                        {booking.status === 'pending' ? (
                                            <>
                                                <button className="btn btn-primary btn-sm">
                                                    <CheckCircle size={16} /> Accept
                                                </button>
                                                <button className="btn btn-secondary btn-sm text-error">
                                                    <XCircle size={16} /> Reject
                                                </button>
                                            </>
                                        ) : (
                                            <button className="btn btn-secondary btn-sm">View Details</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <style jsx>{`
                .bookings-tabs {
                    display: flex;
                    gap: 1rem;
                    border-bottom: 1px solid var(--border-color);
                    padding-bottom: 1px;
                }
                .tab {
                    padding: 0.75rem 1.5rem;
                    background: transparent;
                    color: var(--text-secondary);
                    font-weight: 500;
                    border-bottom: 2px solid transparent;
                    transition: all 0.2s;
                }
                .tab.active {
                    color: var(--primary-cyan);
                    border-bottom-color: var(--primary-cyan);
                }
                .tab:hover:not(.active) {
                    color: var(--text-primary);
                }
                .booking-detail-card {
                    padding: 1.5rem;
                }
                .booking-main-info {
                    display: grid;
                    grid-template-columns: auto 1fr auto auto;
                    gap: 2rem;
                    align-items: center;
                }
                .booking-date-badge {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: var(--background-light);
                    border-radius: var(--radius-md);
                    width: 64px;
                    height: 64px;
                    border: 1px solid var(--border-color);
                }
                .booking-date-badge .month {
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    font-weight: 700;
                    color: var(--primary-cyan);
                }
                .booking-date-badge .day {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--text-primary);
                }
                .booking-meta-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 0.5rem 1.5rem;
                    margin-top: 0.75rem;
                }
                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                }
                .booking-price {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                }
                .booking-price .label {
                    font-size: 0.75rem;
                    color: var(--text-tertiary);
                    text-transform: uppercase;
                }
                .booking-price .value {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--primary-cyan);
                }
                .booking-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }
                .btn-sm {
                    padding: 0.5rem 1rem;
                    font-size: 0.875rem;
                }
                @media (max-width: 1024px) {
                    .booking-main-info {
                        grid-template-columns: auto 1fr;
                    }
                    .booking-price, .booking-actions {
                        grid-column: span 2;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        border-top: 1px solid var(--border-color);
                        padding-top: 1rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default VendorBookings;
