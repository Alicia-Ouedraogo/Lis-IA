
import React from 'react';
import { MOOD_DATA } from '../constants';
import { MoodType } from '../types';

interface MoodSelectorProps {
  onSelect: (mood: MoodType) => void;
  currentMood?: MoodType;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ onSelect, currentMood }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center py-4">
      {(Object.entries(MOOD_DATA) as [MoodType, any][]).map(([key, data]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 w-20 ${
            currentMood === key 
              ? 'bg-white shadow-md border-indigo-200 border transform scale-105' 
              : 'hover:bg-white/50 border border-transparent'
          }`}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${data.color} bg-white shadow-sm`}>
            <i className={`fa-solid ${data.icon}`}></i>
          </div>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{data.label}</span>
        </button>
      ))}
    </div>
  );
};
