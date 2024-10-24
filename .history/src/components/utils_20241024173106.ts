export const tiers = [
    { level: 1, limit: 2000, rate: 19.33 },
    { level: 2, limit: 3000, rate: 45.11 },
    { level: 3, limit: Infinity, rate: 49.90 },
  ]
  
  export interface TierBreakdown {
    tier: number;
    usage: number;
    rate: number;
    cost: number;
  }
  
  export function calculateBill(usage: number): { totalCost: number; breakdown: TierBreakdown[] } {
    let remainingUsage = usage
    let totalCost = 0
    const breakdown: TierBreakdown[] = []
  
    tiers.forEach(() => {
      const tierUsage = Math.min(remainingUsage, tier.limit)
      const tierCost = tierUsage * tier.rate
      totalCost += tierCost
      remainingUsage -= tierUsage
  
      breakdown.push({
        tier: tier.level,
        usage: tierUsage,
        rate: tier.rate,
        cost: tierCost / 100, // Convert cents to Rand
      })
  
      if (remainingUsage <= 0) return
    })
  
    return { totalCost: totalCost / 100, breakdown } // Convert cents to Rand
  }
  
  export interface Meter {
    id: string;
    name: string;
    currentReading: number;
  }
