
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingBag, Heart, Search, Smile, Calendar, Gamepad, Trophy } from 'lucide-react';

// Define the user progress and rewards types
interface GameProgress {
  gameId: string;
  completed: boolean;
  score: number;
  lastPlayed: string;
}

interface UserRewards {
  coins: number;
  badges: string[];
  tips: string[];
}

const Games = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Initialize user data from localStorage or set defaults
  const [userProgress, setUserProgress] = React.useState<GameProgress[]>(() => {
    const savedProgress = localStorage.getItem('periodQuestProgress');
    return savedProgress ? JSON.parse(savedProgress) : [];
  });
  
  const [userRewards, setUserRewards] = React.useState<UserRewards>(() => {
    const savedRewards = localStorage.getItem('periodQuestRewards');
    return savedRewards ? JSON.parse(savedRewards) : { coins: 0, badges: [], tips: [] };
  });

  // Function to play a game and update progress/rewards
  const playGame = (gameId: string, gameName: string) => {
    // Simulate completing a game with a random score
    const score = Math.floor(Math.random() * 100) + 1;
    const coinsEarned = Math.floor(score / 10) + 5;
    
    // Update progress
    const gameIndex = userProgress.findIndex(game => game.gameId === gameId);
    const updatedProgress = [...userProgress];
    
    if (gameIndex >= 0) {
      updatedProgress[gameIndex] = {
        ...updatedProgress[gameIndex],
        score: Math.max(updatedProgress[gameIndex].score, score),
        lastPlayed: new Date().toISOString(),
        completed: true
      };
    } else {
      updatedProgress.push({
        gameId,
        score,
        completed: true,
        lastPlayed: new Date().toISOString()
      });
    }
    
    // Update rewards
    const updatedRewards = {
      ...userRewards,
      coins: userRewards.coins + coinsEarned
    };
    
    // Add a badge if score is high enough and user doesn't already have it
    if (score > 80) {
      const badgeName = `${gameName} Master`;
      if (!updatedRewards.badges.includes(badgeName)) {
        updatedRewards.badges = [...updatedRewards.badges, badgeName];
        
        toast({
          title: "New Badge Unlocked!",
          description: `You've earned the "${badgeName}" badge!`,
          duration: 5000,
        });
      }
    }
    
    // Save to state and localStorage
    setUserProgress(updatedProgress);
    setUserRewards(updatedRewards);
    localStorage.setItem('periodQuestProgress', JSON.stringify(updatedProgress));
    localStorage.setItem('periodQuestRewards', JSON.stringify(updatedRewards));
    
    // Show toast notification
    toast({
      title: "Game Completed!",
      description: `You scored ${score} points and earned ${coinsEarned} coins!`,
      duration: 3000,
    });
  };

  // Get progress for a specific game
  const getGameProgress = (gameId: string) => {
    return userProgress.find(game => game.gameId === gameId) || { gameId, completed: false, score: 0, lastPlayed: '' };
  };
  
  // Games data
  const games = [
    {
      id: "product-matchup",
      name: "Period Product Match-Up",
      description: "Match period products (pads, tampons, cups) to their ideal use cases in this relaxing ASMR game.",
      icon: <ShoppingBag className="h-5 w-5" />,
      color: "from-quest-pink to-quest-purple"
    },
    {
      id: "myth-challenge",
      name: "Myth or Fact Challenge",
      description: "Test your knowledge about periods with a fun myth vs. fact trivia game with soothing sounds.",
      icon: <Search className="h-5 w-5" />,
      color: "from-quest-purple to-quest-blue"
    },
    {
      id: "care-adventure",
      name: "Period Care Adventure",
      description: "Navigate real-life period scenarios and make decisions for the best care options.",
      icon: <Heart className="h-5 w-5" />,
      color: "from-quest-pink to-quest-purple"
    },
    {
      id: "mood-tracker",
      name: "Mood Tracker Bingo",
      description: "Log your mood and symptoms in a bingo-style mood tracker.",
      icon: <Smile className="h-5 w-5" />,
      color: "from-quest-lightPink to-quest-pink"
    },
    {
      id: "preparedness",
      name: "Period Preparedness Quiz",
      description: "Pack the ultimate emergency period kit in this timed game.",
      icon: <ShoppingBag className="h-5 w-5" />,
      color: "from-quest-lightPurple to-quest-purple"
    },
    {
      id: "cycle-simulator",
      name: "Super Cycle Simulator",
      description: "Manage your period, energy, cravings, and tasks in this fun simulation.",
      icon: <Calendar className="h-5 w-5" />,
      color: "from-blue-400 to-blue-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Period Quest Games</h1>
            <p className="text-gray-600">Play fun, educational games and earn rewards!</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Games Section */}
            <div className="flex-grow">
              <Tabs defaultValue="all-games">
                <TabsList className="mb-6">
                  <TabsTrigger value="all-games">All Games</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all-games" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.map((game) => {
                      const progress = getGameProgress(game.id);
                      return (
                        <Card key={game.id} className="overflow-hidden hover:shadow-lg transition duration-300 border-2 h-full flex flex-col">
                          <div className={`bg-gradient-to-r ${game.color} h-2`}></div>
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-full bg-quest-lightPurple text-quest-purple">
                                {game.icon}
                              </div>
                              <CardTitle className="text-lg font-bold">{game.name}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2 flex-grow">
                            <CardDescription className="mb-4">{game.description}</CardDescription>
                            
                            {progress.completed && (
                              <div className="mb-2">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Best Score:</span>
                                  <span className="font-medium">{progress.score}/100</span>
                                </div>
                                <Progress value={progress.score} className="h-2" />
                              </div>
                            )}
                          </CardContent>
                          <CardFooter>
                            <Button 
                              onClick={() => playGame(game.id, game.name)}
                              className="w-full bg-gradient-quest hover:opacity-90 transition"
                            >
                              {progress.completed ? 'Play Again' : 'Play Now'}
                            </Button>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
                
                <TabsContent value="completed">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.filter(game => 
                      getGameProgress(game.id).completed
                    ).map((game) => {
                      const progress = getGameProgress(game.id);
                      return (
                        <Card key={game.id} className="overflow-hidden hover:shadow-lg transition duration-300 border-2">
                          <div className={`bg-gradient-to-r ${game.color} h-2`}></div>
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-full bg-quest-lightPurple text-quest-purple">
                                {game.icon}
                              </div>
                              <CardTitle className="text-lg font-bold">{game.name}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="mb-2">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Best Score:</span>
                                <span className="font-medium">{progress.score}/100</span>
                              </div>
                              <Progress value={progress.score} className="h-2" />
                            </div>
                            <div className="text-xs text-gray-500">
                              Last played: {new Date(progress.lastPlayed).toLocaleDateString()}
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              onClick={() => playGame(game.id, game.name)}
                              className="w-full bg-gradient-quest hover:opacity-90 transition"
                            >
                              Play Again
                            </Button>
                          </CardFooter>
                        </Card>
                      );
                    })}
                    
                    {userProgress.length === 0 && (
                      <div className="col-span-full text-center py-10">
                        <div className="mb-4 text-quest-purple opacity-50">
                          <Gamepad size={48} className="mx-auto" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No Completed Games Yet</h3>
                        <p className="text-gray-500 mb-4">Play some games to see your progress here!</p>
                        <Button onClick={() => document.querySelector('[value="all-games"]')?.click()}>
                          Browse All Games
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="popular">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.slice(0, 3).map((game) => {
                      const progress = getGameProgress(game.id);
                      return (
                        <Card key={game.id} className="overflow-hidden hover:shadow-lg transition duration-300 border-2">
                          <div className={`bg-gradient-to-r ${game.color} h-2`}></div>
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-full bg-quest-lightPurple text-quest-purple">
                                {game.icon}
                              </div>
                              <CardTitle className="text-lg font-bold">{game.name}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <CardDescription className="mb-4">{game.description}</CardDescription>
                            <div className="flex items-center gap-2 text-sm text-quest-purple">
                              <Trophy size={16} />
                              <span>Popular choice!</span>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <Button 
                              onClick={() => playGame(game.id, game.name)}
                              className="w-full bg-gradient-quest hover:opacity-90 transition"
                            >
                              {progress.completed ? 'Play Again' : 'Play Now'}
                            </Button>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Rewards Sidebar */}
            <div className="md:w-72">
              <Card className="sticky top-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Your Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-yellow-100 text-yellow-500">
                        <Trophy size={16} />
                      </div>
                      <span>Confidence Coins</span>
                    </div>
                    <span className="font-bold text-lg">{userRewards.coins}</span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="mb-2 font-medium">Badges ({userRewards.badges.length})</div>
                    {userRewards.badges.length > 0 ? (
                      <div className="space-y-2">
                        {userRewards.badges.map((badge, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Award size={16} className="text-quest-purple" />
                            <span>{badge}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">
                        Play games to earn badges!
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => navigate('/rewards')}
                  >
                    View All Rewards
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Games;
