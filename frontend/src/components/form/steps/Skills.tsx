"use client";

import { X } from 'lucide-react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';

interface SkillsData {
  technical: string[];
  soft: string[];
  languages: string[];
}

interface SkillsProps {
  data: SkillsData;
  onChange: (data: SkillsData) => void;
}

export function Skills({ data, onChange }: SkillsProps) {
  const handleKeyPress = (category: keyof SkillsData) => (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      e.preventDefault();
      onChange({
        ...data,
        [category]: [...data[category], e.currentTarget.value.trim()],
      });
      e.currentTarget.value = '';
    }
  };

  const handleRemove = (category: keyof SkillsData, index: number) => {
    onChange({
      ...data,
      [category]: data[category].filter((_, i) => i !== index),
    });
  };

  const renderSkillCategory = (
    category: keyof SkillsData,
    title: string,
    placeholder: string
  ) => (
    <div className="space-y-2">
      <Label>{title}</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {data[category].map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
          >
            {skill}
            <button
              type="button"
              onClick={() => handleRemove(category, index)}
              className="ml-2 hover:text-primary/70"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
      <Input
        placeholder={placeholder}
        onKeyPress={handleKeyPress(category)}
        className="mt-2"
      />
      <p className="text-sm text-muted-foreground mt-1">
        Press Enter to add a skill
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderSkillCategory(
        'technical',
        'Technical Skills',
        'e.g., React, Python, AWS'
      )}
      {renderSkillCategory(
        'soft',
        'Soft Skills',
        'e.g., Leadership, Communication'
      )}
      {renderSkillCategory(
        'languages',
        'Languages',
        'e.g., English (Native), Spanish (Fluent)'
      )}
    </div>
  );
}
