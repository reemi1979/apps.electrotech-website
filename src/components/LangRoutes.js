// src/components/LangRoutes.js
import { Outlet } from 'react-router-dom';
import Layout from '../pages/Layout';

const LangRoutes = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default LangRoutes;