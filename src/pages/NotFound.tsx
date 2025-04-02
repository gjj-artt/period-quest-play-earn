
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="text-center px-4">
          <div className="mb-8">
            <div className="h-32 w-32 mx-auto bg-gradient-quest rounded-full opacity-20 blur-xl absolute -z-10"></div>
            <h1 className="text-8xl font-bold text-gradient-pink">404</h1>
          </div>
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="bg-gradient-quest hover:opacity-90 transition">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
