//src app.js

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CookieManager from './components/CookieManager';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Home from './pages/Home';
import Certification from './pages/Certification';
import NewsList from './pages/NewsList';
import NewsDetail from './pages/NewsDetail';
import ProductsControlPanels from './pages/ProductsControlPanels';
import ProductsCables from './pages/ProductsCables';
import ProductsMarkers from './pages/ProductsMarkers';
import ProductsLines from './pages/ProductsLines';
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

          </Route>
        </Routes>
      </Router>

      <CookieManager />

    </>
  );
};

export default App;
