
import React from 'react';
import { CalculationResults, Language } from '../types';

interface Props {
  results: CalculationResults;
  lang: Language;
}

const StatisticalQuadrant: React.FC<Props> = ({ results, lang }) => {
  const count = Math.ceil(results.percentageOfTarget * 100);
  const highlighted = Math.max(0, Math.min(100, count));
  const grid = Array.from({ length: 100 });

  return (
    <div className="glass-panel p-8 rounded-[2.5rem] shadow-xl border-rose-500/10">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-300/50">
          {lang === Language.EN ? "Market Probability per 100" : "Probabilidade em 100 homens"}
        </h3>
        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
          {results.tier.replace('_', ' ')}
        </span>
      </div>

      <div className="grid grid-cols-10 gap-2 mb-8">
        {grid.map((_, i) => (
          <div 
            key={i} 
            className={`aspect-square rounded-[3px] transition-all duration-700 ${
              i < highlighted 
              ? 'bg-gradient-to-br from-rose-400 to-rose-600 shadow-[0_0_12px_rgba(244,63,94,0.4)] scale-110' 
              : 'bg-slate-800/30'
            }`}
          />
        ))}
      </div>

      <div className="flex justify-between items-end">
        <div>
          <div className="text-5xl font-black text-rose-100 italic serif">{highlighted}</div>
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">
            {lang === Language.EN ? "Potential Matches" : "Candidatos Compatíveis"}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-rose-200/40">
            {results.totalPoolCount.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">
            {lang === Language.EN ? "Total Est. Pool" : "Pool Total Estimado"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalQuadrant;
