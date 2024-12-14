import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

export async function compileLaTeX(latexContent: string): Promise<string> {
  try {
    // Create temp directory if it doesn't exist
    const tempDir = path.join(__dirname, '../temp');
    await fs.mkdir(tempDir, { recursive: true });

    // Write LaTeX content to temp file
    const tempTexFile = path.join(tempDir, 'resume.tex');
    await fs.writeFile(tempTexFile, latexContent);

    // Compile LaTeX to PDF
    await execAsync(`pdflatex -interaction=nonstopmode -output-directory=${tempDir} ${tempTexFile}`);

    // Read the generated PDF
    const pdfPath = path.join(tempDir, 'resume.pdf');
    await fs.access(pdfPath); // Verify PDF exists

    return pdfPath;
  } catch (error) {
    console.error('LaTeX Compilation Error:', error);
    throw new Error('Failed to compile LaTeX to PDF');
  }
}

export async function cleanupTemp(): Promise<void> {
  try {
    const tempDir = path.join(__dirname, '../temp');
    const files = await fs.readdir(tempDir);
    
    await Promise.all(
      files.map(file => 
        fs.unlink(path.join(tempDir, file))
          .catch(err => console.error(`Failed to delete ${file}:`, err))
      )
    );
  } catch (error) {
    console.error('Cleanup Error:', error);
  }
}
