
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden animated-bg">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 fade-in">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Forge Your Career with <span className="text-primary">AI-Engineered</span> Documents
            </h1>
            
            <p className="text-xl text-white/80 mx-auto max-w-2xl">
              Create tailored, ATS-friendly resumes and cover letters in seconds. Stand out to employers and land more interviews.
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Button asChild size="lg" className="rounded-full px-8 h-12">
                <Link to="/generator">
                  Craft Your Resume
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
