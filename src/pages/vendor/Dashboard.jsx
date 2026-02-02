import { DollarSign, Calendar, TrendingUp, Users } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { bookingRequests, vendorEarnings } from '../../data/mockData';
import './Dashboard.css';

const VendorDashboard = () => {
    const stats = [
        { label: 'Total Earnings', value: `$${vendorEarnings.totalEarnings.toLocaleString()}`, icon: DollarSign, color: '#10B981' },
        { label: 'Pending Payments', value: `$${vendorEarnings.pendingPayments.toLocaleString()}`, icon: TrendingUp, color: '#F59E0B' },
        { label: 'Completed Bookings', value: vendorEarnings.completedBookings, icon: Calendar, color: '#00D9D9' },
        { label: 'Upcoming Events', value: vendorEarnings.upcomingevents, icon: Users, color: '#8B5CF6' }
    ];

    return (
        <div className="vendor-dashboard-page">
            <Navbar role="vendor" />

            <main className="dashboard-content">
                <div className="container-wide">
                    <div className="dashboard-header">
                        <h1>Vendor Dashboard</h1>
                        <p>Welcome back! Here's your business overview</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-card">
                                <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                                    <stat.icon size={24} />
                                </div>
                                <div className="stat-info">
                                    <p className="stat-label">{stat.label}</p>
                                    <h3 className="stat-value">{stat.value}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Booking Requests */}
                    <div className="dashboard-section">
                        <h2>Recent Booking Requests</h2>
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Customer</th>
                                        <th>Event</th>
                                        <th>Date</th>
                                        <th>Service</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookingRequests.map((request) => (
                                        <tr key={request.id}>
                                            <td>
                                                <div className="customer-info">
                                                    <div className="customer-avatar">{request.customerName[0]}</div>
                                                    <div>
                                                        <div className="customer-name">{request.customerName}</div>
                                                        <div className="customer-email">{request.customerEmail}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="event-info">
                                                    <div className="event-name">{request.eventName}</div>
                                                    <div className="event-type">{request.eventType}</div>
                                                </div>
                                            </td>
                                            <td>{request.eventDate}</td>
                                            <td>{request.service}</td>
                                            <td className="amount">${request.amount.toLocaleString()}</td>
                                            <td>
                                                <span className={`status-badge ${request.status}`}>
                                                    {request.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    {request.status === 'pending' && (
                                                        <>
                                                            <button className="btn-accept">Accept</button>
                                                            <button className="btn-reject">Reject</button>
                                                        </>
                                                    )}
                                                    {request.status === 'accepted' && (
                                                        <button className="btn-view">View Details</button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="dashboard-section">
                        <h2>Recent Transactions</h2>
                        <div className="transactions-list">
                            {vendorEarnings.recentTransactions.map((transaction) => (
                                <div key={transaction.id} className="transaction-item">
                                    <div className="transaction-info">
                                        <h4>{transaction.customer}</h4>
                                        <p>{transaction.service}</p>
                                    </div>
                                    <div className="transaction-meta">
                                        <span className="transaction-date">{transaction.date}</span>
                                        <span className={`transaction-status ${transaction.status}`}>
                                            {transaction.status}
                                        </span>
                                    </div>
                                    <div className="transaction-amount">
                                        ${transaction.amount.toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VendorDashboard;
