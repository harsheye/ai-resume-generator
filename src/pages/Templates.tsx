
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { Crown, CheckCircle, Star } from 'lucide-react';

const TemplateCard = ({ 
  title, 
  description, 
  image, 
  isPremium, 
  rating 
}: { 
  title: string; 
  description: string; 
  image: string; 
  isPremium: boolean;
  rating: number;
}) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        {isPremium && (
          <Badge variant="default" className="absolute top-2 right-2 bg-amber-500">
            <Crown className="w-3 h-3 mr-1" /> Premium
          </Badge>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{title}</h3>
          <div className="flex items-center text-amber-500">
            <Star className="fill-current w-4 h-4" />
            <span className="text-xs ml-1">{rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button 
          onClick={() => navigate('/generator')} 
          className="w-full"
          variant={isPremium ? "secondary" : "default"}
        >
          {isPremium ? "Upgrade to Use" : "Use Template"}
        </Button>
      </div>
    </Card>
  );
};

const Templates = () => {
  const templates = [
    {
      title: "Modern Professional",
      description: "Clean, minimal design perfect for corporate roles",
      image: "/placeholder.svg",
      isPremium: false,
      rating: 4.8
    },
    {
      title: "Creative Portfolio",
      description: "Stand out with a bold, creative layout",
      image: "/placeholder.svg",
      isPremium: true,
      rating: 4.9
    },
    {
      title: "Executive Suite",
      description: "Elegant template for senior management positions",
      image: "/placeholder.svg",
      isPremium: true,
      rating: 4.7
    },
    {
      title: "Tech Specialist",
      description: "Highlight your technical skills and projects",
      image: "/placeholder.svg",
      isPremium: false,
      rating: 4.5
    },
    {
      title: "Academic CV",
      description: "Ideal for researchers and academic positions",
      image: "/placeholder.svg",
      isPremium: true,
      rating: 4.6
    },
    {
      title: "Entry Level",
      description: "Perfect for recent graduates and first-time job seekers",
      image: "/placeholder.svg",
      isPremium: false,
      rating: 4.4
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow page-transition pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Professional <span className="text-gradient">Resume Templates</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our collection of ATS-friendly templates designed by HR professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {templates.map((template, index) => (
              <TemplateCard key={index} {...template} />
            ))}
          </div>

          <div className="bg-primary/5 rounded-lg p-6 border border-primary/20 max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <CheckCircle className="text-primary w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">All templates are optimized for ATS</h3>
                <p className="text-muted-foreground">
                  Our templates are designed to pass through Applicant Tracking Systems with ease, 
                  ensuring your resume gets seen by hiring managers.
                </p>
                <Button className="mt-4" onClick={() => window.location.href = '/pricing'}>
                  Upgrade for Premium Templates
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
