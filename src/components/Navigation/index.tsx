import React from 'react';
import { Trophy, Flame, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: 'leaderboard', icon: Trophy },
    { id: 'discover', icon: Flame },
    { id: 'profile', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-around items-center">
          {tabs.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={classNames(
                "p-4 rounded-lg transition-colors",
                activeTab === id ? "bg-purple-100" : "hover:bg-gray-50"
              )}
            >
              <Icon 
                className={classNames(
                  "w-6 h-6",
                  activeTab === id ? "text-purple-600" : "text-gray-500"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;