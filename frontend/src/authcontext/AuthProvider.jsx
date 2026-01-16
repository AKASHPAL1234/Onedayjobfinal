import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenication, setIsAuthenication] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/auth/myprofile",
          { withCredentials: true }
        );
        localStorage.setItem("role",data.user.role);
        setProfile(data.user);
        setIsAuthenication(true);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setIsAuthenication(false);
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/job/all",
          { withCredentials: true }
        );
        setJobs(response.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    fetchProfile();
    fetchJobs();
  }, []);

  return (
    <AuthContext.Provider
      value={{ jobs, profile, isAuthenication, setIsAuthenication }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
