
export enum Language {
  EN = 'EN',
  PT = 'PT'
}

export type RarityTier = 'ZERO_INCOME' | 'MINIMUM_WAGE' | 'EXTREMELY_COMMON' | 'COMMON' | 'RARE' | 'EXTREMELY_RARE' | 'PHANTOM';
export type DeviationLevel = 'BELOW_MEAN' | 'AROUND_MEAN' | 'ABOVE_MEAN' | 'FAR_ABOVE_MEAN';

export interface CountryData {
  id: string;
  nameEN: string;
  namePT: string;
  currency: string;
  pppConversion: number;
  totalPopulation: number;
  maleAdults: number;
  femaleAdults: number;
  singleMaleAdults: number;
  singleFemaleAdults: number;
  incomeMedian: number;
  incomeMean: number;
  incomeMode: number;
  incomeStdDev: number;
  source: string;
  reliability: number;
}

export interface CalculationResults {
  percentageOfTarget: number;
  totalPoolCount: number;
  rarityIndex: number;
  tier: RarityTier;
  deviation: DeviationLevel;
  localIncomeStats: {
    median: number;
    mean: number;
    mode: number;
  };
  probabilityStatement: string;
}

export interface IntelligenceReport {
  id: string;
  rarityTier: RarityTier;
  deviation: DeviationLevel;
  percentileBand: string;
  tags: string[];
  content: string;
}

export interface MarketDossier {
  reportId: string;
  timestamp: string;
  countryName: string;
  intelligenceReport?: IntelligenceReport;
  sections: {
    personalInsights: string;   // 300-400 words
    chapterVIII: string;        // 300-400 words
    chapterIX: string;          // 300-400 words
    chapterX: string;           // 300-400 words
    chapterXI: string;          // 300-400 words
    chapterXII: string;         // ~200 words - Fidelity & Divorce Initiation
    chapterXIII: string;        // ~200 words - How This Man Perceives This Woman
    chapterXIV: string;         // 300-400 words - The Architecture of Distance
    chapterXV: string;          // 300-400 words - Through the Mirror (Female Evaluation)
    finalConclusion: string;    // 300-400 words
  };
}

export interface AppState {
  lang: Language;
  userAge: number;              // Added for Chapter XV personalization
  userIncome: number;
  targetIncome: number;
  countryId: string;
  targetAgeMin: number;
  targetAgeMax: number;
}
