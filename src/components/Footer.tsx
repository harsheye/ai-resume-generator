
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              <span className="font-medium text-lg">CareerForge</span>
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
        
        <div className="mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Created by the CareerForge Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
