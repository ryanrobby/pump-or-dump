"use client"
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";  
import { Zap } from 'lucide-react';
import TradingControls, { Position } from '@/components/TradingControls';
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
    const baseImpact = isPump ? 0.01 : -0.01;
    const multiplier = phase === 'trending' ? 5 :
                      phase === 'revival' ? 3 : 1;
    const sentimentMultiplier = (pumpPercentage / 50) - 1;
    return baseImpact * multiplier * (1 + sentimentMultiplier);
  };

  const calculatePositionValue = (position: Position) => {
    return position.type === 'PUMP'
      ? position.amount * (price / position.entryPrice)
      : position.amount * (2 - price / position.entryPrice);
  };

  const handleTrade = (type: 'PUMP' | 'DUMP', amount: number) => {
    const impact = calculatePriceImpact(type === 'PUMP');
    setPrice(prev => prev * (1 + impact));
    setPumpPercentage(prev => 
      type === 'PUMP' 
        ? Math.min(100, prev + 1) 
        : Math.max(0, prev - 1)
    );
    setPoolSize(prev => prev + amount);
  };

  const handleCashOut = (position: Position) => {
    setSelectedPosition(position);
    setShowCashOutModal(true);
  };

  const confirmCashOut = () => {
    if (selectedPosition) {
      const positionValue = calculatePositionValue(selectedPosition);
      setPoolSize(prev => prev - positionValue);
      
      const event = new CustomEvent('positionClosed', {
        detail: { id: selectedPosition.id }
      });
      document.dispatchEvent(event);
      
      setShowCashOutModal(false);
      setSelectedPosition(null);
    }
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
                  {phase === 'trending' ? 'Trending 🔥' : 
                   phase === 'revival' ? 'Revival 🚀' : 'Stable 💎'}
                </span>
              </div>
              {phase !== 'stable' && (
                <div className="text-sm text-purple-700">
                  23:45:30 left
                </div>
              )}
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
              onTrade={handleTrade}
              onCashOut={handleCashOut}
              showCashOutModal={showCashOutModal}
            />
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={showCashOutModal} onOpenChange={setShowCashOutModal}>
        <AlertDialogContent className="bg-white rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Confirm Cash Out</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                {selectedPosition && (
                  <>
                    <p>Are you sure you want to cash out this position?</p>
                    <p className="mt-2 font-medium">
                      Total: ${calculatePositionValue(selectedPosition).toFixed(2)}
                    </p>
                    <p className={`mt-1 font-medium ${
                      calculatePositionValue(selectedPosition) >= selectedPosition.amount 
                        ? "text-green-600" 
                        : "text-red-600"
                    }`}>
                      {calculatePositionValue(selectedPosition) >= selectedPosition.amount ? "Profit: " : "Loss: "}
                      ${Math.abs(calculatePositionValue(selectedPosition) - selectedPosition.amount).toFixed(2)}
                    </p>
                  </>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="rounded-lg border border-gray-200">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmCashOut}
              className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
            >
              Confirm Cash Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}