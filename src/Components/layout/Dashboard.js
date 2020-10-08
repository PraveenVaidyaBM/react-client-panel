import React from "react";
import Clients from "../clients/Client";
import Sidebar from "../layout/Sidebar";

export default function Dashboard() {
  return (
    <div>
      <div className="row">
        <div className="col-md-10">
          <Clients />
        </div>
        <div className="col-md-2">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
