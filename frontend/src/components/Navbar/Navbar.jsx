import React from 'react';
import cam from '../../assets/cam.png';
import { Link } from 'react-router-dom';
import { RiNotification3Fill } from "react-icons/ri";
import { MdDarkMode } from "react-icons/md";
import { IoPersonCircleOutline } from "react-icons/io5";

const Navbar = ({ variant }) => {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 border-b border-gray-200 bg-white z-50 ">
      {/* Logo Section */}
      <div className="flex items-center space-x-0">
        <img src={cam} className="w-18 h-18 m-[-4px]" alt="logo" />
        <span className="text-2xl font-bold text-gray-900 relative right-2">Listify</span>
      </div>

      {/* Navigation Links */}
      {variant === 'default' && (
        <nav className="flex space-x-10 px-3">
          <Link to="about" className="text-gray-700 hover:text-blue-600 font-medium">
            About Us
          </Link>
          <Link to="contacts" className="text-gray-700 hover:text-blue-600 font-medium">
            Contact Us
          </Link>
        </nav>
      )}

      {variant === 'main' && (
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <MdDarkMode size={21} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <RiNotification3Fill size={20} />
          </button>
          <IoPersonCircleOutline size={25} />
        </div>
      )}
    </header>
  );
};

export default Navbar;
