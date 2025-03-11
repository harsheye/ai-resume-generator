
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, CheckCircle, Award } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -top-64 -right-64"></div>
        <div className="absolute w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-3xl -bottom-64 -left-64"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-10 animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
          <div className="space-y-4 max-w-3xl">
            <div className="inline-block">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>AI-Powered Resume & Cover Letter Generator</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Get Hired Faster with <span className="text-gradient">AI-Optimized</span> Job Documents
            </h1>
            
            <p className="text-xl text-muted-foreground mx-auto max-w-2xl">
              Create tailored, ATS-friendly resumes and cover letters in seconds. Stand out to employers and land more interviews.
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <Button asChild size="lg" className="rounded-full px-8 h-12">
                <Link to="/generator">
                  Create Your Resume
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12">
                <Link to="/templates">Browse Templates</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl w-full">
            <div className="flex flex-col items-center space-y-2 p-4 glass-card card-hover">
              <CheckCircle className="h-8 w-8 text-primary mb-2" />
              <h3 className="text-base font-medium">ATS-Optimized</h3>
              <p className="text-sm text-muted-foreground text-center">Pass through applicant tracking systems with ease</p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 glass-card card-hover">
              <Zap className="h-8 w-8 text-primary mb-2" />
              <h3 className="text-base font-medium">AI-Powered</h3>
              <p className="text-sm text-muted-foreground text-center">Custom tailored to specific job descriptions</p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4 glass-card card-hover">
              <Award className="h-8 w-8 text-primary mb-2" />
              <h3 className="text-base font-medium">Professional</h3>
              <p className="text-sm text-muted-foreground text-center">Polished templates crafted by HR experts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
