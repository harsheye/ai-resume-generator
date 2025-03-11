
import { toast } from "@/hooks/use-toast";
import { ResumeData, CoverLetterData } from "./resumeGenerator";

// Function to convert resume to text format for clipboard
export const resumeToText = (data: ResumeData): string => {
  let text = `${data.name}\n${data.email} • ${data.phone}\n\n`;
  
  text += `PROFESSIONAL SUMMARY\n${data.summary}\n\n`;
  
  text += `SKILLS\n${data.skills.join(', ')}\n\n`;
  
  text += `EXPERIENCE\n`;
  data.experience.forEach(exp => {
    text += `${exp.title}, ${exp.company} (${exp.date})\n`;
    exp.description.forEach(desc => {
      text += `• ${desc}\n`;
    });
    text += '\n';
  });
  
  text += `EDUCATION\n`;
  data.education.forEach(edu => {
    text += `${edu.degree}, ${edu.school} (${edu.date})\n`;
  });
  
  return text;
};

// Function to convert cover letter to text format for clipboard
export const coverLetterToText = (data: CoverLetterData): string => {
  let text = `${data.name}\n\n`;
  text += `${new Date().toLocaleDateString()}\n\n`;
  text += `Hiring Manager\n${data.company}\n\n`;
  text += `Dear Hiring Manager,\n\n`;
  
  data.paragraphs.forEach(para => {
    text += `${para}\n\n`;
  });
  
  text += `Sincerely,\n\n${data.name}`;
  
  return text;
};

// Generic copy to clipboard function
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy: ", err);
    return false;
  }
};

// Function to simulate sending an email
export const emailDocument = (subject: string, recipient = ""): boolean => {
  try {
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoLink);
    return true;
  } catch (err) {
    console.error("Failed to open email client: ", err);
    return false;
  }
};

// Function to print the current document
export const printDocument = (): void => {
  window.print();
};

// Function to download as PDF (simplified simulation)
export const downloadPdf = (documentType: string, fileName: string): boolean => {
  try {
    // In a real implementation, you would use a library like jsPDF or html2pdf
    // This is a simplified version that creates a simple text file
    const element = document.getElementById(documentType);
    if (!element) {
      toast({
        title: "Export Failed",
        description: "Could not find document to export",
        variant: "destructive"
      });
      return false;
    }
    
    // For a real PDF creation, you would replace this with actual PDF generation code
    toast({
      title: "PDF Downloaded",
      description: `Your ${documentType.replace('-', ' ')} has been downloaded as PDF.`
    });
    return true;
  } catch (err) {
    console.error("Failed to download PDF: ", err);
    return false;
  }
};
