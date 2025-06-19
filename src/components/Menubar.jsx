// components/BottomNavBar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaPlusSquare,
  FaUser,
  FaBell,
  FaSearch,
} from 'react-icons/fa';

const BottomNavBar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed menubar bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-inner z-50">
      <div className="flex justify-around items-center py-4 text-gray-500 text-3xl">
        <Link to="/" className={isActive('/') ? 'text-pink-600' : ''}>
          <FaHome />
        </Link>
        <Link to="/search" className={isActive('/search') ? 'text-pink-600' : ''}>
          <FaSearch />
        </Link>
        <Link to="/create" className={isActive('/create') ? 'text-pink-600' : ''}>
          <FaPlusSquare />
        </Link>
        <Link to="/notifications" className={isActive('/notifications') ? 'text-pink-600' : ''}>
          <FaBell />
        </Link>
        <Link to="/profile" className={isActive('/profile') ? 'text-pink-600' : ''}>
          <FaUser />
        </Link>
      </div>
    </div>
  );
};

export default BottomNavBar;
