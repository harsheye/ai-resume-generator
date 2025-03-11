
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileType, CheckCircle2 } from 'lucide-react';
import DocumentActions from './DocumentActions';

interface ResumePreviewProps {
  resumeData: {
    jobTitle: string;
    name: string;
    email: string;
    phone: string;
    summary: string;
    skills: string[];
    experience: Array<{
      title: string;
      company: string;
      date: string;
      description: string[];
    }>;
    education: Array<{
      degree: string;
      school: string;
      date: string;
    }>;
  };
  coverLetterData: {
    name: string;
    jobTitle: string;
    company: string;
    paragraphs: string[];
  };
}

const ResumePreview = ({ resumeData, coverLetterData }: ResumePreviewProps) => {
  const [activeTab, setActiveTab] = useState('resume');

  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
      <Tabs defaultValue="resume" className="w-full" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your AI-Generated Documents</h2>
          <TabsList className="grid grid-cols-2 w-[300px]">
            <TabsTrigger value="resume" className="flex items-center gap-1.5">
              <FileText className="h-4 w-4" />
              Resume
            </TabsTrigger>
            <TabsTrigger value="cover-letter" className="flex items-center gap-1.5">
              <FileType className="h-4 w-4" />
              Cover Letter
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Resume Tab */}
        <TabsContent value="resume" className="mt-0">
          <Card className="glass-card p-6 md:p-8 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Preview Section */}
              <div className="md:col-span-2 bg-white rounded-lg shadow-md p-8 min-h-[700px]">
                <div className="space-y-6">
                  <div className="text-center pb-4 border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-800">{resumeData.name}</h1>
                    <p className="text-primary font-medium">{resumeData.jobTitle}</p>
                    <div className="flex justify-center gap-3 mt-2 text-sm text-gray-600">
                      <span>{resumeData.email}</span>
                      <span>•</span>
                      <span>{resumeData.phone}</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-800 mb-2">Professional Summary</h2>
                    <p className="text-gray-700 text-sm">{resumeData.summary}</p>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-800 mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="bg-primary/10 text-primary text-xs py-1 px-2 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-800 mb-3">Experience</h2>
                    <div className="space-y-4">
                      {resumeData.experience.map((exp, index) => (
                        <div key={index} className="border-l-2 border-primary pl-4 pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-gray-800">{exp.title}</h3>
                              <p className="text-sm text-gray-600">{exp.company}</p>
                            </div>
                            <span className="text-xs text-gray-500">{exp.date}</span>
                          </div>
                          <ul className="mt-2 space-y-1">
                            {exp.description.map((desc, i) => (
                              <li key={i} className="text-sm text-gray-700 flex gap-2">
                                <span className="text-primary flex-shrink-0">•</span>
                                <span>{desc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-gray-800 mb-3">Education</h2>
                    <div className="space-y-3">
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="flex justify-between">
                          <div>
                            <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                            <p className="text-sm text-gray-600">{edu.school}</p>
                          </div>
                          <span className="text-xs text-gray-500">{edu.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="md:col-span-1 space-y-6">
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-base">ATS-Optimized</h3>
                      <p className="text-sm text-muted-foreground">
                        This resume is optimized for ATS systems with relevant keywords and proper formatting.
                      </p>
                    </div>
                  </div>
                </div>

                <DocumentActions documentType="resume" />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Cover Letter Tab */}
        <TabsContent value="cover-letter" className="mt-0">
          <Card className="glass-card p-6 md:p-8 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Preview Section */}
              <div className="md:col-span-2 bg-white rounded-lg shadow-md p-8 min-h-[700px]">
                <div className="space-y-6">
                  <div className="text-center pb-6">
                    <h1 className="text-2xl font-bold text-gray-800">{coverLetterData.name}</h1>
                    <div className="flex justify-center gap-3 mt-2 text-sm text-gray-600">
                      <span>{resumeData.email}</span>
                      <span>•</span>
                      <span>{resumeData.phone}</span>
                    </div>
                  </div>

                  <div className="text-right mb-8">
                    <p className="text-sm text-gray-700">{new Date().toLocaleDateString()}</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-700 mb-1">Hiring Manager</p>
                    <p className="text-sm text-gray-700 mb-1">{coverLetterData.company}</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-700 mb-4">Dear Hiring Manager,</p>
                  </div>

                  <div className="space-y-4">
                    {coverLetterData.paragraphs.map((paragraph, index) => (
                      <p key={index} className="text-sm text-gray-700">{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-8">
                    <p className="text-sm text-gray-700 mb-4">Sincerely,</p>
                    <p className="text-sm text-gray-700">{coverLetterData.name}</p>
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="md:col-span-1 space-y-6">
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-base">Personalized</h3>
                      <p className="text-sm text-muted-foreground">
                        This cover letter is customized for the {coverLetterData.jobTitle} position at {coverLetterData.company}.
                      </p>
                    </div>
                  </div>
                </div>

                <DocumentActions documentType="cover-letter" />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumePreview;
