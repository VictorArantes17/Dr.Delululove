
import React, { useState, useCallback } from 'react';
import { Language, AppState, CalculationResults, MarketDossier } from './types';
import { TRANSLATIONS } from './constants';
import { WORLD_DATA } from './services/mockDatabase';
import { calculateReality } from './services/dataEngine';
import { generateFullAudit } from './services/insightEngine';
import LanguageToggle from './components/LanguageToggle';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import StatisticalQuadrant from './components/StatisticalQuadrant';
import MarketDossierDisplay from './components/MarketDossierDisplay';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    lang: Language.PT,
    userAge: 28,
    userIncome: 3000,
    targetIncome: 6000,
    countryId: 'bra',
    targetAgeMin: 25,
    targetAgeMax: 40
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [dossier, setDossier] = useState<MarketDossier | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [loadingStep, setLoadingStep] = useState("");

  const t = TRANSLATIONS[state.lang];

  const handleCalculate = useCallback(async () => {
    setIsCalculating(true);
    setResults(null);
    setDossier(null);
    
    const country = WORLD_DATA.find(c => c.id === state.countryId) || WORLD_DATA[0];
    
    try {
      setLoadingStep(state.lang === Language.PT ? "Processando Clusters Demográficos..." : "Processing Demographic Clusters...");
      const res = calculateReality(country, state.targetIncome, state.targetAgeMin, state.targetAgeMax, state.lang);
      
      setLoadingStep(state.lang === Language.PT ? "Auditor Relacional gerando capítulos (2.000+ palavras)..." : "Relational Auditor generating chapters (2,000+ words)...");
      
      const fullDossier = await generateFullAudit(state, res, country);

      setResults(res);
      setDossier(fullDossier);
      
      window.scrollTo({ top: 400, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      alert(state.lang === Language.PT ? "Erro na Auditoria. Tente novamente." : "Audit Error. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  }, [state]);

  const handleReset = useCallback(() => {
    setResults(null);
    setDossier(null);
    setState(prev => ({
      ...prev,
      userAge: 28,
      userIncome: 3000,
      targetIncome: 6000,
      targetAgeMin: 25,
      targetAgeMax: 40
    }));
  }, []);

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 glass-panel border-b border-rose-500/10 py-5 px-8 mb-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={handleReset}>
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-700 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/20 transition-transform hover:scale-105">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" opacity="0.4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6m3 6v-9m3 9V11" stroke="white" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl serif italic text-rose-100 leading-none tracking-tight">{t.title}</h1>
              <p className="text-[9px] text-rose-900 font-black tracking-[0.4em] uppercase mt-1">{t.subtitle}</p>
            </div>
          </div>
          <LanguageToggle current={state.lang} onToggle={(l) => setState(s => ({...s, lang: l}))} />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              <section className="glass-panel rounded-[3rem] p-10 shadow-2xl border-rose-500/5">
                <CalculatorForm state={state} setState={setState} onCalculate={handleCalculate} onReset={handleReset} />
              </section>
              <div className="p-8 glass-panel rounded-[2.5rem] border-l-4 border-rose-500/30">
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{t.disclaimer}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-12 pb-20">
            {isCalculating ? (
              <div className="glass-panel rounded-[3.5rem] p-20 flex flex-col items-center justify-center min-h-[700px]">
                <div className="relative mb-12">
                  <div className="w-24 h-24 border-t-2 border-rose-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-rose-500/10 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <h3 className="text-rose-100 font-black text-xs uppercase tracking-[0.5em] mb-6">Reality Engine Active</h3>
                <p className="text-rose-200 font-bold serif italic text-3xl text-center max-w-md animate-pulse leading-tight">{loadingStep}</p>
                <p className="text-slate-600 text-[10px] uppercase tracking-widest mt-10 font-bold">Please wait, generating high-density analysis...</p>
              </div>
            ) : results ? (
              <div className="space-y-12 animate-in fade-in slide-in-from-right-12 duration-1000">
                <StatisticalQuadrant results={results} lang={state.lang} />
                {dossier && <MarketDossierDisplay dossier={dossier} lang={state.lang} />}
                <div className="opacity-40 grayscale hover:opacity-100 transition-opacity">
                  <ResultsDisplay results={results} lang={state.lang} />
                </div>
              </div>
            ) : (
              <div className="glass-panel rounded-[3.5rem] p-20 flex flex-col items-center justify-center min-h-[600px] border-dashed border-2 border-rose-950/20 group">
                <div className="w-24 h-24 text-rose-950 mb-10 animate-float opacity-30">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <h2 className="serif italic text-3xl text-rose-900 mb-4 tracking-tighter">
                  {state.lang === Language.PT ? "A Auditoria está Pronta." : "The Audit is Ready."}
                </h2>
                <p className="text-slate-600 text-center max-w-sm text-sm font-medium">
                  {state.lang === Language.PT 
                    ? "Clique no botão acima para iniciar a auditoria relacional completa baseada em clusters socioeconômicos." 
                    : "Click the button above to start the full relational audit based on socioeconomic clusters."}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-40 py-24 border-t border-rose-950/20 text-center">
        <div className="serif italic text-rose-100/10 text-6xl mb-8 select-none">Dr. Delululove</div>
        <p className="text-[10px] text-slate-800 font-black uppercase tracking-[0.6em]">REALITYCHECK DATA SYSTEMS &copy; 2024</p>
      </footer>
    </div>
  );
};

export default App;
