import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Star } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { services } from '../../data/mockData';
import './BrowseServices.css';

const BrowseServices = () => {
    const navigate = useNavigate();
    const [selectedCategories, setSelectedCategories] = useState(['Catering', 'Decoration', 'DJ']);
    const [priceRange, setPriceRange] = useState([100, 5000]);
    const [selectedRatings, setSelectedRatings] = useState(['4 Stars & Up']);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Rating');

    const categories = ['Catering', 'Decoration', 'DJ', 'Photography', 'Venue', 'Entertainment'];
    const ratings = ['5 Stars', '4 Stars & Up', '3 Stars & Up'];

    const toggleCategory = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleAddToEvent = (service) => {
        console.log('Adding service:', service);
        navigate('/booking-summary');
    };

    return (
        <div className="browse-services-page">
            <Navbar role="customer" />

            <main className="browse-content">
                <div className="container-wide">
                    <div className="browse-layout">
                        {/* Sidebar Filters */}
                        <aside className="filters-sidebar">
                            <h3 className="sidebar-title">Filter Options</h3>

                            {/* Service Type */}
                            <div className="filter-section">
                                <button className="filter-header">
                                    <span>Service Type</span>
                                    <ChevronDown size={18} />
                                </button>
                                <div className="filter-content">
                                    {categories.map((category) => (
                                        <label key={category} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => toggleCategory(category)}
                                            />
                                            <span className="checkbox-custom"></span>
                                            <span>{category}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="filter-section">
                                <button className="filter-header">
                                    <span>Price Range</span>
                                    <ChevronDown size={18} />
                                </button>
                                <div className="filter-content">
                                    <input
                                        type="range"
                                        min="100"
                                        max="5000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([100, parseInt(e.target.value)])}
                                        className="price-slider"
                                    />
                                    <div className="price-range-display">
                                        ${priceRange[0]} - ${priceRange[1]}
                                    </div>
                                </div>
                            </div>

                            {/* Ratings */}
                            <div className="filter-section">
                                <button className="filter-header">
                                    <span>Ratings</span>
                                    <ChevronDown size={18} />
                                </button>
                                <div className="filter-content">
                                    {ratings.map((rating) => (
                                        <label key={rating} className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={selectedRatings.includes(rating)}
                                                onChange={() => {
                                                    setSelectedRatings(prev =>
                                                        prev.includes(rating)
                                                            ? prev.filter(r => r !== rating)
                                                            : [...prev, rating]
                                                    );
                                                }}
                                            />
                                            <span className="checkbox-custom"></span>
                                            <span>{rating}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="services-main">
                            {/* Header Banner */}
                            <div className="services-header">
                                <div className="header-content">
                                    <div className="header-icon">
                                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                            <rect width="48" height="48" rx="8" fill="white" opacity="0.2" />
                                            <path d="M24 12L28 20H20L24 12Z" fill="white" />
                                            <rect x="16" y="22" width="16" height="14" rx="2" fill="white" />
                                        </svg>
                                    </div>
                                    <h1>Discover & Book Services for Your Event</h1>
                                </div>
                            </div>

                            {/* Search and Sort */}
                            <div className="services-controls">
                                <div className="search-bar">
                                    <Search size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search services..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <div className="sort-dropdown">
                                    <label>Sort by:</label>
                                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                        <option value="Rating">Rating</option>
                                        <option value="Price: Low to High">Price: Low to High</option>
                                        <option value="Price: High to Low">Price: High to Low</option>
                                        <option value="Most Popular">Most Popular</option>
                                    </select>
                                </div>
                            </div>

                            {/* Services Grid */}
                            <div className="available-services">
                                <h2>Available Services</h2>
                                <div className="services-grid">
                                    {services.map((service) => (
                                        <div key={service.id} className="service-card">
                                            <div className="service-image">
                                                <img src={service.image} alt={service.name} />
                                            </div>
                                            <div className="service-details">
                                                <h3>{service.name}</h3>
                                                <p className="service-vendor">{service.vendor}</p>
                                                <p className="service-description">{service.description}</p>

                                                <div className="service-meta">
                                                    <div className="service-rating">
                                                        <Star size={16} fill="#FFC107" color="#FFC107" />
                                                        <span className="rating-value">{service.rating}</span>
                                                    </div>
                                                    <div className="service-price">
                                                        {service.priceDisplay}
                                                    </div>
                                                </div>

                                                <button
                                                    className="btn btn-primary add-btn"
                                                    onClick={() => handleAddToEvent(service)}
                                                >
                                                    Add to Event
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="pagination">
                                    <button className="page-btn">‹</button>
                                    <button className="page-btn active">1</button>
                                    <button className="page-btn">2</button>
                                    <button className="page-btn">3</button>
                                    <button className="page-btn">›</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BrowseServices;
