
import React, { useState, useEffect } from 'react';

interface PanicOverlayProps {
  onClose: () => void;
}

export const PanicOverlay: React.FC<PanicOverlayProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const groundingSteps = [
    { title: "Breathe with me", instruction: "Focus only on the circle moving. Breathe in... and out.", type: 'breathing' },
    { title: "Name 3 objects", instruction: "Look around. Name 3 things you can see right now.", type: 'input' },
    { title: "Listen close", instruction: "What is the furthest sound you can hear?", type: 'input' },
    { title: "Affirmation", instruction: "Repeat: 'I am safe. This is just a feeling. It will pass.'", type: 'input' }
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-indigo-900/95 backdrop-blur-xl flex flex-col items-center justify-center text-white p-8">
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-2">
          <span className="text-indigo-300 text-xs font-bold uppercase tracking-[0.2em]">Panic Support Mode</span>
          <h2 className="text-3xl font-bold">{groundingSteps[step].title}</h2>
        </div>

        {groundingSteps[step].type === 'breathing' ? (
          <div className="relative h-48 flex items-center justify-center">
            <div className="absolute w-32 h-32 rounded-full border-4 border-white/20"></div>
            <div className="breathing-circle w-32 h-32 rounded-full bg-indigo-400 border-4 border-white"></div>
          </div>
        ) : (
          <div className="p-8 bg-white/5 rounded-3xl border border-white/10 min-h-[120px] flex items-center justify-center">
             <p className="text-xl text-indigo-100 italic">"{groundingSteps[step].instruction}"</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => step < groundingSteps.length - 1 ? setStep(step + 1) : onClose()}
            className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-colors"
          >
            {step < groundingSteps.length - 1 ? 'Next Step' : 'I feel a bit better'}
          </button>
          <a href="tel:988" className="text-rose-300 font-medium hover:text-rose-200">I need professional help now</a>
        </div>
      </div>
    </div>
  );
};
