// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CmsProvider } from './context/CmsContext';

// Public Components
import Header from './components/Header';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import SearchModal from './components/SearchModal';
import FloatingDock from './components/FloatingDock';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Industries from './pages/Industries';
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';
import BlogListing from './pages/BlogListing';
import BlogDetail from './pages/BlogDetail';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';

// Admin CMS Components & Pages
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLayout from './admin/components/AdminLayout';
import Login from './admin/pages/Login';
import DashboardOverview from './admin/pages/DashboardOverview';
import PagesManager from './admin/pages/PagesManager';
import ProjectsManager from './admin/pages/ProjectsManager';
import ServicesManager from './admin/pages/ServicesManager';
import IndustriesManager from './admin/pages/IndustriesManager';
import GalleryManager from './admin/pages/GalleryManager';
import BlogManager from './admin/pages/BlogManager';
import MediaLibrary from './admin/pages/MediaLibrary';
import InquiriesManager from './admin/pages/InquiriesManager';
import SettingsManager from './admin/pages/SettingsManager';
import SecurityManager from './admin/pages/SecurityManager';
import ActivityLogs from './admin/pages/ActivityLogs';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Public modals state
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState('Ultra Low Sulfur Diesel (10ppm)');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleOpenQuote = (product = 'Ultra Low Sulfur Diesel (10ppm)') => {
    if (product) {
      setQuoteProduct(product);
    }
    setIsQuoteOpen(true);
  };

  const handleCloseQuote = () => setIsQuoteOpen(false);
  const handleOpenSearch = () => setIsSearchOpen(true);
  const handleCloseSearch = () => setIsSearchOpen(false);

  // If in Admin route, render Admin views without public header/footer
  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="pages" element={<PagesManager />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="industries" element={<IndustriesManager />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="blog" element={<BlogManager />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="inquiries" element={<InquiriesManager />} />
          <Route path="settings" element={<SettingsManager />} />
          <Route path="security" element={<SecurityManager />} />
          <Route path="activity" element={<ActivityLogs />} />
        </Route>
      </Routes>
    );
  }

  // Public Website Layout
  return (
    <div className="app-layout">
      <Header onOpenQuote={handleOpenQuote} onOpenSearch={handleOpenSearch} />

      <Routes>
        <Route path="/" element={<Home onOpenQuote={handleOpenQuote} />} />
        <Route path="/about" element={<About onOpenQuote={handleOpenQuote} />} />
        <Route path="/services" element={<Services onOpenQuote={handleOpenQuote} />} />
        <Route path="/industries" element={<Industries onOpenQuote={handleOpenQuote} />} />
        <Route path="/projects" element={<Projects onOpenQuote={handleOpenQuote} />} />
        <Route path="/our-projects" element={<Projects onOpenQuote={handleOpenQuote} />} />
        <Route path="/contact" element={<Contact onOpenQuote={handleOpenQuote} />} />
        <Route path="/gallery" element={<Gallery onOpenQuote={handleOpenQuote} />} />
        <Route path="/blog" element={<BlogListing onOpenQuote={handleOpenQuote} />} />
        <Route path="/blog/:slug" element={<BlogDetail onOpenQuote={handleOpenQuote} />} />
        <Route path="/blog-details" element={<BlogDetail onOpenQuote={handleOpenQuote} />} />
        <Route path="/services/:id" element={<ServiceDetail onOpenQuote={handleOpenQuote} />} />
        <Route path="/industries/:id" element={<ServiceDetail onOpenQuote={handleOpenQuote} />} />
        <Route path="/sectors" element={<Navigate to="/industries" replace />} />

        {/* Clean URL redirects to strip .html */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/about.html" element={<Navigate to="/about" replace />} />
        <Route path="/services.html" element={<Navigate to="/services" replace />} />
        <Route path="/industries.html" element={<Navigate to="/industries" replace />} />
        <Route path="/projects.html" element={<Navigate to="/projects" replace />} />
        <Route path="/our-projects.html" element={<Navigate to="/projects" replace />} />
        <Route path="/gallery.html" element={<Navigate to="/gallery" replace />} />
        <Route path="/contact.html" element={<Navigate to="/contact" replace />} />
        <Route path="/blog.html" element={<Navigate to="/blog" replace />} />
        <Route path="/blog-details.html" element={<Navigate to="/blog" replace />} />
        <Route path="/sectors.html" element={<Navigate to="/industries" replace />} />

        <Route path="*" element={<Home onOpenQuote={handleOpenQuote} />} />
      </Routes>

      <Footer onOpenQuote={handleOpenQuote} />

      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={handleCloseQuote}
        initialProduct={quoteProduct}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={handleCloseSearch}
        onSelectProduct={handleOpenQuote}
      />

      <FloatingDock />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CmsProvider>
        <AppContent />
      </CmsProvider>
    </AuthProvider>
  );
}
