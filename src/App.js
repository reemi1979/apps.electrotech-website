
//src/app.js

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect, useState } from 'react';
import Layout from './pages/Layout';
import LoadingScreen from './components/LoadingScreen';
// Lazy load CookieManager pour améliorer LCP
const CookieManager = lazy(() => import('./components/CookieManager'));

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
const CustomerPartShippingForm = lazy(() => import('./pages/Customer/CustomerPartShippingForm'));
const VideoShowcase = lazy(() => import('./pages/VideoShowcase/VideoShowcase'));


const App = () => {
  const [showCookies, setShowCookies] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCookies(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Routes avec /fr ou /en */}
            <Route path="/:lang" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="quality" element={<Quality />} />
              <Route path="news" element={<NewsList />} />
              <Route path="news/:slug" element={<NewsDetail />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="products-control-panels" element={<ProductsControlPanels />} />
              <Route path="boites-a-boutons" element={<ProductsControlPanels />} />
              <Route path="boitier-control-industriel" element={<ProductsControlPanels />} />
              <Route path="products-cables" element={<ProductsCables />} />
              <Route path="products-markers" element={<ProductsMarkers />} />
              <Route path="products-lines" element={<ProductsLines />} />
              <Route path="panneaux-de-controle" element={<PanneauxDeControle />} />
              <Route path="services" element={<Services />} />
              <Route path="services/:index" element={<Services />} />
              <Route path="services/assemblage-de-boitiers" element={<Services />} />
              <Route path="services/conception-électrique" element={<Services />} />
              <Route path="services/assemblage-machine" element={<Services />} />
              <Route path="services/percage-cabinet" element={<Services />} />
              <Route path="services/programmation" element={<Services />} />
              <Route path="tracking" element={<TrackingProjects />} />
              <Route path="tracking/:projectNumber" element={<TrackingProjects />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="our-team" element={<OurTeam />} />
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="jobs" element={<JobList />} />
              <Route path="quote" element={<QuotePage />} />
              <Route path="customer-part-shipping" element={<CustomerPartShippingForm />} />
              <Route path="video-showcase" element={<VideoShowcase />} />
              <Route path="industrial-control-panel"   element={<ProductsControlPanels />} />
              <Route path="industrial-control-panels"  element={<ProductsControlPanels />} />
              <Route path="panel-builder"              element={<ProductsControlPanels />} />

              {/* SEO - Panneaux de contrôle / Control panels */}
              <Route path="panneau-de-controle" element={<ProductsControlPanels />} />
              <Route path="panneau-de-controle-industriel" element={<ProductsControlPanels />} />
              <Route path="boitier-de-controle" element={<ProductsControlPanels />} />
              <Route path="boitier-electrique" element={<ProductsControlPanels />} />
              <Route path="coffret-de-controle" element={<ProductsControlPanels />} />
              <Route path="coffret-electrique" element={<ProductsControlPanels />} />
              <Route path="fabricant-de-panneaux" element={<ProductsControlPanels />} />
              <Route path="integration-de-panneaux" element={<ProductsControlPanels />} />
              <Route path="assemblage-de-panneaux" element={<ProductsControlPanels />} />
              <Route path="boites-a-boutons" element={<ProductsControlPanels />} /> {/* déjà existante */}

              <Route path="control-panel" element={<ProductsControlPanels />} />
              <Route path="industrial-control-panel" element={<ProductsControlPanels />} />
              <Route path="electrical-enclosure" element={<ProductsControlPanels />} />
              <Route path="industrial-enclosure" element={<ProductsControlPanels />} />
              <Route path="custom-control-panels" element={<ProductsControlPanels />} />
              <Route path="panel-builder" element={<ProductsControlPanels />} />
              <Route path="push-button-boxes" element={<ProductsControlPanels />} />
              <Route path="ul508a-panels" element={<ProductsControlPanels />} />
              <Route path="control-panel-manufacturer" element={<ProductsControlPanels />} />

              {/* SEO - Automatisation / Automation */}
              <Route path="automatisation" element={<Services />} />
              <Route path="systeme-automatique" element={<Services />} />
              <Route path="automatisation-industrielle" element={<Services />} />
              <Route path="programmation-automate" element={<Services />} />
              <Route path="plc" element={<Services />} />
              <Route path="automate-programmable" element={<Services />} />
              <Route path="solution-automatisee" element={<Services />} />
              <Route path="robotisation" element={<Services />} />

              <Route path="automation" element={<Services />} />
              <Route path="industrial-automation" element={<Services />} />
              <Route path="plc-programming" element={<Services />} />
              <Route path="automated-system" element={<Services />} />
              <Route path="custom-automation" element={<Services />} />
              <Route path="automated-control" element={<Services />} />

              {/* SEO - Services spécialisés */}
              <Route path="conception-electrique" element={<Services />} />
              <Route path="plan-electrique" element={<Services />} />
              <Route path="schema-electrique" element={<Services />} />
              <Route path="dessin-electrique" element={<Services />} />
              <Route path="cablage-industriel" element={<Services />} />
              <Route path="cablage-de-panneau" element={<Services />} />
              <Route path="installation-electrique-industrielle" element={<Services />} />
              <Route path="integration-electrique" element={<Services />} />

              <Route path="electrical-design" element={<Services />} />
              <Route path="electrical-drawing" element={<Services />} />
              <Route path="industrial-wiring" element={<Services />} />
              <Route path="panel-wiring" element={<Services />} />
              <Route path="electrical-installation" element={<Services />} />
              <Route path="electrical-integration" element={<Services />} />


            </Route>

            {/* Routes sans préfixe */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="quality" element={<Quality />} />
              <Route path="news" element={<NewsList />} />
              <Route path="news/:slug" element={<NewsDetail />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="products-control-panels" element={<ProductsControlPanels />} />
              <Route path="boites-a-boutons" element={<ProductsControlPanels />} />
              <Route path="boitier-control-industriel" element={<ProductsControlPanels />} />
              <Route path="products-cables" element={<ProductsCables />} />
              <Route path="products-markers" element={<ProductsMarkers />} />
              <Route path="products-lines" element={<ProductsLines />} />
              <Route path="panneaux-de-controle" element={<PanneauxDeControle />} />
              <Route path="services" element={<Services />} />
              <Route path="services/:index" element={<Services />} />
              <Route path="services/assemblage-de-boitiers" element={<Services />} />
              <Route path="services/conception-électrique" element={<Services />} />
              <Route path="services/assemblage-machine" element={<Services />} />
              <Route path="services/percage-cabinet" element={<Services />} />
              <Route path="services/programmation" element={<Services />} />
              <Route path="tracking" element={<TrackingProjects />} />
              <Route path="tracking/:projectNumber" element={<TrackingProjects />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="our-team" element={<OurTeam />} />
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="jobs" element={<JobList />} />
              <Route path="quote" element={<QuotePage />} />
              <Route path="customer-part-shipping" element={<CustomerPartShippingForm />} />
              <Route path="video-showcase" element={<VideoShowcase />} />

              {/* SEO - Panneaux de contrôle / Control panels */}
              <Route path="panneau-de-controle" element={<ProductsControlPanels />} />
              <Route path="panneau-de-controle-industriel" element={<ProductsControlPanels />} />
              <Route path="boitier-de-controle" element={<ProductsControlPanels />} />
              <Route path="boitier-electrique" element={<ProductsControlPanels />} />
              <Route path="coffret-de-controle" element={<ProductsControlPanels />} />
              <Route path="coffret-electrique" element={<ProductsControlPanels />} />
              <Route path="fabricant-de-panneaux" element={<ProductsControlPanels />} />
              <Route path="integration-de-panneaux" element={<ProductsControlPanels />} />
              <Route path="assemblage-de-panneaux" element={<ProductsControlPanels />} />
              <Route path="boites-a-boutons" element={<ProductsControlPanels />} /> {/* déjà existante */}

              <Route path="control-panel" element={<ProductsControlPanels />} />
              <Route path="industrial-control-panel" element={<ProductsControlPanels />} />
              <Route path="electrical-enclosure" element={<ProductsControlPanels />} />
              <Route path="industrial-enclosure" element={<ProductsControlPanels />} />
              <Route path="custom-control-panels" element={<ProductsControlPanels />} />
              <Route path="panel-builder" element={<ProductsControlPanels />} />
              <Route path="push-button-boxes" element={<ProductsControlPanels />} />
              <Route path="ul508a-panels" element={<ProductsControlPanels />} />
              <Route path="control-panel-manufacturer" element={<ProductsControlPanels />} />

              {/* SEO - Automatisation / Automation */}
              <Route path="automatisation" element={<Services />} />
              <Route path="systeme-automatique" element={<Services />} />
              <Route path="automatisation-industrielle" element={<Services />} />
              <Route path="programmation-automate" element={<Services />} />
              <Route path="plc" element={<Services />} />
              <Route path="automate-programmable" element={<Services />} />
              <Route path="solution-automatisee" element={<Services />} />
              <Route path="robotisation" element={<Services />} />

              <Route path="automation" element={<Services />} />
              <Route path="industrial-automation" element={<Services />} />
              <Route path="plc-programming" element={<Services />} />
              <Route path="automated-system" element={<Services />} />
              <Route path="custom-automation" element={<Services />} />
              <Route path="automated-control" element={<Services />} />

              {/* SEO - Services spécialisés */}
              <Route path="conception-electrique" element={<Services />} />
              <Route path="plan-electrique" element={<Services />} />
              <Route path="schema-electrique" element={<Services />} />
              <Route path="dessin-electrique" element={<Services />} />
              <Route path="cablage-industriel" element={<Services />} />
              <Route path="cablage-de-panneau" element={<Services />} />
              <Route path="installation-electrique-industrielle" element={<Services />} />
              <Route path="integration-electrique" element={<Services />} />

              <Route path="electrical-design" element={<Services />} />
              <Route path="electrical-drawing" element={<Services />} />
              <Route path="industrial-wiring" element={<Services />} />
              <Route path="panel-wiring" element={<Services />} />
              <Route path="electrical-installation" element={<Services />} />
              <Route path="electrical-integration" element={<Services />} />

            </Route>
          </Routes>
        </Suspense>
      </Router>

      {showCookies && (
        <Suspense fallback={null}>
          <CookieManager />
        </Suspense>
      )}
    </>
  );
};

export default App;
