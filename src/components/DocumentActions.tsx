
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, 
  Mail, 
  Copy, 
  Printer,
  RotateCcw,
  Edit
} from 'lucide-react';
import { 
  downloadPdf, 
  copyToClipboard, 
  emailDocument, 
  printDocument, 
  resumeToText, 
  coverLetterToText 
} from '@/utils/documentExport';
import { useNavigate } from 'react-router-dom';

interface DocumentActionsProps {
  documentType: 'resume' | 'cover-letter';
  resumeData?: any;
  coverLetterData?: any;
}

const DocumentActions = ({ documentType, resumeData, coverLetterData }: DocumentActionsProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleDownload = () => {
    const fileName = `${documentType === 'resume' ? 'Resume' : 'Cover_Letter'}_${new Date().toISOString().split('T')[0]}`;
    const success = downloadPdf(documentType, fileName);
    
    if (success) {
      toast({
        title: `Downloaded ${documentType.replace('-', ' ')}`,
        description: `Your ${documentType.replace('-', ' ')} has been downloaded as PDF.`,
      });
    }
  };
  
  const handleCopy = async () => {
    let text = '';
    if (documentType === 'resume' && resumeData) {
      text = resumeToText(resumeData);
    } else if (documentType === 'cover-letter' && coverLetterData) {
      text = coverLetterToText(coverLetterData);
    } else {
      toast({
        title: "Error",
        description: "Could not find document data to copy",
        variant: "destructive"
      });
      return;
    }
    
    const success = await copyToClipboard(text);
    if (success) {
      toast({
        title: `Copied ${documentType.replace('-', ' ')}`,
        description: `Your ${documentType.replace('-', ' ')} has been copied to clipboard.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleEmail = () => {
    const subject = `My ${documentType === 'resume' ? 'Resume' : 'Cover Letter'}`;
    const success = emailDocument(subject);
    
    if (success) {
      toast({
        title: `Emailed ${documentType.replace('-', ' ')}`,
        description: `Your email client has been opened with your ${documentType.replace('-', ' ')}.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to open email client.",
        variant: "destructive"
      });
    }
  };
  
  const handlePrint = () => {
    printDocument();
    toast({
      title: `Printed ${documentType.replace('-', ' ')}`,
      description: `Your ${documentType.replace('-', ' ')} has been sent to printer.`,
    });
  };
  
  const handleEdit = () => {
    // In a real app, this would open a document editor
    toast({
      title: `Editing ${documentType.replace('-', ' ')}`,
      description: `Edit mode activated for your ${documentType.replace('-', ' ')}.`,
    });
  };
  
  const handleRegenerate = () => {
    navigate('/generator');
    toast({
      title: "Regenerating document",
      description: "Please enter job description details again to regenerate.",
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-base mb-2">Document Actions</h3>
      
      <div className="space-y-2">
        <Button 
          variant="default" 
          className="w-full justify-start"
          onClick={handleDownload}
        >
          <Download className="mr-2 h-4 w-4" />
          Download as PDF
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={handleCopy}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy to clipboard
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={handleEmail}
        >
          <Mail className="mr-2 h-4 w-4" />
          Email document
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={handlePrint}
        >
          <Printer className="mr-2 h-4 w-4" />
          Print document
        </Button>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h3 className="font-medium text-base mb-2">Editing Options</h3>
        
        <div className="space-y-2">
          <Button 
            variant="secondary" 
            className="w-full justify-start"
            onClick={handleEdit}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit document
          </Button>
          
          <Button 
            variant="secondary" 
            className="w-full justify-start"
            onClick={handleRegenerate}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Regenerate document
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentActions;
