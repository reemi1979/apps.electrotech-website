import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CookieManager from './components/CookieManager';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Home from './pages/Home';
import Layout from './pages/Layout';

const App = () => {
  return (
    <>
      
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            

            <Route path="/politique-de-confidentialite" element={<PrivacyPolicy />} />
          </Route>
        </Routes>
      </Router>

      <CookieManager />

    </>
  );
};

export default App;
