import React, { useEffect, useState } from "react";
import { FiHome, FiSend, FiCompass, FiUser, FiLogOut, FiPlus } from "react-icons/fi";
import { useData } from "../Context/Wrapper";
import { auth } from "../firebase/firebase.config";
import { logoutUser } from "../api/Logout";
import { Link } from "react-router-dom";
auth;

const Sidebar = () => {
  let { userdata, isloading } = useData();
  const [loader, setloader] = useState(false)
  

  return (
    <div className="h-screen w-64 sidebar bg-white border-r flex flex-col justify-between fixed top-0 left-0 shadow-md">
      {/* Top: Logo and Nav */}
      <div>
        <div className="px-6 py-4 text-2xl font-bold text-pink-600 border-b">
          InstaClone
        </div>

        <nav className="flex flex-col mt-6 space-y-4 px-6 text-gray-700 text-base">
          <Link to={`/`} className="flex items-center gap-3 cursor-pointer hover:text-pink-500">
            <FiHome /> Home
          </Link>
          <div className="flex items-center gap-3 cursor-pointer hover:text-pink-500">
            <FiSend /> Messages
          </div>
           <div className="flex items-center gap-3 cursor-pointer hover:text-pink-500">
            <FiUser /> Profile
          </div>
          <Link to={`/create`} className="flex items-center gap-3 cursor-pointer hover:text-pink-500">
            <FiPlus /> Create
          </Link>
          <Link to={`/profile`} className="flex items-center gap-3 cursor-pointer hover:text-pink-500">
            <FiUser /> Profile
          </Link>
        </nav>
      </div>

      {/* Bottom: User Info and Logout */}

      {userdata && !isloading ? (
        <div className="p-6 border-t">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={userdata.image}
              alt="user"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-gray-800">{userdata.name}</div>
              <div className="text-sm text-gray-500">
                @{userdata.newusername}
              </div>
            </div>
          </div>

          {!loader ? <button
            onClick={logoutUser}
            className="flex items-center gap-2 text-red-500 cursor-pointer hover:text-red-600 text-sm"
          >
            <FiLogOut />
            Logout
          </button> : ""}
        </div>
      ) : (
        <div className="p-6 border-t flex items-center justify-center">
          <span className="h-6 w-6 border-3 rounded-full border-t-transparent animate-spin">
            {" "}
          </span>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
