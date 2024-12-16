'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from 'lucide-react';
import React, { useState } from 'react';

export default function MemeTrade() {
  const [price, setPrice] = useState(1.00);
  const [poolSize, setPoolSize] = useState(10000);
  const [pumpPercentage, setPumpPercentage] = useState(65);

  const buttonStyles = {
    pump: { backgroundColor: '#1a1a1a' },
    pumpHover: { backgroundColor: '#22c55e' },
    dump: { backgroundColor: '#ef4444' },
    dumpHover: { backgroundColor: '#dc2626' }
  };

  const handleTradeClick = (type: 'PUMP' | 'DUMP') => {
    // Add trade logic
    console.log(`${type} clicked`);
  };

  return (
    <div className="relative min-h-screen pb-16">
      <div className="max-w-md mx-auto px-4 py-8 space-y-4">
        <Card className="bg-white shadow-lg overflow-hidden rounded-[25px]">
          <CardContent className="space-y-6 pt-6">
            {/* Price Display */}
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

            {/* Trading Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <Button 
                style={buttonStyles.pump}
                className="p-6 text-white"
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonStyles.pumpHover.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyles.pump.backgroundColor}
                onClick={() => handleTradeClick('PUMP')}
              >
                <TrendingUp className="mr-2" />
                PUMP
              </Button>
              <Button 
                style={buttonStyles.dump}
                className="p-6 text-white"
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonStyles.dumpHover.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyles.dump.backgroundColor}
                onClick={() => handleTradeClick('DUMP')}
              >
                <TrendingDown className="mr-2" />
                DUMP
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}