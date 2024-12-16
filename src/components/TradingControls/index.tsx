// At the top of TradingControls/index.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Input } from "@/components/ui/input";


interface TradingControlsProps {
  currentPrice: number;
  onTrade: (type: 'PUMP' | 'DUMP', amount: number) => void;
  onCashOut: (position: Position) => void;
}

const TradingControls: React.FC<TradingControlsProps> = ({ currentPrice, onTrade, onCashOut }) => {
  const [showTradeForm, setShowTradeForm] = useState(false);
  const [tradeAmount, setTradeAmount] = useState('100');
  const [pendingTradeType, setPendingTradeType] = useState<'PUMP' | 'DUMP' | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);

  const buttonStyles = {
    pump: { backgroundColor: '#1a1a1a' },
    pumpHover: { backgroundColor: '#22c55e' },
    dump: { backgroundColor: '#ef4444' },
    dumpHover: { backgroundColor: '#dc2626' }
  };

  const handleTradeClick = (type: 'PUMP' | 'DUMP') => {
    setPendingTradeType(type);
    setTradeAmount('100');
    setShowTradeForm(true);
  };

  const handleConfirmTrade = () => {
    const amount = parseFloat(tradeAmount);
    if (!amount || amount <= 0) return;
    
    const newPosition: Position = {
      id: Date.now(),
      type: pendingTradeType!,
      amount,
      entryPrice: currentPrice,
      timestamp: new Date()
    };

    setPositions([...positions, newPosition]);
    onTrade(pendingTradeType!, amount);
    setShowTradeForm(false);
  };

  const calculatePositionValue = (position: Position) => {
    return position.type === 'PUMP'
      ? position.amount * (currentPrice / position.entryPrice)
      : position.amount * (2 - currentPrice / position.entryPrice);
  };

  return (
    <div className="space-y-4">
      {/* Trading Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => handleTradeClick('PUMP')}
          className="w-full"
          style={buttonStyles.pump}
        >
          <TrendingUp className="mr-2" />
          PUMP
        </Button>
        <Button
          onClick={() => handleTradeClick('DUMP')}
          className="w-full"
          style={buttonStyles.dump}
        >
          <TrendingDown className="mr-2" />
          DUMP
        </Button>
      </div>

      {/* Trade Form */}
      {showTradeForm && (
        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
          {/* ... */}
        </div>
      )}

      {/* Positions */}
      {positions.length > 0 && (
        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">Your Positions</div>
          </div>
          
          <div className="space-y-3">
            {positions.map((position) => {
              const posValue = calculatePositionValue(position);
              const pnl = ((posValue - position.amount) / position.amount) * 100;
              
              return (
                <div key={position.id} className="p-3 bg-white rounded-lg shadow-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-black">
                      {position.type} ${position.amount}
                    </span>
                    <span className="text-gray-500 text-sm">
                      Entry: ${position.entryPrice.toFixed(3)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`font-medium ${pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                      ${posValue.toFixed(2)} ({pnl >= 0 ? "+" : ""}{pnl.toFixed(1)}%)
                    </span>
                    <Button
                      size="sm"
                      onClick={() => onCashOut(position)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm"
                    >
                      Cash Out
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingControls;

export type Position = {
    id: number;
    type: 'PUMP' | 'DUMP';
    amount: number;
    entryPrice: number;
    timestamp: Date;
  };