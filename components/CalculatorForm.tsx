
import React from 'react';
import { AppState, CountryData, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { WORLD_DATA } from '../services/mockDatabase';

interface Props {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  onCalculate: () => void;
  onReset: () => void;
}

const CalculatorForm: React.FC<Props> = ({ state, setState, onCalculate, onReset }) => {
  const t = TRANSLATIONS[state.lang];

  const handleChange = (field: keyof AppState, value: any) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  const selectedCountry = WORLD_DATA.find(c => c.id === state.countryId);

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex flex-col gap-3">
        <label className="text-[10px] font-black text-rose-900 uppercase tracking-[0.2em]">{t.country}</label>
        <div className="relative">
          <select 
            value={state.countryId}
            onChange={(e) => handleChange('countryId', e.target.value)}
            className="w-full bg-slate-900/40 border border-rose-950 rounded-2xl p-5 text-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-semibold appearance-none cursor-pointer"
          >
            {WORLD_DATA.map(c => (
              <option key={c.id} value={c.id} className="bg-slate-900">
                {state.lang === Language.EN ? c.nameEN : c.namePT}
              </option>
            ))}
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-rose-900">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center mb-1">
          <label className="text-[10px] font-black text-rose-900 uppercase tracking-[0.2em]">{t.myAge}</label>
          <span className="text-rose-500 font-bold text-lg italic serif">{state.userAge}</span>
        </div>
        <input 
          type="range"
          min="18"
          max="100"
          value={state.userAge}
          onChange={(e) => handleChange('userAge', Number(e.target.value))}
          className="w-full h-2 bg-slate-900/60 rounded-lg appearance-none cursor-pointer accent-rose-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-black text-rose-900 uppercase tracking-[0.2em]">{t.targetIncome} ({selectedCountry?.currency})</label>
          <input 
            type="number"
            value={state.targetIncome}
            onChange={(e) => handleChange('targetIncome', Number(e.target.value))}
            className="bg-slate-900/40 border border-rose-950 rounded-2xl p-5 text-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-bold text-lg"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-[10px] font-black text-rose-900 uppercase tracking-[0.2em]">{t.iEarn} ({selectedCountry?.currency})</label>
          <input 
            type="number"
            value={state.userIncome}
            onChange={(e) => handleChange('userIncome', Number(e.target.value))}
            className="bg-slate-900/40 border border-rose-950 rounded-2xl p-5 text-rose-100/40 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-bold"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-[10px] font-black text-rose-900 uppercase tracking-[0.2em]">{t.ageRange}</label>
        <div className="flex items-center gap-4">
          <input 
            type="number" min="18" max="80"
            value={state.targetAgeMin}
            onChange={(e) => handleChange('targetAgeMin', Number(e.target.value))}
            className="w-full bg-slate-900/40 border border-rose-950 rounded-2xl p-5 text-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all text-center font-bold text-lg"
          />
          <span className="text-rose-950 font-black text-2xl serif italic">-</span>
          <input 
            type="number" min="18" max="80"
            value={state.targetAgeMax}
            onChange={(e) => handleChange('targetAgeMax', Number(e.target.value))}
            className="w-full bg-slate-900/40 border border-rose-950 rounded-2xl p-5 text-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all text-center font-bold text-lg"
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 mt-8">
        <button 
          onClick={onCalculate}
          className="bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white font-black py-6 px-10 rounded-3xl transition shadow-2xl shadow-rose-500/20 active:scale-95 uppercase text-xs tracking-[0.2em]"
        >
          {t.calculate}
        </button>
        <button 
          onClick={onReset}
          className="bg-transparent border border-rose-950 text-rose-900 hover:bg-rose-500/5 font-bold py-4 px-10 rounded-2xl transition active:scale-95 uppercase text-[9px] tracking-[0.2em]"
        >
          {t.reset}
        </button>
      </div>
    </div>
  );
};

export default CalculatorForm;
