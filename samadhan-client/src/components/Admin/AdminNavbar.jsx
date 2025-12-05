import React from "react";

const Navbar = () => {
  return (
    <div className="w-full flex items-center justify-between px-6 py-4 shadow bg-white">
      <div className="flex items-center gap-3">
        <div className="text-blue-600 text-3xl font-bold">🏛️</div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Samadhan</h1>
          <p className="text-sm text-gray-500">Admin Portal</p>
        </div>
      </div>

      <button className="flex items-center gap-2 text-gray-700 hover:text-red-600">
        <span>⎋</span> Logout
      </button>
    </div>
  );
};

export default Navbar;