import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../pages/global/Layout';
import Fresh from '../pages/Dashboard/Fresh';
import Mursik from '../pages/Dashboard/Mursik';
import FreshRecords from '../pages/Dashboard/FreshRecords';
import MursikRecords from '../pages/Dashboard/MursikRecords';
import UpdateFreshRecord from '../pages/Dashboard/UpdateFreshRecord';
import UpdateMursikRecord from '../pages/Dashboard/UpdateMursikRecord';
import Expenses from '../pages/Dashboard/Expenses';
import DailyRecords from '../pages/Dashboard/DailyRecords';
import DailyReportsRecords from '../pages/Dashboard/DailyReportsRecords';
import UpdateDailyReportRecord from '../pages/Dashboard/UpdateDailyReportRecord';

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
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/dailyrecords" element={<DailyRecords />} />
        <Route path="/dailyreportrecords" element={<DailyReportsRecords />} />
        <Route path="/updatedailyreport/:id" element={<UpdateDailyReportRecord />} />
      </Routes>
    </Layout>
  );
}

export default Dashboard;
