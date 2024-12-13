import { Request, Response } from 'express';
import { analyzeAndGenerateResume } from '../services/ai.service';
import { parseResume } from '../services/parser.service';
import { UploadedFile } from 'express-fileupload';
import fs from 'fs';

// Available resume templates
const templates = [
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean and professional layout with a focus on readability',
    thumbnail: '/templates/modern-minimal.png'
  },
  {
    id: 'creative-bold',
    name: 'Creative Bold',
    description: 'Vibrant design for creative professionals',
    thumbnail: '/templates/creative-bold.png'
  },
  {
    id: 'classic-elegant',
    name: 'Classic Elegant',
    description: 'Traditional and timeless resume format',
    thumbnail: '/templates/classic-elegant.png'
  }
];

export const getTemplates = (req: Request, res: Response) => {
  res.json({
    success: true,
    templates: templates
  });
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

    // Check if input is from form or parsed PDF
    let inputForAI;
    if (formData.personalInfo || formData.education || formData.experience || formData.skills) {
      // Form data input
      inputForAI = formData;
    } else if (typeof formData === 'string') {
      // PDF text input
      inputForAI = formData;
    } else {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid input format' 
      });
    }

    // Generate resume using AI service
    const generatedResume = await analyzeAndGenerateResume(inputForAI, templateId);

    res.json({
      success: true,
      content: generatedResume
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
