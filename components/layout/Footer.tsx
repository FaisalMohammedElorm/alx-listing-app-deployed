import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="p-6 text-center bg-gray-100 text-gray-600 mt-10">
      <p>© {new Date().getFullYear()} StayFinder. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
