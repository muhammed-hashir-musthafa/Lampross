export const calculateConstructionCost = (area, state, constructionType) => {
  const baseRates = {
    basic: { min: 1800, max: 2200 },
    standard: { min: 2200, max: 2800 },
    premium: { min: 2800, max: 3500 },
  };

  const stateMultipliers = {
    state1: 1.2,
    state2: 1.0,
    state3: 0.9,
  };

  const rate = baseRates[constructionType.toLowerCase()] || baseRates.standard;
  const multiplier = stateMultipliers[state] || 1.0;

  return {
    min: Math.round((rate.min * area * multiplier) / 100000),
    max: Math.round((rate.max * area * multiplier) / 100000),
  };
};

export const calculateInteriorCost = (area, constructionType) => {
  const baseRates = {
    basic: { min: 800, max: 1200 },
    standard: { min: 1200, max: 1800 },
    premium: { min: 1800, max: 2500 },
  };

  const rate = baseRates[constructionType.toLowerCase()] || baseRates.standard;

  return {
    min: Math.round((rate.min * area) / 100000),
    max: Math.round((rate.max * area) / 100000),
  };
};
