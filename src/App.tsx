/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Wifi, Phone, Check, X, ChevronLeft, Info, CheckCircle2, Tv, Gamepad2, ArrowRight, ShieldCheck, Zap, Globe, MapPin, Search, Lock, Mail, MessageSquare } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useInView } from "motion/react";

type Step = 'landing' | 'provider' | 'wishes' | 'price' | 'speed' | 'zip' | 'name' | 'email' | 'phone' | 'callback' | 'loading' | 'results' | 'how-it-works' | 'providers-list' | 'support';

interface Answers {
  hasProvider: boolean | null;
  currentProvider: string;
  wishes: string[];
  priceRange: string;
  speed: string;
  zipCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  callbackDate: string;
  callbackTime: string;
}

export default function App() {
  const [step, setStep] = useState<Step>('landing');
  const [answers, setAnswers] = useState<Answers>({
    hasProvider: null,
    currentProvider: '',
    wishes: [],
    priceRange: '',
    speed: '',
    zipCode: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    callbackDate: 'Tuesday, April 21, 2026',
    callbackTime: '6:30 PM - 6:45 PM',
  });
const sendData = () => {
  const url = "https://script.google.com/macros/s/AKfycbxzrsWW9gWVBkmrJa-2ko2_cK6NzjFcSmM5xDCJV3U92qofArNl5wcKMct5ds498MRP3w/exec";

  const params = new URLSearchParams({
    full_name: `${answers.firstName || ""} ${answers.lastName || ""}`,
    email: answers.email || "",
    phone_number: answers.phone || "",
    zip_code: answers.zipCode || ""
  });

  const img = new Image();
  img.src = `${url}?${params.toString()}`;

  alert("Data sent");
};
  
  const [showCookies, setShowCookies] = useState(true);

  const steps: Step[] = ['landing', 'provider', 'wishes', 'price', 'speed', 'zip', 'name', 'email', 'phone'];
  const currentStepIndex = steps.indexOf(step);
  
  // Custom progress percentages to match image
  const getProgress = () => {
    if (step === 'landing') return 0;
    if (step === 'name') return 80;
    if (step === 'email') return 87;
    if (step === 'phone') return 93;
    return Math.round(((currentStepIndex) / (steps.length)) * 100);
  };
  const progress = getProgress();

  const handleNext = () => {
    if (step === 'landing') setStep('provider');
    else if (step === 'provider') setStep('wishes');
    else if (step === 'wishes') setStep('price');
    else if (step === 'price') setStep('speed');
    else if (step === 'speed') setStep('zip');
    else if (step === 'zip') setStep('name');
    else if (step === 'name') setStep('email');
    else if (step === 'email') setStep('phone');
    else if (step === 'phone') setStep('callback');
else if (step === 'callback') {
  sendData(); // 👈 SEND DATA HERE
}
  };

  const handleBack = () => {
    if (step === 'provider') setStep('landing');
    else if (step === 'wishes') setStep('provider');
    else if (step === 'price') setStep('wishes');
    else if (step === 'speed') setStep('price');
    else if (step === 'zip') setStep('speed');
    else if (step === 'name') setStep('zip');
    else if (step === 'email') setStep('name');
    else if (step === 'phone') setStep('email');
    else if (step === 'callback') setStep('phone');
  };

  const toggleWish = (wish: string) => {
    setAnswers(prev => ({
      ...prev,
      wishes: prev.wishes.includes(wish) 
        ? prev.wishes.filter(w => w !== wish)
        : [...prev.wishes, wish]
    }));
  };

  return (
    <div className="min-h-screen bg-white selection:bg-pink-100 selection:text-pink-900 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setStep('landing')}>
            <div className="relative">
              <MapPin className="text-blue-600 w-10 h-10 fill-blue-50" />
              <div className="absolute top-1 left-1.5 flex flex-col items-center">
                 <Wifi className="w-7 h-7 text-blue-600 rotate-180" />
              </div>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="text-xl font-black text-black leading-none tracking-tighter uppercase">Best Net Service</span>
              <span className="text-xl font-bold text-black leading-none tracking-tighter uppercase">Companies <span className="text-blue-600">.com</span></span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-600">
            <button onClick={() => setStep('how-it-works')} className="hover:text-blue-600 transition-colors uppercase">How it works</button>
            <button onClick={() => setStep('providers-list')} className="hover:text-blue-600 transition-colors uppercase">Providers</button>
            <button onClick={() => setStep('support')} className="hover:text-blue-600 transition-colors uppercase">Support</button>
          </div>

        </div>
      </nav>

      <main className="pt-32 pb-20">
        <AnimatePresence mode="wait">
          {/* Callback Step */}
          {step === 'callback' && (
            <motion.div
              key="callback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto px-6 text-center"
            >
              <h1 className="text-5xl md:text-6xl font-black text-[#1e40af] mb-16 leading-tight">
                We found the perfect offer <br /> for you!
              </h1>

              <div className="max-w-3xl mx-auto mb-20">
                <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50 relative flex items-center gap-8 text-left">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full shadow-lg border border-slate-100 flex items-center justify-center p-4 flex-shrink-0">
                    <div className="flex flex-col items-center -space-y-1">
                      <Wifi className="w-8 h-8 text-blue-500 rotate-180" />
                      <span className="text-[10px] font-black leading-none uppercase tracking-tighter">centerfield</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-slate-700 text-lg">
                      Our call center is closed at the moment. Don't worry, your query has been registered. Our partner <span className="font-bold text-black font-sans">Centerfield</span> will call you when the call center opens on <br className="hidden md:block" />
                      <p>(651) 432-9293</p>
                    </p>
                  </div>
                </div>
              </div>

              <div className="max-w-2xl mx-auto text-left space-y-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-black">  Check Results</h3>
                  <p className="text-slate-600 font-medium">Find the best internet plans based on your preferencesgit</p>
                </div>
                <div className="space-y-4">
      <p className="text-lg font-semibold text-black">Check results</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Wizard Flow */}
          {(step !== 'loading' && step !== 'results' && step !== 'how-it-works' && step !== 'providers-list' && step !== 'support') && (
            <motion.div
              key="main-wizard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto px-6 text-center"
            >
              {step === 'landing' && (
                <>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#3b82f6] mb-4">
                    Best Internet Offers in your area
                  </h1>
                  <h2 className="text-4xl md:text-5xl font-black text-[#1e40af] mb-12">
                    Starting as low as $25/mo
                  </h2>
                </>
              )}

              {(step === 'name' || step === 'email' || step === 'phone' || step !== 'landing') && step !== 'landing' && (
                <div className="max-w-2xl mx-auto mb-10">
                   <div className="flex justify-center mb-10">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <MapPin className="text-blue-600 w-10 h-10 fill-blue-50" />
                        <div className="absolute top-1 left-1.5 flex flex-col items-center">
                          <Wifi className="w-7 h-7 text-blue-600 rotate-180" />
                        </div>
                      </div>
                      <div className="flex flex-col -space-y-1 text-left">
                        <span className="text-xl font-black text-black leading-none tracking-tighter uppercase">Best Net Services</span>
                        <span className="text-xl font-bold text-black leading-none tracking-tighter uppercase">Companies <span className="text-blue-600">.com</span></span>
                      </div>
                    </div>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-end">
                      <div className="text-right">
                        <span className="text-xs font-black inline-block text-[#ff4b7d]">
                          {progress}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-100">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#ff4b7d]"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              )}

              <div className="max-w-2xl mx-auto relative">
                <div className="bg-white rounded-[1.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 relative z-10">
                  <div className="space-y-10">
                    {step === 'landing' && (
                      <div className="space-y-8">
                        <h3 className="text-3xl font-bold text-blue-600 leading-tight">
                          Do you currently have an internet service provider?
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                          <button 
                            onClick={() => setAnswers(prev => ({ ...prev, hasProvider: true }))}
                            className={`flex flex-col items-center gap-4 p-8 rounded-2xl border-2 transition-all ${
                              answers.hasProvider === true ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-black text-xl text-black">YES</span>
                              <CheckCircle2 className="w-8 h-8 text-green-500" />
                            </div>
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${answers.hasProvider === true ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                              {answers.hasProvider === true && <div className="w-3 h-3 bg-white rounded-full" />}
            </div>
                          </button>
                          <button 
                            onClick={() => setAnswers(prev => ({ ...prev, hasProvider: false }))}
                            className={`flex flex-col items-center gap-4 p-8 rounded-2xl border-2 transition-all ${
                              answers.hasProvider === false ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-black text-xl text-black">NO</span>
                              <X className="w-8 h-8 text-red-500" />
                            </div>
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${answers.hasProvider === false ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                              {answers.hasProvider === false && <div className="w-3 h-3 bg-white rounded-full" />}
                            </div>
                          </button>
                        </div>
                      </div>
                    )}

                    {step === 'provider' && (
                      <div className="space-y-8">
                        <h3 className="text-3xl font-bold text-blue-600 leading-tight">Select your current provider</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {['Xfinity', 'Spectrum', 'Verizon', 'AT&T', 'Google', 'Other'].map(p => (
                            <button 
                              key={p}
                              onClick={() => setAnswers(prev => ({ ...prev, currentProvider: p }))}
                              className={`p-4 rounded-xl border-2 transition-all font-bold ${
                                answers.currentProvider === p ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 'wishes' && (
                      <div className="space-y-8">
                        <h3 className="text-3xl font-bold text-blue-600 leading-tight">What do you use internet for?</h3>
                        <div className="grid gap-3 text-left">
                          {[
                            {id: 'streaming', label: 'Streaming HD Movies', icon: <Tv className="w-5 h-5"/>},
                            {id: 'gaming', label: 'Online Gaming', icon: <Gamepad2 className="w-5 h-5"/>},
                            {id: 'work', label: 'Working from Home', icon: <Globe className="w-5 h-5"/>},
                          ].map(w => (
                            <button 
                              key={w.id}
                              onClick={() => toggleWish(w.id)}
                              className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${
                                answers.wishes.includes(w.id) ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'
                              }`}
                            >
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                                {w.icon}
                              </div>
                              <span className="font-bold text-lg">{w.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 'price' && (
                      <div className="space-y-8">
                        <h3 className="text-3xl font-bold text-blue-600 leading-tight">Desired budget range?</h3>
                        <div className="grid gap-3">
                          {['$20-$40', '$40-$70', '$70-$100', '$100+'].map(p => (
                            <button 
                              key={p}
                              onClick={() => setAnswers(prev => ({ ...prev, priceRange: p }))}
                              className={`p-5 rounded-xl border-2 transition-all font-bold text-lg ${
                                answers.priceRange === p ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'
                              }`}
                            >
                              {p} / month
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 'speed' && (
                      <div className="space-y-8">
                        <h3 className="text-3xl font-bold text-blue-600 leading-tight">Required download speed?</h3>
                        <div className="grid gap-3">
                          {['100 Mbps', '300 Mbps', '500 Mbps', '1000 Mbps+'].map(s => (
                            <button 
                              key={s}
                              onClick={() => setAnswers(prev => ({ ...prev, speed: s }))}
                              className={`p-5 rounded-xl border-2 transition-all font-bold text-lg ${
                                answers.speed === s ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 'zip' && (
                      <div className="space-y-8 text-center">
                        <h3 className="text-3xl font-bold text-blue-600 leading-tight">Where should we look?</h3>
                        <div className="relative group max-w-xs mx-auto">
                           <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600" />
                           <input 
                            type="text" 
                            maxLength={5}
                            placeholder="ZIP Code"
                            value={answers.zipCode}
                            onChange={(e) => setAnswers(prev => ({ ...prev, zipCode: e.target.value.replace(/\D/g, '') }))}
                            className="w-full pl-12 pr-4 py-6 text-2xl font-bold border-2 border-slate-200 rounded-2xl focus:border-blue-600 focus:outline-none transition-all text-center"
                           />
                        </div>
                      </div>
                    )}

                    {step === 'name' && (
                      <div className="space-y-8">
                        <h3 className="text-4xl font-bold text-[#3b82f6] leading-tight flex items-center justify-center gap-3">
                          🎉 We found several offers for you!
                        </h3>
                        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center gap-3 text-slate-600">
                          <Info className="w-5 h-5 text-slate-400" />
                          <span className="font-medium">Just 2 quick questions left!</span>
                        </div>
                        <div className="space-y-4">
                          <input 
                            type="text"
                            placeholder="First name"
                            value={answers.firstName}
                            onChange={(e) => setAnswers(prev => ({ ...prev, firstName: e.target.value }))}
                            className="w-full px-6 py-5 text-xl font-medium border-2 border-[#ff4b7d]/30 rounded-xl focus:border-[#ff4b7d] focus:outline-none transition-all placeholder:text-slate-400"
                          />
                          <input 
                            type="text"
                            placeholder="Last name"
                            value={answers.lastName}
                            onChange={(e) => setAnswers(prev => ({ ...prev, lastName: e.target.value }))}
                            className="w-full px-6 py-5 text-xl font-medium border-2 border-[#ff4b7d]/30 rounded-xl focus:border-[#ff4b7d] focus:outline-none transition-all placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                    )}

                    {step === 'email' && (
                      <div className="space-y-8">
                        <h3 className="text-4xl font-bold text-[#3b82f6] leading-tight">
                          What is your email?
                        </h3>
                        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center gap-3 text-slate-600 text-left">
                          <Info className="w-6 h-6 text-slate-400 flex-shrink-0" />
                          <span className="text-sm font-medium leading-tight">
                            Your data is secure. You will only be contacted for the offers we found for you, No Spam, ever.
                          </span>
                        </div>
                        <div className="relative">
                          <label className="absolute -top-2.5 left-4 bg-white px-2 text-xs font-bold text-slate-500">Email</label>
                          <input 
                            type="email"
                            placeholder="john.smith@gmail.com"
                            value={answers.email}
                            onChange={(e) => setAnswers(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-6 py-5 text-xl font-medium border-2 border-blue-600 rounded-xl focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    )}

                    {step === 'phone' && (
                      <div className="space-y-8">
                        <h3 className="text-4xl font-bold text-[#3b82f6] leading-tight">
                          Last step: Enter your Phone Number
                        </h3>
                        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center gap-3 text-slate-600">
                          <Info className="w-5 h-5 text-slate-400" />
                          <span className="font-medium text-sm">Your number is necessary to go over the details of your offers.</span>
                        </div>
                        <div className="relative">
                          <input 
                            type="tel"
                            placeholder="(651) 432-9293"
                            value={answers.phone}
                            onChange={(e) => setAnswers(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-6 py-5 text-xl font-bold border-2 border-[#ff4b7d]/30 rounded-xl focus:border-[#ff4b7d] focus:outline-none transition-all"
                          />
                          {answers.phone.length > 9 && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                              <Check className="w-6 h-6 text-green-500" />
                            </div>
                          )}
                        </div>
                        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-start gap-3 text-slate-500 text-left">
                          <Info className="w-8 h-8 text-slate-400 flex-shrink-0 mt-0.5" />
                          <span className="text-[10px] leading-tight">
                            By clicking "Get My Offers" below, I consent to receive emails, telemarketing calls using an autodialer, artificial voices or pre-recordings and SMS text messages at any time from the associated partners, which could result in wireless charges, at the number provided above. I understand that consent is not a condition of purchase. I also agree to the <a href="#" className="underline">Terms and Conditions</a> and <a href="#" className="underline">Privacy Policy</a>, which are also linked at the bottom of this page.
                          </span>
                        </div>
                      </div>
                    )}

                    <div className={`flex items-center ${step === 'landing' ? 'justify-center' : 'justify-between'} gap-4`}>
                      {step !== 'landing' && (
                        <button 
                          onClick={handleBack}
                          className="px-8 py-5 border border-[#ff4b7d] text-[#ff4b7d] font-bold rounded-xl hover:bg-pink-50 transition-all flex items-center gap-2"
                        >
                          <ChevronLeft className="w-5 h-5" /> Back
                        </button>
                      )}
                      <button 
                        onClick={handleNext}
                        disabled={
                          (step === 'landing' && answers.hasProvider === null) ||
                          (step === 'provider' && !answers.currentProvider) ||
                          (step === 'wishes' && answers.wishes.length === 0) ||
                          (step === 'price' && !answers.priceRange) ||
                          (step === 'speed' && !answers.speed) ||
                          (step === 'zip' && answers.zipCode.length !== 5) ||
                          (step === 'name' && (!answers.firstName || !answers.lastName)) ||
                          (step === 'email' && !answers.email.includes('@')) ||
                          (step === 'phone' && answers.phone.length < 10)
                        }
                        className={`${step === 'landing' ? 'w-full' : 'flex-1 max-w-[240px]'} bg-[#ff4b7d] hover:bg-[#e63d6f] disabled:opacity-50 text-white font-black text-2xl py-5 rounded-xl shadow-[0_10px_30px_rgba(255,75,125,0.2)] transition-all hover:scale-[1.02] active:scale-95`}
                      >
                        {step === 'phone' ? 'GET MY OFFERS' : (step === 'landing' ? 'Compare Internet Plans & Offers' : 'Next')}
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-slate-500 font-medium text-sm">
                      <Lock className="w-4 h-4" />
                      Safe, Secure and Confidential
                    </div>
                  </div>
                </div>

                {/* Vertical Blue Accents in card background */}
                <div className="absolute -inset-2 bg-blue-600/5 rounded-[2rem] -z-10 animate-pulse" />
              </div>

               {/* Partner Brands */}
              <div className="mt-24 space-y-12">
                <h3 className="text-2xl font-bold text-blue-800">Partnered with recognized internet brands</h3>
                <div className="flex flex-wrap justify-center items-center gap-12 opacity-80 filter grayscale hover:grayscale-0 transition-all duration-500">
                  <LogoPlaceholder name="AT&T" color="text-sky-500" />
                  <LogoPlaceholder name="Verizon" color="text-red-600" />
                  <LogoPlaceholder name="Viasat" color="text-blue-900" />
                  <LogoPlaceholder name="Rise Broadband" color="text-emerald-600" />
                  <LogoPlaceholder name="COX" color="text-blue-500" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Support Section */}
          {step === 'support' && <SupportView onBack={() => setStep('landing')} />}
          {/* Providers List Section */}
          {step === 'providers-list' && <ProvidersView onBack={() => setStep('landing')} onStart={() => setStep('landing')} />}
          {/* How It Works Section */}
          {step === 'how-it-works' && <HowItWorksView onBack={() => setStep('landing')} />}

          {/* Loading State */}
          {step === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto px-6 pt-20 text-center space-y-12">
              <div className="flex flex-col items-center justify-center gap-8 text-[#1e40af]">
                <div className="relative">
                  <div className="w-24 h-24 border-4 border-slate-100 border-t-[#ff4b7d] rounded-full animate-spin" />
                  <Globe className="w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse text-[#3b82f6]" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-4xl font-black italic tracking-widest uppercase">Scanning Providers...</h2>
                  <p className="text-slate-500 font-bold max-w-sm mx-auto">Connecting to 142 localized databases in your region.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Page */}
          {step === 'results' && <ResultsView onBack={() => setStep('landing')} answers={answers} />}
        </AnimatePresence>
      </main>

      {/* Basic Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-2">
             <MapPin className="text-blue-600 w-6 h-6" />
             <span className="font-black text-black">Best Net Services</span>
           </div>
           <div className="flex gap-8 text-sm font-bold text-slate-500">
             <a href="#" className="hover:text-blue-600">Privacy Policy</a>
             <a href="#" className="hover:text-blue-600">Terms of Service</a>
             <a href="#" className="hover:text-blue-600">Contact Us</a>
           </div>
           <div className="text-slate-400 text-xs">© 2026 Best Net Services .com. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

function LogoPlaceholder({ name, color }: { name: string, color: string }) {
  return (
    <div className={`flex items-center gap-2 font-black text-2xl ${color}`}>
      <Wifi className="w-8 h-8 fill-current translate-y-1 stroke-[4]" />
      <span className="tracking-tighter">{name}</span>
    </div>
  );
}

function SupportView({ onBack }: { onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto px-6 pt-10 pb-20">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-5xl font-black text-[#1e40af]">We're Here to Help</h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">Whether you have questions about providers or speeds, our team is ready.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 mb-20 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl space-y-6">

        </div>
        {/* Simplified support items */}
        <div className="bg-white p-10 rounded-3xl shadow-xl space-y-6 border border-blue-50">
           <Mail className="w-12 h-12 text-blue-600 mx-auto" />
           <h3 className="text-2xl font-bold text-black">Email Us</h3>
           <p className="font-bold text-blue-600">support@internetcompanies.com</p>
        </div>
        <div className="bg-white p-10 rounded-3xl shadow-xl space-y-6 border border-emerald-50">
           <MessageSquare className="w-12 h-12 text-emerald-500 mx-auto" />
           <h3 className="text-2xl font-bold">Live Chat</h3>
           <button className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold">Start Now</button>
        </div>
      </div>
      <button onClick={onBack} className="text-blue-600 font-bold flex items-center gap-2 mx-auto"><ChevronLeft/> Back to Home</button>
    </motion.div>
  );
}

function ProvidersView({ onBack, onStart }: { onBack: () => void, onStart: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-6 pt-10 pb-20">
      <h2 className="text-5xl font-black text-center text-[#1e40af] mb-16">Recognized Partner Brands</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: "AT&T Fiber", speed: "5 Gig", color: "bg-sky-500" },
          { name: "Xfinity", speed: "2 Gig", color: "bg-red-600" },
          { name: "Verizon", speed: "1 Gig", color: "bg-black" },
        ].map(p => (
           <div key={p.name} className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100 flex flex-col gap-6">
              <div className={`w-16 h-16 ${p.color} rounded-2xl flex items-center justify-center text-white text-3xl font-bold`}>{p.name[0]}</div>
              <h3 className="text-3xl font-black">{p.name}</h3>
              <p className="text-slate-500 font-bold">Speeds up to {p.speed}</p>
              <button onClick={onStart} className="mt-auto bg-blue-600 text-white py-4 rounded-xl font-bold">Check Availability</button>
           </div>
        ))}
      </div>
      <button onClick={onBack} className="mt-16 text-blue-600 font-bold flex items-center gap-2 mx-auto"><ChevronLeft/> Back to Home</button>
    </motion.div>
  );
}

function HowItWorksView({ onBack }: { onBack: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl mx-auto px-6 pt-10 pb-20 text-center">
      <h2 className="text-5xl font-black text-[#1e40af] mb-12">How it works</h2>
      <div className="grid md:grid-cols-2 gap-12 text-left">
         <div className="space-y-4">
            <h3 className="text-3xl font-bold text-blue-600">1. Tell us your needs</h3>
            <p className="text-slate-600 text-xl leading-relaxed">Answer a few questions about your internet usage, budget, and location.</p>
         </div>
         <div className="space-y-4">
            <h3 className="text-3xl font-bold text-blue-600">2. We Scan Local Deals</h3>
            <p className="text-slate-600 text-xl leading-relaxed">Our system checks hundreds of local and national provider databases.</p>
         </div>
      </div>
      <button 
  onClick={onBack} 
  className="mt-20 text-blue-600 font-bold flex items-center"
>
  Back
</button>
    </motion.div>
  );
}
function ResultsView({ onBack, answers }: { onBack: () => void; answers: Answers }) {
  const sendData = async () => {
    console.log("SENDING DATA");

  try {
    await fetch("https://script.google.com/macros/s/AKfycbxwuKDnB7n1CDg9iczMHf4l_3t6-4vmqIyjf14kf_roTLX6H45Gdan3WrWj0Bxp3FeBHQ/exec", {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({
        full_name: `${answers.firstName || ""} ${answers.lastName || ""}`,
        email: answers.email || "",
        zip_code: answers.zipCode || ""
      })
    });

    // move forward after sending
   console.log("Data sent");

  } catch (err) {
    console.error(err);
  }
};
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto px-6 pb-20">
       <div className="text-center mb-16 space-y-4">
         <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest">Scanning Complete</div>
         <h2 className="text-5xl font-black text-[#1e40af]">Best Offers in {answers.zipCode}</h2>
         <p className="text-xl text-slate-500 font-bold italic underline decoration-blue-200">Based on your {answers.speed} usage requirement.</p>
       </div>

       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
         {[
           { name: "Fiber Ultra", provider: "AT&T", price: 35, speed: "500 Mbps", tags: ['No Contract', 'Gift Card'] },
           { name: "Blast! Pro", provider: "Xfinity", price: 29, speed: "300 Mbps", tags: ['Limited Deal'] },
           { name: "Gigabit Plus", provider: "Verizon", price: 49, speed: "1000 Mbps", tags: ['Best Value', 'Low Latency'] }
         ].map((offer, i) => (
           <motion.div 
             key={offer.name} 
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }} 
             transition={{ delay: i * 0.1 }}
             className="bg-white rounded-3xl p-8 border-2 border-slate-100 shadow-xl space-y-6 hover:border-blue-600 transition-all flex flex-col"
           >
              <div className="flex justify-between items-start">
                <div>
                   <h3 className="text-2xl font-black text-black">{offer.name}</h3>
                   <p className="text-blue-600 font-bold">{offer.provider}</p>
                </div>
                <div className="text-right">
                   <div className="text-3xl font-black text-[#ff4b7d]">${offer.price}</div>
                   <div className="text-xs text-slate-400 font-bold">/month</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 font-bold">
                 <Zap className="w-4 h-4 text-amber-500 fill-current" />
                 {offer.speed}
              </div>
              <div className="flex flex-wrap gap-2">
                {offer.tags.map(t => <span key={t} className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase px-2 py-1 rounded-md">{t}</span>)}
              </div>
              <button 
                onClick={sendData}
                className="mt-auto w-full bg-[#1e40af] hover:bg-[#153491] text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-100"
              >
                Claim Offer
              </button>
           </motion.div>
         ))}
       </div>
       <button onClick={onBack} className="mt-20 text-blue-600 font-bold flex items-center gap-2 mx-auto"><ChevronLeft/> Start New Search</button>
    </motion.div>
  );
}

