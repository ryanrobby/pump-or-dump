export interface MemeDisplayProps {
    imageUrl: string;
    price: number;
    poolSize: number;
    pumpPercentage: number;
    phase: 'trending' | 'revival' | 'stable';
    timeLeft?: string;
  }