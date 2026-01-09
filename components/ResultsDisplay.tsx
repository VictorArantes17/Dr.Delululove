
import React from 'react';
import { CalculationResults, AppState, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface Props {
  results: CalculationResults;
  lang: Language;
}

const ResultsDisplay: React.FC<Props> = ({ results, lang }) => {
  const t = TRANSLATIONS[lang];
  
  const chartData = [
    { name: 'Eligible', value: results.percentageOfTarget },
    { name: 'Others', value: 1 - results.percentageOfTarget },
  ];

  const getRarityColor = (index: number) => {
    if (index > 80) return '#ef4444'; // Rare (Red)
    if (index > 50) return '#f59e0b'; // Medium (Orange)
    return '#10b981'; // Common (Green)
  };

  const getRarityLabel = (index: number) => {
    if (index > 80) return t.rarityHigh;
    if (index > 50) return t.rarityMed;
    return t.rarityLow;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold mb-6 text-white border-b border-slate-700 pb-2">{t.resultsTitle}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Probability Meter */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-900/50 rounded-2xl border border-slate-700">
          <div className="relative w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  <Cell fill="#3b82f6" stroke="none" />
                  <Cell fill="#1e293b" stroke="none" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-blue-400">{(results.percentageOfTarget * 100).toFixed(2)}%</span>
            </div>
          </div>
          <p className="text-center text-slate-300 mt-4 font-medium px-4">
            {t.menWhoMeetCriteria}
          </p>
        </div>

        {/* Rarity & Stats */}
        <div className="flex flex-col gap-4">
          <div className="p-5 bg-slate-800/50 rounded-xl border border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-slate-400">{t.rarityScore}</span>
              <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300 uppercase font-bold">
                {getRarityLabel(results.rarityIndex)}
              </span>
            </div>
            <div className="h-4 w-full bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${results.rarityIndex}%`, 
                  backgroundColor: getRarityColor(results.rarityIndex) 
                }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-slate-500">0</span>
              <span className="text-[10px] text-slate-500">100</span>
            </div>
          </div>

          <div className="p-5 bg-slate-800/50 rounded-xl border border-slate-700">
            <span className="text-sm font-semibold text-slate-400 mb-2 block">{t.estimatedPool}</span>
            <div className="text-3xl font-bold text-white mb-1">
              {results.totalPoolCount.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 italic">
              {t.probabilityPrefix} {(results.percentageOfTarget * 100).toFixed(2)}% {t.probabilitySuffix}
            </p>
          </div>
        </div>
      </div>

      {/* Salary Distributions Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800 text-center">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{t.median}</div>
          <div className="text-lg font-bold text-slate-200">
            {results.localIncomeStats.median.toLocaleString()}
          </div>
        </div>
        <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800 text-center">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{t.mean}</div>
          <div className="text-lg font-bold text-slate-200">
            {results.localIncomeStats.mean.toLocaleString()}
          </div>
        </div>
        <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800 text-center">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{t.mode}</div>
          <div className="text-lg font-bold text-slate-200">
            {results.localIncomeStats.mode.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
