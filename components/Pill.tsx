import React from "react";

interface PillProps {
  label: string;
}

const Pill: React.FC<PillProps> = ({ label }) => {
  return (
    <button className="px-4 py-2 m-1 border rounded-full hover:bg-blue-600 hover:text-white transition">
      {label}
    </button>
  );
};

export default Pill;
