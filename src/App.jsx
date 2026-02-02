import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Customer Pages
import CustomerLogin from './pages/customer/Login';
import Home from './pages/customer/Home';
import CreateEvent from './pages/customer/CreateEvent';
import BrowseServices from './pages/customer/BrowseServices';
import BookingSummary from './pages/customer/BookingSummary';

// Vendor Pages
import VendorLogin from './pages/vendor/Login';
import VendorSignup from './pages/vendor/Signup';
import VendorDashboard from './pages/vendor/Dashboard';
import VendorServices from './pages/vendor/Services';
import VendorBookings from './pages/vendor/Bookings';
import VendorEarnings from './pages/vendor/Earnings';
import VendorProfile from './pages/vendor/Profile';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminSignup from './pages/admin/Signup';
import AdminDashboard from './pages/admin/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to customer login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Customer Routes */}
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/signup" element={<CustomerLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/browse-services" element={<BrowseServices />} />
        <Route path="/booking-summary" element={<BookingSummary />} />

        {/* Vendor Routes */}
        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="/vendor/signup" element={<VendorSignup />} />
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/services" element={<VendorServices />} />
        <Route path="/vendor/bookings" element={<VendorBookings />} />
        <Route path="/vendor/earnings" element={<VendorEarnings />} />
        <Route path="/vendor/profile" element={<VendorProfile />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
