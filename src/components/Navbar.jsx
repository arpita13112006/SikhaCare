import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Info, HeartHandshake } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white border-b border-slate-800 px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-2 font-bold text-xl text-teal-400">
        <HeartHandshake className="w-6 h-6 text-teal-400" />
        <span>SikhaCare</span>
      </div>
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center space-x-1 hover:text-teal-300 transition-colors">
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <Link to="/about" className="flex items-center space-x-1 hover:text-teal-300 transition-colors">
          <Info className="w-4 h-4" />
          <span>About</span>
        </Link>
      </div>
    </nav>
  );
}
