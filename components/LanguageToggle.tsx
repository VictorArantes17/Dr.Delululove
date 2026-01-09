
import React from 'react';
import { Language } from '../types';

interface Props {
  current: Language;
  onToggle: (lang: Language) => void;
}

const LanguageToggle: React.FC<Props> = ({ current, onToggle }) => {
  return (
    <div className="flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-2xl border border-rose-500/10">
      <button 
        onClick={() => onToggle(Language.EN)}
        className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${current === Language.EN ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'text-slate-600 hover:text-rose-300'}`}
      >
        EN
      </button>
      <button 
        onClick={() => onToggle(Language.PT)}
        className={`px-5 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${current === Language.PT ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'text-slate-600 hover:text-rose-300'}`}
      >
        PT
      </button>
    </div>
  );
};

export default LanguageToggle;
