
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ResumePreview from '@/components/ResumePreview';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { generateResume, generateCoverLetter, ResumeData, CoverLetterData } from '@/utils/resumeGenerator';

const Resume = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData | null>(null);

  useEffect(() => {
    // Get data from session storage
    const jobTitle = sessionStorage.getItem('jobTitle');
    const jobDescription = sessionStorage.getItem('jobDescription');

    // If no data, redirect to generator page
    if (!jobTitle || !jobDescription) {
      navigate('/generator');
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      // Generate resume and cover letter
      const resumeData = generateResume(jobTitle, jobDescription);
      const coverLetterData = generateCoverLetter(jobTitle, jobDescription, 'ABC Company');
      
      setResumeData(resumeData);
      setCoverLetterData(coverLetterData);
      setIsLoading(false);
    }, 1500);
  }, [navigate]);

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
