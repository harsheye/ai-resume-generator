
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileType, CheckCircle2 } from 'lucide-react';
import DocumentActions from './DocumentActions';
import { ResumeData, CoverLetterData } from '@/utils/resumeGenerator';

interface ResumePreviewProps {
  resumeData: ResumeData;
  coverLetterData: CoverLetterData;
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
              <div className="md:col-span-2 bg-white rounded-lg shadow-md p-8 min-h-[700px]" id="resume">
                <div className="space-y-6">
                  {/* Header Section */}
                  <div className="border-b border-gray-200 pb-4">
                    <h1 className="text-2xl font-bold text-gray-800">{resumeData.name}</h1>
                    <p className="text-primary font-medium mt-1">{resumeData.jobTitle}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                      <span>{resumeData.email}</span>
                      <span className="hidden md:inline">•</span>
                      <span>{resumeData.phone}</span>
                    </div>
                  </div>

                  {/* Professional Summary - Important for ATS */}
                  <div>
                    <h2 className="text-base font-bold text-gray-800 uppercase tracking-wider mb-2">Professional Summary</h2>
                    <p className="text-gray-700 text-sm leading-relaxed">{resumeData.summary}</p>
                  </div>

                  {/* Skills Section - Critical for ATS keyword matching */}
                  <div>
                    <h2 className="text-base font-bold text-gray-800 uppercase tracking-wider mb-2">Core Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="bg-gray-100 text-gray-800 text-xs py-1 px-2 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Work Experience - Chronological format preferred by ATS */}
                  <div>
                    <h2 className="text-base font-bold text-gray-800 uppercase tracking-wider mb-3">Professional Experience</h2>
                    <div className="space-y-4">
                      {resumeData.experience.map((exp, index) => (
                        <div key={index} className="pb-2">
                          <div className="flex flex-col md:flex-row justify-between items-start">
                            <div>
                              <h3 className="font-bold text-gray-800">{exp.title}</h3>
                              <p className="text-sm text-gray-600">{exp.company}</p>
                            </div>
                            <span className="text-xs text-gray-500 mt-1 md:mt-0">{exp.date}</span>
                          </div>
                          <ul className="mt-2 space-y-1 ml-4">
                            {exp.description.map((desc, i) => (
                              <li key={i} className="text-sm text-gray-700 list-disc ml-1">
                                <span>{desc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education Section */}
                  <div>
                    <h2 className="text-base font-bold text-gray-800 uppercase tracking-wider mb-3">Education</h2>
                    <div className="space-y-3">
                      {resumeData.education.map((edu, index) => (
                        <div key={index} className="flex flex-col md:flex-row justify-between">
                          <div>
                            <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                            <p className="text-sm text-gray-600">{edu.school}</p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1 md:mt-0">{edu.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects Section - Only show if projects exist */}
                  {resumeData.projects && resumeData.projects.length > 0 && (
                    <div>
                      <h2 className="text-base font-bold text-gray-800 uppercase tracking-wider mb-3">Relevant Projects</h2>
                      <div className="space-y-4">
                        {resumeData.projects.map((project, index) => (
                          <div key={index} className="pb-2">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-gray-800">{project.title}</h3>
                              {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                                  View Project
                                </a>
                              )}
                            </div>
                            <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                            {project.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                <span className="text-xs text-gray-600 font-medium">Technologies:</span>
                                {project.technologies.map((tech, i) => (
                                  <span key={i} className="text-xs text-gray-600">
                                    {i === project.technologies.length - 1 ? tech : `${tech},`}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements Section - Only show if achievements exist */}
                  {resumeData.achievements && resumeData.achievements.length > 0 && (
                    <div>
                      <h2 className="text-base font-bold text-gray-800 uppercase tracking-wider mb-3">Key Achievements</h2>
                      <ul className="space-y-2 ml-4">
                        {resumeData.achievements.map((achievement, index) => (
                          <li key={index} className="text-sm text-gray-700 list-disc ml-1">
                            <span className="font-medium">{achievement.title}:</span> {achievement.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
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

                <DocumentActions 
                  documentType="resume" 
                  resumeData={resumeData}
                  coverLetterData={coverLetterData}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Cover Letter Tab */}
        <TabsContent value="cover-letter" className="mt-0">
          <Card className="glass-card p-6 md:p-8 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Preview Section */}
              <div className="md:col-span-2 bg-white rounded-lg shadow-md p-8 min-h-[700px]" id="cover-letter">
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

                <DocumentActions 
                  documentType="cover-letter" 
                  resumeData={resumeData}
                  coverLetterData={coverLetterData}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumePreview;
