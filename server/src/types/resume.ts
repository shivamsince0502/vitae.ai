export type ContentType = 'experience' | 'project' | 'skills' | 'summary';

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  portfolio?: string;
  linkedin?: string;
  github?: string;
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
  courses?: string[];
}

export interface Experience {
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Project {
  name: string;
  description: string[];
  technologies: string[];
  startDate?: string;
  endDate?: string;
  link?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
}

export interface ResumeAnalysis {
  score: number;
  feedback: {
    overall: string;
    sections: {
      personalInfo: string[];
      education: string[];
      experience: string[];
      skills: string[];
      projects: string[];
    };
  };
  keywords: string[];
  improvements: string[];
}
