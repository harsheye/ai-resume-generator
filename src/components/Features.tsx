
import React, { useRef, useEffect } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Mail, 
  MessageSquare,
  CheckSquare
} from 'lucide-react';

const Features = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const features = document.querySelectorAll('.feature-card');
    features.forEach((feature) => {
      observer.observe(feature);
    });

    return () => {
      features.forEach((feature) => {
        observer.unobserve(feature);
      });
    };
  }, []);

  return (
    <section className="py-20 md:py-32" ref={featuresRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block mb-4">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground">
              Features
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything You Need for Job Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Our AI-powered platform helps you create professional job application documents and prepare for interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FileText className="h-10 w-10 text-primary" />}
            title="AI Resume Generator"
            description="Upload a job description and get a professionally tailored resume that highlights your relevant skills and experience."
            delay={0}
          />
          <FeatureCard 
            icon={<Search className="h-10 w-10 text-primary" />}
            title="ATS Keyword Optimization"
            description="Our AI analyzes job descriptions to include the right keywords and phrases that help your resume pass through ATS filters."
            delay={100}
          />
          <FeatureCard 
            icon={<CheckSquare className="h-10 w-10 text-primary" />}
            title="Customized Cover Letters"
            description="Generate personalized cover letters that perfectly complement your resume and address specific job requirements."
            delay={200}
          />
          <FeatureCard 
            icon={<Download className="h-10 w-10 text-primary" />}
            title="Export Options"
            description="Download your documents as PDF or DOCX files that maintain perfect formatting for all applications."
            delay={300}
          />
          <FeatureCard 
            icon={<Mail className="h-10 w-10 text-primary" />}
            title="Email Integration"
            description="Send your professionally crafted documents directly to employers or save them for later use."
            delay={400}
          />
          <FeatureCard 
            icon={<MessageSquare className="h-10 w-10 text-primary" />}
            title="Interview Preparation"
            description="Get AI-powered interview tips and practice questions based on your resume and target job position."
            delay={500}
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
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  return (
    <div 
      className="feature-card glass-card p-8 opacity-0 card-hover"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="rounded-full w-16 h-16 flex items-center justify-center bg-primary/10 mb-6 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Features;
