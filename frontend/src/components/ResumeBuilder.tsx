'use client';

import { useState } from 'react';
import ResumeForm from './ResumeForm';
import ResumeUpload from './ResumeUpload';
import TemplateSelector from './TemplateSelector';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Download, FileUp, FormInput, RefreshCw } from 'lucide-react';

type Step = 'input-method' | 'upload' | 'form' | 'template' | 'result';

export default function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState<Step>('input-method');
  const [formData, setFormData] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [generatedResume, setGeneratedResume] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileUpload = async (parsedData: any) => {
    setFormData(parsedData);
    setCurrentStep('template');
  };

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    setCurrentStep('template');
  };

  const handleTemplateSelect = async (templateId: string) => {
    setSelectedTemplate(templateId);
    setIsGenerating(true);
    try {
      const response = await fetch('http://localhost:3002/api/resume/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          templateId,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedResume(data.content);
        setCurrentStep('result');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error generating resume:', error);
      alert('Failed to generate resume. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadResume = () => {
    const blob = new Blob([generatedResume], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto bg-zinc-900 rounded-lg shadow-lg p-8 border border-zinc-800">
      {currentStep === 'input-method' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-8 text-white">Choose Input Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button
              onClick={() => setCurrentStep('upload')}
              variant="outline"
              className="h-40 flex flex-col items-center justify-center gap-4 text-lg bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
            >
              <FileUp className="h-8 w-8 text-zinc-300" />
              <div>
                <h3 className="font-medium text-white">Upload Resume</h3>
                <p className="text-sm text-zinc-400 mt-1">PDF or DOCX format</p>
              </div>
            </Button>
            <Button
              onClick={() => setCurrentStep('form')}
              variant="outline"
              className="h-40 flex flex-col items-center justify-center gap-4 text-lg bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
            >
              <FormInput className="h-8 w-8 text-zinc-300" />
              <div>
                <h3 className="font-medium text-white">Fill Form</h3>
                <p className="text-sm text-zinc-400 mt-1">Enter details manually</p>
              </div>
            </Button>
          </div>
        </div>
      )}

      {currentStep === 'upload' && (
        <ResumeUpload onUploadComplete={handleFileUpload} />
      )}

      {currentStep === 'form' && (
        <ResumeForm onSubmit={handleFormSubmit} />
      )}

      {currentStep === 'template' && (
        <Dialog open={isGenerating} onOpenChange={setIsGenerating}>
          <TemplateSelector onSelect={handleTemplateSelect} />
          <DialogContent>
            <div className="flex items-center justify-center p-6">
              <RefreshCw className="h-6 w-6 animate-spin mr-2 text-white" />
              <p className="text-white">Generating your resume...</p>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {currentStep === 'result' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">Generated Resume</h2>
            <div className="space-x-4">
              <Button
                onClick={() => setCurrentStep('input-method')}
                variant="outline"
                className="bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white"
              >
                Start Over
              </Button>
              <Button 
                onClick={downloadResume}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          <div className="whitespace-pre-wrap border border-zinc-800 rounded-lg p-6 bg-zinc-800 font-mono text-sm text-zinc-300">
            {generatedResume}
          </div>
        </div>
      )}
    </div>
  );
}
