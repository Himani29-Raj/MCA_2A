import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import StatsCards from './StatsCards';
import Charts from './Charts';
import RecentComplaints from './RecentComplaints';
import MostPurchased from './MostPurchased';
import RecentOrdersTable from './RecentOrdersTable';
import './SupplierDashboard.css'; // Single merged CSS

export default function SupplierDashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <StatsCards />
        <Charts />
        <div className="bottom-sections">
          <RecentComplaints />
          <MostPurchased />
        </div>
        <RecentOrdersTable />
      </div>
    </div>
  );
}
