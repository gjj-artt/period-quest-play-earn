
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Coins, Award, Star } from 'lucide-react';

interface RewardItemProps {
  type: 'coin' | 'badge' | 'tip';
  name: string;
  description: string;
  value?: number;
  locked?: boolean;
}

const RewardItem = ({ type, name, description, value, locked = true }: RewardItemProps) => {
  const getIcon = () => {
    switch (type) {
      case 'coin':
        return <Coins className="h-5 w-5 text-yellow-500" />;
      case 'badge':
        return <Award className="h-5 w-5 text-quest-purple" />;
      case 'tip':
        return <Star className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'coin':
        return 'bg-yellow-100';
      case 'badge':
        return 'bg-quest-lightPurple';
      case 'tip':
        return 'bg-blue-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className={`border rounded-lg overflow-hidden ${locked ? 'opacity-60' : ''}`}>
      <div className="flex items-center gap-3 p-4">
        <div className={`p-3 rounded-full ${getBgColor()}`}>
          {getIcon()}
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <h4 className="font-bold">{name}</h4>
            {type === 'coin' && value !== undefined && (
              <div className="flex items-center gap-1 text-yellow-500 font-medium">
                <Coins className="h-4 w-4" />
                <span>{value}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>
      <div className="px-4 py-2 bg-gray-50 border-t flex justify-between items-center">
        <Badge variant={locked ? "outline" : "default"} className={locked ? "" : "bg-gradient-quest"}>
          {locked ? "Locked" : "Unlocked"}
        </Badge>
        
        {locked ? (
          <span className="text-sm text-gray-500">Complete games to unlock</span>
        ) : (
          <span className="text-sm text-green-500">Available to use</span>
        )}
      </div>
    </div>
  );
};

export default RewardItem;
