
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResumePreview from '@/components/ResumePreview';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { generateResume, generateCoverLetter, ResumeData, CoverLetterData, UserInputData } from '@/utils/resumeGenerator';
import { useToast } from '@/hooks/use-toast';

const Resume = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData | null>(null);

  useEffect(() => {
    // Get data from session storage
    const jobTitle = sessionStorage.getItem('jobTitle');
    const jobDescription = sessionStorage.getItem('jobDescription');
    const userDataString = sessionStorage.getItem('userData');
    
    // Parse user data if available
    let userData: UserInputData | undefined;
    if (userDataString) {
      try {
        userData = JSON.parse(userDataString);
        console.log("Parsed user data:", userData);
      } catch (e) {
        console.error('Error parsing user data:', e);
        toast({
          title: "Error processing your information",
          description: "There was a problem with your data. Please try again.",
          variant: "destructive"
        });
      }
    }

    // If no job data, redirect to generator page
    if (!jobTitle || !jobDescription) {
      toast({
        title: "Missing information",
        description: "Please provide job details to generate a resume",
        variant: "destructive"
      });
      navigate('/generator');
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      try {
        // Generate resume and cover letter (with user data if available)
        const resumeData = generateResume(jobTitle, jobDescription, userData);
        const coverLetterData = generateCoverLetter(
          jobTitle, 
          jobDescription, 
          'ABC Company', 
          userData?.personalInfo.name
        );
        
        console.log("Generated resume data:", resumeData);
        
        setResumeData(resumeData);
        setCoverLetterData(coverLetterData);
        setIsLoading(false);
        
        toast({
          title: "Documents generated",
          description: "Your custom resume and cover letter are ready to view.",
        });
      } catch (error) {
        console.error("Error generating documents:", error);
        toast({
          title: "Generation error",
          description: "There was a problem creating your documents. Please try again.",
          variant: "destructive"
        });
        navigate('/generator');
      }
    }, 1500);
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow page-transition pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-[60vh]">
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
            resumeData && coverLetterData && (
              <ResumePreview 
                resumeData={resumeData} 
                coverLetterData={coverLetterData} 
              />
            )
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resume;
