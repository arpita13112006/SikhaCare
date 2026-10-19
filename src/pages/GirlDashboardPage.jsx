import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FlowerDecorations from '../components/FlowerDecorations';
import SakhiLogo from '../components/SakhiLogo';
import { useUser } from '../context/UserContext';
import roboAvatar from '../assets/robo-avatar.png';
import {
  Calendar,
  Heart,
  Scale,
  Smile,
  FileText,
  MessageCircle,
  MapPin,
  LogOut,
  Sparkles,
  ChevronRight,
  Activity,
  Mic,
  Send,
  Plus,
  X,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Wind,
  ShieldCheck
} from 'lucide-react';

export default function GirlDashboardPage() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // Mode verification: only accessible when logged in as Girl Mode
  useEffect(() => {
    if (user.mode && user.mode !== 'Girl Mode') {
      navigate('/woman-dashboard', { replace: true });
    }
  }, [user.mode, navigate]);

  // Active modal state
  const [activeModal, setActiveModal] = useState(null);

  // Feature states for Girl Mode
  const [periodDate, setPeriodDate] = useState('2026-10-01');
  const [flowLevel, setFlowLevel] = useState('Medium');
  const [weight, setWeight] = useState('52');
  const [waterGlasses, setWaterGlasses] = useState(6);
  const [mood, setMood] = useState('Calm & Peaceful');
  const [breathingStep, setBreathingStep] = useState('Ready');
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  // Chat conversation state
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'sakhi',
      text: `Namaste ${user.name || 'Friend'}! 🌸 I am Sakhi, your private elder sister & health companion. You can ask me anything about your cycle, cramps, mood, or body changes without any hesitation.`
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');

    // Responsive, empathetic Sakhi response tailored for girls
    setTimeout(() => {
      let botResponse = `I hear you, ${user.name || 'friend'}. It is completely natural to have questions about "${userText}". Take a deep breath and stay hydrated!`;
      const lower = userText.toLowerCase();

      if (lower.includes('cramp') || lower.includes('pain') || lower.includes('stomach')) {
        botResponse = `Period cramps can be uncomfortable. Placing a warm hot-water bottle on your lower abdomen, sipping warm ginger or chamomile tea, and doing gentle stretches can provide quick relief. If the pain is severe or prevents you from daily activities, talk to a doctor or use Smart Referral.`;
      } else if (lower.includes('irregular') || lower.includes('late') || lower.includes('missed')) {
        botResponse = `It is very common for cycles to be irregular during your teenage years as your hormones settle into their rhythm. Factors like exams, stress, or sleep changes can also shift dates. Let's keep tracking it together.`;
      } else if (lower.includes('mood') || lower.includes('anxious') || lower.includes('sad') || lower.includes('cry')) {
        botResponse = `Hormonal fluctuations during your follicular or luteal phases can heighten feelings of anxiety or mood swings. You are not alone, and it will pass. Would you like to try our 1-minute guided calm breathing exercise?`;
      } else if (lower.includes('emergency') || lower.includes('severe bleeding') || lower.includes('faint')) {
        botResponse = `🚨 This sounds concerning. Please do not worry alone — speak to an adult or guardian right away, and open our Smart Referral tool immediately to locate the nearest emergency medical facility.`;
      }

      setChatMessages((prev) => [...prev, { sender: 'sakhi', text: botResponse }]);
    }, 600);
  };

  // Breathing tool animation handler
  const startBreathingExercise = () => {
    setIsBreathingActive(true);
    setBreathingStep('Inhale deeply (4s)... 🌿');
    setTimeout(() => {
      setBreathingStep('Hold your breath gently (7s)... ✨');
      setTimeout(() => {
        setBreathingStep('Exhale slowly through mouth (8s)... 💨');
        setTimeout(() => {
          setBreathingStep('Well done! You are calm & centered. 🌸');
          setIsBreathingActive(false);
        }, 8000);
      }, 7000);
    }, 4000);
  };

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
                <span className="bg-[#4A2C5A] text-white text-[11px] font-sans font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                  🌸 Girl Mode
                </span>
              </div>
              <p className="text-xs md:text-sm font-sans text-[#4A2C5A]/80">
                Your private health space • Puberty, cycle & wellness companion
              </p>
            </div>
          </div>

          {/* Action Buttons: Logout only (Mode is strictly locked to account) */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
            <button
              onClick={handleLogout}
              title="Logout"
              className="px-4 py-2 bg-[#F7EAF8] hover:bg-[#ebd5eb] text-[#4A2C5A] rounded-[16px] transition-all flex items-center space-x-1.5 text-xs font-semibold shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Girl Mode Hero AI Companion Banner */}
        <div className="bg-gradient-to-r from-[#4A2C5A] via-[#5C3770] to-[#773E84] text-white rounded-[28px] p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 z-10 max-w-lg text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-[#FFF0FA]/20 px-3 py-1 rounded-full text-xs font-medium text-[#E0ACE4]">
              <Sparkles className="w-3.5 h-3.5 text-[#E0ACE4]" />
              <span>Sakhi AI Companion for Girls</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-brand">
              Ask Sakhi Anything Privately
            </h2>
            <p className="text-xs md:text-sm font-sans text-white/85 leading-relaxed">
              Safe, confidential, stigma-free guidance for puberty, menstrual periods, cramps, mood shifts, and body changes.
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
                onClick={() => {
                  setInputMessage('How can I naturally reduce period cramps during school?');
                  setActiveModal('sakhi_chat');
                }}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-[20px] flex items-center space-x-1.5 transition-all"
              >
                <span>🍫 Cramp Relief Tips</span>
              </button>

              <button
                onClick={() => {
                  setActiveModal('sakhi_chat');
                }}
                className="px-3.5 py-3 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-[20px] flex items-center space-x-1.5 transition-all"
              >
                <Mic className="w-3.5 h-3.5 text-[#E0ACE4]" />
                <span>Voice Chat</span>
              </button>
            </div>
          </div>

          {/* Hero Avatar: Smiling Robo Woman - Completely STATIC (no animation/effect) */}
          <div className="w-36 h-36 md:w-44 md:h-44 shrink-0 relative z-10 flex items-center justify-center">
            <img
              src={roboAvatar}
              alt="Sakhi Smiling Robo Woman Companion"
              className="w-full h-full object-contain drop-shadow-md rounded-[20px]"
            />
          </div>
        </div>

        {/* Dashboard Grid Header */}
        <div className="flex items-center justify-between px-2">
          <div>
            <h3 className="text-xl font-brand font-semibold text-[#4A2C5A]">
              Girl Mode Health Modules
            </h3>
            <p className="text-xs text-[#4A2C5A]/70">
              Personalized for adolescent and young female wellness
            </p>
          </div>
          <span className="text-xs font-sans font-semibold bg-white/80 px-3 py-1 rounded-full text-[#4A2C5A] border border-white shadow-sm">
            6 Modules Active
          </span>
        </div>

        {/* 6 Modules Grid for Girl Mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* 1. Menstrual Cycle Module */}
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
                Maintain cycle history, phase predictions & puberty rhythm.
              </p>
              <div className="mt-3 bg-[#F7EAF8] p-3 rounded-[16px] text-xs space-y-1.5">
                <div className="flex justify-between font-medium">
                  <span>Current Phase:</span>
                  <span className="font-bold text-[#4A2C5A]">Follicular Phase 🌸</span>
                </div>
                <div className="flex justify-between text-[#4A2C5A]/80">
                  <span>Next Period Expected:</span>
                  <span className="font-semibold text-[#4A2C5A]">Oct 24, 2026</span>
                </div>
                <div className="text-[11px] text-[#4A2C5A]/70 italic pt-1 border-t border-[#4A2C5A]/10">
                  💡 High energy phase. Perfect time for creative projects & light sports.
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

          {/* 2. Period Tracking Module */}
          <div className="bg-white rounded-[28px] p-6 shadow-lg border border-white/70 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-pink-100 rounded-[20px]">
                <Calendar className="w-6 h-6 text-pink-700" />
              </div>
              <span className="text-xs font-semibold bg-pink-100 text-pink-700 px-2.5 py-1 rounded-full">
                Regular Rhythm
              </span>
            </div>

            <div>
              <h4 className="text-lg font-sans font-bold text-[#4A2C5A]">
                Period Tracking
              </h4>
              <p className="text-xs text-[#4A2C5A]/75 mt-1">
                Record start/end dates, flow intensity & symptoms.
              </p>
              <div className="mt-3 bg-[#F7EAF8] p-3 rounded-[16px] text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span>Last Logged Period:</span>
                  <span className="font-bold text-[#4A2C5A]">{periodDate}</span>
                </div>
                <div className="flex justify-between items-center text-[#4A2C5A]/80">
                  <span>Average Flow:</span>
                  <span className="font-medium">{flowLevel}</span>
                </div>
                <div className="flex justify-between items-center text-[#4A2C5A]/80">
                  <span>Cycle Length:</span>
                  <span className="font-medium">28 Days</span>
                </div>
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

          {/* 3. Weight Tracking & Body Positivity Module */}
          <div className="bg-white rounded-[28px] p-6 shadow-lg border border-white/70 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-emerald-100 rounded-[20px]">
                <Scale className="w-6 h-6 text-emerald-700" />
              </div>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full">
                Healthy Growth
              </span>
            </div>

            <div>
              <h4 className="text-lg font-sans font-bold text-[#4A2C5A]">
                Weight & Body Positivity
              </h4>
              <p className="text-xs text-[#4A2C5A]/75 mt-1">
                Track growth naturally with positive, healthy habits.
              </p>
              <div className="mt-3 bg-[#F7EAF8] p-3 rounded-[16px] text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span>Current Weight:</span>
                  <span className="font-bold text-[#4A2C5A]">{weight} kg</span>
                </div>
                <div className="flex justify-between items-center text-[#4A2C5A]/80">
                  <span>Daily Water Intake:</span>
                  <span className="font-bold text-sky-700">{waterGlasses} / 8 Glasses 💧</span>
                </div>
                <div className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-[12px] font-medium">
                  🌟 "Your body is growing strong. Love yourself and eat nutritious food!"
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('weight')}
              className="w-full py-2.5 bg-[#F7EAF8] hover:bg-[#ebd5eb] text-[#4A2C5A] font-semibold text-xs rounded-[16px] flex items-center justify-center space-x-1 transition-all"
            >
              <span>Update Record & Water</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4. Mental Wellness & Mood Check-in Module */}
          <div className="bg-white rounded-[28px] p-6 shadow-lg border border-white/70 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-purple-100 rounded-[20px]">
                <Smile className="w-6 h-6 text-purple-700" />
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
                Log emotional state & access calming breathwork tools.
              </p>
              <div className="mt-3 bg-[#F7EAF8] p-3 rounded-[16px] text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span>Today's Feeling:</span>
                  <span className="font-bold text-[#4A2C5A]">{mood}</span>
                </div>
                <div className="flex justify-between items-center text-[#4A2C5A]/80">
                  <span>Calm Streak:</span>
                  <span className="font-semibold text-purple-800">5 Days in a row ✨</span>
                </div>
                <div className="text-[11px] text-purple-800 bg-purple-50 p-2 rounded-[12px] flex items-center justify-between">
                  <span>Quick 1-Min Relax:</span>
                  <span className="font-bold underline cursor-pointer" onClick={() => setActiveModal('breathing')}>Try Calm Breathe</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('mental_wellness')}
              className="w-full py-2.5 bg-[#F7EAF8] hover:bg-[#ebd5eb] text-[#4A2C5A] font-semibold text-xs rounded-[16px] flex items-center justify-center space-x-1 transition-all"
            >
              <span>Record Today's Mood</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 5. Health Reports Vault Module */}
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
                Health Reports Vault
              </h4>
              <p className="text-xs text-[#4A2C5A]/75 mt-1">
                Store vaccination records & private health checkups safely.
              </p>
              <div className="mt-3 bg-[#F7EAF8] p-3 rounded-[16px] text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span>Stored Documents:</span>
                  <span className="font-bold text-[#4A2C5A]">2 Private Records</span>
                </div>
                <div className="flex justify-between items-center text-[#4A2C5A]/80">
                  <span>Recent Upload:</span>
                  <span>School_Vaccination_Card.pdf</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('health_reports')}
              className="w-full py-2.5 bg-[#F7EAF8] hover:bg-[#ebd5eb] text-[#4A2C5A] font-semibold text-xs rounded-[16px] flex items-center justify-center space-x-1 transition-all"
            >
              <span>Manage My Reports</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 6. Smart Referral Engine (Adolescent & Girl Healthcare) */}
          <div className="bg-white rounded-[28px] p-6 shadow-lg border border-white/70 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all md:col-span-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-rose-100 rounded-[20px]">
                  <MapPin className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h4 className="text-lg font-sans font-bold text-[#4A2C5A]">
                    Smart Referral Engine (Adolescent & Girl Care)
                  </h4>
                  <p className="text-xs text-[#4A2C5A]/75">
                    Verified youth-friendly clinics, gynecologists & national emergency helplines.
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold bg-rose-100 text-rose-700 px-3 py-1 rounded-full">
                Safety & Triage
              </span>
            </div>

            <div className="bg-[#F7EAF8] p-4 rounded-[20px] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#4A2C5A]/90 space-y-1 text-center md:text-left">
                <p className="font-bold text-sm text-[#4A2C5A]">
                  Nearest Facility: Adolescent & Women Health Center
                </p>
                <p>📍 Sector 4, Civic Hospital Complex • 2.4 km away • Verified Doctor On Duty</p>
                <p className="text-rose-700 font-semibold">📞 National Women Helpline: 181 • Childline: 1098</p>
              </div>

              <button
                onClick={() => setActiveModal('smart_referral')}
                className="w-full md:w-auto px-5 py-3 bg-[#4A2C5A] hover:bg-[#382144] text-white font-semibold text-xs rounded-[16px] shadow-sm shrink-0 transition-all"
              >
                Open Smart Referral
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* MODALS */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] p-6 w-full max-w-md shadow-2xl relative border border-white/80 space-y-4 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 bg-[#F7EAF8] text-[#4A2C5A] rounded-full hover:bg-[#ebd5eb] transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Sakhi AI Chat Modal */}
            {activeModal === 'sakhi_chat' && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 border-b border-[#F7EAF8] pb-3">
                  <SakhiLogo size="small" />
                  <div>
                    <h3 className="font-brand text-xl text-[#4A2C5A]">Sakhi Companion (Girl Mode)</h3>
                    <p className="text-xs text-[#4A2C5A]/70">Confidential • Grounded in WHO & NHM Guidelines</p>
                  </div>
                </div>

                <div className="h-64 overflow-y-auto space-y-3 p-3 bg-[#F7EAF8] rounded-[20px]">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3.5 rounded-[18px] text-xs font-sans leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#4A2C5A] text-white rounded-tr-none'
                            : 'bg-white text-[#4A2C5A] rounded-tl-none shadow-sm border border-[#4A2C5A]/5'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick suggestions */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    'How to manage cramps naturally?',
                    'Is irregular period normal at 16?',
                    'Tips for feeling less tired'
                  ].map((tip) => (
                    <button
                      key={tip}
                      type="button"
                      onClick={() => {
                        setInputMessage(tip);
                      }}
                      className="text-[11px] bg-[#F7EAF8] hover:bg-[#edd4ee] text-[#4A2C5A] px-2.5 py-1 rounded-full transition-all"
                    >
                      {tip}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="flex items-center space-x-2 pt-1">
                  <input
                    type="text"
                    placeholder="Ask Sakhi any question privately..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 px-4 py-3 bg-[#F7EAF8] text-xs rounded-[16px] outline-none text-[#4A2C5A] border border-transparent focus:border-[#4A2C5A]/30"
                  />
                  <button
                    type="submit"
                    className="p-3 bg-[#4A2C5A] text-white rounded-[16px] hover:bg-[#382144] transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Menstrual Details Modal */}
            {activeModal === 'menstrual' && (
              <div className="space-y-4 text-[#4A2C5A]">
                <h3 className="font-brand text-xl">Menstrual Cycle Phases</h3>
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-[#F7EAF8] rounded-[16px] border border-[#4A2C5A]/10">
                    <p className="font-bold text-[#4A2C5A]">🌸 Current: Follicular Phase (Days 6–13)</p>
                    <p className="text-[11px] text-[#4A2C5A]/80 mt-1">
                      Estrogen is gently rising. You may notice higher mental clarity and refreshed energy.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-[16px] border border-[#4A2C5A]/10">
                    <p className="font-bold text-[#4A2C5A]">✨ Next: Ovulatory Window (Days 14–16)</p>
                    <p className="text-[11px] text-[#4A2C5A]/80 mt-1">
                      Peak vitality. Ideal time for extracurricular activities and sports.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-[16px] border border-[#4A2C5A]/10">
                    <p className="font-bold text-[#4A2C5A]">🌙 Luteal Phase (Days 17–28)</p>
                    <p className="text-[11px] text-[#4A2C5A]/80 mt-1">
                      Progesterone rises. Prioritize adequate rest, healthy warm food, and hydration.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full py-3 bg-[#4A2C5A] text-white font-semibold text-xs rounded-[20px]"
                >
                  Close
                </button>
              </div>
            )}

            {/* Period Tracking Modal */}
            {activeModal === 'period_tracking' && (
              <div className="space-y-4 text-[#4A2C5A]">
                <h3 className="font-brand text-xl">Log Period Start Date</h3>
                <div className="space-y-2">
                  <label className="text-xs font-semibold">Select Start Date:</label>
                  <input
                    type="date"
                    value={periodDate}
                    onChange={(e) => setPeriodDate(e.target.value)}
                    className="w-full p-3 bg-[#F7EAF8] rounded-[16px] text-sm outline-none text-[#4A2C5A]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold">Flow Level:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Light', 'Medium', 'Heavy'].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setFlowLevel(lvl)}
                        className={`p-2.5 rounded-[14px] text-xs font-medium transition-all ${
                          flowLevel === lvl ? 'bg-[#4A2C5A] text-white' : 'bg-[#F7EAF8] text-[#4A2C5A]'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => {
                    alert('Period dates and flow saved successfully!');
                    setActiveModal(null);
                  }}
                  className="w-full py-3 bg-[#4A2C5A] text-white font-semibold text-xs rounded-[20px]"
                >
                  Save Log
                </button>
              </div>
            )}

            {/* Weight & Body Positivity Modal */}
            {activeModal === 'weight' && (
              <div className="space-y-4 text-[#4A2C5A]">
                <h3 className="font-brand text-xl">Update Weight & Water</h3>
                <div className="space-y-2">
                  <label className="text-xs font-semibold">Weight (kg):</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-3 bg-[#F7EAF8] rounded-[16px] text-sm outline-none text-[#4A2C5A]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold">Log Water Glasses Today ({waterGlasses}/8):</label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setWaterGlasses((prev) => Math.max(0, prev - 1))}
                      className="w-9 h-9 rounded-full bg-[#F7EAF8] font-bold text-lg"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-base">{waterGlasses} Glasses</span>
                    <button
                      type="button"
                      onClick={() => setWaterGlasses((prev) => prev + 1)}
                      className="w-9 h-9 rounded-full bg-[#4A2C5A] text-white font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-[16px] text-[11px] text-emerald-800">
                  💖 <em>Reminder: Weight fluctuations during your cycle are completely natural due to water retention. Be kind to yourself!</em>
                </div>
                <button
                  onClick={() => {
                    alert('Wellness record saved!');
                    setActiveModal(null);
                  }}
                  className="w-full py-3 bg-[#4A2C5A] text-white font-semibold text-xs rounded-[20px]"
                >
                  Save Wellness Record
                </button>
              </div>
            )}

            {/* Mental Wellness Modal */}
            {activeModal === 'mental_wellness' && (
              <div className="space-y-4 text-[#4A2C5A]">
                <h3 className="font-brand text-xl">Daily Mood Check-in</h3>
                <p className="text-xs text-[#4A2C5A]/70">
                  How are you feeling inside your mind and body today?
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Calm & Peaceful', 'Happy & Energized', 'Anxious / Overthinking', 'Stressed / School Load', 'Tired / Low Energy'].map((item) => (
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
                  onClick={() => {
                    alert(`Logged mood: "${mood}". Remember you are doing great!`);
                    setActiveModal(null);
                  }}
                  className="w-full py-3 bg-[#4A2C5A] text-white font-semibold text-xs rounded-[20px]"
                >
                  Confirm Check-in
                </button>
              </div>
            )}

            {/* Guided Calm Breathing Modal */}
            {activeModal === 'breathing' && (
              <div className="space-y-4 text-[#4A2C5A] text-center">
                <div className="inline-flex p-3 bg-purple-100 rounded-full text-purple-700">
                  <Wind className="w-8 h-8" />
                </div>
                <h3 className="font-brand text-xl">1-Minute 4-7-8 Calm Breathing</h3>
                <p className="text-xs text-[#4A2C5A]/75">
                  Helps instantly relieve exam anxiety, pre-period tension, and physical cramps.
                </p>

                <div className="p-6 bg-[#F7EAF8] rounded-[24px] border border-[#4A2C5A]/15 min-h-[120px] flex items-center justify-center">
                  <p className="font-bold text-sm text-[#4A2C5A] animate-pulse">
                    {breathingStep}
                  </p>
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    disabled={isBreathingActive}
                    onClick={startBreathingExercise}
                    className="w-full py-3 bg-[#4A2C5A] disabled:opacity-50 text-white font-semibold text-xs rounded-[20px]"
                  >
                    {isBreathingActive ? 'Breathe with guidance...' : 'Start 4-7-8 Breathing'}
                  </button>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-full py-2.5 bg-transparent text-[#4A2C5A] text-xs font-semibold"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

            {/* Health Reports Vault Modal */}
            {activeModal === 'health_reports' && (
              <div className="space-y-4 text-[#4A2C5A]">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-brand text-xl">Encrypted Health Vault</h3>
                </div>
                <p className="text-xs text-[#4A2C5A]/70">
                  Only you can unlock your saved documents.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-[#F7EAF8] rounded-[16px] flex items-center justify-between">
                    <div>
                      <p className="font-bold">School_Vaccination_Card.pdf</p>
                      <p className="text-[10px] text-[#4A2C5A]/60">Uploaded Aug 2026</p>
                    </div>
                    <span className="text-[#4A2C5A] font-bold text-[11px] bg-white px-2 py-0.5 rounded-full">Encrypted</span>
                  </div>
                  <div className="p-3 bg-[#F7EAF8] rounded-[16px] flex items-center justify-between">
                    <div>
                      <p className="font-bold">Annual_Health_CBC_Check.pdf</p>
                      <p className="text-[10px] text-[#4A2C5A]/60">Uploaded May 2026</p>
                    </div>
                    <span className="text-[#4A2C5A] font-bold text-[11px] bg-white px-2 py-0.5 rounded-full">Encrypted</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    alert('Upload report modal simulated! Document encrypted.');
                    setActiveModal(null);
                  }}
                  className="w-full py-3 bg-[#4A2C5A] text-white font-semibold text-xs rounded-[20px] flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload New Health Report</span>
                </button>
              </div>
            )}

            {/* Smart Referral Modal */}
            {activeModal === 'smart_referral' && (
              <div className="space-y-4 text-[#4A2C5A]">
                <div className="flex items-center space-x-2 text-rose-600">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="font-brand text-xl">Smart Referral Engine</h3>
                </div>
                <div className="space-y-2 text-xs bg-[#F7EAF8] p-3.5 rounded-[16px]">
                  <p className="font-bold text-sm">Adolescent & Women Health Center</p>
                  <p>📍 Sector 4, Civic Hospital Complex</p>
                  <p>🟢 Facility Status: Verified & Open (9 AM – 7 PM)</p>
                  <p>👩‍⚕️ On-Duty: Dr. R. Sharma (Pediatric & Adolescent Health)</p>
                  <p className="pt-1 text-rose-700 font-bold">Helpline: +91 1800-185-1100 • 181</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      alert('Connecting to 24/7 Women & Child Helpline: 181...');
                    }}
                    className="py-3 bg-emerald-600 text-white font-semibold text-xs rounded-[20px] flex items-center justify-center space-x-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Helpline (181)</span>
                  </button>
                  <button
                    onClick={() => {
                      alert('Opening navigation to Adolescent & Women Health Center...');
                      setActiveModal(null);
                    }}
                    className="py-3 bg-rose-600 text-white font-semibold text-xs rounded-[20px] flex items-center justify-center space-x-1"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Open Navigation</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
