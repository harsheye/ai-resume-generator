
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobDescriptionForm from '@/components/JobDescriptionForm';

const Generator = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow page-transition pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <div className="inline-block mb-4">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground">
                AI Resume Generator
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Create Your <span className="text-gradient">ATS-Optimized</span> Resume
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Paste a job description below and our AI will generate a tailored resume
              and cover letter to help you land more interviews.
            </p>
          </div>

          <div className="flex justify-center">
            <JobDescriptionForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Generator;
