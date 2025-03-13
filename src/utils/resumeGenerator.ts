
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
  
  // Fallback to mock data if no user input is provided
  return {
    jobTitle: jobTitle,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
    summary: "Results-driven professional with 5+ years of experience in developing innovative solutions. Strong background in project management, team leadership, and strategic planning. Proven track record of delivering high-quality results while meeting tight deadlines.",
    skills: [
      "Project Management",
      "Team Leadership",
      "Strategic Planning",
      "Problem Solving",
      "Communication",
      "Data Analysis",
      "Process Improvement",
      "Client Relations"
    ],
    experience: [
      {
        title: "Senior Project Manager",
        company: "Tech Innovations Inc.",
        date: "2020 - Present",
        description: [
          "Led cross-functional teams of 10+ members to deliver projects on time and within budget.",
          "Implemented project management methodologies that increased efficiency by 30%.",
          "Developed and maintained relationships with key stakeholders, ensuring 95% client satisfaction.",
          "Introduced new processes that reduced project delivery time by 25%."
        ]
      },
      {
        title: "Project Coordinator",
        company: "Global Solutions Ltd.",
        date: "2018 - 2020",
        description: [
          "Coordinated project activities across departments, ensuring seamless execution.",
          "Prepared comprehensive project documentation, reports, and presentations.",
          "Conducted risk assessments and developed mitigation strategies.",
          "Assisted in resource allocation and scheduling for multiple concurrent projects."
        ]
      },
      {
        title: "Business Analyst",
        company: "Data Systems Corp.",
        date: "2016 - 2018",
        description: [
          "Analyzed business requirements and translated them into functional specifications.",
          "Collaborated with development teams to ensure proper implementation of requirements.",
          "Conducted user acceptance testing and documented results.",
          "Provided training and support to end-users during system implementation."
        ]
      }
    ],
    education: [
      {
        degree: "Master of Business Administration",
        school: "University of Management",
        date: "2014 - 2016"
      },
      {
        degree: "Bachelor of Science in Information Technology",
        school: "Tech University",
        date: "2010 - 2014"
      }
    ]
  };
};

// Helper function to generate an AI-enhanced summary based on user input and job description
const generateSummary = (jobTitle: string, jobDescription: string, userInput: UserInputData): string => {
  // Here we would integrate with an actual AI API
  // For now, we'll simulate by creating a summary that mentions user's experience and skills
  
  const yearsOfExperience = userInput.experience.length > 0 ? userInput.experience.length * 2 : 5;
  const topSkills = userInput.skills.slice(0, 3).join(", ");
  
  return `Results-driven ${jobTitle} with ${yearsOfExperience}+ years of experience specializing in ${topSkills}. Proven track record of success in previous roles at ${userInput.experience[0]?.company || "previous companies"}. Analytical problem-solver who delivers high-quality results while meeting tight deadlines.`;
}

// Helper function to enhance user-provided skills with job-relevant ones
const enhanceSkills = (userSkills: string[], jobDescription: string): string[] => {
  // This would use AI to analyze the job description and suggest additional skills
  // For now, we'll just return the user's skills plus some common ones that might be relevant
  const commonSkills = [
    "Communication",
    "Problem Solving",
    "Time Management",
    "Teamwork",
    "Adaptability"
  ];
  
  // Add some common skills if the user didn't provide enough
  const enhancedSkills = [...userSkills];
  if (enhancedSkills.length < 8) {
    for (const skill of commonSkills) {
      if (!enhancedSkills.includes(skill) && enhancedSkills.length < 8) {
        enhancedSkills.push(skill);
      }
    }
  }
  
  return enhancedSkills;
}

// Helper function to enhance experience bullet points based on job description
const enhanceExperience = (experience: ExperienceEntry, jobDescription: string): ExperienceEntry => {
  // Here we would use AI to enhance the bullet points to better match the job description
  // For now, we'll just return the same experience
  return experience;
}

// Generate cover letter with optional user input
export const generateCoverLetter = (
  jobTitle: string, 
  jobDescription: string, 
  companyName: string = "Company",
  userName?: string
): CoverLetterData => {
  const name = userName || "Alex Johnson";
  
  return {
    name: name,
    jobTitle: jobTitle,
    company: companyName,
    paragraphs: [
      `I am writing to express my interest in the ${jobTitle} position at ${companyName}. With over 5 years of experience in developing innovative solutions and a proven track record of success, I am confident in my ability to make significant contributions to your team.`,
      
      "Throughout my career, I have demonstrated strong capabilities in project management, team leadership, and strategic planning. At Tech Innovations Inc., I led cross-functional teams to deliver projects on time and within budget, while implementing methodologies that increased efficiency by 30%.",
      
      "My experience as a Project Coordinator at Global Solutions Ltd. equipped me with exceptional organizational and communication skills. I coordinated activities across departments, prepared comprehensive documentation, and conducted risk assessments to ensure project success.",
      
      "I am particularly drawn to your company's commitment to innovation and excellence. I am excited about the opportunity to bring my skills and experience to your team and contribute to your continued success.",
      
      "Thank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and experience would be an ideal fit for this position."
    ]
  };
};
