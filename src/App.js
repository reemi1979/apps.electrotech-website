//src app.js

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CookieManager from './components/CookieManager';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Home from './pages/Home/Home';
import Certification from './pages/Certification/Certification';
import NewsList from './pages/News/NewsList';
import NewsDetail from './pages/News/NewsDetail';
import ProductsControlPanels from './pages/Products/ProductsControlPanels';
import ProductsCables from './pages/Products/ProductsCables';
import ProductsMarkers from './pages/Products/ProductsMarkers';
import ProductsLines from './pages/Products/ProductsLines';
import Services from './pages/Services/Services';
import Layout from './pages/Layout';

const App = () => {
  return (
    <>
      
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/certifications" element={<Certification />} />
            <Route path="/news" element={<NewsList />} />
            <Route path="/:slug" element={<NewsDetail />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/products-control-panels" element={<ProductsControlPanels />} />
            <Route path="/products-cables" element={<ProductsCables />} />
            <Route path="/products-markers" element={<ProductsMarkers />} />
            <Route path="/products-lines" element={<ProductsLines />} />
            <Route path="/services/:index" element={<Services />} />
          </Route>
        </Routes>
      </Router>

      <CookieManager />

    </>
  );
};

export default App;
