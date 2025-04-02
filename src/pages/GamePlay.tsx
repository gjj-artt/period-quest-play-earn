
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, Trophy, Heart, Lightbulb, Star, Calendar, ShoppingBag, Search, Smile, Gamepad, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface GameQuestion {
  question: string;
  options: { id: number; text: string; isCorrect: boolean }[];
  explanation?: string;
}

const GamePlay = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Game state
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  // Game options based on gameId
  const [gameData, setGameData] = useState<{
    title: string;
    description: string;
    questions: GameQuestion[];
    backgroundClass: string;
  }>({
    title: 'Loading Game...',
    description: 'Please wait...',
    questions: [],
    backgroundClass: 'bg-gradient-to-r from-quest-pink to-quest-purple bg-opacity-10'
  });
  
  // Load game data based on gameId
  useEffect(() => {
    // In a real app, this would come from an API
    const gameOptions = {
      'product-matchup': {
        title: 'Period Product Match-Up',
        description: 'Match period products to their ideal use cases',
        backgroundClass: 'bg-gradient-to-r from-quest-lightPink to-quest-pink bg-opacity-10',
        questions: [
          {
            question: 'When are overnight pads most appropriate to use?',
            options: [
              { id: 1, text: 'For overnight protection', isCorrect: true },
              { id: 2, text: 'For swimming', isCorrect: false },
              { id: 3, text: 'For light flow days', isCorrect: false },
              { id: 4, text: 'For heavy exercise', isCorrect: false }
            ],
            explanation: 'Overnight pads are designed to be more absorbent and longer to provide protection while sleeping.'
          },
          {
            question: 'Which period product is best for swimming?',
            options: [
              { id: 1, text: 'Regular pad', isCorrect: false },
              { id: 2, text: 'Menstrual cup', isCorrect: true },
              { id: 3, text: 'Panty liner', isCorrect: false },
              { id: 4, text: 'Period underwear', isCorrect: false }
            ],
            explanation: 'Menstrual cups are waterproof and can be worn while swimming without absorbing water.'
          },
          {
            question: 'When would period underwear be most useful?',
            options: [
              { id: 1, text: 'As backup protection', isCorrect: true },
              { id: 2, text: 'Instead of a tampon while swimming', isCorrect: false },
              { id: 3, text: 'For extremely heavy flow days only', isCorrect: false },
              { id: 4, text: 'Only during nighttime', isCorrect: false }
            ],
            explanation: 'Period underwear works great as backup protection or for light flow days.'
          },
          {
            question: 'Which product has the least environmental impact?',
            options: [
              { id: 1, text: 'Disposable pads', isCorrect: false },
              { id: 2, text: 'Tampons with applicators', isCorrect: false },
              { id: 3, text: 'Menstrual cups', isCorrect: true },
              { id: 4, text: 'Disposable panty liners', isCorrect: false }
            ],
            explanation: 'Reusable products like menstrual cups create less waste over time.'
          }
        ]
      },
      'myth-challenge': {
        title: 'Myth or Fact Challenge',
        description: 'Test your knowledge about periods',
        backgroundClass: 'bg-gradient-to-r from-quest-purple to-quest-blue bg-opacity-10',
        questions: [
          {
            question: '"You should avoid exercise during your period."',
            options: [
              { id: 1, text: 'Myth - This is incorrect', isCorrect: true },
              { id: 2, text: 'Fact - This is correct', isCorrect: false }
            ],
            explanation: 'Exercise can actually help reduce period symptoms like cramps and mood changes.'
          },
          {
            question: '"Taking a shower during your period is dangerous."',
            options: [
              { id: 1, text: 'Myth - This is incorrect', isCorrect: true },
              { id: 2, text: 'Fact - This is correct', isCorrect: false }
            ],
            explanation: 'Showering during your period is completely safe and can help you feel cleaner and more comfortable.'
          },
          {
            question: '"Period synchronization among friends is scientifically proven."',
            options: [
              { id: 1, text: 'Myth - This is incorrect', isCorrect: true },
              { id: 2, text: 'Fact - This is correct', isCorrect: false }
            ],
            explanation: 'Scientific studies have not found evidence supporting period synchronization.'
          },
          {
            question: '"Menstrual blood attracts sharks if you swim in the ocean."',
            options: [
              { id: 1, text: 'Myth - This is incorrect', isCorrect: true },
              { id: 2, text: 'Fact - This is correct', isCorrect: false }
            ],
            explanation: 'There is no evidence that menstrual blood attracts sharks more than any other bodily fluid.'
          },
          {
            question: '"Your first period typically starts between ages 10-15."',
            options: [
              { id: 1, text: 'Myth - This is incorrect', isCorrect: false },
              { id: 2, text: 'Fact - This is correct', isCorrect: true }
            ],
            explanation: 'The first period (menarche) typically starts between ages 10-15, though it can vary.'
          }
        ]
      },
      'care-adventure': {
        title: 'Period Care Adventure',
        description: 'Navigate real-life period scenarios',
        backgroundClass: 'bg-gradient-to-r from-quest-pink to-quest-purple bg-opacity-10',
        questions: [
          {
            question: 'You have period cramps. What is a good first step?',
            options: [
              { id: 1, text: 'Take a pain reliever', isCorrect: true },
              { id: 2, text: 'Ignore the pain', isCorrect: false },
              { id: 3, text: 'Skip school/work', isCorrect: false },
              { id: 4, text: 'Eat lots of sugar', isCorrect: false }
            ],
            explanation: 'Pain relievers like ibuprofen can help reduce cramps and inflammation.'
          },
          {
            question: 'You notice your period is heavier than usual. What should you do?',
            options: [
              { id: 1, text: 'Panic and assume something is wrong', isCorrect: false },
              { id: 2, text: 'Ignore it completely', isCorrect: false },
              { id: 3, text: 'Monitor changes and consult a healthcare provider if it continues', isCorrect: true },
              { id: 4, text: 'Take more pain medication', isCorrect: false }
            ],
            explanation: 'While some variation is normal, consistently heavy periods should be discussed with a healthcare provider.'
          },
          {
            question: 'What helps with period bloating?',
            options: [
              { id: 1, text: 'Eating salty foods', isCorrect: false },
              { id: 2, text: 'Drinking less water', isCorrect: false },
              { id: 3, text: 'Light exercise and staying hydrated', isCorrect: true },
              { id: 4, text: 'Wearing tight clothing', isCorrect: false }
            ],
            explanation: 'Staying hydrated and light exercise can help reduce bloating during your period.'
          },
          {
            question: 'You got your period unexpectedly at school. What's a good approach?',
            options: [
              { id: 1, text: 'Go home immediately', isCorrect: false },
              { id: 2, text: 'Ask a friend, teacher, or school nurse for help', isCorrect: true },
              { id: 3, text: 'Hide in the bathroom until school ends', isCorrect: false },
              { id: 4, text: 'Use toilet paper and ignore it', isCorrect: false }
            ],
            explanation: 'Most schools have period products available through the nurse or counselor.'
          }
        ]
      },
      'mood-tracker': {
        title: 'Mood Tracker Bingo',
        description: 'Track your moods during your cycle',
        backgroundClass: 'bg-gradient-to-r from-quest-lightPink to-quest-pink bg-opacity-10',
        questions: [
          {
            question: 'Select the mood you are feeling today:',
            options: [
              { id: 1, text: 'Happy', isCorrect: true },
              { id: 2, text: 'Irritable', isCorrect: true },
              { id: 3, text: 'Tired', isCorrect: true },
              { id: 4, text: 'Energetic', isCorrect: true }
            ],
            explanation: 'Tracking your mood can help you understand patterns in how you feel throughout your cycle.'
          },
          {
            question: 'Which physical symptom are you experiencing today?',
            options: [
              { id: 1, text: 'Cramps', isCorrect: true },
              { id: 2, text: 'Headache', isCorrect: true },
              { id: 3, text: 'Breast tenderness', isCorrect: true },
              { id: 4, text: 'No symptoms', isCorrect: true }
            ],
            explanation: 'Physical symptoms can vary throughout your cycle and from person to person.'
          },
          {
            question: 'How is your energy level today?',
            options: [
              { id: 1, text: 'High energy', isCorrect: true },
              { id: 2, text: 'Moderate energy', isCorrect: true },
              { id: 3, text: 'Low energy', isCorrect: true },
              { id: 4, text: 'Very tired', isCorrect: true }
            ],
            explanation: 'Energy levels often fluctuate throughout your menstrual cycle.'
          },
          {
            question: 'Which self-care activity would you like to do today?',
            options: [
              { id: 1, text: 'Read a book', isCorrect: true },
              { id: 2, text: 'Take a warm bath', isCorrect: true },
              { id: 3, text: 'Go for a walk', isCorrect: true },
              { id: 4, text: 'Watch a movie', isCorrect: true }
            ],
            explanation: 'Self-care is important throughout your cycle, especially during your period.'
          }
        ]
      },
      'preparedness': {
        title: 'Period Preparedness Quiz',
        description: 'Pack the ultimate emergency period kit',
        backgroundClass: 'bg-gradient-to-r from-quest-lightPurple to-quest-purple bg-opacity-10',
        questions: [
          {
            question: 'Which items should be in a period emergency kit?',
            options: [
              { id: 1, text: 'Pads/Tampons', isCorrect: true },
              { id: 2, text: 'Pain reliever', isCorrect: true },
              { id: 3, text: 'Change of underwear', isCorrect: true },
              { id: 4, text: 'Heavy sweater', isCorrect: false }
            ],
            explanation: 'A basic period kit should include period products, pain relief, and backup underwear.'
          },
          {
            question: 'Where should you store an emergency period kit?',
            options: [
              { id: 1, text: 'Only at home', isCorrect: false },
              { id: 2, text: 'In your backpack or purse', isCorrect: true },
              { id: 3, text: 'Only in your school locker', isCorrect: false },
              { id: 4, text: 'In your friend\'s bag', isCorrect: false }
            ],
            explanation: 'Keeping supplies in your bag ensures you have them wherever you go.'
          },
          {
            question: 'How many extra period products should you pack for a day out?',
            options: [
              { id: 1, text: 'Just one', isCorrect: false },
              { id: 2, text: 'At least 2-3 more than you think you need', isCorrect: true },
              { id: 3, text: 'None, you can buy them later', isCorrect: false },
              { id: 4, text: 'Exactly one for each hour', isCorrect: false }
            ],
            explanation: 'It\'s always better to have extra products than to run out unexpectedly.'
          },
          {
            question: 'Which is NOT necessary in a basic period kit?',
            options: [
              { id: 1, text: 'Hand sanitizer', isCorrect: false },
              { id: 2, text: 'Period products', isCorrect: false },
              { id: 3, text: 'Chocolate bars', isCorrect: true },
              { id: 4, text: 'Pain relievers', isCorrect: false }
            ],
            explanation: 'While chocolate might be nice, it\'s not an essential component of a period emergency kit.'
          }
        ]
      },
      'cycle-simulator': {
        title: 'Super Cycle Simulator',
        description: 'Manage your period, energy and tasks',
        backgroundClass: 'bg-gradient-to-r from-blue-400 to-blue-600 bg-opacity-10',
        questions: [
          {
            question: 'During the first days of your period, it\'s best to:',
            options: [
              { id: 1, text: 'Rest and recover', isCorrect: true },
              { id: 2, text: 'Push through intense workouts', isCorrect: false },
              { id: 3, text: 'Schedule important meetings', isCorrect: false },
              { id: 4, text: 'Stay hydrated', isCorrect: true }
            ],
            explanation: 'The first few days of your period may come with more fatigue, so rest is important.'
          },
          {
            question: 'During which phase of your cycle might you experience the most energy?',
            options: [
              { id: 1, text: 'During your period', isCorrect: false },
              { id: 2, text: 'Right after your period ends', isCorrect: true },
              { id: 3, text: 'The day before your period', isCorrect: false },
              { id: 4, text: 'It\'s the same throughout', isCorrect: false }
            ],
            explanation: 'Many people experience increased energy in the follicular phase (after period ends).'
          },
          {
            question: 'Which activities are best during PMS days?',
            options: [
              { id: 1, text: 'High-stress tasks and deadlines', isCorrect: false },
              { id: 2, text: 'Gentle exercise and self-care', isCorrect: true },
              { id: 3, text: 'Caffeine and sugar consumption', isCorrect: false },
              { id: 4, text: 'Starting new challenging projects', isCorrect: false }
            ],
            explanation: 'During PMS, gentle activities and self-care can help manage symptoms.'
          },
          {
            question: 'What might help with focus during hormonal changes?',
            options: [
              { id: 1, text: 'Breaking tasks into smaller steps', isCorrect: true },
              { id: 2, text: 'Multitasking more than usual', isCorrect: false },
              { id: 3, text: 'Skipping breaks entirely', isCorrect: false },
              { id: 4, text: 'Only working late at night', isCorrect: false }
            ],
            explanation: 'When hormones affect concentration, breaking tasks down can help maintain productivity.'
          }
        ]
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
    setTimeLeft(45);
    setCurrentQuestionIndex(0);
    setGameCompleted(false);
    setSelectedOption(null);
    setShowExplanation(false);
  };
  
  // Handle selecting an option
  const handleOptionSelect = (optionId: number, isCorrect: boolean) => {
    if (!isPlaying || gameCompleted || selectedOption !== null) return;
    
    setSelectedOption(optionId);
    
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
        description: "Review the explanation to learn!",
        variant: "destructive",
      });
    }
    
    // Show explanation for 2 seconds
    setShowExplanation(true);
    setTimeout(() => {
      setShowExplanation(false);
      setSelectedOption(null);
      
      // Move to next question or end game
      if (currentQuestionIndex < gameData.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        endGame();
      }
    }, 2000);
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

  // Get the current question
  const currentQuestion = isPlaying && gameData.questions.length > 0 
    ? gameData.questions[currentQuestionIndex] 
    : null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className={`flex-grow py-8 ${gameData.backgroundClass} bg-opacity-5`}>
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
            <h1 className="text-3xl font-bold mb-2 text-gradient-pink">{gameData.title}</h1>
            <p className="text-gray-600">{gameData.description}</p>
          </div>
          
          <Card className="p-6 mb-8 bg-white/80 backdrop-blur-sm border-2 border-quest-lightPurple/20 shadow-lg">
            {!isPlaying && !gameCompleted ? (
              <div className="text-center py-10">
                <div className="w-24 h-24 bg-quest-lightPurple rounded-full flex items-center justify-center mx-auto mb-6">
                  {gameId === 'product-matchup' && <ShoppingBag size={48} className="text-quest-purple" />}
                  {gameId === 'myth-challenge' && <Search size={48} className="text-quest-purple" />}
                  {gameId === 'care-adventure' && <Heart size={48} className="text-quest-purple" />}
                  {gameId === 'mood-tracker' && <Smile size={48} className="text-quest-purple" />}
                  {gameId === 'preparedness' && <ShoppingBag size={48} className="text-quest-purple" />}
                  {gameId === 'cycle-simulator' && <Calendar size={48} className="text-quest-purple" />}
                  {!gameId && <Gamepad size={48} className="text-quest-purple" />}
                </div>
                <h2 className="text-3xl font-bold mb-4 text-quest-purple">Ready to Play?</h2>
                <p className="mb-6 text-lg">Test your period knowledge and earn rewards!</p>
                <p className="mb-8 text-gray-600">Answer {gameData.questions.length} questions before time runs out!</p>
                <Button 
                  onClick={startGame}
                  size="lg" 
                  className="bg-gradient-quest hover:opacity-90 transition px-8 py-6 text-lg"
                >
                  Start Game
                </Button>
              </div>
            ) : isPlaying ? (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Score:</span>
                    <span className="ml-2 font-bold">{score}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-1">Question:</span>
                    <span className="font-medium">{currentQuestionIndex + 1}/{gameData.questions.length}</span>
                    <span className="mx-3 text-gray-300">|</span>
                    <span className="text-sm text-gray-500">Time Left:</span>
                    <span className={`ml-2 font-bold ${timeLeft < 10 ? 'text-red-500' : ''}`}>
                      {timeLeft}s
                    </span>
                  </div>
                </div>
                
                <Progress value={(timeLeft / 45) * 100} className="h-2 mb-6" />
                
                {currentQuestion && (
                  <div className="mb-6">
                    <div className="bg-quest-lightPurple/30 p-5 rounded-lg mb-6">
                      <h3 className="text-xl font-bold mb-1 flex items-start gap-2">
                        <Lightbulb className="text-quest-purple mt-1 flex-shrink-0" size={20} />
                        <span>{currentQuestion.question}</span>
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentQuestion.options.map(option => (
                        <Button
                          key={option.id}
                          variant={selectedOption === option.id 
                            ? (option.isCorrect ? "default" : "destructive") 
                            : "outline"}
                          className={`p-4 h-auto text-left justify-start transition-all ${
                            selectedOption === option.id && option.isCorrect 
                              ? "bg-green-500 text-white hover:bg-green-600" 
                              : ""
                          } ${
                            selectedOption !== null && option.isCorrect 
                              ? "border-green-500 border-2" 
                              : ""
                          }`}
                          onClick={() => handleOptionSelect(option.id, option.isCorrect)}
                          disabled={selectedOption !== null}
                        >
                          {option.text}
                        </Button>
                      ))}
                    </div>
                    
                    {showExplanation && currentQuestion.explanation && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100 animate-fade-in">
                        <div className="flex items-start gap-2">
                          <Star size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                          <p className="text-blue-800">{currentQuestion.explanation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10 animate-fade-in">
                <div className="mb-6 text-quest-purple">
                  <Trophy size={64} className="mx-auto" />
                </div>
                <h2 className="text-3xl font-bold mb-2 text-gradient-pink">Game Completed!</h2>
                <p className="mb-2 text-lg">Your Score: <span className="font-bold text-2xl text-quest-purple">{score}</span></p>
                <div className="w-full max-w-xs mx-auto mb-6">
                  <Progress value={score} className="h-4 rounded-full" />
                </div>
                <p className="text-gray-600 mb-6">
                  Great job! You've earned points and rewards for your knowledge.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row justify-center">
                  <Button 
                    variant="outline"
                    className="border-quest-purple text-quest-purple hover:bg-quest-lightPurple/20" 
                    onClick={() => navigate('/rewards')}
                  >
                    <Award className="mr-2" size={18} />
                    View Rewards
                  </Button>
                  <Button 
                    onClick={startGame}
                    className="bg-gradient-quest hover:opacity-90 transition"
                  >
                    <Gamepad className="mr-2" size={18} />
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
