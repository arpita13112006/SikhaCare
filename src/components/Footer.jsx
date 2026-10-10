import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-slate-500 text-sm">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <p>© {new Date().getFullYear()} SikhaCare. All rights reserved.</p>
        <p className="text-xs text-slate-600">Built with React, Vite & Tailwind CSS</p>
      </div>
    </footer>
  );
}
