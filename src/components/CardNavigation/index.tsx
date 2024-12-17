import React from 'react';
import { Check, X } from 'lucide-react';

interface CardNavigationProps {
  onNext: () => void;
}

const CardNavigation: React.FC<CardNavigationProps> = ({ onNext }) => {
  return (
    <div className="flex justify-center gap-8 mt-6">
      <button
        onClick={onNext}
        className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
      >
        <X className="w-8 h-8 text-white" />
      </button>
      <button
        onClick={onNext}
        className="w-16 h-16 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-colors"
      >
        <Check className="w-8 h-8 text-white" />
      </button>
    </div>
  );
};

export default CardNavigation;