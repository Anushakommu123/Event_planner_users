import { Users, Building2, Calendar, DollarSign, Search } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { users, adminStats } from '../../data/mockData';
import './Dashboard.css';

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Users', value: adminStats.totalUsers.toLocaleString(), icon: Users, color: '#00D9D9' },
        { label: 'Total Vendors', value: adminStats.totalVendors, icon: Building2, color: '#8B5CF6' },
        { label: 'Total Bookings', value: adminStats.totalBookings.toLocaleString(), icon: Calendar, color: '#10B981' },
        { label: 'Platform Revenue', value: `$${adminStats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: '#F59E0B' }
    ];

    return (
        <div className="admin-dashboard-page">
            <Navbar role="admin" />

            <main className="dashboard-content">
                <div className="container-wide">
                    <div className="dashboard-header">
                        <h1>Admin Dashboard</h1>
                        <p>Platform overview and user management</p>
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

                    {/* User Management */}
                    <div className="dashboard-section">
                        <div className="section-header">
                            <h2>Manage Users</h2>
                            <div className="search-bar">
                                <Search size={18} />
                                <input type="text" placeholder="Search users..." />
                            </div>
                        </div>

                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Join Date</th>
                                        <th>Activity</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td>
                                                <div className="user-info">
                                                    <div className="user-avatar">{user.name[0]}</div>
                                                    <span className="user-name">{user.name}</span>
                                                </div>
                                            </td>
                                            <td className="user-email">{user.email}</td>
                                            <td>
                                                <span className={`role-badge ${user.role}`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`status-badge ${user.status}`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td>{user.joinDate}</td>
                                            <td>
                                                {user.role === 'customer' && (
                                                    <span className="activity-text">{user.totalBookings} bookings</span>
                                                )}
                                                {user.role === 'vendor' && (
                                                    <span className="activity-text">
                                                        {user.totalServices} services • ★ {user.rating}
                                                    </span>
                                                )}
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button className="btn-action">View</button>
                                                    <button className="btn-action">Edit</button>
                                                    {user.status === 'active' ? (
                                                        <button className="btn-action danger">Suspend</button>
                                                    ) : (
                                                        <button className="btn-action success">Activate</button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="quick-actions">
                        <div className="action-card">
                            <h3>Pending Approvals</h3>
                            <p className="action-value">{adminStats.pendingApprovals}</p>
                            <button className="btn btn-primary">Review</button>
                        </div>

                        <div className="action-card">
                            <h3>Active Bookings</h3>
                            <p className="action-value">{adminStats.activeBookings}</p>
                            <button className="btn btn-primary">View All</button>
                        </div>

                        <div className="action-card">
                            <h3>Platform Analytics</h3>
                            <p className="action-description">View detailed reports</p>
                            <button className="btn btn-primary">Open Analytics</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
