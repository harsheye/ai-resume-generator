
// Resume generation with user input

export interface ExperienceEntry {
  title: string;
  company: string;
  date: string;
  description: string[];
}

export interface EducationEntry {
  degree: string;
  school: string;
  date: string;
}

export interface ProjectEntry {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface AchievementEntry {
  title: string;
  description: string;
}

export interface ResumeData {
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  summary: string;
  skills: string[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  projects?: ProjectEntry[];
  achievements?: AchievementEntry[];
}

export interface CoverLetterData {
  name: string;
  jobTitle: string;
  company: string;
  paragraphs: string[];
}

export interface UserInputData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
  };
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: string[];
  projects: ProjectEntry[];
  achievements: AchievementEntry[];
}

// Generate resume using both user input and AI enhancement
export const generateResume = (
  jobTitle: string, 
  jobDescription: string, 
  userInput?: UserInputData
): ResumeData => {
  // If user provided their information, use it as a base and enhance with AI
  if (userInput) {
    console.log("Using user input for resume generation", userInput);
    
    // Build enhanced resume with user data
    return {
      jobTitle: jobTitle,
      name: userInput.personalInfo.name,
      email: userInput.personalInfo.email,
      phone: userInput.personalInfo.phone,
      summary: generateSummary(jobTitle, jobDescription, userInput),
      skills: enhanceSkills(userInput.skills, jobDescription),
      experience: userInput.experience.map(exp => enhanceExperience(exp, jobDescription)),
      education: userInput.education,
      projects: userInput.projects,
      achievements: userInput.achievements
    };
  }
  
  // Extract keywords from job description to use in the mock resume
  const keywordsFromJob = extractKeywords(jobDescription);
  const yearsOfExperience = estimateYearsRequired(jobDescription);
  const relevantSkills = generateRelevantSkills(jobDescription, keywordsFromJob);
  
  // Generate fallback data tailored to the job description
  return {
    jobTitle: jobTitle,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    summary: `Results-driven ${jobTitle} with ${yearsOfExperience}+ years of experience specializing in ${relevantSkills.slice(0, 3).join(", ")}. Proven track record of delivering high-quality results in fast-paced environments, with a focus on ${keywordsFromJob.slice(0, 2).join(" and ")}. Seeking to leverage my expertise to excel in the ${jobTitle} role.`,
    skills: relevantSkills,
    experience: generateExperienceEntries(jobTitle, jobDescription, keywordsFromJob, yearsOfExperience),
    education: [
      {
        degree: generateRelevantDegree(jobDescription),
        school: "University of Technology",
        date: `${new Date().getFullYear() - yearsOfExperience - 4} - ${new Date().getFullYear() - yearsOfExperience}`
      },
      {
        degree: "Bachelor of Science",
        school: "State University",
        date: `${new Date().getFullYear() - yearsOfExperience - 8} - ${new Date().getFullYear() - yearsOfExperience - 4}`
      }
    ]
  };
};

// Helper function to generate an AI-enhanced summary based on user input and job description
const generateSummary = (jobTitle: string, jobDescription: string, userInput: UserInputData): string => {
  // Extract experience years from user input
  const userExperience = userInput.experience || [];
  const totalYears = calculateTotalExperienceYears(userExperience);
  
  // Extract relevant user skills that match job description
  const relevantUserSkills = userInput.skills.filter(skill => 
    jobDescription.toLowerCase().includes(skill.toLowerCase())
  );
  
  // Use most relevant skills, or fall back to top skills if none directly match
  const highlightedSkills = relevantUserSkills.length > 0 
    ? relevantUserSkills.slice(0, 3) 
    : userInput.skills.slice(0, 3);
  
  // Extract user's most recent experience
  const mostRecentRole = userExperience.length > 0 ? userExperience[0] : null;
  const mostRecentCompany = mostRecentRole?.company || "previous organizations";
  
  // Create a tailored summary connecting user background to the job
  return `Results-driven ${jobTitle} with ${totalYears}+ years of experience specializing in ${highlightedSkills.join(", ")}. Proven track record of success at ${mostRecentCompany}, delivering high-quality results while meeting tight deadlines. Seeking to leverage my expertise in ${userInput.skills.slice(0, 2).join(" and ")} to excel in this ${jobTitle} role.`;
};

// Calculate total years of experience from user input
const calculateTotalExperienceYears = (experience: ExperienceEntry[]): number => {
  if (experience.length === 0) return 2; // Default if no experience
  
  let totalYears = 0;
  experience.forEach(exp => {
    const dateRange = exp.date;
    
    // Try to extract years from date strings like "2018 - 2021" or "Jan 2018 - Present"
    const yearPattern = /(\d{4})\s*-\s*(\d{4}|Present)/i;
    const match = dateRange.match(yearPattern);
    
    if (match) {
      const startYear = parseInt(match[1]);
      const endYear = match[2].toLowerCase() === 'present' 
        ? new Date().getFullYear() 
        : parseInt(match[2]);
      
      totalYears += (endYear - startYear);
    } else {
      // If we can't parse the date format, add a reasonable default (2 years)
      totalYears += 2;
    }
  });
  
  return Math.max(totalYears, 1); // Ensure at least 1 year of experience
};

// Helper function to enhance user-provided skills with job-relevant ones
const enhanceSkills = (userSkills: string[], jobDescription: string): string[] => {
  // Extract skills from job description
  const jobSkills = extractKeywords(jobDescription);
  
  // Start with user's skills
  const enhancedSkills = [...userSkills];
  
  // Add relevant job skills that user doesn't already have listed
  jobSkills.forEach(skill => {
    if (!enhancedSkills.some(userSkill => 
      userSkill.toLowerCase() === skill.toLowerCase() ||
      userSkill.toLowerCase().includes(skill.toLowerCase()) ||
      skill.toLowerCase().includes(userSkill.toLowerCase())
    )) {
      // Only add if we don't have too many skills already
      if (enhancedSkills.length < 10) {
        enhancedSkills.push(skill);
      }
    }
  });
  
  return enhancedSkills;
};

// Helper function to enhance experience bullet points based on job description
const enhanceExperience = (experience: ExperienceEntry, jobDescription: string): ExperienceEntry => {
  const jobKeywords = extractKeywords(jobDescription);
  
  // If the experience entry already has good descriptions, keep them
  if (experience.description.length >= 3 && 
      experience.description.every(desc => desc.length > 30)) {
    return experience;
  }
  
  // Otherwise, enhance the descriptions or add new ones
  const enhancedDescription = [...experience.description];
  
  // Make sure we have at least 3 substantial bullet points
  while (enhancedDescription.length < 3 || 
         enhancedDescription.some(desc => desc.length < 30)) {
    
    // Generate a new bullet point using job keywords
    const newBulletPoint = generateBulletPoint(
      experience.title, 
      jobKeywords,
      enhancedDescription // Avoid duplication
    );
    
    // Add the new bullet point if it's not too similar to existing ones
    if (!enhancedDescription.some(desc => 
        similarityScore(desc, newBulletPoint) > 0.7)) {
      enhancedDescription.push(newBulletPoint);
    }
    
    // Safety check to avoid infinite loops
    if (enhancedDescription.length >= 5) break;
  }
  
  return {
    ...experience,
    description: enhancedDescription
  };
};

// Simple similarity check between two strings (0-1 score)
const similarityScore = (str1: string, str2: string): number => {
  const set1 = new Set(str1.toLowerCase().split(' '));
  const set2 = new Set(str2.toLowerCase().split(' '));
  
  const intersection = new Set([...set1].filter(word => set2.has(word)));
  const union = new Set([...set1, ...set2]);
  
  return intersection.size / union.size;
};

// Generate a bullet point for work experience
const generateBulletPoint = (
  jobTitle: string, 
  keywords: string[],
  existingPoints: string[]
): string => {
  // Templates for bullet points
  const templates = [
    `Led initiatives to improve ${keywords[0]} processes, resulting in a 25% increase in team efficiency.`,
    `Collaborated with cross-functional teams to deliver ${keywords[1]} solutions that enhanced customer satisfaction.`,
    `Developed and implemented ${keywords[0]} strategies that reduced costs by 20% while maintaining quality.`,
    `Managed ${keywords[2]} projects from conception to completion, consistently meeting deadlines and budget constraints.`,
    `Created comprehensive ${keywords[1]} documentation that improved onboarding processes by 40%.`,
    `Streamlined ${keywords[0]} operations, resulting in a 30% reduction in processing time.`,
    `Spearheaded the adoption of new ${keywords[2]} technologies, increasing team productivity by 35%.`,
    `Mentored junior team members on ${keywords[1]} best practices, improving overall team performance.`
  ];
  
  // Pick a template that uses keywords not heavily used in existing points
  let selectedTemplate = templates[0];
  let lowestSimilarity = 1;
  
  for (const template of templates) {
    const maxSimilarity = Math.max(
      ...existingPoints.map(point => similarityScore(point, template))
    );
    
    if (maxSimilarity < lowestSimilarity) {
      lowestSimilarity = maxSimilarity;
      selectedTemplate = template;
    }
  }
  
  return selectedTemplate;
};

// Generate cover letter with optional user input
export const generateCoverLetter = (
  jobTitle: string, 
  jobDescription: string, 
  companyName: string = "Company",
  userName?: string
): CoverLetterData => {
  const name = userName || "Alex Johnson";
  const jobKeywords = extractKeywords(jobDescription).slice(0, 3);
  const skills = generateRelevantSkills(jobDescription, jobKeywords).slice(0, 4);
  
  return {
    name: name,
    jobTitle: jobTitle,
    company: companyName,
    paragraphs: [
      `I am writing to express my interest in the ${jobTitle} position at ${companyName}. With my background in ${skills[0]} and ${skills[1]}, I am confident in my ability to make significant contributions to your team.`,
      
      `Throughout my career, I have developed expertise in ${jobKeywords.join(", ")}, which are directly applicable to this role. My experience has equipped me with a comprehensive understanding of ${skills[2]} and the ability to ${skills[3]}, making me well-suited for the challenges of this position.`,
      
      `What particularly draws me to ${companyName} is your commitment to ${extractCompanyValues(jobDescription)}. I am excited about the opportunity to bring my skills and experience to a team that values these principles.`,
      
      `I am particularly interested in this role because it aligns with my professional goals of advancing in ${jobTitle.split(" ")[0]} while working on meaningful projects that make a difference. My ability to ${generateStrengthFromJobDescription(jobDescription)} would be valuable assets to your team.`,
      
      `Thank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and experience would be an ideal fit for the ${jobTitle} position at ${companyName}.`
    ]
  };
};

// Extract keywords from job description
const extractKeywords = (jobDescription: string): string[] => {
  // Common skills and qualities to look for
  const commonKeywords = [
    'communication', 'leadership', 'teamwork', 'problem-solving', 'analytical',
    'project management', 'time management', 'customer service', 'sales',
    'marketing', 'development', 'programming', 'design', 'research',
    'analysis', 'strategy', 'planning', 'organization', 'detail-oriented',
    'creative', 'innovative', 'technical', 'interpersonal', 'written',
    'verbal', 'presentation', 'negotiation', 'collaboration', 'adaptability',
    'flexibility', 'initiative', 'motivation', 'results-driven', 'goal-oriented',
    'data analysis', 'reporting', 'budgeting', 'forecasting', 'quality assurance',
    'process improvement', 'critical thinking', 'decision making', 'training',
    'mentoring', 'agile', 'scrum', 'waterfall', 'lean', 'six sigma'
  ];
  
  // Find which keywords appear in the job description
  const matchedKeywords = commonKeywords.filter(keyword => 
    jobDescription.toLowerCase().includes(keyword.toLowerCase())
  );
  
  // If we found at least 5 keywords, return them; otherwise, use generic ones
  if (matchedKeywords.length >= 5) {
    return matchedKeywords.slice(0, 10);
  }
  
  // Default keywords for different job categories
  const defaultKeywords = {
    'engineer': ['technical design', 'problem-solving', 'development', 'testing', 'debugging'],
    'manager': ['leadership', 'team management', 'strategic planning', 'budgeting', 'performance review'],
    'marketing': ['campaign management', 'market research', 'content creation', 'social media', 'analytics'],
    'sales': ['client relationships', 'negotiation', 'prospecting', 'closing deals', 'customer service'],
    'design': ['user experience', 'visual design', 'prototyping', 'user research', 'creative direction'],
    'analyst': ['data analysis', 'reporting', 'research', 'visualization', 'trend identification'],
    'developer': ['coding', 'debugging', 'software development', 'testing', 'version control'],
    'assistant': ['scheduling', 'correspondence', 'organization', 'customer service', 'office management']
  };
  
  // Check if job title contains any of the category keywords
  for (const [category, keywords] of Object.entries(defaultKeywords)) {
    if (jobTitle && jobTitle.toLowerCase().includes(category.toLowerCase())) {
      return [...matchedKeywords, ...keywords];
    }
  }
  
  // If all else fails, return generic professional keywords
  return [
    'communication', 'teamwork', 'problem-solving', 'time management', 
    'collaboration', 'attention to detail', 'project management', 
    'critical thinking', 'adaptability', 'organization'
  ];
};

// Generate relevant skills based on job description
const generateRelevantSkills = (jobDescription: string, keywords: string[]): string[] => {
  // Base skills on extracted keywords
  const baseSkills = keywords.map(keyword => 
    keyword.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  );
  
  // Add some generic professional skills if needed
  const genericSkills = [
    'Communication', 'Leadership', 'Problem Solving', 'Team Collaboration',
    'Critical Thinking', 'Attention to Detail', 'Project Management',
    'Time Management', 'Strategic Planning', 'Decision Making'
  ];
  
  // Combine and return unique skills (up to 10)
  const combinedSkills = [...new Set([...baseSkills, ...genericSkills])];
  return combinedSkills.slice(0, 10);
};

// Estimate years of experience required from job description
const estimateYearsRequired = (jobDescription: string): number => {
  // Look for patterns like "X+ years" or "X years of experience"
  const yearPatterns = [
    /(\d+)\+?\s*years?/i,
    /(\d+)\+?\s*years?\s*of\s*experience/i,
    /experience\s*of\s*(\d+)\+?\s*years?/i,
    /minimum\s*of\s*(\d+)\+?\s*years?/i
  ];
  
  for (const pattern of yearPatterns) {
    const match = jobDescription.match(pattern);
    if (match && match[1]) {
      return parseInt(match[1]);
    }
  }
  
  // Default values based on job level indicators
  if (jobDescription.match(/senior|lead|principal|manager|director|head/i)) {
    return 5;
  } else if (jobDescription.match(/junior|entry\s*level|intern|assistant/i)) {
    return 1;
  }
  
  // Default middle-level experience
  return 3;
};

// Generate experience entries based on job description
const generateExperienceEntries = (
  jobTitle: string, 
  jobDescription: string, 
  keywords: string[], 
  yearsOfExperience: number
): ExperienceEntry[] => {
  const currentYear = new Date().getFullYear();
  const entries: ExperienceEntry[] = [];
  
  // Current/most recent position
  entries.push({
    title: jobTitle.includes('Senior') ? jobTitle : `Senior ${jobTitle}`,
    company: "Innovate Technologies Inc.",
    date: `${currentYear - 2} - Present`,
    description: generateBulletPoints(jobTitle, keywords, 4)
  });
  
  // Previous position
  if (yearsOfExperience > 2) {
    entries.push({
      title: jobTitle.replace('Senior', '').trim(),
      company: "Progress Solutions LLC",
      date: `${currentYear - 5} - ${currentYear - 2}`,
      description: generateBulletPoints(jobTitle, keywords, 3, true)
    });
  }
  
  // Earlier position for more experienced roles
  if (yearsOfExperience > 5) {
    entries.push({
      title: `Junior ${jobTitle.replace('Senior', '').trim()}`,
      company: "First Step Systems",
      date: `${currentYear - 7} - ${currentYear - 5}`,
      description: generateBulletPoints(jobTitle, keywords, 3, true, true)
    });
  }
  
  return entries;
};

// Generate bullet points for experience sections
const generateBulletPoints = (
  jobTitle: string, 
  keywords: string[], 
  count: number,
  isPrevious = false,
  isJunior = false
): string[] => {
  const bullets: string[] = [];
  const achievements = ['20%', '25%', '30%', '35%', '40%'];
  const randomAchievement = () => achievements[Math.floor(Math.random() * achievements.length)];
  
  const templates = [
    `Led initiatives to improve ${keywords[0]} processes, resulting in a ${randomAchievement()} increase in efficiency.`,
    `Managed cross-functional teams to deliver ${keywords[1]} solutions on time and within budget.`,
    `Developed and implemented ${keywords[0]} strategies that reduced costs by ${randomAchievement()}.`,
    `Oversaw ${keywords[2]} projects from conception to completion, ensuring alignment with business objectives.`,
    `Created comprehensive ${keywords[1]} documentation that improved process clarity by ${randomAchievement()}.`,
    `Conducted ${keywords[0]} training sessions for team members, enhancing overall department performance.`,
    `Streamlined ${keywords[2]} operations, resulting in a ${randomAchievement()} reduction in processing time.`,
    `Collaborated with stakeholders to identify and address ${keywords[1]} challenges.`,
    `Initiated and led the adoption of new ${keywords[0]} technologies, increasing productivity by ${randomAchievement()}.`,
    `Mentored junior team members in ${keywords[2]} best practices and professional development.`,
  ];
  
  const previousTemplates = [
    `Assisted in the development of ${keywords[0]} initiatives that improved team performance.`,
    `Contributed to ${keywords[1]} projects that delivered measurable business results.`,
    `Supported the implementation of ${keywords[2]} processes that enhanced operational efficiency.`,
    `Participated in cross-functional teams focused on ${keywords[0]} improvements.`,
    `Helped design and execute ${keywords[1]} strategies aligned with company objectives.`,
  ];
  
  const juniorTemplates = [
    `Supported senior staff in executing ${keywords[0]} initiatives.`,
    `Assisted with data collection and analysis for ${keywords[1]} projects.`,
    `Helped prepare documentation for ${keywords[2]} processes and procedures.`,
    `Participated in team meetings and contributed ideas for ${keywords[0]} improvements.`,
    `Learned and applied ${keywords[1]} methodologies under senior guidance.`,
  ];
  
  // Select appropriate templates based on career stage
  const selectedTemplates = isJunior ? juniorTemplates : 
                           (isPrevious ? previousTemplates : templates);
  
  // Generate unique bullet points
  while (bullets.length < count) {
    const randomIndex = Math.floor(Math.random() * selectedTemplates.length);
    const bullet = selectedTemplates[randomIndex];
    
    if (!bullets.includes(bullet)) {
      bullets.push(bullet);
    }
    
    // Safeguard against infinite loops
    if (bullets.length === selectedTemplates.length) {
      break;
    }
  }
  
  return bullets;
};

// Generate a relevant degree based on job description
const generateRelevantDegree = (jobDescription: string): string => {
  const description = jobDescription.toLowerCase();
  
  if (description.includes('software') || description.includes('developer') || 
      description.includes('programming') || description.includes('code')) {
    return 'Master of Science in Computer Science';
  } else if (description.includes('business') || description.includes('management') || 
             description.includes('strategy') || description.includes('operations')) {
    return 'Master of Business Administration';
  } else if (description.includes('marketing') || description.includes('brand') || 
             description.includes('communications') || description.includes('social media')) {
    return 'Master of Arts in Marketing';
  } else if (description.includes('data') || description.includes('analytics') || 
             description.includes('statistics') || description.includes('analysis')) {
    return 'Master of Science in Data Science';
  } else if (description.includes('design') || description.includes('ux') || 
             description.includes('ui') || description.includes('user experience')) {
    return 'Master of Fine Arts in Design';
  } else if (description.includes('finance') || description.includes('accounting') || 
             description.includes('financial') || description.includes('budget')) {
    return 'Master of Science in Finance';
  } else if (description.includes('human resources') || description.includes('hr') || 
             description.includes('talent') || description.includes('recruiting')) {
    return 'Master of Science in Human Resources Management';
  } else {
    return 'Master of Science in Business Analytics';
  }
};

// Extract company values from job description
const extractCompanyValues = (jobDescription: string): string => {
  const commonValues = [
    'innovation and excellence',
    'quality and customer satisfaction',
    'integrity and transparency',
    'teamwork and collaboration',
    'diversity and inclusion',
    'sustainability and social responsibility',
    'continuous improvement and learning',
    'employee development and well-being'
  ];
  
  // Randomly select company values that sound good
  const randomIndex = Math.floor(Math.random() * commonValues.length);
  return commonValues[randomIndex];
};

// Generate strength from job description
const generateStrengthFromJobDescription = (jobDescription: string): string => {
  const strengths = [
    'effectively communicate complex ideas to diverse audiences',
    'lead teams through challenging projects with clear direction',
    'analyze data to derive actionable insights',
    'develop innovative solutions to complex problems',
    'build strong relationships with stakeholders at all levels',
    'adapt quickly to changing priorities and environments',
    'manage multiple projects while maintaining attention to detail',
    'translate technical concepts into business benefits'
  ];
  
  const randomIndex = Math.floor(Math.random() * strengths.length);
  return strengths[randomIndex];
};

