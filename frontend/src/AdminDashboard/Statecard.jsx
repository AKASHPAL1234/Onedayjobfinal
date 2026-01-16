import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, UserCog, Briefcase, FileWarning } from "lucide-react";
import { BACKENDURL } from "../../utiles";

export default function StatsCards() {
  const [stats, setStats] = useState([
    { title: "Total Users", value: 0, icon: Users, color: "from-blue-500 to-blue-700" },
    { title: "Workers", value: 0, icon: UserCog, color: "from-green-500 to-green-700" },
    { title: "Clients", value: 0, icon: Briefcase, color: "from-purple-500 to-purple-700" },
    { title: "Pending KYCs", value: 0, icon: FileWarning, color: "from-red-500 to-red-700" },
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 👇 apne backend ka API endpoint daalo
        const res = await axios.get(`${BACKENDURL}/api/auth/kyc/stats`);  
        console.log(res.data)

        // maan lo backend se yeh data aata hai:
        // { totalUsers: 120, workers: 80, clients: 40, pendingKycs: 5 }

        setStats((prev) => [
          { ...prev[0], value: res.data.totalUsers },
          { ...prev[1], value: res.data.workers },
          { ...prev[2], value: res.data.clients },
          { ...prev[3], value: res.data.pendingKycs },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300"
          >
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-r ${s.color} flex items-center justify-center mb-4 shadow-md`}
            >
              <Icon className="text-white w-6 h-6" />
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{s.title}</h3>
            <p className="text-3xl font-bold text-gray-800 mt-1">{s.value}</p>
          </div>
        );
      })}
    </div>
  );
}
