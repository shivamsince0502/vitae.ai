'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PlusCircle, MinusCircle } from 'lucide-react';

interface ResumeFormProps {
  onSubmit: (data: any) => void;
}

export default function ResumeForm({ onSubmit }: ResumeFormProps) {
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: ''
    },
    education: [{
      school: '',
      degree: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: ''
    }],
    experience: [{
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ['']
    }],
    skills: [{
      category: '',
      items: ['']
    }]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const handleDescriptionChange = (expIndex: number, descIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex ? {
          ...exp,
          description: exp.description.map((desc, j) => 
            j === descIndex ? value : desc
          )
        } : exp
      )
    }));
  };

  const handleSkillsChange = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const handleSkillItemChange = (skillIndex: number, itemIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === skillIndex ? {
          ...skill,
          items: skill.items.map((item, j) => 
            j === itemIndex ? value : item
          )
        } : skill
      )
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        school: '',
        degree: '',
        location: '',
        startDate: '',
        endDate: '',
        gpa: ''
      }]
    }));
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ['']
      }]
    }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addDescription = (expIndex: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex ? {
          ...exp,
          description: [...exp.description, '']
        } : exp
      )
    }));
  };

  const removeDescription = (expIndex: number, descIndex: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex ? {
          ...exp,
          description: exp.description.filter((_, j) => j !== descIndex)
        } : exp
      )
    }));
  };

  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, {
        category: '',
        items: ['']
      }]
    }));
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addSkillItem = (skillIndex: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === skillIndex ? {
          ...skill,
          items: [...skill.items, '']
        } : skill
      )
    }));
  };

  const removeSkillItem = (skillIndex: number, itemIndex: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === skillIndex ? {
          ...skill,
          items: skill.items.filter((_, j) => j !== itemIndex)
        } : skill
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Personal Information</h2>
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Back
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.personalInfo.name}
              onChange={handlePersonalInfoChange}
              className="input"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.personalInfo.email}
              onChange={handlePersonalInfoChange}
              className="input"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.personalInfo.phone}
              onChange={handlePersonalInfoChange}
              className="input"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.personalInfo.location}
              onChange={handlePersonalInfoChange}
              className="input"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <input
              id="linkedin"
              type="url"
              name="linkedin"
              value={formData.personalInfo.linkedin}
              onChange={handlePersonalInfoChange}
              className="input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub URL</Label>
            <input
              id="github"
              type="url"
              name="github"
              value={formData.personalInfo.github}
              onChange={handlePersonalInfoChange}
              className="input"
            />
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Education</h2>
          <Button
            type="button"
            variant="outline"
            onClick={addEducation}
            size="sm"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>
        {formData.education.map((edu, index) => (
          <div key={index} className="relative space-y-4 p-4 border rounded">
            <div className="absolute top-4 right-4">
              {formData.education.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(index)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>School</Label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Degree</Label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>GPA</Label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                  className="input"
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Experience */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Experience</h2>
          <Button
            type="button"
            variant="outline"
            onClick={addExperience}
            size="sm"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </div>
        {formData.experience.map((exp, expIndex) => (
          <div key={expIndex} className="relative space-y-4 p-4 border rounded">
            <div className="absolute top-4 right-4">
              {formData.experience.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeExperience(expIndex)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company</Label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(expIndex, 'company', e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Position</Label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(expIndex, 'position', e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => handleExperienceChange(expIndex, 'location', e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => handleExperienceChange(expIndex, 'startDate', e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => handleExperienceChange(expIndex, 'endDate', e.target.value)}
                  className="input"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Description</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addDescription(expIndex)}
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Description
                </Button>
              </div>
              {exp.description.map((desc, descIndex) => (
                <div key={descIndex} className="flex gap-2">
                  <input
                    type="text"
                    value={desc}
                    onChange={(e) => handleDescriptionChange(expIndex, descIndex, e.target.value)}
                    className="input flex-1"
                    required
                  />
                  {exp.description.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDescription(expIndex, descIndex)}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <Button
            type="button"
            variant="outline"
            onClick={addSkill}
            size="sm"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Skill Category
          </Button>
        </div>
        {formData.skills.map((skill, skillIndex) => (
          <div key={skillIndex} className="relative space-y-4 p-4 border rounded">
            <div className="absolute top-4 right-4">
              {formData.skills.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(skillIndex)}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <input
                  type="text"
                  value={skill.category}
                  onChange={(e) => handleSkillsChange(skillIndex, 'category', e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Skills</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addSkillItem(skillIndex)}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Skill
                  </Button>
                </div>
                {skill.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleSkillItemChange(skillIndex, itemIndex, e.target.value)}
                      className="input flex-1"
                      required
                    />
                    {skill.items.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkillItem(skillIndex, itemIndex)}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="flex justify-end">
        <Button type="submit">
          Continue
        </Button>
      </div>
    </form>
  );
}
