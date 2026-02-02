import { User, Mail, Phone, MapPin, Building, Shield } from 'lucide-react';
import Navbar from '../../components/Navbar';
import './Dashboard.css';

const VendorProfile = () => {
    return (
        <div className="vendor-dashboard-page">
            <Navbar role="vendor" />

            <main className="dashboard-content">
                <div className="container-wide">
                    <div className="dashboard-header">
                        <h1>Vendor Profile</h1>
                        <p>Manage your business information and settings</p>
                    </div>

                    <div className="grid grid-3">
                        <div className="card col-span-2">
                            <div className="profile-section-header">
                                <h2>Business Information</h2>
                                <button className="btn btn-secondary btn-sm">Edit</button>
                            </div>

                            <div className="profile-form mt-4">
                                <div className="profile-field mb-4">
                                    <label>Business Name</label>
                                    <div className="field-value-wrapper">
                                        <Building size={18} />
                                        <span>Culinary Masterpieces</span>
                                    </div>
                                </div>
                                <div className="grid grid-2">
                                    <div className="profile-field mb-4">
                                        <label>Email Address</label>
                                        <div className="field-value-wrapper">
                                            <Mail size={18} />
                                            <span>contact@culinarymasterpieces.com</span>
                                        </div>
                                    </div>
                                    <div className="profile-field mb-4">
                                        <label>Phone Number</label>
                                        <div className="field-value-wrapper">
                                            <Phone size={18} />
                                            <span>+1 (555) 123-4567</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-field">
                                    <label>Business Address</label>
                                    <div className="field-value-wrapper">
                                        <MapPin size={18} />
                                        <span>123 Culinary Lane, Foodie City, FC 54321</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-col gap-4">
                            <div className="card">
                                <h2>Security</h2>
                                <div className="security-item mb-3">
                                    <div className="flex-between">
                                        <div className="flex-center gap-2">
                                            <Shield size={18} className="text-cyan" />
                                            <span className="font-medium">Password</span>
                                        </div>
                                        <button className="text-cyan text-sm font-bold">Change</button>
                                    </div>
                                    <p className="text-xs text-secondary mt-1">Last changed 3 months ago</p>
                                </div>
                            </div>

                            <div className="card">
                                <h2>Account Status</h2>
                                <div className="status-indicator active">
                                    <div className="indicator-dot"></div>
                                    <span>Verified Vendor</span>
                                </div>
                                <p className="text-sm text-secondary mt-2">
                                    Your account is in good standing. You are eligible for the Top Vendor program.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
                .col-span-2 {
                    grid-column: span 2;
                }
                .profile-section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid var(--border-color);
                    padding-bottom: 1rem;
                }
                .profile-field label {
                    display: block;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    color: var(--text-tertiary);
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                }
                .field-value-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: var(--background-light);
                    border-radius: var(--radius-md);
                    color: var(--text-primary);
                }
                .status-indicator {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    border-radius: var(--radius-full);
                    font-weight: 600;
                    font-size: 0.9rem;
                }
                .status-indicator.active {
                    background: #D1FAE5;
                    color: #065F46;
                }
                .indicator-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: currentColor;
                }
                @media (max-width: 768px) {
                    .col-span-2 {
                        grid-column: span 1;
                    }
                }
            `}</style>
        </div>
    );
};

export default VendorProfile;
