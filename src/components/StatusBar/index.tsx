// This file contains the React component implementation

import { Zap } from 'lucide-react';
import { StatusBarProps } from './types';

const getPhaseEmoji = (phase: StatusBarProps['phase']) => {
  switch (phase) {
    case 'trending':
      return '🔥';
    case 'revival':
      return '🚀';
    case 'stable':
      return '💎';
    default:
      return '';
  }
};

export const StatusBar = ({ phase, timeLeft }: StatusBarProps) => {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-3 rounded-lg flex justify-between items-center">
      <div className="flex items-center">
        <Zap className="text-purple-600 mr-2" />
        <span className="font-semibold text-purple-800">
          {phase.charAt(0).toUpperCase() + phase.slice(1)} {getPhaseEmoji(phase)}
        </span>
      </div>
      {phase !== 'stable' && timeLeft && (
        <div className="text-sm text-purple-700">
          {timeLeft} left
        </div>
      )}
    </div>
  );
};

export default StatusBar;