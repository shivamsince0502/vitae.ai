import OpenAI from 'openai';
import dotenv from 'dotenv';

import { ContentType, ResumeData } from '../types/resume';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function enhanceResumeContent(
  content: string,
  type: ContentType
): Promise<string> {
  try {
    const prompt = generatePrompt(content, type);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer who helps improve resume content to be more impactful and ATS-friendly. Focus on using action verbs, quantifiable achievements, and clear, professional language."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0].message.content || content;
  } catch (error) {
    console.error('AI Enhancement Error:', error);
    throw new Error('Failed to enhance content');
  }
}

function generatePrompt(content: string, type: ContentType): string {
  const prompts = {
    experience: `Enhance this job experience description to be more impactful and ATS-friendly:
    "${content}"
    Focus on:
    - Starting with strong action verbs
    - Including quantifiable achievements
    - Using relevant industry keywords
    - Maintaining professional tone
    - Highlighting impact and results`,
    
    project: `Improve this project description to showcase technical skills and achievements:
    "${content}"
    Focus on:
    - Technical implementation details
    - Project impact and results
    - Technologies used effectively
    - Problem-solving approach
    - Role and contributions`,
    
    skills: `Optimize these skills for ATS scanning and professional presentation:
    "${content}"
    Focus on:
    - Industry-standard terminology
    - Proper formatting
    - Relevant technical terms
    - Skill categorization
    - Current technology versions`,
    
    summary: `Enhance this professional summary to be more compelling:
    "${content}"
    Focus on:
    - Career highlights
    - Unique value proposition
    - Industry relevance
    - Professional goals
    - Core competencies`
  };

  return prompts[type] || prompts.experience;
}

export async function analyzeResumeContent(resumeData: any): Promise<any> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert resume analyst who provides constructive feedback on resumes. Focus on content strength, ATS optimization, and professional presentation."
        },
        {
          role: "user",
          content: `Analyze this resume and provide feedback:
          ${JSON.stringify(resumeData, null, 2)}
          
          Provide feedback on:
          1. Content strength and impact
          2. ATS optimization
          3. Professional presentation
          4. Skills relevance
          5. Areas for improvement`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return {
      feedback: completion.choices[0].message.content,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Resume Analysis Error:', error);
    throw new Error('Failed to analyze resume');
  }
}

export async function generateLatexContent(resumeData: ResumeData): Promise<string> {
  try {
    const prompt = `Generate a professional LaTeX resume with the following data. Follow the style and structure of this high-scoring (ATS score: 85) resume example, but adapt it for the provided data. Return ONLY the LaTeX code as a plain string, without any markdown formatting or code blocks.

Example resume structure to follow (notice the formatting, spacing, and section organization):

\\begin{center}
\\textbf{\\Huge \\scshape Name} \\\\ \\vspace{1pt}
\\small Phone $|$ \\href{mailto:email}{\\underline{email}} $|$
\\href{linkedin}{\\underline{LinkedIn}} $|$
\\href{github}{\\underline{Github}}
\\end{center}

\\section{Experience}
\\resumeSubHeadingListStart
\\resumeSubheading
{Position}{Date Range}
{Company}{Location}
\\resumeItemListStart
  \\resumeItem{Achievement with metrics}
\\resumeItemListEnd
\\resumeSubHeadingListEnd

\\section{Projects}
\\resumeSubHeadingListStart
\\resumeProjectHeading
{\\textbf{Project Name} $|$ \\emph{Github: \\href{link}{\\underline{Repo}}}}{Date Range}
\\resumeItemListStart
\\resumeItem{Description with metrics}
\\resumeItemListEnd
\\resumeSubHeadingListEnd

\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
\\small{\\item{
\\textbf{Category}{: Item1, Item2, Item3}
}}
\\end{itemize}

Now, generate a resume using this structure with the following data:
    
Personal Information:
- Name: ${resumeData.personalInfo.name}
- Email: ${resumeData.personalInfo.email}
- Phone: ${resumeData.personalInfo.phone}
- Location: ${resumeData.personalInfo.location}
${resumeData.personalInfo.linkedin ? `- LinkedIn: ${resumeData.personalInfo.linkedin}` : ''}
${resumeData.personalInfo.github ? `- GitHub: ${resumeData.personalInfo.github}` : ''}
${resumeData.personalInfo.portfolio ? `- Portfolio: ${resumeData.personalInfo.portfolio}` : ''}

Education:
${resumeData.education.map(edu => `- ${edu.degree} from ${edu.school}
  Location: ${edu.location}
  Duration: ${edu.startDate} - ${edu.endDate}
  ${edu.gpa ? `GPA: ${edu.gpa}` : ''}`).join('\n')}

Experience:
${resumeData.experience.map(exp => `- ${exp.position} at ${exp.company}
  Location: ${exp.location}
  Duration: ${exp.startDate} - ${exp.endDate}
  Achievements:
  ${exp.description.map(desc => `  - ${desc}`).join('\n')}`).join('\n')}

Skills:
${resumeData.skills.map(skill => `- ${skill.category}: ${skill.items.join(', ')}`).join('\n')}

Projects:
${resumeData.projects.map(project => `- ${project.name}
  Technologies: ${project.technologies.join(', ')}
  Duration: ${project.startDate} - ${project.endDate}
  Details:
  ${project.description.map(desc => `  - ${desc}`).join('\n')}`).join('\n')}

Requirements:
1. Follow the exact structure and formatting of the example resume
2. Use the same command structure (\\resumeSubheading, \\resumeItem, etc.)
3. Maintain consistent spacing and formatting
4. Include metrics and quantifiable achievements in bullet points
5. Ensure all hyperlinks are properly formatted
6. Return ONLY the LaTeX code that goes between \\begin{document} and \\end{document}
7. Return the code as a plain string, without any markdown formatting or code blocks`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a LaTeX code generator that creates resumes following a specific template structure. Output ONLY the raw LaTeX code without any markdown formatting, code blocks, or explanatory text. Generate only the content that goes between \\begin{document} and \\end{document}, following the exact formatting and command structure provided."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('AI LaTeX Generation Error:', error);
    throw new Error('Failed to generate LaTeX content using AI');
  }
}

export async function analyzeAndGenerateResume(input: any, templateId: string) {
  try {
    let prompt: string;

    // Debug logging of input
    console.log('AI Service Input:', JSON.stringify(input, null, 2));

    // Check if input is an object with empty fields (likely from PDF parsing)
    const isEmptyStructuredInput = 
      input && 
      typeof input === 'object' && 
      (!input.personalInfo?.name && 
       input.education?.length === 0 && 
       input.experience?.length === 0 && 
       input.skills?.length === 0);

    // Check if input is from form or parsed PDF
    if (!input.rawText) {
      // Form data input with valid personal info
      prompt = `Generate a professional resume using the following information and template style ${templateId}:

Personal Information:
${JSON.stringify(input.personalInfo, null, 2)}

Education:
${JSON.stringify(input.education, null, 2)}

Experience:
${JSON.stringify(input.experience, null, 2)}

Skills:
${JSON.stringify(input.skills, null, 2)}

Please format this information into a professional resume that highlights the candidate's strengths and achievements.
Include quantifiable metrics where possible and use action verbs for experience descriptions.`;
    } else if (input.rawText) {
      // Raw text input
      prompt = `Parse and optimize the following resume text for the ${templateId} template:

Resume Text:
${input.rawText}

Tasks:
1. Extract and structure key information (personal info, education, experience, skills)
2. Reformat the resume to highlight key achievements
3. Use professional language and action verbs
4. Ensure the resume is concise and impactful
5. Adapt to the specified template style

Please provide a well-structured, professional resume that maximizes the candidate's potential.It has to score at least 85 on ATS. the output should be in docx format.`;
    } else if (isEmptyStructuredInput) {
      // This is likely a parsed PDF with no extracted content
      return `Unable to generate resume. No meaningful content was extracted from the PDF. 
      
Possible reasons:
- The PDF might be scanned or image-based
- The text extraction process failed
- The document contains minimal text

Recommendations:
1. Ensure the PDF is text-based
2. Check the file quality and readability
3. Try uploading a different resume file`;
    } else {
      throw new Error('Invalid input format for resume generation');
    }

    // Log the prompt for debugging
    console.log('AI Resume Generation Prompt:', prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional resume writer that creates optimized resumes for job applications."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const generatedResume = response.choices[0].message.content;
    
    // Log the generated resume for debugging
    console.log('Generated Resume:', generatedResume);

    return generatedResume;
  } catch (error) {
    console.error('Error in AI resume generation:', error);
    throw error;
  }
}
