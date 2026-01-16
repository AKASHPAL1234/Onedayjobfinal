


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

