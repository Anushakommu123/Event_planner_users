import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import '../customer/Login.css';

const AdminSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        adminName: '',
        email: '',
        secretKey: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.adminName) newErrors.adminName = 'Admin Name is required';

        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

        if (!formData.secretKey) newErrors.secretKey = 'Secret Key is required';

        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Admin Signing up...', formData);
            navigate('/admin/dashboard');
        }
    };

    return (
        <div className="login-container">
            <div className="login-split">
                {/* Left Side - Branding */}
                <div className="login-brand" style={{ background: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)' }}>
                    <div className="brand-content">
                        <div className="brand-logo">
                            <div className="logo-icon-large">
                                <img src={logo} alt="Klyra Planners" className="brand-logo-img" />
                            </div>
                            <h1 className="brand-name">Klyra Planners</h1>
                        </div>

                        <h2 className="brand-tagline">Administrative Control Center</h2>
                        <p className="brand-description">
                            Manage the platform, oversee users, and ensure smooth operations from a centralized dashboard.
                        </p>

                        <div className="brand-image">
                            <img
                                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop"
                                alt="Admin dashboard"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="login-form-section">
                    <div className="login-form-container">
                        <h2 className="form-title">Admin Access Request</h2>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label className="input-label">Admin Name</label>
                                <div className={`input-wrapper ${errors.adminName ? 'error' : ''}`}>
                                    <div className="input-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                            <circle cx="12" cy="7" r="4"></circle>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        name="adminName"
                                        placeholder="Full Name"
                                        value={formData.adminName}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.adminName && <span className="error-text">{errors.adminName}</span>}
                            </div>

                            <div className="form-group">
                                <label className="input-label">Email Address</label>
                                <div className={`input-wrapper ${errors.email ? 'error' : ''}`}>
                                    <div className="input-icon">
                                        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M2 3h12a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1zm0 1.5v.5l6 3.5 6-3.5v-.5H2zm12 1.7L8 9.7 2 6.2V12h12V6.2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.email && <span className="error-text">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label className="input-label">Secret Key</label>
                                <div className={`input-wrapper ${errors.secretKey ? 'error' : ''}`}>
                                    <div className="input-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        name="secretKey"
                                        placeholder="Secret Key"
                                        value={formData.secretKey}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.secretKey && <span className="error-text">{errors.secretKey}</span>}
                            </div>

                            <div className="form-group">
                                <label className="input-label">Password</label>
                                <div className={`input-wrapper ${errors.password ? 'error' : ''}`}>
                                    <div className="input-icon">
                                        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M8 1a3 3 0 00-3 3v2H4a1 1 0 00-1 1v6a1 1 0 001 1h8a1 1 0 001-1V7a1 1 0 00-1-1h-1V4a3 3 0 00-3-3zm2 5V4a2 2 0 10-4 0v2h4zM8 9a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.password && <span className="error-text">{errors.password}</span>}
                            </div>

                            <div className="form-group">
                                <label className="input-label">Confirm Password</label>
                                <div className={`input-wrapper ${errors.confirmPassword ? 'error' : ''}`}>
                                    <div className="input-icon">
                                        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M8 1a3 3 0 00-3 3v2H4a1 1 0 00-1 1v6a1 1 0 001 1h8a1 1 0 001-1V7a1 1 0 00-1-1h-1V4a3 3 0 00-3-3zm2 5V4a2 2 0 10-4 0v2h4zM8 9a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                            </div>

                            <button type="submit" className="btn btn-primary login-btn">
                                Create Admin Account
                            </button>

                            <p className="signup-prompt">
                                Already have an admin account?
                                <Link to="/admin/login" className="signup-link">
                                    Log In
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSignup;
