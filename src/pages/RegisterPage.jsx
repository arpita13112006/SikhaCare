import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FlowerDecorations from '../components/FlowerDecorations';
import SakhiLogo from '../components/SakhiLogo';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useUser();
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    mode: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!formData.mode) {
      alert('Please select your mode (Girl Mode or Woman Mode)');
      return;
    }
    const res = register({
      name: formData.name,
      mode: formData.mode,
      email: formData.email,
      password: formData.password
    });
    if (!res.success) {
      setErrorMessage(res.error);
      return;
    }
    if (res.mode === 'Girl Mode') {
      navigate('/girl-dashboard');
    } else {
      navigate('/woman-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#E0ACE4] text-[#4A2C5A] flex flex-col justify-between items-center px-6 py-8 relative overflow-hidden selection:bg-[#4A2C5A] selection:text-white">
      <FlowerDecorations />

      {/* Top Header / Back Button */}
      <div className="w-full max-w-[412px] flex items-center justify-between relative z-10 mb-2">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-1.5 text-[#4A2C5A] font-sans font-medium text-base hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>BACK</span>
        </button>
      </div>

      {/* Main Container */}
      <main className="w-full max-w-[412px] my-auto relative z-10 space-y-5">

        {/* Logo & Headline */}
        <div className="flex flex-col items-center text-center space-y-1.5">
          <div className="flex items-center space-x-3">
            <SakhiLogo size="small" />
            <h1 className="text-3xl md:text-4xl font-brand font-normal text-[#4A2C5A]">
              Sakhi Care
            </h1>
          </div>
          <p className="text-sm font-tagline text-[#4A2C5A]/85">
            Private AI Women’s Health Companion
          </p>
        </div>

        {/* White Card matching Figma radius 28px */}
        <div className="bg-white rounded-[28px] p-6 shadow-xl border border-white/60 space-y-4">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-300 rounded-[18px] p-3 flex items-start space-x-2 text-xs text-rose-800 animate-in fade-in">
              <span className="font-bold">⚠️ {errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* Name Field */}
            <div className="space-y-1">
              <label className="block text-sm font-sans font-semibold text-[#4A2C5A]">
                Name
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-[#F7EAF8] text-[#4A2C5A] placeholder-[#4A2C5A]/50 font-sans text-base rounded-[16px] border border-transparent focus:border-[#4A2C5A]/30 focus:bg-[#f3dedf] outline-none transition-all"
              />
            </div>

            {/* Mode Field (Custom Select Dropdown with Chevron Down Icon) */}
            <div className="space-y-1">
              <label className="block text-sm font-sans font-semibold text-[#4A2C5A]">
                Mode
              </label>
              <div className="relative">
                <select
                  required
                  value={formData.mode}
                  onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                  className={`w-full px-4 py-3 bg-[#F7EAF8] font-sans text-base rounded-[16px] border border-transparent focus:border-[#4A2C5A]/30 focus:bg-[#f3dedf] outline-none appearance-none cursor-pointer pr-10 transition-all ${
                    formData.mode ? 'text-[#4A2C5A]' : 'text-[#4A2C5A]/50'
                  }`}
                >
                  <option value="" disabled hidden>
                    Select your mode
                  </option>
                  <option value="Girl Mode" className="text-[#4A2C5A] bg-white">
                    Girl Mode
                  </option>
                  <option value="Woman Mode" className="text-[#4A2C5A] bg-white">
                    Woman Mode
                  </option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#4A2C5A]">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-sm font-sans font-semibold text-[#4A2C5A]">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-[#F7EAF8] text-[#4A2C5A] placeholder-[#4A2C5A]/50 font-sans text-base rounded-[16px] border border-transparent focus:border-[#4A2C5A]/30 focus:bg-[#f3dedf] outline-none transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block text-sm font-sans font-semibold text-[#4A2C5A]">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-[#F7EAF8] text-[#4A2C5A] placeholder-[#4A2C5A]/50 font-sans text-base rounded-[16px] border border-transparent focus:border-[#4A2C5A]/30 focus:bg-[#f3dedf] outline-none transition-all"
              />
            </div>

            {/* Register Primary Button */}
            <button
              type="submit"
              className="w-full mt-3 py-3.5 bg-[#4A2C5A] hover:bg-[#382144] active:scale-[0.99] text-white font-sans font-semibold text-lg rounded-[28px] shadow-md transition-all duration-200"
            >
              Register
            </button>
          </form>
        </div>

        {/* Bottom Link */}
        <div className="text-center pt-1">
          <Link
            to="/login"
            className="text-[#4A2C5A] hover:text-[#2A1834] font-sans font-medium text-base hover:underline transition-all"
          >
            Already have an account? <span className="font-semibold underline">Log in</span>
          </Link>
        </div>

      </main>
    </div>
  );
}
