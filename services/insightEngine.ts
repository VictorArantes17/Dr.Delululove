
import { GoogleGenAI, Type } from "@google/genai";
import { AppState, CalculationResults, CountryData, Language, MarketDossier } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Mapeia os dados estatísticos para as 4 dimensões narrativas internas
 */
function getInternalCategorization(state: AppState, results: CalculationResults, country: CountryData) {
  // 1. Relative Position
  let incomePosition = "Standard Development Tier";
  const isSpecialDevelopment = state.targetIncome >= country.incomeMedian && state.targetIncome <= country.incomeMean;
  
  if (isSpecialDevelopment) incomePosition = "Special Development Category (Active Growth)";
  else if (state.targetIncome < country.incomeMedian) incomePosition = "Foundational / Construction Tier";
  else if (state.targetIncome > country.incomeMean * 3) incomePosition = "Peak Autonomy / High Optionality";

  // 2. Life Phase
  const avgAge = (state.targetAgeMin + state.targetAgeMax) / 2;
  let lifePhase = "Consolidation Phase";
  if (avgAge < 25) lifePhase = "Formation / Educational Phase";
  else if (avgAge < 35) lifePhase = "Construction / Early Trajectory Phase";
  else if (avgAge > 48) lifePhase = "Peak Stability / Late Career Phase";

  // 3. Optionality
  const optionality = (results.tier === 'PHANTOM' || results.tier === 'EXTREMELY_RARE' || results.tier === 'RARE') ? "High" : "Moderate to Low";

  // 4. Asymmetry
  let asymmetry = "Symmetric / Partnership Oriented";
  if (state.targetIncome > state.userIncome * 2) asymmetry = "Provider Oriented (Man as Anchor)";
  else if (state.userIncome > state.targetIncome) asymmetry = "Inverse Asymmetry (Woman as Anchor)";

  return { incomePosition, lifePhase, optionality, asymmetry, isSpecialDevelopment };
}

export async function generateFullAudit(state: AppState, results: CalculationResults, country: CountryData): Promise<MarketDossier> {
  const profile = getInternalCategorization(state, results, country);
  const langLabel = state.lang === Language.PT ? "Português Brasileiro" : "English";

  // Determinando a fase de vida da mulher como sinal relacional (internal logic)
  let femaleRelationalSignal = "Construction/Legacy Phase";
  if (state.userAge < 25) femaleRelationalSignal = "Formation Phase";
  else if (state.userAge > 45) femaleRelationalSignal = "Maturity Stability Phase";

  const systemInstruction = `
    You are a Senior Relational Auditor. Generate high-fidelity analytical chapters.
    
    CORE NARRATIVE CONSTRAINTS:
    1. VOICE: Feminine, empathetic, and reflective. Like one woman explaining reality to another.
    2. NO DIRECT ADDRESS: Never say "you" or "your". Use "one", "a woman", "the observer", "the seeker".
    3. NO TECHNICAL TERMS: No "median", "standard deviation", "calculation", "data points", or "PPP".
    4. NO IDEOLOGY: No "alpha", "hypergamy", "redpill", etc.
    5. PATTERN FOCUS: Use phrases like "what tends to happen", "what often repeats", "what usually unfolds".
    6. CLUSTER LOGIC: Always base insights on the man's relative income position, life phase, optionality, and income asymmetry.
    7. CHAPTER XII STRICT RULE: Analysis must refer EXCLUSIVELY to the MAN'S behavior. Analyze only male-initiated separation and male fidelity patterns. Never analyze the woman's infidelity or her initiation of divorce in this chapter.
  `;

  const prompt = `
    Location: ${state.lang === Language.PT ? country.namePT : country.nameEN}
    Man's Relative Position: ${profile.incomePosition}
    Man's Life Phase: ${profile.lifePhase}
    Man's Optionality: ${profile.optionality}
    Woman's Current Age: ${state.userAge}
    Woman's Monthly Income: ${state.userIncome}
    Woman's Relational Signal: ${femaleRelationalSignal}

    REQUIRED SECTIONS:
    1. personalInsights (300-400 words): Reflections on market visibility vs reality.
    2. chapterVIII - The Structure of Choice (300-400 words): How digital visibility shapes expectations.
    3. chapterIX - Behavioral Mapping (300-400 words): Perceived value vs lived success in this tier.
    4. chapterX - Socioeconomic Symmetries (300-400 words): Daily life and power dynamics.
    5. chapterXI - Relationship Success Probability (300-400 words): Stability and commitment patterns.
    6. chapterXII - Fidelity & Male Divorce Initiation (~200 words): Analyze ONLY the man's behavior.
    7. chapterXIII - Perceptual Alignment (~200 words): Man's need for peace and future orientation.
    8. chapterXIV - The Architecture of Distance (300-400 words): Explain what emotionally distances this man away before and during commitment.
    9. chapterXV - Through the Mirror (300-400 words): Explain how men in this specific cluster perceive a woman of exactly ${state.userAge} years old with an income of ${state.userIncome}.
       - TONE: Advisory, motherly, like a wise woman advising a daughter. Honest but gentle.
       - INITIAL PERCEPTION: How he evaluates her age and income; focus on his prioritization of peace over her status.
       - EXPECTATIONS: What he seeks in a partner; attitudes that enhance his long-term interest.
       - REFLECTIVE ADVICE: Subtle critique of overly selective patterns; warnings about biological and social realities constraining options.
    10. finalConclusion (300-400 words): Synthesis on realism and alignment.

    Language: ${langLabel}.
    Output JSON format only.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            personalInsights: { type: Type.STRING },
            chapterVIII: { type: Type.STRING },
            chapterIX: { type: Type.STRING },
            chapterX: { type: Type.STRING },
            chapterXI: { type: Type.STRING },
            chapterXII: { type: Type.STRING },
            chapterXIII: { type: Type.STRING },
            chapterXIV: { type: Type.STRING },
            chapterXV: { type: Type.STRING },
            finalConclusion: { type: Type.STRING },
          },
          required: ["personalInsights", "chapterVIII", "chapterIX", "chapterX", "chapterXI", "chapterXII", "chapterXIII", "chapterXIV", "chapterXV", "finalConclusion"]
        }
      }
    });

    const data = JSON.parse(response.text);
    return {
      reportId: `AUDIT-${results.tier.substring(0,2)}-${Math.floor(Math.random()*999)}`,
      timestamp: new Date().toLocaleDateString(),
      countryName: state.lang === Language.PT ? country.namePT : country.nameEN,
      sections: data
    };
  } catch (error) {
    console.error("Narrative Engine Failure:", error);
    throw error;
  }
}
