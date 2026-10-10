import React from 'react';
import logoImg from '../assets/logo.png';

export function SakhiLogo({ size = "medium" }) {
  const sizeClasses = {
    small: "w-12 h-12",
    medium: "w-16 h-16",
    large: "w-24 h-24"
  };

  return (
    <div className={`relative ${sizeClasses[size]} rounded-[28px] bg-white shadow-md border border-[#FFF0FA]/60 overflow-hidden flex items-center justify-center p-1 shrink-0`}>
      <img
        src={logoImg}
        alt="Sakhi Care Logo"
        className="w-full h-full object-cover rounded-[24px]"
      />
    </div>
  );
}

export default SakhiLogo;
