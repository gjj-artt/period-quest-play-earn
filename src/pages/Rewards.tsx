
import React from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Award, Lightbulb, Lock, CheckCircle, Gift } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface UserRewards {
  coins: number;
  badges: string[];
  tips: string[];
}

const Rewards = () => {
  const { toast } = useToast();

  // Load rewards data from localStorage
  const [rewards, setRewards] = React.useState<UserRewards>(() => {
    const savedRewards = localStorage.getItem('periodQuestRewards');
    return savedRewards ? JSON.parse(savedRewards) : { coins: 0, badges: [], tips: [] };
  });

  // Available rewards to redeem
  const redeemableRewards = [
    {
      id: "special-avatar",
      name: "Special Avatar Frame",
      description: "An exclusive period warrior avatar frame for your profile",
      cost: 50,
      type: "cosmetic"
    },
    {
      id: "period-tracker",
      name: "Premium Period Tracker",
      description: "Unlock premium features in our period tracking tool",
      cost: 100,
      type: "feature"
    },
    {
      id: "wellness-guide",
      name: "Wellness Guide Ebook",
      description: "A comprehensive guide to period wellness",
      cost: 75,
      type: "content"
    },
    {
      id: "meditation-pack",
      name: "Period Meditation Pack",
      description: "Exclusive guided meditations for period comfort",
      cost: 60,
      type: "content"
    }
  ];

  // Redeem a reward
  const redeemReward = (rewardId: string, cost: number) => {
    if (rewards.coins < cost) {
      toast({
        title: "Not enough coins",
        description: `You need ${cost - rewards.coins} more coins to redeem this reward.`,
        variant: "destructive"
      });
      return;
    }

    // Update coins
    const updatedRewards = {
      ...rewards,
      coins: rewards.coins - cost
    };

    // Save to localStorage and state
    setRewards(updatedRewards);
    localStorage.setItem('periodQuestRewards', JSON.stringify(updatedRewards));

    toast({
      title: "Reward Redeemed!",
      description: `You've successfully redeemed ${rewardId}!`,
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Rewards</h1>
            <p className="text-gray-600">Track your achievements and redeem rewards</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Main content */}
            <div className="flex-grow">
              <Tabs defaultValue="badges">
                <TabsList className="mb-6">
                  <TabsTrigger value="badges">Badges</TabsTrigger>
                  <TabsTrigger value="redeem">Redeem Rewards</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="badges">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Show earned badges */}
                    {rewards.badges.map((badge, index) => (
                      <Card key={index} className="border-2 hover:shadow-md transition">
                        <CardHeader className="pb-2">
                          <div className="flex items-center gap-3">
                            <div className="p-3 rounded-full bg-quest-lightPurple text-quest-purple">
                              <Award className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-lg">{badge}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">
                            You earned this badge for your excellent performance!
                          </p>
                        </CardContent>
                        <CardFooter className="bg-quest-lightPink/20 flex justify-between">
                          <div className="flex items-center text-xs text-quest-pink">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Unlocked
                          </div>
                          <div className="text-xs text-gray-500">Keep up the great work!</div>
                        </CardFooter>
                      </Card>
                    ))}

                    {/* Placeholder badges */}
                    {rewards.badges.length === 0 && (
                      <div className="col-span-full text-center py-10">
                        <div className="mb-4 text-quest-purple opacity-50">
                          <Award size={48} className="mx-auto" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No Badges Yet</h3>
                        <p className="text-gray-500 mb-4">Play games to earn badges and showcase your achievements!</p>
                        <Button onClick={() => window.location.href = '/games'}>
                          Play Games
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="redeem">
                  <div className="mb-6 p-4 bg-gradient-quest/10 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">Available Balance</h3>
                        <p className="text-gray-600">Use your coins to redeem rewards</p>
                      </div>
                      <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                        <Trophy className="text-yellow-500 h-5 w-5" />
                        <span className="font-bold text-lg">{rewards.coins} Coins</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {redeemableRewards.map((reward) => (
                      <Card key={reward.id} className="border-2 hover:shadow-md transition">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-full bg-quest-lightPink text-quest-pink">
                                <Gift className="h-5 w-5" />
                              </div>
                              <CardTitle className="text-lg">{reward.name}</CardTitle>
                            </div>
                            <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                              <Trophy className="h-4 w-4" />
                              <span>{reward.cost}</span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{reward.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                          <Button
                            onClick={() => redeemReward(reward.id, reward.cost)}
                            className="w-full" 
                            variant={rewards.coins >= reward.cost ? "default" : "outline"}
                            disabled={rewards.coins < reward.cost}
                          >
                            {rewards.coins >= reward.cost ? 'Redeem Now' : (
                              <span className="flex items-center gap-2">
                                <Lock className="h-4 w-4" />
                                Need {reward.cost - rewards.coins} more coins
                              </span>
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <div className="text-center py-10">
                    <div className="mb-4 text-quest-purple opacity-50">
                      <Lightbulb size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Reward History Coming Soon</h3>
                    <p className="text-gray-500 mb-4">We're working on tracking your reward history!</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="md:w-72">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">How to Earn More</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-quest-lightPurple rounded-full text-quest-purple">
                      <Trophy className="h-5 w-5" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Play Games</p>
                      <p className="text-gray-500">Earn 5-15 coins per game</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-quest-lightPink rounded-full text-quest-pink">
                      <Award className="h-5 w-5" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Unlock Badges</p>
                      <p className="text-gray-500">Score over 80 points in games</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Daily Streaks</p>
                      <p className="text-gray-500">Coming soon: Earn bonus coins</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => window.location.href = '/games'} 
                    className="w-full bg-gradient-quest hover:opacity-90 transition"
                  >
                    Play Games Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rewards;
