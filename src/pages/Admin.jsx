import React from "react";
import Sidebar from "./components/admin/Sidebar";


function Admin() {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        {/* Groupe 1 de SummaryCards */}
        <div className="summary-card-row">
        </div>
      </div>
    </div>
  );
}

export default Admin;