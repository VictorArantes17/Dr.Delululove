
import React from 'react';
import { MarketDossier, Language } from '../types';

interface Props {
  dossier: MarketDossier;
  lang: Language;
}

const MarketDossierDisplay: React.FC<Props> = ({ dossier, lang }) => {
  const sections = [
    { id: 'I', title: lang === Language.PT ? 'Insights do Auditor Relacional' : 'Relational Auditor Insights', content: dossier.sections.personalInsights },
    { id: 'VIII', title: lang === Language.PT ? 'Capítulo VIII // A Estrutura da Escolha' : 'Chapter VIII // The Structure of Choice', content: dossier.sections.chapterVIII },
    { id: 'IX', title: lang === Language.PT ? 'Capítulo IX // Mapeamento Comportamental' : 'Chapter IX // Behavioral Mapping', content: dossier.sections.chapterIX },
    { id: 'X', title: lang === Language.PT ? 'Capítulo X // Simetrias Socioeconômicas' : 'Chapter X // Socioeconomic Symmetries', content: dossier.sections.chapterX },
    { id: 'XI', title: lang === Language.PT ? 'Capítulo XI // Probabilidade de Sucesso Relacional' : 'Chapter XI // Relationship Success Probability', content: dossier.sections.chapterXI },
    { id: 'XII', title: lang === Language.PT ? 'Capítulo XII // Fidelidade e Iniciativa de Divórcio' : 'Chapter XII // Fidelity & Divorce Initiation', content: dossier.sections.chapterXII },
    { id: 'XIII', title: lang === Language.PT ? 'Capítulo XIII // Alinhamento de Percepção' : 'Chapter XIII // Perceptual Alignment', content: dossier.sections.chapterXIII },
    { id: 'XIV', title: lang === Language.PT ? 'Capítulo XIV // A Arquitetura do Distanciamento' : 'Chapter XIV // The Architecture of Distance', content: dossier.sections.chapterXIV },
    { id: 'XV', title: lang === Language.PT ? 'Capítulo XV // Através do Espelho (Percepção)' : 'Chapter XV // Through the Mirror (Perception)', content: dossier.sections.chapterXV },
  ];

  return (
    <div className="bg-[#020617]/98 border border-rose-900/20 rounded-[3rem] p-8 lg:p-20 relative overflow-hidden shadow-2xl space-y-40">
      {/* Brand Watermark */}
      <div className="absolute top-0 right-0 p-10 opacity-[0.03] select-none pointer-events-none">
        <svg className="w-[50rem] h-[50rem] text-rose-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>

      <header className="flex flex-col md:flex-row justify-between items-end border-b border-rose-950/20 pb-16 gap-8">
        <div className="relative z-10">
          <div className="text-[10px] text-rose-500 font-black uppercase tracking-[0.6em] mb-4">Confidential Relational Audit</div>
          <h2 className="serif text-6xl lg:text-8xl text-rose-100 tracking-tighter uppercase italic leading-none">The Reality Dossier</h2>
          <div className="text-[10px] text-rose-800 font-black uppercase tracking-[0.3em] mt-10 flex flex-wrap items-center gap-6">
            <span className="bg-rose-950/40 px-6 py-2 rounded-full border border-rose-900/30 text-rose-300">REF: {dossier.reportId}</span>
            <span className="w-1.5 h-1.5 bg-rose-900 rounded-full"></span>
            <span>AUDIT LOC: {dossier.countryName.toUpperCase()}</span>
            <span className="w-1.5 h-1.5 bg-rose-900 rounded-full"></span>
            <span>DATE: {dossier.timestamp}</span>
          </div>
        </div>
      </header>

      <div className="space-y-48">
        {sections.map((section, idx) => (
          <section key={section.id} className="relative z-10 space-y-12 animate-in fade-in duration-1000 slide-in-from-bottom-12" style={{ animationDelay: `${idx * 150}ms` }}>
            <div className="flex items-center gap-8">
              <span className="text-[11px] font-black text-rose-500 bg-rose-500/5 px-6 py-2 rounded-xl border border-rose-500/10 uppercase tracking-[0.5em]">
                {section.id}
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-rose-900/20 to-transparent"></div>
            </div>
            <h3 className="serif text-4xl lg:text-6xl text-rose-50 italic leading-tight max-w-4xl">{section.title}</h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-400 text-xl lg:text-2xl leading-[2.1] text-justify font-light whitespace-pre-line first-letter:text-6xl first-letter:font-black first-letter:text-rose-600 first-letter:mr-4 first-letter:float-left first-letter:mt-1">
                {section.content}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* FINAL CONCLUSION */}
      <footer className="pt-20">
        <div className="bg-gradient-to-br from-[#0a0f1e] to-slate-950 p-12 lg:p-24 rounded-[5rem] border border-rose-500/10 shadow-3xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500/30 to-transparent"></div>
          
          <div className="text-rose-600 text-[10px] font-black uppercase tracking-[0.8em] mb-16 text-center">Final Audit Summary</div>
          <p className="text-rose-100 text-3xl lg:text-5xl font-medium italic leading-[1.8] text-center max-w-6xl mx-auto">
            {dossier.sections.finalConclusion}
          </p>
          
          <div className="mt-32 pt-16 border-t border-rose-500/5 flex flex-col items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-rose-900/40"></div>
              <div className="text-[9px] text-rose-900 font-black tracking-[1em] uppercase">SYSTEMS INTEGRITY VERIFIED</div>
              <div className="w-8 h-[1px] bg-rose-900/40"></div>
            </div>
            <p className="text-[8px] text-slate-700 uppercase tracking-widest font-bold">Dr. Delululove &copy; 2024 - Realism Audit Division</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketDossierDisplay;
