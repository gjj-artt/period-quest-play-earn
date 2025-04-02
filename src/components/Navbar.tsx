
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-gradient-quest flex items-center justify-center">
            <span className="font-bold text-white text-xl">PQ</span>
          </div>
          <span className="font-bold text-xl text-gradient-pink">Period Quest</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium hover:text-quest-pink transition">Home</Link>
          <Link to="/games" className="font-medium hover:text-quest-pink transition">Games</Link>
          <Link to="/rewards" className="font-medium hover:text-quest-pink transition">Rewards</Link>
          <Link to="/about" className="font-medium hover:text-quest-pink transition">About</Link>
          <Button className="bg-gradient-quest hover:opacity-90 transition">Start Playing</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link to="/" className="font-medium py-2 hover:text-quest-pink transition" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/games" className="font-medium py-2 hover:text-quest-pink transition" onClick={() => setIsOpen(false)}>Games</Link>
            <Link to="/rewards" className="font-medium py-2 hover:text-quest-pink transition" onClick={() => setIsOpen(false)}>Rewards</Link>
            <Link to="/about" className="font-medium py-2 hover:text-quest-pink transition" onClick={() => setIsOpen(false)}>About</Link>
            <Button className="bg-gradient-quest hover:opacity-90 transition">Start Playing</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
