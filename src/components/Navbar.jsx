import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ role = 'customer', onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        }
        navigate(`/${role}/login`);
    };

    const getNavLinks = () => {
        if (role === 'customer') {
            return [
                { path: '/home', label: 'Home' },
                { path: '/my-events', label: 'My Events' },
                { path: '/create-event', label: 'Create Event' },
                { path: '/browse-services', label: 'Browse Services' },
                { path: '/booking-summary', label: 'Booking Summary' }
            ];
        }
        if (role === 'vendor') {
            return [
                { path: '/vendor/dashboard', label: 'Dashboard' },
                { path: '/vendor/services', label: 'Services' },
                { path: '/vendor/bookings', label: 'Bookings' },
                { path: '/vendor/earnings', label: 'Earnings' },
                { path: '/vendor/profile', label: 'Profile' }
            ];
        }
        if (role === 'admin') {
            return [
                { path: '/admin/dashboard', label: 'Dashboard' },
                { path: '/admin/users', label: 'Manage Users' }
            ];
        }
        return [];
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to={role === 'customer' ? '/home' : `/${role}/dashboard`} className="navbar-logo">
                    <div className="logo-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="3" width="18" height="18" rx="4" fill="white" />
                        </svg>
                    </div>
                    <span className="logo-text">EventConnect</span>
                </Link>

                <div className="navbar-links">
                    {getNavLinks().map((link) => (
                        <Link key={link.path} to={link.path} className="nav-link">
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="navbar-actions">
                    {role === 'customer' && (
                        <div className="search-box">
                            <Search size={18} />
                            <input type="text" placeholder="Search..." />
                        </div>
                    )}

                    <button className="icon-button">
                        <Bell size={20} />
                    </button>

                    <div className="user-menu">
                        <button className="icon-button user-avatar">
                            <User size={20} />
                        </button>
                    </div>

                    <button className="icon-button logout-btn" onClick={handleLogout} title="Logout">
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
