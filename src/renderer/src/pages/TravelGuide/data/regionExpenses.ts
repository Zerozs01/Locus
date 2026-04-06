import type { RegionId } from '../../../data/regionTheme';

export interface ExpenseProfile {
  accommodation: { budget: number; mid: number; luxury: number }; // per night
  food: { budget: number; mid: number; luxury: number }; // per day (3 meals)
  activity: { budget: number; mid: number; luxury: number }; // per day
  localTransport: number; // per day within region
}

export const regionExpenses: Record<RegionId, ExpenseProfile> = {
  north: {
    accommodation: { budget: 350, mid: 1200, luxury: 3500 },
    food: { budget: 200, mid: 500, luxury: 1500 },
    activity: { budget: 100, mid: 400, luxury: 1200 },
    localTransport: 150
  },
  northeast: {
    accommodation: { budget: 300, mid: 900, luxury: 2500 },
    food: { budget: 150, mid: 400, luxury: 1000 },
    activity: { budget: 50, mid: 300, luxury: 800 },
    localTransport: 100
  },
  central: {
    accommodation: { budget: 500, mid: 1800, luxury: 5000 },
    food: { budget: 250, mid: 600, luxury: 2000 },
    activity: { budget: 200, mid: 600, luxury: 2000 },
    localTransport: 200
  },
  east: {
    accommodation: { budget: 400, mid: 1500, luxury: 4000 },
    food: { budget: 200, mid: 500, luxury: 1500 },
    activity: { budget: 150, mid: 500, luxury: 1500 },
    localTransport: 180
  },
  west: {
    accommodation: { budget: 350, mid: 1000, luxury: 3000 },
    food: { budget: 180, mid: 450, luxury: 1200 },
    activity: { budget: 100, mid: 400, luxury: 1000 },
    localTransport: 120
  },
  south: {
    accommodation: { budget: 400, mid: 1500, luxury: 5000 },
    food: { budget: 220, mid: 550, luxury: 1800 },
    activity: { budget: 200, mid: 600, luxury: 2000 },
    localTransport: 200
  }
};

export type BudgetTier = 'budget' | 'mid' | 'luxury';

export const budgetLabels: Record<BudgetTier, string> = {
  budget: 'ประหยัด',
  mid: 'ปานกลาง',
  luxury: 'หรูหรา'
};

export function calculateTripCost(
  regionId: RegionId,
  tier: BudgetTier,
  days: number,
  people: number,
  transportFare: number
) {
  const exp = regionExpenses[regionId];
  const nights = Math.max(0, days - 1);

  const accommodation = exp.accommodation[tier] * nights;
  const food = exp.food[tier] * days;
  const activity = exp.activity[tier] * days;
  const localTransport = exp.localTransport * days;
  const interTransport = transportFare;

  const subtotal = accommodation + food + activity + localTransport + interTransport;
  const contingency = Math.round(subtotal * 0.1);
  const totalPerPerson = subtotal + contingency;
  const totalAll = totalPerPerson * people;

  return {
    breakdown: {
      accommodation,
      food,
      activity,
      localTransport,
      interTransport,
      contingency
    },
    totalPerPerson,
    totalAll,
    perDay: Math.round(totalPerPerson / Math.max(1, days))
  };
}
