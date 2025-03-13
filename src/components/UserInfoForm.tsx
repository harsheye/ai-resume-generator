
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ExperienceEntry, EducationEntry, ProjectEntry, AchievementEntry, UserInputData } from '@/utils/resumeGenerator';
import { PlusCircle, Trash2, Briefcase, GraduationCap, FolderKanban, Trophy } from 'lucide-react';

const UserInfoForm = ({ onSubmit }: { onSubmit: (userInput: UserInputData) => void }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('personal');
  
  // Personal Information
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Skills
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  
  // Experience
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([
    { title: '', company: '', date: '', description: [''] }
  ]);
  
  // Education
  const [education, setEducation] = useState<EducationEntry[]>([
    { degree: '', school: '', date: '' }
  ]);
  
  // Projects
  const [projects, setProjects] = useState<ProjectEntry[]>([
    { title: '', description: '', technologies: [] }
  ]);
  
  // Achievements
  const [achievements, setAchievements] = useState<AchievementEntry[]>([
    { title: '', description: '' }
  ]);

  const addSkill = () => {
    if (newSkill.trim() === '') return;
    if (skills.includes(newSkill.trim())) {
      toast({
        title: "Skill already exists",
        description: "This skill is already in your list.",
        variant: "destructive"
      });
      return;
    }
    setSkills([...skills, newSkill.trim()]);
    setNewSkill('');
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // Experience handlers
  const updateExperience = (index: number, field: keyof ExperienceEntry, value: string | string[]) => {
    const updatedExperiences = [...experiences];
    if (field === 'description' && typeof value === 'string') {
      updatedExperiences[index].description = [value];
    } else {
      (updatedExperiences[index][field] as any) = value;
    }
    setExperiences(updatedExperiences);
  };

  const addExperiencePoint = (expIndex: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].description.push('');
    setExperiences(updatedExperiences);
  };

  const updateExperiencePoint = (expIndex: number, pointIndex: number, value: string) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].description[pointIndex] = value;
    setExperiences(updatedExperiences);
  };

  const removeExperiencePoint = (expIndex: number, pointIndex: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].description = updatedExperiences[expIndex].description.filter((_, i) => i !== pointIndex);
    setExperiences(updatedExperiences);
  };

  const addExperience = () => {
    setExperiences([...experiences, { title: '', company: '', date: '', description: [''] }]);
  };

  const removeExperience = (index: number) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((_, i) => i !== index));
    } else {
      toast({
        title: "Cannot remove",
        description: "You need to have at least one experience entry.",
        variant: "destructive"
      });
    }
  };

  // Education handlers
  const updateEducation = (index: number, field: keyof EducationEntry, value: string) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const addEducation = () => {
    setEducation([...education, { degree: '', school: '', date: '' }]);
  };

  const removeEducation = (index: number) => {
    if (education.length > 1) {
      setEducation(education.filter((_, i) => i !== index));
    } else {
      toast({
        title: "Cannot remove",
        description: "You need to have at least one education entry.",
        variant: "destructive"
      });
    }
  };

  // Projects handlers
  const updateProject = (index: number, field: keyof ProjectEntry, value: string | string[]) => {
    const updatedProjects = [...projects];
    if (field === 'technologies' && typeof value === 'string') {
      updatedProjects[index].technologies = value.split(',').map(tech => tech.trim());
    } else {
      (updatedProjects[index][field] as any) = value;
    }
    setProjects(updatedProjects);
  };

  const addProject = () => {
    setProjects([...projects, { title: '', description: '', technologies: [] }]);
  };

  const removeProject = (index: number) => {
    if (projects.length > 1) {
      setProjects(projects.filter((_, i) => i !== index));
    } else {
      toast({
        title: "Cannot remove",
        description: "You need to have at least one project entry.",
        variant: "destructive"
      });
    }
  };

  // Achievements handlers
  const updateAchievement = (index: number, field: keyof AchievementEntry, value: string) => {
    const updatedAchievements = [...achievements];
    updatedAchievements[index][field] = value;
    setAchievements(updatedAchievements);
  };

  const addAchievement = () => {
    setAchievements([...achievements, { title: '', description: '' }]);
  };

  const removeAchievement = (index: number) => {
    if (achievements.length > 1) {
      setAchievements(achievements.filter((_, i) => i !== index));
    } else {
      toast({
        title: "Cannot remove",
        description: "You need to have at least one achievement entry.",
        variant: "destructive"
      });
    }
  };

  const handleNextTab = () => {
    const tabs = ['personal', 'experience', 'education', 'projects', 'achievements', 'review'];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
    }
  };

  const handlePrevTab = () => {
    const tabs = ['personal', 'experience', 'education', 'projects', 'achievements', 'review'];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
    }
  };

  const handleSubmit = () => {
    // Simple validation
    if (!name || !email || !phone || skills.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Construct user data
    const userData: UserInputData = {
      personalInfo: {
        name,
        email,
        phone,
      },
      skills,
      experience: experiences.filter(exp => exp.title && exp.company),
      education: education.filter(edu => edu.degree && edu.school),
      projects: projects.filter(proj => proj.title),
      achievements: achievements.filter(ach => ach.title)
    };

    onSubmit(userData);
  };

  return (
    <Card className="glass-card p-6 md:p-8 max-w-3xl w-full animate-slide-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Tell Us About Yourself</h2>
        <p className="text-muted-foreground">
          We'll use this information to create a personalized resume and cover letter
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-6 mb-6">
          <TabsTrigger value="personal" className="flex flex-col items-center gap-1">
            <span className="hidden md:inline">Personal</span>
            <span className="md:hidden">1</span>
          </TabsTrigger>
          <TabsTrigger value="experience" className="flex flex-col items-center gap-1">
            <span className="hidden md:inline">Experience</span>
            <span className="md:hidden">2</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex flex-col items-center gap-1">
            <span className="hidden md:inline">Education</span>
            <span className="md:hidden">3</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex flex-col items-center gap-1">
            <span className="hidden md:inline">Projects</span>
            <span className="md:hidden">4</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex flex-col items-center gap-1">
            <span className="hidden md:inline">Achievements</span>
            <span className="md:hidden">5</span>
          </TabsTrigger>
          <TabsTrigger value="review" className="flex flex-col items-center gap-1">
            <span className="hidden md:inline">Review</span>
            <span className="md:hidden">6</span>
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Smith"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. john.smith@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. (555) 123-4567"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Skills <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g. Project Management"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button type="button" onClick={addSkill} className="shrink-0">
                  Add
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {skills.map((skill, index) => (
                  <div key={index} className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center">
                    {skill}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 ml-1"
                      onClick={() => removeSkill(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button onClick={handleNextTab}>Next: Experience</Button>
          </div>
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Work Experience
            </h3>
            <Button type="button" onClick={addExperience} size="sm" variant="outline" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              Add
            </Button>
          </div>
          
          {experiences.map((exp, expIndex) => (
            <div key={expIndex} className="border p-4 rounded-md mb-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium">Position {expIndex + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-red-500"
                  onClick={() => removeExperience(expIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Job Title</label>
                  <Input
                    value={exp.title}
                    onChange={(e) => updateExperience(expIndex, 'title', e.target.value)}
                    placeholder="e.g. Project Manager"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                    placeholder="e.g. Acme Inc."
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Date Range</label>
                <Input
                  value={exp.date}
                  onChange={(e) => updateExperience(expIndex, 'date', e.target.value)}
                  placeholder="e.g. Jan 2020 - Present"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Key Responsibilities</label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => addExperiencePoint(expIndex)}
                    className="h-7 text-xs"
                  >
                    Add Point
                  </Button>
                </div>
                
                {exp.description.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex gap-2 mb-2">
                    <Input
                      value={point}
                      onChange={(e) => updateExperiencePoint(expIndex, pointIndex, e.target.value)}
                      placeholder="e.g. Led a team of 5 engineers to deliver project on time"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 shrink-0"
                      onClick={() => removeExperiencePoint(expIndex, pointIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handlePrevTab}>Previous</Button>
            <Button onClick={handleNextTab}>Next: Education</Button>
          </div>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Education
            </h3>
            <Button type="button" onClick={addEducation} size="sm" variant="outline" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              Add
            </Button>
          </div>
          
          {education.map((edu, eduIndex) => (
            <div key={eduIndex} className="border p-4 rounded-md mb-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium">Education {eduIndex + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-red-500"
                  onClick={() => removeEducation(eduIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Degree</label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(eduIndex, 'degree', e.target.value)}
                    placeholder="e.g. Bachelor of Science in Computer Science"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">School</label>
                  <Input
                    value={edu.school}
                    onChange={(e) => updateEducation(eduIndex, 'school', e.target.value)}
                    placeholder="e.g. University of Technology"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Date Range</label>
                <Input
                  value={edu.date}
                  onChange={(e) => updateEducation(eduIndex, 'date', e.target.value)}
                  placeholder="e.g. 2016 - 2020"
                />
              </div>
            </div>
          ))}
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handlePrevTab}>Previous</Button>
            <Button onClick={handleNextTab}>Next: Projects</Button>
          </div>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <FolderKanban className="h-5 w-5" />
              Projects
            </h3>
            <Button type="button" onClick={addProject} size="sm" variant="outline" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              Add
            </Button>
          </div>
          
          {projects.map((project, projIndex) => (
            <div key={projIndex} className="border p-4 rounded-md mb-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium">Project {projIndex + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-red-500"
                  onClick={() => removeProject(projIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Project Title</label>
                <Input
                  value={project.title}
                  onChange={(e) => updateProject(projIndex, 'title', e.target.value)}
                  placeholder="e.g. E-commerce Platform"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(projIndex, 'description', e.target.value)}
                  placeholder="e.g. Developed a full-stack e-commerce platform with React and Node.js"
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Technologies Used</label>
                <Input
                  value={project.technologies.join(', ')}
                  onChange={(e) => updateProject(projIndex, 'technologies', e.target.value)}
                  placeholder="e.g. React, TypeScript, Node.js (comma separated)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Project Link (Optional)</label>
                <Input
                  value={project.link || ''}
                  onChange={(e) => updateProject(projIndex, 'link', e.target.value)}
                  placeholder="e.g. https://github.com/username/project"
                />
              </div>
            </div>
          ))}
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handlePrevTab}>Previous</Button>
            <Button onClick={handleNextTab}>Next: Achievements</Button>
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Achievements
            </h3>
            <Button type="button" onClick={addAchievement} size="sm" variant="outline" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4" />
              Add
            </Button>
          </div>
          
          {achievements.map((achievement, achIndex) => (
            <div key={achIndex} className="border p-4 rounded-md mb-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium">Achievement {achIndex + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-red-500"
                  onClick={() => removeAchievement(achIndex)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Achievement Title</label>
                <Input
                  value={achievement.title}
                  onChange={(e) => updateAchievement(achIndex, 'title', e.target.value)}
                  placeholder="e.g. Employee of the Year"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={achievement.description}
                  onChange={(e) => updateAchievement(achIndex, 'description', e.target.value)}
                  placeholder="e.g. Awarded for exceptional performance and leadership"
                  className="min-h-[80px]"
                />
              </div>
            </div>
          ))}
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handlePrevTab}>Previous</Button>
            <Button onClick={handleNextTab}>Next: Review</Button>
          </div>
        </TabsContent>

        {/* Review Tab */}
        <TabsContent value="review" className="space-y-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2">Review Your Information</h3>
            <p className="text-muted-foreground">
              Please review your information before submission. You can go back to any section to make edits.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">Personal Information</h4>
              <p><strong>Name:</strong> {name || 'Not provided'}</p>
              <p><strong>Email:</strong> {email || 'Not provided'}</p>
              <p><strong>Phone:</strong> {phone || 'Not provided'}</p>
              <div className="mt-2">
                <strong>Skills:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {skills.length > 0 ? (
                    skills.map((skill, index) => (
                      <span key={index} className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted-foreground">No skills provided</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">Experience</h4>
              {experiences.some(exp => exp.title && exp.company) ? (
                experiences
                  .filter(exp => exp.title && exp.company)
                  .map((exp, index) => (
                    <div key={index} className="mb-3 last:mb-0">
                      <p className="font-medium">{exp.title} at {exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.date}</p>
                      {exp.description.length > 0 && (
                        <ul className="list-disc list-inside mt-1 text-sm">
                          {exp.description.map((desc, i) => (
                            desc && <li key={i}>{desc}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
              ) : (
                <p className="text-muted-foreground">No experience provided</p>
              )}
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">Education</h4>
              {education.some(edu => edu.degree && edu.school) ? (
                education
                  .filter(edu => edu.degree && edu.school)
                  .map((edu, index) => (
                    <div key={index} className="mb-2 last:mb-0">
                      <p className="font-medium">{edu.degree}</p>
                      <p className="text-sm">{edu.school}, {edu.date}</p>
                    </div>
                  ))
              ) : (
                <p className="text-muted-foreground">No education provided</p>
              )}
            </div>
            
            {projects.some(proj => proj.title) && (
              <div className="border p-4 rounded-md">
                <h4 className="font-medium mb-2">Projects</h4>
                {projects
                  .filter(proj => proj.title)
                  .map((proj, index) => (
                    <div key={index} className="mb-3 last:mb-0">
                      <p className="font-medium">{proj.title}</p>
                      <p className="text-sm">{proj.description}</p>
                      {proj.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {proj.technologies.map((tech, i) => (
                            <span key={i} className="bg-secondary/30 rounded-full px-2 py-0.5 text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
            
            {achievements.some(ach => ach.title) && (
              <div className="border p-4 rounded-md">
                <h4 className="font-medium mb-2">Achievements</h4>
                {achievements
                  .filter(ach => ach.title)
                  .map((ach, index) => (
                    <div key={index} className="mb-3 last:mb-0">
                      <p className="font-medium">{ach.title}</p>
                      <p className="text-sm">{ach.description}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handlePrevTab}>Previous</Button>
            <Button onClick={handleSubmit}>Submit Information</Button>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default UserInfoForm;
