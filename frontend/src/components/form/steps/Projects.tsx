"use client";

import { Plus, Trash2, X } from 'lucide-react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';

interface ProjectEntry {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface ProjectsProps {
  data: ProjectEntry[];
  onChange: (data: ProjectEntry[]) => void;
}

export function Projects({ data, onChange }: ProjectsProps) {
  const handleChange = (index: number, field: keyof ProjectEntry) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [field]: e.target.value,
    };
    onChange(newData);
  };

  const handleTechKeyPress = (index: number) => (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newData = [...data];
      newData[index] = {
        ...newData[index],
        technologies: [...newData[index].technologies, e.currentTarget.value.trim()],
      };
      onChange(newData);
      e.currentTarget.value = '';
    }
  };

  const handleRemoveTech = (projectIndex: number, techIndex: number) => {
    const newData = [...data];
    newData[projectIndex] = {
      ...newData[projectIndex],
      technologies: newData[projectIndex].technologies.filter(
        (_, i) => i !== techIndex
      ),
    };
    onChange(newData);
  };

  const handleAdd = () => {
    onChange([
      ...data,
      {
        name: '',
        description: '',
        technologies: [],
        link: '',
      },
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {data.map((project, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4 relative">
          {index > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => handleRemove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`name-${index}`}>Project Name *</Label>
              <Input
                id={`name-${index}`}
                value={project.name}
                onChange={handleChange(index, 'name')}
                placeholder="AI Resume Builder"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`link-${index}`}>Project Link</Label>
              <Input
                id={`link-${index}`}
                value={project.link}
                onChange={handleChange(index, 'link')}
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${index}`}>Description *</Label>
            <Textarea
              id={`description-${index}`}
              value={project.description}
              onChange={handleChange(index, 'description')}
              placeholder="• Built a web application that helps users create professional resumes
• Implemented AI-powered content suggestions using OpenAI's GPT-3
• Integrated real-time LaTeX preview and PDF export functionality"
              className="h-32"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Technologies Used *</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(index, techIndex)}
                    className="ml-2 hover:text-primary/70"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <Input
              placeholder="e.g., React, TypeScript, Next.js"
              onKeyPress={handleTechKeyPress(index)}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Press Enter to add a technology
            </p>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleAdd}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Project
      </Button>
    </div>
  );
}
