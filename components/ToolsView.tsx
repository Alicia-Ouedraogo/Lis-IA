
import React, { useState, useEffect } from 'react';
import { GROUNDING_EXERCISES } from '../constants';

export const ToolsView: React.FC = () => {
  const [activeBreathing, setActiveBreathing] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    let timer: any;
    if (activeBreathing) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setBreathingPhase((current) => {
              if (current === 'Inhale') return 'Hold';
              if (current === 'Hold') return 'Exhale';
              if (current === 'Exhale') return 'Pause';
              return 'Inhale';
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeBreathing]);

  return (
    <div className="flex flex-col h-full bg-[#FFFBF7] overflow-y-auto pb-24 p-4 md:p-8">
      <div className="max-w-2xl mx-auto w-full space-y-8">
        <header className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Tes outils de paix</h2>
          <p className="text-slate-500 mt-2 text-sm">Reprends le contrôle de ton corps, un pas à la fois.</p>
        </header>
        
        {/* Interactive Breathing */}
        <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-orange-900/5 border border-orange-50 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <h3 className="text-lg font-bold text-slate-700 mb-8 relative z-10">Respiration Carrée (4s)</h3>
          
          <div className="relative h-48 flex items-center justify-center mb-10 z-10">
            <div className={`absolute w-32 h-32 rounded-full bg-orange-50 border border-orange-100 transition-all duration-1000 ${activeBreathing ? 'opacity-100' : 'opacity-40'}`}></div>
            <div 
              className={`w-28 h-28 rounded-full bg-orange-600 shadow-2xl shadow-orange-200 flex items-center justify-center transition-all duration-[4000ms] ease-in-out ${
                activeBreathing && breathingPhase === 'Inhale' ? 'scale-[2] opacity-100' : 
                activeBreathing && breathingPhase === 'Exhale' ? 'scale-[0.8] opacity-100' : 'scale-100 opacity-90'
              }`}
            >
              {activeBreathing && (
                <div className="flex flex-col items-center">
                  <span className="text-white font-bold text-2xl">{countdown}</span>
                  <span className="text-white/70 text-[8px] uppercase font-bold tracking-[0.2em]">{breathingPhase}</span>
                </div>
              )}
            </div>
          </div>
          
          <button 
            onClick={() => setActiveBreathing(!activeBreathing)}
            className={`relative z-10 px-10 py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${
              activeBreathing 
                ? 'bg-rose-500 text-white shadow-rose-200' 
                : 'bg-orange-600 text-white shadow-orange-200 hover:bg-orange-700'
            }`}
          >
            {activeBreathing ? 'Arrêter' : 'Commencer à respirer'}
          </button>
        </section>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GROUNDING_EXERCISES.map((ex) => (
            <div key={ex.id} className="bg-white rounded-[2rem] p-6 shadow-md shadow-orange-900/5 border border-orange-50 hover:shadow-lg transition-all group">
              <div className={`w-12 h-12 rounded-2xl ${ex.color} flex items-center justify-center mb-4 transition-transform group-hover:rotate-6`}>
                <i className={`fa-solid ${ex.id === '54321' ? 'fa-fingerprint' : 'fa-child'} text-xl`}></i>
              </div>
              <h4 className="font-bold text-slate-800 text-lg mb-2">{ex.name}</h4>
              <p className="text-slate-500 text-xs mb-6 leading-relaxed">{ex.description}</p>
              <ul className="space-y-3">
                {ex.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-4 text-xs text-slate-600 leading-relaxed group/item">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-50 text-orange-400 flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
