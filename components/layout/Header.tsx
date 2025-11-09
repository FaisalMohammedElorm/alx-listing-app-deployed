import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 shadow-md bg-white">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">StayFinder</div>

      {/* Search bar */}
      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder="Search by location..."
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Nav links */}
      <nav className="flex gap-4 text-gray-700">
        <a href="#">Rooms</a>
        <a href="#">Mansion</a>
        <a href="#">Countryside</a>
      </nav>

      {/* Auth */}
      <div className="flex gap-3">
        <button className="px-4 py-2 border rounded-lg">Sign In</button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
