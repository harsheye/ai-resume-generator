
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LoadingAnimation } from './LoadingAnimation';
import { ArrowRight, Upload, ClipboardCopy, User, Sparkles } from 'lucide-react';
import UserInfoForm from './UserInfoForm';
import { UserInputData } from '@/utils/resumeGenerator';

const JobDescriptionForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('job-info');
  const [userData, setUserData] = useState<UserInputData | null>(null);
  const [userBio, setUserBio] = useState('');
  const [isProcessingBio, setIsProcessingBio] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobTitle.trim() || !jobDescription.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both job title and description.",
        variant: "destructive"
      });
      return;
    }

    // If we're in job-info tab, move to user-info instead of submitting
    if (activeTab === 'job-info') {
      setActiveTab('user-info');
      return;
    }

    setIsGenerating(true);
    
    // Store data in session storage
    sessionStorage.setItem('jobTitle', jobTitle);
    sessionStorage.setItem('jobDescription', jobDescription);
    
    // Store user data if available
    if (userData) {
      sessionStorage.setItem('userData', JSON.stringify(userData));
    }
    
    // Simulate API call
    setTimeout(() => {
      // Navigate to results page
      setIsGenerating(false);
      navigate('/resume');
    }, 3000);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJobDescription(text);
      toast({
        title: "Pasted from clipboard",
        description: "Job description has been pasted successfully.",
      });
    } catch (err) {
      toast({
        title: "Clipboard access denied",
        description: "Please grant clipboard permission or paste manually.",
        variant: "destructive"
      });
    }
  };

  const handleUserInfoSubmit = (userInput: UserInputData) => {
    setUserData(userInput);
    
    // Show success message
    toast({
      title: "Information saved",
      description: "Your personal information has been saved successfully.",
    });
    
    // Move to next step
    handleSubmit(new Event('submit') as any);
  };

  const processBioWithAI = async () => {
    if (!userBio.trim()) {
      toast({
        title: "Empty bio",
        description: "Please enter your bio text before processing.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessingBio(true);

    try {
      // In a real implementation, this would call your AI service
      // For this demo, we'll use a simple parsing function to simulate AI extraction
      const extractedData = simulateAIExtraction(userBio);
      
      // Set the extracted data to be passed to the UserInfoForm
      setUserData(extractedData);
      
      toast({
        title: "Bio processed successfully",
        description: "Your information has been extracted and filled in the form.",
      });
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "Could not process your bio. Please fill the form manually.",
        variant: "destructive"
      });
    } finally {
      setIsProcessingBio(false);
    }
  };

  // This function simulates AI extraction for the demo
  // In a real implementation, this would be replaced with an actual AI call
  const simulateAIExtraction = (text: string): UserInputData => {
    // Simple regex-based extraction for demonstration purposes
    const nameMatch = text.match(/(?:name is|name:|I am|I'm) ([A-Za-z\s]+)(?:,|\.|and)/i);
    const emailMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i);
    const phoneMatch = text.match(/(\+?1?\s*\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4})/i);
    
    // Extract skills (words after "skills" or "experienced in" followed by a list)
    const skillsText = text.match(/(?:skills include|skills:|experienced in|proficient in)(.*?)(?:\.|\n|$)/i);
    const skills = skillsText 
      ? skillsText[1].split(/,|;|\band\b/).map(skill => skill.trim()).filter(Boolean)
      : [];
    
    // Extract experience (simple approach for demo)
    const expMatches = text.match(/(?:worked at|work experience:|experience with) ([A-Za-z\s]+) (?:as|from|in) ([A-Za-z\s]+)/gi);
    const experiences = expMatches 
      ? expMatches.map(exp => {
          const parts = exp.match(/(?:worked at|work experience:|experience with) ([A-Za-z\s]+) (?:as|from|in) ([A-Za-z\s]+)/i);
          return parts ? {
            company: parts[1].trim(),
            title: parts[2].trim(),
            date: "Extracted from bio",
            description: ["Extracted from bio"]
          } : null;
        }).filter(Boolean)
      : [{ title: '', company: '', date: '', description: [''] }];
    
    // Extract education
    const eduMatch = text.match(/(?:studied at|graduated from|degree from|education:|attended) ([A-Za-z\s]+)/i);
    const education = eduMatch 
      ? [{
          school: eduMatch[1].trim(),
          degree: "Extracted from bio",
          date: "Extracted from bio"
        }]
      : [{ degree: '', school: '', date: '' }];

    return {
      personalInfo: {
        name: nameMatch ? nameMatch[1].trim() : '',
        email: emailMatch ? emailMatch[0].trim() : '',
        phone: phoneMatch ? phoneMatch[0].trim() : '',
      },
      skills: skills.length > 0 ? skills : [],
      experience: experiences as any,
      education: education,
      projects: [{ title: '', description: '', technologies: [] }],
      achievements: [{ title: '', description: '' }]
    };
  };

  return (
    <Card className="glass-card p-6 md:p-8 max-w-3xl w-full animate-slide-up">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="job-info" className="flex items-center gap-1.5">
            <Upload className="h-4 w-4" />
            Job Details
          </TabsTrigger>
          <TabsTrigger value="user-info" className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            Your Information
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="job-info">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Generate Your Resume</h2>
            <p className="text-muted-foreground">
              Paste a job description to generate a tailored resume and cover letter
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="jobTitle" className="text-sm font-medium">
                Job Title
              </label>
              <Input
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Software Engineer, Marketing Manager"
                className="w-full"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="jobDescription" className="text-sm font-medium">
                  Job Description
                </label>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={handlePaste}
                  className="text-xs flex items-center gap-1"
                >
                  <ClipboardCopy className="h-3 w-3" />
                  Paste
                </Button>
              </div>
              <Textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="min-h-[200px] resize-y"
                required
              />
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full h-12 group"
              >
                Next: Add Your Information
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </form>
        </TabsContent>
        
        <TabsContent value="user-info">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Generating Documents</h2>
                <p className="text-muted-foreground">
                  Our AI is creating your custom resume and cover letter...
                </p>
              </div>
              <div className="scale-150">
                <LoadingAnimation />
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8 border-b pb-6">
                <h3 className="text-lg font-medium mb-3">Quick Fill with AI</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Paste your bio or resume text below, and our AI will automatically extract your information
                </p>
                
                <div className="space-y-4">
                  <Textarea
                    value={userBio}
                    onChange={(e) => setUserBio(e.target.value)}
                    placeholder="Paste your bio text here. Example: My name is John Doe, I'm a software engineer with 5 years of experience. My email is john@example.com and my phone number is (555) 123-4567. My skills include JavaScript, React, and Node.js..."
                    className="min-h-[120px] text-sm"
                  />
                  
                  <Button 
                    onClick={processBioWithAI}
                    disabled={isProcessingBio}
                    className="w-full flex items-center justify-center gap-2"
                    variant="secondary"
                  >
                    {isProcessingBio ? (
                      <>
                        <LoadingAnimation />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Auto-Fill Form with AI</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <UserInfoForm onSubmit={handleUserInfoSubmit} initialData={userData} />
            </>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default JobDescriptionForm;
