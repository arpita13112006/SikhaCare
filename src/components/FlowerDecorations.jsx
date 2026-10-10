import React from 'react';

export function FlowerIcon({ className = "w-10 h-10" }) {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 5 Petals */}
      <circle cx="30" cy="14" r="11" fill="#FFF0FA" />
      <circle cx="45" cy="25" r="11" fill="#FFF0FA" />
      <circle cx="39" cy="43" r="11" fill="#FFF0FA" />
      <circle cx="21" cy="43" r="11" fill="#FFF0FA" />
      <circle cx="15" cy="25" r="11" fill="#FFF0FA" />
      {/* Flower Center */}
      <circle cx="30" cy="30" r="9" fill="#B26BA6" />
    </svg>
  );
}

export default function FlowerDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-80">
      <FlowerIcon className="absolute top-4 left-4 w-12 h-12 transform -rotate-12" />
      <FlowerIcon className="absolute top-12 right-6 w-10 h-10 transform rotate-45" />
      <FlowerIcon className="absolute top-1/3 -left-4 w-14 h-14 transform rotate-15" />
      <FlowerIcon className="absolute top-1/2 right-2 w-12 h-12 transform -rotate-30" />
      <FlowerIcon className="absolute bottom-16 left-6 w-10 h-10 transform rotate-90" />
      <FlowerIcon className="absolute bottom-8 right-8 w-14 h-14 transform -rotate-45" />
    </div>
  );
}
