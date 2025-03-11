
// Mock data for resume generation

export interface ResumeData {
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
}

export interface CoverLetterData {
  name: string;
  jobTitle: string;
  company: string;
  paragraphs: string[];
}

// This is a mock function that would be replaced with an actual API call
export const generateResume = (jobTitle: string, jobDescription: string): ResumeData => {
  // In a real application, this would make an API call to an AI service
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

// This is a mock function for cover letter generation
export const generateCoverLetter = (jobTitle: string, jobDescription: string, companyName: string = "Company"): CoverLetterData => {
  // In a real application, this would make an API call to an AI service
  return {
    name: "Alex Johnson",
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
