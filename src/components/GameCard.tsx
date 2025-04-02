
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Award, Gamepad, Heart, Star, Gift } from 'lucide-react';

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
    <Card className="overflow-hidden hover:shadow-xl transition duration-300 border-2 h-full flex flex-col transform hover:scale-[1.02] hover:border-quest-purple/30">
      <div className={`bg-gradient-to-r ${color} h-2`}></div>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-quest-lightPurple text-quest-purple">
            {icon}
          </div>
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="bg-quest-lightPink/30 rounded-lg p-4 border border-quest-lightPink/20">
          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-quest-pink">
            <Gift size={18} className="text-quest-pink" />
            <span className="font-bold">Rewards:</span>
          </div>
          <ul className="space-y-2 text-sm">
            {rewards.map((reward, index) => (
              <li key={index} className="flex items-start gap-2 p-1 hover:bg-white/50 rounded-md transition-colors">
                <span>
                  {index === 0 ? <Trophy size={16} className="text-yellow-500 mt-1" /> : 
                   index === 1 ? <Award size={16} className="text-quest-purple mt-1" /> :
                   <Star size={16} className="text-blue-500 mt-1" />}
                </span>
                <span>{reward}</span>
              </li>
            ))}
          </ul>
          {badgeName && (
            <div className="mt-3 flex items-center gap-2 text-sm p-2 bg-white/50 rounded-md">
              <Award size={18} className="text-quest-purple" />
              <span className="font-medium">Badge: <span className="text-quest-purple font-bold">{badgeName}</span></span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handlePlayNow} 
          className="w-full bg-gradient-quest hover:opacity-90 transition flex items-center gap-2 py-5"
        >
          <Gamepad size={18} />
          Play Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
