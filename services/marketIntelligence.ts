
import { Language, RarityTier, DeviationLevel, IntelligenceReport } from '../types';

export const INTELLIGENCE_REPORTS: Record<Language, IntelligenceReport[]> = {
  [Language.PT]: [
    {
      id: "RPT-PT-ZERO",
      rarityTier: "ZERO_INCOME",
      deviation: "BELOW_MEAN",
      percentileBand: "Base Inativa",
      tags: ["Ressentimento", "Risco de Dissolução", "Dependência"],
      content: `A vida em parceria com um indivíduo que ocupa a base inativa do mercado é marcada por uma inversão completa da funcionalidade estrutural. Observa-se que, sem um papel produtivo definido, a admiração mútua tende a sofrer uma erosão gradual. A mulher, ao assumir a totalidade da liderança financeira, frequentemente experimenta um colapso no romance, transformando o que deveria ser uma união em um exercício de amparo unilateral. Padrões recorrentes sugerem que parcerias nestas circunstâncias apresentam as maiores taxas de dissolução, pois a ausência de provisão e proteção gera um vácuo de respeito que dificilmente é preenchido por outros atributos.`
    },
    {
      id: "RPT-PT-COMMON",
      rarityTier: "COMMON",
      deviation: "AROUND_MEAN",
      percentileBand: "Equilíbrio Realista",
      tags: ["Categoria de Desenvolvimento", "Lealdade", "Potencial"],
      content: `Este perfil situa-se na zona de maior probabilidade de sucesso matrimonial estável. Homens em fase de crescimento e consolidação representam a espinha dorsal da sociedade e apresentam os maiores níveis de investimento emocional no lar. Quando alinhados com uma parceira que valoriza a construção mútua, estes homens desenvolvem uma motivação extraordinária para progredir e prover. A vida cotidiana é marcada pela previsibilidade e pela paz, longe da volatilidade de ego comum em perfis de elite. É a escolha que oferece o melhor equilíbrio entre segurança material e disponibilidade afetiva genuína.`
    },
    {
      id: "RPT-PT-PH-001",
      rarityTier: "PHANTOM",
      deviation: "FAR_ABOVE_MEAN",
      percentileBand: "Elite de Alta Opcionalidade",
      tags: ["Volatilidade", "Baixa Tolerância", "Seletividade"],
      content: `A busca por outliers de elite frequentemente ignora o custo emocional da alta opcionalidade. Homens que ocupam o topo extremo da autonomia financeira percebem relacionamentos como ativos de luxo altamente substituíveis. Observa-se uma menor tolerância a fricções domésticas e um foco desproporcional em si mesmos. A abundância de escolhas para o homem reduz seu incentivo para o investimento profundo em uma única dinâmica, tornando a estabilidade a longo prazo uma variável de alto risco. O deslumbre com o status frequentemente mascara a solidão de uma parceria onde a conexão emocional é secundária à manutenção de uma imagem externa impecável.`
    }
  ],
  [Language.EN]: [
    {
      id: "RPT-EN-ZERO",
      rarityTier: "ZERO_INCOME",
      deviation: "BELOW_MEAN",
      percentileBand: "Inactive Base",
      tags: ["Resentment", "Dissolution Risk", "Dependency"],
      content: `Life with an individual in the inactive base of the market is marked by a complete inversion of structural functionality. It is observed that without a defined productive role, mutual admiration tends to erode. A partner who assumes the totality of financial leadership often experiences a collapse in romance, turning what should be a partnership into a unilateral support exercise. Recurring patterns suggest these circumstances present the highest dissolution rates, as the absence of provision creates a void of respect.`
    },
    {
      id: "RPT-EN-COMMON",
      rarityTier: "COMMON",
      deviation: "AROUND_MEAN",
      percentileBand: "Realistic Equilibrium",
      tags: ["Development Category", "Loyalty", "Potential"],
      content: `This profile lies in the zone of highest probability for stable marriage success. Men in the growth and consolidation phase represent the backbone of society and show the highest levels of emotional investment in the home. When aligned with a partner who values mutual growth, these men develop extraordinary motivation to provide and stabilize. Daily life is characterized by predictability and peace, far from the ego volatility common in elite profiles.`
    },
    {
      id: "RPT-EN-PH-001",
      rarityTier: "PHANTOM",
      deviation: "FAR_ABOVE_MEAN",
      percentileBand: "High Optionality Elite",
      tags: ["Volatility", "Low Tolerance", "Selectivity"],
      content: `Targeting elite outliers often ignores the emotional cost of high optionality. Men at the extreme top of financial autonomy perceive relationships as highly replaceable luxury assets. There is a lower tolerance for domestic friction and a disproportionate focus on self. The abundance of choice reduces the incentive for deep investment in a single dynamic, making long-term stability a high-risk variable. Status often masks the solitude of a partnership where emotional connection is secondary to external image.`
    }
  ]
};

export function getIntelligenceReport(results: { tier: RarityTier, deviation: DeviationLevel }, lang: Language): IntelligenceReport {
  const reports = INTELLIGENCE_REPORTS[lang] || INTELLIGENCE_REPORTS[Language.EN];
  const match = reports.find(r => r.rarityTier === results.tier);
  if (match) return match;
  
  if (results.tier === 'PHANTOM' || results.tier === 'EXTREMELY_RARE' || results.tier === 'RARE') {
    return reports.find(r => r.rarityTier === 'PHANTOM') || reports[0];
  }
  
  return reports.find(r => r.rarityTier === 'COMMON') || reports[0];
}
