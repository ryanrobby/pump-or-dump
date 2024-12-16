"use client"
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";  
import { Zap } from 'lucide-react';
import TradingControls from '@/components/TradingControls';
import type { Position } from '@/components/TradingControls';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function Home() {
  const [price, setPrice] = React.useState(1.00);
  const [poolSize, setPoolSize] = React.useState(10000);
  const [pumpPercentage, setPumpPercentage] = React.useState(65);
  const [phase, setPhase] = React.useState('trending');
  const [showCashOutModal, setShowCashOutModal] = React.useState(false);
  const [selectedPosition, setSelectedPosition] = React.useState<Position | null>(null);

  const calculatePriceImpact = (isPump: boolean) => {
    const baseImpact = isPump ? 1 : -1;
    const multiplier = phase === 'trending' ? 0.05 :
                      phase === 'revival' ? 0.03 : 0.01;
    const sentimentMultiplier = (pumpPercentage / 50) - 1;
    return baseImpact * multiplier * (1 + sentimentMultiplier);
  };

  const calculatePositionValue = (position: Position) => {
    return position.type === 'PUMP'
      ? position.amount * (price / position.entryPrice)
      : position.amount * (2 - price / position.entryPrice);
  };

  const handleCashOut = (position: Position) => {
    setSelectedPosition(position);
    setShowCashOutModal(true);
  };

  const confirmCashOut = () => {
    if (selectedPosition) {
      setPoolSize(prev => prev - calculatePositionValue(selectedPosition));
      setShowCashOutModal(false);
    }
  };

  return (
    <div className="relative min-h-screen pb-16">
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
                <div className="text-3xl font-bold">${price.toFixed(3)}</div>
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

            <TradingControls
              currentPrice={price}
              onTrade={(type, amount) => {
                const impact = calculatePriceImpact(type === 'PUMP');  
                setPrice(prev => prev * (1 + impact));
                setPumpPercentage(prev => 
                  type === 'PUMP' 
                    ? Math.min(100, prev + 1) 
                    : Math.max(0, prev - 1)
                );
                setPoolSize(prev => prev + amount);
              }}
              onCashOut={handleCashOut}
            />
          </CardContent>
        </Card>

        <AlertDialog open={showCashOutModal} onOpenChange={setShowCashOutModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Cash Out</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cash out this position?
                <br />
                {selectedPosition && (
                  <span className={calculatePositionValue(selectedPosition) >= selectedPosition.amount ? "text-green-600" : "text-red-600"}>
                    {calculatePositionValue(selectedPosition) >= selectedPosition.amount ? "Profit" : "Loss"}: 
                    ${(calculatePositionValue(selectedPosition) - selectedPosition.amount).toFixed(2)}
                  </span>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmCashOut}>Cash Out</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}