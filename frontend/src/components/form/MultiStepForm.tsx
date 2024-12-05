"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { Loading } from '../ui/loading';
import { PersonalInfo } from './steps/PersonalInfo';
import { Education } from './steps/Education';
import { Experience } from './steps/Experience';
import { Skills } from './steps/Skills';
import { Projects } from './steps/Projects';

interface FormData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  education: Array<{
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
  };
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
}

const initialFormData: FormData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
  },
  education: [{
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
  }],
  experience: [{
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  }],
  skills: {
    technical: [],
    soft: [],
    languages: [],
  },
  projects: [{
    name: '',
    description: '',
    technologies: [],
  }],
};

export function MultiStepForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    {
      title: 'Personal Information',
      component: (
        <PersonalInfo
          data={formData.personalInfo}
          onChange={(data) =>
            setFormData((prev) => ({ ...prev, personalInfo: data }))
          }
        />
      ),
    },
    {
      title: 'Education',
      component: (
        <Education
          data={formData.education}
          onChange={(data) =>
            setFormData((prev) => ({ ...prev, education: data }))
          }
        />
      ),
    },
    {
      title: 'Experience',
      component: (
        <Experience
          data={formData.experience}
          onChange={(data) =>
            setFormData((prev) => ({ ...prev, experience: data }))
          }
        />
      ),
    },
    {
      title: 'Skills',
      component: (
        <Skills
          data={formData.skills}
          onChange={(data) =>
            setFormData((prev) => ({ ...prev, skills: data }))
          }
        />
      ),
    },
    {
      title: 'Projects',
      component: (
        <Projects
          data={formData.projects}
          onChange={(data) =>
            setFormData((prev) => ({ ...prev, projects: data }))
          }
        />
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Send form data to API for LaTeX generation
      console.log('Submitting form data:', formData);
      router.push('/editor');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Create Your Resume</h1>
          <span className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <div className="flex gap-2">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`flex-1 h-2 rounded-full ${
                index <= currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{steps[currentStep].title}</h2>
        {isSubmitting ? (
          <Loading text="Generating your resume..." />
        ) : (
          <div className="space-y-4">
            {steps[currentStep].component}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0 || isSubmitting}
        >
          Previous
        </Button>
        {currentStep === steps.length - 1 ? (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            Generate Resume
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={isSubmitting}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
