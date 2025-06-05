export interface ScavengerHunt {
  id: number;
  playerName: string;
  date: string;
  points: number;
  reductions: number;
  totalTime: number;
  timestamps: Array<{
    objective: number;
    startTime: string;
    endTime: string;
  }>;
}
