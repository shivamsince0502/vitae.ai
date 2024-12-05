"use client";


import { useState } from 'react';
import { Button } from '../ui/button';

interface ResumeSection {
  title: string;
  content: string;
}

export function ResumeForm() {
  const [sections, setSections] = useState<ResumeSection[]>([
    { title: 'Personal Information', content: '' },
    { title: 'Education', content: '' },
    { title: 'Experience', content: '' },
    { title: 'Skills', content: '' },
    { title: 'Projects', content: '' }
  ]);

  const [activeSection, setActiveSection] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleContentChange = (index: number, newContent: string) => {
    const newSections = [...sections];
    newSections[index].content = newContent;
    setSections(newSections);
  };

  const generateAISuggestion = async (sectionIndex: number) => {
    setIsGenerating(true);
    try {
      // TODO: Implement AI content generation
      // This will be connected to your backend API
      console.log(`Generating content for section: ${sections[sectionIndex].title}`);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-background rounded-lg">
      <div className="flex flex-col gap-4">
        {sections.map((section, index) => (
          <div
            key={section.title}
            className={`border rounded-lg p-4 ${
              activeSection === index ? 'border-primary' : 'border-border'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => generateAISuggestion(index)}
                disabled={isGenerating}
              >
                {isGenerating && activeSection === index ? 'Generating...' : 'AI Suggest'}
              </Button>
            </div>
            <textarea
              className="w-full h-32 p-2 bg-background border rounded-md"
              value={section.content}
              onChange={(e) => handleContentChange(index, e.target.value)}
              placeholder={`Enter your ${section.title.toLowerCase()}...`}
              onFocus={() => setActiveSection(index)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline">Preview</Button>
        <Button>Generate LaTeX</Button>
      </div>
    </div>
  );
}
