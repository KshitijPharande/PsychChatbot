'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Play, Pause, RotateCcw, ShieldCheck, Sparkles, Wind } from 'lucide-react';

type BreathStage = 'Inhale' | 'Hold' | 'Exhale';

export default function BreathingPage() {
  const [isStarted, setIsStarted] = useState(false);
  const [breathStage, setBreathStage] = useState<BreathStage>('Inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Visual Grounding Breath Trainer Timer (4s Inhale, 4s Hold, 4s Exhale)
  useEffect(() => {
    if (!isStarted) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        const nextSec = (prev + 1) % 12;
        
        if (nextSec < 4) {
          setBreathStage('Inhale');
        } else if (nextSec < 8) {
          setBreathStage('Hold');
        } else {
          setBreathStage('Exhale');
        }

        // Increment breath cycle count on Exhale finish
        if (nextSec === 0) {
          setBreathCount((c) => c + 1);
        }

        return nextSec;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted]);

  const handleStartToggle = () => {
    setIsStarted(!isStarted);
  };

  const handleReset = () => {
    setIsStarted(false);
    setBreathStage('Inhale');
    setBreathCount(0);
    setTimerSeconds(0);
  };

  // Get description based on the breathing stage
  const getStageDescription = () => {
    if (!isStarted) return "Click the button below to start your grounding exercise.";
    switch (breathStage) {
      case 'Inhale':
        return "Breathe in deeply through your nose, feeling your chest expand...";
      case 'Hold':
        return "Hold your breath, staying still, calm and centered...";
      case 'Exhale':
        return "Exhale slowly through your mouth, letting go of any tension...";
    }
  };

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col justify-center items-center p-4 md:p-8 relative overflow-y-auto">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-xl w-full text-center space-y-8 z-10">
        
        {/* Header Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Wind className="w-3.5 h-3.5" /> Breath Grounding
          </div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-emerald-400 tracking-tight">
            Breathing Space
          </h2>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            Ground your mind using the 4-4-4 technique to relieve acute stress and anxiety.
          </p>
        </div>

        {/* Breathing Animation Canvas */}
        <div className="bg-slate-900/35 border border-slate-800/60 rounded-3xl p-8 md:p-12 flex flex-col items-center gap-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          
          {/* Subtle grid mesh overlay inside card */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

          {/* Interactive Breathing Ring */}
          <div className="w-56 h-56 flex items-center justify-center relative select-none">
            
            {/* Rippling expansion rings (only animate when started) */}
            <AnimatePresence>
              {isStarted && (
                <>
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0.2 }}
                    animate={{
                      scale: breathStage === 'Inhale' ? 1.7 : breathStage === 'Hold' ? 1.7 : 0.9,
                      opacity: breathStage === 'Hold' ? 0.25 : 0.08
                    }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                    className="absolute w-44 h-44 rounded-full bg-emerald-500/20 blur-md pointer-events-none"
                  />
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0.1 }}
                    animate={{
                      scale: breathStage === 'Inhale' ? 2.0 : breathStage === 'Hold' ? 2.0 : 0.9,
                      opacity: breathStage === 'Hold' ? 0.15 : 0.02
                    }}
                    transition={{ duration: 4, ease: "easeInOut" }}
                    className="absolute w-44 h-44 rounded-full bg-indigo-500/10 blur-lg pointer-events-none"
                  />
                </>
              )}
            </AnimatePresence>

            {/* Core Breathing Circle */}
            <motion.div
              animate={{
                scale: !isStarted 
                  ? 1 
                  : breathStage === 'Inhale' 
                  ? 1.55 
                  : breathStage === 'Hold' 
                  ? 1.55 
                  : 0.95,
                backgroundColor: !isStarted
                  ? 'rgba(30, 41, 59, 0.5)'
                  : breathStage === 'Inhale' 
                  ? 'rgba(16, 185, 129, 0.18)' 
                  : breathStage === 'Hold' 
                  ? 'rgba(99, 102, 241, 0.18)' 
                  : 'rgba(239, 68, 68, 0.1)',
                borderColor: !isStarted
                  ? 'rgba(148, 163, 184, 0.25)'
                  : breathStage === 'Inhale' 
                  ? '#10b981' 
                  : breathStage === 'Hold' 
                  ? '#6366f1' 
                  : '#ef4444',
                boxShadow: !isStarted
                  ? '0 0 0px rgba(0,0,0,0)'
                  : breathStage === 'Inhale'
                  ? '0 0 35px rgba(16, 185, 129, 0.3)'
                  : breathStage === 'Hold'
                  ? '0 0 35px rgba(99, 102, 241, 0.3)'
                  : '0 0 20px rgba(239, 68, 68, 0.15)',
              }}
              transition={{ duration: !isStarted ? 0.3 : 4, ease: "easeInOut" }}
              className="w-36 h-36 rounded-full border-3 flex flex-col items-center justify-center z-10 transition-shadow relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isStarted ? breathStage : 'idle'}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center"
                >
                  {isStarted ? (
                    <>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">{breathStage}</span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {breathStage === 'Inhale' && 'Breathe In'}
                        {breathStage === 'Hold' && 'Hold'}
                        {breathStage === 'Exhale' && 'Release'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-8 h-8 text-slate-500 fill-slate-500/10 mb-1" />
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ready</span>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Description instructions text */}
          <div className="space-y-2 max-w-sm h-12 flex flex-col justify-center">
            <p className="text-xs md:text-sm text-slate-350 leading-relaxed transition-all duration-300">
              {getStageDescription()}
            </p>
          </div>

          {/* Timing indicators (progress bar) */}
          <div className="w-full max-w-xs space-y-1.5">
            <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
              <motion.div 
                animate={{
                  width: !isStarted ? '0%' : `${((timerSeconds % 4) + 1) * 25}%`
                }}
                transition={{ duration: !isStarted ? 0.1 : 1, ease: "linear" }}
                className={`h-full ${
                  breathStage === 'Inhale' 
                    ? 'bg-emerald-500' 
                    : breathStage === 'Hold' 
                    ? 'bg-indigo-500' 
                    : 'bg-red-500'
                }`}
              />
            </div>
            <div className="flex justify-between text-[9px] text-slate-500 uppercase tracking-widest font-semibold px-1">
              <span>{isStarted ? `Cycle: ${breathCount + 1}` : 'Stopped'}</span>
              <span>
                {isStarted && `${(timerSeconds % 4) + 1}s / 4s`}
                {!isStarted && '0s'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleStartToggle}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold transition cursor-pointer ${
                isStarted 
                  ? 'bg-slate-800 hover:bg-slate-750 text-amber-400 border border-slate-750' 
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/10'
              }`}
            >
              {isStarted ? (
                <>
                  <Pause className="w-4 h-4" /> Pause Grounding
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" /> Begin Grounding
                </>
              )}
            </button>

            {(isStarted || breathCount > 0 || timerSeconds > 0) && (
              <button
                onClick={handleReset}
                className="flex items-center justify-center bg-slate-900 hover:bg-slate-850 border border-slate-800 p-3 rounded-2xl text-slate-400 hover:text-slate-200 transition cursor-pointer"
                title="Reset session"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Security assurance info */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Interactive session running locally in your browser.</span>
        </div>
      </div>
    </div>
  );
}
