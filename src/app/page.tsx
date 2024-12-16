"use client"
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Zap } from 'lucide-react';

export default function Home() {
  const buttonStyles = {
    pump: {
      backgroundColor: '#1a1a1a'
    },
    pumpHover: {
      backgroundColor: '#22c55e'
    },
    dump: {
      backgroundColor: '#ef4444'
    },
    dumpHover: {
      backgroundColor: '#dc2626'
    }
  };

  const handleTradeClick = (type: 'PUMP' | 'DUMP') => {
    console.log(`Clicked ${type}`);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-8 space-y-4">
        <Card className="bg-white shadow-lg overflow-hidden rounded-[25px]">
          <CardContent className="space-y-6 pt-6">
            <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-3 rounded-lg flex justify-between items-center">
              <div className="flex items-center">
                <Zap className="text-purple-600 mr-2" />
                <span className="font-semibold text-purple-800">
                  Trending 🔥
                </span>
              </div>
              <div className="text-sm text-purple-700">
                23:45:30 left
              </div>
            </div>

            <div className="w-full bg-black overflow-hidden">
              <img 
                src="/api/placeholder/400/400"
                alt="Meme"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="text-3xl font-bold">
                  $1.000
                </div>
                <div className="text-sm text-green-600">
                  65% Pumping
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg">Pool Size</div>
                <div className="text-xl font-semibold">
                  $10,000
                </div>
              </div>
            </div>

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
    </main>
  );
}