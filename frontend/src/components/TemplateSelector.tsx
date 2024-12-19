'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
}

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void;
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string>('');

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch(BASE_URL+'/api/resume/templates');
      const data = await response.json();
      if (data.success) {
        setTemplates(data.templates);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      alert('Failed to fetch templates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = () => {
    if (selectedId) {
      onSelect(selectedId);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-blue-500 mb-4" />
        <p className="text-gray-600">Loading templates...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Choose a Template</h2>
        <Button
          variant="outline"
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setSelectedId(template.id)}
            className={`
              group relative border rounded-lg overflow-hidden cursor-pointer transition-all
              ${selectedId === template.id ? 'ring-2 ring-blue-500' : 'hover:border-gray-300'}
            `}
          >
            <div className="aspect-[3/4] relative">
              <img
                src={ BASE_URL+ template.preview}
                alt={template.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className={`
                absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity
                ${selectedId === template.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
              `}>
                <span className="text-white font-medium">
                  {selectedId === template.id ? 'Selected' : 'Click to select'}
                </span>
              </div>
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-medium mb-1">{template.name}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSelect}
          disabled={!selectedId}
        >
          Generate Resume
        </Button>
      </div>
    </div>
  );
}
