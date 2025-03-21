
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-3'
      }`}
    >
      <div className="container mx-auto px-6 md:px-10">
        <div className={`flex items-center justify-between rounded-full ${
          isScrolled ? 'bg-white/90 dark:bg-gray-900/90 shadow-lg backdrop-blur-sm py-3 px-6' : 'py-2 px-6'
        } transition-all duration-300`}>
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-primary" />
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">ResumeCanvas</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/generator" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/generator' ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Generator
            </Link>
            <Button asChild className="rounded-full px-6">
              <Link to="/generator">Get Started</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4">
          <div className="container mx-auto px-4">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl shadow-lg p-4 flex flex-col gap-4">
              <Link 
                to="/" 
                className={`py-2 text-sm font-medium transition-colors ${
                  location.pathname === '/' ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/generator" 
                className={`py-2 text-sm font-medium transition-colors ${
                  location.pathname === '/generator' ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                Generator
              </Link>
              <Button asChild className="w-full mt-2 rounded-full">
                <Link to="/generator">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
