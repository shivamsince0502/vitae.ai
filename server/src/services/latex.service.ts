import { ResumeData } from '../types/resume';
import fs from 'fs/promises';
import path from 'path';

export async function generateLatexResume(resumeData: ResumeData): Promise<string> {
  try {
    // Load LaTeX template
    const templatePath = path.join(__dirname, '../templates/resume.tex');
    const template = await fs.readFile(templatePath, 'utf-8');

    // Replace placeholders with actual data
    let latexContent = template;
    
    // Personal Information
    latexContent = latexContent.replace('{{name}}', resumeData.personalInfo.name);
    latexContent = latexContent.replace('{{email}}', resumeData.personalInfo.email);
    latexContent = latexContent.replace('{{phone}}', resumeData.personalInfo.phone);
    latexContent = latexContent.replace('{{location}}', resumeData.personalInfo.location);
    
    // Education Section
    let educationContent = '';
    for (const edu of resumeData.education) {
      educationContent += `\\education
      {${edu.degree}}
      {${edu.school}}
      {${edu.location}}
      {${edu.startDate} - ${edu.endDate}}
      {${edu.gpa ? `GPA: ${edu.gpa}` : ''}}
      `;
    }
    latexContent = latexContent.replace('{{education}}', educationContent);
    
    // Experience Section
    let experienceContent = '';
    for (const exp of resumeData.experience) {
      let bulletPoints = exp.description
        .map(point => `\\item ${point}`)
        .join('\n');
        
      experienceContent += `\\experience
      {${exp.position}}
      {${exp.company}}
      {${exp.location}}
      {${exp.startDate} - ${exp.endDate}}
      {\\begin{itemize}
        ${bulletPoints}
      \\end{itemize}}
      `;
    }
    latexContent = latexContent.replace('{{experience}}', experienceContent);
    
    // Skills Section
    const skillsContent = resumeData.skills
      .map(skill => `\\textbf{${skill.category}:} ${skill.items.join(', ')}`)
      .join(' \\\\[0.5em] ');
    latexContent = latexContent.replace('{{skills}}', skillsContent);
    
    // Projects Section
    let projectsContent = '';
    for (const project of resumeData.projects) {
      let bulletPoints = project.description
        .map(point => `\\item ${point}`)
        .join('\n');
        
      projectsContent += `\\project
      {${project.name}}
      {${project.technologies.join(', ')}}
      {${project.startDate} - ${project.endDate}}
      {\\begin{itemize}
        ${bulletPoints}
      \\end{itemize}}
      `;
    }
    latexContent = latexContent.replace('{{projects}}', projectsContent);

    return latexContent;
  } catch (error) {
    console.error('LaTeX Generation Error:', error);
    throw new Error('Failed to generate LaTeX content');
  }
}
