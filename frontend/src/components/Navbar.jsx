import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-black font-bold text-sm">N</span>
            </div>
            <span className="text-xl font-semibold bg-gradient from-blue-600 to-purple-600 bg-clip-text text-gray">
              NotesApp
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
