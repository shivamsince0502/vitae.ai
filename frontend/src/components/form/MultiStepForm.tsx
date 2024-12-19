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
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';

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

interface MultiStepFormProps {
  onSubmit: (data: FormData) => void;
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

export function MultiStepForm({ onSubmit }: MultiStepFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    {
      title: 'Personal Information',
      description: 'Start with your basic contact details',
      icon: <FileText className="w-5 h-5" />,
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
      description: 'Add your educational background',
      icon: <FileText className="w-5 h-5" />,
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
      description: 'Share your work experience',
      icon: <FileText className="w-5 h-5" />,
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
      description: 'List your technical and soft skills',
      icon: <FileText className="w-5 h-5" />,
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
      description: 'Highlight your key projects',
      icon: <FileText className="w-5 h-5" />,
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
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{steps[currentStep].title}</h2>
            <p className="text-gray-400">{steps[currentStep].description}</p>
          </div>
          <span className="text-sm text-gray-400">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        <div className="flex gap-2">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                index <= currentStep ? 'bg-sky-500' : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="mb-8">
        {isSubmitting ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loading className="w-8 h-8 text-sky-500" />
            <p className="mt-4 text-gray-400">Generating your resume...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {steps[currentStep].component}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t border-gray-800">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0 || isSubmitting}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </Button>
        {currentStep === steps.length - 1 ? (
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-sky-500 hover:bg-sky-600 flex items-center gap-2"
          >
            Generate Resume <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button 
            onClick={handleNext} 
            disabled={isSubmitting}
            className="bg-sky-500 hover:bg-sky-600 flex items-center gap-2"
          >
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
