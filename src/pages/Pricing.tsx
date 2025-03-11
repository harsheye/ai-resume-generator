
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { Check, Star, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PricingTierProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPro?: boolean;
  isPopular?: boolean;
}

const PricingTier = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText, 
  isPro = false,
  isPopular = false 
}: PricingTierProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePurchase = () => {
    if (title === "Free") {
      navigate('/generator');
    } else {
      toast({
        title: "Subscription Coming Soon",
        description: "Premium subscriptions will be available soon. Stay tuned!",
      });
    }
  };

  return (
    <Card className={`p-6 relative overflow-hidden transition-all ${
      isPro ? 'border-primary/20 shadow-lg' : ''
    } ${isPopular ? 'scale-105 shadow-xl border-primary' : ''}`}>
      {isPopular && (
        <Badge className="absolute top-4 right-4 bg-primary" variant="default">
          Most Popular
        </Badge>
      )}
      
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Free" && <span className="text-muted-foreground">/month</span>}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
              isPro ? 'text-primary' : 'text-green-500'
            }`} />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button 
        className={`w-full ${isPro ? '' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}
        onClick={handlePurchase}
      >
        {buttonText}
      </Button>
    </Card>
  );
};

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow page-transition pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <div className="inline-block mb-4">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground">
                <Zap className="w-3.5 h-3.5 mr-1.5" />
                Simple, transparent pricing
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Choose the Plan That's Right for <span className="text-gradient">You</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start with our free tier or upgrade for premium features and unlimited document generation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            <PricingTier
              title="Free"
              price="Free"
              description="Perfect for occasional use"
              features={[
                "2 resume generations per month",
                "Basic templates",
                "ATS optimization",
                "PDF downloads",
                "Email support"
              ]}
              buttonText="Get Started"
            />
            
            <PricingTier
              title="Pro"
              price="$9.99"
              description="For job seekers in active search"
              features={[
                "Unlimited resume generations",
                "All premium templates",
                "Advanced ATS optimization",
                "Interview preparation tips",
                "Cover letter customization",
                "Priority email support"
              ]}
              buttonText="Subscribe Now"
              isPro={true}
              isPopular={true}
            />
            
            <PricingTier
              title="Business"
              price="$29.99"
              description="For career coaches and teams"
              features={[
                "Everything in Pro plan",
                "Multiple user accounts",
                "Team collaboration features",
                "White-labeled exports",
                "API access",
                "Dedicated account manager",
                "24/7 priority support"
              ]}
              buttonText="Contact Sales"
              isPro={true}
            />
          </div>
          
          <div className="max-w-3xl mx-auto bg-primary/5 rounded-lg p-6 border border-primary/20">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Star className="text-primary w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">100% Satisfaction Guarantee</h3>
                <p className="text-muted-foreground">
                  Not satisfied with our service? We offer a 14-day money-back guarantee for all premium plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
