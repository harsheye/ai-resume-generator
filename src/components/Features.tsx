
import React from 'react';
import { 
  FileText, 
  Search, 
  Download
} from 'lucide-react';

const Features = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
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
          />
          <FeatureCard 
            icon={<Search className="h-10 w-10 text-primary" />}
            title="ATS Optimization"
            description="Our AI analyzes job descriptions to include the right keywords that help your resume pass through ATS filters."
          />
          <FeatureCard 
            icon={<Download className="h-10 w-10 text-primary" />}
            title="Easy Export"
            description="Download your documents as PDF or DOCX files that maintain perfect formatting for all applications."
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
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg fade-in">
      <div className="rounded-full w-16 h-16 flex items-center justify-center bg-primary/10 mb-6 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Features;
