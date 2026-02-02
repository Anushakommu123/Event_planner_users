import { Plus, Edit2, Trash2, Star } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { services } from '../../data/mockData';
import './Dashboard.css'; // Reuse dashboard layout styles

const VendorServices = () => {
    // Filter services that belong to this vendor (for demo, we'll show a subset or all)
    // In a real app, you'd filter by vendorId
    const vendorServices = services.slice(0, 3);

    return (
        <div className="vendor-dashboard-page">
            <Navbar role="vendor" />

            <main className="dashboard-content">
                <div className="container-wide">
                    <div className="dashboard-header flex-between">
                        <div>
                            <h1>My Services</h1>
                            <p>Manage and showcase your event services</p>
                        </div>
                        <button className="btn btn-primary">
                            <Plus size={20} /> Add New Service
                        </button>
                    </div>

                    <div className="services-grid mt-4">
                        <div className="grid grid-3">
                            {vendorServices.map((service) => (
                                <div key={service.id} className="card service-card">
                                    <div className="service-image-container">
                                        <img src={service.image} alt={service.name} className="service-image" />
                                        <div className="service-status active">Active</div>
                                    </div>
                                    <div className="service-details p-3">
                                        <div className="flex-between mb-1">
                                            <span className="text-sm text-tertiary">{service.category}</span>
                                            <div className="flex-center text-cyan">
                                                <Star size={16} fill="currentColor" />
                                                <span className="text-sm font-bold ml-1">{service.rating}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                                        <p className="text-sm text-secondary mb-3 line-clamp-2">{service.description}</p>

                                        <div className="flex-between mt-4 pt-3 border-t">
                                            <span className="text-xl font-bold text-cyan">{service.priceDisplay}</span>
                                            <div className="flex gap-2">
                                                <button className="icon-button" title="Edit">
                                                    <Edit2 size={18} />
                                                </button>
                                                <button className="icon-button text-error" title="Delete">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
                .services-grid {
                    animation: fadeIn 0.5s ease-out;
                }
                .service-card {
                    padding: 0;
                    overflow: hidden;
                    border: 1px solid var(--border-color);
                }
                .service-image-container {
                    position: relative;
                    height: 200px;
                }
                .service-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .service-status {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    padding: 0.25rem 0.75rem;
                    border-radius: var(--radius-full);
                    font-size: 0.75rem;
                    font-weight: 600;
                    background: white;
                    color: var(--success);
                    box-shadow: var(--shadow-sm);
                }
                .border-t {
                    border-top: 1px solid var(--border-color);
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .icon-button {
                    background: var(--background-light);
                    padding: 0.5rem;
                    border-radius: var(--radius-md);
                    color: var(--text-secondary);
                }
                .icon-button:hover {
                    background: var(--border-color);
                    color: var(--text-primary);
                }
                .icon-button.text-error:hover {
                    background: #FEE2E2;
                    color: var(--error);
                }
                .ml-1 { margin-left: 0.25rem; }
            `}</style>
        </div>
    );
};

export default VendorServices;
