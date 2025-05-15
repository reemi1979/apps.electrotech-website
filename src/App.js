//src app.js

import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import CookieManager from './components/CookieManager';
import Layout from './pages/Layout';

// Lazy load pages
const Home = lazy(() => import('./pages/Home/Home'));
const Quality = lazy(() => import('./pages/Quality/Quality'));
const NewsList = lazy(() => import('./pages/News/NewsList'));
const NewsDetail = lazy(() => import('./pages/News/NewsDetail'));
const ProductsControlPanels = lazy(() => import('./pages/Products/ProductsControlPanels'));
const ProductsCables = lazy(() => import('./pages/Products/ProductsCables'));
const ProductsMarkers = lazy(() => import('./pages/Products/ProductsMarkers'));
const ProductsLines = lazy(() => import('./pages/Products/ProductsLines'));
const PanneauxDeControle = lazy(() => import('./pages/Products/PanneauxDeControle'));
const Services = lazy(() => import('./pages/Services/Services'));
const Achievements = lazy(() => import('./pages/About/Achievements'));
const OurTeam = lazy(() => import('./pages/About/OurTeam'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TrackingProjects = lazy(() => import('./pages/Tracking/TrackingProjects'));
const ContactUs = lazy(() => import('./pages/About/ContactUs'));
const JobList = lazy(() => import('./pages/About/JobList'));
const QuotePage = lazy(() => import('./pages/Quote/QuotePage'));

const App = () => {

    console.log("Website made by Rémi Gauvin - 2025");

    return (
        <>
        <Router basename={process.env.PUBLIC_URL}>
            <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>}>
            <Routes>
                <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/quality" element={<Quality />} />
                <Route path="/news" element={<NewsList />} />
                <Route path="/:slug" element={<NewsDetail />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/products-control-panels" element={<ProductsControlPanels />} />
                <Route path="/products-cables" element={<ProductsCables />} />
                <Route path="/products-markers" element={<ProductsMarkers />} />
                <Route path="/products-lines" element={<ProductsLines />} />
                <Route path="/panneaux-de-controle" element={<PanneauxDeControle />} />
                <Route path="/services/:index" element={<Services />} />
                <Route path="/tracking" element={<TrackingProjects />} />
                <Route path="/tracking/:projectNumber" element={<TrackingProjects />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/our-team" element={<OurTeam />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/jobs" element={<JobList />} />
                <Route path="/quote" element={<QuotePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
            </Suspense>
        </Router>

        <CookieManager />
        </>
    );
};

export default App;

