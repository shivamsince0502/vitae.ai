"use client";

import { Plus, Trash2 } from 'lucide-react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';

interface EducationEntry {
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

interface EducationProps {
  data: EducationEntry[];
  onChange: (data: EducationEntry[]) => void;
}

export function Education({ data, onChange }: EducationProps) {
  const handleChange = (index: number, field: keyof EducationEntry) => (
    e: React.ChangeEvent<HTMLInputElement>
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
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
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
              <Label htmlFor={`school-${index}`}>School/University *</Label>
              <Input
                id={`school-${index}`}
                value={entry.school}
                onChange={handleChange(index, 'school')}
                placeholder="Stanford University"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`degree-${index}`}>Degree *</Label>
              <Input
                id={`degree-${index}`}
                value={entry.degree}
                onChange={handleChange(index, 'degree')}
                placeholder="Bachelor of Science"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`field-${index}`}>Field of Study *</Label>
              <Input
                id={`field-${index}`}
                value={entry.field}
                onChange={handleChange(index, 'field')}
                placeholder="Computer Science"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`gpa-${index}`}>GPA (Optional)</Label>
              <Input
                id={`gpa-${index}`}
                value={entry.gpa}
                onChange={handleChange(index, 'gpa')}
                placeholder="3.8/4.0"
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
                required
              />
            </div>
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
        Add Another Education
      </Button>
    </div>
  );
}
