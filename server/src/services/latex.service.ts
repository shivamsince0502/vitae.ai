import { ResumeData } from '../types/resume';
import fs from 'fs/promises';
import path from 'path';
import { generateLatexContent } from './ai.service';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  filename: string;
}

const TEMPLATES: Template[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'A clean and traditional resume template suitable for corporate roles',
    preview: '/templates/professional.jpeg',
    filename: 'professional.tex'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'A contemporary design with accent colors and modern typography',
    preview: '/templates/modern.jpeg',
    filename: 'modern.tex'
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Perfect for academic positions, focusing on research and publications',
    preview: '/templates/academic.jpeg',
    filename: 'academic.tex'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'A unique design for creative professionals',
    preview: '/templates/creative.jpeg',
    filename: 'creative.tex'
  }
];

export async function getTemplates(): Promise<Template[]> {
  return TEMPLATES;
}

export async function getTemplateById(id: string): Promise<Template | null> {
  return TEMPLATES.find(t => t.id === id) || null;
}

export async function getTemplateContent(templateId: string): Promise<string> {
  const template = await getTemplateById(templateId);
  if (!template) {
    throw new Error('Template not found');
  }

  const templatePath = path.join(__dirname, '../templates', template.filename);
  return fs.readFile(templatePath, 'utf-8');
}

export async function generateLatexResume(resumeData: any, templateId: string): Promise<string> {
  try {
    // Get template content
    const templateContent = await getTemplateContent(templateId);
    
    // Generate LaTeX content using AI
    const latexCode = await generateLatexContent(resumeData, templateContent);
    
    // Replace template placeholders with generated content
    let finalContent = latexCode;
    console.log('Final LaTeX Content:', finalContent);
    
    // Replace each section placeholder with its content
    // Object.entries(latexSections).forEach(([section, content]) => {
    //   const placeholder = `{{${section}}}`;
    //   finalContent = finalContent.replace(placeholder, content as string);
    // });
    
    // Write the generated content to a temporary file
    const tempDir = path.join(__dirname, '../temp');
    await fs.mkdir(tempDir, { recursive: true });
    const tempFile = path.join(tempDir, 'resume.tex');
    await fs.writeFile(tempFile, finalContent);

    return finalContent;
  } catch (error) {
    console.error('LaTeX Generation Error:', error);
    throw new Error('Failed to generate LaTeX content');
  }
}