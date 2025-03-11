
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { FileText, Menu, X } from 'lucide-react';

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
        isScrolled ? 'py-3 bg-blur border-b border-gray-200/20' : 'py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <FileText className="w-7 h-7 text-primary" />
            <span className="font-medium text-xl">CareerForge</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
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
            <Link 
              to="/templates" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === '/templates' ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Templates
            </Link>
            <Button asChild variant="ghost" className="text-sm font-medium">
              <Link to="/pricing">Pricing</Link>
            </Button>
            <Button asChild>
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-blur border-b border-gray-200/20 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
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
            <Link 
              to="/templates" 
              className={`py-2 text-sm font-medium transition-colors ${
                location.pathname === '/templates' ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              Templates
            </Link>
            <Link 
              to="/pricing" 
              className="py-2 text-sm font-medium transition-colors text-foreground/80"
            >
              Pricing
            </Link>
            <Button asChild className="w-full mt-2">
              <Link to="/generator">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
