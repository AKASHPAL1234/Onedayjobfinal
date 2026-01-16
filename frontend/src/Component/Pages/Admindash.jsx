


import React, { useState } from "react";
import Sidebar from "../../AdminDashboard/Sidebarad";
import Header from "../../AdminDashboard/Header";
import StatsCards from "../../AdminDashboard/Statecard";
import KycTable from "../../AdminDashboard/KycTabel";
import UserTable from "../../AdminDashboard/Usertabel";
import WorkerCode from "../../AdminDashboard/WorkerCode";
import Alljob from "../../AdminDashboard/Alljobad";

export default function AdminDashboard() {
  const [component, setComponent] = useState("Stats");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar component={component} setComponent={setComponent} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        <div className="p-6">
          {component === "Stats" ? (
            <StatsCards />
          ) : component === "KYC Requests" ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Pending KYC Requests
              </h2>
              <KycTable />
            </div>
          ) : component === "Users" ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                All Users
              </h2>
              <UserTable />
            </div>
           ) : component === "find by Worker-Code" ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                All Users
              </h2>
              <WorkerCode/>
            </div>
          ) : component==="manage Jobs"? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                All Users
              </h2>
              <Alljob/>
            </div>
          ): null}
        </div>
      </div>
    </div>
  );
}
