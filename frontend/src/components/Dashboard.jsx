import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../pages/global/Layout';
import Fresh from '../pages/Dashboard/Fresh';
import Mursik from '../pages/Dashboard/Mursik';
import FreshRecords from '../pages/Dashboard/FreshRecords';
import MursikRecords from '../pages/Dashboard/MursikRecords';
import UpdateFreshRecord from '../pages/Dashboard/UpdateFreshRecord';
import UpdateMursikRecord from '../pages/Dashboard/UpdateMursikRecord';

const Dashboard = () => {
  return (
    <Layout>
      <Routes>
        {/* Redirect from /dashboard to /dashboard/fresh */}
        <Route path="/" element={<Navigate to="/dashboard/fresh" />} />
        <Route path="/fresh" element={<Fresh />} />
        <Route path="/freshrecords" element={<FreshRecords />} />
        <Route path="/mursik" element={<Mursik />} />
        <Route path="/mursikrecords" element={<MursikRecords />} />
        <Route path="/updatefresh/:id" element={<UpdateFreshRecord />} />
        <Route path="/updatemursik/:id" element={<UpdateMursikRecord />} />
      </Routes>
    </Layout>
  );
}

export default Dashboard;
