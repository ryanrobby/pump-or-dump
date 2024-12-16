// src/components/MemeDisplay/index.tsx
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Zap } from 'lucide-react';
import { MemeDisplayProps } from './types';

const MemeDisplay = ({ 
  imageUrl, 
  price, 
  poolSize,
  pumpPercentage,
  phase,
  timeLeft
}: MemeDisplayProps) => {
  return (
    <Card className="bg-white shadow-lg overflow-hidden rounded-[25px]">
      <CardContent className="space-y-6 pt-6">
        <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-3 rounded-lg flex justify-between items-center">
          <div className="flex items-center">
            <Zap className="text-purple-600 mr-2" />
            <span className="font-semibold text-purple-800">
              {phase === 'trending' ? 'Trending 🔥' : 
               phase === 'revival' ? 'Revival 🚀' : 'Stable 💎'}
            </span>
          </div>
          {phase !== 'stable' && timeLeft && (
            <div className="text-sm text-purple-700">
              {timeLeft} left
            </div>
          )}
        </div>

        <div className="w-full bg-black overflow-hidden">
          <img 
            src={imageUrl}
            alt="Meme"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="text-3xl font-bold">
              ${price.toFixed(3)}
            </div>
            <div className={`text-sm ${pumpPercentage > 50 ? "text-green-600" : "text-red-600"}`}>
              {pumpPercentage > 50 ? `${pumpPercentage}% Pumping` : `${100-pumpPercentage}% Dumping`}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg">Pool Size</div>
            <div className="text-xl font-semibold">
              ${poolSize.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeDisplay;