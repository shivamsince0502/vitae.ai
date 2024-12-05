"use client";

import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

interface PersonalInfoProps {
  data: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  onChange: (data: PersonalInfoProps['data']) => void;
}

export function PersonalInfo({ data, onChange }: PersonalInfoProps) {
  const handleChange = (field: keyof PersonalInfoProps['data']) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...data,
      [field]: e.target.value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={handleChange('fullName')}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={handleChange('email')}
            placeholder="john.doe@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={handleChange('phone')}
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={data.location}
            onChange={handleChange('location')}
            placeholder="San Francisco, CA"
            required
          />
        </div>
      </div>

      <div className="pt-4">
        <h3 className="text-lg font-medium mb-4">Social Links (Optional)</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn Profile</Label>
            <Input
              id="linkedin"
              value={data.linkedin}
              onChange={handleChange('linkedin')}
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub Profile</Label>
            <Input
              id="github"
              value={data.github}
              onChange={handleChange('github')}
              placeholder="https://github.com/johndoe"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="portfolio">Portfolio Website</Label>
            <Input
              id="portfolio"
              value={data.portfolio}
              onChange={handleChange('portfolio')}
              placeholder="https://johndoe.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
