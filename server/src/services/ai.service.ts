import OpenAI from 'openai';
import dotenv from 'dotenv';

import { ContentType, ResumeData } from '../types/resume';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// export async function enhanceResumeContent(
//   content: string,
//   type: ContentType
// ): Promise<string> {
//   try {
//     const prompt = generatePrompt(content, type);
    
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         {
//           role: "system",
//           content: "You are an expert resume writer who helps improve resume content to be more impactful and ATS-friendly. Focus on using action verbs, quantifiable achievements, and clear, professional language."
//         },
//         {
//           role: "user",
//           content: prompt
//         }
//       ],
//       temperature: 0.7,
//       max_tokens: 500,
//     });

//     return completion.choices[0].message.content || content;
//   } catch (error) {
//     console.error('AI Enhancement Error:', error);
//     throw new Error('Failed to enhance content');
//   }
// }

// function generatePrompt(content: string, type: ContentType): string {
//   const prompts = {
//     experience: `Enhance this job experience description to be more impactful and ATS-friendly:
//     "${content}"
//     Focus on:
//     - Starting with strong action verbs
//     - Including quantifiable achievements
//     - Using relevant industry keywords
//     - Maintaining professional tone
//     - Highlighting impact and results`,
    
//     project: `Improve this project description to showcase technical skills and achievements:
//     "${content}"
//     Focus on:
//     - Technical implementation details
//     - Project impact and results
//     - Technologies used effectively
//     - Problem-solving approach
//     - Role and contributions`,
    
//     skills: `Optimize these skills for ATS scanning and professional presentation:
//     "${content}"
//     Focus on:
//     - Industry-standard terminology
//     - Proper formatting
//     - Relevant technical terms
//     - Skill categorization
//     - Current technology versions`,
    
//     summary: `Enhance this professional summary to be more compelling:
//     "${content}"
//     Focus on:
//     - Career highlights
//     - Unique value proposition
//     - Industry relevance
//     - Professional goals
//     - Core competencies`
//   };

//   return prompts[type] || prompts.experience;
// }

// export async function analyzeResumeContent(resumeData: any): Promise<any> {
//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         {
//           role: "system",
//           content: "You are an expert resume analyst who provides constructive feedback on resumes. Focus on content strength, ATS optimization, and professional presentation."
//         },
//         {
//           role: "user",
//           content: `Analyze this resume and provide feedback:
//           ${JSON.stringify(resumeData, null, 2)}
          
//           Provide feedback on:
//           1. Content strength and impact
//           2. ATS optimization
//           3. Professional presentation
//           4. Skills relevance
//           5. Areas for improvement`
//         }
//       ],
//       temperature: 0.7,
//       max_tokens: 1000,
//     });

//     return {
//       feedback: completion.choices[0].message.content,
//       timestamp: new Date().toISOString(),
//     };
//   } catch (error) {
//     console.error('Resume Analysis Error:', error);
//     throw new Error('Failed to analyze resume');
//   }
// }

export async function generateLatexContent(resumeData: any, templateContent: string): Promise<any> {
  try {
    let prompt;
    
    if (resumeData.rawText) {
      // Handle raw text from uploaded resume
      prompt = `Convert the following resume text into a professional LaTeX resume. Use the following template '${templateContent}'. The resume text is:

${resumeData.rawText}

Requirements:
1. Extract and organize information into appropriate sections
2. Use appropriate LaTeX commands and formatting
3. Ensure content is ATS-friendly
4. Include all relevant information from the source text
5. Return a Latex code which is following the template
6. Return the content in a string format with LaTeX code.Without any other text.[no prose]`;
    } else {
      // Handle structured form data
      prompt = `Generate a professional LaTeX resume using the following structured data. Use the following template '${templateContent}'.

Personal Information:
${JSON.stringify(resumeData.personalInfo, null, 2)}

Education:
${JSON.stringify(resumeData.education, null, 2)}

Experience:
${JSON.stringify(resumeData.experience, null, 2)}

Skills:
${JSON.stringify(resumeData.skills, null, 2)}

Projects:
${JSON.stringify(resumeData.projects, null, 2)}

Requirements:
1. Generate LaTeX code for each section
2. Use appropriate LaTeX commands and formatting
3. Ensure content is ATS-friendly
4. Return a Latex code which is following the template
5. Return the content in a string format with LaTeX code.Without any other text.[no prose]`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert LaTeX resume generator. You create professional, ATS-friendly resumes using LaTeX formatting. You always return content in a string format with LaTeX code.[no prose]"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1,
      max_tokens: 2500,
    });

    
    const response = completion.choices[0].message.content || '';
    // console.log('AI Response:', response);
    try {
      // Parse the JSON response
      // const sections = JSON.parse(response);
      // const resume = sections.latex_resume ??"";
      return response.slice(1, -1);
    } catch (error) {
      console.error('Failed to parse AI response as JSON:', error);
      throw new Error('Invalid AI response format');
    }
  } catch (error) {
    console.error('AI LaTeX Generation Error:', error);
    throw new Error('Failed to generate LaTeX content using AI');
  }
}

// export async function analyzeAndGenerateResume(input: any, templateId: string) {
//   try {
//     let prompt;
    
//     // Debug logging of input
//     console.log('AI Service Input:', JSON.stringify(input, null, 2));

//     // Check if input is an object with empty fields (likely from PDF parsing)
//     const isEmptyStructuredInput = 
//       input && 
//       typeof input === 'object' && 
//       (!input.personalInfo?.name && 
//        input.education?.length === 0 && 
//        input.experience?.length === 0 && 
//        input.skills?.length === 0);

//     // Check if input is from form or parsed PDF
//     if (!input.rawText) {
//       // Form data input with valid personal info
//       prompt = `Generate a professional resume using the following information and template style ${templateId}:

// Personal Information:
// ${JSON.stringify(input.personalInfo, null, 2)}

// Education:
// ${JSON.stringify(input.education, null, 2)}

// Experience:
// ${JSON.stringify(input.experience, null, 2)}

// Skills:
// ${JSON.stringify(input.skills, null, 2)}

// Please format this information into a professional resume that highlights the candidate's strengths and achievements.
// Include quantifiable metrics where possible and use action verbs for experience descriptions.`;
//     } else if (input.rawText) {
//       // Raw text input
//       prompt = `Parse and optimize the following resume text for the ${templateId} template:

// Resume Text:
// ${input.rawText}

// Tasks:
// 1. Extract and structure key information (personal info, education, experience, skills)
// 2. Reformat the resume to highlight key achievements
// 3. Use professional language and action verbs
// 4. Ensure the resume is concise and impactful
// 5. Adapt to the specified template style

// Please provide a well-structured, professional resume that maximizes the candidate's potential.It has to score at least 85 on ATS. the output should be in docx format.`;
//     } else if (isEmptyStructuredInput) {
//       // This is likely a parsed PDF with no extracted content
//       return `Unable to generate resume. No meaningful content was extracted from the PDF. 
      
// Possible reasons:
// - The PDF might be scanned or image-based
// - The text extraction process failed
// - The document contains minimal text

// Recommendations:
// 1. Ensure the PDF is text-based
// 2. Check the file quality and readability
// 3. Try uploading a different resume file`;
//     } else {
//       throw new Error('Invalid input format for resume generation');
//     }

//     // Log the prompt for debugging
//     console.log('AI Resume Generation Prompt:', prompt);

//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         {
//           role: "system",
//           content: "You are a professional resume writer that creates optimized resumes for job applications."
//         },
//         {
//           role: "user",
//           content: prompt
//         }
//       ],
//       temperature: 0.7,
//       max_tokens: 2000
//     });

//     const generatedResume = response.choices[0].message.content;
    
//     // Log the generated resume for debugging
//     console.log('Generated Resume:', generatedResume);

//     return generatedResume;
//   } catch (error) {
//     console.error('Error in AI resume generation:', error);
//     throw error;
//   }
// }
