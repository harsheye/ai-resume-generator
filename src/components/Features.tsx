
import React, { useEffect, useState } from 'react';
import { 
  FileText, 
  Search, 
  Download
} from 'lucide-react';

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const featuresSection = document.getElementById('features-section');
      if (featuresSection) {
        const rect = featuresSection.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Check if the section is in view (at least partially)
        if (rect.top <= windowHeight * 0.75) {
          setIsVisible(true);
        }
      }
    };

    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="features-section" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Our AI-powered platform helps you create professional job application documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FileText className="h-10 w-10 text-primary" />}
            title="AI Resume Generator"
            description="Upload a job description and get a professionally tailored resume that highlights your relevant skills and experience."
            isVisible={isVisible}
            animationClass="animate-slide-from-left"
          />
          <FeatureCard 
            icon={<Search className="h-10 w-10 text-primary" />}
            title="ATS Optimization"
            description="Our AI analyzes job descriptions to include the right keywords that help your resume pass through ATS filters."
            isVisible={isVisible}
            animationClass="animate-slide-from-bottom"
          />
          <FeatureCard 
            icon={<Download className="h-10 w-10 text-primary" />}
            title="Easy Export"
            description="Download your documents as PDF or DOCX files that maintain perfect formatting for all applications."
            isVisible={isVisible}
            animationClass="animate-slide-from-right"
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isVisible: boolean;
  animationClass: string;
}

const FeatureCard = ({ icon, title, description, isVisible, animationClass }: FeatureCardProps) => {
  return (
    <div 
      className={`bg-gray-50 dark:bg-gray-800 p-8 rounded-lg 
        transition-all duration-700 
        hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:hover:bg-gray-700
        ${isVisible ? animationClass : 'opacity-0'}`}
    >
      <div className="rounded-full w-16 h-16 flex items-center justify-center bg-primary/10 mb-6 mx-auto
        transition-transform duration-500 hover:scale-110">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Features;
