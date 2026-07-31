'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Send, 
  RefreshCw, 
  AlertTriangle, 
  ExternalLink, 
  ShieldCheck, 
  Phone, 
  MessageCircle,
  Sparkles,
  ChevronRight,
  Globe,
  Lock,
  Info,
  EyeOff
} from 'lucide-react';

// Client-side regex for rapid crisis keyword detection (zero-latency safety fallback)
const CRISIS_KEYWORDS = [
  /\b(suicide|suicidal)\b/i,
  /\bkill myself\b/i,
  /\bend my life\b/i,
  /\bwant to die\b/i,
  /\bself-harm\b/i,
  /\bcutting myself\b/i,
  /\bhang myself\b/i,
  /\boverdose myself\b/i
];

type Region = 'IN' | 'US' | 'GL';
type BreathStage = 'Inhale' | 'Hold' | 'Exhale';

export default function Home() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status, error, setMessages, regenerate } = useChat({
    onError: (err) => {
      console.error('Chat stream error:', err);
    }
  });

  const isLoading = status === 'streaming' || status === 'submitted';
  const [localCrisisTriggered, setLocalCrisisTriggered] = useState(false);
  const [showManualResources, setShowManualResources] = useState(false);
  const [activeRegion, setActiveRegion] = useState<Region>('IN');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat when messages update or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Client-side keyword interceptor on form submit
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Check if input matches any of our critical crisis keywords
    const matchesCrisis = CRISIS_KEYWORDS.some((regex) => regex.test(input));
    if (matchesCrisis) {
      setLocalCrisisTriggered(true);
      setActiveRegion('IN'); // Default to Indian numbers on trigger
    }

    sendMessage({ role: 'user', parts: [{ type: 'text', text: input }] });
    setInput('');
  };

  const suggestions = [
    "I'm feeling really overwhelmed today.",
    "I just need to vent about some stuff.",
    "Can you help me process some heavy emotions?",
    "I feel lonely and want someone to talk to."
  ];

  const handleSuggestionClick = (suggestionText: string) => {
    const matchesCrisis = CRISIS_KEYWORDS.some((regex) => regex.test(suggestionText));
    if (matchesCrisis) {
      setLocalCrisisTriggered(true);
      setActiveRegion('IN');
    }
    sendMessage({ role: 'user', parts: [{ type: 'text', text: suggestionText }] });
  };

  const clearChat = () => {
    setMessages([]);
    setLocalCrisisTriggered(false);
    setShowManualResources(false);
  };

  // Indian Crisis Numbers
  const indianHelplines = [
    {
      name: "Tele MANAS",
      phone: "14416",
      text: "1800-891-4416",
      description: "Govt of India's 24/7 Mental Health Helpline. Free, confidential, and multi-lingual support.",
      hours: "24/7",
      cost: "Free"
    },
    {
      name: "Vandrevala Foundation",
      phone: "+91-9999-666-555",
      description: "Bilingual mental health support with trained professional counselors.",
      hours: "24/7",
      cost: "Free"
    },
    {
      name: "Kiran Helpline",
      phone: "1800-599-0019",
      description: "Govt of India mental health rehabilitation helpline offering immediate counseling.",
      hours: "24/7",
      cost: "Free"
    }
  ];

  // US & Canada Crisis Numbers
  const usHelplines = [
    {
      name: "Suicide & Crisis Lifeline",
      phone: "988",
      text: "988",
      description: "Immediate connection to trained counselors for calling or texting.",
      hours: "24/7",
      cost: "Free & Confidential"
    },
    {
      name: "Crisis Text Line",
      text: "HOME to 741741",
      description: "Free text-based crisis support for anyone in distress.",
      hours: "24/7",
      cost: "Free"
    }
  ];

  // Global Helplines
  const globalHelplines = [
    {
      name: "Befrienders Worldwide",
      url: "https://www.befrienders.org/",
      description: "Find local emotional support helplines in over 40 countries.",
      regions: "Worldwide"
    },
    {
      name: "Find A Helpline",
      url: "https://findahelpline.com/",
      description: "Searchable directory of free, confidential support services in most countries.",
      regions: "Worldwide"
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 bg-grid-pattern text-slate-100 font-sans relative">
      
      {/* Ambient background decorative glow circles */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Left Sidebar (The Sanctuary/Personal Grounding Space) */}
      <aside className="w-full lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-slate-900 bg-slate-950/40 backdrop-blur-xl flex flex-col p-6 overflow-y-auto relative z-10 justify-between gap-6">
        
        {/* Top: Logo & Description */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <Heart className="w-5 h-5 fill-white/10 animate-pulse" />
            </div>
            <div>
              <h1 className="text-md font-bold tracking-tight text-white flex items-center gap-1.5">
                Haven <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-normal">Sanctuary</span>
              </h1>
            </div>
          </div>
          
          <p className="text-xs text-slate-400 leading-relaxed">
            Welcome to a quiet corner of the internet. Take a moment to ground yourself, catch your breath, or talk about what’s on your mind.
          </p>

          {/* Grounding Intro Card */}
          <div className="bg-slate-900/40 border border-slate-800/60 p-4.5 rounded-2xl space-y-3 relative overflow-hidden shadow-inner">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> Grounding Space
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              If your mind is racing or you feel overwhelmed, try our breathing guide to slow down and find your center.
            </p>
            <a
              href="/breathing"
              className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[10px] font-bold py-2 rounded-xl text-slate-200 hover:text-white transition cursor-pointer"
            >
              Begin Breathing Exercise <ChevronRight className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Bottom Section: Helpline launcher & security disclaimer */}
        <div className="space-y-4">
          <button
            onClick={() => {
              setShowManualResources(!showManualResources);
              setActiveRegion('IN');
            }}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700/80 px-4 py-2.5 rounded-xl text-xs font-semibold text-amber-400 hover:text-amber-300 transition cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" /> Emergency Helplines
          </button>

          <div className="bg-slate-900/30 border border-slate-900/60 p-3 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <Lock className="w-3 h-3 text-emerald-400" /> Private Session
            </div>
            <p className="text-[10px] text-slate-500 leading-normal">
              No server storage. Clearing your chat deletes your history forever from local memory.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Chat Panel */}
      <main className="flex-1 flex flex-col h-full overflow-hidden p-4 lg:p-6 relative z-10">
        
        {/* Chat Sanctuary Panel Wrapper */}
        <div className="flex-1 flex flex-col bg-slate-900/35 border border-slate-800/65 rounded-3xl overflow-hidden shadow-2xl relative backdrop-blur-md">
          
          {/* Internal background gradient overlay inside card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Manual Helpline Panel Overlay inside chat panel */}
          <AnimatePresence>
            {showManualResources && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-slate-950 border-b border-slate-800/80 px-5 py-5 z-20 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Support helplines list:
                  </span>
                  <button 
                    onClick={() => setShowManualResources(false)}
                    className="text-[10px] bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 px-2 py-1 rounded-md text-slate-400 hover:text-slate-200 transition cursor-pointer"
                  >
                    Hide
                  </button>
                </div>

                {/* Region Tabs */}
                <div className="flex gap-1.5 mb-4 border-b border-slate-900 pb-2">
                  {[
                    { id: 'IN', label: '🇮🇳 India Resources' },
                    { id: 'US', label: '🇺🇸 US & Canada' },
                    { id: 'GL', label: '🌐 Global Directory' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveRegion(tab.id as Region)}
                      className={`text-[10px] px-2.5 py-1.5 rounded-lg font-medium transition cursor-pointer ${activeRegion === tab.id ? 'bg-amber-400/10 text-amber-300 border border-amber-500/20' : 'text-slate-500 hover:text-slate-350'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
                  {activeRegion === 'IN' && indianHelplines.map((helpline, idx) => (
                    <div key={idx} className="bg-slate-900/60 border border-slate-800/40 p-3.5 rounded-xl flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-slate-200 text-xs">{helpline.name}</h4>
                          <span className="text-[9px] bg-slate-950 px-2 py-0.5 rounded text-slate-500">{helpline.hours}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">{helpline.description}</p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-slate-950 flex gap-2">
                        <a 
                          href={`tel:${helpline.phone.replace(/-/g, '')}`}
                          className="flex-1 flex items-center justify-center gap-1 bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-[10px] py-1.5 rounded-lg transition"
                        >
                          <Phone className="w-3 h-3" /> Call {helpline.phone}
                        </a>
                      </div>
                    </div>
                  ))}

                  {activeRegion === 'US' && usHelplines.map((helpline, idx) => (
                    <div key={idx} className="bg-slate-900/60 border border-slate-800/40 p-3.5 rounded-xl flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-slate-200 text-xs">{helpline.name}</h4>
                        <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">{helpline.description}</p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-slate-950 flex gap-2">
                        {helpline.phone && (
                          <a 
                            href={`tel:${helpline.phone}`}
                            className="flex-1 flex items-center justify-center gap-1 bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-[10px] py-1.5 rounded-lg transition"
                          >
                            <Phone className="w-3 h-3" /> Call {helpline.phone}
                          </a>
                        )}
                        {helpline.text && (
                          <a 
                            href={`sms:${helpline.text.includes('HOME') ? '741741' : helpline.text}`}
                            className="flex-1 flex items-center justify-center gap-1 bg-slate-800 hover:bg-slate-750 text-slate-200 font-bold text-[10px] py-1.5 rounded-lg transition border border-slate-800"
                          >
                            <MessageCircle className="w-3 h-3" /> Text {helpline.text}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}

                  {activeRegion === 'GL' && globalHelplines.map((helpline, idx) => (
                    <div key={idx} className="bg-slate-900/60 border border-slate-800/40 p-3.5 rounded-xl flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-slate-200 text-xs">{helpline.name}</h4>
                        <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">{helpline.description}</p>
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-slate-950">
                        <a 
                          href={helpline.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-1 bg-indigo-650 hover:bg-indigo-600 text-white font-bold text-[10px] py-1.5 rounded-lg transition"
                        >
                          Visit Website <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Conversation Feed container */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            <AnimatePresence initial={false}>
              {messages.length === 0 ? (
                /* Welcome panel */
                <motion.div 
                  key="welcome-prompt"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="h-full flex flex-col justify-center py-8"
                >
                  <div className="max-w-xl mx-auto space-y-8 text-center sm:text-left">
                    <div className="space-y-3">
                      <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-emerald-400 tracking-tight">
                        You are not alone.
                      </h2>
                      <p className="text-sm text-slate-400 leading-relaxed max-w-lg">
                        I am Haven, your private, empathetic AI space. Speak freely, vent, or share whatever feelings are weighing down on you. I am here to hold space for you.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 justify-center sm:justify-start uppercase tracking-widest">
                        <MessageCircle className="w-4 h-4 text-emerald-450" /> Suggestions to start
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {suggestions.map((suggestion, idx) => (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx, duration: 0.35 }}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-left text-xs bg-slate-950/60 hover:bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/25 p-4 rounded-2xl transition-all duration-300 text-slate-350 hover:text-white cursor-pointer flex justify-between items-center shadow-sm group hover:-translate-y-0.5"
                          >
                            <span>{suggestion}</span>
                            <ChevronRight className="w-4 h-4 text-slate-655 group-hover:text-emerald-450 transition shrink-0 ml-2" />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Dialogue lists */
                <div className="space-y-6">
                  {messages.map((message) => {
                    const isAssistant = message.role === 'assistant';

                    return (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {/* Bubble row wrapper */}
                        <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[85%] rounded-2xl p-4.5 shadow-md leading-relaxed ${
                            isAssistant
                              ? 'bg-slate-900/60 border border-slate-800/70 border-l-3 border-l-emerald-500/80 text-slate-200 rounded-tl-sm shadow-black/20'
                              : 'bg-gradient-to-tr from-emerald-600 to-teal-700 text-white rounded-tr-sm shadow-emerald-950/20'
                          }`}>
                            {/* Role badge */}
                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                              {isAssistant ? (
                                <>
                                  <Heart className="w-3 h-3 text-emerald-400 fill-emerald-400/20" /> Haven
                                </>
                              ) : (
                                'You'
                              )}
                            </div>
                            
                            {/* Text content mapping */}
                            <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                              {message.parts?.map((part, pIdx) => {
                                if (part.type === 'text') {
                                  const cleanText = part.text.replace('[CRISIS_ALERT]', '').trim();
                                  return <span key={pIdx}>{cleanText}</span>;
                                }
                                return null;
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Crisis warning banner details inline */}
                        {isAssistant && message.parts?.some(part => part.type === 'text' && part.text.includes('[CRISIS_ALERT]')) && (
                          <motion.div
                            initial={{ scale: 0.96, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="border-2 border-red-500/35 bg-red-950/25 rounded-2xl p-5 my-4 max-w-[95%] mx-auto space-y-4 shadow-xl border-t-red-500/50"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 shrink-0">
                                <AlertTriangle className="w-5.5 h-5.5 animate-pulse" />
                              </div>
                              <div>
                                <h3 className="text-sm font-bold text-red-300">Urgent: Support is Available</h3>
                                <p className="text-[11px] text-slate-350 mt-1 leading-relaxed">
                                  You are not alone, and you don’t have to go through this by yourself. Please reach out to these direct, confidential Indian support numbers right now.
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                              {indianHelplines.map((helpline, idx) => (
                                <div key={idx} className="bg-slate-950 border border-slate-900 p-3.5 rounded-xl flex flex-col justify-between shadow-inner">
                                  <div>
                                    <div className="flex items-center justify-between">
                                      <h4 className="font-bold text-slate-200 text-xs">{helpline.name}</h4>
                                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/20 text-emerald-400">🇮🇳 India</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">{helpline.description}</p>
                                  </div>
                                  <div className="mt-3.5 pt-2.5 border-t border-slate-900/60 flex flex-col gap-2">
                                    <a
                                      href={`tel:${helpline.phone}`}
                                      className="flex items-center justify-center gap-1.5 bg-red-650 hover:bg-red-600 text-white font-bold text-xs py-2 rounded-lg transition"
                                    >
                                      <Phone className="w-3 h-3" /> Call {helpline.phone} (24/7)
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="text-center pt-1.5">
                              <button
                                onClick={() => {
                                  setShowManualResources(true);
                                  setActiveRegion('US');
                                }}
                                className="text-[10px] text-slate-400 hover:text-slate-200 transition underline cursor-pointer"
                              >
                                View emergency helplines for United States, Canada, UK, or global directories
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}

                  {/* Local instant regex warning details */}
                  {localCrisisTriggered && (
                    <motion.div
                      initial={{ scale: 0.96, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="border-2 border-amber-500/35 bg-amber-950/25 rounded-2xl p-5 my-4 max-w-[95%] mx-auto space-y-4 shadow-xl"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                          <AlertTriangle className="w-5.5 h-5.5 animate-pulse" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-amber-300">Urgent Safety Assistance</h3>
                          <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                            We detected words of severe pain. Your safety is our absolute priority. Please reach out to one of these free, confidential crisis resources in India:
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {indianHelplines.map((helpline, idx) => (
                          <div key={idx} className="bg-slate-950 border border-slate-900 p-3.5 rounded-xl flex flex-col justify-between shadow-inner">
                            <div>
                              <div className="flex items-center justify-between">
                                <h4 className="font-bold text-slate-100 text-xs">{helpline.name}</h4>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">🇮🇳 India</span>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">{helpline.description}</p>
                            </div>
                            <div className="mt-3.5 pt-2.5 border-t border-slate-900/60 flex flex-col gap-2">
                              <a
                                href={`tel:${helpline.phone}`}
                                className="flex items-center justify-center gap-1.5 bg-amber-650 hover:bg-amber-600 text-white font-bold text-xs py-2 rounded-lg transition"
                              >
                                <Phone className="w-3 h-3" /> Call {helpline.phone}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-900">
                        <button
                          onClick={() => {
                            setShowManualResources(true);
                            setActiveRegion('US');
                          }}
                          className="text-[10px] text-slate-450 hover:text-slate-300 transition underline cursor-pointer"
                        >
                          Show US, UK or other international helplines
                        </button>
                        <button
                          onClick={() => setLocalCrisisTriggered(false)}
                          className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-400 px-3 py-1.5 rounded-md transition border border-slate-800 cursor-pointer"
                        >
                          Dismiss and continue chat
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Wave loader bubbles */}
                  {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-slate-900/60 border border-slate-800/40 text-slate-400 rounded-2xl p-4 rounded-tl-sm flex items-center gap-2 shadow-sm">
                        <div className="flex gap-1.5">
                          <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} className="w-2 h-2 rounded-full bg-emerald-500" />
                          <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-2 h-2 rounded-full bg-emerald-500" />
                          <motion.div animate={{ scale: [1, 1.25, 1] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-2 h-2 rounded-full bg-emerald-500" />
                        </div>
                        <span className="text-[11px] font-medium text-slate-400 ml-1">Haven is listening...</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Connection errors details popup */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="border border-red-500/25 bg-red-950/15 rounded-2xl p-4 text-xs text-red-300 space-y-2.5 max-w-[95%] mx-auto"
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                        <span className="font-bold">Connection Refused</span>
                      </div>
                      <p className="text-slate-350 leading-relaxed">
                        Failed to fetch data from the Haven server. If you are developing locally, please ensure that you have added your <code className="bg-slate-950/80 px-1.5 py-0.5 rounded text-red-400 font-mono">GROQ_API_KEY</code> to the <code className="bg-slate-950/80 px-1.5 py-0.5 rounded text-red-400 font-mono">.env.local</code> file and restarted your development server.
                      </p>
                      <button 
                        onClick={() => regenerate()} 
                        className="bg-red-600 hover:bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Reconnect
                      </button>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Floating Footer Form */}
          <footer className="p-4 border-t border-slate-800/40 bg-slate-950/20 backdrop-blur-md shrink-0">
            <form onSubmit={handleFormSubmit} className="space-y-2 relative">
              <div className="flex gap-2">
                <input
                  id="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={localCrisisTriggered ? "Type to continue chatting..." : "Type how you are feeling or what's on your mind..."}
                  className="flex-1 bg-slate-900/60 hover:bg-slate-850/80 focus:bg-slate-900/90 border border-slate-800/80 focus:border-slate-700/80 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:ring-1 focus:ring-emerald-500/20"
                  disabled={isLoading}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-900/80 text-white disabled:text-slate-600 border border-transparent disabled:border-slate-850 rounded-2xl px-5 py-3 transition flex items-center justify-center cursor-pointer shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 relative z-10">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-slate-600 animate-pulse" /> Groq Llama 3.3 70B
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-slate-600" /> Secure chat environment
                </span>
              </div>
            </form>
          </footer>
        </div>
      </main>
    </div>
  );
}
