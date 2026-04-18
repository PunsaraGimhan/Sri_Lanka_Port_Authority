import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

import Dashboard from './Pages/Dashboard1/Dashboard';

import Rack from './Pages/RackForm1/RackForm';
import RackDash from "./Pages/RackDashboard/RackDash";

import Asset from './Pages/AssetForm1/AssetForm';
import AssetDash from "./Pages/AssetDashboard/AssetDash";

import AssetType from './Pages/AssetTypeForm1/AssetTypeForm';
import AssetTypDash from "./Pages/AssetTypeDashboard/AssetTypDash";

import Sidebar from './Components/Side/Sidebar';
import Logging from './Pages/Logging1/Logging';
import "./App.css";

const Layout = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === "/Logging";

  return (
    <div style={{ display: "flex" }}>
      {!hideSidebar && <Sidebar />}
      <div style={{ flex: 1, padding: 0, overflow: "hidden" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/Logging" />} />
          <Route path="/Logging" element={<Logging />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/RackForm" element={<Rack />} />
          <Route path="/AssetForm" element={<Asset />} />
          <Route path="/AssetTypeForm" element={<AssetType />} />
          <Route path="/AssetDash" element={<AssetDash />} />
          <Route path="/AssetTypeDash" element={<AssetTypDash />} />
          <Route path="/RackDash" element={<RackDash />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
