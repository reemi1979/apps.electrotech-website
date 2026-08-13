import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './pages/Layout';
import LoadingScreen from './components/LoadingScreen';

const Home = lazy(() => import('./pages/Home/Home'));
const TrackingProjects = lazy(() => import('./pages/Tracking/TrackingProjects'));
const QuotePage = lazy(() => import('./pages/Quote/QuotePage'));
const ContactUs = lazy(() => import('./pages/About/ContactUs'));
const CustomerPartShippingForm = lazy(() => import('./pages/Customer/CustomerPartShippingForm'));

const App = () => (
  <Router>
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tracking" element={<TrackingProjects />} />
          <Route path="quote" element={<QuotePage />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="customer-part-shipping" element={<CustomerPartShippingForm />} />
        </Route>
        <Route path="/en" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tracking" element={<TrackingProjects />} />
          <Route path="quote" element={<QuotePage />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="customer-part-shipping" element={<CustomerPartShippingForm />} />
        </Route>
        <Route path="/fr" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tracking" element={<TrackingProjects />} />
          <Route path="quote" element={<QuotePage />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="customer-part-shipping" element={<CustomerPartShippingForm />} />
        </Route>
      </Routes>
    </Suspense>
  </Router>
);

export default App;
