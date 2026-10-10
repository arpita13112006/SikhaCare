import React from 'react';
import { Link } from 'react-router-dom';
import FlowerDecorations from '../components/FlowerDecorations';
import { ArrowRight } from 'lucide-react';
import heroAvatar from '../assets/hero-avatar.png'; // Figma avatar image

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#E0ACE4] text-[#4A2C5A] flex flex-col justify-between items-center px-6 py-12 relative overflow-hidden selection:bg-[#4A2C5A] selection:text-white">
      <FlowerDecorations />

      {/* Main Content Container matching Figma 412px mobile frame */}
      <main className="w-full max-w-[412px] my-auto flex flex-col items-center text-center relative z-10 space-y-8">

        {/* Hero Section with Avatar & Branding */}
        <div className="flex flex-col items-center space-y-4">

          {/* Hero Avatar Image from Figma */}
          <div className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center">
            <img
              src={heroAvatar}
              alt="Sakhi Companion Avatar"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </div>

          <div className="space-y-2 mt-2">
            <h1 className="text-4xl md:text-5xl font-brand font-normal tracking-wide text-[#4A2C5A]">
              Sakhi Care
            </h1>
            <p className="text-lg font-tagline text-[#4A2C5A]/90 max-w-[280px] mx-auto leading-relaxed">
              Private AI Women’s Health Companion
            </p>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="w-full space-y-4 pt-4">
          <Link
            to="/register"
            className="w-full py-4 bg-[#4A2C5A] hover:bg-[#382144] active:scale-[0.99] text-white font-sans font-semibold text-lg rounded-[28px] shadow-lg flex items-center justify-center space-x-2 transition-all duration-200"
          >
            <span>Get started</span>
            <ArrowRight className="w-5 h-5 text-[#E0ACE4]" />
          </Link>

          <div>
            <Link
              to="/login"
              className="inline-block text-[#4A2C5A] hover:text-[#2A1834] font-sans font-medium text-base hover:underline transition-all"
            >
              Already have an account? <span className="font-semibold underline">Log in</span>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
// helloooooooo