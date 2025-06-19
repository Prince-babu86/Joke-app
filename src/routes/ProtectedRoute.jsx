import React from "react";
import { useData } from "../Context/Wrapper";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  let { userdata, isloading } = useData();

  if (isloading)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="h-10 w-10 border-3 rounded-full border-t-transparent animate-spin">
          {" "}
        </span>
      </div>
    );
  if (!userdata) return <Navigate to={`/login`} />;
  return children;
};

export default ProtectedRoute;
