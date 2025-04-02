
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const GamePlay = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Game state
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  
  // Game options based on gameId
  const [gameData, setGameData] = useState<{
    title: string;
    description: string;
    options: { id: number; text: string; isCorrect: boolean }[];
    question: string;
  }>({
    title: 'Loading Game...',
    description: 'Please wait...',
    options: [],
    question: ''
  });
  
  // Load game data based on gameId
  useEffect(() => {
    // In a real app, this would come from an API
    const gameOptions = {
      'product-matchup': {
        title: 'Period Product Match-Up',
        description: 'Match period products to their ideal use cases',
        options: [
          { id: 1, text: 'For overnight protection', isCorrect: true },
          { id: 2, text: 'For swimming', isCorrect: false },
          { id: 3, text: 'For light flow days', isCorrect: false },
          { id: 4, text: 'For heavy exercise', isCorrect: false }
        ],
        question: 'When are overnight pads most appropriate to use?'
      },
      'myth-challenge': {
        title: 'Myth or Fact Challenge',
        description: 'Test your knowledge about periods',
        options: [
          { id: 1, text: 'Myth - This is incorrect', isCorrect: true },
          { id: 2, text: 'Fact - This is correct', isCorrect: false }
        ],
        question: 'You should avoid exercise during your period.'
      },
      'care-adventure': {
        title: 'Period Care Adventure',
        description: 'Navigate real-life period scenarios',
        options: [
          { id: 1, text: 'Take a pain reliever', isCorrect: true },
          { id: 2, text: 'Ignore the pain', isCorrect: false },
          { id: 3, text: 'Skip school/work', isCorrect: false },
          { id: 4, text: 'Eat lots of sugar', isCorrect: false }
        ],
        question: 'You have period cramps. What is a good first step?'
      },
      'mood-tracker': {
        title: 'Mood Tracker Bingo',
        description: 'Track your moods during your cycle',
        options: [
          { id: 1, text: 'Happy', isCorrect: true },
          { id: 2, text: 'Irritable', isCorrect: true },
          { id: 3, text: 'Tired', isCorrect: true },
          { id: 4, text: 'Energetic', isCorrect: true }
        ],
        question: 'Select the mood you are feeling today:'
      },
      'preparedness': {
        title: 'Period Preparedness Quiz',
        description: 'Pack the ultimate emergency period kit',
        options: [
          { id: 1, text: 'Pads/Tampons', isCorrect: true },
          { id: 2, text: 'Pain reliever', isCorrect: true },
          { id: 3, text: 'Change of underwear', isCorrect: true },
          { id: 4, text: 'Heavy sweater', isCorrect: false }
        ],
        question: 'Which items should be in a period emergency kit?'
      },
      'cycle-simulator': {
        title: 'Super Cycle Simulator',
        description: 'Manage your period, energy and tasks',
        options: [
          { id: 1, text: 'Rest and recover', isCorrect: true },
          { id: 2, text: 'Push through intense workouts', isCorrect: false },
          { id: 3, text: 'Schedule important meetings', isCorrect: false },
          { id: 4, text: 'Stay hydrated', isCorrect: true }
        ],
        question: 'During the first days of your period, it\'s best to:'
      }
    };
    
    // Set game data based on gameId
    if (gameId && gameId in gameOptions) {
      setGameData(gameOptions[gameId as keyof typeof gameOptions]);
    } else {
      // Default game if ID not found
      setGameData(gameOptions['product-matchup']);
    }
  }, [gameId]);
  
  // Start game timer
  useEffect(() => {
    let timer: number | undefined;
    
    if (isPlaying && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      // Time's up
      endGame();
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, timeLeft]);
  
  // Start the game
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    setGameCompleted(false);
  };
  
  // Handle selecting an option
  const handleOptionSelect = (isCorrect: boolean) => {
    if (!isPlaying || gameCompleted) return;
    
    if (isCorrect) {
      // Add points if correct
      setScore((prev) => prev + 10);
      toast({
        title: "Correct!",
        description: "You gained 10 points!",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Try again!",
        variant: "destructive",
      });
    }
    
    // End the game if score reached 100 or special cases
    if (score >= 90 || gameId === 'mood-tracker') {
      endGame();
    }
  };
  
  // End the game and save results
  const endGame = () => {
    setIsPlaying(false);
    setGameCompleted(true);
    
    // Save progress to localStorage
    const finalScore = score + (gameId === 'mood-tracker' ? 100 : 0); // Mood tracker always gives full score
    
    // Calculate rewards
    const coinsEarned = Math.floor(finalScore / 10) + 5;
    
    // Get existing data from localStorage
    const savedProgress = localStorage.getItem('periodQuestProgress');
    const savedRewards = localStorage.getItem('periodQuestRewards');
    
    const userProgress = savedProgress ? JSON.parse(savedProgress) : [];
    const userRewards = savedRewards ? JSON.parse(savedRewards) : { coins: 0, badges: [], tips: [] };
    
    // Update progress
    const gameIndex = userProgress.findIndex((game: {gameId: string}) => game.gameId === gameId);
    const updatedProgress = [...userProgress];
    
    if (gameIndex >= 0) {
      updatedProgress[gameIndex] = {
        ...updatedProgress[gameIndex],
        score: Math.max(updatedProgress[gameIndex].score, finalScore),
        lastPlayed: new Date().toISOString(),
        completed: true
      };
    } else {
      updatedProgress.push({
        gameId,
        score: finalScore,
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
    if (finalScore > 80) {
      const badgeName = `${gameData.title} Master`;
      if (!updatedRewards.badges.includes(badgeName)) {
        updatedRewards.badges = [...updatedRewards.badges, badgeName];
        
        toast({
          title: "New Badge Unlocked!",
          description: `You've earned the "${badgeName}" badge!`,
          duration: 5000,
        });
      }
    }
    
    // Save updated data to localStorage
    localStorage.setItem('periodQuestProgress', JSON.stringify(updatedProgress));
    localStorage.setItem('periodQuestRewards', JSON.stringify(updatedRewards));
    
    // Show completion toast
    toast({
      title: "Game Completed!",
      description: `You scored ${finalScore} points and earned ${coinsEarned} coins!`,
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <Button 
            variant="outline" 
            className="mb-6 flex items-center gap-2"
            onClick={() => navigate('/games')}
          >
            <ArrowLeft size={16} />
            Back to Games
          </Button>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{gameData.title}</h1>
            <p className="text-gray-600">{gameData.description}</p>
          </div>
          
          <Card className="p-6 mb-8">
            {!isPlaying && !gameCompleted ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Ready to Play?</h2>
                <p className="mb-6">Test your period knowledge and earn rewards!</p>
                <Button 
                  onClick={startGame}
                  size="lg" 
                  className="bg-gradient-quest hover:opacity-90 transition"
                >
                  Start Game
                </Button>
              </div>
            ) : isPlaying ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Score:</span>
                    <span className="ml-2 font-bold">{score}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Time Left:</span>
                    <span className={`ml-2 font-bold ${timeLeft < 10 ? 'text-red-500' : ''}`}>
                      {timeLeft}s
                    </span>
                  </div>
                </div>
                
                <Progress value={(timeLeft / 30) * 100} className="h-2 mb-6" />
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4">{gameData.question}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {gameData.options.map(option => (
                      <Button
                        key={option.id}
                        variant="outline"
                        className="p-4 h-auto text-left justify-start"
                        onClick={() => handleOptionSelect(option.isCorrect)}
                      >
                        {option.text}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-6 text-quest-purple">
                  <Trophy size={64} className="mx-auto" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Game Completed!</h2>
                <p className="mb-2">Your Score: <span className="font-bold text-xl">{score}</span></p>
                <p className="text-gray-600 mb-6">
                  Great job! You've earned points and rewards for your knowledge.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/rewards')}
                  >
                    View Rewards
                  </Button>
                  <Button 
                    onClick={startGame}
                    className="bg-gradient-quest hover:opacity-90 transition"
                  >
                    Play Again
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GamePlay;
