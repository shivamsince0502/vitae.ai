'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Loading } from '@/components/ui/loading';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  filename: string;
}
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default function TemplatesPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [resumeData, setResumeData] = useState<any>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get the stored resume data
    const storedData = localStorage.getItem('resumeData');
    if (storedData) {
      setResumeData(JSON.parse(storedData));
    }

    // Fetch templates from the server
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch(BASE_URL + '/api/resume/templates');
      const data = await response.json();
      if (data.success) {
        setTemplates(data.templates);
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    if (selectedTemplate && resumeData) {
      // Store the selected template
      localStorage.setItem('selectedTemplate', selectedTemplate);
      router.push('/editor');
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0f172a] text-white py-16">
        <div className="container mx-auto max-w-[1200px] px-4 flex flex-col items-center justify-center">
          <Loading className="w-8 h-8 text-sky-500" />
          <p className="mt-4 text-gray-400">Loading templates...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-white py-16">
      <div className="container mx-auto max-w-[1200px] px-4">
        <h1 className="text-3xl font-bold text-center mb-12">
          Choose Your Template
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`
                relative rounded-lg overflow-hidden cursor-pointer bg-[#1e293b]
                ${selectedTemplate === template.id ? 'ring-2 ring-sky-500' : 'hover:ring-2 hover:ring-sky-500/50'}
                transition-all duration-200
              `}
              onClick={() => setSelectedTemplate(template.id)}
            >
              <img
                src={BASE_URL + template.preview}
                alt={template.name}
                className="w-full aspect-[3/4] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-100">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold mb-1">{template.name}</h3>
                  <p className="text-sm text-gray-300">{template.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center max-w-[800px] mx-auto">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className="bg-sky-500 hover:bg-sky-600 flex items-center gap-2"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}
