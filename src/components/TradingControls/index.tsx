import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Input } from "@/components/ui/input";

export interface Position {
  id: number;
  type: 'PUMP' | 'DUMP';
  amount: number;
  entryPrice: number;
  timestamp: Date;
}

interface TradingControlsProps {
  currentPrice: number;
  onTrade: (type: 'PUMP' | 'DUMP', amount: number) => void;
  onCashOut: (position: Position) => void;
}

export default function TradingControls({ currentPrice, onTrade, onCashOut }: TradingControlsProps) {
  const [showTradeForm, setShowTradeForm] = useState(false);
  const [tradeAmount, setTradeAmount] = useState('100');
  const [positions, setPositions] = useState<Position[]>([]);
  const [pendingTradeType, setPendingTradeType] = useState<'PUMP' | 'DUMP' | null>(null);

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
    if (!amount || amount <= 0 || !pendingTradeType) return;

    const newPosition: Position = {
      id: Date.now(),
      type: pendingTradeType,
      amount,
      entryPrice: currentPrice,
      timestamp: new Date()
    };

    setPositions([...positions, newPosition]);
    setShowTradeForm(false);
    onTrade(pendingTradeType, amount);
  };

  const calculatePositionValue = (position: Position) => {
    if (position.type === 'PUMP') {
      return position.amount * (currentPrice / position.entryPrice);
    }
    return position.amount * (2 - (currentPrice / position.entryPrice));
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <Button 
          style={buttonStyles.pump}
          className="p-6 text-white flex items-center justify-center"
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonStyles.pumpHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyles.pump.backgroundColor}
          onClick={() => handleTradeClick('PUMP')}
        >
          <TrendingUp className="mr-2" />
          PUMP
        </Button>
        <Button 
          style={buttonStyles.dump}
          className="p-6 text-white flex items-center justify-center"
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonStyles.dumpHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyles.dump.backgroundColor}
          onClick={() => handleTradeClick('DUMP')}
        >
          <TrendingDown className="mr-2" />
          DUMP
        </Button>
      </div>

      {showTradeForm && (
        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Position Size</label>
                <span className="text-sm text-gray-600">Price: ${currentPrice.toFixed(3)}</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  type="number"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  className="pl-7"
                  placeholder="Enter amount..."
                  min="0"
                />
              </div>
            </div>
            <div className="text-sm">
              {pendingTradeType === 'PUMP' ? (
                "Make money when others PUMP it 📈"
              ) : (
                "Make money when others DUMP it 📉"
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowTradeForm(false)}
                variant="outline"
                className="w-full"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmTrade}
                className="w-full text-white"
                style={pendingTradeType === 'PUMP' ? buttonStyles.pump : buttonStyles.dump}
                disabled={!tradeAmount || parseFloat(tradeAmount) <= 0}
              >
                {pendingTradeType} IT
              </Button>
            </div>
          </div>
        </div>
      )}

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
                      onClick={() => {
                        onCashOut(position);
                        setPositions(positions.filter(p => p.id !== position.id));
                      }}
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
}