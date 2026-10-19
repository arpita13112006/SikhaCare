import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FlowerDecorations from '../components/FlowerDecorations';
import SakhiLogo from '../components/SakhiLogo';
import { useUser } from '../context/UserContext';
import roboAvatar from '../assets/robo-avatar.png';
import {
  Calendar,
  Baby,
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
  Heart,
  PhoneCall,
  ShieldCheck,
  Clock,
  CheckCircle2
} from 'lucide-react';

export default function WomanDashboardPage() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // Mode verification: only accessible when logged in as Woman Mode
  useEffect(() => {
    if (user.mode && user.mode !== 'Woman Mode') {
      navigate('/girl-dashboard', { replace: true });
    }
  }, [user.mode, navigate]);

  // Active modal state
  const [activeModal, setActiveModal] = useState(null);

  // Feature states for Woman Mode
  const [periodDate, setPeriodDate] = useState('2026-09-28');
  const [pregnancyWeek, setPregnancyWeek] = useState(18);
  const [fetalKicks, setFetalKicks] = useState(8);
  const [bloodPressure, setBloodPressure] = useState('115/75');
  const [prenatalVitaminsTaken, setPrenatalVitaminsTaken] = useState(true);

  // Chat conversation state
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'sakhi',
      text: `Namaste ${user.name || 'Sister'}! 🌺 I am Sakhi, your private health companion. I am here to support you with period tracking, pregnancy milestones, maternal nutrition, and reproductive well-being with medically grounded guidance.`
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

    // Evidence-grounded, empathetic Sakhi response for women
    setTimeout(() => {
      let botResponse = `Thank you for sharing, ${user.name || 'sister'}. Based on approved maternal and women's health guidelines, let's explore "${userText}".`;
      const lower = userText.toLowerCase();

      if (lower.includes('pregnant') || lower.includes('trimester') || lower.includes('baby') || lower.includes('week')) {
        botResponse = `During Week 18 (Second Trimester), your baby is actively developing hearing reflexes and gentle movements (quickening). Make sure to continue daily iron and folic acid supplementation, stay well-hydrated, and sleep on your left side to optimize blood flow.`;
      } else if (lower.includes('ovulation') || lower.includes('fertile') || lower.includes('conceive')) {
        botResponse = `Your fertile window generally spans the 5 days before ovulation plus ovulation day itself. Tracking basal body temperature and changes in cervical fluid can help you pinpoint this window accurately.`;
      } else if (lower.includes('bleeding') || lower.includes('spotting') || lower.includes('high bp') || lower.includes('severe headache')) {
        botResponse = `⚠️ Any unusual bleeding, severe continuous abdominal pain, or sudden high blood pressure during pregnancy requires prompt clinical evaluation. Please open Smart Referral immediately to navigate to the nearest 24/7 Maternity Hospital.`;
      } else if (lower.includes('fatigue') || lower.includes('tired') || lower.includes('iron')) {
        botResponse = `Hormonal shifts and higher blood volume during pregnancy or the luteal phase often cause fatigue. Including iron-rich foods (spinach, lentils, pomegranate) paired with Vitamin C aids absorption. Remember to schedule short rest periods during the day.`;
      }

      setChatMessages((prev) => [...prev, { sender: 'sakhi', text: botResponse }]);
    }, 600);
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
                  🌺 Woman Mode
                </span>
              </div>
              <p className="text-xs md:text-sm font-sans text-[#4A2C5A]/80">
                Your private health space • Reproductive, pregnancy & maternal care
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

        {/* Woman Mode Hero AI Companion Banner */}
        <div className="bg-gradient-to-r from-[#4A2C5A] via-[#5C3770] to-[#773E84] text-white rounded-[28px] p-6 md:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 z-10 max-w-lg text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-[#FFF0FA]/20 px-3 py-1 rounded-full text-xs font-medium text-[#E0ACE4]">
              <Sparkles className="w-3.5 h-3.5 text-[#E0ACE4]" />
              <span>Sakhi AI Companion for Women</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-brand">
              Ask Sakhi Anything Privately
            </h2>
            <p className="text-xs md:text-sm font-sans text-white/85 leading-relaxed">
              Evidence-grounded medical guidance for periods, ovulation, prenatal health, fetal milestones, and maternal safety.
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
                  setInputMessage('What are normal symptoms during Week 18 of pregnancy?');
                  setActiveModal('sakhi_chat');
                }}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-[20px] flex items-center space-x-1.5 transition-all"
              >
                <span>🤰 Week 18 Milestones</span>
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
              Woman Mode Health Modules
            </h3>
            <p className="text-xs text-[#4A2C5A]/70">
              Personalized for adult reproductive, pregnancy & maternal care
            </p>
          </div>
          <span className="text-xs font-sans font-semibold bg-white/80 px-3 py-1 rounded-full text-[#4A2C5A] border border-white shadow-sm">
            5 Modules Active
          </span>
        </div>

        {/* 5 Modules Grid for Woman Mode (from PRD Section 9) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* 1. Periods & Ovulation Tracker */}
          <div className="bg-white rounded-[28px] p-6 shadow-lg border border-white/70 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-[#F7EAF8] rounded-[20px]">
                <Calendar className="w-6 h-6 text-[#4A2C5A]" />
              </div>
              <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">
                Fertility & Cycle
              </span>
            </div>

            <div>
              <h4 className="text-lg font-sans font-bold text-[#4A2C5A]">
                Periods & Ovulation
              </h4>
              <p className="text-xs text-[#4A2C5A]/75 mt-1">
                Record period history, predict ovulation & monitor fertile window.
              </p>
              <div className="mt-3 bg-[#F7EAF8] p-3 rounded-[16px] text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span>Last Period Start:</span>
                  <span className="font-bold text-[#4A2C5A]">{periodDate}</span>
                </div>
                <div className="flex justify-between items-center font-medium">
                  <span>Fertile Window:</span>
                  <span className="font-bold text-pink-700">Oct 12 – Oct 17 🌸</span>
                </div>
                <div className="flex justify-between items-center text-[#4A2C5A]/80">
                  <span>Estimated Ovulation:</span>
                  <span>Oct 15, 2026</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('period_ovulation')}
              className="w-full py-2.5 bg-[#F7EAF8] hover:bg-[#ebd5eb] text-[#4A2C5A] font-semibold text-xs rounded-[16px] flex items-center justify-center space-x-1 transition-all"
            >
              <span>View Fertile Calendar & History</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 2. Pregnancy Tracking (Full Maternal Care Suite) */}
          <div className="bg-white rounded-[28px] p-6 shadow-lg border border-white/70 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-amber-100 rounded-[20px]">
                <Baby className="w-6 h-6 text-amber-700" />
              </div>
              <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full">
                Trimester 2 (Week {pregnancyWeek})
              </span>
            </div>

            <div>
              <h4 className="text-lg font-sans font-bold text-[#4A2C5A]">
                Pregnancy Tracking
              </h4>
              <p className="text-xs text-[#4A2C5A]/75 mt-1">
                Maintain relevant pregnancy milestones, fetal progress & maternal checkups.
              </p>
              <div className="mt-3 bg-[#F7EAF8] p-3 rounded-[16px] text-xs space-y-2">
                <div className="flex justify-between items-center font-medium">
                  <span>Gestational Progress:</span>
                  <span className="font-bold text-[#4A2C5A]">Week {pregnancyWeek} of 40</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-white h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(pregnancyWeek / 40) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[#4A2C5A]/85">
                  <span>Baby Size:</span>
                  <span className="font-bold text-[#4A2C5A]">Size of a Bell Pepper 🫑</span>
                </div>
                <div className="flex justify-between items-center text-[#4A2C5A]/80">
                  <span>Active Fetal Kicks:</span>
                  <span className="font-bold text-amber-800">{fetalKicks} kicks logged</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('pregnancy')}
              className="w-full py-2.5 bg-[#F7EAF8] hover:bg-[#ebd5eb] text-[#4A2C5A] font-semibold text-xs rounded-[16px] flex items-center justify-center space-x-1 transition-all"
            >
              <span>View Pregnancy Suite & Kicks</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3. Health Reports & Diagnostic Vault */}
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
                Store maternal ultrasound scans, blood tests & diagnostic records privately.
              </p>
              <div className="mt-3 bg-[#F7EAF8] p-3 rounded-[16px] text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span>Stored Records:</span>
                  <span className="font-bold text-[#4A2C5A]">3 Encrypted Files</span>
                </div>
                <div className="flex justify-between items-center text-[#4A2C5A]/80">
                  <span>Latest Scan:</span>
                  <span>Week18_Anomaly_Ultrasound.pdf</span>
                </div>
                <div className="text-[11px] text-[#4A2C5A]/70 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>PIN & Biometric Protected</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('health_reports')}
              className="w-full py-2.5 bg-[#F7EAF8] hover:bg-[#ebd5eb] text-[#4A2C5A] font-semibold text-xs rounded-[16px] flex items-center justify-center space-x-1 transition-all"
            >
              <span>Manage Medical Reports</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4. Hormonal & Maternal Wellness Vitals */}
          <div className="bg-white rounded-[28px] p-6 shadow-lg border border-white/70 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between">
              <div className="p-3 bg-rose-100 rounded-[20px]">
                <Heart className="w-6 h-6 text-rose-600" />
              </div>
              <span className="text-xs font-semibold bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full">
                Maternal Vitals
              </span>
            </div>

            <div>
              <h4 className="text-lg font-sans font-bold text-[#4A2C5A]">
                Maternal Wellness & Vitals
              </h4>
              <p className="text-xs text-[#4A2C5A]/75 mt-1">
                Monitor blood pressure, iron supplementation & wellness checks.
              </p>
              <div className="mt-3 bg-[#F7EAF8] p-3 rounded-[16px] text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <span>Blood Pressure:</span>
                  <span className="font-bold text-emerald-700">{bloodPressure} mmHg (Normal)</span>
                </div>
                <div className="flex justify-between items-center text-[#4A2C5A]/80">
                  <span>Daily Prenatal Vitamins:</span>
                  <span className="font-semibold text-[#4A2C5A]">
                    {prenatalVitaminsTaken ? 'Taken Today ✅' : 'Pending ⏳'}
                  </span>
                </div>
                <div className="text-[11px] text-[#4A2C5A]/70 bg-white p-2 rounded-[12px] flex items-center justify-between">
                  <span>Next Anomaly Scan:</span>
                  <span className="font-bold text-[#4A2C5A]">Oct 28 (Week 20)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal('vitals')}
              className="w-full py-2.5 bg-[#F7EAF8] hover:bg-[#ebd5eb] text-[#4A2C5A] font-semibold text-xs rounded-[16px] flex items-center justify-center space-x-1 transition-all"
            >
              <span>Update Vitals & Vitamins</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 5. Smart Referral Engine (Maternal Care & Triage) */}
          <div className="bg-white rounded-[28px] p-6 shadow-lg border border-white/70 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all md:col-span-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-red-100 rounded-[20px]">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-lg font-sans font-bold text-[#4A2C5A]">
                    Smart Referral Engine (Maternal & Emergency Care)
                  </h4>
                  <p className="text-xs text-[#4A2C5A]/75">
                    Locate verified OB/GYN centers, 24/7 maternity labor units & emergency ambulance routes.
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold bg-red-100 text-red-700 px-3 py-1 rounded-full">
                Safety & Triage
              </span>
            </div>

            <div className="bg-[#F7EAF8] p-4 rounded-[20px] flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#4A2C5A]/90 space-y-1 text-center md:text-left">
                <p className="font-bold text-sm text-[#4A2C5A]">
                  Nearest Facility: District Women’s & Maternity Hospital
                </p>
                <p>📍 Sector 4, Hospital Ring Road • 24/7 Labor Room Active • Distance: 2.4 km</p>
                <p className="text-red-700 font-semibold">📞 Maternity Emergency Helpline: 102 • Ambulance: 108 • Women Helpline: 181</p>
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
                    <h3 className="font-brand text-xl text-[#4A2C5A]">Sakhi Companion (Woman Mode)</h3>
                    <p className="text-xs text-[#4A2C5A]/70">Evidence-Grounded Reproductive & Maternal Care</p>
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
                    'Safe exercises in Trimester 2?',
                    'How to recognize Braxton Hicks contractions?',
                    'Iron rich foods during pregnancy'
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
                    placeholder="Ask Sakhi any maternal or reproductive question..."
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

            {/* Period & Ovulation Modal */}
            {activeModal === 'period_ovulation' && (
              <div className="space-y-4 text-[#4A2C5A]">
                <h3 className="font-brand text-xl">Periods & Fertile Window</h3>
                <div className="space-y-2">
                  <label className="text-xs font-semibold">Last Period Date:</label>
                  <input
                    type="date"
                    value={periodDate}
                    onChange={(e) => setPeriodDate(e.target.value)}
                    className="w-full p-3 bg-[#F7EAF8] rounded-[16px] text-sm outline-none text-[#4A2C5A]"
                  />
                </div>
                <div className="p-3 bg-[#F7EAF8] rounded-[16px] text-xs space-y-1.5">
                  <p className="font-bold text-[#4A2C5A]">🌸 Next Predicted Ovulation:</p>
                  <p className="text-pink-700 font-semibold">Oct 15, 2026</p>
                  <p className="text-[11px] text-[#4A2C5A]/70">
                    Highest conception likelihood spans 3 days before and day of ovulation.
                  </p>
                </div>
                <button
                  onClick={() => {
                    alert('Period and ovulation tracking updated!');
                    setActiveModal(null);
                  }}
                  className="w-full py-3 bg-[#4A2C5A] text-white font-semibold text-xs rounded-[20px]"
                >
                  Save & Update
                </button>
              </div>
            )}

            {/* Pregnancy Tracking Modal */}
            {activeModal === 'pregnancy' && (
              <div className="space-y-4 text-[#4A2C5A]">
                <h3 className="font-brand text-xl">Pregnancy Suite & Milestones</h3>
                <div className="space-y-2">
                  <label className="text-xs font-semibold">Current Gestational Week:</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="range"
                      min="1"
                      max="40"
                      value={pregnancyWeek}
                      onChange={(e) => setPregnancyWeek(Number(e.target.value))}
                      className="flex-1 accent-[#4A2C5A]"
                    />
                    <span className="font-bold text-sm bg-[#F7EAF8] px-3 py-1 rounded-[12px]">Week {pregnancyWeek}</span>
                  </div>
                </div>

                {/* Fetal Kick Counter */}
                <div className="p-3 bg-[#F7EAF8] rounded-[16px] text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Fetal Movement Counter (Today):</span>
                    <span className="font-bold text-base text-[#4A2C5A]">{fetalKicks} Kicks</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFetalKicks((prev) => prev + 1)}
                    className="w-full py-2 bg-[#4A2C5A] text-white rounded-[12px] font-semibold flex items-center justify-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tap to Record Fetal Kick</span>
                  </button>
                </div>

                <div className="p-3 bg-amber-50 rounded-[16px] text-[11px] text-amber-800 space-y-1">
                  <p className="font-bold">💡 Week {pregnancyWeek} Doctor Guidance:</p>
                  <p>• Schedule your Level-II Anomaly ultrasound scan between weeks 18–22.</p>
                  <p>• Continue taking iron, calcium, and folic acid as prescribed.</p>
                </div>

                <button
                  onClick={() => {
                    alert('Pregnancy milestones updated!');
                    setActiveModal(null);
                  }}
                  className="w-full py-3 bg-[#4A2C5A] text-white font-semibold text-xs rounded-[20px]"
                >
                  Save Milestone
                </button>
              </div>
            )}

            {/* Health Reports Modal */}
            {activeModal === 'health_reports' && (
              <div className="space-y-4 text-[#4A2C5A]">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-brand text-xl">Maternal Diagnostic Vault</h3>
                </div>
                <p className="text-xs text-[#4A2C5A]/70">
                  Encrypted storage for obstetric ultrasounds and lab results.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-[#F7EAF8] rounded-[16px] flex items-center justify-between">
                    <div>
                      <p className="font-bold">Week18_Anomaly_Ultrasound.pdf</p>
                      <p className="text-[10px] text-[#4A2C5A]/60">Uploaded Oct 2026 • Verified OB/GYN</p>
                    </div>
                    <span className="text-[#4A2C5A] font-bold text-[11px] bg-white px-2 py-0.5 rounded-full">Encrypted</span>
                  </div>
                  <div className="p-3 bg-[#F7EAF8] rounded-[16px] flex items-center justify-between">
                    <div>
                      <p className="font-bold">Maternal_Thyroid_Hemoglobin.pdf</p>
                      <p className="text-[10px] text-[#4A2C5A]/60">Uploaded Sep 2026 • Hb: 12.2 g/dL</p>
                    </div>
                    <span className="text-[#4A2C5A] font-bold text-[11px] bg-white px-2 py-0.5 rounded-full">Encrypted</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    alert('Report upload simulated! Document encrypted.');
                    setActiveModal(null);
                  }}
                  className="w-full py-3 bg-[#4A2C5A] text-white font-semibold text-xs rounded-[20px] flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload Maternal Scan / Report</span>
                </button>
              </div>
            )}

            {/* Vitals & Vitamins Modal */}
            {activeModal === 'vitals' && (
              <div className="space-y-4 text-[#4A2C5A]">
                <h3 className="font-brand text-xl">Maternal Vitals Log</h3>
                <div className="space-y-2">
                  <label className="text-xs font-semibold">Blood Pressure (mmHg):</label>
                  <input
                    type="text"
                    value={bloodPressure}
                    onChange={(e) => setBloodPressure(e.target.value)}
                    placeholder="e.g. 115/75"
                    className="w-full p-3 bg-[#F7EAF8] rounded-[16px] text-sm outline-none text-[#4A2C5A]"
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F7EAF8] rounded-[16px]">
                  <span className="text-xs font-semibold">Prenatal Vitamins Log:</span>
                  <button
                    type="button"
                    onClick={() => setPrenatalVitaminsTaken(!prenatalVitaminsTaken)}
                    className={`px-3 py-1.5 rounded-[12px] text-xs font-bold transition-all ${
                      prenatalVitaminsTaken ? 'bg-emerald-600 text-white' : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    {prenatalVitaminsTaken ? 'Taken Today ✅' : 'Mark as Taken'}
                  </button>
                </div>
                <button
                  onClick={() => {
                    alert('Vitals updated successfully!');
                    setActiveModal(null);
                  }}
                  className="w-full py-3 bg-[#4A2C5A] text-white font-semibold text-xs rounded-[20px]"
                >
                  Save Vitals
                </button>
              </div>
            )}

            {/* Smart Referral Modal */}
            {activeModal === 'smart_referral' && (
              <div className="space-y-4 text-[#4A2C5A]">
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="font-brand text-xl">Smart Referral & Triage</h3>
                </div>
                <div className="space-y-2 text-xs bg-[#F7EAF8] p-3.5 rounded-[16px]">
                  <p className="font-bold text-sm">District Women’s & Maternity Hospital</p>
                  <p>📍 Sector 4, Hospital Ring Road</p>
                  <p>🟢 Emergency Labor Room: 24/7 Operational</p>
                  <p>👩‍⚕️ OB/GYN Specialist & Pediatrician on Duty</p>
                  <p>📞 Emergency Maternity Hotline: 102 • Ambulance: 108</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      alert('Connecting to 24/7 Maternity Emergency Line 102...');
                    }}
                    className="py-3 bg-red-600 text-white font-semibold text-xs rounded-[20px] flex items-center justify-center space-x-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Emergency (102)</span>
                  </button>
                  <button
                    onClick={() => {
                      alert('Opening GPS navigation to District Women’s Hospital...');
                      setActiveModal(null);
                    }}
                    className="py-3 bg-[#4A2C5A] text-white font-semibold text-xs rounded-[20px] flex items-center justify-center space-x-1"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Start Navigation</span>
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
