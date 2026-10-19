import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FlowerDecorations from '../components/FlowerDecorations';
import SakhiLogo from '../components/SakhiLogo';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useUser();
  const [selectedMode, setSelectedMode] = useState(user.mode || 'Girl Mode');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const res = login({ 
      email: formData.email,
      password: formData.password,
      mode: selectedMode 
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

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-[#E0ACE4] text-[#4A2C5A] flex flex-col justify-between items-center px-6 py-8 relative overflow-hidden selection:bg-[#4A2C5A] selection:text-white">
      <FlowerDecorations />

      {/* Top Header / Back Button */}
      <div className="w-full max-w-[412px] flex items-center justify-between relative z-10 mb-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-1.5 text-[#4A2C5A] font-sans font-medium text-base hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>BACK</span>
        </button>
      </div>

      {/* Main Container */}
      <main className="w-full max-w-[412px] my-auto relative z-10 space-y-6">

        {/* Logo & Headline */}
        <div className="flex flex-col items-center text-center space-y-2">
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
        <div className="bg-white rounded-[28px] p-6 shadow-xl border border-white/60 space-y-5">
          
          {/* Error Banner if mode mismatch */}
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-300 rounded-[18px] p-3.5 flex items-start space-x-2.5 text-xs text-rose-800 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">Mode Access Denied</p>
                <p className="leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Mode Selection */}
            <div className="space-y-1.5">
              <label className="block text-sm font-sans font-semibold text-[#4A2C5A]">
                Select Login Mode
              </label>
              <div className="grid grid-cols-2 gap-2 bg-[#F7EAF8] p-1.5 rounded-[20px] border border-[#4A2C5A]/10">
                <button
                  type="button"
                  onClick={() => handleModeChange('Girl Mode')}
                  className={`py-2.5 px-3 rounded-[16px] text-sm font-semibold font-sans flex items-center justify-center space-x-1.5 transition-all ${
                    selectedMode === 'Girl Mode'
                      ? 'bg-[#4A2C5A] text-white shadow-sm'
                      : 'text-[#4A2C5A]/70 hover:text-[#4A2C5A]'
                  }`}
                >
                  <span>🌸 Girl Mode</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange('Woman Mode')}
                  className={`py-2.5 px-3 rounded-[16px] text-sm font-semibold font-sans flex items-center justify-center space-x-1.5 transition-all ${
                    selectedMode === 'Woman Mode'
                      ? 'bg-[#4A2C5A] text-white shadow-sm'
                      : 'text-[#4A2C5A]/70 hover:text-[#4A2C5A]'
                  }`}
                >
                  <span>🌺 Woman Mode</span>
                </button>
              </div>
              <p className="text-[11px] text-[#4A2C5A]/70 px-1">
                {selectedMode === 'Girl Mode'
                  ? '🌸 Strictly for Girl Mode accounts (puberty, cycle, mood & growth).'
                  : '🌺 Strictly for Woman Mode accounts (reproductive, pregnancy & maternal care).'}
              </p>
            </div>
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-sm font-sans font-semibold text-[#4A2C5A]">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setErrorMessage('');
                  }}
                  className="w-full px-4 py-3.5 bg-[#F7EAF8] text-[#4A2C5A] placeholder-[#4A2C5A]/50 font-sans text-base rounded-[16px] border border-transparent focus:border-[#4A2C5A]/30 focus:bg-[#f3dedf] outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-sm font-sans font-semibold text-[#4A2C5A]">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setErrorMessage('');
                  }}
                  className="w-full px-4 py-3.5 bg-[#F7EAF8] text-[#4A2C5A] placeholder-[#4A2C5A]/50 font-sans text-base rounded-[16px] border border-transparent focus:border-[#4A2C5A]/30 focus:bg-[#f3dedf] outline-none transition-all"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right pt-1">
              <a
                href="#forgot"
                onClick={(e) => { e.preventDefault(); alert('Password reset guidance sent to your email.'); }}
                className="text-sm font-sans font-semibold text-[#4A2C5A] hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Primary Button */}
            <button
              type="submit"
              className="w-full mt-2 py-4 bg-[#4A2C5A] hover:bg-[#382144] active:scale-[0.99] text-white font-sans font-semibold text-lg rounded-[28px] shadow-md transition-all duration-200"
            >
              Log in with {selectedMode}
            </button>
          </form>
        </div>

        {/* Bottom Link */}
        <div className="text-center pt-2">
          <Link
            to="/register"
            className="text-[#4A2C5A] hover:text-[#2A1834] font-sans font-medium text-base hover:underline transition-all"
          >
            Don’t have an account? <span className="font-semibold underline">Register</span>
          </Link>
        </div>

      </main>
    </div>
  );
}
