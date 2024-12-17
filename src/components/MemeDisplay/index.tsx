import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Timer, Users } from 'lucide-react';
import TradingControls from '@/components/TradingControls';
import { MemeDisplayProps } from './types';

const MemeDisplay = ({ 
  name,
  imageUrl, 
  price, 
  poolSize,
  pumpPercentage,
  onTrade,
  onCashOut,
  showCashOutModal
}: MemeDisplayProps) => {
  return (
    <Card className="bg-white shadow-lg overflow-hidden rounded-[25px]">
      <CardContent className="space-y-6 pt-6">
        <div className="text-2xl font-bold text-left text-gray-800">
          {name}
        </div>

        <div className="w-full bg-black overflow-hidden">
          <img 
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="text-3xl font-bold">${price.toFixed(3)}</div>
            <div className={`text-sm ${pumpPercentage > 50 ? "text-green-600" : "text-red-600"}`}>
              {pumpPercentage > 50 ? `${pumpPercentage}% Pumping` : `${100-pumpPercentage}% Dumping`}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg">Pool Size</div>
            <div className="text-xl font-semibold">${poolSize.toLocaleString()}</div>
          </div>
        </div>

        <TradingControls 
          currentPrice={price}
          onTrade={onTrade}
          onCashOut={onCashOut}
          showCashOutModal={showCashOutModal}
        />

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Users className="mr-2" size={16} />
            Active Traders: 521
          </div>
          <div className="flex items-center justify-end">
            <Timer className="mr-2" size={16} />
            24h Volume: $25.5K
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemeDisplay;