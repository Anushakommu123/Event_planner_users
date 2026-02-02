import { useState, useEffect } from 'react'; // Added useEffect
import { useNavigate, Link, useLocation } from 'react-router-dom'; // Added useLocation
import './Login.css';

const CustomerLogin = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Get current location

    // Initialize state based on the current path
    const [isLogin, setIsLogin] = useState(location.pathname !== '/signup');

    // Also update state if the location changes while component is mounted (e.g. navigation via Link)
    useEffect(() => {
        setIsLogin(location.pathname !== '/signup');
    }, [location.pathname]);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
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
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        if (!isLogin) {
            if (!formData.firstName) newErrors.firstName = 'First Name is required';
            if (!formData.lastName) newErrors.lastName = 'Last Name is required';

            if (!formData.phone) newErrors.phone = 'Phone Number is required';
            else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Phone number must be 10 digits';

            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            if (isLogin) {
                // Login API call
                console.log('Logging in...', { email: formData.email, password: formData.password });
            } else {
                // Signup API call
                console.log('Signing up...', formData);
            }
            // Navigate after successful validation (mock)
            navigate('/home');
        }
    };

    const handleSocialLogin = (provider) => {
        console.log(`Login with ${provider}`);
        navigate('/home');
    };

    const toggleMode = (mode) => {
        setIsLogin(mode);
        setErrors({});
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
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

                        <h2 className="brand-tagline">Seamless Event Planning Starts Here</h2>
                        <p className="brand-description">
                            Connect with top vendors, manage bookings, and create unforgettable experiences with ease.
                        </p>

                        <div className="brand-image">
                            <img
                                src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop"
                                alt="Event planning team"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="login-form-section">
                    <div className="login-form-container">
                        <h2 className="form-title">
                            {isLogin ? 'Access Your Account' : 'Create New Account'}
                        </h2>

                        <div className="form-tabs">
                            <button
                                className={`tab-button ${isLogin ? 'active' : ''}`}
                                onClick={() => toggleMode(true)}
                            >
                                Log In
                            </button>
                            <button
                                className={`tab-button ${!isLogin ? 'active' : ''}`}
                                onClick={() => toggleMode(false)}
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="social-login">
                            <button className="social-btn google-btn" onClick={() => handleSocialLogin('Google')}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4" />
                                    <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853" />
                                    <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05" />
                                    <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335" />
                                </svg>
                                Continue with Google
                            </button>
                            {/* Other social buttons simplified for brevity if needed, but keeping structure */}
                        </div>

                        <div className="divider">
                            <span>or {isLogin ? 'login' : 'signup'} with email</span>
                        </div>

                        <form onSubmit={handleSubmit} className="login-form">
                            {!isLogin && (
                                <>
                                    <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label className="input-label">First Name</label>
                                            <div className={`input-wrapper ${errors.firstName ? 'error' : ''}`}>
                                                <div className="input-icon">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                        <circle cx="12" cy="7" r="4"></circle>
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    placeholder="First Name"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label className="input-label">Last Name</label>
                                            <div className={`input-wrapper ${errors.lastName ? 'error' : ''}`}>
                                                <div className="input-icon">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                        <circle cx="12" cy="7" r="4"></circle>
                                                    </svg>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="Last Name"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="input-label">Phone Number</label>
                                        <div className={`input-wrapper ${errors.phone ? 'error' : ''}`}>
                                            <div className="input-icon">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                                </svg>
                                            </div>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                placeholder="Phone Number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                                    </div>
                                </>
                            )}

                            <div className="form-group">
                                <label className="input-label" htmlFor="email">Email Address</label>
                                <div className={`input-wrapper ${errors.email ? 'error' : ''}`}>
                                    <div className="input-icon">
                                        <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                            <path d="M2 3h12a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1zm0 1.5v.5l6 3.5 6-3.5v-.5H2zm12 1.7L8 9.7 2 6.2V12h12V6.2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.email && <span className="error-text">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label className="input-label" htmlFor="password">Password</label>
                                <div className={`input-wrapper ${errors.password ? 'error' : ''}`}>
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
                                    />
                                </div>
                                {errors.password && <span className="error-text">{errors.password}</span>}
                            </div>

                            {!isLogin && (
                                <div className="form-group">
                                    <label className="input-label" htmlFor="confirmPassword">Confirm Password</label>
                                    <div className={`input-wrapper ${errors.confirmPassword ? 'error' : ''}`}>
                                        <div className="input-icon">
                                            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                                <path d="M8 1a3 3 0 00-3 3v2H4a1 1 0 00-1 1v6a1 1 0 001 1h8a1 1 0 001-1V7a1 1 0 00-1-1h-1V4a3 3 0 00-3-3zm2 5V4a2 2 0 10-4 0v2h4zM8 9a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                                </div>
                            )}

                            {isLogin && (
                                <div className="form-footer">
                                    <Link to="/forgot-password" className="forgot-link">
                                        Forgot Password?
                                    </Link>
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary login-btn">
                                {isLogin ? 'Log In' : 'Create Account'}
                            </button>

                            <p className="signup-prompt">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                                <button
                                    type="button"
                                    className="signup-link"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}
                                    onClick={() => toggleMode(!isLogin)}
                                >
                                    {isLogin ? 'Sign Up' : 'Log In'}
                                </button>
                            </p>

                            <p className="terms-text">
                                By {isLogin ? 'logging in' : 'creating an account'}, you agree to EventConnect's{' '}
                                <a href="/terms">Terms of Service</a> and{' '}
                                <a href="/privacy">Privacy Policy</a>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerLogin;
