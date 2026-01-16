// import React from "react";
// import { Home, Users, FileText, LogOut } from "lucide-react";

// export default function Sidebar() {
//   return (
//     <div className="w-64 bg-blue-900 text-white min-h-screen p-4">
//       <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
//       <ul className="space-y-4">
//         <li className="flex items-center space-x-2 cursor-pointer hover:text-gray-300">
//           <Home /> <span>Dashboard</span>
//         </li>
//         <li className="flex items-center space-x-2 cursor-pointer hover:text-gray-300">
//           <FileText /> <span>KYC Requests</span>
//         </li>
//         <li className="flex items-center space-x-2 cursor-pointer hover:text-gray-300">
//           <Users /> <span>Users</span>
//         </li>
//         <li className="flex items-center space-x-2 cursor-pointer hover:text-gray-300">
//           <LogOut /> <span>Logout</span>
//         </li>
//       </ul>
//     </div>
//   );
// }



import React from "react";

export default function Sidebarad({ component, setComponent }) {
  const menuItems = ["Stats", "KYC Requests", "Users","find by Worker-Code","manage Jobs"];

  return (
    <aside className="w-64 bg-indigo-700 text-white shadow-lg min-h-screen">
      <div className="p-6 text-2xl font-bold">Admin Panel</div>
      <nav className="mt-4">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setComponent(item)}
            className={`block w-full text-left px-6 py-3 hover:bg-indigo-600 ${
              component === item ? "bg-indigo-600" : ""
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}

