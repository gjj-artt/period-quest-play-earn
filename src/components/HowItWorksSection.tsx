
import React from 'react';
import { Gamepad2, Award, Gift } from 'lucide-react';

const steps = [
  {
    icon: <Gamepad2 className="h-8 w-8" />,
    title: 'Play Games',
    description: 'Dive into our period-related ASMR games, where relaxation meets education.',
    color: 'bg-quest-lightPink text-quest-pink'
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: 'Earn Rewards',
    description: 'Gain Confidence Coins, Badges, and exclusive health tips as you progress.',
    color: 'bg-quest-lightPurple text-quest-purple'
  },
  {
    icon: <Gift className="h-8 w-8" />,
    title: 'Redeem Prizes',
    description: 'Exchange your rewards for fun virtual items, avatars, or personalized resources.',
    color: 'bg-blue-100 text-blue-600'
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600">
            Our platform makes learning about periods fun and rewarding through interactive games and a comprehensive reward system.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center bg-white rounded-xl p-6 shadow-sm border">
              <div className={`p-4 rounded-full mb-4 ${step.color}`}>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-center text-gray-600">{step.description}</p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-90 md:rotate-0">
                  <svg className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
