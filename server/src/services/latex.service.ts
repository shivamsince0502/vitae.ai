import { ResumeData } from '../types/resume';
import fs from 'fs/promises';
import path from 'path';
import { generateLatexContent } from './ai.service';

export async function generateLatexResume(resumeData: ResumeData): Promise<string> {
  try {
    // Generate LaTeX content using AI
    const latexContent = await generateLatexContent(resumeData);
    
    // Write the generated content to a temporary file
    const tempDir = path.join(__dirname, '../temp');
    await fs.mkdir(tempDir, { recursive: true });
    const tempFile = path.join(tempDir, 'resume.tex');
    await fs.writeFile(tempFile, latexContent);

    return latexContent;
  } catch (error) {
    console.error('LaTeX Generation Error:', error);
    throw new Error('Failed to generate LaTeX content');
  }
}