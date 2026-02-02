import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { eventCategories, featuredServices } from '../../data/mockData';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <Navbar role="customer" />

            <main className="home-content">
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-content">
                        <h1>Plan Your Next Unforgettable Event</h1>
                        <p>Bring your vision to life. Get started today!</p>
                        <button
                            className="btn btn-primary hero-btn"
                            onClick={() => navigate('/create-event')}
                        >
                            <Calendar size={20} />
                            Create New Event
                        </button>
                    </div>
                </section>

                {/* Event Categories */}
                <section className="categories-section">
                    <div className="container-wide">
                        <h2 className="section-title">Explore Event Categories</h2>

                        <div className="categories-grid">
                            {eventCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className="category-card"
                                    onClick={() => navigate('/browse-services')}
                                >
                                    <div className="category-image">
                                        <img src={category.image} alt={category.name} />
                                        <div className="category-overlay"></div>
                                    </div>
                                    <div className="category-content">
                                        <h3>{category.name}</h3>
                                        <p>{category.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Services */}
                <section className="featured-section">
                    <div className="container-wide">
                        <h2 className="section-title">Featured Services</h2>

                        <div className="services-grid">
                            {featuredServices.map((service) => (
                                <div key={service.id} className="service-card">
                                    <div className="service-image">
                                        <img src={service.image} alt={service.name} />
                                    </div>
                                    <div className="service-content">
                                        <h3 className="service-name">{service.name}</h3>
                                        <p className="service-vendor">{service.vendor}</p>
                                        <p className="service-description">{service.description}</p>

                                        <div className="service-footer">
                                            <div className="service-rating">
                                                <span className="rating-star">★</span>
                                                <span className="rating-value">{service.rating}</span>
                                                <span className="rating-reviews">({service.reviews} reviews)</span>
                                            </div>
                                            <div className="service-price">
                                                <span className="price-currency">$</span>
                                                <span className="price-amount">{service.price}</span>
                                                <span className="price-unit">/ {service.priceUnit}</span>
                                            </div>
                                        </div>

                                        <button
                                            className="btn btn-primary service-btn"
                                            onClick={() => navigate('/browse-services')}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="footer">
                <p>© 2026 EventConnect. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
