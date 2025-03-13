
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LoadingAnimation } from './LoadingAnimation';
import { ArrowRight, Upload, ClipboardCopy, User } from 'lucide-react';
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
            <UserInfoForm onSubmit={handleUserInfoSubmit} />
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default JobDescriptionForm;
