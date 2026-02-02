import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../customer/Login.css';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/admin/dashboard');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="login-container">
            <div className="login-split">
                {/* Left Side - Branding */}
                <div className="login-brand">
                    <div className="brand-content">
                        <div className="brand-logo">
                            <div className="logo-icon-large">
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                    <rect x="5" y="5" width="30" height="30" rx="6" fill="white" />
                                </svg>
                            </div>
                            <h1 className="brand-name">EventConnect</h1>
                        </div>

                        <h2 className="brand-tagline">Admin Portal</h2>
                        <p className="brand-description">
                            Manage users, monitor platform activity, and maintain the EventConnect ecosystem.
                        </p>

                        <div className="brand-image">
                            <img
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                                alt="Admin dashboard"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="login-form-section">
                    <div className="login-form-container">
                        <h2 className="form-title">Admin Login</h2>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label className="input-label" htmlFor="email">Email Address</label>
                                <div className="input-wrapper">
                                    <div className="input-icon">
                                        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M2 3h12a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1zm0 1.5v.5l6 3.5 6-3.5v-.5H2zm12 1.7L8 9.7 2 6.2V12h12V6.2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Admin email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="input-label" htmlFor="password">Password</label>
                                <div className="input-wrapper">
                                    <div className="input-icon">
                                        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M8 1a3 3 0 00-3 3v2H4a1 1 0 00-1 1v6a1 1 0 001 1h8a1 1 0 001-1V7a1 1 0 00-1-1h-1V4a3 3 0 00-3-3zm2 5V4a2 2 0 10-4 0v2h4zM8 9a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary login-btn">
                                Log In
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
