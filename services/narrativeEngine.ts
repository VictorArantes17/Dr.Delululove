
import { Language, CalculationResults, AppState, MarketDossier, RarityTier } from '../types';
import { getIntelligenceReport } from './marketIntelligence';
import { WORLD_DATA } from './mockDatabase';

export function assembleDossier(results: CalculationResults, state: AppState): MarketDossier {
  const lang = state.lang || Language.PT;
  const seed = (Math.abs(state.targetIncome - state.userIncome) + (results.totalPoolCount % 997)) % 100;
  
  const intelligenceReport = getIntelligenceReport(results, lang);
  const country = WORLD_DATA.find(c => c.id === state.countryId) || WORLD_DATA[0];

  const placeholderText = lang === Language.PT 
    ? "Análise em processamento estrutural. Os padrões observados nesta demografia sugerem uma tendência de estabilidade baseada no crescimento mútuo e na lealdade de base."
    : "Structural analysis in progress. Patterns observed in this demographic suggest a trend toward stability based on mutual growth and foundational loyalty.";

  const shortPlaceholderXII = lang === Language.PT
    ? "Observa-se que a fidelidade masculina e a iniciativa do homem em encerrar o vínculo dependem diretamente da sua percepção de alinhamento e do custo de oportunidade em seu cluster específico."
    : "It is observed that male fidelity and the man's initiative to terminate the bond depend directly on his perception of alignment and the opportunity cost within his specific cluster.";

  const shortPlaceholderXIII = lang === Language.PT
    ? "A percepção deste homem sobre a parceria é mediada pela busca por leveza emocional e pela construção de uma rotina que preserve sua sensação de liberdade e propósito futuro."
    : "This man's perception of the partnership is mediated by the search for emotional lightness and the construction of a routine that preserves his sense of freedom and future purpose.";

  const placeholderXIV = lang === Language.PT
    ? "O distanciamento emocional costuma ser um processo silencioso de autoproteção. Quando o homem percebe que sua trajetória não é admirada ou que o ambiente doméstico perdeu a paz, ele tende a se retirar gradualmente, muito antes de uma saída física."
    : "Emotional distancing is often a silent process of self-protection. When a man perceives that his trajectory is not admired or that the domestic environment has lost its peace, he tends to withdraw gradually, long before a physical exit.";

  const placeholderXV = lang === Language.PT
    ? "Neste capítulo, observamos como o homem do cluster selecionado processa o sinal da idade e da renda feminina. A sabedoria ensina que, para a maioria dos homens, a paz e a colaboração emocional superam o status externo, e reconhecer as janelas biológicas de oportunidade é o primeiro passo para um alinhamento realista."
    : "In this chapter, we observe how the selected male cluster processes female age and income signals. Wisdom teaches that, for most men, peace and emotional collaboration outweigh external status, and recognizing biological windows of opportunity is the first step toward realistic alignment.";

  return {
    reportId: `LUV-${results.tier.substring(0,2)}-${seed}`,
    timestamp: new Date().toLocaleDateString(),
    countryName: lang === Language.PT ? country.namePT : country.nameEN,
    intelligenceReport,
    sections: {
      personalInsights: placeholderText,
      chapterVIII: placeholderText,
      chapterIX: placeholderText,
      chapterX: placeholderText,
      chapterXI: placeholderText,
      chapterXII: shortPlaceholderXII,
      chapterXIII: shortPlaceholderXIII,
      chapterXIV: placeholderXIV,
      chapterXV: placeholderXV,
      finalConclusion: lang === Language.PT ? "CONCLUSÃO: O realismo é a maior ferramenta de liberdade." : "CONCLUSION: Realism is the ultimate tool for freedom."
    }
  };
}
