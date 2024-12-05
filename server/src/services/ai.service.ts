import OpenAI from 'openai';
import { ContentType } from '../types/resume';

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
