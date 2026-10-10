import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FlowerDecorations from '../components/FlowerDecorations';
import SakhiLogo from '../components/SakhiLogo';
import { useUser } from '../context/UserContext';
import heroAvatar from '../assets/hero-avatar.png';
import {
  Calendar,
  Heart,
  Scale,
  Smile,
  FileText,
  MessageCircle,
  MapPin,
  Baby,
  LogOut,
  Sparkles,
  ChevronRight,
  Activity,
  Mic,
  Send,
  Plus,
  X,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export default function DashboardPage() {
  const { user, logout, setMode } = useUser();
  const navigate = useNavigate();

  // Active modal state for feature demo interaction
  const [activeModal, setActiveModal] = useState(null);

  // Mock states for tracking features
  const [periodDate, setPeriodDate] = useState('2026-10-01');
  const [weight, setWeight] = useState('52');
  const [mood, setMood] = useState('Calm & Peaceful');
  const [pregnancyWeek, setPregnancyWeek] = useState('18');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'sakhi', text: `Namaste ${user.name || 'Friend'}! I am Sakhi. How are you feeling today? I am here to listen and help safely.` }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleModeToggle = (newMode) => {
    setMode(newMode);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');

    // Empathetic, grounded Sakhi response mock
    setTimeout(() => {
      let botResponse = `I understand how you feel regarding "${userText}". Thank you for sharing this with me. Remember to rest well and stay hydrated!`;
      if (userText.toLowerCase().includes('pain') || userText.toLowerCase().includes('cramp')) {
        botResponse = `Period cramps or lower body pain can feel tough. A warm compress or herbal tea often helps. If the pain feels severe or unusual, please consult a doctor or use our Smart Referral feature.`;
      }
      setChatMessages((prev) => [...prev, { sender: 'sakhi', text: botResponse }]);
    }, 600);
  };

  const isGirlMode = user.mode === 'Girl Mode';

  return (
    <div className="min-h-screen bg-[#E0ACE4] text-[#4A2C5A] flex flex-col items-center px-4 md:px-8 py-6 relative overflow-x-hidden selection:bg-[#4A2C5A] selection:text-white">
      <FlowerDecorations />

      {/* Main Container */}
      <div className="w-full max-w-4xl relative z-10 space-y-6">

        {/* Top Navbar / User Header */}
        <header className="bg-white/90 backdrop-blur-md rounded-[28px] p-4 md:p-6 shadow-lg border border-white/70 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <SakhiLogo size="small" />
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl md:text-2xl font-brand text-[#4A2C5A]">
                  Namaste, {user.name || 'Friend'} ✨
                </h1>
              </div>
              <p className="text-xs md:text-sm font-sans text-[#4A2C5A]/80">
                Your private health space ({user.mode})
              </p>
            </div>
          </div>

          {/* Mode Switcher Pill & Logout */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
            <div className="bg-[#F7EAF8] p-1.5 rounded-[20px] flex items-center border border-[#4A2C5A]/10">
              <button
                onClick={() => handleModeToggle('Girl Mode')}
                className={`px-3 py-1.5 rounded-[16px] text-xs font-semibold font-sans transition-all ${
                  isGirlMode
                    ? 'bg-[#4A2C5A] text-white shadow-sm'
                    : 'text-[#4A2C5A]/70 hover:text-[#4A2C5A]'
                }`}
              >
                🌸 Girl Mode
              </button>
              <button
                onClick={() => handleModeToggle('Woman Mode')}
                className={`px-3 py-1.5 rounded-[16px] text-xs font-semibold font-sans transition-all ${
                  !isGirlMode
                    ? 'bg-[#4A2C5A] text-white shadow-sm'
                    : 'text-[#4A2C5A]/70 hover:text-[#4A2C5A]'
                }`}
              >
                🌺 Woman Mode
              </button>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2.5 bg-[#F7EAF8] hover:bg-[#ebd5eb] text-[#4A2C5A] rounded-[16px] transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Sakhi AI Companion Hero Banner (Launcher) */}
        <div className="bg-gradient-to-r from-[#4A2C5A] via-[#5C3770] to-[#6A3F80] text-white rounded-[28px] p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 z-10 max-w-lg text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-[#FFF0FA]/20 px-3 py-1 rounded-full text-xs font-medium text-[#E0ACE4]">
              <Sparkles className="w-3.5 h-3.5 text-[#E0ACE4]" />
              <span>Sakhi AI Companion Active</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-brand">
              Ask Sakhi Anything Privately
            </h2>
            <p className="text-xs md:text-sm font-sans text-white/80 leading-relaxed">
              Empathetic, evidence-grounded answers for your health questions in your preferred language.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => setActiveModal('sakhi_chat')}
                className="px-5 py-3 bg-[#E0ACE4] hover:bg-[#d69bdc] text-[#4A2C5A] font-semibold text-sm rounded-[20px] shadow-md flex items-center space-x-2 transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Talk to Sakhi</span>
              </button>

              <button
                onClick={() => setActiveModal('sakhi_chat')}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-[20px] flex items-center space-x-2 transition-all"
              >
                <Mic className="w-4 h-4 text-[#E0ACE4]" />
                <span>Voice Input</span>
              </button>
            </div>
          </div>

          {/* Avatar Illustration */}
          <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 relative z-10 flex items-center justify-center">
            <img
              src={heroAvatar}
              alt="Sakhi Companion"
              className="w-full h-full object-contain drop-shadow-lg animate-pulse"
            />
          </div>
        </div>

        {/* Dashboard Grid Header */}
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-brand font-semibold text-[#4A2C5A]">
            {isGirlMode ? 'Girl Mode Health Tools' : 'Woman Mode Health Tools'}
          </h3>
          <span className="text-xs font-sans bg-white/70 px-3 py-1 rounded-full text-[#4A2C5A] border border-white">
            {isGirlMode ? '6 Modules Active' : '5 Modules Active'}
          </span>
        </div>

        {/* Dynamic Mode-Based Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* 1. Menstrual Cycle (Girl Mode only) */}
          {isGirlMode && (
            <div className="bg-white rounded-[28px] p-6 shadow-lg border border-white/70 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-[#F7EAF8] rounded-[20px]">
                  <Activity className="w-6 h-6 text-[#4A2C5A]" />
                </div>
                <span className="text-xs font-semibold bg-[#4A2C5A]/10 text-[#4A2C5A] px-2.5 py-1 rounded-full">
                  Day 12 of 28
                </span>
              </div>

              <div>
                <h4 className="text-lg font-sans font-bold text-[#4A2C5A]">
                  Menstrual Cycle
                </h4>
                <p className="text-xs text-[#4A2C5A]/75 mt-1">
                  Maintain cycle history & view phase predictions.
                </p>
                <div className="mt-3 bg-[#F7EAF8] p-3 rounded-[16px] text-xs space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Current Phase:</span>
                    <span className="font-bold text-[#4A2C5A]">Follicular Phase 🌸</span>
                  </div>
                  <div className="flex justify-between text-[#4A2C5A]/80">
                    <span>Next Period Expected:</span>
                    <span>Oct 24, 2026</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveModal('menstrual')}
                className="w-full py-2.5 bg-[#F7EAF8] hover:bg-[#ebd5eb] text-[#4A2C5A] font-semibold text-xs rounded-[16px] flex items-center justify-center space-x-1 transition-all"
              >
                <span>View Cycle Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* 2. Period Tracking (Girl Mode & Woman Mode) */}
          <div className="bg-white rounded-[28px] p-6 shadow-lg border border-white/70 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-[#F7EAF8] rounded-[20px]">
                <Calendar className="w-6 h-6 text-[#4A2C5A]" />
              </div>
              <span className="text-xs font-semibold bg-pink-100 text-pink-700 px-2.5 py-1 rounded-full">
                Regular
              </span>
            </div>

            <div>
              <h4 className="text-lg font-sans font-bold text-[#4A2C5A]">
                Period Tracking
              </h4>
              <p className="text-xs text-[#4A2C5A]/75 mt-1">
                Record start/end dates & review period history.
              </p>
              <div className="mt-3 bg-[#F7EAF8] p-3 rounded-[16px] text-xs flex justify-between items-center">
                <span>Last Logged Period:</span>
                <span className="font-bold text-[#4A2C5A]">{periodDate}</span>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('period_tracking')}
              className="w-full py-2.5 bg-[#F7EAF8] hover:bg-[#ebd5eb] text-[#4A2C5A] font-semibold text-xs rounded-[16px] flex items-center justify-center space-x-1 transition-all"
            >
              <span>Log Period Dates</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3. Weight Tracking (Girl Mode only) */}
          {isGirlMode && (
            <div className="bg-white rounded-[28px] p-6 shadow-lg border border-white/70 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-[#F7EAF8] rounded-[20px]">
                  <Scale className="w-6 h-6 text-[#4A2C5A]" />
                </div>
                <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">
                  Healthy Trend
                </span>
              </div>

              <div>
                <h4 className="text-lg font-sans font-bold text-[#4A2C5A]">
                  Weight Tracking
                </h4>
                <p className="text-xs text-[#4A2C5A]/75 mt-1">
                  Track weight over time with body positivity guidance.
                </p>
                <div className="mt-3 bg-[#F7EAF8] p-3 rounded-[16px] text-xs flex justify-between items-center">
                  <span>Current Weight Record:</span>
                  <span className="font-bold text-[#4A2C5A]">{weight} kg</span>
                </div>
              </div>

              <button
                onClick={() => setActiveModal('weight')}
                className="w-full py-2.5 bg-[#F7EAF8] hover:bg-[#ebd5eb] text-[#4A2C5A] font-semibold text-xs rounded-[16px] flex items-center justify-center space-x-1 transition-all"
              >
                <span>Update Weight</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* 4. Mental Wellness (Girl Mode only) */}
          {isGirlMode && (
            <div className="bg-white rounded-[28px] p-6 shadow-lg border border-white/70 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-[#F7EAF8] rounded-[20px]">
                  <Smile className="w-6 h-6 text-[#4A2C5A]" />
                </div>
                <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">
                  Daily Check-in
                </span>
              </div>

              <div>
                <h4 className="text-lg font-sans font-bold text-[#4A2C5A]">
                  Mental Wellness
                </h4>
                <p className="text-xs text-[#4A2C5A]/75 mt-1">
                  Record how you feel & review wellness logs.
                </p>
                <div className="mt-3 bg-[#F7EAF8] p-3 rounded-[16px] text-xs flex justify-between items-center">
                  <span>Today's Mood:</span>
                  <span className="font-bold text-[#4A2C5A]">{mood}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveModal('mental_wellness')}
                className="w-full py-2.5 bg-[#F7EAF8] hover:bg-[#ebd5eb] text-[#4A2C5A] font-semibold text-xs rounded-[16px] flex items-center justify-center space-x-1 transition-all"
              >
                <span>Record Mood</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* 5. Pregnancy Tracking (Woman Mode only) */}
          {!isGirlMode && (
            <div className="bg-white rounded-[28px] p-6 shadow-lg border border-white/70 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all">
              <div className="flex items-start justify-between">
                <div className="p-3 bg-[#F7EAF8] rounded-[20px]">
                  <Baby className="w-6 h-6 text-[#4A2C5A]" />
                </div>
                <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
                  Trimester 2
                </span>
              </div>

              <div>
                <h4 className="text-lg font-sans font-bold text-[#4A2C5A]">
                  Pregnancy Tracking
                </h4>
                <p className="text-xs text-[#4A2C5A]/75 mt-1">
                  Maintain relevant pregnancy milestones & history.
                </p>
                <div className="mt-3 bg-[#F7EAF8] p-3 rounded-[16px] text-xs space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Gestational Progress:</span>
                    <span className="font-bold text-[#4A2C5A]">Week {pregnancyWeek}</span>
                  </div>
                  <div className="flex justify-between text-[#4A2C5A]/80">
                    <span>Baby Size:</span>
                    <span>Size of a Bell Pepper 🫑</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveModal('pregnancy')}
                className="w-full py-2.5 bg-[#F7EAF8] hover:bg-[#ebd5eb] text-[#4A2C5A] font-semibold text-xs rounded-[16px] flex items-center justify-center space-x-1 transition-all"
              >
                <span>View Milestones</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* 6. Health Reports Vault (Girl Mode & Woman Mode) */}
          <div className="bg-white rounded-[28px] p-6 shadow-lg border border-white/70 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-[#F7EAF8] rounded-[20px]">
                <FileText className="w-6 h-6 text-[#4A2C5A]" />
              </div>
              <span className="text-xs font-semibold bg-[#4A2C5A]/10 text-[#4A2C5A] px-2.5 py-1 rounded-full">
                Encrypted Vault
              </span>
            </div>

            <div>
              <h4 className="text-lg font-sans font-bold text-[#4A2C5A]">
                Health Reports
              </h4>
              <p className="text-xs text-[#4A2C5A]/75 mt-1">
                Store & view private lab reports securely.
              </p>
              <div className="mt-3 bg-[#F7EAF8] p-3 rounded-[16px] text-xs flex justify-between items-center">
                <span>Stored Documents:</span>
                <span className="font-bold text-[#4A2C5A]">2 Private Reports</span>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('health_reports')}
              className="w-full py-2.5 bg-[#F7EAF8] hover:bg-[#ebd5eb] text-[#4A2C5A] font-semibold text-xs rounded-[16px] flex items-center justify-center space-x-1 transition-all"
            >
              <span>Manage Reports</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 7. Smart Referral Engine (Girl Mode & Woman Mode) */}
          <div className="bg-white rounded-[28px] p-6 shadow-lg border border-white/70 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all md:col-span-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-red-100 rounded-[20px]">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-lg font-sans font-bold text-[#4A2C5A]">
                    Smart Referral Engine
                  </h4>
                  <p className="text-xs text-[#4A2C5A]/75">
                    Find nearest verified healthcare facilities & emergency support.
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold bg-red-100 text-red-700 px-3 py-1 rounded-full">
                Safety & Triage
              </span>
            </div>

            <div className="bg-[#F7EAF8] p-4 rounded-[20px] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#4A2C5A]/90 space-y-1 text-center md:text-left">
                <p className="font-semibold text-sm text-[#4A2C5A]">
                  Nearest Facility: District Women’s Hospital
                </p>
                <p>Location permission active • Status: 24/7 Open • Distance: 2.4 km</p>
              </div>

              <button
                onClick={() => setActiveModal('smart_referral')}
                className="w-full md:w-auto px-5 py-2.5 bg-[#4A2C5A] hover:bg-[#382144] text-white font-semibold text-xs rounded-[16px] shadow-sm shrink-0 transition-all"
              >
                Open Smart Referral
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* MODALS FOR INTERACTIVE DEMO */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] p-6 w-full max-w-md shadow-2xl relative border border-white/80 space-y-4 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 bg-[#F7EAF8] text-[#4A2C5A] rounded-full hover:bg-[#ebd5eb]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Sakhi AI Chat Modal */}
            {activeModal === 'sakhi_chat' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 border-b border-[#F7EAF8] pb-3">
                  <SakhiLogo size="small" />
                  <div>
                    <h3 className="font-brand text-xl text-[#4A2C5A]">Sakhi AI Companion</h3>
                    <p className="text-xs text-[#4A2C5A]/70">Multilingual • Grounded Health Guidance</p>
                  </div>
                </div>

                <div className="h-64 overflow-y-auto space-y-3 p-3 bg-[#F7EAF8] rounded-[20px]">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-[18px] text-xs font-sans leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#4A2C5A] text-white rounded-tr-none'
                            : 'bg-white text-[#4A2C5A] rounded-tl-none shadow-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Type your health concern..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-[#F7EAF8] text-xs rounded-[16px] outline-none text-[#4A2C5A]"
                  />
                  <button
                    type="submit"
                    className="p-2.5 bg-[#4A2C5A] text-white rounded-[16px] hover:bg-[#382144]"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Period Log Modal */}
            {activeModal === 'period_tracking' && (
              <div className="space-y-4 text-[#4A2C5A]">
                <h3 className="font-brand text-xl">Log Period Start Date</h3>
                <div className="space-y-2">
                  <label className="text-xs font-semibold">Select Date:</label>
                  <input
                    type="date"
                    value={periodDate}
                    onChange={(e) => setPeriodDate(e.target.value)}
                    className="w-full p-3 bg-[#F7EAF8] rounded-[16px] text-sm outline-none"
                  />
                </div>
                <button
                  onClick={() => { alert('Period date logged successfully!'); setActiveModal(null); }}
                  className="w-full py-3 bg-[#4A2C5A] text-white font-semibold text-xs rounded-[20px]"
                >
                  Save Log
                </button>
              </div>
            )}

            {/* Weight Modal */}
            {activeModal === 'weight' && (
              <div className="space-y-4 text-[#4A2C5A]">
                <h3 className="font-brand text-xl">Update Weight Record</h3>
                <div className="space-y-2">
                  <label className="text-xs font-semibold">Weight (in kg):</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-3 bg-[#F7EAF8] rounded-[16px] text-sm outline-none"
                  />
                </div>
                <button
                  onClick={() => { alert('Weight updated successfully!'); setActiveModal(null); }}
                  className="w-full py-3 bg-[#4A2C5A] text-white font-semibold text-xs rounded-[20px]"
                >
                  Save Record
                </button>
              </div>
            )}

            {/* Mental Wellness Modal */}
            {activeModal === 'mental_wellness' && (
              <div className="space-y-4 text-[#4A2C5A]">
                <h3 className="font-brand text-xl">Daily Mood Check-in</h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Calm & Peaceful', 'Anxious', 'Happy', 'Stressed', 'Tired'].map((item) => (
                    <button
                      key={item}
                      onClick={() => setMood(item)}
                      className={`p-3 rounded-[16px] border font-medium text-left transition-all ${
                        mood === item ? 'bg-[#4A2C5A] text-white' : 'bg-[#F7EAF8] text-[#4A2C5A]'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => { alert('Mood logged successfully!'); setActiveModal(null); }}
                  className="w-full py-3 bg-[#4A2C5A] text-white font-semibold text-xs rounded-[20px]"
                >
                  Confirm Check-in
                </button>
              </div>
            )}

            {/* Pregnancy Modal */}
            {activeModal === 'pregnancy' && (
              <div className="space-y-4 text-[#4A2C5A]">
                <h3 className="font-brand text-xl">Pregnancy Progress</h3>
                <div className="space-y-2 text-xs">
                  <p><strong>Current Week:</strong> {pregnancyWeek} weeks</p>
                  <p><strong>Trimester:</strong> Second Trimester</p>
                  <p className="p-3 bg-[#F7EAF8] rounded-[16px]">
                    💡 <em>Tip: Stay active with light walking and maintain folic acid & iron intake as advised by your healthcare provider.</em>
                  </p>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full py-3 bg-[#4A2C5A] text-white font-semibold text-xs rounded-[20px]"
                >
                  Close
                </button>
              </div>
            )}

            {/* Health Reports Vault Modal */}
            {activeModal === 'health_reports' && (
              <div className="space-y-4 text-[#4A2C5A]">
                <h3 className="font-brand text-xl">Private Health Vault</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-[#F7EAF8] rounded-[16px] flex items-center justify-between">
                    <span>Blood_Report_Oct2026.pdf</span>
                    <span className="text-[#4A2C5A] font-bold">Encrypted</span>
                  </div>
                  <div className="p-3 bg-[#F7EAF8] rounded-[16px] flex items-center justify-between">
                    <span>Ultrasound_Summary.pdf</span>
                    <span className="text-[#4A2C5A] font-bold">Encrypted</span>
                  </div>
                </div>
                <button
                  onClick={() => { alert('Upload report feature ready!'); setActiveModal(null); }}
                  className="w-full py-3 bg-[#4A2C5A] text-white font-semibold text-xs rounded-[20px] flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload New Report</span>
                </button>
              </div>
            )}

            {/* Smart Referral Modal */}
            {activeModal === 'smart_referral' && (
              <div className="space-y-4 text-[#4A2C5A]">
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="font-brand text-xl">Smart Referral Engine</h3>
                </div>
                <div className="space-y-2 text-xs bg-[#F7EAF8] p-3.5 rounded-[16px]">
                  <p className="font-bold text-sm">District Women's Healthcare Center</p>
                  <p>📍 Sector 4, Main Hospital Road</p>
                  <p>🟢 Emergency Status: Open 24/7</p>
                  <p>📞 Helpline: +91 1800-185-1100</p>
                </div>
                <button
                  onClick={() => { alert('Opening Navigation Maps...'); setActiveModal(null); }}
                  className="w-full py-3 bg-red-600 text-white font-semibold text-xs rounded-[20px]"
                >
                  Start Navigation
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
