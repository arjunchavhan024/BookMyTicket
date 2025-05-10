import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">Event Explorer</h1>
        <ul className="flex space-x-6">
          <li>
            <a href="#" className="hover:text-gray-200 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-200 transition">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-200 transition">
              User
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
