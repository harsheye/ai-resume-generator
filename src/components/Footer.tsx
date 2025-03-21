
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6 md:px-10 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">ResumeCanvas</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              AI-powered resume and cover letter generator. Craft professional, ATS-optimized job documents in seconds.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" aria-label="Twitter">
              <Twitter className="social-icon" />
            </a>
            <a href="#" aria-label="GitHub">
              <Github className="social-icon" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
