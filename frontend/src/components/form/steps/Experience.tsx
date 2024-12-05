"use client";

import { Plus, Trash2 } from 'lucide-react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Textarea } from '../../ui/textarea';

interface ExperienceEntry {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceProps {
  data: ExperienceEntry[];
  onChange: (data: ExperienceEntry[]) => void;
}

export function Experience({ data, onChange }: ExperienceProps) {
  const handleChange = (index: number, field: keyof ExperienceEntry) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [field]: e.target.value,
    };
    onChange(newData);
  };

  const handleAdd = () => {
    onChange([
      ...data,
      {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {data.map((entry, index) => (
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
              <Label htmlFor={`company-${index}`}>Company *</Label>
              <Input
                id={`company-${index}`}
                value={entry.company}
                onChange={handleChange(index, 'company')}
                placeholder="Google"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`position-${index}`}>Position *</Label>
              <Input
                id={`position-${index}`}
                value={entry.position}
                onChange={handleChange(index, 'position')}
                placeholder="Software Engineer"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`location-${index}`}>Location *</Label>
              <Input
                id={`location-${index}`}
                value={entry.location}
                onChange={handleChange(index, 'location')}
                placeholder="Mountain View, CA"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`startDate-${index}`}>Start Date *</Label>
              <Input
                id={`startDate-${index}`}
                type="month"
                value={entry.startDate}
                onChange={handleChange(index, 'startDate')}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`endDate-${index}`}>End Date *</Label>
              <Input
                id={`endDate-${index}`}
                type="month"
                value={entry.endDate}
                onChange={handleChange(index, 'endDate')}
                placeholder="Present"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`description-${index}`}>Description *</Label>
            <Textarea
              id={`description-${index}`}
              value={entry.description}
              onChange={handleChange(index, 'description')}
              placeholder="• Developed and maintained key features for Google Search
• Led a team of 5 engineers in redesigning the mobile search experience
• Improved search performance by 40% through optimization initiatives"
              className="h-32"
              required
            />
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
        Add Another Experience
      </Button>
    </div>
  );
}
