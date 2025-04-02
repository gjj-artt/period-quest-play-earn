
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Award } from 'lucide-react';

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  rewards: string[];
  badgeName?: string;
  color?: string;
}

const GameCard = ({ id, title, description, icon, rewards, badgeName, color = "from-quest-pink to-quest-purple" }: GameCardProps) => {
  const navigate = useNavigate();
  
  const handlePlayNow = () => {
    navigate(`/game/${id}`);
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition duration-300 border-2 h-full flex flex-col">
      <div className={`bg-gradient-to-r ${color} h-2`}></div>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-quest-lightPurple text-quest-purple">
            {icon}
          </div>
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="bg-quest-lightPink/30 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2 text-sm font-medium text-quest-pink">
            <Trophy size={16} />
            <span>Rewards:</span>
          </div>
          <ul className="space-y-1 text-sm">
            {rewards.map((reward, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-quest-purple mt-1">•</span>
                <span>{reward}</span>
              </li>
            ))}
          </ul>
          {badgeName && (
            <div className="mt-3 flex items-center gap-2 text-sm">
              <Award size={16} className="text-quest-purple" />
              <span className="font-medium">Badge: <span className="text-quest-purple">{badgeName}</span></span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handlePlayNow} 
          className="w-full bg-gradient-quest hover:opacity-90 transition"
        >
          Play Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
