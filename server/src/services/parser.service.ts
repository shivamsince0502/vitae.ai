import { UploadedFile } from 'express-fileupload';
import mammoth from 'mammoth';
import pdf from 'pdf-parse';
import fs from 'fs';

export async function parseResume(file: UploadedFile) {
  try {
    const fileType = file.mimetype;
    let parsedData: string = '';
    let fileBuffer: Buffer | null = null;

    // Extremely verbose logging
    console.log('Full file object:', JSON.stringify(file, null, 2));
    console.log('Parsing resume:', {
      name: file.name,
      mimetype: file.mimetype,
      size: file.size,
      tempFilePath: file.tempFilePath,
      dataType: typeof file.data,
      dataLength: file.data ? file.data.length : 'No data',
      dataBuffer: file.data ? file.data.toString('base64').slice(0, 100) : 'No data'
    });

    // Try multiple methods to get file data
    if (file.data && file.data.length > 0) {
      fileBuffer = file.data;
    } else if (file.tempFilePath && fs.existsSync(file.tempFilePath)) {
      fileBuffer = fs.readFileSync(file.tempFilePath);
    } else if (file.name) {
      try {
        fileBuffer = fs.readFileSync(file.name);
      } catch (readError) {
        console.error('Failed to read file by name:', readError);
      }
    }

    // Validate file buffer
    if (!fileBuffer || fileBuffer.length === 0) {
      throw new Error('Unable to read file buffer. No data found.');
    }

    // Parse based on file type
    if (fileType === 'application/pdf') {
      const pdfData = await pdf(fileBuffer);
      parsedData = pdfData.text;
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      parsedData = result.value;
    } else {
      throw new Error('Unsupported file type');
    }

    // Validate parsed data
    if (!parsedData || parsedData.trim().length === 0) {
      throw new Error('Unable to extract text from the document');
    }

    // Basic parsing of the text into sections
    const sections = parseTextIntoSections(parsedData);
    
    // Log extracted text (first 500 characters)
    console.log('Extracted text (first 500 chars):', parsedData.slice(0, 500));

    return sections;
  } catch (error) {
    console.error('Comprehensive Resume Parsing Error:', {
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorStack: error instanceof Error ? error.stack : 'No stack trace',
      fileDetails: {
        name: file.name,
        mimetype: file.mimetype,
        size: file.size
      }
    });
    
    // Return a structured object with empty fields to maintain consistency
    return {
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        location: ''
      },
      education: [],
      experience: [],
      skills: [],
      rawText: error instanceof Error ? error.message : 'Parsing failed'
    };
  }
}

function parseTextIntoSections(text: string) {
  // This is a basic implementation - you might want to use more sophisticated parsing
  const sections = {
    personalInfo: extractPersonalInfo(text),
    education: extractEducation(text),
    experience: extractExperience(text),
    skills: extractSkills(text),
    rawText: text
  };

  return sections;
}

function extractPersonalInfo(text: string) {
  // Basic extraction of name, email, phone, etc.
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const phoneRegex = /\b(\+\d{1,2}\s?)?(\d{3}[-.]?)?\d{3}[-.]?\d{4}\b/;

  return {
    name: extractName(text),
    email: (text.match(emailRegex) || [])[0] || '',
    phone: (text.match(phoneRegex) || [])[0] || '',
    location: extractLocation(text)
  };
}

function extractName(text: string): string {
  // Simple name extraction - this is very basic and might need improvement
  const namePatterns = [
    /^([A-Z][a-z]+ [A-Z][a-z]+)/,  // First Last
    /^([A-Z][a-z]+ [A-Z][a-z]+ [A-Z][a-z]+)/,  // First Middle Last
  ];

  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }

  return '';
}

function extractLocation(text: string): string {
  // Basic location extraction
  const locationPatterns = [
    /\b([\w\s]+), ([\w\s]+) (\d{5})\b/,  // City, State Zip
    /\b([\w\s]+), ([\w\s]+)\b/,  // City, State
  ];

  for (const pattern of locationPatterns) {
    const match = text.match(pattern);
    if (match) return match[0];
  }

  return '';
}

function extractEducation(text: string) {
  // Extract education information
  const educationKeywords = ['university', 'college', 'school', 'degree', 'bachelor', 'master', 'phd'];
  
  const educationEntries = educationKeywords.flatMap(keyword => {
    const regex = new RegExp(`(?:.*${keyword}.*)`, 'gi');
    const matches = text.match(regex) || [];
    return matches.map(match => ({
      institution: '',
      degree: '',
      description: match.trim()
    }));
  });

  return educationEntries;
}

function extractExperience(text: string) {
  // Extract work experience
  const experienceKeywords = ['work experience', 'professional experience', 'employment', 'job', 'position'];
  
  const experienceEntries = experienceKeywords.flatMap(keyword => {
    const regex = new RegExp(`(?:.*${keyword}.*)`, 'gi');
    const matches = text.match(regex) || [];
    return matches.map(match => ({
      company: '',
      title: '',
      description: match.trim()
    }));
  });

  return experienceEntries;
}

function extractSkills(text: string) {
  // Extract skills
  const skillKeywords = ['skills', 'technical skills', 'expertise', 'proficiencies'];
  
  const skillEntries = skillKeywords.flatMap(keyword => {
    const regex = new RegExp(`(?:.*${keyword}.*)`, 'gi');
    const matches = text.match(regex) || [];
    return matches.map(match => match.trim());
  });

  return skillEntries;
}
