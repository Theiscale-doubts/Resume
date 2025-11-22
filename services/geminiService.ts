import { ResumeData } from "../types";

const API_BASE_URL = 'http://localhost:8000/api';

export const generateSummary = async (
  jobTitle: string,
  skills: string,
  currentSummary: string
): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-summary/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobTitle,
        skills,
        currentSummary,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.summary || "Could not generate summary.";
  } catch (error) {
    console.error("API Error:", error);
    return "Error generating summary. Please try again.";
  }
};

export const enhanceDescription = async (
  description: string,
  role: string
): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/enhance-description/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
        role,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.enhancedDescription || description;
  } catch (error) {
    console.error("API Error:", error);
    return description;
  }
};

export const analyzeResumeATS = async (data: ResumeData): Promise<{ score: number, feedback: string[] }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze-resume/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeData: data,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    return {
      score: result.score || 0,
      feedback: result.feedback || ["Could not analyze resume."]
    };
  } catch (error) {
    console.error("API Error:", error);
    return { score: 0, feedback: ["Error connecting to AI service."] };
  }
}