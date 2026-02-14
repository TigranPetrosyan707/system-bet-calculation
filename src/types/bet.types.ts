export type SystemType = {
  requiredWins: number;
  totalSelections: number;
};

export interface BetInput {
  odds: number[];
  system: SystemType;
  stake: number;
}

export interface CombinationResult {
  combination: number[];
  payout: number;
  stakePerCombination: number;
}

export interface SystemBetResult {
  totalCombinations: number;
  stakePerCombination: number;
  combinations: CombinationResult[];
  totalPayout: number;
  totalStake: number;
  profit: number;
}

