"use client"
import React from 'react';
import MemeDisplay from '@/components/MemeDisplay';
import CardNavigation from '@/components/CardNavigation';
import TradingControls from '@/components/TradingControls';
import { Position } from '@/types/trading';
import BottomNavigation from '@/components/Navigation';
import { useMemeData } from '@/hooks/useMemeData';
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
  const [showCashOutModal, setShowCashOutModal] = React.useState(false);
  const [selectedPosition, setSelectedPosition] = React.useState<Position | null>(null);
  const [allPositions, setAllPositions] = React.useState<Position[]>([]);
  const [activeTab, setActiveTab] = React.useState('discover');
  const { currentMeme, price, poolSize, pumpPercentage, nextMeme, setPrice, setPoolSize, setPumpPercentage } = useMemeData();

  const calculatePriceImpact = (isPump: boolean) => {
    const baseImpact = isPump ? 0.01 : -0.01;
    const multiplier = 5; // Simplified for now
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

  const handleCashOut = (position: Position, positions?: Position[]) => {
    setSelectedPosition(position);
    setAllPositions(positions || []);
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
      setAllPositions([]);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-8 space-y-4">
      <MemeDisplay
  name={currentMeme.name}
  imageUrl="/api/placeholder/400/400"
  price={price}
  poolSize={poolSize}
  pumpPercentage={pumpPercentage}
  onTrade={handleTrade}
  onCashOut={handleCashOut}
  showCashOutModal={showCashOutModal}
/>
        
        <CardNavigation onNext={nextMeme} />

       
      </div>

      <BottomNavigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <AlertDialog open={showCashOutModal} onOpenChange={setShowCashOutModal}>
        <AlertDialogContent className="bg-white rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Confirm Cash Out</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                {allPositions.length > 1 ? (
                  <>
                    <p>Are you sure you want to cash out all positions?</p>
                    {(() => {
                      const totalInvested = allPositions.reduce((sum, pos) => sum + pos.amount, 0);
                      const totalValue = allPositions.reduce((sum, pos) => sum + calculatePositionValue(pos), 0);
                      const pnl = totalValue - totalInvested;
                      const pnlPercent = ((totalValue - totalInvested) / totalInvested) * 100;
                      
                      return (
                        <>
                          <p className="mt-2 font-medium">
                            Total Cash Out: ${totalValue.toFixed(2)}
                          </p>
                          <p className={`mt-1 font-medium ${pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {pnl >= 0 ? "Total Profit: " : "Total Loss: "}
                            ${Math.abs(pnl).toFixed(2)} ({pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(1)}%)
                          </p>
                        </>
                      );
                    })()}
                  </>
                ) : (
                  selectedPosition && (
                    <>
                      <p>Are you sure you want to cash out this position?</p>
                      {(() => {
                        const posValue = calculatePositionValue(selectedPosition);
                        const pnl = posValue - selectedPosition.amount;
                        const pnlPercent = ((posValue - selectedPosition.amount) / selectedPosition.amount) * 100;
                        
                        return (
                          <>
                            <p className="mt-2 font-medium">
                              Total: ${posValue.toFixed(2)}
                            </p>
                            <p className={`mt-1 font-medium ${pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                              {pnl >= 0 ? "Profit: " : "Loss: "}
                              ${Math.abs(pnl).toFixed(2)} ({pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(1)}%)
                            </p>
                          </>
                        );
                      })()}
                    </>
                  )
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