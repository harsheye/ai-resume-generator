
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Download, 
  Mail, 
  Copy, 
  Printer,
  RotateCcw,
  Edit
} from 'lucide-react';

interface DocumentActionsProps {
  documentType: 'resume' | 'cover-letter';
}

const DocumentActions = ({ documentType }: DocumentActionsProps) => {
  const { toast } = useToast();
  
  const handleAction = (action: string) => {
    toast({
      title: `${action} ${documentType.replace('-', ' ')}`,
      description: `Your ${documentType.replace('-', ' ')} has been ${action.toLowerCase()}d.`,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-base mb-2">Document Actions</h3>
      
      <div className="space-y-2">
        <Button 
          variant="default" 
          className="w-full justify-start"
          onClick={() => handleAction('Downloaded')}
        >
          <Download className="mr-2 h-4 w-4" />
          Download as PDF
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => handleAction('Copied')}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy to clipboard
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => handleAction('Emailed')}
        >
          <Mail className="mr-2 h-4 w-4" />
          Email document
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => handleAction('Printed')}
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
            onClick={() => handleAction('Edited')}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit document
          </Button>
          
          <Button 
            variant="secondary" 
            className="w-full justify-start"
            onClick={() => handleAction('Regenerated')}
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
