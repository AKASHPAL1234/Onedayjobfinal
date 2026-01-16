import Hero from "./Component/Pages/Hero";
import Navbar from "./Component/Navbar"
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Component/Pages/Login";
import Register from "./Component/Pages/Register";
import ResetPassword from "./Component/Pages/Resetpass";
import Help from "./Component/Pages/Help";
import Dashboard from "./Component/Pages/Dashboard";
import PostJob from "./Dashboard copy/Postjob";
import Home from "./Component/Pages/Home";
import AdminDashboard from "./Component/Pages/Admindash";
import KycForm from "./Component/Kyc";
import ServicesSection from "./Component/Pages/Services";
import ProfilePage from "./Component/Pages/Profile";
import "./i18n";
import Footer from "./Component/Fotter";





function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/register", "/login","/admindash","/*"].includes(location.pathname);
  return (
    <>
     {!hideNavbarFooter && <Navbar />}
    <Routes>  

      
       <Route path="/" element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/resetpassword" element={<ResetPassword/>} />
       <Route path="/register" element={<Register />} />
       <Route path="/help" element={<Help/>} />
       <Route path="/postJob" element={<PostJob/>} />
       <Route path="/home" element={<Home/>}/>
       <Route path="/services" element={<ServicesSection/>}/>
       <Route path="/profile" element={<ProfilePage/>}/>
       <Route path="/dashboard" element={<Dashboard/>} />
       <Route path="/admindash" element={<AdminDashboard/>} />
       <Route path="/kyc" element={<KycForm/>} />


       

    </Routes>
     {!hideNavbarFooter && <Footer />}
   

 
    </>
  );
}

export default App;
