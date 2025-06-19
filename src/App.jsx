import React from "react";
import SignupPage from "./pages/SignupPage";
import MainRoutes from "./routes/MainRoutes";
import Sidebar from "./components/Sidebar";
import Menubar from "./components/Menubar"
import { useLocation } from "react-router-dom";
import { useData } from "./Context/Wrapper";

const App = () => {


  const location = useLocation()
  let show = location.pathname === "/signup" || location.pathname === "/login" || location.pathname === "/create" 
  
 let {userdata , isloading} =  useData()
  return (
    <div className=" w-full h-screen">
      <div className="flex">
    <div className="for-mobile">  {show ? "" :   <Sidebar />}</div>
    {userdata && !isloading ? <Menubar/> : ""}
         <div className={`w-full  ${show ? "ml-0 py-0 for-mobile" : "ml-72  for-mobile"}`} >
        <MainRoutes />
      </div>
      </div>

     
    </div>
  );
};

export default App;
