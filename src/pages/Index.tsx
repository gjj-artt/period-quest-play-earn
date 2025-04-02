
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import GameCard from '@/components/GameCard';
import RewardItem from '@/components/RewardItem';
import { Button } from '@/components/ui/button';
import { ChevronRight, ShoppingBag, Heart, Award, Gamepad, Search, Calendar, Smile } from 'lucide-react';

const Index = () => {
  const featuredGames = [
    {
      title: 'Period Product Match-Up',
      description: 'Match period products (pads, tampons, cups) to their ideal use cases in this relaxing ASMR game.',
      icon: <ShoppingBag className="h-5 w-5" />,
      rewards: ['Unlock "Period Pro" badge', 'Gain exclusive content', '100 Confidence Coins'],
      badgeName: 'Period Pro'
    },
    {
      title: 'Myth or Fact Challenge',
      description: 'Test your knowledge about periods with a fun myth vs. fact trivia game with soothing sounds.',
      icon: <Search className="h-5 w-5" />,
      rewards: ['Earn "Myth Buster" badge', 'Knowledge points', 'Exclusive health tips'],
      badgeName: 'Myth Buster',
      color: 'from-quest-purple to-quest-blue'
    },
    {
      title: 'Period Care Adventure',
      description: 'Navigate real-life period scenarios and make decisions for the best care options.',
      icon: <Heart className="h-5 w-5" />,
      rewards: ['Collect Confidence Coins', 'Unlock avatar accessories', 'Self-care checklists'],
      badgeName: 'Care Expert',
      color: 'from-quest-pink to-quest-purple'
    }
  ];
  
  const popularRewards = [
    {
      type: 'badge' as const,
      name: 'Period Pro Badge',
      description: 'Show off your period knowledge expertise',
      locked: false
    },
    {
      type: 'coin' as const,
      name: 'Confidence Coins',
      description: 'Currency to redeem for virtual items and resources',
      value: 250,
      locked: false
    },
    {
      type: 'tip' as const,
      name: 'Exclusive Health Tips',
      description: 'Access to expert advice and period care knowledge',
      locked: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        <HowItWorksSection />
        
        {/* Featured Games Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
              <h2 className="text-3xl font-bold">Featured Games</h2>
              <Button variant="link" className="text-quest-purple flex items-center">
                View All Games <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGames.map((game, index) => (
                <GameCard key={index} {...game} />
              ))}
            </div>
          </div>
        </section>
        
        {/* More Games Section */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">More Fun Games</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4 bg-white p-4 rounded-lg border shadow-sm">
                <div className="p-3 rounded-full bg-quest-lightPink text-quest-pink">
                  <Smile className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Mood Tracker Bingo</h3>
                  <p className="text-gray-600 text-sm mb-2">Log your mood and symptoms in a bingo-style mood tracker.</p>
                  <Button variant="link" className="text-quest-pink p-0 h-auto">Play Now</Button>
                </div>
              </div>
              
              <div className="flex gap-4 bg-white p-4 rounded-lg border shadow-sm">
                <div className="p-3 rounded-full bg-quest-lightPurple text-quest-purple">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Period Preparedness Quiz</h3>
                  <p className="text-gray-600 text-sm mb-2">Pack the ultimate emergency period kit in this timed game.</p>
                  <Button variant="link" className="text-quest-purple p-0 h-auto">Play Now</Button>
                </div>
              </div>
              
              <div className="flex gap-4 bg-white p-4 rounded-lg border shadow-sm">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Super Cycle Simulator</h3>
                  <p className="text-gray-600 text-sm mb-2">Manage your period, energy, cravings, and tasks in this fun simulation.</p>
                  <Button variant="link" className="text-blue-600 p-0 h-auto">Play Now</Button>
                </div>
              </div>
              
              <div className="flex gap-4 bg-white p-4 rounded-lg border shadow-sm">
                <div className="p-3 rounded-full bg-quest-lightPink text-quest-pink">
                  <Gamepad className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Period Trivia Challenge</h3>
                  <p className="text-gray-600 text-sm mb-2">Test your knowledge with fun period facts and trivia questions.</p>
                  <Button variant="link" className="text-quest-pink p-0 h-auto">Play Now</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Rewards Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
              <h2 className="text-3xl font-bold">Popular Rewards</h2>
              <Button variant="link" className="text-quest-purple flex items-center">
                View All Rewards <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularRewards.map((reward, index) => (
                <RewardItem key={index} {...reward} />
              ))}
            </div>
            
            <div className="bg-gradient-quest text-white rounded-lg p-8 mt-12">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold mb-2">Ready to start earning rewards?</h3>
                  <p className="text-white/90">Play games, earn coins, and unlock exclusive content!</p>
                </div>
                <Button size="lg" className="bg-white text-quest-pink hover:bg-white/90">
                  Start Playing Now
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">What Our Players Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-quest-lightPink rounded-full flex items-center justify-center text-quest-pink font-bold text-xl">
                    A
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Ava S.</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">"I've learned so much about periods in a fun way! The ASMR games are so relaxing, and I love collecting badges."</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-quest-lightPurple rounded-full flex items-center justify-center text-quest-purple font-bold text-xl">
                    J
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Jamie T.</h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">"The Period Care Adventure game really helped me understand how to manage different period situations. Plus, the rewards are awesome!"</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                    M
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">Morgan K.</h4>
                    <div className="flex">
                      {[...Array(4)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                      <svg className="h-4 w-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">"The Myth or Fact Challenge was eye-opening! I realized how many misconceptions I had about periods. The ASMR element makes learning so calming."</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
