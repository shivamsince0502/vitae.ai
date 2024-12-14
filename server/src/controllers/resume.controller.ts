import { Request, Response } from 'express';
import { analyzeAndGenerateResume } from '../services/ai.service';
import { parseResume } from '../services/parser.service';
import { getTemplates as getLatexTemplates, generateLatexResume } from '../services/latex.service';
import { compileLaTeX, cleanupTemp } from '../services/compiler.service';
import { UploadedFile } from 'express-fileupload';
import fs from 'fs';
import path from 'path';

// Available resume templates


export const getTemplates = async (req: Request, res: Response) => {
  try {
    const latexTemplates = await getLatexTemplates();
    res.json({
      success: true,
      templates: [...latexTemplates]
    });
  } catch (error) {
    console.error('Get Templates Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch templates'
    });
  }
};

export const uploadResume = async (req: Request, res: Response) => {
  try {
    // Check if file exists
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }

    // Get the uploaded file
    const resumeFile = req.files.resume as UploadedFile;

    // Validate file type (optional)
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(resumeFile.mimetype)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid file type. Please upload a PDF or DOCX file.' 
      });
    }

    // Debug logging
    console.log('File details:', {
      name: resumeFile.name,
      mimetype: resumeFile.mimetype,
      size: resumeFile.size,
      tempFilePath: resumeFile.tempFilePath,
      data: resumeFile.data ? `Buffer of ${resumeFile.data.length} bytes` : 'No data'
    });

    // Ensure file has data
    if (!resumeFile.data || resumeFile.data.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Uploaded file is empty' 
      });
    }

    // Parse the uploaded resume
    const parsedData = await parseResume(resumeFile);
    
    res.json({ 
      success: true, 
      data: parsedData 
    });
  } catch (error) {
    console.error('Resume Upload Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to upload and parse resume',
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error instanceof Error ? error.stack : null
    });
  }
};

export const generateResume = async (req: Request, res: Response) => {
  try {
    const { formData, templateId } = req.body;

    // Validate input
    if (!formData || !templateId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing form data or template ID' 
      });
    }

    // Generate LaTeX content
    const latexContent = await generateLatexResume(formData, templateId);

    // Compile LaTeX to PDF
    const pdfPath = await compileLaTeX(latexContent);

    // Create a URL for the PDF
    const pdfUrl = `/temp/${path.basename(pdfPath)}`;

    // Schedule cleanup after 5 minutes
    setTimeout(() => {
      cleanupTemp().catch(console.error);
    }, 5 * 60 * 1000);

    res.json({
      success: true,
      latexContent,
      pdfUrl
    });
  } catch (error) {
    console.error('Resume Generation Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate resume',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const compilePdf = async (req: Request, res: Response) => {
  try {
    const { latex } = req.body;

    if (!latex) {
      return res.status(400).json({
        success: false,
        message: 'No LaTeX content provided'
      });
    }

    // Compile LaTeX to PDF
    const pdfPath = await compileLaTeX(latex);

    // Create a URL for the PDF
    const pdfUrl = `/temp/${path.basename(pdfPath)}`;

    // Schedule cleanup after 5 minutes
    setTimeout(() => {
      cleanupTemp().catch(console.error);
    }, 5 * 60 * 1000);

    res.json({
      success: true,
      pdfUrl
    });
  } catch (error) {
    console.error('PDF Compilation Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to compile PDF',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
