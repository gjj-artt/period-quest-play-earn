
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Heart, Award, Coins } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden py-16 md:py-24">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-quest-pink/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-quest-purple/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 mt-8 md:mt-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-gradient-pink">Period Quest</span> – Learn, Play, and Earn!
            </h1>
            <p className="text-lg text-gray-700">
              Gamifying period education has never been this fun or rewarding! Dive into our interactive ASMR-inspired games and earn exciting rewards.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-quest hover:opacity-90 transition">
                Start Playing <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-quest-purple text-quest-purple hover:bg-quest-lightPurple/50">
                Learn More
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-quest-lightPink text-quest-pink">
                  <Heart className="h-5 w-5" />
                </div>
                <span className="font-medium">Fun ASMR Games</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-quest-lightPurple text-quest-purple">
                  <Award className="h-5 w-5" />
                </div>
                <span className="font-medium">Earn Badges</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
                  <Coins className="h-5 w-5" />
                </div>
                <span className="font-medium">Collect Coins</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 bg-gradient-quest rounded-full opacity-20 blur-2xl absolute -z-10 animate-pulse-soft"></div>
              <img
                src="/placeholder.svg" 
                alt="Period Quest Illustration" 
                className="w-72 h-72 md:w-96 md:h-96 object-cover animate-float z-10"
              />
              {/* Floating elements */}
              <div className="absolute top-10 right-0 bg-white p-2 rounded-xl shadow-lg animate-float" style={{animationDelay: '0.5s'}}>
                <Award className="h-8 w-8 text-quest-purple" />
              </div>
              <div className="absolute bottom-10 left-0 bg-white p-2 rounded-xl shadow-lg animate-float" style={{animationDelay: '1s'}}>
                <Coins className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="absolute top-1/2 -right-5 bg-white p-2 rounded-xl shadow-lg animate-float" style={{animationDelay: '1.5s'}}>
                <Heart className="h-8 w-8 text-quest-pink" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
