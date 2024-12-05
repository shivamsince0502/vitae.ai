import latex from 'node-latex';
import temp from 'temp';
import fs from 'fs';
import path from 'path';
import { uploadPDF } from './storage.service';

// Automatically track and cleanup temporary files
temp.track();

export async function generatePDF(latexContent: string, userId: string): Promise<string> {
  try {
    // Create temporary directory for LaTeX files
    const tempDir = await temp.mkdir('latex-');
    
    // Write LaTeX content to temporary file
    const texFilePath = path.join(tempDir, 'resume.tex');
    await fs.writeFileSync(texFilePath, latexContent);

    // Create a read stream from the LaTeX file
    const input = fs.createReadStream(texFilePath);
    const pdfPath = path.join(tempDir, 'resume.pdf');
    const output = fs.createWriteStream(pdfPath);

    // Generate PDF using node-latex
    const pdf = latex(input);
    pdf.pipe(output);

    await new Promise((resolve, reject) => {
      pdf.on('finish', resolve);
      pdf.on('error', reject);
    });

    // Read the generated PDF
    const pdfBuffer = await fs.readFileSync(pdfPath);

    // Upload to Firebase Storage
    const pdfUrl = await uploadPDF(pdfBuffer, userId);

    return pdfUrl;
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw new Error('Failed to generate PDF');
  }
}

export async function validateLatex(latexContent: string): Promise<{ valid: boolean; errors?: string[] }> {
  try {
    // Create temporary directory for validation
    const tempDir = await temp.mkdir('latex-validate-');
    const texFilePath = path.join(tempDir, 'validate.tex');
    
    // Write content to temporary file
    await fs.writeFileSync(texFilePath, latexContent);

    // Try to compile
    const result = await latex(fs.createReadStream(texFilePath));

    if (!result.readable) {
      return {
        valid: false,
        errors: result.errored ? [result.errored.message] : [],
      };
    }

    return { valid: true };
  } catch (error) {
    console.error('LaTeX Validation Error:', error);
    return {
      valid: false,
      errors: [(error as Error).message],
    };
  }
}

export async function customizeTemplate(
  template: string,
  customizations: { [key: string]: string }
): Promise<string> {
  try {
    let customizedTemplate = template;
    
    // Apply each customization
    for (const [key, value] of Object.entries(customizations)) {
      const placeholder = `{{${key}}}`;
      customizedTemplate = customizedTemplate.replace(
        new RegExp(placeholder, 'g'),
        value
      );
    }

    return customizedTemplate;
  } catch (error) {
    console.error('Template Customization Error:', error);
    throw new Error('Failed to customize template');
  }
}

export async function cleanupTempFiles(): Promise<void> {
  try {
    await temp.cleanup();
  } catch (error) {
    console.error('Cleanup Error:', error);
  }
}
