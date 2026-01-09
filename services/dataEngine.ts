
import { CountryData, CalculationResults, RarityTier, DeviationLevel } from '../types';

function getIncomeSurvivalProbability(threshold: number, median: number, sigma: number): number {
  if (threshold <= 0) return 1.0;
  const mu = Math.log(median);
  const x = (Math.log(threshold) - mu) / (sigma * Math.sqrt(2));
  
  const erf = (t: number) => {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const sign = t < 0 ? -1 : 1, absT = Math.abs(t), k = 1.0 / (1.0 + p * absT);
    return sign * (1.0 - (((((a5 * k + a4) * k) + a3) * k + a2) * k + a1) * k * Math.exp(-absT * absT));
  };

  const cdf = 0.5 * (1 + erf(x));
  return 1 - cdf;
}

function getAgeProbability(min: number, max: number): number {
  const TOTAL_ADULT_SPAN = 62; 
  const requestedSpan = Math.max(0, Math.min(80, max) - Math.max(18, min));
  return requestedSpan / TOTAL_ADULT_SPAN;
}

export const calculateReality = (
  country: CountryData,
  targetIncome: number,
  ageMin: number,
  ageMax: number,
  lang: 'EN' | 'PT'
): CalculationResults => {
  const incomeProb = getIncomeSurvivalProbability(targetIncome, country.incomeMedian, country.incomeStdDev);
  const ageProb = getAgeProbability(ageMin, ageMax);
  const totalProb = Math.max(0.000001, incomeProb * ageProb);
  
  const ratioToMode = targetIncome / country.incomeMode;
  const ratioToMean = targetIncome / country.incomeMean;

  let tier: RarityTier = 'COMMON';
  
  // STRICT INCOME TIERING
  if (targetIncome <= 0) {
    tier = 'ZERO_INCOME';
  } else if (targetIncome < country.incomeMode * 0.75) {
    tier = 'MINIMUM_WAGE';
  } else if (targetIncome <= country.incomeMode * 1.3) {
    tier = 'EXTREMELY_COMMON'; 
  } else if (targetIncome <= country.incomeMedian * 1.6) {
    tier = 'COMMON';
  } else if (ratioToMean <= 2.5) {
    tier = 'RARE';
  } else if (ratioToMean <= 5.5) {
    tier = 'EXTREMELY_RARE';
  } else {
    tier = 'PHANTOM';
  }

  // Density-based adjustment (only for scarcity, never pushes to Zero/Min Wage)
  if (targetIncome > country.incomeMean) {
    if (totalProb < 0.0001 && (tier !== 'PHANTOM' && tier !== 'EXTREMELY_RARE')) {
        tier = 'EXTREMELY_RARE';
    }
    if (totalProb < 0.00001) {
        tier = 'PHANTOM';
    }
  }

  let deviation: DeviationLevel = 'AROUND_MEAN';
  if (targetIncome < country.incomeMean * 0.7) deviation = 'BELOW_MEAN';
  else if (targetIncome > country.incomeMean * 4.0) deviation = 'FAR_ABOVE_MEAN';
  else if (targetIncome > country.incomeMean * 1.8) deviation = 'ABOVE_MEAN';

  const rarityIndex = Math.min(100, Math.max(0, (ratioToMean / 6.0) * 100));

  return {
    percentageOfTarget: totalProb,
    totalPoolCount: Math.round(country.singleMaleAdults * totalProb),
    rarityIndex,
    tier,
    deviation,
    localIncomeStats: {
      median: country.incomeMedian,
      mean: country.incomeMean,
      mode: country.incomeMode
    },
    probabilityStatement: lang === 'EN' 
      ? `${(totalProb * 100).toFixed(4)}% of single men in ${country.nameEN} meet these criteria.`
      : `${(totalProb * 100).toFixed(4)}% dos homens solteiros no ${country.namePT} atendem a estes critérios.`
  };
};
