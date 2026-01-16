



import { useState } from "react";
import Sidebar from "../../Dashboard copy/Sidebar";
import AllJob from "../../Dashboard copy/Alljob";
import MyProfile from "../../Dashboard copy/MyProfile";
import PostJob from "../../Dashboard copy/Postjob";
import UpdateJob from "../../Dashboard copy/Updatejob";

function Dashboard() {
  const [component, setComponent] = useState("AllJob");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar component={component} setComponent={setComponent} />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-50">
        {component === "AllJob" && <AllJob />}
        {component === "PostJob" && <PostJob />}
        {component === "UpdateJob" && <UpdateJob />}
        {component === "MyProfile" && <MyProfile />}
      </div>
    </div>
  );
}

export default Dashboard;
