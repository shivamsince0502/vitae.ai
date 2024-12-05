import { ResumeData } from '../types/resume';

export async function analyzeResumeContent(resumeData: ResumeData): Promise<any> {
  const analysis = {
    score: 0,
    feedback: {
      overall: '',
      sections: {
        personalInfo: [],
        education: [],
        experience: [],
        skills: [],
        projects: []
      }
    },
    keywords: [],
    improvements: []
  };

  // Analyze Personal Information
  analyzePersonalInfo(resumeData.personalInfo, analysis);

  // Analyze Education
  analyzeEducation(resumeData.education, analysis);

  // Analyze Experience
  analyzeExperience(resumeData.experience, analysis);

  // Analyze Skills
  analyzeSkills(resumeData.skills, analysis);

  // Analyze Projects
  analyzeProjects(resumeData.projects, analysis);

  // Calculate overall score
  calculateOverallScore(analysis);

  return analysis;
}

function analyzePersonalInfo(personalInfo: any, analysis: any) {
  const requiredFields = ['name', 'email', 'phone'];
  const optionalFields = ['location', 'portfolio', 'linkedin'];
  
  requiredFields.forEach(field => {
    if (!personalInfo[field]) {
      analysis.feedback.sections.personalInfo.push(
        `Missing ${field} - this is a required field`
      );
      analysis.score -= 5;
    }
  });

  optionalFields.forEach(field => {
    if (personalInfo[field]) {
      analysis.score += 2;
    } else {
      analysis.feedback.sections.personalInfo.push(
        `Consider adding ${field} for better professional presence`
      );
    }
  });
}

function analyzeEducation(education: any[], analysis: any) {
  if (!education.length) {
    analysis.feedback.sections.education.push('No education entries found');
    analysis.score -= 10;
    return;
  }

  education.forEach(edu => {
    // Check for required fields
    if (!edu.degree || !edu.school || !edu.startDate || !edu.endDate) {
      analysis.feedback.sections.education.push(
        'Missing required education information'
      );
      analysis.score -= 5;
    }

    // Bonus for GPA if it's good
    if (edu.gpa && parseFloat(edu.gpa) >= 3.5) {
      analysis.score += 5;
    }
  });
}

function analyzeExperience(experience: any[], analysis: any) {
  if (!experience.length) {
    analysis.feedback.sections.experience.push('No work experience entries found');
    analysis.score -= 15;
    return;
  }

  experience.forEach(exp => {
    // Check for required fields
    if (!exp.position || !exp.company || !exp.startDate || !exp.endDate) {
      analysis.feedback.sections.experience.push(
        'Missing required work experience information'
      );
      analysis.score -= 5;
    }

    // Analyze description bullets
    if (exp.description && exp.description.length > 0) {
      exp.description.forEach((bullet: string) => {
        // Check for action verbs
        if (!/^(Led|Developed|Created|Managed|Implemented|Achieved|Increased|Decreased|Improved|Reduced)/i.test(bullet)) {
          analysis.feedback.sections.experience.push(
            'Use strong action verbs to start bullet points'
          );
        }

        // Check for metrics
        if (!/\d+%|\d+x|\$\d+|\d+ [a-zA-Z]+/i.test(bullet)) {
          analysis.feedback.sections.experience.push(
            'Include quantifiable achievements in bullet points'
          );
        }
      });
    }
  });
}

function analyzeSkills(skills: any[], analysis: any) {
  if (!skills.length) {
    analysis.feedback.sections.skills.push('No skills listed');
    analysis.score -= 10;
    return;
  }

  const skillCategories = new Set(skills.map(s => s.category));
  
  // Check for diverse skill categories
  if (skillCategories.size < 3) {
    analysis.feedback.sections.skills.push(
      'Consider adding more skill categories (e.g., Technical, Soft Skills, Languages)'
    );
  }

  skills.forEach(skillGroup => {
    if (!skillGroup.items || skillGroup.items.length === 0) {
      analysis.feedback.sections.skills.push(
        `Empty skill category: ${skillGroup.category}`
      );
      analysis.score -= 5;
    }
  });
}

function analyzeProjects(projects: any[], analysis: any) {
  if (!projects.length) {
    analysis.feedback.sections.projects.push(
      'Consider adding projects to showcase practical experience'
    );
    return;
  }

  projects.forEach(project => {
    // Check for required fields
    if (!project.name || !project.description || !project.technologies) {
      analysis.feedback.sections.projects.push(
        'Missing required project information'
      );
      analysis.score -= 5;
    }

    // Check for technical details
    if (project.description.length < 2) {
      analysis.feedback.sections.projects.push(
        'Add more detail to project descriptions'
      );
    }

    // Check for technology stack
    if (!project.technologies || project.technologies.length < 2) {
      analysis.feedback.sections.projects.push(
        'List more technologies used in projects'
      );
    }
  });
}

function calculateOverallScore(analysis: any) {
  // Base score is 100
  analysis.score = Math.min(Math.max(analysis.score + 100, 0), 100);

  // Generate overall feedback based on score
  if (analysis.score >= 90) {
    analysis.feedback.overall = 'Excellent resume! Minor improvements suggested.';
  } else if (analysis.score >= 80) {
    analysis.feedback.overall = 'Strong resume with some areas for improvement.';
  } else if (analysis.score >= 70) {
    analysis.feedback.overall = 'Good foundation, but needs significant improvement.';
  } else {
    analysis.feedback.overall = 'Requires major improvements to be competitive.';
  }
}
